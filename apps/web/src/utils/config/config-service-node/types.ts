import { Parameter, DeepPartial, protobufPackage } from './protos/coinbase/config/resources';

// Make types available to consumers
export * from './protos/coinbase/config/parameter_types';
export * from './protos/coinbase/config/resources';
export * from './protos/coinbase/config/marshalling';
export * from './protos/coinbase/config/service';
export type { DeepPartial, protobufPackage };

export type ConfigClientOptions = {
  accountId: string;
  region: string;
  asyncRefresh?: boolean;
  increaseLogLevel?: boolean;
  timeout?: number;
  statsdSamplingRate?: number;
  circuitbreakDisabled?: boolean;
  expiration?: number;
  failoverDisabled?: boolean;
  s3Bucket?: string;
  grpcUriOverride?: string;
  // statsdClient?:
};

export type GetFunctionOptions = {
  fromSnapshot?: boolean;
  forceRefreshValue?: boolean;
};

// item wraps the parameter result to be stored in the cache.
export type CacheItem = CacheParameterItem | CacheScopeItem;

export type CacheParameterItem = {
  expiration: number;
  data: Parameter | null;
  error: Error | null;
  failureCount: number;
};

// item wraps the getAllParameters result to be stored in the cache.
export type CacheScopeItem = {
  expiration: number;
  data: Parameter[] | null;
  error: Error | null;
  failureCount: number;
};
