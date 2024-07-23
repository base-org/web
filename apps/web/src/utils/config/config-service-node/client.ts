/* eslint-disable */
import Cache from './cache';
import {
  type ConfigClientOptions,
  Parameter,
  GetFunctionOptions,
  ParameterID,
  ScopeID,
  DeepPartial,
  Type,
} from './types';
import {
  buildParameterId,
  parameterIdToString,
  findParameterFactory,
  typeStringFromTypeEnum,
} from './utils';
import S3Client from './s3Client';
import { SecretsClient } from './secretsClient';

const DEFAULT_EXPIRATION = 1000 * 10; // 10s
const DEFAULT_TIMEOUT = 1000; // 1s
const DEFAULT_S3_BUCKET = 'cb-config-service-production';

// TODO: check to see if statsd client throws errors when not initialized
// TODO: investigate csf presample
// TODO: viper value overrides & default

class Client {
  accountId: string;
  asyncRefresh: boolean;
  region: string;
  increaseLogLevel: boolean;
  timeout: number;
  statsdSamplingRate: number;
  circuitbreakDisabled: boolean;
  expiration: number; // Cache expiration in ms
  failoverDisabled: boolean; // Allows you to disable s3 failover for tests
  s3Bucket: string;
  cache: Cache;
  s3Client: S3Client | null;
  singleflight: Map<string, Promise<DeepPartial<Parameter>>>;
  secretsClient: SecretsClient;
  // TODO: logger
  // TODO: statsd

  constructor({
    accountId,
    asyncRefresh = true,
    region,
    increaseLogLevel = true,
    timeout = DEFAULT_TIMEOUT,
    statsdSamplingRate = 0.15,
    circuitbreakDisabled = false,
    expiration = DEFAULT_EXPIRATION,
    failoverDisabled = false,
    s3Bucket = DEFAULT_S3_BUCKET,
    grpcUriOverride,
  }: ConfigClientOptions) {
    this.accountId = accountId;
    this.asyncRefresh = asyncRefresh;
    this.region = region;
    this.increaseLogLevel = increaseLogLevel;
    this.timeout = timeout;
    this.statsdSamplingRate = statsdSamplingRate;
    this.circuitbreakDisabled = circuitbreakDisabled;
    this.expiration = expiration;
    this.failoverDisabled = failoverDisabled;
    this.s3Bucket = s3Bucket;
    this.cache = new Cache(this.expiration);
    this.secretsClient = new SecretsClient();
    this.s3Client = new S3Client(s3Bucket, region); //process.env.NODE_ENV === 'production' ? new S3Client(s3Bucket, region) : null;
    this.singleflight = new Map();
  }

  private async readParameterFromConfigService(parameterId: ParameterID): Promise<Parameter> {
    try {
      // Only have one outstanding request to config service at a time
      const parameterIdString = parameterIdToString(parameterId);
      const inflightRequest = this.singleflight.get(parameterIdString);

      let parameter;
      if (inflightRequest) {
        parameter = await inflightRequest;
      }
      if (parameter) return parameter as Parameter;
      else throw new Error('No body returned by GrpcClient.getParameter.');
    } catch (err) {
      //TODO: error handling on 404 or 400. Should log something and stats d it eventually

      console.error(err);

      if (this.failoverDisabled) {
        throw new Error('Unable to read from Config Service');
      }

      // fallback to s3
      return this.readFromS3(parameterId.scopeId as ScopeID).then((s3Parameters) => {
        return findParameterFactory(parameterId)(s3Parameters);
      });
    }
  }

  private async readFromS3(scopeId: ScopeID): Promise<Parameter[]> {
    if (!this.s3Client) {
      throw new Error(
        'Unable to fallback to s3 client. Client not initialized outside of production Node environments and unavailable for local development',
      );
    }
    return (await this.s3Client.readObjectData(scopeId)).parameters;
  }

  async getParameter(
    scopeName: string,
    type: Type,
    name: string,
    options?: GetFunctionOptions,
  ): Promise<Parameter> {
    const parameterId = buildParameterId(this.accountId, this.region, scopeName, type, name);
    const cacheKey = parameterIdToString(parameterId);
    const cachedParameter = this.cache.get(cacheKey);

    const isExpired = Date.now() > (cachedParameter?.expiration ?? 0);

    const tags = { lang: 'nodejs', param_type: typeStringFromTypeEnum(type) };

    try {
      // No data or force a refresh: await read from specified source, s3 snapshot or config service
      if (options?.forceRefreshValue || !cachedParameter) {
        let value;
        if (options?.fromSnapshot) {
          value = await this.readFromS3(parameterId.scopeId as ScopeID).then((s3Parameters) => {
            return findParameterFactory(parameterId)(s3Parameters);
          });
        } else {
          value = await this.readParameterFromConfigService(parameterId);
        }

        this.cache.set(cacheKey, value);

        return value as Parameter;
      }

      if (!isExpired) {
        if (cachedParameter.data) {
          return cachedParameter.data as Parameter;
        }
        if (cachedParameter.error) {
          throw cachedParameter.error;
        }
      }

      if (options?.fromSnapshot) {
        // Begin updating value from s3 data
        const s3Promise = this.readFromS3(parameterId.scopeId as ScopeID)
          .then((s3Parameters) => {
            return findParameterFactory(parameterId)(s3Parameters);
          })
          .then((value) => {
            this.cache.set(cacheKey, value);
            return value;
          })
          .catch((err: Error) => {
            this.cache.set(cacheKey, null, err);
            throw err;
          });

        // Return cached param or error and allow read from s3 to occur asynchronously
        if (this.asyncRefresh) {
          if (cachedParameter.data) {
            return cachedParameter.data as Parameter;
          }
          if (cachedParameter.error) {
            throw cachedParameter.error;
          }
        }

        // Wait for read from s3
        return (await s3Promise) as Parameter;
      }

      // Begin updating value from config service data
      const configServicePromise = this.readParameterFromConfigService(parameterId)
        .then((value) => {
          this.cache.set(cacheKey, value);
          return value;
        })
        .catch((err: Error) => {
          this.cache.set(cacheKey, null, err);
          throw err;
        });

      // Return cached param or error and allow read from config service to occur asynchronously
      if (this.asyncRefresh) {
        if (cachedParameter.data) {
          return cachedParameter.data as Parameter;
        }
        if (cachedParameter.error) {
          throw cachedParameter.error;
        }
      }

      // Wait for read from config service
      return (await configServicePromise) as Parameter;
    } catch (err: unknown) {
      // Any error? Cache the error and throw back to client
      this.cache.set(cacheKey, null, err as Error);
      // TODO: not found error handling
      throw err;
    }
  }

  async secretText(scope: string, name: string, options?: GetFunctionOptions) {
    const parameter = await this.getParameter(scope, Type.SECRET_TEXT, name, options);
    const secretTextParam = parameter.body?.secretText;
    if (secretTextParam) {
      const secretText = this.secretsClient.decrypt({
        encryptedDataKey: secretTextParam.dataKey,
        cipherText: secretTextParam.encryptedSecretText,
        encryptionContext: secretTextParam.encryptionContext,
        scope: scope,
      });
      return secretText;
    }
    throw new Error('Parameter Body not found');
  }
}

export default Client;
/* eslint-enable */
