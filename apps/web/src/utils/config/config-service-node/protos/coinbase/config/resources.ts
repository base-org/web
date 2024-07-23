/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Timestamp } from '../../google/protobuf/timestamp';
import {
  CloudKillSwitchConfig,
  CommerceAssets,
  ConfigFile,
  Currency,
  Duration,
  EntryGatewayLoadTestConfig,
  EouProductConfig,
  Erc20Asset,
  FeatureFlag,
  FeatureSetMetadata,
  FeeOverride,
  FullLimitConfig,
  HorusConfig,
  IncentiveExperimentsConfig,
  IntMap,
  KillSwitch,
  LimitConfig,
  LoadShedRules,
  MlModelThresholdConfig,
  ModelFeaturesConfig,
  ModelScoreCachePolicy,
  ModelScoreCachePolicyArray,
  Network,
  NodeCluster,
  OpenBankingBankDetails,
  OpenBankingBankDetailsV2,
  Orchestration,
  RaftCluster,
  RiskCheckConfig,
  SecretText,
  SplitTest,
  SplitTestAdminEvents,
  SplitTestMetadata,
  SplitTestsFollowed,
  StringArray,
  StringMap,
  TierArray,
  Type,
  typeFromJSON,
  typeToJSON,
} from './parameter_types';

export const protobufPackage = 'coinbase.config';

/** Environment is one of the logical coinbase environments. */
export enum Environment {
  UNKNOWN_ENV = 0,
  DEVELOPMENT = 1,
  CORPORATE = 2,
  PRODUCTION = 3,
  /** USE_NAMESPACE - Signal to the API to use namespaces and not environments. */
  USE_NAMESPACE = 4,
  UNRECOGNIZED = -1,
}

export function environmentFromJSON(object: any): Environment {
  switch (object) {
    case 0:
    case 'UNKNOWN_ENV':
      return Environment.UNKNOWN_ENV;
    case 1:
    case 'DEVELOPMENT':
      return Environment.DEVELOPMENT;
    case 2:
    case 'CORPORATE':
      return Environment.CORPORATE;
    case 3:
    case 'PRODUCTION':
      return Environment.PRODUCTION;
    case 4:
    case 'USE_NAMESPACE':
      return Environment.USE_NAMESPACE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return Environment.UNRECOGNIZED;
  }
}

export function environmentToJSON(object: Environment): string {
  switch (object) {
    case Environment.UNKNOWN_ENV:
      return 'UNKNOWN_ENV';
    case Environment.DEVELOPMENT:
      return 'DEVELOPMENT';
    case Environment.CORPORATE:
      return 'CORPORATE';
    case Environment.PRODUCTION:
      return 'PRODUCTION';
    case Environment.USE_NAMESPACE:
      return 'USE_NAMESPACE';
    case Environment.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

/** State describes the state machine around consensus controlled values (parameters, scopes) */
export enum State {
  /** PENDING - Change is pending additional reviews */
  PENDING = 0,
  /** APPROVED - Change is approved (likely live) */
  APPROVED = 1,
  /** REJECTED - Change was rejected (never live) */
  REJECTED = 2,
  /** DELETED - Parameter is deleted (will stay in dynamodb, but not appear in config-service) */
  DELETED = 3,
  UNRECOGNIZED = -1,
}

export function stateFromJSON(object: any): State {
  switch (object) {
    case 0:
    case 'PENDING':
      return State.PENDING;
    case 1:
    case 'APPROVED':
      return State.APPROVED;
    case 2:
    case 'REJECTED':
      return State.REJECTED;
    case 3:
    case 'DELETED':
      return State.DELETED;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return State.UNRECOGNIZED;
  }
}

export function stateToJSON(object: State): string {
  switch (object) {
    case State.PENDING:
      return 'PENDING';
    case State.APPROVED:
      return 'APPROVED';
    case State.REJECTED:
      return 'REJECTED';
    case State.DELETED:
      return 'DELETED';
    case State.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

/** A list of known clients, with internal mappings inside the service. */
export enum KnownClient {
  CODEFLOW = 0,
  MONORAIL = 1,
  NODE_SERVICE = 2,
  CUSTODY_STAKING = 3,
  TRADING_ENGINE = 4,
  SMOKETESTS = 5,
  ML_MODELS_SERVICE = 6,
  SERVICE_AUTH = 7,
  CB_VERIFY = 8,
  SOTERIA = 9,
  PENDING_ORDER_CLEANUP = 10,
  MOCK_TRADERS = 11,
  USERS_VENDOR_SALESFORCE = 12,
  WALLET_ORCHESTRATOR = 13,
  HOUSTON = 14,
  LIMIT = 15,
  YIELD_SERVICE = 16,
  ETH_INDEXER = 17,
  PRIME_ADMIN_API = 18,
  RETAIL_BROKERAGE_API = 19,
  PHONE_RISK = 20,
  PRO_ADMIN = 21,
  LOAD_TEST = 22,
  ETH2_BACKEND = 23,
  ASSET_METADATA = 24,
  CUSTODY_API = 25,
  SPLIT_TESTS_SERVICE = 26,
  CHAINSTDIO = 27,
  SUPPORTED_ASSETS_SERVICE = 28,
  WRAPPED_ASSETS = 29,
  GMO = 30,
  MONGO_ADMIN_TOOLS = 31,
  BROKERAGE_FCM_LIQUIDATION = 32,
  CARDINALITY_WATCHER = 33,
  ASSET_TRACKER = 34,
  BSX_BUILDER = 35,
  USERS_SERVICE = 36,
  WATCHLIST_SERVICE = 37,
  SIMPLE_TRADE_SERVICE = 38,
  OTA_SERVICE = 39,
  ERRORS_SERVICE = 40,
  EARN_CENTER_PROGRAM_SERVICE = 41,
  MESSAGING_CHATBOT_SERVICE = 42,
  LDAP = 43,
  EX_NOMAD = 44,
  CLOUD_API_KEY_SERVICE_DEV = 45,
  CLOUD_API_KEY_SERVICE_STAGING = 46,
  CLOUD_API_KEY_SERVICE_PROD = 47,
  NOTIFICATION_PRODUCER = 48,
  UNRECOGNIZED = -1,
}

export function knownClientFromJSON(object: any): KnownClient {
  switch (object) {
    case 0:
    case 'CODEFLOW':
      return KnownClient.CODEFLOW;
    case 1:
    case 'MONORAIL':
      return KnownClient.MONORAIL;
    case 2:
    case 'NODE_SERVICE':
      return KnownClient.NODE_SERVICE;
    case 3:
    case 'CUSTODY_STAKING':
      return KnownClient.CUSTODY_STAKING;
    case 4:
    case 'TRADING_ENGINE':
      return KnownClient.TRADING_ENGINE;
    case 5:
    case 'SMOKETESTS':
      return KnownClient.SMOKETESTS;
    case 6:
    case 'ML_MODELS_SERVICE':
      return KnownClient.ML_MODELS_SERVICE;
    case 7:
    case 'SERVICE_AUTH':
      return KnownClient.SERVICE_AUTH;
    case 8:
    case 'CB_VERIFY':
      return KnownClient.CB_VERIFY;
    case 9:
    case 'SOTERIA':
      return KnownClient.SOTERIA;
    case 10:
    case 'PENDING_ORDER_CLEANUP':
      return KnownClient.PENDING_ORDER_CLEANUP;
    case 11:
    case 'MOCK_TRADERS':
      return KnownClient.MOCK_TRADERS;
    case 12:
    case 'USERS_VENDOR_SALESFORCE':
      return KnownClient.USERS_VENDOR_SALESFORCE;
    case 13:
    case 'WALLET_ORCHESTRATOR':
      return KnownClient.WALLET_ORCHESTRATOR;
    case 14:
    case 'HOUSTON':
      return KnownClient.HOUSTON;
    case 15:
    case 'LIMIT':
      return KnownClient.LIMIT;
    case 16:
    case 'YIELD_SERVICE':
      return KnownClient.YIELD_SERVICE;
    case 17:
    case 'ETH_INDEXER':
      return KnownClient.ETH_INDEXER;
    case 18:
    case 'PRIME_ADMIN_API':
      return KnownClient.PRIME_ADMIN_API;
    case 19:
    case 'RETAIL_BROKERAGE_API':
      return KnownClient.RETAIL_BROKERAGE_API;
    case 20:
    case 'PHONE_RISK':
      return KnownClient.PHONE_RISK;
    case 21:
    case 'PRO_ADMIN':
      return KnownClient.PRO_ADMIN;
    case 22:
    case 'LOAD_TEST':
      return KnownClient.LOAD_TEST;
    case 23:
    case 'ETH2_BACKEND':
      return KnownClient.ETH2_BACKEND;
    case 24:
    case 'ASSET_METADATA':
      return KnownClient.ASSET_METADATA;
    case 25:
    case 'CUSTODY_API':
      return KnownClient.CUSTODY_API;
    case 26:
    case 'SPLIT_TESTS_SERVICE':
      return KnownClient.SPLIT_TESTS_SERVICE;
    case 27:
    case 'CHAINSTDIO':
      return KnownClient.CHAINSTDIO;
    case 28:
    case 'SUPPORTED_ASSETS_SERVICE':
      return KnownClient.SUPPORTED_ASSETS_SERVICE;
    case 29:
    case 'WRAPPED_ASSETS':
      return KnownClient.WRAPPED_ASSETS;
    case 30:
    case 'GMO':
      return KnownClient.GMO;
    case 31:
    case 'MONGO_ADMIN_TOOLS':
      return KnownClient.MONGO_ADMIN_TOOLS;
    case 32:
    case 'BROKERAGE_FCM_LIQUIDATION':
      return KnownClient.BROKERAGE_FCM_LIQUIDATION;
    case 33:
    case 'CARDINALITY_WATCHER':
      return KnownClient.CARDINALITY_WATCHER;
    case 34:
    case 'ASSET_TRACKER':
      return KnownClient.ASSET_TRACKER;
    case 35:
    case 'BSX_BUILDER':
      return KnownClient.BSX_BUILDER;
    case 36:
    case 'USERS_SERVICE':
      return KnownClient.USERS_SERVICE;
    case 37:
    case 'WATCHLIST_SERVICE':
      return KnownClient.WATCHLIST_SERVICE;
    case 38:
    case 'SIMPLE_TRADE_SERVICE':
      return KnownClient.SIMPLE_TRADE_SERVICE;
    case 39:
    case 'OTA_SERVICE':
      return KnownClient.OTA_SERVICE;
    case 40:
    case 'ERRORS_SERVICE':
      return KnownClient.ERRORS_SERVICE;
    case 41:
    case 'EARN_CENTER_PROGRAM_SERVICE':
      return KnownClient.EARN_CENTER_PROGRAM_SERVICE;
    case 42:
    case 'MESSAGING_CHATBOT_SERVICE':
      return KnownClient.MESSAGING_CHATBOT_SERVICE;
    case 43:
    case 'LDAP':
      return KnownClient.LDAP;
    case 44:
    case 'EX_NOMAD':
      return KnownClient.EX_NOMAD;
    case 45:
    case 'CLOUD_API_KEY_SERVICE_DEV':
      return KnownClient.CLOUD_API_KEY_SERVICE_DEV;
    case 46:
    case 'CLOUD_API_KEY_SERVICE_STAGING':
      return KnownClient.CLOUD_API_KEY_SERVICE_STAGING;
    case 47:
    case 'CLOUD_API_KEY_SERVICE_PROD':
      return KnownClient.CLOUD_API_KEY_SERVICE_PROD;
    case 48:
    case 'NOTIFICATION_PRODUCER':
      return KnownClient.NOTIFICATION_PRODUCER;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return KnownClient.UNRECOGNIZED;
  }
}

export function knownClientToJSON(object: KnownClient): string {
  switch (object) {
    case KnownClient.CODEFLOW:
      return 'CODEFLOW';
    case KnownClient.MONORAIL:
      return 'MONORAIL';
    case KnownClient.NODE_SERVICE:
      return 'NODE_SERVICE';
    case KnownClient.CUSTODY_STAKING:
      return 'CUSTODY_STAKING';
    case KnownClient.TRADING_ENGINE:
      return 'TRADING_ENGINE';
    case KnownClient.SMOKETESTS:
      return 'SMOKETESTS';
    case KnownClient.ML_MODELS_SERVICE:
      return 'ML_MODELS_SERVICE';
    case KnownClient.SERVICE_AUTH:
      return 'SERVICE_AUTH';
    case KnownClient.CB_VERIFY:
      return 'CB_VERIFY';
    case KnownClient.SOTERIA:
      return 'SOTERIA';
    case KnownClient.PENDING_ORDER_CLEANUP:
      return 'PENDING_ORDER_CLEANUP';
    case KnownClient.MOCK_TRADERS:
      return 'MOCK_TRADERS';
    case KnownClient.USERS_VENDOR_SALESFORCE:
      return 'USERS_VENDOR_SALESFORCE';
    case KnownClient.WALLET_ORCHESTRATOR:
      return 'WALLET_ORCHESTRATOR';
    case KnownClient.HOUSTON:
      return 'HOUSTON';
    case KnownClient.LIMIT:
      return 'LIMIT';
    case KnownClient.YIELD_SERVICE:
      return 'YIELD_SERVICE';
    case KnownClient.ETH_INDEXER:
      return 'ETH_INDEXER';
    case KnownClient.PRIME_ADMIN_API:
      return 'PRIME_ADMIN_API';
    case KnownClient.RETAIL_BROKERAGE_API:
      return 'RETAIL_BROKERAGE_API';
    case KnownClient.PHONE_RISK:
      return 'PHONE_RISK';
    case KnownClient.PRO_ADMIN:
      return 'PRO_ADMIN';
    case KnownClient.LOAD_TEST:
      return 'LOAD_TEST';
    case KnownClient.ETH2_BACKEND:
      return 'ETH2_BACKEND';
    case KnownClient.ASSET_METADATA:
      return 'ASSET_METADATA';
    case KnownClient.CUSTODY_API:
      return 'CUSTODY_API';
    case KnownClient.SPLIT_TESTS_SERVICE:
      return 'SPLIT_TESTS_SERVICE';
    case KnownClient.CHAINSTDIO:
      return 'CHAINSTDIO';
    case KnownClient.SUPPORTED_ASSETS_SERVICE:
      return 'SUPPORTED_ASSETS_SERVICE';
    case KnownClient.WRAPPED_ASSETS:
      return 'WRAPPED_ASSETS';
    case KnownClient.GMO:
      return 'GMO';
    case KnownClient.MONGO_ADMIN_TOOLS:
      return 'MONGO_ADMIN_TOOLS';
    case KnownClient.BROKERAGE_FCM_LIQUIDATION:
      return 'BROKERAGE_FCM_LIQUIDATION';
    case KnownClient.CARDINALITY_WATCHER:
      return 'CARDINALITY_WATCHER';
    case KnownClient.ASSET_TRACKER:
      return 'ASSET_TRACKER';
    case KnownClient.BSX_BUILDER:
      return 'BSX_BUILDER';
    case KnownClient.USERS_SERVICE:
      return 'USERS_SERVICE';
    case KnownClient.WATCHLIST_SERVICE:
      return 'WATCHLIST_SERVICE';
    case KnownClient.SIMPLE_TRADE_SERVICE:
      return 'SIMPLE_TRADE_SERVICE';
    case KnownClient.OTA_SERVICE:
      return 'OTA_SERVICE';
    case KnownClient.ERRORS_SERVICE:
      return 'ERRORS_SERVICE';
    case KnownClient.EARN_CENTER_PROGRAM_SERVICE:
      return 'EARN_CENTER_PROGRAM_SERVICE';
    case KnownClient.MESSAGING_CHATBOT_SERVICE:
      return 'MESSAGING_CHATBOT_SERVICE';
    case KnownClient.LDAP:
      return 'LDAP';
    case KnownClient.EX_NOMAD:
      return 'EX_NOMAD';
    case KnownClient.CLOUD_API_KEY_SERVICE_DEV:
      return 'CLOUD_API_KEY_SERVICE_DEV';
    case KnownClient.CLOUD_API_KEY_SERVICE_STAGING:
      return 'CLOUD_API_KEY_SERVICE_STAGING';
    case KnownClient.CLOUD_API_KEY_SERVICE_PROD:
      return 'CLOUD_API_KEY_SERVICE_PROD';
    case KnownClient.NOTIFICATION_PRODUCER:
      return 'NOTIFICATION_PRODUCER';
    case KnownClient.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

/** Version represents details about the creation of a parameter or scope. */
export interface Version {
  /** A UUID-like field directly linking to a row in DynamoDB. */
  id: string;
  /** The timestamp for when this was created. */
  createdAt: Date | undefined;
  /** The author content. For GITHUB_USER, this will be a numeric ID. For AWS_IAM_ENTITY, this will be an ARN. */
  author: string;
  /** The type of author. */
  authorType: Version_AuthorType;
  /** A note to clarify the meaning of the parameter or calling out gotchas. */
  note: string;
  /** The author that has been delegated to write on the behalf of the client. */
  delegatedAuthor: string;
  /** A list of reviewers who approved/rejected the parameter or scope. */
  reviewers: string[];
}

/** AuthorType describes how to interpret the content of "author". */
export enum Version_AuthorType {
  GITHUB_USER = 0,
  AWS_IAM_ENTITY = 1,
  UNRECOGNIZED = -1,
}

export function version_AuthorTypeFromJSON(object: any): Version_AuthorType {
  switch (object) {
    case 0:
    case 'GITHUB_USER':
      return Version_AuthorType.GITHUB_USER;
    case 1:
    case 'AWS_IAM_ENTITY':
      return Version_AuthorType.AWS_IAM_ENTITY;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return Version_AuthorType.UNRECOGNIZED;
  }
}

export function version_AuthorTypeToJSON(object: Version_AuthorType): string {
  switch (object) {
    case Version_AuthorType.GITHUB_USER:
      return 'GITHUB_USER';
    case Version_AuthorType.AWS_IAM_ENTITY:
      return 'AWS_IAM_ENTITY';
    case Version_AuthorType.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

/** Scope represents a logical grouping of parameters. */
export interface Scope {
  /** The identifier of the scope. */
  scopeId: ScopeID | undefined;
  /** This scope message's version. */
  version: Version | undefined;
  /** The consensus rules for this scope. */
  consensus: Consensus | undefined;
  /** The state of this scope. */
  state: State;
  /** Description of the scope and type of parameters it includes */
  description: string;
}

/** An instance of a parameter. */
export interface Parameter {
  /** The parameter content. */
  body: ParameterBody | undefined;
  /** The unique ID of a parameter. */
  id: ParameterID | undefined;
  /** The parameter's version information. */
  version: Version | undefined;
  /** The state of this parameter. */
  state: State;
}

/** ParameterBody describes the strongly typed content of a parameter. */
export interface ParameterBody {
  boolean?: boolean | undefined;
  text?: string | undefined;
  numeric?: number | undefined;
  featureFlag?: FeatureFlag | undefined;
  stringMap?: StringMap | undefined;
  stringArray?: StringArray | undefined;
  nodeCluster?: NodeCluster | undefined;
  splitTest?: SplitTest | undefined;
  configFile?: ConfigFile | undefined;
  duration?: Duration | undefined;
  secretText?: SecretText | undefined;
  limitConfig?: LimitConfig | undefined;
  raftCluster?: RaftCluster | undefined;
  fullLimitConfig?: FullLimitConfig | undefined;
  orchestration?: Orchestration | undefined;
  tierArray?: TierArray | undefined;
  featureSetMetadata?: FeatureSetMetadata | undefined;
  modelFeaturesConfig?: ModelFeaturesConfig | undefined;
  erc20Asset?: Erc20Asset | undefined;
  splitTestMetadata?: SplitTestMetadata | undefined;
  splitTestsFollowed?: SplitTestsFollowed | undefined;
  splitTestAdminEvents?: SplitTestAdminEvents | undefined;
  modelScoreCachePolicy?: ModelScoreCachePolicy | undefined;
  modelScoreCachePolicyArray?: ModelScoreCachePolicyArray | undefined;
  intMap?: IntMap | undefined;
  incentiveExperimentsConfig?: IncentiveExperimentsConfig | undefined;
  currency?: Currency | undefined;
  network?: Network | undefined;
  killSwitch?: KillSwitch | undefined;
  mlModelThresholdConfig?: MlModelThresholdConfig | undefined;
  entryGatewayLoadTestConfig?: EntryGatewayLoadTestConfig | undefined;
  feeOverride?: FeeOverride | undefined;
  commerceAssets?: CommerceAssets | undefined;
  eouProductConfig?: EouProductConfig | undefined;
  openBankingBankDetails?: OpenBankingBankDetails | undefined;
  openBankingBankDetailsV2?: OpenBankingBankDetailsV2 | undefined;
  loadShedRules?: LoadShedRules | undefined;
  horusConfig?: HorusConfig | undefined;
  cloudKillSwitchConfig?: CloudKillSwitchConfig | undefined;
  riskCheckConfig?: RiskCheckConfig | undefined;
}

export interface PrincipalConfigs {
  configs: string[];
}

/** A grouping of consensus rules. */
export interface Consensus {
  /** The number of required reviews. */
  requiredReviews: number;
  /** Whether CAF is required. */
  cafRequired: boolean;
  /** The Github team name that should be used for authorization. */
  team?: string | undefined;
  /** The project that should be used for authorization. */
  proj?: Consensus_Project | undefined;
  /** The list of clients that are allowed to access this scope. */
  clients: KnownClient[];
  /** Map of project name to array of configs that makes up the allowed principals of this scope. */
  allowedPrincipals: { [key: string]: PrincipalConfigs };
}

/** A project's information. Used for authorization. */
export interface Consensus_Project {
  /** The project name. */
  name: string;
}

export interface Consensus_AllowedPrincipalsEntry {
  key: string;
  value: PrincipalConfigs | undefined;
}

/** A namespace for parameters and scopes to be isolated. */
export interface Namespace {
  /** The account ID of the namespace. */
  accountId: string;
  /** The region code of the namespace. (e.g. us-east-1) */
  regionCode: string;
}

export interface Account {
  namespace: Namespace | undefined;
  name: string;
}

/** The uniquely identifying information for a scope. */
export interface ScopeID {
  /** The environment for the scope. Either use this or namespace. */
  env: Environment;
  /**
   * The name of the scope. Lowercase letters, numbers, -, /, _, and period are valid characters.
   * / can not be the leading character.
   */
  name: string;
  /** The namespace of the scope. Either use this or env. */
  namespace: Namespace | undefined;
}

/** The uniquely identifying information for a parameter. */
export interface ParameterID {
  /** The scope the parameter is in. */
  scopeId: ScopeID | undefined;
  /** The type of parameter. */
  type: Type;
  /** The name of the parameter. Lowercase letters, numbers, -, /, _ and . are valid characters. */
  name: string;
}

export interface ParameterIDAndVersion {
  id: ParameterID | undefined;
  /** The Version.Id string of the parameter */
  version: string;
}

export interface UnencryptedSecret {
  /** The secret plaintext. */
  plaintext: string;
  /** The parameter ID */
  id: ParameterID | undefined;
  /**
   * Whether or not it's write-only.
   * False when UnencryptedSecret is a response, but necessary for Encrypt input.
   */
  writeOnly: boolean;
  /** The note to go with the secret. */
  note: string;
}

function createBaseVersion(): Version {
  return {
    id: '',
    createdAt: undefined,
    author: '',
    authorType: 0,
    note: '',
    delegatedAuthor: '',
    reviewers: [],
  };
}

export const Version = {
  encode(message: Version, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(18).fork()).ldelim();
    }
    if (message.author !== '') {
      writer.uint32(26).string(message.author);
    }
    if (message.authorType !== 0) {
      writer.uint32(32).int32(message.authorType);
    }
    if (message.note !== '') {
      writer.uint32(42).string(message.note);
    }
    if (message.delegatedAuthor !== '') {
      writer.uint32(50).string(message.delegatedAuthor);
    }
    for (const v of message.reviewers) {
      writer.uint32(58).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Version {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVersion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.author = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.authorType = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.note = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.delegatedAuthor = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.reviewers.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Version {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : '',
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      author: isSet(object.author) ? globalThis.String(object.author) : '',
      authorType: isSet(object.authorType) ? version_AuthorTypeFromJSON(object.authorType) : 0,
      note: isSet(object.note) ? globalThis.String(object.note) : '',
      delegatedAuthor: isSet(object.delegatedAuthor)
        ? globalThis.String(object.delegatedAuthor)
        : '',
      reviewers: globalThis.Array.isArray(object?.reviewers)
        ? object.reviewers.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: Version): unknown {
    const obj: any = {};
    if (message.id !== '') {
      obj.id = message.id;
    }
    if (message.createdAt !== undefined) {
      obj.createdAt = message.createdAt.toISOString();
    }
    if (message.author !== '') {
      obj.author = message.author;
    }
    if (message.authorType !== 0) {
      obj.authorType = version_AuthorTypeToJSON(message.authorType);
    }
    if (message.note !== '') {
      obj.note = message.note;
    }
    if (message.delegatedAuthor !== '') {
      obj.delegatedAuthor = message.delegatedAuthor;
    }
    if (message.reviewers?.length) {
      obj.reviewers = message.reviewers;
    }
    return obj;
  },

  create(base?: DeepPartial<Version>): Version {
    return Version.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Version>): Version {
    const message = createBaseVersion();
    message.id = object.id ?? '';
    message.createdAt = object.createdAt ?? undefined;
    message.author = object.author ?? '';
    message.authorType = object.authorType ?? 0;
    message.note = object.note ?? '';
    message.delegatedAuthor = object.delegatedAuthor ?? '';
    message.reviewers = object.reviewers?.map((e) => e) || [];
    return message;
  },
};

function createBaseScope(): Scope {
  return {
    scopeId: undefined,
    version: undefined,
    consensus: undefined,
    state: 0,
    description: '',
  };
}

export const Scope = {
  encode(message: Scope, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scopeId !== undefined) {
      ScopeID.encode(message.scopeId, writer.uint32(10).fork()).ldelim();
    }
    if (message.version !== undefined) {
      Version.encode(message.version, writer.uint32(18).fork()).ldelim();
    }
    if (message.consensus !== undefined) {
      Consensus.encode(message.consensus, writer.uint32(26).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(32).int32(message.state);
    }
    if (message.description !== '') {
      writer.uint32(42).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Scope {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScope();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.scopeId = ScopeID.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.version = Version.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.consensus = Consensus.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Scope {
    return {
      scopeId: isSet(object.scopeId) ? ScopeID.fromJSON(object.scopeId) : undefined,
      version: isSet(object.version) ? Version.fromJSON(object.version) : undefined,
      consensus: isSet(object.consensus) ? Consensus.fromJSON(object.consensus) : undefined,
      state: isSet(object.state) ? stateFromJSON(object.state) : 0,
      description: isSet(object.description) ? globalThis.String(object.description) : '',
    };
  },

  toJSON(message: Scope): unknown {
    const obj: any = {};
    if (message.scopeId !== undefined) {
      obj.scopeId = ScopeID.toJSON(message.scopeId);
    }
    if (message.version !== undefined) {
      obj.version = Version.toJSON(message.version);
    }
    if (message.consensus !== undefined) {
      obj.consensus = Consensus.toJSON(message.consensus);
    }
    if (message.state !== 0) {
      obj.state = stateToJSON(message.state);
    }
    if (message.description !== '') {
      obj.description = message.description;
    }
    return obj;
  },

  create(base?: DeepPartial<Scope>): Scope {
    return Scope.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Scope>): Scope {
    const message = createBaseScope();
    message.scopeId =
      object.scopeId !== undefined && object.scopeId !== null
        ? ScopeID.fromPartial(object.scopeId)
        : undefined;
    message.version =
      object.version !== undefined && object.version !== null
        ? Version.fromPartial(object.version)
        : undefined;
    message.consensus =
      object.consensus !== undefined && object.consensus !== null
        ? Consensus.fromPartial(object.consensus)
        : undefined;
    message.state = object.state ?? 0;
    message.description = object.description ?? '';
    return message;
  },
};

function createBaseParameter(): Parameter {
  return { body: undefined, id: undefined, version: undefined, state: 0 };
}

export const Parameter = {
  encode(message: Parameter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.body !== undefined) {
      ParameterBody.encode(message.body, writer.uint32(10).fork()).ldelim();
    }
    if (message.id !== undefined) {
      ParameterID.encode(message.id, writer.uint32(18).fork()).ldelim();
    }
    if (message.version !== undefined) {
      Version.encode(message.version, writer.uint32(26).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(32).int32(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Parameter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParameter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.body = ParameterBody.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = ParameterID.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.version = Version.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Parameter {
    return {
      body: isSet(object.body) ? ParameterBody.fromJSON(object.body) : undefined,
      id: isSet(object.id) ? ParameterID.fromJSON(object.id) : undefined,
      version: isSet(object.version) ? Version.fromJSON(object.version) : undefined,
      state: isSet(object.state) ? stateFromJSON(object.state) : 0,
    };
  },

  toJSON(message: Parameter): unknown {
    const obj: any = {};
    if (message.body !== undefined) {
      obj.body = ParameterBody.toJSON(message.body);
    }
    if (message.id !== undefined) {
      obj.id = ParameterID.toJSON(message.id);
    }
    if (message.version !== undefined) {
      obj.version = Version.toJSON(message.version);
    }
    if (message.state !== 0) {
      obj.state = stateToJSON(message.state);
    }
    return obj;
  },

  create(base?: DeepPartial<Parameter>): Parameter {
    return Parameter.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Parameter>): Parameter {
    const message = createBaseParameter();
    message.body =
      object.body !== undefined && object.body !== null
        ? ParameterBody.fromPartial(object.body)
        : undefined;
    message.id =
      object.id !== undefined && object.id !== null
        ? ParameterID.fromPartial(object.id)
        : undefined;
    message.version =
      object.version !== undefined && object.version !== null
        ? Version.fromPartial(object.version)
        : undefined;
    message.state = object.state ?? 0;
    return message;
  },
};

function createBaseParameterBody(): ParameterBody {
  return {
    boolean: undefined,
    text: undefined,
    numeric: undefined,
    featureFlag: undefined,
    stringMap: undefined,
    stringArray: undefined,
    nodeCluster: undefined,
    splitTest: undefined,
    configFile: undefined,
    duration: undefined,
    secretText: undefined,
    limitConfig: undefined,
    raftCluster: undefined,
    fullLimitConfig: undefined,
    orchestration: undefined,
    tierArray: undefined,
    featureSetMetadata: undefined,
    modelFeaturesConfig: undefined,
    erc20Asset: undefined,
    splitTestMetadata: undefined,
    splitTestsFollowed: undefined,
    splitTestAdminEvents: undefined,
    modelScoreCachePolicy: undefined,
    modelScoreCachePolicyArray: undefined,
    intMap: undefined,
    incentiveExperimentsConfig: undefined,
    currency: undefined,
    network: undefined,
    killSwitch: undefined,
    mlModelThresholdConfig: undefined,
    entryGatewayLoadTestConfig: undefined,
    feeOverride: undefined,
    commerceAssets: undefined,
    eouProductConfig: undefined,
    openBankingBankDetails: undefined,
    openBankingBankDetailsV2: undefined,
    loadShedRules: undefined,
    horusConfig: undefined,
    cloudKillSwitchConfig: undefined,
    riskCheckConfig: undefined,
  };
}

export const ParameterBody = {
  encode(message: ParameterBody, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.boolean !== undefined) {
      writer.uint32(8).bool(message.boolean);
    }
    if (message.text !== undefined) {
      writer.uint32(18).string(message.text);
    }
    if (message.numeric !== undefined) {
      writer.uint32(24).int64(message.numeric);
    }
    if (message.featureFlag !== undefined) {
      FeatureFlag.encode(message.featureFlag, writer.uint32(34).fork()).ldelim();
    }
    if (message.stringMap !== undefined) {
      StringMap.encode(message.stringMap, writer.uint32(50).fork()).ldelim();
    }
    if (message.stringArray !== undefined) {
      StringArray.encode(message.stringArray, writer.uint32(58).fork()).ldelim();
    }
    if (message.nodeCluster !== undefined) {
      NodeCluster.encode(message.nodeCluster, writer.uint32(66).fork()).ldelim();
    }
    if (message.splitTest !== undefined) {
      SplitTest.encode(message.splitTest, writer.uint32(74).fork()).ldelim();
    }
    if (message.configFile !== undefined) {
      ConfigFile.encode(message.configFile, writer.uint32(82).fork()).ldelim();
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(90).fork()).ldelim();
    }
    if (message.secretText !== undefined) {
      SecretText.encode(message.secretText, writer.uint32(98).fork()).ldelim();
    }
    if (message.limitConfig !== undefined) {
      LimitConfig.encode(message.limitConfig, writer.uint32(106).fork()).ldelim();
    }
    if (message.raftCluster !== undefined) {
      RaftCluster.encode(message.raftCluster, writer.uint32(114).fork()).ldelim();
    }
    if (message.fullLimitConfig !== undefined) {
      FullLimitConfig.encode(message.fullLimitConfig, writer.uint32(122).fork()).ldelim();
    }
    if (message.orchestration !== undefined) {
      Orchestration.encode(message.orchestration, writer.uint32(130).fork()).ldelim();
    }
    if (message.tierArray !== undefined) {
      TierArray.encode(message.tierArray, writer.uint32(138).fork()).ldelim();
    }
    if (message.featureSetMetadata !== undefined) {
      FeatureSetMetadata.encode(message.featureSetMetadata, writer.uint32(146).fork()).ldelim();
    }
    if (message.modelFeaturesConfig !== undefined) {
      ModelFeaturesConfig.encode(message.modelFeaturesConfig, writer.uint32(154).fork()).ldelim();
    }
    if (message.erc20Asset !== undefined) {
      Erc20Asset.encode(message.erc20Asset, writer.uint32(162).fork()).ldelim();
    }
    if (message.splitTestMetadata !== undefined) {
      SplitTestMetadata.encode(message.splitTestMetadata, writer.uint32(170).fork()).ldelim();
    }
    if (message.splitTestsFollowed !== undefined) {
      SplitTestsFollowed.encode(message.splitTestsFollowed, writer.uint32(178).fork()).ldelim();
    }
    if (message.splitTestAdminEvents !== undefined) {
      SplitTestAdminEvents.encode(message.splitTestAdminEvents, writer.uint32(186).fork()).ldelim();
    }
    if (message.modelScoreCachePolicy !== undefined) {
      ModelScoreCachePolicy.encode(
        message.modelScoreCachePolicy,
        writer.uint32(194).fork(),
      ).ldelim();
    }
    if (message.modelScoreCachePolicyArray !== undefined) {
      ModelScoreCachePolicyArray.encode(
        message.modelScoreCachePolicyArray,
        writer.uint32(202).fork(),
      ).ldelim();
    }
    if (message.intMap !== undefined) {
      IntMap.encode(message.intMap, writer.uint32(210).fork()).ldelim();
    }
    if (message.incentiveExperimentsConfig !== undefined) {
      IncentiveExperimentsConfig.encode(
        message.incentiveExperimentsConfig,
        writer.uint32(218).fork(),
      ).ldelim();
    }
    if (message.currency !== undefined) {
      Currency.encode(message.currency, writer.uint32(226).fork()).ldelim();
    }
    if (message.network !== undefined) {
      Network.encode(message.network, writer.uint32(234).fork()).ldelim();
    }
    if (message.killSwitch !== undefined) {
      KillSwitch.encode(message.killSwitch, writer.uint32(242).fork()).ldelim();
    }
    if (message.mlModelThresholdConfig !== undefined) {
      MlModelThresholdConfig.encode(
        message.mlModelThresholdConfig,
        writer.uint32(250).fork(),
      ).ldelim();
    }
    if (message.entryGatewayLoadTestConfig !== undefined) {
      EntryGatewayLoadTestConfig.encode(
        message.entryGatewayLoadTestConfig,
        writer.uint32(258).fork(),
      ).ldelim();
    }
    if (message.feeOverride !== undefined) {
      FeeOverride.encode(message.feeOverride, writer.uint32(266).fork()).ldelim();
    }
    if (message.commerceAssets !== undefined) {
      CommerceAssets.encode(message.commerceAssets, writer.uint32(274).fork()).ldelim();
    }
    if (message.eouProductConfig !== undefined) {
      EouProductConfig.encode(message.eouProductConfig, writer.uint32(282).fork()).ldelim();
    }
    if (message.openBankingBankDetails !== undefined) {
      OpenBankingBankDetails.encode(
        message.openBankingBankDetails,
        writer.uint32(290).fork(),
      ).ldelim();
    }
    if (message.openBankingBankDetailsV2 !== undefined) {
      OpenBankingBankDetailsV2.encode(
        message.openBankingBankDetailsV2,
        writer.uint32(298).fork(),
      ).ldelim();
    }
    if (message.loadShedRules !== undefined) {
      LoadShedRules.encode(message.loadShedRules, writer.uint32(306).fork()).ldelim();
    }
    if (message.horusConfig !== undefined) {
      HorusConfig.encode(message.horusConfig, writer.uint32(314).fork()).ldelim();
    }
    if (message.cloudKillSwitchConfig !== undefined) {
      CloudKillSwitchConfig.encode(
        message.cloudKillSwitchConfig,
        writer.uint32(322).fork(),
      ).ldelim();
    }
    if (message.riskCheckConfig !== undefined) {
      RiskCheckConfig.encode(message.riskCheckConfig, writer.uint32(330).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParameterBody {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParameterBody();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.boolean = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.text = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.numeric = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.featureFlag = FeatureFlag.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.stringMap = StringMap.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.stringArray = StringArray.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.nodeCluster = NodeCluster.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.splitTest = SplitTest.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.configFile = ConfigFile.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.duration = Duration.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.secretText = SecretText.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.limitConfig = LimitConfig.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.raftCluster = RaftCluster.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.fullLimitConfig = FullLimitConfig.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.orchestration = Orchestration.decode(reader, reader.uint32());
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.tierArray = TierArray.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.featureSetMetadata = FeatureSetMetadata.decode(reader, reader.uint32());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.modelFeaturesConfig = ModelFeaturesConfig.decode(reader, reader.uint32());
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.erc20Asset = Erc20Asset.decode(reader, reader.uint32());
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.splitTestMetadata = SplitTestMetadata.decode(reader, reader.uint32());
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.splitTestsFollowed = SplitTestsFollowed.decode(reader, reader.uint32());
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.splitTestAdminEvents = SplitTestAdminEvents.decode(reader, reader.uint32());
          continue;
        case 24:
          if (tag !== 194) {
            break;
          }

          message.modelScoreCachePolicy = ModelScoreCachePolicy.decode(reader, reader.uint32());
          continue;
        case 25:
          if (tag !== 202) {
            break;
          }

          message.modelScoreCachePolicyArray = ModelScoreCachePolicyArray.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 26:
          if (tag !== 210) {
            break;
          }

          message.intMap = IntMap.decode(reader, reader.uint32());
          continue;
        case 27:
          if (tag !== 218) {
            break;
          }

          message.incentiveExperimentsConfig = IncentiveExperimentsConfig.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 28:
          if (tag !== 226) {
            break;
          }

          message.currency = Currency.decode(reader, reader.uint32());
          continue;
        case 29:
          if (tag !== 234) {
            break;
          }

          message.network = Network.decode(reader, reader.uint32());
          continue;
        case 30:
          if (tag !== 242) {
            break;
          }

          message.killSwitch = KillSwitch.decode(reader, reader.uint32());
          continue;
        case 31:
          if (tag !== 250) {
            break;
          }

          message.mlModelThresholdConfig = MlModelThresholdConfig.decode(reader, reader.uint32());
          continue;
        case 32:
          if (tag !== 258) {
            break;
          }

          message.entryGatewayLoadTestConfig = EntryGatewayLoadTestConfig.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 33:
          if (tag !== 266) {
            break;
          }

          message.feeOverride = FeeOverride.decode(reader, reader.uint32());
          continue;
        case 34:
          if (tag !== 274) {
            break;
          }

          message.commerceAssets = CommerceAssets.decode(reader, reader.uint32());
          continue;
        case 35:
          if (tag !== 282) {
            break;
          }

          message.eouProductConfig = EouProductConfig.decode(reader, reader.uint32());
          continue;
        case 36:
          if (tag !== 290) {
            break;
          }

          message.openBankingBankDetails = OpenBankingBankDetails.decode(reader, reader.uint32());
          continue;
        case 37:
          if (tag !== 298) {
            break;
          }

          message.openBankingBankDetailsV2 = OpenBankingBankDetailsV2.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 38:
          if (tag !== 306) {
            break;
          }

          message.loadShedRules = LoadShedRules.decode(reader, reader.uint32());
          continue;
        case 39:
          if (tag !== 314) {
            break;
          }

          message.horusConfig = HorusConfig.decode(reader, reader.uint32());
          continue;
        case 40:
          if (tag !== 322) {
            break;
          }

          message.cloudKillSwitchConfig = CloudKillSwitchConfig.decode(reader, reader.uint32());
          continue;
        case 41:
          if (tag !== 330) {
            break;
          }

          message.riskCheckConfig = RiskCheckConfig.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ParameterBody {
    return {
      boolean: isSet(object.boolean) ? globalThis.Boolean(object.boolean) : undefined,
      text: isSet(object.text) ? globalThis.String(object.text) : undefined,
      numeric: isSet(object.numeric) ? globalThis.Number(object.numeric) : undefined,
      featureFlag: isSet(object.featureFlag) ? FeatureFlag.fromJSON(object.featureFlag) : undefined,
      stringMap: isSet(object.stringMap) ? StringMap.fromJSON(object.stringMap) : undefined,
      stringArray: isSet(object.stringArray) ? StringArray.fromJSON(object.stringArray) : undefined,
      nodeCluster: isSet(object.nodeCluster) ? NodeCluster.fromJSON(object.nodeCluster) : undefined,
      splitTest: isSet(object.splitTest) ? SplitTest.fromJSON(object.splitTest) : undefined,
      configFile: isSet(object.configFile) ? ConfigFile.fromJSON(object.configFile) : undefined,
      duration: isSet(object.duration) ? Duration.fromJSON(object.duration) : undefined,
      secretText: isSet(object.secretText) ? SecretText.fromJSON(object.secretText) : undefined,
      limitConfig: isSet(object.limitConfig) ? LimitConfig.fromJSON(object.limitConfig) : undefined,
      raftCluster: isSet(object.raftCluster) ? RaftCluster.fromJSON(object.raftCluster) : undefined,
      fullLimitConfig: isSet(object.fullLimitConfig)
        ? FullLimitConfig.fromJSON(object.fullLimitConfig)
        : undefined,
      orchestration: isSet(object.orchestration)
        ? Orchestration.fromJSON(object.orchestration)
        : undefined,
      tierArray: isSet(object.tierArray) ? TierArray.fromJSON(object.tierArray) : undefined,
      featureSetMetadata: isSet(object.featureSetMetadata)
        ? FeatureSetMetadata.fromJSON(object.featureSetMetadata)
        : undefined,
      modelFeaturesConfig: isSet(object.modelFeaturesConfig)
        ? ModelFeaturesConfig.fromJSON(object.modelFeaturesConfig)
        : undefined,
      erc20Asset: isSet(object.erc20Asset) ? Erc20Asset.fromJSON(object.erc20Asset) : undefined,
      splitTestMetadata: isSet(object.splitTestMetadata)
        ? SplitTestMetadata.fromJSON(object.splitTestMetadata)
        : undefined,
      splitTestsFollowed: isSet(object.splitTestsFollowed)
        ? SplitTestsFollowed.fromJSON(object.splitTestsFollowed)
        : undefined,
      splitTestAdminEvents: isSet(object.splitTestAdminEvents)
        ? SplitTestAdminEvents.fromJSON(object.splitTestAdminEvents)
        : undefined,
      modelScoreCachePolicy: isSet(object.modelScoreCachePolicy)
        ? ModelScoreCachePolicy.fromJSON(object.modelScoreCachePolicy)
        : undefined,
      modelScoreCachePolicyArray: isSet(object.modelScoreCachePolicyArray)
        ? ModelScoreCachePolicyArray.fromJSON(object.modelScoreCachePolicyArray)
        : undefined,
      intMap: isSet(object.intMap) ? IntMap.fromJSON(object.intMap) : undefined,
      incentiveExperimentsConfig: isSet(object.incentiveExperimentsConfig)
        ? IncentiveExperimentsConfig.fromJSON(object.incentiveExperimentsConfig)
        : undefined,
      currency: isSet(object.currency) ? Currency.fromJSON(object.currency) : undefined,
      network: isSet(object.network) ? Network.fromJSON(object.network) : undefined,
      killSwitch: isSet(object.killSwitch) ? KillSwitch.fromJSON(object.killSwitch) : undefined,
      mlModelThresholdConfig: isSet(object.mlModelThresholdConfig)
        ? MlModelThresholdConfig.fromJSON(object.mlModelThresholdConfig)
        : undefined,
      entryGatewayLoadTestConfig: isSet(object.entryGatewayLoadTestConfig)
        ? EntryGatewayLoadTestConfig.fromJSON(object.entryGatewayLoadTestConfig)
        : undefined,
      feeOverride: isSet(object.feeOverride) ? FeeOverride.fromJSON(object.feeOverride) : undefined,
      commerceAssets: isSet(object.commerceAssets)
        ? CommerceAssets.fromJSON(object.commerceAssets)
        : undefined,
      eouProductConfig: isSet(object.eouProductConfig)
        ? EouProductConfig.fromJSON(object.eouProductConfig)
        : undefined,
      openBankingBankDetails: isSet(object.openBankingBankDetails)
        ? OpenBankingBankDetails.fromJSON(object.openBankingBankDetails)
        : undefined,
      openBankingBankDetailsV2: isSet(object.openBankingBankDetailsV2)
        ? OpenBankingBankDetailsV2.fromJSON(object.openBankingBankDetailsV2)
        : undefined,
      loadShedRules: isSet(object.loadShedRules)
        ? LoadShedRules.fromJSON(object.loadShedRules)
        : undefined,
      horusConfig: isSet(object.horusConfig) ? HorusConfig.fromJSON(object.horusConfig) : undefined,
      cloudKillSwitchConfig: isSet(object.cloudKillSwitchConfig)
        ? CloudKillSwitchConfig.fromJSON(object.cloudKillSwitchConfig)
        : undefined,
      riskCheckConfig: isSet(object.riskCheckConfig)
        ? RiskCheckConfig.fromJSON(object.riskCheckConfig)
        : undefined,
    };
  },

  toJSON(message: ParameterBody): unknown {
    const obj: any = {};
    if (message.boolean !== undefined) {
      obj.boolean = message.boolean;
    }
    if (message.text !== undefined) {
      obj.text = message.text;
    }
    if (message.numeric !== undefined) {
      obj.numeric = Math.round(message.numeric);
    }
    if (message.featureFlag !== undefined) {
      obj.featureFlag = FeatureFlag.toJSON(message.featureFlag);
    }
    if (message.stringMap !== undefined) {
      obj.stringMap = StringMap.toJSON(message.stringMap);
    }
    if (message.stringArray !== undefined) {
      obj.stringArray = StringArray.toJSON(message.stringArray);
    }
    if (message.nodeCluster !== undefined) {
      obj.nodeCluster = NodeCluster.toJSON(message.nodeCluster);
    }
    if (message.splitTest !== undefined) {
      obj.splitTest = SplitTest.toJSON(message.splitTest);
    }
    if (message.configFile !== undefined) {
      obj.configFile = ConfigFile.toJSON(message.configFile);
    }
    if (message.duration !== undefined) {
      obj.duration = Duration.toJSON(message.duration);
    }
    if (message.secretText !== undefined) {
      obj.secretText = SecretText.toJSON(message.secretText);
    }
    if (message.limitConfig !== undefined) {
      obj.limitConfig = LimitConfig.toJSON(message.limitConfig);
    }
    if (message.raftCluster !== undefined) {
      obj.raftCluster = RaftCluster.toJSON(message.raftCluster);
    }
    if (message.fullLimitConfig !== undefined) {
      obj.fullLimitConfig = FullLimitConfig.toJSON(message.fullLimitConfig);
    }
    if (message.orchestration !== undefined) {
      obj.orchestration = Orchestration.toJSON(message.orchestration);
    }
    if (message.tierArray !== undefined) {
      obj.tierArray = TierArray.toJSON(message.tierArray);
    }
    if (message.featureSetMetadata !== undefined) {
      obj.featureSetMetadata = FeatureSetMetadata.toJSON(message.featureSetMetadata);
    }
    if (message.modelFeaturesConfig !== undefined) {
      obj.modelFeaturesConfig = ModelFeaturesConfig.toJSON(message.modelFeaturesConfig);
    }
    if (message.erc20Asset !== undefined) {
      obj.erc20Asset = Erc20Asset.toJSON(message.erc20Asset);
    }
    if (message.splitTestMetadata !== undefined) {
      obj.splitTestMetadata = SplitTestMetadata.toJSON(message.splitTestMetadata);
    }
    if (message.splitTestsFollowed !== undefined) {
      obj.splitTestsFollowed = SplitTestsFollowed.toJSON(message.splitTestsFollowed);
    }
    if (message.splitTestAdminEvents !== undefined) {
      obj.splitTestAdminEvents = SplitTestAdminEvents.toJSON(message.splitTestAdminEvents);
    }
    if (message.modelScoreCachePolicy !== undefined) {
      obj.modelScoreCachePolicy = ModelScoreCachePolicy.toJSON(message.modelScoreCachePolicy);
    }
    if (message.modelScoreCachePolicyArray !== undefined) {
      obj.modelScoreCachePolicyArray = ModelScoreCachePolicyArray.toJSON(
        message.modelScoreCachePolicyArray,
      );
    }
    if (message.intMap !== undefined) {
      obj.intMap = IntMap.toJSON(message.intMap);
    }
    if (message.incentiveExperimentsConfig !== undefined) {
      obj.incentiveExperimentsConfig = IncentiveExperimentsConfig.toJSON(
        message.incentiveExperimentsConfig,
      );
    }
    if (message.currency !== undefined) {
      obj.currency = Currency.toJSON(message.currency);
    }
    if (message.network !== undefined) {
      obj.network = Network.toJSON(message.network);
    }
    if (message.killSwitch !== undefined) {
      obj.killSwitch = KillSwitch.toJSON(message.killSwitch);
    }
    if (message.mlModelThresholdConfig !== undefined) {
      obj.mlModelThresholdConfig = MlModelThresholdConfig.toJSON(message.mlModelThresholdConfig);
    }
    if (message.entryGatewayLoadTestConfig !== undefined) {
      obj.entryGatewayLoadTestConfig = EntryGatewayLoadTestConfig.toJSON(
        message.entryGatewayLoadTestConfig,
      );
    }
    if (message.feeOverride !== undefined) {
      obj.feeOverride = FeeOverride.toJSON(message.feeOverride);
    }
    if (message.commerceAssets !== undefined) {
      obj.commerceAssets = CommerceAssets.toJSON(message.commerceAssets);
    }
    if (message.eouProductConfig !== undefined) {
      obj.eouProductConfig = EouProductConfig.toJSON(message.eouProductConfig);
    }
    if (message.openBankingBankDetails !== undefined) {
      obj.openBankingBankDetails = OpenBankingBankDetails.toJSON(message.openBankingBankDetails);
    }
    if (message.openBankingBankDetailsV2 !== undefined) {
      obj.openBankingBankDetailsV2 = OpenBankingBankDetailsV2.toJSON(
        message.openBankingBankDetailsV2,
      );
    }
    if (message.loadShedRules !== undefined) {
      obj.loadShedRules = LoadShedRules.toJSON(message.loadShedRules);
    }
    if (message.horusConfig !== undefined) {
      obj.horusConfig = HorusConfig.toJSON(message.horusConfig);
    }
    if (message.cloudKillSwitchConfig !== undefined) {
      obj.cloudKillSwitchConfig = CloudKillSwitchConfig.toJSON(message.cloudKillSwitchConfig);
    }
    if (message.riskCheckConfig !== undefined) {
      obj.riskCheckConfig = RiskCheckConfig.toJSON(message.riskCheckConfig);
    }
    return obj;
  },

  create(base?: DeepPartial<ParameterBody>): ParameterBody {
    return ParameterBody.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ParameterBody>): ParameterBody {
    const message = createBaseParameterBody();
    message.boolean = object.boolean ?? undefined;
    message.text = object.text ?? undefined;
    message.numeric = object.numeric ?? undefined;
    message.featureFlag =
      object.featureFlag !== undefined && object.featureFlag !== null
        ? FeatureFlag.fromPartial(object.featureFlag)
        : undefined;
    message.stringMap =
      object.stringMap !== undefined && object.stringMap !== null
        ? StringMap.fromPartial(object.stringMap)
        : undefined;
    message.stringArray =
      object.stringArray !== undefined && object.stringArray !== null
        ? StringArray.fromPartial(object.stringArray)
        : undefined;
    message.nodeCluster =
      object.nodeCluster !== undefined && object.nodeCluster !== null
        ? NodeCluster.fromPartial(object.nodeCluster)
        : undefined;
    message.splitTest =
      object.splitTest !== undefined && object.splitTest !== null
        ? SplitTest.fromPartial(object.splitTest)
        : undefined;
    message.configFile =
      object.configFile !== undefined && object.configFile !== null
        ? ConfigFile.fromPartial(object.configFile)
        : undefined;
    message.duration =
      object.duration !== undefined && object.duration !== null
        ? Duration.fromPartial(object.duration)
        : undefined;
    message.secretText =
      object.secretText !== undefined && object.secretText !== null
        ? SecretText.fromPartial(object.secretText)
        : undefined;
    message.limitConfig =
      object.limitConfig !== undefined && object.limitConfig !== null
        ? LimitConfig.fromPartial(object.limitConfig)
        : undefined;
    message.raftCluster =
      object.raftCluster !== undefined && object.raftCluster !== null
        ? RaftCluster.fromPartial(object.raftCluster)
        : undefined;
    message.fullLimitConfig =
      object.fullLimitConfig !== undefined && object.fullLimitConfig !== null
        ? FullLimitConfig.fromPartial(object.fullLimitConfig)
        : undefined;
    message.orchestration =
      object.orchestration !== undefined && object.orchestration !== null
        ? Orchestration.fromPartial(object.orchestration)
        : undefined;
    message.tierArray =
      object.tierArray !== undefined && object.tierArray !== null
        ? TierArray.fromPartial(object.tierArray)
        : undefined;
    message.featureSetMetadata =
      object.featureSetMetadata !== undefined && object.featureSetMetadata !== null
        ? FeatureSetMetadata.fromPartial(object.featureSetMetadata)
        : undefined;
    message.modelFeaturesConfig =
      object.modelFeaturesConfig !== undefined && object.modelFeaturesConfig !== null
        ? ModelFeaturesConfig.fromPartial(object.modelFeaturesConfig)
        : undefined;
    message.erc20Asset =
      object.erc20Asset !== undefined && object.erc20Asset !== null
        ? Erc20Asset.fromPartial(object.erc20Asset)
        : undefined;
    message.splitTestMetadata =
      object.splitTestMetadata !== undefined && object.splitTestMetadata !== null
        ? SplitTestMetadata.fromPartial(object.splitTestMetadata)
        : undefined;
    message.splitTestsFollowed =
      object.splitTestsFollowed !== undefined && object.splitTestsFollowed !== null
        ? SplitTestsFollowed.fromPartial(object.splitTestsFollowed)
        : undefined;
    message.splitTestAdminEvents =
      object.splitTestAdminEvents !== undefined && object.splitTestAdminEvents !== null
        ? SplitTestAdminEvents.fromPartial(object.splitTestAdminEvents)
        : undefined;
    message.modelScoreCachePolicy =
      object.modelScoreCachePolicy !== undefined && object.modelScoreCachePolicy !== null
        ? ModelScoreCachePolicy.fromPartial(object.modelScoreCachePolicy)
        : undefined;
    message.modelScoreCachePolicyArray =
      object.modelScoreCachePolicyArray !== undefined && object.modelScoreCachePolicyArray !== null
        ? ModelScoreCachePolicyArray.fromPartial(object.modelScoreCachePolicyArray)
        : undefined;
    message.intMap =
      object.intMap !== undefined && object.intMap !== null
        ? IntMap.fromPartial(object.intMap)
        : undefined;
    message.incentiveExperimentsConfig =
      object.incentiveExperimentsConfig !== undefined && object.incentiveExperimentsConfig !== null
        ? IncentiveExperimentsConfig.fromPartial(object.incentiveExperimentsConfig)
        : undefined;
    message.currency =
      object.currency !== undefined && object.currency !== null
        ? Currency.fromPartial(object.currency)
        : undefined;
    message.network =
      object.network !== undefined && object.network !== null
        ? Network.fromPartial(object.network)
        : undefined;
    message.killSwitch =
      object.killSwitch !== undefined && object.killSwitch !== null
        ? KillSwitch.fromPartial(object.killSwitch)
        : undefined;
    message.mlModelThresholdConfig =
      object.mlModelThresholdConfig !== undefined && object.mlModelThresholdConfig !== null
        ? MlModelThresholdConfig.fromPartial(object.mlModelThresholdConfig)
        : undefined;
    message.entryGatewayLoadTestConfig =
      object.entryGatewayLoadTestConfig !== undefined && object.entryGatewayLoadTestConfig !== null
        ? EntryGatewayLoadTestConfig.fromPartial(object.entryGatewayLoadTestConfig)
        : undefined;
    message.feeOverride =
      object.feeOverride !== undefined && object.feeOverride !== null
        ? FeeOverride.fromPartial(object.feeOverride)
        : undefined;
    message.commerceAssets =
      object.commerceAssets !== undefined && object.commerceAssets !== null
        ? CommerceAssets.fromPartial(object.commerceAssets)
        : undefined;
    message.eouProductConfig =
      object.eouProductConfig !== undefined && object.eouProductConfig !== null
        ? EouProductConfig.fromPartial(object.eouProductConfig)
        : undefined;
    message.openBankingBankDetails =
      object.openBankingBankDetails !== undefined && object.openBankingBankDetails !== null
        ? OpenBankingBankDetails.fromPartial(object.openBankingBankDetails)
        : undefined;
    message.openBankingBankDetailsV2 =
      object.openBankingBankDetailsV2 !== undefined && object.openBankingBankDetailsV2 !== null
        ? OpenBankingBankDetailsV2.fromPartial(object.openBankingBankDetailsV2)
        : undefined;
    message.loadShedRules =
      object.loadShedRules !== undefined && object.loadShedRules !== null
        ? LoadShedRules.fromPartial(object.loadShedRules)
        : undefined;
    message.horusConfig =
      object.horusConfig !== undefined && object.horusConfig !== null
        ? HorusConfig.fromPartial(object.horusConfig)
        : undefined;
    message.cloudKillSwitchConfig =
      object.cloudKillSwitchConfig !== undefined && object.cloudKillSwitchConfig !== null
        ? CloudKillSwitchConfig.fromPartial(object.cloudKillSwitchConfig)
        : undefined;
    message.riskCheckConfig =
      object.riskCheckConfig !== undefined && object.riskCheckConfig !== null
        ? RiskCheckConfig.fromPartial(object.riskCheckConfig)
        : undefined;
    return message;
  },
};

function createBasePrincipalConfigs(): PrincipalConfigs {
  return { configs: [] };
}

export const PrincipalConfigs = {
  encode(message: PrincipalConfigs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.configs) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PrincipalConfigs {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrincipalConfigs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.configs.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PrincipalConfigs {
    return {
      configs: globalThis.Array.isArray(object?.configs)
        ? object.configs.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: PrincipalConfigs): unknown {
    const obj: any = {};
    if (message.configs?.length) {
      obj.configs = message.configs;
    }
    return obj;
  },

  create(base?: DeepPartial<PrincipalConfigs>): PrincipalConfigs {
    return PrincipalConfigs.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PrincipalConfigs>): PrincipalConfigs {
    const message = createBasePrincipalConfigs();
    message.configs = object.configs?.map((e) => e) || [];
    return message;
  },
};

function createBaseConsensus(): Consensus {
  return {
    requiredReviews: 0,
    cafRequired: false,
    team: undefined,
    proj: undefined,
    clients: [],
    allowedPrincipals: {},
  };
}

export const Consensus = {
  encode(message: Consensus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.requiredReviews !== 0) {
      writer.uint32(8).uint32(message.requiredReviews);
    }
    if (message.cafRequired === true) {
      writer.uint32(16).bool(message.cafRequired);
    }
    if (message.team !== undefined) {
      writer.uint32(26).string(message.team);
    }
    if (message.proj !== undefined) {
      Consensus_Project.encode(message.proj, writer.uint32(42).fork()).ldelim();
    }
    writer.uint32(34).fork();
    for (const v of message.clients) {
      writer.int32(v);
    }
    writer.ldelim();
    Object.entries(message.allowedPrincipals).forEach(([key, value]) => {
      Consensus_AllowedPrincipalsEntry.encode(
        { key: key as any, value },
        writer.uint32(50).fork(),
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Consensus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsensus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requiredReviews = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.cafRequired = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.team = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.proj = Consensus_Project.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag === 32) {
            message.clients.push(reader.int32() as any);

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.clients.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 6:
          if (tag !== 50) {
            break;
          }

          const entry6 = Consensus_AllowedPrincipalsEntry.decode(reader, reader.uint32());
          if (entry6.value !== undefined) {
            message.allowedPrincipals[entry6.key] = entry6.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Consensus {
    return {
      requiredReviews: isSet(object.requiredReviews)
        ? globalThis.Number(object.requiredReviews)
        : 0,
      cafRequired: isSet(object.cafRequired) ? globalThis.Boolean(object.cafRequired) : false,
      team: isSet(object.team) ? globalThis.String(object.team) : undefined,
      proj: isSet(object.proj) ? Consensus_Project.fromJSON(object.proj) : undefined,
      clients: globalThis.Array.isArray(object?.clients)
        ? object.clients.map((e: any) => knownClientFromJSON(e))
        : [],
      allowedPrincipals: isObject(object.allowedPrincipals)
        ? Object.entries(object.allowedPrincipals).reduce<{ [key: string]: PrincipalConfigs }>(
            (acc, [key, value]) => {
              acc[key] = PrincipalConfigs.fromJSON(value);
              return acc;
            },
            {},
          )
        : {},
    };
  },

  toJSON(message: Consensus): unknown {
    const obj: any = {};
    if (message.requiredReviews !== 0) {
      obj.requiredReviews = Math.round(message.requiredReviews);
    }
    if (message.cafRequired === true) {
      obj.cafRequired = message.cafRequired;
    }
    if (message.team !== undefined) {
      obj.team = message.team;
    }
    if (message.proj !== undefined) {
      obj.proj = Consensus_Project.toJSON(message.proj);
    }
    if (message.clients?.length) {
      obj.clients = message.clients.map((e) => knownClientToJSON(e));
    }
    if (message.allowedPrincipals) {
      const entries = Object.entries(message.allowedPrincipals);
      if (entries.length > 0) {
        obj.allowedPrincipals = {};
        entries.forEach(([k, v]) => {
          obj.allowedPrincipals[k] = PrincipalConfigs.toJSON(v);
        });
      }
    }
    return obj;
  },

  create(base?: DeepPartial<Consensus>): Consensus {
    return Consensus.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Consensus>): Consensus {
    const message = createBaseConsensus();
    message.requiredReviews = object.requiredReviews ?? 0;
    message.cafRequired = object.cafRequired ?? false;
    message.team = object.team ?? undefined;
    message.proj =
      object.proj !== undefined && object.proj !== null
        ? Consensus_Project.fromPartial(object.proj)
        : undefined;
    message.clients = object.clients?.map((e) => e) || [];
    message.allowedPrincipals = Object.entries(object.allowedPrincipals ?? {}).reduce<{
      [key: string]: PrincipalConfigs;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = PrincipalConfigs.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseConsensus_Project(): Consensus_Project {
  return { name: '' };
}

export const Consensus_Project = {
  encode(message: Consensus_Project, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Consensus_Project {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsensus_Project();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Consensus_Project {
    return { name: isSet(object.name) ? globalThis.String(object.name) : '' };
  },

  toJSON(message: Consensus_Project): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    return obj;
  },

  create(base?: DeepPartial<Consensus_Project>): Consensus_Project {
    return Consensus_Project.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Consensus_Project>): Consensus_Project {
    const message = createBaseConsensus_Project();
    message.name = object.name ?? '';
    return message;
  },
};

function createBaseConsensus_AllowedPrincipalsEntry(): Consensus_AllowedPrincipalsEntry {
  return { key: '', value: undefined };
}

export const Consensus_AllowedPrincipalsEntry = {
  encode(
    message: Consensus_AllowedPrincipalsEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      PrincipalConfigs.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Consensus_AllowedPrincipalsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsensus_AllowedPrincipalsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = PrincipalConfigs.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Consensus_AllowedPrincipalsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : '',
      value: isSet(object.value) ? PrincipalConfigs.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: Consensus_AllowedPrincipalsEntry): unknown {
    const obj: any = {};
    if (message.key !== '') {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = PrincipalConfigs.toJSON(message.value);
    }
    return obj;
  },

  create(base?: DeepPartial<Consensus_AllowedPrincipalsEntry>): Consensus_AllowedPrincipalsEntry {
    return Consensus_AllowedPrincipalsEntry.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<Consensus_AllowedPrincipalsEntry>,
  ): Consensus_AllowedPrincipalsEntry {
    const message = createBaseConsensus_AllowedPrincipalsEntry();
    message.key = object.key ?? '';
    message.value =
      object.value !== undefined && object.value !== null
        ? PrincipalConfigs.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseNamespace(): Namespace {
  return { accountId: '', regionCode: '' };
}

export const Namespace = {
  encode(message: Namespace, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accountId !== '') {
      writer.uint32(10).string(message.accountId);
    }
    if (message.regionCode !== '') {
      writer.uint32(18).string(message.regionCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Namespace {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNamespace();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accountId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.regionCode = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Namespace {
    return {
      accountId: isSet(object.accountId) ? globalThis.String(object.accountId) : '',
      regionCode: isSet(object.regionCode) ? globalThis.String(object.regionCode) : '',
    };
  },

  toJSON(message: Namespace): unknown {
    const obj: any = {};
    if (message.accountId !== '') {
      obj.accountId = message.accountId;
    }
    if (message.regionCode !== '') {
      obj.regionCode = message.regionCode;
    }
    return obj;
  },

  create(base?: DeepPartial<Namespace>): Namespace {
    return Namespace.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Namespace>): Namespace {
    const message = createBaseNamespace();
    message.accountId = object.accountId ?? '';
    message.regionCode = object.regionCode ?? '';
    return message;
  },
};

function createBaseAccount(): Account {
  return { namespace: undefined, name: '' };
}

export const Account = {
  encode(message: Account, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.namespace !== undefined) {
      Namespace.encode(message.namespace, writer.uint32(10).fork()).ldelim();
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Account {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.namespace = Namespace.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Account {
    return {
      namespace: isSet(object.namespace) ? Namespace.fromJSON(object.namespace) : undefined,
      name: isSet(object.name) ? globalThis.String(object.name) : '',
    };
  },

  toJSON(message: Account): unknown {
    const obj: any = {};
    if (message.namespace !== undefined) {
      obj.namespace = Namespace.toJSON(message.namespace);
    }
    if (message.name !== '') {
      obj.name = message.name;
    }
    return obj;
  },

  create(base?: DeepPartial<Account>): Account {
    return Account.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Account>): Account {
    const message = createBaseAccount();
    message.namespace =
      object.namespace !== undefined && object.namespace !== null
        ? Namespace.fromPartial(object.namespace)
        : undefined;
    message.name = object.name ?? '';
    return message;
  },
};

function createBaseScopeID(): ScopeID {
  return { env: 0, name: '', namespace: undefined };
}

export const ScopeID = {
  encode(message: ScopeID, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.env !== 0) {
      writer.uint32(8).int32(message.env);
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name);
    }
    if (message.namespace !== undefined) {
      Namespace.encode(message.namespace, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScopeID {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScopeID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.env = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.namespace = Namespace.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScopeID {
    return {
      env: isSet(object.env) ? environmentFromJSON(object.env) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      namespace: isSet(object.namespace) ? Namespace.fromJSON(object.namespace) : undefined,
    };
  },

  toJSON(message: ScopeID): unknown {
    const obj: any = {};
    if (message.env !== 0) {
      obj.env = environmentToJSON(message.env);
    }
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.namespace !== undefined) {
      obj.namespace = Namespace.toJSON(message.namespace);
    }
    return obj;
  },

  create(base?: DeepPartial<ScopeID>): ScopeID {
    return ScopeID.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ScopeID>): ScopeID {
    const message = createBaseScopeID();
    message.env = object.env ?? 0;
    message.name = object.name ?? '';
    message.namespace =
      object.namespace !== undefined && object.namespace !== null
        ? Namespace.fromPartial(object.namespace)
        : undefined;
    return message;
  },
};

function createBaseParameterID(): ParameterID {
  return { scopeId: undefined, type: 0, name: '' };
}

export const ParameterID = {
  encode(message: ParameterID, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scopeId !== undefined) {
      ScopeID.encode(message.scopeId, writer.uint32(10).fork()).ldelim();
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.name !== '') {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParameterID {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParameterID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.scopeId = ScopeID.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ParameterID {
    return {
      scopeId: isSet(object.scopeId) ? ScopeID.fromJSON(object.scopeId) : undefined,
      type: isSet(object.type) ? typeFromJSON(object.type) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : '',
    };
  },

  toJSON(message: ParameterID): unknown {
    const obj: any = {};
    if (message.scopeId !== undefined) {
      obj.scopeId = ScopeID.toJSON(message.scopeId);
    }
    if (message.type !== 0) {
      obj.type = typeToJSON(message.type);
    }
    if (message.name !== '') {
      obj.name = message.name;
    }
    return obj;
  },

  create(base?: DeepPartial<ParameterID>): ParameterID {
    return ParameterID.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ParameterID>): ParameterID {
    const message = createBaseParameterID();
    message.scopeId =
      object.scopeId !== undefined && object.scopeId !== null
        ? ScopeID.fromPartial(object.scopeId)
        : undefined;
    message.type = object.type ?? 0;
    message.name = object.name ?? '';
    return message;
  },
};

function createBaseParameterIDAndVersion(): ParameterIDAndVersion {
  return { id: undefined, version: '' };
}

export const ParameterIDAndVersion = {
  encode(message: ParameterIDAndVersion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ParameterID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.version !== '') {
      writer.uint32(18).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParameterIDAndVersion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParameterIDAndVersion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = ParameterID.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.version = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ParameterIDAndVersion {
    return {
      id: isSet(object.id) ? ParameterID.fromJSON(object.id) : undefined,
      version: isSet(object.version) ? globalThis.String(object.version) : '',
    };
  },

  toJSON(message: ParameterIDAndVersion): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = ParameterID.toJSON(message.id);
    }
    if (message.version !== '') {
      obj.version = message.version;
    }
    return obj;
  },

  create(base?: DeepPartial<ParameterIDAndVersion>): ParameterIDAndVersion {
    return ParameterIDAndVersion.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ParameterIDAndVersion>): ParameterIDAndVersion {
    const message = createBaseParameterIDAndVersion();
    message.id =
      object.id !== undefined && object.id !== null
        ? ParameterID.fromPartial(object.id)
        : undefined;
    message.version = object.version ?? '';
    return message;
  },
};

function createBaseUnencryptedSecret(): UnencryptedSecret {
  return { plaintext: '', id: undefined, writeOnly: false, note: '' };
}

export const UnencryptedSecret = {
  encode(message: UnencryptedSecret, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.plaintext !== '') {
      writer.uint32(10).string(message.plaintext);
    }
    if (message.id !== undefined) {
      ParameterID.encode(message.id, writer.uint32(18).fork()).ldelim();
    }
    if (message.writeOnly === true) {
      writer.uint32(24).bool(message.writeOnly);
    }
    if (message.note !== '') {
      writer.uint32(34).string(message.note);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnencryptedSecret {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnencryptedSecret();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.plaintext = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = ParameterID.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.writeOnly = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.note = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UnencryptedSecret {
    return {
      plaintext: isSet(object.plaintext) ? globalThis.String(object.plaintext) : '',
      id: isSet(object.id) ? ParameterID.fromJSON(object.id) : undefined,
      writeOnly: isSet(object.writeOnly) ? globalThis.Boolean(object.writeOnly) : false,
      note: isSet(object.note) ? globalThis.String(object.note) : '',
    };
  },

  toJSON(message: UnencryptedSecret): unknown {
    const obj: any = {};
    if (message.plaintext !== '') {
      obj.plaintext = message.plaintext;
    }
    if (message.id !== undefined) {
      obj.id = ParameterID.toJSON(message.id);
    }
    if (message.writeOnly === true) {
      obj.writeOnly = message.writeOnly;
    }
    if (message.note !== '') {
      obj.note = message.note;
    }
    return obj;
  },

  create(base?: DeepPartial<UnencryptedSecret>): UnencryptedSecret {
    return UnencryptedSecret.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UnencryptedSecret>): UnencryptedSecret {
    const message = createBaseUnencryptedSecret();
    message.plaintext = object.plaintext ?? '';
    message.id =
      object.id !== undefined && object.id !== null
        ? ParameterID.fromPartial(object.id)
        : undefined;
    message.writeOnly = object.writeOnly ?? false;
    message.note = object.note ?? '';
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
  ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === 'string') {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
