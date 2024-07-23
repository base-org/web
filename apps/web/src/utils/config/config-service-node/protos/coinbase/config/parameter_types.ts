/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Duration as Duration1 } from '../../google/protobuf/duration';
import { Timestamp } from '../../google/protobuf/timestamp';

export const protobufPackage = 'coinbase.config';

/**
 * Type determines the strong type of a parameter. The types map one-to-one with
 * the oneof in ParameterBody
 *
 * NOTE: Value 5 was unused (MANUAL_TRADE example type). Can be repurposed
 * safely.
 */
export enum Type {
  UNKNOWN_TYPE = 0,
  /** BOOLEAN - Builtin Types */
  BOOLEAN = 1,
  NUMERIC = 2,
  TEXT = 3,
  /** STRING_MAP - Core Types */
  STRING_MAP = 6,
  STRING_ARRAY = 7,
  DURATION = 11,
  SECRET_TEXT = 12,
  /** FEATURE_FLAG - Custom Types */
  FEATURE_FLAG = 4,
  NODE_CLUSTER = 8,
  SPLIT_TEST = 9,
  CONFIG_FILE = 10,
  LIMIT_CONFIG = 13,
  RAFT_CLUSTER = 14,
  FULL_LIMIT_CONFIG = 15,
  ORCHESTRATION = 16,
  TIER_ARRAY = 17,
  FEATURE_SET_METADATA = 18,
  MODEL_FEATURES_CONFIG = 19,
  ERC20_ASSET = 20,
  SPLIT_TEST_METADATA = 21,
  SPLIT_TESTS_FOLLOWED = 22,
  SPLIT_TEST_ADMIN_EVENTS = 23,
  MODEL_SCORE_CACHE_POLICY = 24,
  MODEL_SCORE_CACHE_POLICY_ARRAY = 25,
  INT_MAP = 26,
  INCENTIVE_EXPERIMENTS_CONFIG = 27,
  CURRENCY = 28,
  NETWORK = 29,
  KILL_SWITCH = 30,
  ML_MODEL_THRESHOLD_CONFIG = 31,
  ENTRY_GATEWAY_LOAD_TEST_CONFIG = 32,
  FEE_OVERRIDE = 33,
  COMMERCE_ASSETS = 34,
  EOU_PRODUCT_CONFIG = 35,
  OPEN_BANKING_BANK_DETAILS = 36,
  OPEN_BANKING_BANK_DETAILS_V2 = 37,
  LOAD_SHED_RULES = 38,
  HORUS_CONFIG = 39,
  CLOUD_KILL_SWITCH_CONFIG = 40,
  RISK_CHECK_CONFIG = 41,
  UNRECOGNIZED = -1,
}

export function typeFromJSON(object: any): Type {
  switch (object) {
    case 0:
    case 'UNKNOWN_TYPE':
      return Type.UNKNOWN_TYPE;
    case 1:
    case 'BOOLEAN':
      return Type.BOOLEAN;
    case 2:
    case 'NUMERIC':
      return Type.NUMERIC;
    case 3:
    case 'TEXT':
      return Type.TEXT;
    case 6:
    case 'STRING_MAP':
      return Type.STRING_MAP;
    case 7:
    case 'STRING_ARRAY':
      return Type.STRING_ARRAY;
    case 11:
    case 'DURATION':
      return Type.DURATION;
    case 12:
    case 'SECRET_TEXT':
      return Type.SECRET_TEXT;
    case 4:
    case 'FEATURE_FLAG':
      return Type.FEATURE_FLAG;
    case 8:
    case 'NODE_CLUSTER':
      return Type.NODE_CLUSTER;
    case 9:
    case 'SPLIT_TEST':
      return Type.SPLIT_TEST;
    case 10:
    case 'CONFIG_FILE':
      return Type.CONFIG_FILE;
    case 13:
    case 'LIMIT_CONFIG':
      return Type.LIMIT_CONFIG;
    case 14:
    case 'RAFT_CLUSTER':
      return Type.RAFT_CLUSTER;
    case 15:
    case 'FULL_LIMIT_CONFIG':
      return Type.FULL_LIMIT_CONFIG;
    case 16:
    case 'ORCHESTRATION':
      return Type.ORCHESTRATION;
    case 17:
    case 'TIER_ARRAY':
      return Type.TIER_ARRAY;
    case 18:
    case 'FEATURE_SET_METADATA':
      return Type.FEATURE_SET_METADATA;
    case 19:
    case 'MODEL_FEATURES_CONFIG':
      return Type.MODEL_FEATURES_CONFIG;
    case 20:
    case 'ERC20_ASSET':
      return Type.ERC20_ASSET;
    case 21:
    case 'SPLIT_TEST_METADATA':
      return Type.SPLIT_TEST_METADATA;
    case 22:
    case 'SPLIT_TESTS_FOLLOWED':
      return Type.SPLIT_TESTS_FOLLOWED;
    case 23:
    case 'SPLIT_TEST_ADMIN_EVENTS':
      return Type.SPLIT_TEST_ADMIN_EVENTS;
    case 24:
    case 'MODEL_SCORE_CACHE_POLICY':
      return Type.MODEL_SCORE_CACHE_POLICY;
    case 25:
    case 'MODEL_SCORE_CACHE_POLICY_ARRAY':
      return Type.MODEL_SCORE_CACHE_POLICY_ARRAY;
    case 26:
    case 'INT_MAP':
      return Type.INT_MAP;
    case 27:
    case 'INCENTIVE_EXPERIMENTS_CONFIG':
      return Type.INCENTIVE_EXPERIMENTS_CONFIG;
    case 28:
    case 'CURRENCY':
      return Type.CURRENCY;
    case 29:
    case 'NETWORK':
      return Type.NETWORK;
    case 30:
    case 'KILL_SWITCH':
      return Type.KILL_SWITCH;
    case 31:
    case 'ML_MODEL_THRESHOLD_CONFIG':
      return Type.ML_MODEL_THRESHOLD_CONFIG;
    case 32:
    case 'ENTRY_GATEWAY_LOAD_TEST_CONFIG':
      return Type.ENTRY_GATEWAY_LOAD_TEST_CONFIG;
    case 33:
    case 'FEE_OVERRIDE':
      return Type.FEE_OVERRIDE;
    case 34:
    case 'COMMERCE_ASSETS':
      return Type.COMMERCE_ASSETS;
    case 35:
    case 'EOU_PRODUCT_CONFIG':
      return Type.EOU_PRODUCT_CONFIG;
    case 36:
    case 'OPEN_BANKING_BANK_DETAILS':
      return Type.OPEN_BANKING_BANK_DETAILS;
    case 37:
    case 'OPEN_BANKING_BANK_DETAILS_V2':
      return Type.OPEN_BANKING_BANK_DETAILS_V2;
    case 38:
    case 'LOAD_SHED_RULES':
      return Type.LOAD_SHED_RULES;
    case 39:
    case 'HORUS_CONFIG':
      return Type.HORUS_CONFIG;
    case 40:
    case 'CLOUD_KILL_SWITCH_CONFIG':
      return Type.CLOUD_KILL_SWITCH_CONFIG;
    case 41:
    case 'RISK_CHECK_CONFIG':
      return Type.RISK_CHECK_CONFIG;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return Type.UNRECOGNIZED;
  }
}

export function typeToJSON(object: Type): string {
  switch (object) {
    case Type.UNKNOWN_TYPE:
      return 'UNKNOWN_TYPE';
    case Type.BOOLEAN:
      return 'BOOLEAN';
    case Type.NUMERIC:
      return 'NUMERIC';
    case Type.TEXT:
      return 'TEXT';
    case Type.STRING_MAP:
      return 'STRING_MAP';
    case Type.STRING_ARRAY:
      return 'STRING_ARRAY';
    case Type.DURATION:
      return 'DURATION';
    case Type.SECRET_TEXT:
      return 'SECRET_TEXT';
    case Type.FEATURE_FLAG:
      return 'FEATURE_FLAG';
    case Type.NODE_CLUSTER:
      return 'NODE_CLUSTER';
    case Type.SPLIT_TEST:
      return 'SPLIT_TEST';
    case Type.CONFIG_FILE:
      return 'CONFIG_FILE';
    case Type.LIMIT_CONFIG:
      return 'LIMIT_CONFIG';
    case Type.RAFT_CLUSTER:
      return 'RAFT_CLUSTER';
    case Type.FULL_LIMIT_CONFIG:
      return 'FULL_LIMIT_CONFIG';
    case Type.ORCHESTRATION:
      return 'ORCHESTRATION';
    case Type.TIER_ARRAY:
      return 'TIER_ARRAY';
    case Type.FEATURE_SET_METADATA:
      return 'FEATURE_SET_METADATA';
    case Type.MODEL_FEATURES_CONFIG:
      return 'MODEL_FEATURES_CONFIG';
    case Type.ERC20_ASSET:
      return 'ERC20_ASSET';
    case Type.SPLIT_TEST_METADATA:
      return 'SPLIT_TEST_METADATA';
    case Type.SPLIT_TESTS_FOLLOWED:
      return 'SPLIT_TESTS_FOLLOWED';
    case Type.SPLIT_TEST_ADMIN_EVENTS:
      return 'SPLIT_TEST_ADMIN_EVENTS';
    case Type.MODEL_SCORE_CACHE_POLICY:
      return 'MODEL_SCORE_CACHE_POLICY';
    case Type.MODEL_SCORE_CACHE_POLICY_ARRAY:
      return 'MODEL_SCORE_CACHE_POLICY_ARRAY';
    case Type.INT_MAP:
      return 'INT_MAP';
    case Type.INCENTIVE_EXPERIMENTS_CONFIG:
      return 'INCENTIVE_EXPERIMENTS_CONFIG';
    case Type.CURRENCY:
      return 'CURRENCY';
    case Type.NETWORK:
      return 'NETWORK';
    case Type.KILL_SWITCH:
      return 'KILL_SWITCH';
    case Type.ML_MODEL_THRESHOLD_CONFIG:
      return 'ML_MODEL_THRESHOLD_CONFIG';
    case Type.ENTRY_GATEWAY_LOAD_TEST_CONFIG:
      return 'ENTRY_GATEWAY_LOAD_TEST_CONFIG';
    case Type.FEE_OVERRIDE:
      return 'FEE_OVERRIDE';
    case Type.COMMERCE_ASSETS:
      return 'COMMERCE_ASSETS';
    case Type.EOU_PRODUCT_CONFIG:
      return 'EOU_PRODUCT_CONFIG';
    case Type.OPEN_BANKING_BANK_DETAILS:
      return 'OPEN_BANKING_BANK_DETAILS';
    case Type.OPEN_BANKING_BANK_DETAILS_V2:
      return 'OPEN_BANKING_BANK_DETAILS_V2';
    case Type.LOAD_SHED_RULES:
      return 'LOAD_SHED_RULES';
    case Type.HORUS_CONFIG:
      return 'HORUS_CONFIG';
    case Type.CLOUD_KILL_SWITCH_CONFIG:
      return 'CLOUD_KILL_SWITCH_CONFIG';
    case Type.RISK_CHECK_CONFIG:
      return 'RISK_CHECK_CONFIG';
    case Type.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export enum Wallet {
  UNKNOWN = 0,
  NOVA = 1,
  MACBETH = 2,
  WALLACE = 3,
  UNRECOGNIZED = -1,
}

export function walletFromJSON(object: any): Wallet {
  switch (object) {
    case 0:
    case 'UNKNOWN':
      return Wallet.UNKNOWN;
    case 1:
    case 'NOVA':
      return Wallet.NOVA;
    case 2:
    case 'MACBETH':
      return Wallet.MACBETH;
    case 3:
    case 'WALLACE':
      return Wallet.WALLACE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return Wallet.UNRECOGNIZED;
  }
}

export function walletToJSON(object: Wallet): string {
  switch (object) {
    case Wallet.UNKNOWN:
      return 'UNKNOWN';
    case Wallet.NOVA:
      return 'NOVA';
    case Wallet.MACBETH:
      return 'MACBETH';
    case Wallet.WALLACE:
      return 'WALLACE';
    case Wallet.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

/** StringMap is a wrapper type for a map of string keys/values. */
export interface StringMap {
  stringMap: { [key: string]: string };
}

export interface StringMap_StringMapEntry {
  key: string;
  value: string;
}

/** StringArray is a wrapper type of an array of strings. */
export interface StringArray {
  stringArray: string[];
}

/**
 * Duration is a parameter type that represents
 * the duration.
 */
export interface Duration {
  duration: Duration1 | undefined;
  durationS: string;
  type: Duration_InputType;
}

export enum Duration_InputType {
  DURATION = 0,
  STRING = 1,
  UNRECOGNIZED = -1,
}

export function duration_InputTypeFromJSON(object: any): Duration_InputType {
  switch (object) {
    case 0:
    case 'DURATION':
      return Duration_InputType.DURATION;
    case 1:
    case 'STRING':
      return Duration_InputType.STRING;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return Duration_InputType.UNRECOGNIZED;
  }
}

export function duration_InputTypeToJSON(object: Duration_InputType): string {
  switch (object) {
    case Duration_InputType.DURATION:
      return 'DURATION';
    case Duration_InputType.STRING:
      return 'STRING';
    case Duration_InputType.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

/** SecretText is a parameter type that represents an encrypted value. */
export interface SecretText {
  encryptedSecretText: Uint8Array;
  encryptionContext: { [key: string]: string };
  writeOnly: boolean;
  /**
   * Encrypted DEK (aka Encrypted "Data Encryption Key") for envelope encryption.
   *
   * In envelope encryption, data is encrypted with a Data Encryption Key (DEK).
   * The DEK is then encrypted with a Key Encryption Key (KEK). The result is
   * an Encrypted DEK, that is stored in this field.
   * To use it, first obtain the DEK by decrypting it with the KEK, and then use
   * it to encrypt/decrypt the corresponding config service SecretText parameter.
   * In other words:
   * 1) When writing:
   *   - (generate)  dek = random()                             // performed by KMS
   *   - (store)     encrypted_secret_text = encrypt(text, dek) // performed locally
   *   - (store)     data_key = encrypt(dek, kek)               // performed by KMS
   * 2) When reading:
   *   - (retrieve)  dek = decrypt(data_key, kek)               // performed by KMS
   *   - (retrieve)  text = decrypt(encrypted_secret_text, dek) // performed locally
   * Some extra notes on specifics related to AWS KMS:
   *   - The KEK corresponds to a CMK inside of KMS, thus it never leaves KMS
   *   - The DEK generation happens inside of KMS, which already encrypts it
   *     with a CMK, and returns the pair (DEK, encrypted_DEK); the DEK can
   *     then be immediately used and discarded, and only encrypted_DEK has
   *     to be stored (in this case, in the data_key field)
   */
  dataKey: Uint8Array;
  /**
   * centralized indicates which keys the secret is encrypted with
   * a false value means they are using the legacy keys
   * a true value means they are using the central account keys
   */
  centralized: boolean;
}

export interface SecretText_EncryptionContextEntry {
  key: string;
  value: string;
}

export interface EouProductConfig {
  productConfig: EouProductConfig_ProductConfig[];
}

export interface EouProductConfig_WelcomeWorkflow {
  enabled: boolean;
  template: string;
}

export interface EouProductConfig_VerificationWorkflow {
  enabled: boolean;
  allowedCountryCodes: string[];
}

export interface EouProductConfig_ProductConfig {
  productId: string;
  enabled: boolean;
  welcomeWorkflow: EouProductConfig_WelcomeWorkflow | undefined;
  dataUseType: string;
  verificationWorkflow: EouProductConfig_VerificationWorkflow | undefined;
}

/** Erc20Asset describes the contents of an ERC20 asset. */
export interface Erc20Asset {
  /** ticker, e.g. "YFI" */
  ticker: string;
  /** name, e.g. Yearn */
  name: string;
  /** contract address, e.g. "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e" */
  contractAddress: string;
  /** start block, e.g. 10475744 */
  startBlock: number;
  /** significant digits, e.g. 18 */
  significantDigits: number;
  /** pool name, e.g. "inc" */
  poolName: string;
  /** pool id, e.g. fff6b39f-ee42-4ec3-92b4-5d474e6755a4 */
  poolUuid: string;
  /** production asset uuid, e.g. fff6b39f-ee42-4ec3-92b4-5d474e6755a4 */
  productAssetUuid: string;
  /** currency icon path, e.g. currencies/bat.png */
  legacyCurrencyIcon: string;
  /** minimum transaction amount, e.g. "0.00001" */
  minTransactionAmount: string;
  /** max transaction amount, e.g. "10,000" */
  maxTransactionAmount: string;
  /** min dust amount, e.g. "0.0001" */
  minDustAmount: string;
  /**
   * unprocessed send thresholds, e.g.
   * { "lo": "125", "hi": "500", }
   */
  unprocessedSendThresholds: StringMap | undefined;
  /**
   * hedger thresholds, e.g.
   * { "target": "285", "min": "85", "max": "170" }
   */
  hedgerThresholds: StringMap | undefined;
  /** min replenish fees amount, e.g. "10.2" */
  minReplenishFees: string;
  /** min replenish fees internal, e.g. "10.2" */
  minReplenishInternal: string;
  /** rates service ticker, e.g. YFI */
  ratesServiceTicker: string;
}

/** Feature Flag describes the contents of a feature flag. */
export interface FeatureFlag {
  /** 0 - 100: percentage on */
  percent: number;
  /** Array of arbitrary user ids, that can be application specific. */
  entityIds: string[];
  /** Array of strings that can be used to model country codes. No strong validation currently */
  countryCodes: string[];
  /** deprecated */
  groups: string[];
  /** Whether this feature flag can be shown in the API. */
  apiVisible: boolean;
  /** Whether this feature flag is accessible to admins. */
  admins: boolean;
  /** Whether this feature flag has been rolled out fully in beta. */
  beta: boolean;
  /** Whether this feature flag is accessible to employees. */
  employees: boolean;
  /** Details on updated time and arbitrary meta data about this feature flag. */
  details: StringMap | undefined;
  /** Whether this feature flag is disabled/deleted. */
  disabled: boolean;
  /** Array of strings that can be used to model platform & app version. No strong validation currently */
  clients: string[];
  /** Array of strings that can be used to model platform & app version. No strong validation currently */
  minClientsVersion: string[];
}

/** NodeCluster represents a primitive service discovery mechanism around an array of Nodes, and arbitrary attributes. */
export interface NodeCluster {
  attributes: StringMap | undefined;
  nodes: Node[];
}

/** Node is a member of a NodeCluster. */
export interface Node {
  /** IP address of the node */
  ipAddress: string;
  /** Port of the node */
  port: number;
  /** indicates that a node is healthy */
  enabled: boolean;
  /** node's attributes map */
  attributes: StringMap | undefined;
}

export interface SplitTest {
  subjectType: SplitTest_SubjectType;
  owner: string;
  team: string;
  description: string;
  pseudoTest: boolean;
  apiVisible: boolean;
  deprecatedPlatforms: SplitTest_DeprecatedPlatform[];
  platforms: SplitTest_Platform[];
  slackChannel: string;
  groups: SplitTest_Group[];
  active: boolean;
  rolloutPercent: number;
  /** randomization key, advanced use cases only */
  salt: string;
  ownerUuids: string[];
  /** target metrics that this split test is subscribed to */
  targetMetrics: string[];
  /** metrics that this split test is subscribed to */
  metrics: string[];
  /** metrics sets that this split test is subscribed to */
  metricSets: string[];
  /** slack user handles to notify of changes */
  slackHandles: string[];
  /** uuid of user who resolved the split test */
  resolvedByUserUuid: string;
  /** user email who resolved the split test */
  resolvedByEmail: string;
  /** timestamp when the test was resolved */
  resolvedAt: Date | undefined;
}

export enum SplitTest_DeprecatedPlatform {
  UNKNOWN_PLATFORM = 0,
  IOS = 1,
  ANDROID = 2,
  WEB = 3,
  UNRECOGNIZED = -1,
}

export function splitTest_DeprecatedPlatformFromJSON(object: any): SplitTest_DeprecatedPlatform {
  switch (object) {
    case 0:
    case 'UNKNOWN_PLATFORM':
      return SplitTest_DeprecatedPlatform.UNKNOWN_PLATFORM;
    case 1:
    case 'IOS':
      return SplitTest_DeprecatedPlatform.IOS;
    case 2:
    case 'ANDROID':
      return SplitTest_DeprecatedPlatform.ANDROID;
    case 3:
    case 'WEB':
      return SplitTest_DeprecatedPlatform.WEB;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return SplitTest_DeprecatedPlatform.UNRECOGNIZED;
  }
}

export function splitTest_DeprecatedPlatformToJSON(object: SplitTest_DeprecatedPlatform): string {
  switch (object) {
    case SplitTest_DeprecatedPlatform.UNKNOWN_PLATFORM:
      return 'UNKNOWN_PLATFORM';
    case SplitTest_DeprecatedPlatform.IOS:
      return 'IOS';
    case SplitTest_DeprecatedPlatform.ANDROID:
      return 'ANDROID';
    case SplitTest_DeprecatedPlatform.WEB:
      return 'WEB';
    case SplitTest_DeprecatedPlatform.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export enum SplitTest_SubjectType {
  UNKNOWN_SUBJECT = 0,
  USER = 1,
  DEVICE = 2,
  /** WALLET_USER - sha256 of user primary ethereum address */
  WALLET_USER = 3,
  NFT_USER = 4,
  COMMERCE_MERCHANT = 5,
  USER_UUID = 6,
  EDP_FINGERPRINT_ID = 7,
  UNRECOGNIZED = -1,
}

export function splitTest_SubjectTypeFromJSON(object: any): SplitTest_SubjectType {
  switch (object) {
    case 0:
    case 'UNKNOWN_SUBJECT':
      return SplitTest_SubjectType.UNKNOWN_SUBJECT;
    case 1:
    case 'USER':
      return SplitTest_SubjectType.USER;
    case 2:
    case 'DEVICE':
      return SplitTest_SubjectType.DEVICE;
    case 3:
    case 'WALLET_USER':
      return SplitTest_SubjectType.WALLET_USER;
    case 4:
    case 'NFT_USER':
      return SplitTest_SubjectType.NFT_USER;
    case 5:
    case 'COMMERCE_MERCHANT':
      return SplitTest_SubjectType.COMMERCE_MERCHANT;
    case 6:
    case 'USER_UUID':
      return SplitTest_SubjectType.USER_UUID;
    case 7:
    case 'EDP_FINGERPRINT_ID':
      return SplitTest_SubjectType.EDP_FINGERPRINT_ID;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return SplitTest_SubjectType.UNRECOGNIZED;
  }
}

export function splitTest_SubjectTypeToJSON(object: SplitTest_SubjectType): string {
  switch (object) {
    case SplitTest_SubjectType.UNKNOWN_SUBJECT:
      return 'UNKNOWN_SUBJECT';
    case SplitTest_SubjectType.USER:
      return 'USER';
    case SplitTest_SubjectType.DEVICE:
      return 'DEVICE';
    case SplitTest_SubjectType.WALLET_USER:
      return 'WALLET_USER';
    case SplitTest_SubjectType.NFT_USER:
      return 'NFT_USER';
    case SplitTest_SubjectType.COMMERCE_MERCHANT:
      return 'COMMERCE_MERCHANT';
    case SplitTest_SubjectType.USER_UUID:
      return 'USER_UUID';
    case SplitTest_SubjectType.EDP_FINGERPRINT_ID:
      return 'EDP_FINGERPRINT_ID';
    case SplitTest_SubjectType.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export interface SplitTest_Platform {
  type: SplitTest_Platform_PlatformType;
  /** minimum semantic version */
  minimumVersion: string;
  /** maximum semantic version */
  maximumVersion: string;
}

export enum SplitTest_Platform_PlatformType {
  UNKNOWN_PLATFORM = 0,
  IOS = 1,
  ANDROID = 2,
  WEB = 3,
  PRO_MOBILE_IOS = 4,
  PRO_MOBILE_ANDROID = 5,
  WALLET_IOS = 6,
  WALLET_ANDROID = 7,
  WALLET_EXTENSION = 8,
  WALLET_DAPP = 9,
  UNRECOGNIZED = -1,
}

export function splitTest_Platform_PlatformTypeFromJSON(
  object: any,
): SplitTest_Platform_PlatformType {
  switch (object) {
    case 0:
    case 'UNKNOWN_PLATFORM':
      return SplitTest_Platform_PlatformType.UNKNOWN_PLATFORM;
    case 1:
    case 'IOS':
      return SplitTest_Platform_PlatformType.IOS;
    case 2:
    case 'ANDROID':
      return SplitTest_Platform_PlatformType.ANDROID;
    case 3:
    case 'WEB':
      return SplitTest_Platform_PlatformType.WEB;
    case 4:
    case 'PRO_MOBILE_IOS':
      return SplitTest_Platform_PlatformType.PRO_MOBILE_IOS;
    case 5:
    case 'PRO_MOBILE_ANDROID':
      return SplitTest_Platform_PlatformType.PRO_MOBILE_ANDROID;
    case 6:
    case 'WALLET_IOS':
      return SplitTest_Platform_PlatformType.WALLET_IOS;
    case 7:
    case 'WALLET_ANDROID':
      return SplitTest_Platform_PlatformType.WALLET_ANDROID;
    case 8:
    case 'WALLET_EXTENSION':
      return SplitTest_Platform_PlatformType.WALLET_EXTENSION;
    case 9:
    case 'WALLET_DAPP':
      return SplitTest_Platform_PlatformType.WALLET_DAPP;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return SplitTest_Platform_PlatformType.UNRECOGNIZED;
  }
}

export function splitTest_Platform_PlatformTypeToJSON(
  object: SplitTest_Platform_PlatformType,
): string {
  switch (object) {
    case SplitTest_Platform_PlatformType.UNKNOWN_PLATFORM:
      return 'UNKNOWN_PLATFORM';
    case SplitTest_Platform_PlatformType.IOS:
      return 'IOS';
    case SplitTest_Platform_PlatformType.ANDROID:
      return 'ANDROID';
    case SplitTest_Platform_PlatformType.WEB:
      return 'WEB';
    case SplitTest_Platform_PlatformType.PRO_MOBILE_IOS:
      return 'PRO_MOBILE_IOS';
    case SplitTest_Platform_PlatformType.PRO_MOBILE_ANDROID:
      return 'PRO_MOBILE_ANDROID';
    case SplitTest_Platform_PlatformType.WALLET_IOS:
      return 'WALLET_IOS';
    case SplitTest_Platform_PlatformType.WALLET_ANDROID:
      return 'WALLET_ANDROID';
    case SplitTest_Platform_PlatformType.WALLET_EXTENSION:
      return 'WALLET_EXTENSION';
    case SplitTest_Platform_PlatformType.WALLET_DAPP:
      return 'WALLET_DAPP';
    case SplitTest_Platform_PlatformType.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export interface SplitTest_Group {
  name: string;
  weight: number;
  overrideSubjectIds: string[];
  isFinal: boolean;
  overrideRoles: SplitTest_Group_Role[];
}

export enum SplitTest_Group_Role {
  UNKNOWN_ROLE = 0,
  ADMIN = 1,
  EMPLOYEE = 2,
  UNRECOGNIZED = -1,
}

export function splitTest_Group_RoleFromJSON(object: any): SplitTest_Group_Role {
  switch (object) {
    case 0:
    case 'UNKNOWN_ROLE':
      return SplitTest_Group_Role.UNKNOWN_ROLE;
    case 1:
    case 'ADMIN':
      return SplitTest_Group_Role.ADMIN;
    case 2:
    case 'EMPLOYEE':
      return SplitTest_Group_Role.EMPLOYEE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return SplitTest_Group_Role.UNRECOGNIZED;
  }
}

export function splitTest_Group_RoleToJSON(object: SplitTest_Group_Role): string {
  switch (object) {
    case SplitTest_Group_Role.UNKNOWN_ROLE:
      return 'UNKNOWN_ROLE';
    case SplitTest_Group_Role.ADMIN:
      return 'ADMIN';
    case SplitTest_Group_Role.EMPLOYEE:
      return 'EMPLOYEE';
    case SplitTest_Group_Role.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export interface SplitTestMetadata {
  /**
   * Name of the test
   * Storing test name for both of tests in Monorail and pseudo tests
   */
  name: string;
  /** Storing final group name for both of tests in Monorail and pseudo tests */
  finalGroupName: string;
  /** summary of resolving split test */
  resolveSummary: string;
  /** markup of experiment */
  metadata: string;
  /** slack channel to notify of changes */
  slackChannel: string;
  /** target metrics that this split test is subscribed to */
  targetMetrics: string[];
  /** metrics that this split test is subscribed to */
  metrics: string[];
  /** metrics sets that this split test is subscribed to */
  metricSets: string[];
  /** slack user handles to notify of changes */
  slackHandles: string[];
  /** id of user who resolved the split test */
  resolvedByUserId: string;
  /** user email who resolved the split test */
  resolvedByEmail: string;
  /** timestamp in int when the test was resolved */
  resolvedAt: number;
}

export interface SplitTestsFollowed {
  userId: string;
  followedSplitTests: string[];
}

export interface SplitTestAdminEvents {
  action: string;
  params: string;
}

/**
 * ConfigFile is a composite parameter type, which represents
 * a file.
 */
export interface ConfigFile {
  /** the location of a file, for example /tmp/config.conf */
  location: string;
  /** file content, can be empty. */
  body: Uint8Array;
  /** a map of file attributes. */
  attributes: StringMap | undefined;
  /**
   * enabled indicates if the file should be used. If config service supports enabled/disabled
   * parameters in future, this can be removed.
   */
  enabled: boolean;
}

/** LimitConfig represents a configuration for risk limits */
export interface LimitConfig {
  limitType: LimitConfig_LimitType;
  countryCode: string;
  /** Each country code/limit type should have a currency */
  currencyIso: string;
  limitPeriod: number;
  scoreRanges: LimitConfig_ScoreRange[];
  experimentInfo: LimitConfig_ExperimentInfo | undefined;
}

/** Represents the limit type being stored in this config */
export enum LimitConfig_LimitType {
  UNKNOWN = 0,
  ACH = 1,
  ACH_NO_BALANCE = 2,
  ACH_CURM = 3,
  CREDIT_DEBIT_CARD = 4,
  SECURE_3D_BUY = 5,
  PRO_WITHDRAW = 6,
  PRO_ACH = 7,
  PAYPAL_BUY = 8,
  PAYPAL_WITHDRAWAL = 9,
  IDEAL_DEPOSIT = 10,
  SOFORT_DEPOSIT = 11,
  INSTANT_ACH_WITHDRAWAL = 12,
  APPLE_PAY = 13,
  GOOGLE_PAY = 14,
  DENEB_UPI = 15,
  RTP = 16,
  CARD_SELL = 17,
  COINBASE_CARD = 18,
  PIX_DEPOSIT = 19,
  PIX_WITHDRAWAL = 20,
  ZEPTO_DEPOSIT = 21,
  ZEPTO_WITHDRAWAL = 22,
  CBPAY_NFT_CREDIT_DEBIT_CARD = 23,
  SEPA_DEPOSIT = 24,
  NEPTUNE_DEPOSIT = 25,
  NEPTUNE_WITHDRAWAL = 26,
  UK_OPEN_BANKING_INSTANT_BUY = 27,
  SG_FAST_WITHDRAWAL = 29,
  CRYPTO_SEND = 30,
  RETAIL_MGX = 31,
  CRYPTO_SEND_ATO = 32,
  CARD_WITHDRAWAL = 33,
  COMMERCE_WEB3_RETAIL = 34,
  SWIFT_WITHDRAWAL = 35,
  BANCOMAT_PAY_DEPOSIT = 36,
  MAGIC_SPEND = 37,
  UNRECOGNIZED = -1,
}

export function limitConfig_LimitTypeFromJSON(object: any): LimitConfig_LimitType {
  switch (object) {
    case 0:
    case 'UNKNOWN':
      return LimitConfig_LimitType.UNKNOWN;
    case 1:
    case 'ACH':
      return LimitConfig_LimitType.ACH;
    case 2:
    case 'ACH_NO_BALANCE':
      return LimitConfig_LimitType.ACH_NO_BALANCE;
    case 3:
    case 'ACH_CURM':
      return LimitConfig_LimitType.ACH_CURM;
    case 4:
    case 'CREDIT_DEBIT_CARD':
      return LimitConfig_LimitType.CREDIT_DEBIT_CARD;
    case 5:
    case 'SECURE_3D_BUY':
      return LimitConfig_LimitType.SECURE_3D_BUY;
    case 6:
    case 'PRO_WITHDRAW':
      return LimitConfig_LimitType.PRO_WITHDRAW;
    case 7:
    case 'PRO_ACH':
      return LimitConfig_LimitType.PRO_ACH;
    case 8:
    case 'PAYPAL_BUY':
      return LimitConfig_LimitType.PAYPAL_BUY;
    case 9:
    case 'PAYPAL_WITHDRAWAL':
      return LimitConfig_LimitType.PAYPAL_WITHDRAWAL;
    case 10:
    case 'IDEAL_DEPOSIT':
      return LimitConfig_LimitType.IDEAL_DEPOSIT;
    case 11:
    case 'SOFORT_DEPOSIT':
      return LimitConfig_LimitType.SOFORT_DEPOSIT;
    case 12:
    case 'INSTANT_ACH_WITHDRAWAL':
      return LimitConfig_LimitType.INSTANT_ACH_WITHDRAWAL;
    case 13:
    case 'APPLE_PAY':
      return LimitConfig_LimitType.APPLE_PAY;
    case 14:
    case 'GOOGLE_PAY':
      return LimitConfig_LimitType.GOOGLE_PAY;
    case 15:
    case 'DENEB_UPI':
      return LimitConfig_LimitType.DENEB_UPI;
    case 16:
    case 'RTP':
      return LimitConfig_LimitType.RTP;
    case 17:
    case 'CARD_SELL':
      return LimitConfig_LimitType.CARD_SELL;
    case 18:
    case 'COINBASE_CARD':
      return LimitConfig_LimitType.COINBASE_CARD;
    case 19:
    case 'PIX_DEPOSIT':
      return LimitConfig_LimitType.PIX_DEPOSIT;
    case 20:
    case 'PIX_WITHDRAWAL':
      return LimitConfig_LimitType.PIX_WITHDRAWAL;
    case 21:
    case 'ZEPTO_DEPOSIT':
      return LimitConfig_LimitType.ZEPTO_DEPOSIT;
    case 22:
    case 'ZEPTO_WITHDRAWAL':
      return LimitConfig_LimitType.ZEPTO_WITHDRAWAL;
    case 23:
    case 'CBPAY_NFT_CREDIT_DEBIT_CARD':
      return LimitConfig_LimitType.CBPAY_NFT_CREDIT_DEBIT_CARD;
    case 24:
    case 'SEPA_DEPOSIT':
      return LimitConfig_LimitType.SEPA_DEPOSIT;
    case 25:
    case 'NEPTUNE_DEPOSIT':
      return LimitConfig_LimitType.NEPTUNE_DEPOSIT;
    case 26:
    case 'NEPTUNE_WITHDRAWAL':
      return LimitConfig_LimitType.NEPTUNE_WITHDRAWAL;
    case 27:
    case 'UK_OPEN_BANKING_INSTANT_BUY':
      return LimitConfig_LimitType.UK_OPEN_BANKING_INSTANT_BUY;
    case 29:
    case 'SG_FAST_WITHDRAWAL':
      return LimitConfig_LimitType.SG_FAST_WITHDRAWAL;
    case 30:
    case 'CRYPTO_SEND':
      return LimitConfig_LimitType.CRYPTO_SEND;
    case 31:
    case 'RETAIL_MGX':
      return LimitConfig_LimitType.RETAIL_MGX;
    case 32:
    case 'CRYPTO_SEND_ATO':
      return LimitConfig_LimitType.CRYPTO_SEND_ATO;
    case 33:
    case 'CARD_WITHDRAWAL':
      return LimitConfig_LimitType.CARD_WITHDRAWAL;
    case 34:
    case 'COMMERCE_WEB3_RETAIL':
      return LimitConfig_LimitType.COMMERCE_WEB3_RETAIL;
    case 35:
    case 'SWIFT_WITHDRAWAL':
      return LimitConfig_LimitType.SWIFT_WITHDRAWAL;
    case 36:
    case 'BANCOMAT_PAY_DEPOSIT':
      return LimitConfig_LimitType.BANCOMAT_PAY_DEPOSIT;
    case 37:
    case 'MAGIC_SPEND':
      return LimitConfig_LimitType.MAGIC_SPEND;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return LimitConfig_LimitType.UNRECOGNIZED;
  }
}

export function limitConfig_LimitTypeToJSON(object: LimitConfig_LimitType): string {
  switch (object) {
    case LimitConfig_LimitType.UNKNOWN:
      return 'UNKNOWN';
    case LimitConfig_LimitType.ACH:
      return 'ACH';
    case LimitConfig_LimitType.ACH_NO_BALANCE:
      return 'ACH_NO_BALANCE';
    case LimitConfig_LimitType.ACH_CURM:
      return 'ACH_CURM';
    case LimitConfig_LimitType.CREDIT_DEBIT_CARD:
      return 'CREDIT_DEBIT_CARD';
    case LimitConfig_LimitType.SECURE_3D_BUY:
      return 'SECURE_3D_BUY';
    case LimitConfig_LimitType.PRO_WITHDRAW:
      return 'PRO_WITHDRAW';
    case LimitConfig_LimitType.PRO_ACH:
      return 'PRO_ACH';
    case LimitConfig_LimitType.PAYPAL_BUY:
      return 'PAYPAL_BUY';
    case LimitConfig_LimitType.PAYPAL_WITHDRAWAL:
      return 'PAYPAL_WITHDRAWAL';
    case LimitConfig_LimitType.IDEAL_DEPOSIT:
      return 'IDEAL_DEPOSIT';
    case LimitConfig_LimitType.SOFORT_DEPOSIT:
      return 'SOFORT_DEPOSIT';
    case LimitConfig_LimitType.INSTANT_ACH_WITHDRAWAL:
      return 'INSTANT_ACH_WITHDRAWAL';
    case LimitConfig_LimitType.APPLE_PAY:
      return 'APPLE_PAY';
    case LimitConfig_LimitType.GOOGLE_PAY:
      return 'GOOGLE_PAY';
    case LimitConfig_LimitType.DENEB_UPI:
      return 'DENEB_UPI';
    case LimitConfig_LimitType.RTP:
      return 'RTP';
    case LimitConfig_LimitType.CARD_SELL:
      return 'CARD_SELL';
    case LimitConfig_LimitType.COINBASE_CARD:
      return 'COINBASE_CARD';
    case LimitConfig_LimitType.PIX_DEPOSIT:
      return 'PIX_DEPOSIT';
    case LimitConfig_LimitType.PIX_WITHDRAWAL:
      return 'PIX_WITHDRAWAL';
    case LimitConfig_LimitType.ZEPTO_DEPOSIT:
      return 'ZEPTO_DEPOSIT';
    case LimitConfig_LimitType.ZEPTO_WITHDRAWAL:
      return 'ZEPTO_WITHDRAWAL';
    case LimitConfig_LimitType.CBPAY_NFT_CREDIT_DEBIT_CARD:
      return 'CBPAY_NFT_CREDIT_DEBIT_CARD';
    case LimitConfig_LimitType.SEPA_DEPOSIT:
      return 'SEPA_DEPOSIT';
    case LimitConfig_LimitType.NEPTUNE_DEPOSIT:
      return 'NEPTUNE_DEPOSIT';
    case LimitConfig_LimitType.NEPTUNE_WITHDRAWAL:
      return 'NEPTUNE_WITHDRAWAL';
    case LimitConfig_LimitType.UK_OPEN_BANKING_INSTANT_BUY:
      return 'UK_OPEN_BANKING_INSTANT_BUY';
    case LimitConfig_LimitType.SG_FAST_WITHDRAWAL:
      return 'SG_FAST_WITHDRAWAL';
    case LimitConfig_LimitType.CRYPTO_SEND:
      return 'CRYPTO_SEND';
    case LimitConfig_LimitType.RETAIL_MGX:
      return 'RETAIL_MGX';
    case LimitConfig_LimitType.CRYPTO_SEND_ATO:
      return 'CRYPTO_SEND_ATO';
    case LimitConfig_LimitType.CARD_WITHDRAWAL:
      return 'CARD_WITHDRAWAL';
    case LimitConfig_LimitType.COMMERCE_WEB3_RETAIL:
      return 'COMMERCE_WEB3_RETAIL';
    case LimitConfig_LimitType.SWIFT_WITHDRAWAL:
      return 'SWIFT_WITHDRAWAL';
    case LimitConfig_LimitType.BANCOMAT_PAY_DEPOSIT:
      return 'BANCOMAT_PAY_DEPOSIT';
    case LimitConfig_LimitType.MAGIC_SPEND:
      return 'MAGIC_SPEND';
    case LimitConfig_LimitType.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export enum LimitConfig_KycRequirementType {
  UNKNOWN_KYC_REQ_TYPE = 0,
  IDV_VERIFIED = 1,
  IDV_FACEMATCH_VERIFIED = 2,
  IDV_TEXTMATCH_VERIFIED = 3,
  EDP_VERIFIED = 4,
  POA_VERIFIED = 5,
  UNRECOGNIZED = -1,
}

export function limitConfig_KycRequirementTypeFromJSON(
  object: any,
): LimitConfig_KycRequirementType {
  switch (object) {
    case 0:
    case 'UNKNOWN_KYC_REQ_TYPE':
      return LimitConfig_KycRequirementType.UNKNOWN_KYC_REQ_TYPE;
    case 1:
    case 'IDV_VERIFIED':
      return LimitConfig_KycRequirementType.IDV_VERIFIED;
    case 2:
    case 'IDV_FACEMATCH_VERIFIED':
      return LimitConfig_KycRequirementType.IDV_FACEMATCH_VERIFIED;
    case 3:
    case 'IDV_TEXTMATCH_VERIFIED':
      return LimitConfig_KycRequirementType.IDV_TEXTMATCH_VERIFIED;
    case 4:
    case 'EDP_VERIFIED':
      return LimitConfig_KycRequirementType.EDP_VERIFIED;
    case 5:
    case 'POA_VERIFIED':
      return LimitConfig_KycRequirementType.POA_VERIFIED;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return LimitConfig_KycRequirementType.UNRECOGNIZED;
  }
}

export function limitConfig_KycRequirementTypeToJSON(
  object: LimitConfig_KycRequirementType,
): string {
  switch (object) {
    case LimitConfig_KycRequirementType.UNKNOWN_KYC_REQ_TYPE:
      return 'UNKNOWN_KYC_REQ_TYPE';
    case LimitConfig_KycRequirementType.IDV_VERIFIED:
      return 'IDV_VERIFIED';
    case LimitConfig_KycRequirementType.IDV_FACEMATCH_VERIFIED:
      return 'IDV_FACEMATCH_VERIFIED';
    case LimitConfig_KycRequirementType.IDV_TEXTMATCH_VERIFIED:
      return 'IDV_TEXTMATCH_VERIFIED';
    case LimitConfig_KycRequirementType.EDP_VERIFIED:
      return 'EDP_VERIFIED';
    case LimitConfig_KycRequirementType.POA_VERIFIED:
      return 'POA_VERIFIED';
    case LimitConfig_KycRequirementType.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export interface LimitConfig_KycRequirement {
  requirementType: LimitConfig_KycRequirementType;
}

export interface LimitConfig_PurchaseRequirement {
  purchaseVolume: number;
  purchaseVolumeCurrencyIso: string;
  daysAfterStarting: number;
}

export interface LimitConfig_DepositRequirement {
  minimumUserAge: number;
  maximumFirstDepositAgeInDays: number;
  experimentRequirement: LimitConfig_ExperimentRequirement | undefined;
  maximumAccountAgeInDays: number;
}

export interface LimitConfig_ExperimentRequirement {
  experimentName: string;
  group: string;
}

export interface LimitConfig_AdminFlagRequirement {
  flagName: string;
  enabled: boolean;
}

/** LimitLevel represents the limit given if the requirement is met */
export interface LimitConfig_LimitLevel {
  limit: number;
  requirementNull?: boolean | undefined;
  purchaseRequirement?: LimitConfig_PurchaseRequirement | undefined;
  kycRequirement?: LimitConfig_KycRequirement | undefined;
  depositRequirement?: LimitConfig_DepositRequirement | undefined;
  adminFlagRequirement?: LimitConfig_AdminFlagRequirement | undefined;
  locked: boolean;
}

/** For a given max risk score, there are various limit levels */
export interface LimitConfig_ScoreRange {
  maximumRiskScore: number;
  limitLevels: LimitConfig_LimitLevel[];
  maximumCreditRiskScore: number;
}

export interface LimitConfig_ExperimentInfo {
  name: string;
  group: string;
}

/**
 * RaftCluster represents a raft configuration that maps roughly to
 * https://godoc.org/github.com/hashicorp/raft#Configuration
 *
 * Currently used by pro for service discovery of replicated trading engines.
 */
export interface RaftCluster {
  id: string;
  /** Map server id (uuid) to server. */
  servers: { [key: string]: RaftCluster_Server };
  leaderServerId: string;
  engineType: RaftCluster_EngineType;
}

/** Maps to https://godoc.org/github.com/hashicorp/raft#ServerSuffrage */
export enum RaftCluster_Suffrage {
  UNKNOWN = 0,
  VOTER = 1,
  NONVOTER = 2,
  STAGING = 3,
  UNRECOGNIZED = -1,
}

export function raftCluster_SuffrageFromJSON(object: any): RaftCluster_Suffrage {
  switch (object) {
    case 0:
    case 'UNKNOWN':
      return RaftCluster_Suffrage.UNKNOWN;
    case 1:
    case 'VOTER':
      return RaftCluster_Suffrage.VOTER;
    case 2:
    case 'NONVOTER':
      return RaftCluster_Suffrage.NONVOTER;
    case 3:
    case 'STAGING':
      return RaftCluster_Suffrage.STAGING;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return RaftCluster_Suffrage.UNRECOGNIZED;
  }
}

export function raftCluster_SuffrageToJSON(object: RaftCluster_Suffrage): string {
  switch (object) {
    case RaftCluster_Suffrage.UNKNOWN:
      return 'UNKNOWN';
    case RaftCluster_Suffrage.VOTER:
      return 'VOTER';
    case RaftCluster_Suffrage.NONVOTER:
      return 'NONVOTER';
    case RaftCluster_Suffrage.STAGING:
      return 'STAGING';
    case RaftCluster_Suffrage.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export enum RaftCluster_EngineType {
  HASHICORP = 0,
  AERON = 1,
  UNRECOGNIZED = -1,
}

export function raftCluster_EngineTypeFromJSON(object: any): RaftCluster_EngineType {
  switch (object) {
    case 0:
    case 'HASHICORP':
      return RaftCluster_EngineType.HASHICORP;
    case 1:
    case 'AERON':
      return RaftCluster_EngineType.AERON;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return RaftCluster_EngineType.UNRECOGNIZED;
  }
}

export function raftCluster_EngineTypeToJSON(object: RaftCluster_EngineType): string {
  switch (object) {
    case RaftCluster_EngineType.HASHICORP:
      return 'HASHICORP';
    case RaftCluster_EngineType.AERON:
      return 'AERON';
    case RaftCluster_EngineType.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export interface RaftCluster_Server {
  suffrage: RaftCluster_Suffrage;
  /** Server address */
  ipAddress: string;
  /**
   * NOTE: this is not the port used for raft communications, rather the
   * port used for application-specific rpcs. For example, this is the port
   * that pro uses for communicating with the trading engine and NOT the
   * raft port.
   */
  rpcPort: number;
  feedPort: number;
}

export interface RaftCluster_ServersEntry {
  key: string;
  value: RaftCluster_Server | undefined;
}

/** FullLimitConfig represents the full confguration of risk limits for a country/region */
export interface FullLimitConfig {
  limitConfigs: LimitConfig[];
}

export interface Orchestration {
  /** Currency ticker. EG 'BTC' */
  currency: string;
  /** Name of the pool */
  poolName: string;
  /** UUID for the pool */
  poolUuid: string;
  /** Do restores for this orchestration require approval? (All KK pools require approval) */
  requiresApproval: boolean;
  /** Tier Information for this orchestration */
  tierArray: string;
  /** Are this orchestration's limits denominated in USD? Then, we use live price data to adjust balance limits. */
  isLivePriceOrchestration: boolean;
  /** Which wallet service should wallet orchestrator use to create sweeps and restores? */
  wallet: string;
  /** The maximum amount we should transfer in single sweep transaction, expressed as a fraction of the max_balance */
  maxSweepFraction: number;
  /** Blockchain network name */
  network: string;
  /**
   * Keychain transaction format (we dont import its enum to reduce tight coupling)
   * https://github.cbhq.net/c3/keychain/blob/ece909808f0668632ee0c1a9b2e4d5fa372a3f3a/protos/signerv2/signerv2.proto#L18-L27
   */
  keychainTxFormat: string;
  /** Are bridge movements enabled for the orchestration */
  enableBridge: boolean;
  /** Name of the other blockchain network that participate in bridge movements */
  bridgeNetwork: string;
  /** Currency ticker of the asset on the bridge network. e.g. 'USDC' */
  bridgeCurrency: string;
  /** UUID of the account the wallet clients should use to source the transfer */
  bridgeAccountId: string;
  /** Currency ticker to use to get USD spot rates */
  ratesCurrency: string;
  /** Whether or not to use outbound-aware chunking algorithm for sweeping */
  enableOutboundAwareChunking: boolean;
  /** Whether or not WO should schedule flushes for this orchestration */
  enableFlush: boolean;
  /** The maximum allowed balance in the inbound hot wallet before we should trigger flushes */
  inboundMaxBalance: number;
  /** Above this amount in L2 hot wallets, we stop crediting deposits */
  hotWalletBridgeCapacity: number;
  /**
   * The maximum allowed balance in the outbound hot wallet before we should trigger sweeps
   * If set, this field overrides max_balance
   */
  outboundMaxBalance: number;
  /**
   * The minimum allowed balance in the outbound hot wallet before we should trigger restores
   * If set, this field overrides min_balance
   */
  outboundMinBalance: number;
  /**
   * If we are below outbound_min_balance or above outbound_max_balance, WO will create restores/sweeps
   * in order to bring the balance to this value
   */
  outboundTargetBalance: number;
  /** Are lightning movements enabled for the orchestration */
  enableLightning: boolean;
  /**
   * The maximum allowed delta in percentage between what Coinbase calculates as the effective balance
   * compared to what the lightning client calculates
   */
  maxLightningBalanceDeltaPercent: number;
  /** The maximum allowed amount that can be lightning restored at any given time */
  maxLightningRestoreAmount: number;
  /** Whether attestation is required to succeed before initiating a restore */
  requireRestoreAttestation: boolean;
}

/** A Type to contain information about tiers that are used for an Orchestration */
export interface TierArray {
  /** Tiers in this tier array */
  tiers: Tier[];
}

/** A Storage Tier */
export interface Tier {
  /** Tier Name */
  name: string;
  /** Dynasty UUID of the tier */
  dynastyId: string;
  /**
   * A floor on the capacity of this tier, expressed as a multiplier of the hot wallet maximum balance limit.
   * WO will use the max(min_tier_capacity_usd, min_tier_capacity_hw_max_multiplier) as the capacity.
   */
  tierCapacityFloorHwMaxMultiplier: number;
  /**
   * A floor on the capacity of each key in this tier,  expressed as a multiplier of the hot wallet maximum balance limit.
   * WO will use the max(min_per_key_capacity_usd, min_per_key_capacity_hw_max_multiplier) as the capacity.
   */
  perKeyCapacityFloorHwMaxMultiplier: number;
  /**
   * How low the tier balance must be before we trigger a restore during Tier Orchestration.
   * Expressed as a fraction of the tier capacity.
   */
  tierRestoreThreshold: number;
  /**
   * A floor on the capacity of this tier, expressed as a USD value.
   * WO will use hot_wallet_multiplier if that value is larger.
   */
  tierCapacityFloorUsd: number;
  /**
   * A floor on the capacity of each key in this tier, expressed as a USD value.
   * WO will use the max(min_per_key_capacity_usd, min_per_key_capacity_hw_max_multiplier) as the capacity.
   */
  perKeyCapacityFloorUsd: number;
  /** ID of the custody portfolio that is providing the cold storage for the tier */
  custodyPortfolioId: string;
}

/** Describes information needed to compute sets of machine learning features */
export interface FeatureSetMetadata {
  /**
   * name of feature set (must be unique, because each one
   * maps to a DynamoDB table)
   */
  name: string;
  entity: FeatureSetMetadata_Entity;
  source: FeatureSetMetadata_Source;
  /**
   * Extra configuration needed for each source
   * Allowed keys and values specified at the source itself,
   * i.e. airflow-pipelines (ml_data_pipeline dag) for Snowflake features
   * and flink-job-builder for Flink features
   */
  sourceConfig: { [key: string]: string };
  /**
   * column name in provided SQL that indicates
   * the point at which the information content
   * of features in this feature set was knowable
   */
  timestampColumnName: string;
  /**
   * column name in provided SQL mapping 1:1
   * to an instance of the associated entity
   * e.g. user_id for the User entity
   */
  entityColumnName: string;
  /**
   * List of each FeatureMetadata derived from the SQL
   * provided in this FeatureSetMetadata
   */
  features: FeatureSetMetadata_FeatureMetadata[];
  /**
   * SQL used to compute Features.
   * Dialect is Snowflake SQL for the Snowflake source
   * and Flink SQL for the FLink source
   */
  sql: string;
  /** Join to most recent value in other feature set */
  joinOnRecent: boolean;
  /**
   * time window in seconds that this feature set is bucketed to
   * Rows will be joined to values in corresponding time buckets in
   * other feature sets
   * NOTE: only used if join_on_recent is false
   */
  timeSlide: number;
  /**
   * Requires joining to label to create backfill table for training
   * (generally due to size of source table)
   */
  requiresLabel: boolean;
}

/**
 * Source corresponds to the compute engine.
 * Flink compute engine maps to Snowflake storage
 * in training and DynamoDB in serving.
 * Snowflake compute engine maps to Snowflake storage
 * in training, but the Monorail is currently responsible
 * for sending values in serving
 */
export enum FeatureSetMetadata_Source {
  UNKNOWN_SOURCE = 0,
  FLINK = 1,
  SNOWFLAKE = 2,
  SNOWFLAKE_FQS = 3,
  COMBO = 4,
  UNRECOGNIZED = -1,
}

export function featureSetMetadata_SourceFromJSON(object: any): FeatureSetMetadata_Source {
  switch (object) {
    case 0:
    case 'UNKNOWN_SOURCE':
      return FeatureSetMetadata_Source.UNKNOWN_SOURCE;
    case 1:
    case 'FLINK':
      return FeatureSetMetadata_Source.FLINK;
    case 2:
    case 'SNOWFLAKE':
      return FeatureSetMetadata_Source.SNOWFLAKE;
    case 3:
    case 'SNOWFLAKE_FQS':
      return FeatureSetMetadata_Source.SNOWFLAKE_FQS;
    case 4:
    case 'COMBO':
      return FeatureSetMetadata_Source.COMBO;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return FeatureSetMetadata_Source.UNRECOGNIZED;
  }
}

export function featureSetMetadata_SourceToJSON(object: FeatureSetMetadata_Source): string {
  switch (object) {
    case FeatureSetMetadata_Source.UNKNOWN_SOURCE:
      return 'UNKNOWN_SOURCE';
    case FeatureSetMetadata_Source.FLINK:
      return 'FLINK';
    case FeatureSetMetadata_Source.SNOWFLAKE:
      return 'SNOWFLAKE';
    case FeatureSetMetadata_Source.SNOWFLAKE_FQS:
      return 'SNOWFLAKE_FQS';
    case FeatureSetMetadata_Source.COMBO:
      return 'COMBO';
    case FeatureSetMetadata_Source.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

/**
 * NOTE: these types will map to more specific types
 * in the associated compute engine and datastore.
 * i.e. in Snowflake, TEXT maps to VARCHAR(16777216),
 * CATEGORICAL to VARCHAR(24) and NUMERIC to either NUMBER(38, 0)
 * or FLOAT
 */
export enum FeatureSetMetadata_Type {
  UNKNOWN_TYPE = 0,
  /**
   * STRING - Free text, not semantically associated with distinct categories
   * Maps to Snowflake TEXT/VARCHAR
   * Maps to Flink STRING
   */
  STRING = 1,
  /**
   * CATEGORICAL - [Deprecated]
   * Categories which have no natural or mathematically simple ordering
   * Underlying data type can either look like a string or a number
   */
  CATEGORICAL = 2,
  /**
   * BOOLEAN - Two-element categorical
   * Maps to Snowflake & Flink BOOLEAN
   */
  BOOLEAN = 3,
  /**
   * ORDINAL - [Deprecated]
   * Bounded set of ordered categories, such as "education level" or
   * "military rank"
   */
  ORDINAL = 4,
  /**
   * NUMERIC - Number, either integer or real
   * Maps to Snowflake Numeric/Number
   * Maps to Flink DOUBLE
   */
  NUMERIC = 5,
  /**
   * DATETIME - date, time, or datetime combo
   * maps to Snowflake DATETIME/TIMESTAMP_NTZ
   * maps to Flink TIMESTAMP
   */
  DATETIME = 6,
  /**
   * TIMEDELTA - time difference, e.g. 2 days or 3 minutes
   * Maps to Flink INTERVAL SECOND(3)
   */
  TIMEDELTA = 7,
  /** INTERVAL_SECOND - Maps to Flink INTERVAL SECOND(3) */
  INTERVAL_SECOND = 8,
  /** INTERVAL_MONTH - Maps to Flink INTERVAL MONTH */
  INTERVAL_MONTH = 9,
  /** DATE - maps to Snowflake/Flink DATE */
  DATE = 10,
  /** TIME - maps to Snowflake/Flink TIME */
  TIME = 11,
  /**
   * TIMESTAMP_LTZ - maps to Snowflake TIMESTAMP_LTZ (UTC time)
   * maps to Flink TIMESTAMP
   */
  TIMESTAMP_LTZ = 12,
  /**
   * TIMESTAMP_TZ - maps to Snowflake TIMESTAMP_TZ (UTC + offset
   * of current time zone, which is whatever is stored
   * in TIMEZONE parameter)
   * maps to Flink TIMESTAMP WITH LOCAL TIME ZONE
   */
  TIMESTAMP_TZ = 13,
  /**
   * TINYINT - Maps to Flink TINYINT
   * Maps to Snowflake SMALLINT
   */
  TINYINT = 14,
  /** SMALLINT - Maps to Snowflake/Flink SMALLINT */
  SMALLINT = 15,
  /** INTEGER - Maps to Snowflake/Flink INTEGER */
  INTEGER = 16,
  /** BIGINT - Maps to Snowflake/Flink BIGINT */
  BIGINT = 17,
  /** FLOAT - Maps to Snowflake/Flink FLOAT */
  FLOAT = 18,
  /**
   * DOUBLE - Maps to Snowflake FLOAT
   * Maps to Flink DOUBLE
   */
  DOUBLE = 19,
  /** VARIANT - Maps to Snowflake VARIANT */
  VARIANT = 20,
  /** OBJECT - Maps to Snowflake OBJECT */
  OBJECT = 21,
  /** ARRAY - Maps to Snowflake/Flink ARRAY */
  ARRAY = 22,
  /** GEOGRAPHY - Maps to Snowflake GEOGRAPHY */
  GEOGRAPHY = 23,
  /** MULTISET - Maps to Flink MULTISET */
  MULTISET = 24,
  /** MAP - Maps to Flink MAP */
  MAP = 25,
  /** ROW - Maps to Flink ROW */
  ROW = 26,
  /** RAW - Maps to Flink RAW */
  RAW = 27,
  /** BYTES - Maps to Snowflake Binary/Flink BYTES */
  BYTES = 28,
  UNRECOGNIZED = -1,
}

export function featureSetMetadata_TypeFromJSON(object: any): FeatureSetMetadata_Type {
  switch (object) {
    case 0:
    case 'UNKNOWN_TYPE':
      return FeatureSetMetadata_Type.UNKNOWN_TYPE;
    case 1:
    case 'STRING':
      return FeatureSetMetadata_Type.STRING;
    case 2:
    case 'CATEGORICAL':
      return FeatureSetMetadata_Type.CATEGORICAL;
    case 3:
    case 'BOOLEAN':
      return FeatureSetMetadata_Type.BOOLEAN;
    case 4:
    case 'ORDINAL':
      return FeatureSetMetadata_Type.ORDINAL;
    case 5:
    case 'NUMERIC':
      return FeatureSetMetadata_Type.NUMERIC;
    case 6:
    case 'DATETIME':
      return FeatureSetMetadata_Type.DATETIME;
    case 7:
    case 'TIMEDELTA':
      return FeatureSetMetadata_Type.TIMEDELTA;
    case 8:
    case 'INTERVAL_SECOND':
      return FeatureSetMetadata_Type.INTERVAL_SECOND;
    case 9:
    case 'INTERVAL_MONTH':
      return FeatureSetMetadata_Type.INTERVAL_MONTH;
    case 10:
    case 'DATE':
      return FeatureSetMetadata_Type.DATE;
    case 11:
    case 'TIME':
      return FeatureSetMetadata_Type.TIME;
    case 12:
    case 'TIMESTAMP_LTZ':
      return FeatureSetMetadata_Type.TIMESTAMP_LTZ;
    case 13:
    case 'TIMESTAMP_TZ':
      return FeatureSetMetadata_Type.TIMESTAMP_TZ;
    case 14:
    case 'TINYINT':
      return FeatureSetMetadata_Type.TINYINT;
    case 15:
    case 'SMALLINT':
      return FeatureSetMetadata_Type.SMALLINT;
    case 16:
    case 'INTEGER':
      return FeatureSetMetadata_Type.INTEGER;
    case 17:
    case 'BIGINT':
      return FeatureSetMetadata_Type.BIGINT;
    case 18:
    case 'FLOAT':
      return FeatureSetMetadata_Type.FLOAT;
    case 19:
    case 'DOUBLE':
      return FeatureSetMetadata_Type.DOUBLE;
    case 20:
    case 'VARIANT':
      return FeatureSetMetadata_Type.VARIANT;
    case 21:
    case 'OBJECT':
      return FeatureSetMetadata_Type.OBJECT;
    case 22:
    case 'ARRAY':
      return FeatureSetMetadata_Type.ARRAY;
    case 23:
    case 'GEOGRAPHY':
      return FeatureSetMetadata_Type.GEOGRAPHY;
    case 24:
    case 'MULTISET':
      return FeatureSetMetadata_Type.MULTISET;
    case 25:
    case 'MAP':
      return FeatureSetMetadata_Type.MAP;
    case 26:
    case 'ROW':
      return FeatureSetMetadata_Type.ROW;
    case 27:
    case 'RAW':
      return FeatureSetMetadata_Type.RAW;
    case 28:
    case 'BYTES':
      return FeatureSetMetadata_Type.BYTES;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return FeatureSetMetadata_Type.UNRECOGNIZED;
  }
}

export function featureSetMetadata_TypeToJSON(object: FeatureSetMetadata_Type): string {
  switch (object) {
    case FeatureSetMetadata_Type.UNKNOWN_TYPE:
      return 'UNKNOWN_TYPE';
    case FeatureSetMetadata_Type.STRING:
      return 'STRING';
    case FeatureSetMetadata_Type.CATEGORICAL:
      return 'CATEGORICAL';
    case FeatureSetMetadata_Type.BOOLEAN:
      return 'BOOLEAN';
    case FeatureSetMetadata_Type.ORDINAL:
      return 'ORDINAL';
    case FeatureSetMetadata_Type.NUMERIC:
      return 'NUMERIC';
    case FeatureSetMetadata_Type.DATETIME:
      return 'DATETIME';
    case FeatureSetMetadata_Type.TIMEDELTA:
      return 'TIMEDELTA';
    case FeatureSetMetadata_Type.INTERVAL_SECOND:
      return 'INTERVAL_SECOND';
    case FeatureSetMetadata_Type.INTERVAL_MONTH:
      return 'INTERVAL_MONTH';
    case FeatureSetMetadata_Type.DATE:
      return 'DATE';
    case FeatureSetMetadata_Type.TIME:
      return 'TIME';
    case FeatureSetMetadata_Type.TIMESTAMP_LTZ:
      return 'TIMESTAMP_LTZ';
    case FeatureSetMetadata_Type.TIMESTAMP_TZ:
      return 'TIMESTAMP_TZ';
    case FeatureSetMetadata_Type.TINYINT:
      return 'TINYINT';
    case FeatureSetMetadata_Type.SMALLINT:
      return 'SMALLINT';
    case FeatureSetMetadata_Type.INTEGER:
      return 'INTEGER';
    case FeatureSetMetadata_Type.BIGINT:
      return 'BIGINT';
    case FeatureSetMetadata_Type.FLOAT:
      return 'FLOAT';
    case FeatureSetMetadata_Type.DOUBLE:
      return 'DOUBLE';
    case FeatureSetMetadata_Type.VARIANT:
      return 'VARIANT';
    case FeatureSetMetadata_Type.OBJECT:
      return 'OBJECT';
    case FeatureSetMetadata_Type.ARRAY:
      return 'ARRAY';
    case FeatureSetMetadata_Type.GEOGRAPHY:
      return 'GEOGRAPHY';
    case FeatureSetMetadata_Type.MULTISET:
      return 'MULTISET';
    case FeatureSetMetadata_Type.MAP:
      return 'MAP';
    case FeatureSetMetadata_Type.ROW:
      return 'ROW';
    case FeatureSetMetadata_Type.RAW:
      return 'RAW';
    case FeatureSetMetadata_Type.BYTES:
      return 'BYTES';
    case FeatureSetMetadata_Type.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

/**
 * "name" of default value, which needs to be converted to the actual
 * value in the associated language by the language-specific deserializer
 * The mapping these deserializers use to do the conversion lives in cb-proto-utils
 */
export enum FeatureSetMetadata_DefaultValue {
  UNKNOWN_DEFAULT_VALUE = 0,
  ZERO = 1,
  NEG_1 = 2,
  /** INF - Do we also need a MAXINT/NEGMAXINT? */
  INF = 3,
  NEG_INF = 4,
  NAT = 5,
  NULL = 6,
  EMPTY_STR = 7,
  FALSE = 8,
  TRUE = 9,
  UNRECOGNIZED = -1,
}

export function featureSetMetadata_DefaultValueFromJSON(
  object: any,
): FeatureSetMetadata_DefaultValue {
  switch (object) {
    case 0:
    case 'UNKNOWN_DEFAULT_VALUE':
      return FeatureSetMetadata_DefaultValue.UNKNOWN_DEFAULT_VALUE;
    case 1:
    case 'ZERO':
      return FeatureSetMetadata_DefaultValue.ZERO;
    case 2:
    case 'NEG_1':
      return FeatureSetMetadata_DefaultValue.NEG_1;
    case 3:
    case 'INF':
      return FeatureSetMetadata_DefaultValue.INF;
    case 4:
    case 'NEG_INF':
      return FeatureSetMetadata_DefaultValue.NEG_INF;
    case 5:
    case 'NAT':
      return FeatureSetMetadata_DefaultValue.NAT;
    case 6:
    case 'NULL':
      return FeatureSetMetadata_DefaultValue.NULL;
    case 7:
    case 'EMPTY_STR':
      return FeatureSetMetadata_DefaultValue.EMPTY_STR;
    case 8:
    case 'FALSE':
      return FeatureSetMetadata_DefaultValue.FALSE;
    case 9:
    case 'TRUE':
      return FeatureSetMetadata_DefaultValue.TRUE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return FeatureSetMetadata_DefaultValue.UNRECOGNIZED;
  }
}

export function featureSetMetadata_DefaultValueToJSON(
  object: FeatureSetMetadata_DefaultValue,
): string {
  switch (object) {
    case FeatureSetMetadata_DefaultValue.UNKNOWN_DEFAULT_VALUE:
      return 'UNKNOWN_DEFAULT_VALUE';
    case FeatureSetMetadata_DefaultValue.ZERO:
      return 'ZERO';
    case FeatureSetMetadata_DefaultValue.NEG_1:
      return 'NEG_1';
    case FeatureSetMetadata_DefaultValue.INF:
      return 'INF';
    case FeatureSetMetadata_DefaultValue.NEG_INF:
      return 'NEG_INF';
    case FeatureSetMetadata_DefaultValue.NAT:
      return 'NAT';
    case FeatureSetMetadata_DefaultValue.NULL:
      return 'NULL';
    case FeatureSetMetadata_DefaultValue.EMPTY_STR:
      return 'EMPTY_STR';
    case FeatureSetMetadata_DefaultValue.FALSE:
      return 'FALSE';
    case FeatureSetMetadata_DefaultValue.TRUE:
      return 'TRUE';
    case FeatureSetMetadata_DefaultValue.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

/** type of aggregation that the feature performs */
export enum FeatureSetMetadata_Aggregate {
  UNKNOWN_AGGREGATE = 0,
  SUM = 1,
  FIRST = 2,
  LAST = 3,
  MAX = 4,
  MIN = 6,
  COUNT = 7,
  LISTAGG = 8,
  UNRECOGNIZED = -1,
}

export function featureSetMetadata_AggregateFromJSON(object: any): FeatureSetMetadata_Aggregate {
  switch (object) {
    case 0:
    case 'UNKNOWN_AGGREGATE':
      return FeatureSetMetadata_Aggregate.UNKNOWN_AGGREGATE;
    case 1:
    case 'SUM':
      return FeatureSetMetadata_Aggregate.SUM;
    case 2:
    case 'FIRST':
      return FeatureSetMetadata_Aggregate.FIRST;
    case 3:
    case 'LAST':
      return FeatureSetMetadata_Aggregate.LAST;
    case 4:
    case 'MAX':
      return FeatureSetMetadata_Aggregate.MAX;
    case 6:
    case 'MIN':
      return FeatureSetMetadata_Aggregate.MIN;
    case 7:
    case 'COUNT':
      return FeatureSetMetadata_Aggregate.COUNT;
    case 8:
    case 'LISTAGG':
      return FeatureSetMetadata_Aggregate.LISTAGG;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return FeatureSetMetadata_Aggregate.UNRECOGNIZED;
  }
}

export function featureSetMetadata_AggregateToJSON(object: FeatureSetMetadata_Aggregate): string {
  switch (object) {
    case FeatureSetMetadata_Aggregate.UNKNOWN_AGGREGATE:
      return 'UNKNOWN_AGGREGATE';
    case FeatureSetMetadata_Aggregate.SUM:
      return 'SUM';
    case FeatureSetMetadata_Aggregate.FIRST:
      return 'FIRST';
    case FeatureSetMetadata_Aggregate.LAST:
      return 'LAST';
    case FeatureSetMetadata_Aggregate.MAX:
      return 'MAX';
    case FeatureSetMetadata_Aggregate.MIN:
      return 'MIN';
    case FeatureSetMetadata_Aggregate.COUNT:
      return 'COUNT';
    case FeatureSetMetadata_Aggregate.LISTAGG:
      return 'LISTAGG';
    case FeatureSetMetadata_Aggregate.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

/** name of business entity that maps to a single row of each feature */
export enum FeatureSetMetadata_Entity {
  UNKNOWN_ENTITY = 0,
  USER = 1,
  IP = 2,
  TRANSFER = 3,
  DEVICE = 4,
  TICKET = 5,
  ADDRESS = 6,
  ASSET = 7,
  COUNTRY = 8,
  UNRECOGNIZED = -1,
}

export function featureSetMetadata_EntityFromJSON(object: any): FeatureSetMetadata_Entity {
  switch (object) {
    case 0:
    case 'UNKNOWN_ENTITY':
      return FeatureSetMetadata_Entity.UNKNOWN_ENTITY;
    case 1:
    case 'USER':
      return FeatureSetMetadata_Entity.USER;
    case 2:
    case 'IP':
      return FeatureSetMetadata_Entity.IP;
    case 3:
    case 'TRANSFER':
      return FeatureSetMetadata_Entity.TRANSFER;
    case 4:
    case 'DEVICE':
      return FeatureSetMetadata_Entity.DEVICE;
    case 5:
    case 'TICKET':
      return FeatureSetMetadata_Entity.TICKET;
    case 6:
    case 'ADDRESS':
      return FeatureSetMetadata_Entity.ADDRESS;
    case 7:
    case 'ASSET':
      return FeatureSetMetadata_Entity.ASSET;
    case 8:
    case 'COUNTRY':
      return FeatureSetMetadata_Entity.COUNTRY;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return FeatureSetMetadata_Entity.UNRECOGNIZED;
  }
}

export function featureSetMetadata_EntityToJSON(object: FeatureSetMetadata_Entity): string {
  switch (object) {
    case FeatureSetMetadata_Entity.UNKNOWN_ENTITY:
      return 'UNKNOWN_ENTITY';
    case FeatureSetMetadata_Entity.USER:
      return 'USER';
    case FeatureSetMetadata_Entity.IP:
      return 'IP';
    case FeatureSetMetadata_Entity.TRANSFER:
      return 'TRANSFER';
    case FeatureSetMetadata_Entity.DEVICE:
      return 'DEVICE';
    case FeatureSetMetadata_Entity.TICKET:
      return 'TICKET';
    case FeatureSetMetadata_Entity.ADDRESS:
      return 'ADDRESS';
    case FeatureSetMetadata_Entity.ASSET:
      return 'ASSET';
    case FeatureSetMetadata_Entity.COUNTRY:
      return 'COUNTRY';
    case FeatureSetMetadata_Entity.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export interface FeatureSetMetadata_FeatureMetadata {
  /**
   * name of feature. Corresponds to a column alias in
   * SQL of associated FeatureSetMetadata
   */
  name: string;
  type: FeatureSetMetadata_Type;
  defaultValue: FeatureSetMetadata_DefaultValue;
  numericValue?: number | undefined;
  stringValue?: string | undefined;
  aggregate: FeatureSetMetadata_Aggregate;
}

export interface FeatureSetMetadata_SourceConfigEntry {
  key: string;
  value: string;
}

/**
 * Reference to all the features used to train a particular model
 * during a particular training job
 */
export interface ModelFeaturesConfig {
  /**
   * canonical model name that we refer to a model as, i.e. in
   * design docs. e.g. "TRM 2.0"
   */
  canonicalModelName: string;
  /** name of importable Python package, e.g. `cbfraud` */
  modelPackage: string;
  /** Python entrypoint within model_package, e.g. `transferrisk.TransferRisk` */
  modelVariant: string;
  /** Uniquely identifies job on Nostradamus and SageMaker */
  trainingJobId: string;
  /** name of FeatureSet which contains a column to use as the machine learning label */
  labelFeatureSet: string;
  /** List of each feature reference */
  featureSets: ModelFeaturesConfig_ModelFeatureSet[];
  /**
   * binarized protobuf File Descriptor Set that can be used to deserialize actual
   * feature values
   */
  descriptor: Uint8Array;
  /** optional custom sql to use instead of join_key/join_to for each FeatureSet */
  customLoadSql: string;
  /** list of datasets used */
  datasetDates: ModelFeaturesConfig_DatasetDate[];
  /** label_column used as target */
  labelColumn: string;
  /**
   * whether label column is generated from the join_sql
   * as opposed to being already present in the feature set
   */
  labelColumnFromCustomSql: boolean;
  /** Whether to coerce null values into default values */
  coerceDefaultValues: boolean;
  /**
   * Whether to remove feature_set name from beginning of each column name in retrieved data
   * i.e. if False, columns look like "my_fs_name.my_col", if True they look like "my_col"
   */
  stripColumnPrefixes: boolean;
}

export enum ModelFeaturesConfig_ModelFeatureType {
  /**
   * UNKNOWN_TYPE - Unknowns, or when ModelFeatureType is not provided,
   * always default to pandas object dtype
   */
  UNKNOWN_TYPE = 0,
  /**
   * TEXT - Free text, not semantically associated with distinct categories
   * Casts to string and maps to pandas object dtype
   */
  TEXT = 1,
  /**
   * CATEGORY - Categories which have no natural or mathematically simple ordering
   * Underlying data type can either look like a string or a number
   * Maps to pandas category dtype
   */
  CATEGORY = 2,
  /**
   * BOOL - Two-element categorical
   * Maps to pandas bool dtype
   */
  BOOL = 3,
  /**
   * NUMERIC - Number, either integer or real
   * Maps to pandas float64 dtype
   */
  NUMERIC = 4,
  /** FLOAT16 - Maps to pandas float16 dtype */
  FLOAT16 = 5,
  /** FLOAT32 - Maps to pandas float32 dtype */
  FLOAT32 = 6,
  /** FLOAT64 - Maps to pandas float64 dtype */
  FLOAT64 = 7,
  /** INT8 - Maps to pandas int8 dtype */
  INT8 = 8,
  /** INT16 - Maps to pandas int16 dtype */
  INT16 = 9,
  /** INT32 - Maps to pandas int32 dtype */
  INT32 = 10,
  /** INT64 - Maps to pandas int64 dtype */
  INT64 = 11,
  /** UINT8 - Maps to pandas uint8 dtype */
  UINT8 = 12,
  /** UINT16 - Maps to pandas uint16 dtype */
  UINT16 = 13,
  /** UINT32 - Maps to pandas uint32 dtype */
  UINT32 = 14,
  /** UINT64 - Maps to pandas uint64 dtype */
  UINT64 = 15,
  /**
   * DATETIME - date, time, or datetime combo
   * maps to pandas datetime64[ns] dtype
   */
  DATETIME = 16,
  /**
   * TIMEDELTA - time difference, e.g. 2 days or 3 minutes
   * casts to pandas timedelta[ns] dtype
   * assumes underlying type is a string including unit
   * like '3d' or '4m'
   */
  TIMEDELTA = 17,
  /**
   * TIMEDELTA_NANOSECONDS - casts to pandas timedelta[ns] dtype with nanoseconds unit
   * assumes underlying type is numeric
   */
  TIMEDELTA_NANOSECONDS = 18,
  /**
   * TIMEDELTA_MILLISECONDS - casts to pandas timedelta[ns] dtype with milliseconds unit
   * assumes underlying type is numeric
   */
  TIMEDELTA_MILLISECONDS = 19,
  /**
   * TIMEDELTA_SECONDS - casts to pandas timedelta[ns] dtype with seconds unit
   * assumes underlying type is numeric
   */
  TIMEDELTA_SECONDS = 20,
  /**
   * TIMEDELTA_MINUTES - casts to pandas timedelta[ns] dtype with minutes unit
   * assumes underlying type is numeric
   */
  TIMEDELTA_MINUTES = 21,
  /**
   * TIMEDELTA_HOURS - casts to pandas timedelta[ns] dtype with hours unit
   * assumes underlying type is numeric
   */
  TIMEDELTA_HOURS = 22,
  /**
   * TIMEDELTA_DAYS - casts to pandas timedelta[ns] dtype with days unit
   * assumes underlying type is numeric
   */
  TIMEDELTA_DAYS = 23,
  UNRECOGNIZED = -1,
}

export function modelFeaturesConfig_ModelFeatureTypeFromJSON(
  object: any,
): ModelFeaturesConfig_ModelFeatureType {
  switch (object) {
    case 0:
    case 'UNKNOWN_TYPE':
      return ModelFeaturesConfig_ModelFeatureType.UNKNOWN_TYPE;
    case 1:
    case 'TEXT':
      return ModelFeaturesConfig_ModelFeatureType.TEXT;
    case 2:
    case 'CATEGORY':
      return ModelFeaturesConfig_ModelFeatureType.CATEGORY;
    case 3:
    case 'BOOL':
      return ModelFeaturesConfig_ModelFeatureType.BOOL;
    case 4:
    case 'NUMERIC':
      return ModelFeaturesConfig_ModelFeatureType.NUMERIC;
    case 5:
    case 'FLOAT16':
      return ModelFeaturesConfig_ModelFeatureType.FLOAT16;
    case 6:
    case 'FLOAT32':
      return ModelFeaturesConfig_ModelFeatureType.FLOAT32;
    case 7:
    case 'FLOAT64':
      return ModelFeaturesConfig_ModelFeatureType.FLOAT64;
    case 8:
    case 'INT8':
      return ModelFeaturesConfig_ModelFeatureType.INT8;
    case 9:
    case 'INT16':
      return ModelFeaturesConfig_ModelFeatureType.INT16;
    case 10:
    case 'INT32':
      return ModelFeaturesConfig_ModelFeatureType.INT32;
    case 11:
    case 'INT64':
      return ModelFeaturesConfig_ModelFeatureType.INT64;
    case 12:
    case 'UINT8':
      return ModelFeaturesConfig_ModelFeatureType.UINT8;
    case 13:
    case 'UINT16':
      return ModelFeaturesConfig_ModelFeatureType.UINT16;
    case 14:
    case 'UINT32':
      return ModelFeaturesConfig_ModelFeatureType.UINT32;
    case 15:
    case 'UINT64':
      return ModelFeaturesConfig_ModelFeatureType.UINT64;
    case 16:
    case 'DATETIME':
      return ModelFeaturesConfig_ModelFeatureType.DATETIME;
    case 17:
    case 'TIMEDELTA':
      return ModelFeaturesConfig_ModelFeatureType.TIMEDELTA;
    case 18:
    case 'TIMEDELTA_NANOSECONDS':
      return ModelFeaturesConfig_ModelFeatureType.TIMEDELTA_NANOSECONDS;
    case 19:
    case 'TIMEDELTA_MILLISECONDS':
      return ModelFeaturesConfig_ModelFeatureType.TIMEDELTA_MILLISECONDS;
    case 20:
    case 'TIMEDELTA_SECONDS':
      return ModelFeaturesConfig_ModelFeatureType.TIMEDELTA_SECONDS;
    case 21:
    case 'TIMEDELTA_MINUTES':
      return ModelFeaturesConfig_ModelFeatureType.TIMEDELTA_MINUTES;
    case 22:
    case 'TIMEDELTA_HOURS':
      return ModelFeaturesConfig_ModelFeatureType.TIMEDELTA_HOURS;
    case 23:
    case 'TIMEDELTA_DAYS':
      return ModelFeaturesConfig_ModelFeatureType.TIMEDELTA_DAYS;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ModelFeaturesConfig_ModelFeatureType.UNRECOGNIZED;
  }
}

export function modelFeaturesConfig_ModelFeatureTypeToJSON(
  object: ModelFeaturesConfig_ModelFeatureType,
): string {
  switch (object) {
    case ModelFeaturesConfig_ModelFeatureType.UNKNOWN_TYPE:
      return 'UNKNOWN_TYPE';
    case ModelFeaturesConfig_ModelFeatureType.TEXT:
      return 'TEXT';
    case ModelFeaturesConfig_ModelFeatureType.CATEGORY:
      return 'CATEGORY';
    case ModelFeaturesConfig_ModelFeatureType.BOOL:
      return 'BOOL';
    case ModelFeaturesConfig_ModelFeatureType.NUMERIC:
      return 'NUMERIC';
    case ModelFeaturesConfig_ModelFeatureType.FLOAT16:
      return 'FLOAT16';
    case ModelFeaturesConfig_ModelFeatureType.FLOAT32:
      return 'FLOAT32';
    case ModelFeaturesConfig_ModelFeatureType.FLOAT64:
      return 'FLOAT64';
    case ModelFeaturesConfig_ModelFeatureType.INT8:
      return 'INT8';
    case ModelFeaturesConfig_ModelFeatureType.INT16:
      return 'INT16';
    case ModelFeaturesConfig_ModelFeatureType.INT32:
      return 'INT32';
    case ModelFeaturesConfig_ModelFeatureType.INT64:
      return 'INT64';
    case ModelFeaturesConfig_ModelFeatureType.UINT8:
      return 'UINT8';
    case ModelFeaturesConfig_ModelFeatureType.UINT16:
      return 'UINT16';
    case ModelFeaturesConfig_ModelFeatureType.UINT32:
      return 'UINT32';
    case ModelFeaturesConfig_ModelFeatureType.UINT64:
      return 'UINT64';
    case ModelFeaturesConfig_ModelFeatureType.DATETIME:
      return 'DATETIME';
    case ModelFeaturesConfig_ModelFeatureType.TIMEDELTA:
      return 'TIMEDELTA';
    case ModelFeaturesConfig_ModelFeatureType.TIMEDELTA_NANOSECONDS:
      return 'TIMEDELTA_NANOSECONDS';
    case ModelFeaturesConfig_ModelFeatureType.TIMEDELTA_MILLISECONDS:
      return 'TIMEDELTA_MILLISECONDS';
    case ModelFeaturesConfig_ModelFeatureType.TIMEDELTA_SECONDS:
      return 'TIMEDELTA_SECONDS';
    case ModelFeaturesConfig_ModelFeatureType.TIMEDELTA_MINUTES:
      return 'TIMEDELTA_MINUTES';
    case ModelFeaturesConfig_ModelFeatureType.TIMEDELTA_HOURS:
      return 'TIMEDELTA_HOURS';
    case ModelFeaturesConfig_ModelFeatureType.TIMEDELTA_DAYS:
      return 'TIMEDELTA_DAYS';
    case ModelFeaturesConfig_ModelFeatureType.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export enum ModelFeaturesConfig_DatasetDateSource {
  SNOWFLAKE = 0,
  S3 = 1,
  UNRECOGNIZED = -1,
}

export function modelFeaturesConfig_DatasetDateSourceFromJSON(
  object: any,
): ModelFeaturesConfig_DatasetDateSource {
  switch (object) {
    case 0:
    case 'SNOWFLAKE':
      return ModelFeaturesConfig_DatasetDateSource.SNOWFLAKE;
    case 1:
    case 'S3':
      return ModelFeaturesConfig_DatasetDateSource.S3;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ModelFeaturesConfig_DatasetDateSource.UNRECOGNIZED;
  }
}

export function modelFeaturesConfig_DatasetDateSourceToJSON(
  object: ModelFeaturesConfig_DatasetDateSource,
): string {
  switch (object) {
    case ModelFeaturesConfig_DatasetDateSource.SNOWFLAKE:
      return 'SNOWFLAKE';
    case ModelFeaturesConfig_DatasetDateSource.S3:
      return 'S3';
    case ModelFeaturesConfig_DatasetDateSource.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export interface ModelFeaturesConfig_ModelFeature {
  name: string;
  type: ModelFeaturesConfig_ModelFeatureType;
}

/** Information needed to reference a FeatureSet */
export interface ModelFeaturesConfig_ModelFeatureSet {
  /** name of feature set (FeatureSetMetadata) */
  featureSet: string;
  /** name of column in this feature set to use to join to the "label" feature set */
  joinKey: string;
  /**
   * name of feature_set and column in that feature set to join to,
   * e.g. transfers.user_id
   */
  joinTo: string;
  /**
   * name & type to infer from each Feature in feature_set_metadata
   * this type could be higher-level or different from the underlying data type
   * implementations can deal with the type information here as they wish
   */
  features: ModelFeaturesConfig_ModelFeature[];
  /**
   * Whether to automatically join this feature set to the main
   * sql query, or otherwise assume the user took care of the joining
   * Like all bools, it defaults to False
   * Note that if custom_load_sql is empty this value is not used,
   * essentially defaulting to True
   */
  autoJoin: boolean;
}

/** represents a particular dataset used in this model */
export interface ModelFeaturesConfig_DatasetDate {
  /**
   * start_date/end_date is used to time-bound the data
   * and is necessary to reconstruct the precise data
   * used in this model at a later date
   */
  name: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  extraSqlContext: { [key: string]: string };
  source: ModelFeaturesConfig_DatasetDateSource;
}

export interface ModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry {
  key: string;
  value: string;
}

/** ModelScoreCachePolicy represents properties of score caching policy for a model */
export interface ModelScoreCachePolicy {
  /** tag name of the model */
  modelTag: string;
  /** entity whose score is being cached */
  entity: string;
  /** ttl is the amount of time the data stays in the cache */
  ttl: number;
}

/** A Type to contain multiple ModelScoreCachePolicy types */
export interface ModelScoreCachePolicyArray {
  /** List of ModelScoreCachePolicy that go in the policies array */
  policies: ModelScoreCachePolicy[];
}

/** IntMap is a wrapper type for a map of int32 keys/values. */
export interface IntMap {
  intMap: { [key: string]: number };
}

export interface IntMap_IntMapEntry {
  key: string;
  value: number;
}

/** IncentiveExperimentsConfig holds amount configurations for IDV BTC incentive experiments */
export interface IncentiveExperimentsConfig {
  experimentsConfig: { [key: string]: IncentiveExperimentsConfig_ExperimentGroupConfig };
}

/**
 * Holds experiment configurations: mapping between experiment name, experiment group name, and the incentive amount
 * e.g. {
 *  "idv_btc_2021_us_experiment": {
 *    "group_amounts": {
 *      "treatment_10": 10,
 *      "treatment_20": 20,
 *      "control": 5
 *     }
 *   }
 * }
 */
export interface IncentiveExperimentsConfig_ExperimentGroupConfig {
  groupAmounts: { [key: string]: number };
}

export interface IncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry {
  key: string;
  value: number;
}

export interface IncentiveExperimentsConfig_ExperimentsConfigEntry {
  key: string;
  value: IncentiveExperimentsConfig_ExperimentGroupConfig | undefined;
}

/** A type to store all configuration values for a Currency */
export interface Currency {
  /** Ticker for the currency */
  ticker: string;
  /** Name of the currency */
  currencyName: string;
  /** The network this currency belongs to */
  networkName: string;
  /** The number of decimal places for the currency */
  precision: number;
  /** Name of the base unit/atomic unit */
  atomicUnitName: string;
  /** Currencies that may exist alongside of this, due to a fork */
  forkedCurrencies: string[];
  /** Indicates if a currency (usually erc20) needs gas to move funds */
  requiresGas: boolean;
  /** Certain Currencies need to maintain 'gas' on the key in order to send funds */
  gasCurrency: string;
  /** Indicates if a currency requires on-demand on-chain account origination */
  requiresOrigination: boolean;
  /** network-specific options to forward to NOVA in the origination request */
  originationOptions: StringMap | undefined;
  /** True if we should not chunk sweeps */
  disableSweepChunking: boolean;
  /** For XTZ / XTZ-DELEGATED -- they require extra params */
  hasExtraRestoreParams: boolean;
  /** Certain legacy keys have legacy IDs associated with them */
  legacyId: string;
  /** One of NOVA, WALLACE, or MACBETH */
  defaultWallet: Wallet;
}

/** A type to store all configuration values for a Network */
export interface Network {
  /** Name of the network */
  networkName: string;
  /** List of networks which share the same address format */
  siblingNetworks: string[];
  /** Supported curves for the network */
  curve: string[];
  /** Gas currency, if applicable */
  gasCurrency: string;
}

/** KillSwitch describes the contents of a kill switch. */
export interface KillSwitch {
  /** Boolean to indicate if the switch is turned on to kill a specified service. */
  killed: boolean;
  /** Grouping for kill switches (Risk, Identity, etc.) */
  category: string;
  /** Slack teams to notify if kill switch is flipped. */
  slack: string[];
  /** Teams to page if kill switch is flipped. */
  pagerduty: string[];
  /** Combination of a given platform/client (e.g., ReactNative-5.0) */
  clients: string[];
  /** Required monorail roles to flip kill switch in Admin */
  roles: string[];
  /** One-off field to support team's SLO: see https://github.cbhq.net/engineering/coinbase/pull/24587 */
  group: string;
  /** Alternate storage engine */
  storage: string;
  /** Display name rather than parameter name */
  name: string;
  /** Teams that own the kill switch. Must correspond to the team names on component registry: https://component-registry.cbhq.net/#/Team */
  teamowner: string;
}

/** MlModelThresholdConfig describes the parameters for ml model dynamic thresholding */
export interface MlModelThresholdConfig {
  /** block rates related to each entity type for a ml model */
  blockRates: MlModelThresholdConfig_SegmentValues[];
  /** default thresholds for each entity type for a ml model */
  defaultThresholds: MlModelThresholdConfig_SegmentValues[];
}

/** stores a list of values for each segment type */
export interface MlModelThresholdConfig_SegmentValues {
  /** name of the segment */
  name: string;
  /** values for the segment */
  values: number[];
}

export interface EntryGatewayLoadTestConfig {
  tests: EntryGatewayLoadTestConfig_Test[];
}

export interface EntryGatewayLoadTestConfig_Test {
  name: string;
  distribution: EntryGatewayLoadTestConfig_Test_Distribution | undefined;
  /** fixed latency */
  latency: number;
  serverErrorRate: number;
  additionalAttributes: StringMap | undefined;
  route: string;
  weight: number;
}

/** distribution latency */
export interface EntryGatewayLoadTestConfig_Test_Distribution {
  sigma: number;
  mean: number;
}

export interface FeeOverride {
  /** currency the floats are in. Commonly the display amount currency */
  currency: string;
  /** coinbase fee percentage override. Acts as a multiplier */
  cbCommission: number;
  /** new spread percentage override */
  spreadPercentage: number;
}

/** CommerceAssets is used by coinbase commerce services to define common digital asset configuration data */
export interface CommerceAssets {
  /** array of commerce asset configurations for the given environment */
  assetConfigs: CommerceAssets_Config[];
}

export interface CommerceAssets_Config {
  /** the assetname as determined by deterministic UUID/hash naming scheme as described at: go/network-asset-naming */
  assetName: string;
  /** ticker symbol referenced by Stone::Currency module https://github.cbhq.net/engineering/stone e.g ETH */
  stoneCurrencySymbol: string;
  /** the network 'sym' as string used by commerce internally e.g eth_homestead */
  commerceNetworkSym: string;
  /** true if the asset is granted for usage to all merchants by default (IE: is added to their supported currencies) */
  isDefault: boolean;
  /**
   * if false, the asset is only available to internal users (coinbase email) and should only flip to true when marketing is ready
   * if true, the asset is externally available for use by supported merchants to enable on their charges
   * once the flag is set to true it should not be changed back to false, instead please use the create_charge_killswitch
   */
  isReleased: boolean;
  /** true if the asset is supported by the commerce address-pool service */
  addressPoolSupported: boolean;
  /** coinbase ledger account UUID for: commerce-omnibus@coinbase.com */
  retailOmnibusLedgerAccountUuid: string;
  /** coinbase ledger account UUID for: custodial-commerce-fees@coinbase.com */
  custodialFeeLedgerAccountUuid: string;
  /** maximum amount allowed for auto-conversion feature in usd, generally <=5M. e.g 5000000 */
  autoconversionLimitUsd: number;
  /** true if the asset is supported by the self-managed commerce wallet implementation */
  commerceWalletSupported: boolean;
  /** list of destination addresses for: noncustodial-commerce-fees@coinbase.com (rotates based on hash function) */
  noncustodialFeeDestinationAddresses: string[];
  metadata: CommerceAssets_Config_Metadata | undefined;
}

/** metadata for the asset may either be retrieved from official listed asset data or custom (IE: testnet tokens) */
export interface CommerceAssets_Config_Metadata {
  cbListedData?: CommerceAssets_Config_Metadata_CoinbaseListed | undefined;
  customData?: CommerceAssets_Config_Metadata_Custom | undefined;
}

export interface CommerceAssets_Config_Metadata_CoinbaseListed {
  /** the coinbase asset uuid, query assetBySymbol for examples at https://graphql-dev.cbhq.net/ */
  cbAssetUuid: string;
}

export interface CommerceAssets_Config_Metadata_Custom {
  /** a unique slug value for this asset (lower-case string without whitespace) */
  slug: string;
  /** the string used to render the asset name on the front-end UI */
  displayName: string;
  /** the power of 10 that represents how many subunits make up 1 native unit of an asset (exponent in cb asset) */
  decimals: number;
  /** if the asset is a token (IE: ERC-20 / SPL), the address of the asset's contract */
  contractAddress: string;
  /** the url used to render the icon on the front-end UI */
  imageUrl: string;
  /** lowest amount (in native units) allowed to transfer in Coinbase internal systems (retrieved from CB Pro API for CoinbaseListed) */
  minWithdrawalAmount: number;
}

export interface OpenBankingBankDetails {
  bankDetail: OpenBankingBankDetails_BankDetail[];
}

export interface OpenBankingBankDetails_DisplayDetails {
  iconUrl: string;
  logoUrl: string;
  backgroundColor: string;
}

export interface OpenBankingBankDetails_TruelayerDetails {
  providerId: string;
}

export interface OpenBankingBankDetails_BankDetail {
  bankName: string;
  displayDetails: OpenBankingBankDetails_DisplayDetails | undefined;
  truelayerDetails: OpenBankingBankDetails_TruelayerDetails | undefined;
  statusCode: number;
}

export interface OpenBankingBankDetailsV2 {
  bankDetail: OpenBankingBankDetailsV2_BankDetail[];
}

export interface OpenBankingBankDetailsV2_DisplayDetails {
  iconUrl: string;
  logoUrl: string;
  backgroundColor: string;
}

export interface OpenBankingBankDetailsV2_TruelayerDetails {
  providerId: string;
}

export interface OpenBankingBankDetailsV2_BankDetail {
  bankName: string;
  displayDetails: OpenBankingBankDetailsV2_DisplayDetails | undefined;
  truelayerDetails: OpenBankingBankDetailsV2_TruelayerDetails | undefined;
  bankAvailabilityStatusCode: number;
  bankAvailabilityForBuysStatusCode: number;
}

export interface LoadShedRules {
  albs: LoadShedRules_ApplicationLoadBalancer[];
}

export interface LoadShedRules_ApplicationLoadBalancer {
  name: string;
  tgs: LoadShedRules_ApplicationLoadBalancer_TargetGroup[];
}

export interface LoadShedRules_ApplicationLoadBalancer_TargetGroup {
  name: string;
  rules: LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule[];
}

export interface LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule {
  /** rules */
  pattern: string;
  callerService: string;
  requestMethod: string;
  /** manual shedding */
  exactLoadShedding: number;
  /** automatic shedding */
  monitorId: number;
  delta: number;
  period: Duration | undefined;
  maxLoadShedding: number;
  dryRun: boolean;
}

export interface HorusConfig {
  expWeight: number;
  v1Weight: number;
  v2Weight: number;
  printDiff: boolean;
}

/** CloudKillSwitchConfig describes a kill switch implementation for cloud staking used to turn on/off different products. */
export interface CloudKillSwitchConfig {
  protocolDetails: CloudKillSwitchConfig_ProtocolDetails | undefined;
}

/** ProtocolDetails contains the kill switch details for a protocol. */
export interface CloudKillSwitchConfig_ProtocolDetails {
  killSwitch: boolean;
  networkDetails: { [key: string]: CloudKillSwitchConfig_ProtocolDetails_NetworkDetails };
}

/** NetworkDetails contains the kill switch details for a network. */
export interface CloudKillSwitchConfig_ProtocolDetails_NetworkDetails {
  killSwitch: boolean;
  actionDetails: {
    [key: string]: CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails;
  };
}

/** ActionDetails contains the kill switch details for an action. */
export interface CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails {
  killSwitch: boolean;
}

export interface CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry {
  key: string;
  value: CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails | undefined;
}

export interface CloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry {
  key: string;
  value: CloudKillSwitchConfig_ProtocolDetails_NetworkDetails | undefined;
}

/** RiskCheckConfig represents a configuration for risk checks */
export interface RiskCheckConfig {
  riskCheck: RiskCheckConfig_RiskCheck;
  exemptionRuleNull?: boolean | undefined;
  kytExemptionRule?: RiskCheckConfig_KytExemptionRule | undefined;
  urmExemptionRule?: RiskCheckConfig_UrmExemptionRule | undefined;
}

/** Represents the risk check type being stored in this config */
export enum RiskCheckConfig_RiskCheck {
  UNKNOWN = 0,
  KYT_RISK_CHECK = 1,
  URM_RISK_CHECK = 2,
  UNRECOGNIZED = -1,
}

export function riskCheckConfig_RiskCheckFromJSON(object: any): RiskCheckConfig_RiskCheck {
  switch (object) {
    case 0:
    case 'UNKNOWN':
      return RiskCheckConfig_RiskCheck.UNKNOWN;
    case 1:
    case 'KYT_RISK_CHECK':
      return RiskCheckConfig_RiskCheck.KYT_RISK_CHECK;
    case 2:
    case 'URM_RISK_CHECK':
      return RiskCheckConfig_RiskCheck.URM_RISK_CHECK;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return RiskCheckConfig_RiskCheck.UNRECOGNIZED;
  }
}

export function riskCheckConfig_RiskCheckToJSON(object: RiskCheckConfig_RiskCheck): string {
  switch (object) {
    case RiskCheckConfig_RiskCheck.UNKNOWN:
      return 'UNKNOWN';
    case RiskCheckConfig_RiskCheck.KYT_RISK_CHECK:
      return 'KYT_RISK_CHECK';
    case RiskCheckConfig_RiskCheck.URM_RISK_CHECK:
      return 'URM_RISK_CHECK';
    case RiskCheckConfig_RiskCheck.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export interface RiskCheckConfig_KytExemptionRule {
  userIds: string[];
  addresses: string[];
  /** optional */
  userAddressPair: RiskCheckConfig_KytExemptionRule_UserAddressPair[];
}

export interface RiskCheckConfig_KytExemptionRule_UserAddressPair {
  userId: string;
  address: string;
}

export interface RiskCheckConfig_UrmExemptionRule {
  userIds: string[];
}

function createBaseStringMap(): StringMap {
  return { stringMap: {} };
}

export const StringMap = {
  encode(message: StringMap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.stringMap).forEach(([key, value]) => {
      StringMap_StringMapEntry.encode(
        { key: key as any, value },
        writer.uint32(50).fork(),
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StringMap {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStringMap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 6:
          if (tag !== 50) {
            break;
          }

          const entry6 = StringMap_StringMapEntry.decode(reader, reader.uint32());
          if (entry6.value !== undefined) {
            message.stringMap[entry6.key] = entry6.value;
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

  fromJSON(object: any): StringMap {
    return {
      stringMap: isObject(object.stringMap)
        ? Object.entries(object.stringMap).reduce<{ [key: string]: string }>(
            (acc, [key, value]) => {
              acc[key] = String(value);
              return acc;
            },
            {},
          )
        : {},
    };
  },

  toJSON(message: StringMap): unknown {
    const obj: any = {};
    if (message.stringMap) {
      const entries = Object.entries(message.stringMap);
      if (entries.length > 0) {
        obj.stringMap = {};
        entries.forEach(([k, v]) => {
          obj.stringMap[k] = v;
        });
      }
    }
    return obj;
  },

  create(base?: DeepPartial<StringMap>): StringMap {
    return StringMap.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<StringMap>): StringMap {
    const message = createBaseStringMap();
    message.stringMap = Object.entries(object.stringMap ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = globalThis.String(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseStringMap_StringMapEntry(): StringMap_StringMapEntry {
  return { key: '', value: '' };
}

export const StringMap_StringMapEntry = {
  encode(message: StringMap_StringMapEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StringMap_StringMapEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStringMap_StringMapEntry();
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

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StringMap_StringMapEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : '',
      value: isSet(object.value) ? globalThis.String(object.value) : '',
    };
  },

  toJSON(message: StringMap_StringMapEntry): unknown {
    const obj: any = {};
    if (message.key !== '') {
      obj.key = message.key;
    }
    if (message.value !== '') {
      obj.value = message.value;
    }
    return obj;
  },

  create(base?: DeepPartial<StringMap_StringMapEntry>): StringMap_StringMapEntry {
    return StringMap_StringMapEntry.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<StringMap_StringMapEntry>): StringMap_StringMapEntry {
    const message = createBaseStringMap_StringMapEntry();
    message.key = object.key ?? '';
    message.value = object.value ?? '';
    return message;
  },
};

function createBaseStringArray(): StringArray {
  return { stringArray: [] };
}

export const StringArray = {
  encode(message: StringArray, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.stringArray) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StringArray {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStringArray();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.stringArray.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StringArray {
    return {
      stringArray: globalThis.Array.isArray(object?.stringArray)
        ? object.stringArray.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: StringArray): unknown {
    const obj: any = {};
    if (message.stringArray?.length) {
      obj.stringArray = message.stringArray;
    }
    return obj;
  },

  create(base?: DeepPartial<StringArray>): StringArray {
    return StringArray.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<StringArray>): StringArray {
    const message = createBaseStringArray();
    message.stringArray = object.stringArray?.map((e) => e) || [];
    return message;
  },
};

function createBaseDuration(): Duration {
  return { duration: undefined, durationS: '', type: 0 };
}

export const Duration = {
  encode(message: Duration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.duration !== undefined) {
      Duration1.encode(message.duration, writer.uint32(10).fork()).ldelim();
    }
    if (message.durationS !== '') {
      writer.uint32(18).string(message.durationS);
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Duration {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDuration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.duration = Duration1.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.durationS = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Duration {
    return {
      duration: isSet(object.duration) ? Duration1.fromJSON(object.duration) : undefined,
      durationS: isSet(object.durationS) ? globalThis.String(object.durationS) : '',
      type: isSet(object.type) ? duration_InputTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: Duration): unknown {
    const obj: any = {};
    if (message.duration !== undefined) {
      obj.duration = Duration1.toJSON(message.duration);
    }
    if (message.durationS !== '') {
      obj.durationS = message.durationS;
    }
    if (message.type !== 0) {
      obj.type = duration_InputTypeToJSON(message.type);
    }
    return obj;
  },

  create(base?: DeepPartial<Duration>): Duration {
    return Duration.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Duration>): Duration {
    const message = createBaseDuration();
    message.duration =
      object.duration !== undefined && object.duration !== null
        ? Duration1.fromPartial(object.duration)
        : undefined;
    message.durationS = object.durationS ?? '';
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseSecretText(): SecretText {
  return {
    encryptedSecretText: new Uint8Array(0),
    encryptionContext: {},
    writeOnly: false,
    dataKey: new Uint8Array(0),
    centralized: false,
  };
}

export const SecretText = {
  encode(message: SecretText, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.encryptedSecretText.length !== 0) {
      writer.uint32(10).bytes(message.encryptedSecretText);
    }
    Object.entries(message.encryptionContext).forEach(([key, value]) => {
      SecretText_EncryptionContextEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork(),
      ).ldelim();
    });
    if (message.writeOnly === true) {
      writer.uint32(24).bool(message.writeOnly);
    }
    if (message.dataKey.length !== 0) {
      writer.uint32(34).bytes(message.dataKey);
    }
    if (message.centralized === true) {
      writer.uint32(40).bool(message.centralized);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SecretText {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSecretText();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.encryptedSecretText = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = SecretText_EncryptionContextEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.encryptionContext[entry2.key] = entry2.value;
          }
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

          message.dataKey = reader.bytes();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.centralized = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SecretText {
    return {
      encryptedSecretText: isSet(object.encryptedSecretText)
        ? bytesFromBase64(object.encryptedSecretText)
        : new Uint8Array(0),
      encryptionContext: isObject(object.encryptionContext)
        ? Object.entries(object.encryptionContext).reduce<{ [key: string]: string }>(
            (acc, [key, value]) => {
              acc[key] = String(value);
              return acc;
            },
            {},
          )
        : {},
      writeOnly: isSet(object.writeOnly) ? globalThis.Boolean(object.writeOnly) : false,
      dataKey: isSet(object.dataKey) ? bytesFromBase64(object.dataKey) : new Uint8Array(0),
      centralized: isSet(object.centralized) ? globalThis.Boolean(object.centralized) : false,
    };
  },

  toJSON(message: SecretText): unknown {
    const obj: any = {};
    if (message.encryptedSecretText.length !== 0) {
      obj.encryptedSecretText = base64FromBytes(message.encryptedSecretText);
    }
    if (message.encryptionContext) {
      const entries = Object.entries(message.encryptionContext);
      if (entries.length > 0) {
        obj.encryptionContext = {};
        entries.forEach(([k, v]) => {
          obj.encryptionContext[k] = v;
        });
      }
    }
    if (message.writeOnly === true) {
      obj.writeOnly = message.writeOnly;
    }
    if (message.dataKey.length !== 0) {
      obj.dataKey = base64FromBytes(message.dataKey);
    }
    if (message.centralized === true) {
      obj.centralized = message.centralized;
    }
    return obj;
  },

  create(base?: DeepPartial<SecretText>): SecretText {
    return SecretText.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SecretText>): SecretText {
    const message = createBaseSecretText();
    message.encryptedSecretText = object.encryptedSecretText ?? new Uint8Array(0);
    message.encryptionContext = Object.entries(object.encryptionContext ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    message.writeOnly = object.writeOnly ?? false;
    message.dataKey = object.dataKey ?? new Uint8Array(0);
    message.centralized = object.centralized ?? false;
    return message;
  },
};

function createBaseSecretText_EncryptionContextEntry(): SecretText_EncryptionContextEntry {
  return { key: '', value: '' };
}

export const SecretText_EncryptionContextEntry = {
  encode(
    message: SecretText_EncryptionContextEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SecretText_EncryptionContextEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSecretText_EncryptionContextEntry();
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

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SecretText_EncryptionContextEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : '',
      value: isSet(object.value) ? globalThis.String(object.value) : '',
    };
  },

  toJSON(message: SecretText_EncryptionContextEntry): unknown {
    const obj: any = {};
    if (message.key !== '') {
      obj.key = message.key;
    }
    if (message.value !== '') {
      obj.value = message.value;
    }
    return obj;
  },

  create(base?: DeepPartial<SecretText_EncryptionContextEntry>): SecretText_EncryptionContextEntry {
    return SecretText_EncryptionContextEntry.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<SecretText_EncryptionContextEntry>,
  ): SecretText_EncryptionContextEntry {
    const message = createBaseSecretText_EncryptionContextEntry();
    message.key = object.key ?? '';
    message.value = object.value ?? '';
    return message;
  },
};

function createBaseEouProductConfig(): EouProductConfig {
  return { productConfig: [] };
}

export const EouProductConfig = {
  encode(message: EouProductConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.productConfig) {
      EouProductConfig_ProductConfig.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EouProductConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEouProductConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.productConfig.push(
            EouProductConfig_ProductConfig.decode(reader, reader.uint32()),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EouProductConfig {
    return {
      productConfig: globalThis.Array.isArray(object?.productConfig)
        ? object.productConfig.map((e: any) => EouProductConfig_ProductConfig.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EouProductConfig): unknown {
    const obj: any = {};
    if (message.productConfig?.length) {
      obj.productConfig = message.productConfig.map((e) =>
        EouProductConfig_ProductConfig.toJSON(e),
      );
    }
    return obj;
  },

  create(base?: DeepPartial<EouProductConfig>): EouProductConfig {
    return EouProductConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<EouProductConfig>): EouProductConfig {
    const message = createBaseEouProductConfig();
    message.productConfig =
      object.productConfig?.map((e) => EouProductConfig_ProductConfig.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEouProductConfig_WelcomeWorkflow(): EouProductConfig_WelcomeWorkflow {
  return { enabled: false, template: '' };
}

export const EouProductConfig_WelcomeWorkflow = {
  encode(
    message: EouProductConfig_WelcomeWorkflow,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.enabled === true) {
      writer.uint32(8).bool(message.enabled);
    }
    if (message.template !== '') {
      writer.uint32(18).string(message.template);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EouProductConfig_WelcomeWorkflow {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEouProductConfig_WelcomeWorkflow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.enabled = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.template = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EouProductConfig_WelcomeWorkflow {
    return {
      enabled: isSet(object.enabled) ? globalThis.Boolean(object.enabled) : false,
      template: isSet(object.template) ? globalThis.String(object.template) : '',
    };
  },

  toJSON(message: EouProductConfig_WelcomeWorkflow): unknown {
    const obj: any = {};
    if (message.enabled === true) {
      obj.enabled = message.enabled;
    }
    if (message.template !== '') {
      obj.template = message.template;
    }
    return obj;
  },

  create(base?: DeepPartial<EouProductConfig_WelcomeWorkflow>): EouProductConfig_WelcomeWorkflow {
    return EouProductConfig_WelcomeWorkflow.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<EouProductConfig_WelcomeWorkflow>,
  ): EouProductConfig_WelcomeWorkflow {
    const message = createBaseEouProductConfig_WelcomeWorkflow();
    message.enabled = object.enabled ?? false;
    message.template = object.template ?? '';
    return message;
  },
};

function createBaseEouProductConfig_VerificationWorkflow(): EouProductConfig_VerificationWorkflow {
  return { enabled: false, allowedCountryCodes: [] };
}

export const EouProductConfig_VerificationWorkflow = {
  encode(
    message: EouProductConfig_VerificationWorkflow,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.enabled === true) {
      writer.uint32(8).bool(message.enabled);
    }
    for (const v of message.allowedCountryCodes) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EouProductConfig_VerificationWorkflow {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEouProductConfig_VerificationWorkflow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.enabled = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.allowedCountryCodes.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EouProductConfig_VerificationWorkflow {
    return {
      enabled: isSet(object.enabled) ? globalThis.Boolean(object.enabled) : false,
      allowedCountryCodes: globalThis.Array.isArray(object?.allowedCountryCodes)
        ? object.allowedCountryCodes.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: EouProductConfig_VerificationWorkflow): unknown {
    const obj: any = {};
    if (message.enabled === true) {
      obj.enabled = message.enabled;
    }
    if (message.allowedCountryCodes?.length) {
      obj.allowedCountryCodes = message.allowedCountryCodes;
    }
    return obj;
  },

  create(
    base?: DeepPartial<EouProductConfig_VerificationWorkflow>,
  ): EouProductConfig_VerificationWorkflow {
    return EouProductConfig_VerificationWorkflow.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<EouProductConfig_VerificationWorkflow>,
  ): EouProductConfig_VerificationWorkflow {
    const message = createBaseEouProductConfig_VerificationWorkflow();
    message.enabled = object.enabled ?? false;
    message.allowedCountryCodes = object.allowedCountryCodes?.map((e) => e) || [];
    return message;
  },
};

function createBaseEouProductConfig_ProductConfig(): EouProductConfig_ProductConfig {
  return {
    productId: '',
    enabled: false,
    welcomeWorkflow: undefined,
    dataUseType: '',
    verificationWorkflow: undefined,
  };
}

export const EouProductConfig_ProductConfig = {
  encode(
    message: EouProductConfig_ProductConfig,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.productId !== '') {
      writer.uint32(10).string(message.productId);
    }
    if (message.enabled === true) {
      writer.uint32(16).bool(message.enabled);
    }
    if (message.welcomeWorkflow !== undefined) {
      EouProductConfig_WelcomeWorkflow.encode(
        message.welcomeWorkflow,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.dataUseType !== '') {
      writer.uint32(34).string(message.dataUseType);
    }
    if (message.verificationWorkflow !== undefined) {
      EouProductConfig_VerificationWorkflow.encode(
        message.verificationWorkflow,
        writer.uint32(42).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EouProductConfig_ProductConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEouProductConfig_ProductConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.productId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.enabled = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.welcomeWorkflow = EouProductConfig_WelcomeWorkflow.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.dataUseType = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.verificationWorkflow = EouProductConfig_VerificationWorkflow.decode(
            reader,
            reader.uint32(),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EouProductConfig_ProductConfig {
    return {
      productId: isSet(object.productId) ? globalThis.String(object.productId) : '',
      enabled: isSet(object.enabled) ? globalThis.Boolean(object.enabled) : false,
      welcomeWorkflow: isSet(object.welcomeWorkflow)
        ? EouProductConfig_WelcomeWorkflow.fromJSON(object.welcomeWorkflow)
        : undefined,
      dataUseType: isSet(object.dataUseType) ? globalThis.String(object.dataUseType) : '',
      verificationWorkflow: isSet(object.verificationWorkflow)
        ? EouProductConfig_VerificationWorkflow.fromJSON(object.verificationWorkflow)
        : undefined,
    };
  },

  toJSON(message: EouProductConfig_ProductConfig): unknown {
    const obj: any = {};
    if (message.productId !== '') {
      obj.productId = message.productId;
    }
    if (message.enabled === true) {
      obj.enabled = message.enabled;
    }
    if (message.welcomeWorkflow !== undefined) {
      obj.welcomeWorkflow = EouProductConfig_WelcomeWorkflow.toJSON(message.welcomeWorkflow);
    }
    if (message.dataUseType !== '') {
      obj.dataUseType = message.dataUseType;
    }
    if (message.verificationWorkflow !== undefined) {
      obj.verificationWorkflow = EouProductConfig_VerificationWorkflow.toJSON(
        message.verificationWorkflow,
      );
    }
    return obj;
  },

  create(base?: DeepPartial<EouProductConfig_ProductConfig>): EouProductConfig_ProductConfig {
    return EouProductConfig_ProductConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<EouProductConfig_ProductConfig>): EouProductConfig_ProductConfig {
    const message = createBaseEouProductConfig_ProductConfig();
    message.productId = object.productId ?? '';
    message.enabled = object.enabled ?? false;
    message.welcomeWorkflow =
      object.welcomeWorkflow !== undefined && object.welcomeWorkflow !== null
        ? EouProductConfig_WelcomeWorkflow.fromPartial(object.welcomeWorkflow)
        : undefined;
    message.dataUseType = object.dataUseType ?? '';
    message.verificationWorkflow =
      object.verificationWorkflow !== undefined && object.verificationWorkflow !== null
        ? EouProductConfig_VerificationWorkflow.fromPartial(object.verificationWorkflow)
        : undefined;
    return message;
  },
};

function createBaseErc20Asset(): Erc20Asset {
  return {
    ticker: '',
    name: '',
    contractAddress: '',
    startBlock: 0,
    significantDigits: 0,
    poolName: '',
    poolUuid: '',
    productAssetUuid: '',
    legacyCurrencyIcon: '',
    minTransactionAmount: '',
    maxTransactionAmount: '',
    minDustAmount: '',
    unprocessedSendThresholds: undefined,
    hedgerThresholds: undefined,
    minReplenishFees: '',
    minReplenishInternal: '',
    ratesServiceTicker: '',
  };
}

export const Erc20Asset = {
  encode(message: Erc20Asset, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ticker !== '') {
      writer.uint32(10).string(message.ticker);
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name);
    }
    if (message.contractAddress !== '') {
      writer.uint32(26).string(message.contractAddress);
    }
    if (message.startBlock !== 0) {
      writer.uint32(32).uint64(message.startBlock);
    }
    if (message.significantDigits !== 0) {
      writer.uint32(40).uint32(message.significantDigits);
    }
    if (message.poolName !== '') {
      writer.uint32(50).string(message.poolName);
    }
    if (message.poolUuid !== '') {
      writer.uint32(58).string(message.poolUuid);
    }
    if (message.productAssetUuid !== '') {
      writer.uint32(66).string(message.productAssetUuid);
    }
    if (message.legacyCurrencyIcon !== '') {
      writer.uint32(74).string(message.legacyCurrencyIcon);
    }
    if (message.minTransactionAmount !== '') {
      writer.uint32(82).string(message.minTransactionAmount);
    }
    if (message.maxTransactionAmount !== '') {
      writer.uint32(90).string(message.maxTransactionAmount);
    }
    if (message.minDustAmount !== '') {
      writer.uint32(98).string(message.minDustAmount);
    }
    if (message.unprocessedSendThresholds !== undefined) {
      StringMap.encode(message.unprocessedSendThresholds, writer.uint32(106).fork()).ldelim();
    }
    if (message.hedgerThresholds !== undefined) {
      StringMap.encode(message.hedgerThresholds, writer.uint32(114).fork()).ldelim();
    }
    if (message.minReplenishFees !== '') {
      writer.uint32(122).string(message.minReplenishFees);
    }
    if (message.minReplenishInternal !== '') {
      writer.uint32(130).string(message.minReplenishInternal);
    }
    if (message.ratesServiceTicker !== '') {
      writer.uint32(138).string(message.ratesServiceTicker);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Erc20Asset {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseErc20Asset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ticker = reader.string();
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

          message.contractAddress = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.startBlock = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.significantDigits = reader.uint32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.poolName = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.poolUuid = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.productAssetUuid = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.legacyCurrencyIcon = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.minTransactionAmount = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.maxTransactionAmount = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.minDustAmount = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.unprocessedSendThresholds = StringMap.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.hedgerThresholds = StringMap.decode(reader, reader.uint32());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.minReplenishFees = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.minReplenishInternal = reader.string();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.ratesServiceTicker = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Erc20Asset {
    return {
      ticker: isSet(object.ticker) ? globalThis.String(object.ticker) : '',
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      contractAddress: isSet(object.contractAddress)
        ? globalThis.String(object.contractAddress)
        : '',
      startBlock: isSet(object.startBlock) ? globalThis.Number(object.startBlock) : 0,
      significantDigits: isSet(object.significantDigits)
        ? globalThis.Number(object.significantDigits)
        : 0,
      poolName: isSet(object.poolName) ? globalThis.String(object.poolName) : '',
      poolUuid: isSet(object.poolUuid) ? globalThis.String(object.poolUuid) : '',
      productAssetUuid: isSet(object.productAssetUuid)
        ? globalThis.String(object.productAssetUuid)
        : '',
      legacyCurrencyIcon: isSet(object.legacyCurrencyIcon)
        ? globalThis.String(object.legacyCurrencyIcon)
        : '',
      minTransactionAmount: isSet(object.minTransactionAmount)
        ? globalThis.String(object.minTransactionAmount)
        : '',
      maxTransactionAmount: isSet(object.maxTransactionAmount)
        ? globalThis.String(object.maxTransactionAmount)
        : '',
      minDustAmount: isSet(object.minDustAmount) ? globalThis.String(object.minDustAmount) : '',
      unprocessedSendThresholds: isSet(object.unprocessedSendThresholds)
        ? StringMap.fromJSON(object.unprocessedSendThresholds)
        : undefined,
      hedgerThresholds: isSet(object.hedgerThresholds)
        ? StringMap.fromJSON(object.hedgerThresholds)
        : undefined,
      minReplenishFees: isSet(object.minReplenishFees)
        ? globalThis.String(object.minReplenishFees)
        : '',
      minReplenishInternal: isSet(object.minReplenishInternal)
        ? globalThis.String(object.minReplenishInternal)
        : '',
      ratesServiceTicker: isSet(object.ratesServiceTicker)
        ? globalThis.String(object.ratesServiceTicker)
        : '',
    };
  },

  toJSON(message: Erc20Asset): unknown {
    const obj: any = {};
    if (message.ticker !== '') {
      obj.ticker = message.ticker;
    }
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.contractAddress !== '') {
      obj.contractAddress = message.contractAddress;
    }
    if (message.startBlock !== 0) {
      obj.startBlock = Math.round(message.startBlock);
    }
    if (message.significantDigits !== 0) {
      obj.significantDigits = Math.round(message.significantDigits);
    }
    if (message.poolName !== '') {
      obj.poolName = message.poolName;
    }
    if (message.poolUuid !== '') {
      obj.poolUuid = message.poolUuid;
    }
    if (message.productAssetUuid !== '') {
      obj.productAssetUuid = message.productAssetUuid;
    }
    if (message.legacyCurrencyIcon !== '') {
      obj.legacyCurrencyIcon = message.legacyCurrencyIcon;
    }
    if (message.minTransactionAmount !== '') {
      obj.minTransactionAmount = message.minTransactionAmount;
    }
    if (message.maxTransactionAmount !== '') {
      obj.maxTransactionAmount = message.maxTransactionAmount;
    }
    if (message.minDustAmount !== '') {
      obj.minDustAmount = message.minDustAmount;
    }
    if (message.unprocessedSendThresholds !== undefined) {
      obj.unprocessedSendThresholds = StringMap.toJSON(message.unprocessedSendThresholds);
    }
    if (message.hedgerThresholds !== undefined) {
      obj.hedgerThresholds = StringMap.toJSON(message.hedgerThresholds);
    }
    if (message.minReplenishFees !== '') {
      obj.minReplenishFees = message.minReplenishFees;
    }
    if (message.minReplenishInternal !== '') {
      obj.minReplenishInternal = message.minReplenishInternal;
    }
    if (message.ratesServiceTicker !== '') {
      obj.ratesServiceTicker = message.ratesServiceTicker;
    }
    return obj;
  },

  create(base?: DeepPartial<Erc20Asset>): Erc20Asset {
    return Erc20Asset.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Erc20Asset>): Erc20Asset {
    const message = createBaseErc20Asset();
    message.ticker = object.ticker ?? '';
    message.name = object.name ?? '';
    message.contractAddress = object.contractAddress ?? '';
    message.startBlock = object.startBlock ?? 0;
    message.significantDigits = object.significantDigits ?? 0;
    message.poolName = object.poolName ?? '';
    message.poolUuid = object.poolUuid ?? '';
    message.productAssetUuid = object.productAssetUuid ?? '';
    message.legacyCurrencyIcon = object.legacyCurrencyIcon ?? '';
    message.minTransactionAmount = object.minTransactionAmount ?? '';
    message.maxTransactionAmount = object.maxTransactionAmount ?? '';
    message.minDustAmount = object.minDustAmount ?? '';
    message.unprocessedSendThresholds =
      object.unprocessedSendThresholds !== undefined && object.unprocessedSendThresholds !== null
        ? StringMap.fromPartial(object.unprocessedSendThresholds)
        : undefined;
    message.hedgerThresholds =
      object.hedgerThresholds !== undefined && object.hedgerThresholds !== null
        ? StringMap.fromPartial(object.hedgerThresholds)
        : undefined;
    message.minReplenishFees = object.minReplenishFees ?? '';
    message.minReplenishInternal = object.minReplenishInternal ?? '';
    message.ratesServiceTicker = object.ratesServiceTicker ?? '';
    return message;
  },
};

function createBaseFeatureFlag(): FeatureFlag {
  return {
    percent: 0,
    entityIds: [],
    countryCodes: [],
    groups: [],
    apiVisible: false,
    admins: false,
    beta: false,
    employees: false,
    details: undefined,
    disabled: false,
    clients: [],
    minClientsVersion: [],
  };
}

export const FeatureFlag = {
  encode(message: FeatureFlag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.percent !== 0) {
      writer.uint32(8).int32(message.percent);
    }
    for (const v of message.entityIds) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.countryCodes) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.groups) {
      writer.uint32(34).string(v!);
    }
    if (message.apiVisible === true) {
      writer.uint32(40).bool(message.apiVisible);
    }
    if (message.admins === true) {
      writer.uint32(48).bool(message.admins);
    }
    if (message.beta === true) {
      writer.uint32(56).bool(message.beta);
    }
    if (message.employees === true) {
      writer.uint32(64).bool(message.employees);
    }
    if (message.details !== undefined) {
      StringMap.encode(message.details, writer.uint32(74).fork()).ldelim();
    }
    if (message.disabled === true) {
      writer.uint32(80).bool(message.disabled);
    }
    for (const v of message.clients) {
      writer.uint32(90).string(v!);
    }
    for (const v of message.minClientsVersion) {
      writer.uint32(98).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FeatureFlag {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeatureFlag();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.percent = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.entityIds.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.countryCodes.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.groups.push(reader.string());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.apiVisible = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.admins = reader.bool();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.beta = reader.bool();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.employees = reader.bool();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.details = StringMap.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.disabled = reader.bool();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.clients.push(reader.string());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.minClientsVersion.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FeatureFlag {
    return {
      percent: isSet(object.percent) ? globalThis.Number(object.percent) : 0,
      entityIds: globalThis.Array.isArray(object?.entityIds)
        ? object.entityIds.map((e: any) => globalThis.String(e))
        : [],
      countryCodes: globalThis.Array.isArray(object?.countryCodes)
        ? object.countryCodes.map((e: any) => globalThis.String(e))
        : [],
      groups: globalThis.Array.isArray(object?.groups)
        ? object.groups.map((e: any) => globalThis.String(e))
        : [],
      apiVisible: isSet(object.apiVisible) ? globalThis.Boolean(object.apiVisible) : false,
      admins: isSet(object.admins) ? globalThis.Boolean(object.admins) : false,
      beta: isSet(object.beta) ? globalThis.Boolean(object.beta) : false,
      employees: isSet(object.employees) ? globalThis.Boolean(object.employees) : false,
      details: isSet(object.details) ? StringMap.fromJSON(object.details) : undefined,
      disabled: isSet(object.disabled) ? globalThis.Boolean(object.disabled) : false,
      clients: globalThis.Array.isArray(object?.clients)
        ? object.clients.map((e: any) => globalThis.String(e))
        : [],
      minClientsVersion: globalThis.Array.isArray(object?.minClientsVersion)
        ? object.minClientsVersion.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: FeatureFlag): unknown {
    const obj: any = {};
    if (message.percent !== 0) {
      obj.percent = Math.round(message.percent);
    }
    if (message.entityIds?.length) {
      obj.entityIds = message.entityIds;
    }
    if (message.countryCodes?.length) {
      obj.countryCodes = message.countryCodes;
    }
    if (message.groups?.length) {
      obj.groups = message.groups;
    }
    if (message.apiVisible === true) {
      obj.apiVisible = message.apiVisible;
    }
    if (message.admins === true) {
      obj.admins = message.admins;
    }
    if (message.beta === true) {
      obj.beta = message.beta;
    }
    if (message.employees === true) {
      obj.employees = message.employees;
    }
    if (message.details !== undefined) {
      obj.details = StringMap.toJSON(message.details);
    }
    if (message.disabled === true) {
      obj.disabled = message.disabled;
    }
    if (message.clients?.length) {
      obj.clients = message.clients;
    }
    if (message.minClientsVersion?.length) {
      obj.minClientsVersion = message.minClientsVersion;
    }
    return obj;
  },

  create(base?: DeepPartial<FeatureFlag>): FeatureFlag {
    return FeatureFlag.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<FeatureFlag>): FeatureFlag {
    const message = createBaseFeatureFlag();
    message.percent = object.percent ?? 0;
    message.entityIds = object.entityIds?.map((e) => e) || [];
    message.countryCodes = object.countryCodes?.map((e) => e) || [];
    message.groups = object.groups?.map((e) => e) || [];
    message.apiVisible = object.apiVisible ?? false;
    message.admins = object.admins ?? false;
    message.beta = object.beta ?? false;
    message.employees = object.employees ?? false;
    message.details =
      object.details !== undefined && object.details !== null
        ? StringMap.fromPartial(object.details)
        : undefined;
    message.disabled = object.disabled ?? false;
    message.clients = object.clients?.map((e) => e) || [];
    message.minClientsVersion = object.minClientsVersion?.map((e) => e) || [];
    return message;
  },
};

function createBaseNodeCluster(): NodeCluster {
  return { attributes: undefined, nodes: [] };
}

export const NodeCluster = {
  encode(message: NodeCluster, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.attributes !== undefined) {
      StringMap.encode(message.attributes, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.nodes) {
      Node.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeCluster {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeCluster();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.attributes = StringMap.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nodes.push(Node.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NodeCluster {
    return {
      attributes: isSet(object.attributes) ? StringMap.fromJSON(object.attributes) : undefined,
      nodes: globalThis.Array.isArray(object?.nodes)
        ? object.nodes.map((e: any) => Node.fromJSON(e))
        : [],
    };
  },

  toJSON(message: NodeCluster): unknown {
    const obj: any = {};
    if (message.attributes !== undefined) {
      obj.attributes = StringMap.toJSON(message.attributes);
    }
    if (message.nodes?.length) {
      obj.nodes = message.nodes.map((e) => Node.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<NodeCluster>): NodeCluster {
    return NodeCluster.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NodeCluster>): NodeCluster {
    const message = createBaseNodeCluster();
    message.attributes =
      object.attributes !== undefined && object.attributes !== null
        ? StringMap.fromPartial(object.attributes)
        : undefined;
    message.nodes = object.nodes?.map((e) => Node.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNode(): Node {
  return { ipAddress: '', port: 0, enabled: false, attributes: undefined };
}

export const Node = {
  encode(message: Node, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ipAddress !== '') {
      writer.uint32(10).string(message.ipAddress);
    }
    if (message.port !== 0) {
      writer.uint32(16).uint32(message.port);
    }
    if (message.enabled === true) {
      writer.uint32(24).bool(message.enabled);
    }
    if (message.attributes !== undefined) {
      StringMap.encode(message.attributes, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Node {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ipAddress = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.port = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.enabled = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.attributes = StringMap.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Node {
    return {
      ipAddress: isSet(object.ipAddress) ? globalThis.String(object.ipAddress) : '',
      port: isSet(object.port) ? globalThis.Number(object.port) : 0,
      enabled: isSet(object.enabled) ? globalThis.Boolean(object.enabled) : false,
      attributes: isSet(object.attributes) ? StringMap.fromJSON(object.attributes) : undefined,
    };
  },

  toJSON(message: Node): unknown {
    const obj: any = {};
    if (message.ipAddress !== '') {
      obj.ipAddress = message.ipAddress;
    }
    if (message.port !== 0) {
      obj.port = Math.round(message.port);
    }
    if (message.enabled === true) {
      obj.enabled = message.enabled;
    }
    if (message.attributes !== undefined) {
      obj.attributes = StringMap.toJSON(message.attributes);
    }
    return obj;
  },

  create(base?: DeepPartial<Node>): Node {
    return Node.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Node>): Node {
    const message = createBaseNode();
    message.ipAddress = object.ipAddress ?? '';
    message.port = object.port ?? 0;
    message.enabled = object.enabled ?? false;
    message.attributes =
      object.attributes !== undefined && object.attributes !== null
        ? StringMap.fromPartial(object.attributes)
        : undefined;
    return message;
  },
};

function createBaseSplitTest(): SplitTest {
  return {
    subjectType: 0,
    owner: '',
    team: '',
    description: '',
    pseudoTest: false,
    apiVisible: false,
    deprecatedPlatforms: [],
    platforms: [],
    slackChannel: '',
    groups: [],
    active: false,
    rolloutPercent: 0,
    salt: '',
    ownerUuids: [],
    targetMetrics: [],
    metrics: [],
    metricSets: [],
    slackHandles: [],
    resolvedByUserUuid: '',
    resolvedByEmail: '',
    resolvedAt: undefined,
  };
}

export const SplitTest = {
  encode(message: SplitTest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.subjectType !== 0) {
      writer.uint32(104).int32(message.subjectType);
    }
    if (message.owner !== '') {
      writer.uint32(10).string(message.owner);
    }
    if (message.team !== '') {
      writer.uint32(18).string(message.team);
    }
    if (message.description !== '') {
      writer.uint32(26).string(message.description);
    }
    if (message.pseudoTest === true) {
      writer.uint32(32).bool(message.pseudoTest);
    }
    if (message.apiVisible === true) {
      writer.uint32(40).bool(message.apiVisible);
    }
    writer.uint32(50).fork();
    for (const v of message.deprecatedPlatforms) {
      writer.int32(v);
    }
    writer.ldelim();
    for (const v of message.platforms) {
      SplitTest_Platform.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    if (message.slackChannel !== '') {
      writer.uint32(58).string(message.slackChannel);
    }
    for (const v of message.groups) {
      SplitTest_Group.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.active === true) {
      writer.uint32(80).bool(message.active);
    }
    if (message.rolloutPercent !== 0) {
      writer.uint32(88).uint32(message.rolloutPercent);
    }
    if (message.salt !== '') {
      writer.uint32(114).string(message.salt);
    }
    for (const v of message.ownerUuids) {
      writer.uint32(122).string(v!);
    }
    for (const v of message.targetMetrics) {
      writer.uint32(130).string(v!);
    }
    for (const v of message.metrics) {
      writer.uint32(138).string(v!);
    }
    for (const v of message.metricSets) {
      writer.uint32(146).string(v!);
    }
    for (const v of message.slackHandles) {
      writer.uint32(154).string(v!);
    }
    if (message.resolvedByUserUuid !== '') {
      writer.uint32(162).string(message.resolvedByUserUuid);
    }
    if (message.resolvedByEmail !== '') {
      writer.uint32(170).string(message.resolvedByEmail);
    }
    if (message.resolvedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.resolvedAt), writer.uint32(178).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SplitTest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSplitTest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 13:
          if (tag !== 104) {
            break;
          }

          message.subjectType = reader.int32() as any;
          continue;
        case 1:
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.team = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.pseudoTest = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.apiVisible = reader.bool();
          continue;
        case 6:
          if (tag === 48) {
            message.deprecatedPlatforms.push(reader.int32() as any);

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.deprecatedPlatforms.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.platforms.push(SplitTest_Platform.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.slackChannel = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.groups.push(SplitTest_Group.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.active = reader.bool();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.rolloutPercent = reader.uint32();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.salt = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.ownerUuids.push(reader.string());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.targetMetrics.push(reader.string());
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.metrics.push(reader.string());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.metricSets.push(reader.string());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.slackHandles.push(reader.string());
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.resolvedByUserUuid = reader.string();
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.resolvedByEmail = reader.string();
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.resolvedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SplitTest {
    return {
      subjectType: isSet(object.subjectType)
        ? splitTest_SubjectTypeFromJSON(object.subjectType)
        : 0,
      owner: isSet(object.owner) ? globalThis.String(object.owner) : '',
      team: isSet(object.team) ? globalThis.String(object.team) : '',
      description: isSet(object.description) ? globalThis.String(object.description) : '',
      pseudoTest: isSet(object.pseudoTest) ? globalThis.Boolean(object.pseudoTest) : false,
      apiVisible: isSet(object.apiVisible) ? globalThis.Boolean(object.apiVisible) : false,
      deprecatedPlatforms: globalThis.Array.isArray(object?.deprecatedPlatforms)
        ? object.deprecatedPlatforms.map((e: any) => splitTest_DeprecatedPlatformFromJSON(e))
        : [],
      platforms: globalThis.Array.isArray(object?.platforms)
        ? object.platforms.map((e: any) => SplitTest_Platform.fromJSON(e))
        : [],
      slackChannel: isSet(object.slackChannel) ? globalThis.String(object.slackChannel) : '',
      groups: globalThis.Array.isArray(object?.groups)
        ? object.groups.map((e: any) => SplitTest_Group.fromJSON(e))
        : [],
      active: isSet(object.active) ? globalThis.Boolean(object.active) : false,
      rolloutPercent: isSet(object.rolloutPercent) ? globalThis.Number(object.rolloutPercent) : 0,
      salt: isSet(object.salt) ? globalThis.String(object.salt) : '',
      ownerUuids: globalThis.Array.isArray(object?.ownerUuids)
        ? object.ownerUuids.map((e: any) => globalThis.String(e))
        : [],
      targetMetrics: globalThis.Array.isArray(object?.targetMetrics)
        ? object.targetMetrics.map((e: any) => globalThis.String(e))
        : [],
      metrics: globalThis.Array.isArray(object?.metrics)
        ? object.metrics.map((e: any) => globalThis.String(e))
        : [],
      metricSets: globalThis.Array.isArray(object?.metricSets)
        ? object.metricSets.map((e: any) => globalThis.String(e))
        : [],
      slackHandles: globalThis.Array.isArray(object?.slackHandles)
        ? object.slackHandles.map((e: any) => globalThis.String(e))
        : [],
      resolvedByUserUuid: isSet(object.resolvedByUserUuid)
        ? globalThis.String(object.resolvedByUserUuid)
        : '',
      resolvedByEmail: isSet(object.resolvedByEmail)
        ? globalThis.String(object.resolvedByEmail)
        : '',
      resolvedAt: isSet(object.resolvedAt) ? fromJsonTimestamp(object.resolvedAt) : undefined,
    };
  },

  toJSON(message: SplitTest): unknown {
    const obj: any = {};
    if (message.subjectType !== 0) {
      obj.subjectType = splitTest_SubjectTypeToJSON(message.subjectType);
    }
    if (message.owner !== '') {
      obj.owner = message.owner;
    }
    if (message.team !== '') {
      obj.team = message.team;
    }
    if (message.description !== '') {
      obj.description = message.description;
    }
    if (message.pseudoTest === true) {
      obj.pseudoTest = message.pseudoTest;
    }
    if (message.apiVisible === true) {
      obj.apiVisible = message.apiVisible;
    }
    if (message.deprecatedPlatforms?.length) {
      obj.deprecatedPlatforms = message.deprecatedPlatforms.map((e) =>
        splitTest_DeprecatedPlatformToJSON(e),
      );
    }
    if (message.platforms?.length) {
      obj.platforms = message.platforms.map((e) => SplitTest_Platform.toJSON(e));
    }
    if (message.slackChannel !== '') {
      obj.slackChannel = message.slackChannel;
    }
    if (message.groups?.length) {
      obj.groups = message.groups.map((e) => SplitTest_Group.toJSON(e));
    }
    if (message.active === true) {
      obj.active = message.active;
    }
    if (message.rolloutPercent !== 0) {
      obj.rolloutPercent = Math.round(message.rolloutPercent);
    }
    if (message.salt !== '') {
      obj.salt = message.salt;
    }
    if (message.ownerUuids?.length) {
      obj.ownerUuids = message.ownerUuids;
    }
    if (message.targetMetrics?.length) {
      obj.targetMetrics = message.targetMetrics;
    }
    if (message.metrics?.length) {
      obj.metrics = message.metrics;
    }
    if (message.metricSets?.length) {
      obj.metricSets = message.metricSets;
    }
    if (message.slackHandles?.length) {
      obj.slackHandles = message.slackHandles;
    }
    if (message.resolvedByUserUuid !== '') {
      obj.resolvedByUserUuid = message.resolvedByUserUuid;
    }
    if (message.resolvedByEmail !== '') {
      obj.resolvedByEmail = message.resolvedByEmail;
    }
    if (message.resolvedAt !== undefined) {
      obj.resolvedAt = message.resolvedAt.toISOString();
    }
    return obj;
  },

  create(base?: DeepPartial<SplitTest>): SplitTest {
    return SplitTest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SplitTest>): SplitTest {
    const message = createBaseSplitTest();
    message.subjectType = object.subjectType ?? 0;
    message.owner = object.owner ?? '';
    message.team = object.team ?? '';
    message.description = object.description ?? '';
    message.pseudoTest = object.pseudoTest ?? false;
    message.apiVisible = object.apiVisible ?? false;
    message.deprecatedPlatforms = object.deprecatedPlatforms?.map((e) => e) || [];
    message.platforms = object.platforms?.map((e) => SplitTest_Platform.fromPartial(e)) || [];
    message.slackChannel = object.slackChannel ?? '';
    message.groups = object.groups?.map((e) => SplitTest_Group.fromPartial(e)) || [];
    message.active = object.active ?? false;
    message.rolloutPercent = object.rolloutPercent ?? 0;
    message.salt = object.salt ?? '';
    message.ownerUuids = object.ownerUuids?.map((e) => e) || [];
    message.targetMetrics = object.targetMetrics?.map((e) => e) || [];
    message.metrics = object.metrics?.map((e) => e) || [];
    message.metricSets = object.metricSets?.map((e) => e) || [];
    message.slackHandles = object.slackHandles?.map((e) => e) || [];
    message.resolvedByUserUuid = object.resolvedByUserUuid ?? '';
    message.resolvedByEmail = object.resolvedByEmail ?? '';
    message.resolvedAt = object.resolvedAt ?? undefined;
    return message;
  },
};

function createBaseSplitTest_Platform(): SplitTest_Platform {
  return { type: 0, minimumVersion: '', maximumVersion: '' };
}

export const SplitTest_Platform = {
  encode(message: SplitTest_Platform, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.minimumVersion !== '') {
      writer.uint32(18).string(message.minimumVersion);
    }
    if (message.maximumVersion !== '') {
      writer.uint32(26).string(message.maximumVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SplitTest_Platform {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSplitTest_Platform();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.minimumVersion = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.maximumVersion = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SplitTest_Platform {
    return {
      type: isSet(object.type) ? splitTest_Platform_PlatformTypeFromJSON(object.type) : 0,
      minimumVersion: isSet(object.minimumVersion) ? globalThis.String(object.minimumVersion) : '',
      maximumVersion: isSet(object.maximumVersion) ? globalThis.String(object.maximumVersion) : '',
    };
  },

  toJSON(message: SplitTest_Platform): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = splitTest_Platform_PlatformTypeToJSON(message.type);
    }
    if (message.minimumVersion !== '') {
      obj.minimumVersion = message.minimumVersion;
    }
    if (message.maximumVersion !== '') {
      obj.maximumVersion = message.maximumVersion;
    }
    return obj;
  },

  create(base?: DeepPartial<SplitTest_Platform>): SplitTest_Platform {
    return SplitTest_Platform.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SplitTest_Platform>): SplitTest_Platform {
    const message = createBaseSplitTest_Platform();
    message.type = object.type ?? 0;
    message.minimumVersion = object.minimumVersion ?? '';
    message.maximumVersion = object.maximumVersion ?? '';
    return message;
  },
};

function createBaseSplitTest_Group(): SplitTest_Group {
  return { name: '', weight: 0, overrideSubjectIds: [], isFinal: false, overrideRoles: [] };
}

export const SplitTest_Group = {
  encode(message: SplitTest_Group, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.weight !== 0) {
      writer.uint32(16).uint32(message.weight);
    }
    for (const v of message.overrideSubjectIds) {
      writer.uint32(26).string(v!);
    }
    if (message.isFinal === true) {
      writer.uint32(32).bool(message.isFinal);
    }
    writer.uint32(42).fork();
    for (const v of message.overrideRoles) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SplitTest_Group {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSplitTest_Group();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.weight = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.overrideSubjectIds.push(reader.string());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.isFinal = reader.bool();
          continue;
        case 5:
          if (tag === 40) {
            message.overrideRoles.push(reader.int32() as any);

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.overrideRoles.push(reader.int32() as any);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SplitTest_Group {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      weight: isSet(object.weight) ? globalThis.Number(object.weight) : 0,
      overrideSubjectIds: globalThis.Array.isArray(object?.overrideSubjectIds)
        ? object.overrideSubjectIds.map((e: any) => globalThis.String(e))
        : [],
      isFinal: isSet(object.isFinal) ? globalThis.Boolean(object.isFinal) : false,
      overrideRoles: globalThis.Array.isArray(object?.overrideRoles)
        ? object.overrideRoles.map((e: any) => splitTest_Group_RoleFromJSON(e))
        : [],
    };
  },

  toJSON(message: SplitTest_Group): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.weight !== 0) {
      obj.weight = Math.round(message.weight);
    }
    if (message.overrideSubjectIds?.length) {
      obj.overrideSubjectIds = message.overrideSubjectIds;
    }
    if (message.isFinal === true) {
      obj.isFinal = message.isFinal;
    }
    if (message.overrideRoles?.length) {
      obj.overrideRoles = message.overrideRoles.map((e) => splitTest_Group_RoleToJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<SplitTest_Group>): SplitTest_Group {
    return SplitTest_Group.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SplitTest_Group>): SplitTest_Group {
    const message = createBaseSplitTest_Group();
    message.name = object.name ?? '';
    message.weight = object.weight ?? 0;
    message.overrideSubjectIds = object.overrideSubjectIds?.map((e) => e) || [];
    message.isFinal = object.isFinal ?? false;
    message.overrideRoles = object.overrideRoles?.map((e) => e) || [];
    return message;
  },
};

function createBaseSplitTestMetadata(): SplitTestMetadata {
  return {
    name: '',
    finalGroupName: '',
    resolveSummary: '',
    metadata: '',
    slackChannel: '',
    targetMetrics: [],
    metrics: [],
    metricSets: [],
    slackHandles: [],
    resolvedByUserId: '',
    resolvedByEmail: '',
    resolvedAt: 0,
  };
}

export const SplitTestMetadata = {
  encode(message: SplitTestMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.finalGroupName !== '') {
      writer.uint32(18).string(message.finalGroupName);
    }
    if (message.resolveSummary !== '') {
      writer.uint32(26).string(message.resolveSummary);
    }
    if (message.metadata !== '') {
      writer.uint32(34).string(message.metadata);
    }
    if (message.slackChannel !== '') {
      writer.uint32(42).string(message.slackChannel);
    }
    for (const v of message.targetMetrics) {
      writer.uint32(50).string(v!);
    }
    for (const v of message.metrics) {
      writer.uint32(58).string(v!);
    }
    for (const v of message.metricSets) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.slackHandles) {
      writer.uint32(74).string(v!);
    }
    if (message.resolvedByUserId !== '') {
      writer.uint32(82).string(message.resolvedByUserId);
    }
    if (message.resolvedByEmail !== '') {
      writer.uint32(90).string(message.resolvedByEmail);
    }
    if (message.resolvedAt !== 0) {
      writer.uint32(96).uint64(message.resolvedAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SplitTestMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSplitTestMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.finalGroupName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.resolveSummary = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.metadata = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.slackChannel = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.targetMetrics.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.metrics.push(reader.string());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.metricSets.push(reader.string());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.slackHandles.push(reader.string());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.resolvedByUserId = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.resolvedByEmail = reader.string();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.resolvedAt = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SplitTestMetadata {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      finalGroupName: isSet(object.finalGroupName) ? globalThis.String(object.finalGroupName) : '',
      resolveSummary: isSet(object.resolveSummary) ? globalThis.String(object.resolveSummary) : '',
      metadata: isSet(object.metadata) ? globalThis.String(object.metadata) : '',
      slackChannel: isSet(object.slackChannel) ? globalThis.String(object.slackChannel) : '',
      targetMetrics: globalThis.Array.isArray(object?.targetMetrics)
        ? object.targetMetrics.map((e: any) => globalThis.String(e))
        : [],
      metrics: globalThis.Array.isArray(object?.metrics)
        ? object.metrics.map((e: any) => globalThis.String(e))
        : [],
      metricSets: globalThis.Array.isArray(object?.metricSets)
        ? object.metricSets.map((e: any) => globalThis.String(e))
        : [],
      slackHandles: globalThis.Array.isArray(object?.slackHandles)
        ? object.slackHandles.map((e: any) => globalThis.String(e))
        : [],
      resolvedByUserId: isSet(object.resolvedByUserId)
        ? globalThis.String(object.resolvedByUserId)
        : '',
      resolvedByEmail: isSet(object.resolvedByEmail)
        ? globalThis.String(object.resolvedByEmail)
        : '',
      resolvedAt: isSet(object.resolvedAt) ? globalThis.Number(object.resolvedAt) : 0,
    };
  },

  toJSON(message: SplitTestMetadata): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.finalGroupName !== '') {
      obj.finalGroupName = message.finalGroupName;
    }
    if (message.resolveSummary !== '') {
      obj.resolveSummary = message.resolveSummary;
    }
    if (message.metadata !== '') {
      obj.metadata = message.metadata;
    }
    if (message.slackChannel !== '') {
      obj.slackChannel = message.slackChannel;
    }
    if (message.targetMetrics?.length) {
      obj.targetMetrics = message.targetMetrics;
    }
    if (message.metrics?.length) {
      obj.metrics = message.metrics;
    }
    if (message.metricSets?.length) {
      obj.metricSets = message.metricSets;
    }
    if (message.slackHandles?.length) {
      obj.slackHandles = message.slackHandles;
    }
    if (message.resolvedByUserId !== '') {
      obj.resolvedByUserId = message.resolvedByUserId;
    }
    if (message.resolvedByEmail !== '') {
      obj.resolvedByEmail = message.resolvedByEmail;
    }
    if (message.resolvedAt !== 0) {
      obj.resolvedAt = Math.round(message.resolvedAt);
    }
    return obj;
  },

  create(base?: DeepPartial<SplitTestMetadata>): SplitTestMetadata {
    return SplitTestMetadata.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SplitTestMetadata>): SplitTestMetadata {
    const message = createBaseSplitTestMetadata();
    message.name = object.name ?? '';
    message.finalGroupName = object.finalGroupName ?? '';
    message.resolveSummary = object.resolveSummary ?? '';
    message.metadata = object.metadata ?? '';
    message.slackChannel = object.slackChannel ?? '';
    message.targetMetrics = object.targetMetrics?.map((e) => e) || [];
    message.metrics = object.metrics?.map((e) => e) || [];
    message.metricSets = object.metricSets?.map((e) => e) || [];
    message.slackHandles = object.slackHandles?.map((e) => e) || [];
    message.resolvedByUserId = object.resolvedByUserId ?? '';
    message.resolvedByEmail = object.resolvedByEmail ?? '';
    message.resolvedAt = object.resolvedAt ?? 0;
    return message;
  },
};

function createBaseSplitTestsFollowed(): SplitTestsFollowed {
  return { userId: '', followedSplitTests: [] };
}

export const SplitTestsFollowed = {
  encode(message: SplitTestsFollowed, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== '') {
      writer.uint32(10).string(message.userId);
    }
    for (const v of message.followedSplitTests) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SplitTestsFollowed {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSplitTestsFollowed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.followedSplitTests.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SplitTestsFollowed {
    return {
      userId: isSet(object.userId) ? globalThis.String(object.userId) : '',
      followedSplitTests: globalThis.Array.isArray(object?.followedSplitTests)
        ? object.followedSplitTests.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: SplitTestsFollowed): unknown {
    const obj: any = {};
    if (message.userId !== '') {
      obj.userId = message.userId;
    }
    if (message.followedSplitTests?.length) {
      obj.followedSplitTests = message.followedSplitTests;
    }
    return obj;
  },

  create(base?: DeepPartial<SplitTestsFollowed>): SplitTestsFollowed {
    return SplitTestsFollowed.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SplitTestsFollowed>): SplitTestsFollowed {
    const message = createBaseSplitTestsFollowed();
    message.userId = object.userId ?? '';
    message.followedSplitTests = object.followedSplitTests?.map((e) => e) || [];
    return message;
  },
};

function createBaseSplitTestAdminEvents(): SplitTestAdminEvents {
  return { action: '', params: '' };
}

export const SplitTestAdminEvents = {
  encode(message: SplitTestAdminEvents, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.action !== '') {
      writer.uint32(10).string(message.action);
    }
    if (message.params !== '') {
      writer.uint32(18).string(message.params);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SplitTestAdminEvents {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSplitTestAdminEvents();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.action = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.params = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SplitTestAdminEvents {
    return {
      action: isSet(object.action) ? globalThis.String(object.action) : '',
      params: isSet(object.params) ? globalThis.String(object.params) : '',
    };
  },

  toJSON(message: SplitTestAdminEvents): unknown {
    const obj: any = {};
    if (message.action !== '') {
      obj.action = message.action;
    }
    if (message.params !== '') {
      obj.params = message.params;
    }
    return obj;
  },

  create(base?: DeepPartial<SplitTestAdminEvents>): SplitTestAdminEvents {
    return SplitTestAdminEvents.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SplitTestAdminEvents>): SplitTestAdminEvents {
    const message = createBaseSplitTestAdminEvents();
    message.action = object.action ?? '';
    message.params = object.params ?? '';
    return message;
  },
};

function createBaseConfigFile(): ConfigFile {
  return { location: '', body: new Uint8Array(0), attributes: undefined, enabled: false };
}

export const ConfigFile = {
  encode(message: ConfigFile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.location !== '') {
      writer.uint32(10).string(message.location);
    }
    if (message.body.length !== 0) {
      writer.uint32(18).bytes(message.body);
    }
    if (message.attributes !== undefined) {
      StringMap.encode(message.attributes, writer.uint32(26).fork()).ldelim();
    }
    if (message.enabled === true) {
      writer.uint32(80).bool(message.enabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfigFile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigFile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.location = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.body = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.attributes = StringMap.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.enabled = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ConfigFile {
    return {
      location: isSet(object.location) ? globalThis.String(object.location) : '',
      body: isSet(object.body) ? bytesFromBase64(object.body) : new Uint8Array(0),
      attributes: isSet(object.attributes) ? StringMap.fromJSON(object.attributes) : undefined,
      enabled: isSet(object.enabled) ? globalThis.Boolean(object.enabled) : false,
    };
  },

  toJSON(message: ConfigFile): unknown {
    const obj: any = {};
    if (message.location !== '') {
      obj.location = message.location;
    }
    if (message.body.length !== 0) {
      obj.body = base64FromBytes(message.body);
    }
    if (message.attributes !== undefined) {
      obj.attributes = StringMap.toJSON(message.attributes);
    }
    if (message.enabled === true) {
      obj.enabled = message.enabled;
    }
    return obj;
  },

  create(base?: DeepPartial<ConfigFile>): ConfigFile {
    return ConfigFile.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ConfigFile>): ConfigFile {
    const message = createBaseConfigFile();
    message.location = object.location ?? '';
    message.body = object.body ?? new Uint8Array(0);
    message.attributes =
      object.attributes !== undefined && object.attributes !== null
        ? StringMap.fromPartial(object.attributes)
        : undefined;
    message.enabled = object.enabled ?? false;
    return message;
  },
};

function createBaseLimitConfig(): LimitConfig {
  return {
    limitType: 0,
    countryCode: '',
    currencyIso: '',
    limitPeriod: 0,
    scoreRanges: [],
    experimentInfo: undefined,
  };
}

export const LimitConfig = {
  encode(message: LimitConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.limitType !== 0) {
      writer.uint32(8).int32(message.limitType);
    }
    if (message.countryCode !== '') {
      writer.uint32(18).string(message.countryCode);
    }
    if (message.currencyIso !== '') {
      writer.uint32(26).string(message.currencyIso);
    }
    if (message.limitPeriod !== 0) {
      writer.uint32(40).uint64(message.limitPeriod);
    }
    for (const v of message.scoreRanges) {
      LimitConfig_ScoreRange.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.experimentInfo !== undefined) {
      LimitConfig_ExperimentInfo.encode(message.experimentInfo, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LimitConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimitConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.limitType = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.countryCode = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.currencyIso = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.limitPeriod = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.scoreRanges.push(LimitConfig_ScoreRange.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.experimentInfo = LimitConfig_ExperimentInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LimitConfig {
    return {
      limitType: isSet(object.limitType) ? limitConfig_LimitTypeFromJSON(object.limitType) : 0,
      countryCode: isSet(object.countryCode) ? globalThis.String(object.countryCode) : '',
      currencyIso: isSet(object.currencyIso) ? globalThis.String(object.currencyIso) : '',
      limitPeriod: isSet(object.limitPeriod) ? globalThis.Number(object.limitPeriod) : 0,
      scoreRanges: globalThis.Array.isArray(object?.scoreRanges)
        ? object.scoreRanges.map((e: any) => LimitConfig_ScoreRange.fromJSON(e))
        : [],
      experimentInfo: isSet(object.experimentInfo)
        ? LimitConfig_ExperimentInfo.fromJSON(object.experimentInfo)
        : undefined,
    };
  },

  toJSON(message: LimitConfig): unknown {
    const obj: any = {};
    if (message.limitType !== 0) {
      obj.limitType = limitConfig_LimitTypeToJSON(message.limitType);
    }
    if (message.countryCode !== '') {
      obj.countryCode = message.countryCode;
    }
    if (message.currencyIso !== '') {
      obj.currencyIso = message.currencyIso;
    }
    if (message.limitPeriod !== 0) {
      obj.limitPeriod = Math.round(message.limitPeriod);
    }
    if (message.scoreRanges?.length) {
      obj.scoreRanges = message.scoreRanges.map((e) => LimitConfig_ScoreRange.toJSON(e));
    }
    if (message.experimentInfo !== undefined) {
      obj.experimentInfo = LimitConfig_ExperimentInfo.toJSON(message.experimentInfo);
    }
    return obj;
  },

  create(base?: DeepPartial<LimitConfig>): LimitConfig {
    return LimitConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<LimitConfig>): LimitConfig {
    const message = createBaseLimitConfig();
    message.limitType = object.limitType ?? 0;
    message.countryCode = object.countryCode ?? '';
    message.currencyIso = object.currencyIso ?? '';
    message.limitPeriod = object.limitPeriod ?? 0;
    message.scoreRanges =
      object.scoreRanges?.map((e) => LimitConfig_ScoreRange.fromPartial(e)) || [];
    message.experimentInfo =
      object.experimentInfo !== undefined && object.experimentInfo !== null
        ? LimitConfig_ExperimentInfo.fromPartial(object.experimentInfo)
        : undefined;
    return message;
  },
};

function createBaseLimitConfig_KycRequirement(): LimitConfig_KycRequirement {
  return { requirementType: 0 };
}

export const LimitConfig_KycRequirement = {
  encode(
    message: LimitConfig_KycRequirement,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.requirementType !== 0) {
      writer.uint32(8).int32(message.requirementType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LimitConfig_KycRequirement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimitConfig_KycRequirement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.requirementType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LimitConfig_KycRequirement {
    return {
      requirementType: isSet(object.requirementType)
        ? limitConfig_KycRequirementTypeFromJSON(object.requirementType)
        : 0,
    };
  },

  toJSON(message: LimitConfig_KycRequirement): unknown {
    const obj: any = {};
    if (message.requirementType !== 0) {
      obj.requirementType = limitConfig_KycRequirementTypeToJSON(message.requirementType);
    }
    return obj;
  },

  create(base?: DeepPartial<LimitConfig_KycRequirement>): LimitConfig_KycRequirement {
    return LimitConfig_KycRequirement.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<LimitConfig_KycRequirement>): LimitConfig_KycRequirement {
    const message = createBaseLimitConfig_KycRequirement();
    message.requirementType = object.requirementType ?? 0;
    return message;
  },
};

function createBaseLimitConfig_PurchaseRequirement(): LimitConfig_PurchaseRequirement {
  return { purchaseVolume: 0, purchaseVolumeCurrencyIso: '', daysAfterStarting: 0 };
}

export const LimitConfig_PurchaseRequirement = {
  encode(
    message: LimitConfig_PurchaseRequirement,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.purchaseVolume !== 0) {
      writer.uint32(9).double(message.purchaseVolume);
    }
    if (message.purchaseVolumeCurrencyIso !== '') {
      writer.uint32(18).string(message.purchaseVolumeCurrencyIso);
    }
    if (message.daysAfterStarting !== 0) {
      writer.uint32(24).uint32(message.daysAfterStarting);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LimitConfig_PurchaseRequirement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimitConfig_PurchaseRequirement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.purchaseVolume = reader.double();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.purchaseVolumeCurrencyIso = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.daysAfterStarting = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LimitConfig_PurchaseRequirement {
    return {
      purchaseVolume: isSet(object.purchaseVolume) ? globalThis.Number(object.purchaseVolume) : 0,
      purchaseVolumeCurrencyIso: isSet(object.purchaseVolumeCurrencyIso)
        ? globalThis.String(object.purchaseVolumeCurrencyIso)
        : '',
      daysAfterStarting: isSet(object.daysAfterStarting)
        ? globalThis.Number(object.daysAfterStarting)
        : 0,
    };
  },

  toJSON(message: LimitConfig_PurchaseRequirement): unknown {
    const obj: any = {};
    if (message.purchaseVolume !== 0) {
      obj.purchaseVolume = message.purchaseVolume;
    }
    if (message.purchaseVolumeCurrencyIso !== '') {
      obj.purchaseVolumeCurrencyIso = message.purchaseVolumeCurrencyIso;
    }
    if (message.daysAfterStarting !== 0) {
      obj.daysAfterStarting = Math.round(message.daysAfterStarting);
    }
    return obj;
  },

  create(base?: DeepPartial<LimitConfig_PurchaseRequirement>): LimitConfig_PurchaseRequirement {
    return LimitConfig_PurchaseRequirement.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<LimitConfig_PurchaseRequirement>,
  ): LimitConfig_PurchaseRequirement {
    const message = createBaseLimitConfig_PurchaseRequirement();
    message.purchaseVolume = object.purchaseVolume ?? 0;
    message.purchaseVolumeCurrencyIso = object.purchaseVolumeCurrencyIso ?? '';
    message.daysAfterStarting = object.daysAfterStarting ?? 0;
    return message;
  },
};

function createBaseLimitConfig_DepositRequirement(): LimitConfig_DepositRequirement {
  return {
    minimumUserAge: 0,
    maximumFirstDepositAgeInDays: 0,
    experimentRequirement: undefined,
    maximumAccountAgeInDays: 0,
  };
}

export const LimitConfig_DepositRequirement = {
  encode(
    message: LimitConfig_DepositRequirement,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.minimumUserAge !== 0) {
      writer.uint32(8).uint32(message.minimumUserAge);
    }
    if (message.maximumFirstDepositAgeInDays !== 0) {
      writer.uint32(16).uint32(message.maximumFirstDepositAgeInDays);
    }
    if (message.experimentRequirement !== undefined) {
      LimitConfig_ExperimentRequirement.encode(
        message.experimentRequirement,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.maximumAccountAgeInDays !== 0) {
      writer.uint32(32).uint32(message.maximumAccountAgeInDays);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LimitConfig_DepositRequirement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimitConfig_DepositRequirement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.minimumUserAge = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.maximumFirstDepositAgeInDays = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.experimentRequirement = LimitConfig_ExperimentRequirement.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.maximumAccountAgeInDays = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LimitConfig_DepositRequirement {
    return {
      minimumUserAge: isSet(object.minimumUserAge) ? globalThis.Number(object.minimumUserAge) : 0,
      maximumFirstDepositAgeInDays: isSet(object.maximumFirstDepositAgeInDays)
        ? globalThis.Number(object.maximumFirstDepositAgeInDays)
        : 0,
      experimentRequirement: isSet(object.experimentRequirement)
        ? LimitConfig_ExperimentRequirement.fromJSON(object.experimentRequirement)
        : undefined,
      maximumAccountAgeInDays: isSet(object.maximumAccountAgeInDays)
        ? globalThis.Number(object.maximumAccountAgeInDays)
        : 0,
    };
  },

  toJSON(message: LimitConfig_DepositRequirement): unknown {
    const obj: any = {};
    if (message.minimumUserAge !== 0) {
      obj.minimumUserAge = Math.round(message.minimumUserAge);
    }
    if (message.maximumFirstDepositAgeInDays !== 0) {
      obj.maximumFirstDepositAgeInDays = Math.round(message.maximumFirstDepositAgeInDays);
    }
    if (message.experimentRequirement !== undefined) {
      obj.experimentRequirement = LimitConfig_ExperimentRequirement.toJSON(
        message.experimentRequirement,
      );
    }
    if (message.maximumAccountAgeInDays !== 0) {
      obj.maximumAccountAgeInDays = Math.round(message.maximumAccountAgeInDays);
    }
    return obj;
  },

  create(base?: DeepPartial<LimitConfig_DepositRequirement>): LimitConfig_DepositRequirement {
    return LimitConfig_DepositRequirement.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<LimitConfig_DepositRequirement>): LimitConfig_DepositRequirement {
    const message = createBaseLimitConfig_DepositRequirement();
    message.minimumUserAge = object.minimumUserAge ?? 0;
    message.maximumFirstDepositAgeInDays = object.maximumFirstDepositAgeInDays ?? 0;
    message.experimentRequirement =
      object.experimentRequirement !== undefined && object.experimentRequirement !== null
        ? LimitConfig_ExperimentRequirement.fromPartial(object.experimentRequirement)
        : undefined;
    message.maximumAccountAgeInDays = object.maximumAccountAgeInDays ?? 0;
    return message;
  },
};

function createBaseLimitConfig_ExperimentRequirement(): LimitConfig_ExperimentRequirement {
  return { experimentName: '', group: '' };
}

export const LimitConfig_ExperimentRequirement = {
  encode(
    message: LimitConfig_ExperimentRequirement,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.experimentName !== '') {
      writer.uint32(10).string(message.experimentName);
    }
    if (message.group !== '') {
      writer.uint32(18).string(message.group);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LimitConfig_ExperimentRequirement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimitConfig_ExperimentRequirement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.experimentName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.group = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LimitConfig_ExperimentRequirement {
    return {
      experimentName: isSet(object.experimentName) ? globalThis.String(object.experimentName) : '',
      group: isSet(object.group) ? globalThis.String(object.group) : '',
    };
  },

  toJSON(message: LimitConfig_ExperimentRequirement): unknown {
    const obj: any = {};
    if (message.experimentName !== '') {
      obj.experimentName = message.experimentName;
    }
    if (message.group !== '') {
      obj.group = message.group;
    }
    return obj;
  },

  create(base?: DeepPartial<LimitConfig_ExperimentRequirement>): LimitConfig_ExperimentRequirement {
    return LimitConfig_ExperimentRequirement.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<LimitConfig_ExperimentRequirement>,
  ): LimitConfig_ExperimentRequirement {
    const message = createBaseLimitConfig_ExperimentRequirement();
    message.experimentName = object.experimentName ?? '';
    message.group = object.group ?? '';
    return message;
  },
};

function createBaseLimitConfig_AdminFlagRequirement(): LimitConfig_AdminFlagRequirement {
  return { flagName: '', enabled: false };
}

export const LimitConfig_AdminFlagRequirement = {
  encode(
    message: LimitConfig_AdminFlagRequirement,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.flagName !== '') {
      writer.uint32(10).string(message.flagName);
    }
    if (message.enabled === true) {
      writer.uint32(16).bool(message.enabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LimitConfig_AdminFlagRequirement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimitConfig_AdminFlagRequirement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.flagName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.enabled = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LimitConfig_AdminFlagRequirement {
    return {
      flagName: isSet(object.flagName) ? globalThis.String(object.flagName) : '',
      enabled: isSet(object.enabled) ? globalThis.Boolean(object.enabled) : false,
    };
  },

  toJSON(message: LimitConfig_AdminFlagRequirement): unknown {
    const obj: any = {};
    if (message.flagName !== '') {
      obj.flagName = message.flagName;
    }
    if (message.enabled === true) {
      obj.enabled = message.enabled;
    }
    return obj;
  },

  create(base?: DeepPartial<LimitConfig_AdminFlagRequirement>): LimitConfig_AdminFlagRequirement {
    return LimitConfig_AdminFlagRequirement.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<LimitConfig_AdminFlagRequirement>,
  ): LimitConfig_AdminFlagRequirement {
    const message = createBaseLimitConfig_AdminFlagRequirement();
    message.flagName = object.flagName ?? '';
    message.enabled = object.enabled ?? false;
    return message;
  },
};

function createBaseLimitConfig_LimitLevel(): LimitConfig_LimitLevel {
  return {
    limit: 0,
    requirementNull: undefined,
    purchaseRequirement: undefined,
    kycRequirement: undefined,
    depositRequirement: undefined,
    adminFlagRequirement: undefined,
    locked: false,
  };
}

export const LimitConfig_LimitLevel = {
  encode(message: LimitConfig_LimitLevel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.limit !== 0) {
      writer.uint32(9).double(message.limit);
    }
    if (message.requirementNull !== undefined) {
      writer.uint32(32).bool(message.requirementNull);
    }
    if (message.purchaseRequirement !== undefined) {
      LimitConfig_PurchaseRequirement.encode(
        message.purchaseRequirement,
        writer.uint32(42).fork(),
      ).ldelim();
    }
    if (message.kycRequirement !== undefined) {
      LimitConfig_KycRequirement.encode(message.kycRequirement, writer.uint32(50).fork()).ldelim();
    }
    if (message.depositRequirement !== undefined) {
      LimitConfig_DepositRequirement.encode(
        message.depositRequirement,
        writer.uint32(66).fork(),
      ).ldelim();
    }
    if (message.adminFlagRequirement !== undefined) {
      LimitConfig_AdminFlagRequirement.encode(
        message.adminFlagRequirement,
        writer.uint32(74).fork(),
      ).ldelim();
    }
    if (message.locked === true) {
      writer.uint32(56).bool(message.locked);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LimitConfig_LimitLevel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimitConfig_LimitLevel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.limit = reader.double();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.requirementNull = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.purchaseRequirement = LimitConfig_PurchaseRequirement.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.kycRequirement = LimitConfig_KycRequirement.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.depositRequirement = LimitConfig_DepositRequirement.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.adminFlagRequirement = LimitConfig_AdminFlagRequirement.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.locked = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LimitConfig_LimitLevel {
    return {
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
      requirementNull: isSet(object.requirementNull)
        ? globalThis.Boolean(object.requirementNull)
        : undefined,
      purchaseRequirement: isSet(object.purchaseRequirement)
        ? LimitConfig_PurchaseRequirement.fromJSON(object.purchaseRequirement)
        : undefined,
      kycRequirement: isSet(object.kycRequirement)
        ? LimitConfig_KycRequirement.fromJSON(object.kycRequirement)
        : undefined,
      depositRequirement: isSet(object.depositRequirement)
        ? LimitConfig_DepositRequirement.fromJSON(object.depositRequirement)
        : undefined,
      adminFlagRequirement: isSet(object.adminFlagRequirement)
        ? LimitConfig_AdminFlagRequirement.fromJSON(object.adminFlagRequirement)
        : undefined,
      locked: isSet(object.locked) ? globalThis.Boolean(object.locked) : false,
    };
  },

  toJSON(message: LimitConfig_LimitLevel): unknown {
    const obj: any = {};
    if (message.limit !== 0) {
      obj.limit = message.limit;
    }
    if (message.requirementNull !== undefined) {
      obj.requirementNull = message.requirementNull;
    }
    if (message.purchaseRequirement !== undefined) {
      obj.purchaseRequirement = LimitConfig_PurchaseRequirement.toJSON(message.purchaseRequirement);
    }
    if (message.kycRequirement !== undefined) {
      obj.kycRequirement = LimitConfig_KycRequirement.toJSON(message.kycRequirement);
    }
    if (message.depositRequirement !== undefined) {
      obj.depositRequirement = LimitConfig_DepositRequirement.toJSON(message.depositRequirement);
    }
    if (message.adminFlagRequirement !== undefined) {
      obj.adminFlagRequirement = LimitConfig_AdminFlagRequirement.toJSON(
        message.adminFlagRequirement,
      );
    }
    if (message.locked === true) {
      obj.locked = message.locked;
    }
    return obj;
  },

  create(base?: DeepPartial<LimitConfig_LimitLevel>): LimitConfig_LimitLevel {
    return LimitConfig_LimitLevel.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<LimitConfig_LimitLevel>): LimitConfig_LimitLevel {
    const message = createBaseLimitConfig_LimitLevel();
    message.limit = object.limit ?? 0;
    message.requirementNull = object.requirementNull ?? undefined;
    message.purchaseRequirement =
      object.purchaseRequirement !== undefined && object.purchaseRequirement !== null
        ? LimitConfig_PurchaseRequirement.fromPartial(object.purchaseRequirement)
        : undefined;
    message.kycRequirement =
      object.kycRequirement !== undefined && object.kycRequirement !== null
        ? LimitConfig_KycRequirement.fromPartial(object.kycRequirement)
        : undefined;
    message.depositRequirement =
      object.depositRequirement !== undefined && object.depositRequirement !== null
        ? LimitConfig_DepositRequirement.fromPartial(object.depositRequirement)
        : undefined;
    message.adminFlagRequirement =
      object.adminFlagRequirement !== undefined && object.adminFlagRequirement !== null
        ? LimitConfig_AdminFlagRequirement.fromPartial(object.adminFlagRequirement)
        : undefined;
    message.locked = object.locked ?? false;
    return message;
  },
};

function createBaseLimitConfig_ScoreRange(): LimitConfig_ScoreRange {
  return { maximumRiskScore: 0, limitLevels: [], maximumCreditRiskScore: 0 };
}

export const LimitConfig_ScoreRange = {
  encode(message: LimitConfig_ScoreRange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.maximumRiskScore !== 0) {
      writer.uint32(8).uint32(message.maximumRiskScore);
    }
    for (const v of message.limitLevels) {
      LimitConfig_LimitLevel.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.maximumCreditRiskScore !== 0) {
      writer.uint32(25).double(message.maximumCreditRiskScore);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LimitConfig_ScoreRange {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimitConfig_ScoreRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.maximumRiskScore = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.limitLevels.push(LimitConfig_LimitLevel.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.maximumCreditRiskScore = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LimitConfig_ScoreRange {
    return {
      maximumRiskScore: isSet(object.maximumRiskScore)
        ? globalThis.Number(object.maximumRiskScore)
        : 0,
      limitLevels: globalThis.Array.isArray(object?.limitLevels)
        ? object.limitLevels.map((e: any) => LimitConfig_LimitLevel.fromJSON(e))
        : [],
      maximumCreditRiskScore: isSet(object.maximumCreditRiskScore)
        ? globalThis.Number(object.maximumCreditRiskScore)
        : 0,
    };
  },

  toJSON(message: LimitConfig_ScoreRange): unknown {
    const obj: any = {};
    if (message.maximumRiskScore !== 0) {
      obj.maximumRiskScore = Math.round(message.maximumRiskScore);
    }
    if (message.limitLevels?.length) {
      obj.limitLevels = message.limitLevels.map((e) => LimitConfig_LimitLevel.toJSON(e));
    }
    if (message.maximumCreditRiskScore !== 0) {
      obj.maximumCreditRiskScore = message.maximumCreditRiskScore;
    }
    return obj;
  },

  create(base?: DeepPartial<LimitConfig_ScoreRange>): LimitConfig_ScoreRange {
    return LimitConfig_ScoreRange.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<LimitConfig_ScoreRange>): LimitConfig_ScoreRange {
    const message = createBaseLimitConfig_ScoreRange();
    message.maximumRiskScore = object.maximumRiskScore ?? 0;
    message.limitLevels =
      object.limitLevels?.map((e) => LimitConfig_LimitLevel.fromPartial(e)) || [];
    message.maximumCreditRiskScore = object.maximumCreditRiskScore ?? 0;
    return message;
  },
};

function createBaseLimitConfig_ExperimentInfo(): LimitConfig_ExperimentInfo {
  return { name: '', group: '' };
}

export const LimitConfig_ExperimentInfo = {
  encode(
    message: LimitConfig_ExperimentInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.group !== '') {
      writer.uint32(18).string(message.group);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LimitConfig_ExperimentInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimitConfig_ExperimentInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.group = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LimitConfig_ExperimentInfo {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      group: isSet(object.group) ? globalThis.String(object.group) : '',
    };
  },

  toJSON(message: LimitConfig_ExperimentInfo): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.group !== '') {
      obj.group = message.group;
    }
    return obj;
  },

  create(base?: DeepPartial<LimitConfig_ExperimentInfo>): LimitConfig_ExperimentInfo {
    return LimitConfig_ExperimentInfo.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<LimitConfig_ExperimentInfo>): LimitConfig_ExperimentInfo {
    const message = createBaseLimitConfig_ExperimentInfo();
    message.name = object.name ?? '';
    message.group = object.group ?? '';
    return message;
  },
};

function createBaseRaftCluster(): RaftCluster {
  return { id: '', servers: {}, leaderServerId: '', engineType: 0 };
}

export const RaftCluster = {
  encode(message: RaftCluster, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    Object.entries(message.servers).forEach(([key, value]) => {
      RaftCluster_ServersEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork(),
      ).ldelim();
    });
    if (message.leaderServerId !== '') {
      writer.uint32(26).string(message.leaderServerId);
    }
    if (message.engineType !== 0) {
      writer.uint32(32).int32(message.engineType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RaftCluster {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRaftCluster();
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

          const entry2 = RaftCluster_ServersEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.servers[entry2.key] = entry2.value;
          }
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.leaderServerId = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.engineType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RaftCluster {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : '',
      servers: isObject(object.servers)
        ? Object.entries(object.servers).reduce<{ [key: string]: RaftCluster_Server }>(
            (acc, [key, value]) => {
              acc[key] = RaftCluster_Server.fromJSON(value);
              return acc;
            },
            {},
          )
        : {},
      leaderServerId: isSet(object.leaderServerId) ? globalThis.String(object.leaderServerId) : '',
      engineType: isSet(object.engineType) ? raftCluster_EngineTypeFromJSON(object.engineType) : 0,
    };
  },

  toJSON(message: RaftCluster): unknown {
    const obj: any = {};
    if (message.id !== '') {
      obj.id = message.id;
    }
    if (message.servers) {
      const entries = Object.entries(message.servers);
      if (entries.length > 0) {
        obj.servers = {};
        entries.forEach(([k, v]) => {
          obj.servers[k] = RaftCluster_Server.toJSON(v);
        });
      }
    }
    if (message.leaderServerId !== '') {
      obj.leaderServerId = message.leaderServerId;
    }
    if (message.engineType !== 0) {
      obj.engineType = raftCluster_EngineTypeToJSON(message.engineType);
    }
    return obj;
  },

  create(base?: DeepPartial<RaftCluster>): RaftCluster {
    return RaftCluster.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RaftCluster>): RaftCluster {
    const message = createBaseRaftCluster();
    message.id = object.id ?? '';
    message.servers = Object.entries(object.servers ?? {}).reduce<{
      [key: string]: RaftCluster_Server;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = RaftCluster_Server.fromPartial(value);
      }
      return acc;
    }, {});
    message.leaderServerId = object.leaderServerId ?? '';
    message.engineType = object.engineType ?? 0;
    return message;
  },
};

function createBaseRaftCluster_Server(): RaftCluster_Server {
  return { suffrage: 0, ipAddress: '', rpcPort: 0, feedPort: 0 };
}

export const RaftCluster_Server = {
  encode(message: RaftCluster_Server, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.suffrage !== 0) {
      writer.uint32(8).int32(message.suffrage);
    }
    if (message.ipAddress !== '') {
      writer.uint32(18).string(message.ipAddress);
    }
    if (message.rpcPort !== 0) {
      writer.uint32(24).uint32(message.rpcPort);
    }
    if (message.feedPort !== 0) {
      writer.uint32(32).uint32(message.feedPort);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RaftCluster_Server {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRaftCluster_Server();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.suffrage = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.ipAddress = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.rpcPort = reader.uint32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.feedPort = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RaftCluster_Server {
    return {
      suffrage: isSet(object.suffrage) ? raftCluster_SuffrageFromJSON(object.suffrage) : 0,
      ipAddress: isSet(object.ipAddress) ? globalThis.String(object.ipAddress) : '',
      rpcPort: isSet(object.rpcPort) ? globalThis.Number(object.rpcPort) : 0,
      feedPort: isSet(object.feedPort) ? globalThis.Number(object.feedPort) : 0,
    };
  },

  toJSON(message: RaftCluster_Server): unknown {
    const obj: any = {};
    if (message.suffrage !== 0) {
      obj.suffrage = raftCluster_SuffrageToJSON(message.suffrage);
    }
    if (message.ipAddress !== '') {
      obj.ipAddress = message.ipAddress;
    }
    if (message.rpcPort !== 0) {
      obj.rpcPort = Math.round(message.rpcPort);
    }
    if (message.feedPort !== 0) {
      obj.feedPort = Math.round(message.feedPort);
    }
    return obj;
  },

  create(base?: DeepPartial<RaftCluster_Server>): RaftCluster_Server {
    return RaftCluster_Server.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RaftCluster_Server>): RaftCluster_Server {
    const message = createBaseRaftCluster_Server();
    message.suffrage = object.suffrage ?? 0;
    message.ipAddress = object.ipAddress ?? '';
    message.rpcPort = object.rpcPort ?? 0;
    message.feedPort = object.feedPort ?? 0;
    return message;
  },
};

function createBaseRaftCluster_ServersEntry(): RaftCluster_ServersEntry {
  return { key: '', value: undefined };
}

export const RaftCluster_ServersEntry = {
  encode(message: RaftCluster_ServersEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      RaftCluster_Server.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RaftCluster_ServersEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRaftCluster_ServersEntry();
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

          message.value = RaftCluster_Server.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RaftCluster_ServersEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : '',
      value: isSet(object.value) ? RaftCluster_Server.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: RaftCluster_ServersEntry): unknown {
    const obj: any = {};
    if (message.key !== '') {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = RaftCluster_Server.toJSON(message.value);
    }
    return obj;
  },

  create(base?: DeepPartial<RaftCluster_ServersEntry>): RaftCluster_ServersEntry {
    return RaftCluster_ServersEntry.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RaftCluster_ServersEntry>): RaftCluster_ServersEntry {
    const message = createBaseRaftCluster_ServersEntry();
    message.key = object.key ?? '';
    message.value =
      object.value !== undefined && object.value !== null
        ? RaftCluster_Server.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseFullLimitConfig(): FullLimitConfig {
  return { limitConfigs: [] };
}

export const FullLimitConfig = {
  encode(message: FullLimitConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.limitConfigs) {
      LimitConfig.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FullLimitConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFullLimitConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.limitConfigs.push(LimitConfig.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FullLimitConfig {
    return {
      limitConfigs: globalThis.Array.isArray(object?.limitConfigs)
        ? object.limitConfigs.map((e: any) => LimitConfig.fromJSON(e))
        : [],
    };
  },

  toJSON(message: FullLimitConfig): unknown {
    const obj: any = {};
    if (message.limitConfigs?.length) {
      obj.limitConfigs = message.limitConfigs.map((e) => LimitConfig.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<FullLimitConfig>): FullLimitConfig {
    return FullLimitConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<FullLimitConfig>): FullLimitConfig {
    const message = createBaseFullLimitConfig();
    message.limitConfigs = object.limitConfigs?.map((e) => LimitConfig.fromPartial(e)) || [];
    return message;
  },
};

function createBaseOrchestration(): Orchestration {
  return {
    currency: '',
    poolName: '',
    poolUuid: '',
    requiresApproval: false,
    tierArray: '',
    isLivePriceOrchestration: false,
    wallet: '',
    maxSweepFraction: 0,
    network: '',
    keychainTxFormat: '',
    enableBridge: false,
    bridgeNetwork: '',
    bridgeCurrency: '',
    bridgeAccountId: '',
    ratesCurrency: '',
    enableOutboundAwareChunking: false,
    enableFlush: false,
    inboundMaxBalance: 0,
    hotWalletBridgeCapacity: 0,
    outboundMaxBalance: 0,
    outboundMinBalance: 0,
    outboundTargetBalance: 0,
    enableLightning: false,
    maxLightningBalanceDeltaPercent: 0,
    maxLightningRestoreAmount: 0,
    requireRestoreAttestation: false,
  };
}

export const Orchestration = {
  encode(message: Orchestration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.currency !== '') {
      writer.uint32(10).string(message.currency);
    }
    if (message.poolName !== '') {
      writer.uint32(18).string(message.poolName);
    }
    if (message.poolUuid !== '') {
      writer.uint32(26).string(message.poolUuid);
    }
    if (message.requiresApproval === true) {
      writer.uint32(56).bool(message.requiresApproval);
    }
    if (message.tierArray !== '') {
      writer.uint32(66).string(message.tierArray);
    }
    if (message.isLivePriceOrchestration === true) {
      writer.uint32(72).bool(message.isLivePriceOrchestration);
    }
    if (message.wallet !== '') {
      writer.uint32(82).string(message.wallet);
    }
    if (message.maxSweepFraction !== 0) {
      writer.uint32(89).double(message.maxSweepFraction);
    }
    if (message.network !== '') {
      writer.uint32(114).string(message.network);
    }
    if (message.keychainTxFormat !== '') {
      writer.uint32(122).string(message.keychainTxFormat);
    }
    if (message.enableBridge === true) {
      writer.uint32(128).bool(message.enableBridge);
    }
    if (message.bridgeNetwork !== '') {
      writer.uint32(138).string(message.bridgeNetwork);
    }
    if (message.bridgeCurrency !== '') {
      writer.uint32(146).string(message.bridgeCurrency);
    }
    if (message.bridgeAccountId !== '') {
      writer.uint32(154).string(message.bridgeAccountId);
    }
    if (message.ratesCurrency !== '') {
      writer.uint32(162).string(message.ratesCurrency);
    }
    if (message.enableOutboundAwareChunking === true) {
      writer.uint32(168).bool(message.enableOutboundAwareChunking);
    }
    if (message.enableFlush === true) {
      writer.uint32(176).bool(message.enableFlush);
    }
    if (message.inboundMaxBalance !== 0) {
      writer.uint32(184).uint64(message.inboundMaxBalance);
    }
    if (message.hotWalletBridgeCapacity !== 0) {
      writer.uint32(192).uint64(message.hotWalletBridgeCapacity);
    }
    if (message.outboundMaxBalance !== 0) {
      writer.uint32(200).uint64(message.outboundMaxBalance);
    }
    if (message.outboundMinBalance !== 0) {
      writer.uint32(208).uint64(message.outboundMinBalance);
    }
    if (message.outboundTargetBalance !== 0) {
      writer.uint32(216).uint64(message.outboundTargetBalance);
    }
    if (message.enableLightning === true) {
      writer.uint32(224).bool(message.enableLightning);
    }
    if (message.maxLightningBalanceDeltaPercent !== 0) {
      writer.uint32(232).uint64(message.maxLightningBalanceDeltaPercent);
    }
    if (message.maxLightningRestoreAmount !== 0) {
      writer.uint32(240).uint64(message.maxLightningRestoreAmount);
    }
    if (message.requireRestoreAttestation === true) {
      writer.uint32(248).bool(message.requireRestoreAttestation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Orchestration {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrchestration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.currency = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.poolName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.poolUuid = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.requiresApproval = reader.bool();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.tierArray = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.isLivePriceOrchestration = reader.bool();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.wallet = reader.string();
          continue;
        case 11:
          if (tag !== 89) {
            break;
          }

          message.maxSweepFraction = reader.double();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.network = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.keychainTxFormat = reader.string();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.enableBridge = reader.bool();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.bridgeNetwork = reader.string();
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.bridgeCurrency = reader.string();
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.bridgeAccountId = reader.string();
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.ratesCurrency = reader.string();
          continue;
        case 21:
          if (tag !== 168) {
            break;
          }

          message.enableOutboundAwareChunking = reader.bool();
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.enableFlush = reader.bool();
          continue;
        case 23:
          if (tag !== 184) {
            break;
          }

          message.inboundMaxBalance = longToNumber(reader.uint64() as Long);
          continue;
        case 24:
          if (tag !== 192) {
            break;
          }

          message.hotWalletBridgeCapacity = longToNumber(reader.uint64() as Long);
          continue;
        case 25:
          if (tag !== 200) {
            break;
          }

          message.outboundMaxBalance = longToNumber(reader.uint64() as Long);
          continue;
        case 26:
          if (tag !== 208) {
            break;
          }

          message.outboundMinBalance = longToNumber(reader.uint64() as Long);
          continue;
        case 27:
          if (tag !== 216) {
            break;
          }

          message.outboundTargetBalance = longToNumber(reader.uint64() as Long);
          continue;
        case 28:
          if (tag !== 224) {
            break;
          }

          message.enableLightning = reader.bool();
          continue;
        case 29:
          if (tag !== 232) {
            break;
          }

          message.maxLightningBalanceDeltaPercent = longToNumber(reader.uint64() as Long);
          continue;
        case 30:
          if (tag !== 240) {
            break;
          }

          message.maxLightningRestoreAmount = longToNumber(reader.uint64() as Long);
          continue;
        case 31:
          if (tag !== 248) {
            break;
          }

          message.requireRestoreAttestation = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Orchestration {
    return {
      currency: isSet(object.currency) ? globalThis.String(object.currency) : '',
      poolName: isSet(object.poolName) ? globalThis.String(object.poolName) : '',
      poolUuid: isSet(object.poolUuid) ? globalThis.String(object.poolUuid) : '',
      requiresApproval: isSet(object.requiresApproval)
        ? globalThis.Boolean(object.requiresApproval)
        : false,
      tierArray: isSet(object.tierArray) ? globalThis.String(object.tierArray) : '',
      isLivePriceOrchestration: isSet(object.isLivePriceOrchestration)
        ? globalThis.Boolean(object.isLivePriceOrchestration)
        : false,
      wallet: isSet(object.wallet) ? globalThis.String(object.wallet) : '',
      maxSweepFraction: isSet(object.maxSweepFraction)
        ? globalThis.Number(object.maxSweepFraction)
        : 0,
      network: isSet(object.network) ? globalThis.String(object.network) : '',
      keychainTxFormat: isSet(object.keychainTxFormat)
        ? globalThis.String(object.keychainTxFormat)
        : '',
      enableBridge: isSet(object.enableBridge) ? globalThis.Boolean(object.enableBridge) : false,
      bridgeNetwork: isSet(object.bridgeNetwork) ? globalThis.String(object.bridgeNetwork) : '',
      bridgeCurrency: isSet(object.bridgeCurrency) ? globalThis.String(object.bridgeCurrency) : '',
      bridgeAccountId: isSet(object.bridgeAccountId)
        ? globalThis.String(object.bridgeAccountId)
        : '',
      ratesCurrency: isSet(object.ratesCurrency) ? globalThis.String(object.ratesCurrency) : '',
      enableOutboundAwareChunking: isSet(object.enableOutboundAwareChunking)
        ? globalThis.Boolean(object.enableOutboundAwareChunking)
        : false,
      enableFlush: isSet(object.enableFlush) ? globalThis.Boolean(object.enableFlush) : false,
      inboundMaxBalance: isSet(object.inboundMaxBalance)
        ? globalThis.Number(object.inboundMaxBalance)
        : 0,
      hotWalletBridgeCapacity: isSet(object.hotWalletBridgeCapacity)
        ? globalThis.Number(object.hotWalletBridgeCapacity)
        : 0,
      outboundMaxBalance: isSet(object.outboundMaxBalance)
        ? globalThis.Number(object.outboundMaxBalance)
        : 0,
      outboundMinBalance: isSet(object.outboundMinBalance)
        ? globalThis.Number(object.outboundMinBalance)
        : 0,
      outboundTargetBalance: isSet(object.outboundTargetBalance)
        ? globalThis.Number(object.outboundTargetBalance)
        : 0,
      enableLightning: isSet(object.enableLightning)
        ? globalThis.Boolean(object.enableLightning)
        : false,
      maxLightningBalanceDeltaPercent: isSet(object.maxLightningBalanceDeltaPercent)
        ? globalThis.Number(object.maxLightningBalanceDeltaPercent)
        : 0,
      maxLightningRestoreAmount: isSet(object.maxLightningRestoreAmount)
        ? globalThis.Number(object.maxLightningRestoreAmount)
        : 0,
      requireRestoreAttestation: isSet(object.requireRestoreAttestation)
        ? globalThis.Boolean(object.requireRestoreAttestation)
        : false,
    };
  },

  toJSON(message: Orchestration): unknown {
    const obj: any = {};
    if (message.currency !== '') {
      obj.currency = message.currency;
    }
    if (message.poolName !== '') {
      obj.poolName = message.poolName;
    }
    if (message.poolUuid !== '') {
      obj.poolUuid = message.poolUuid;
    }
    if (message.requiresApproval === true) {
      obj.requiresApproval = message.requiresApproval;
    }
    if (message.tierArray !== '') {
      obj.tierArray = message.tierArray;
    }
    if (message.isLivePriceOrchestration === true) {
      obj.isLivePriceOrchestration = message.isLivePriceOrchestration;
    }
    if (message.wallet !== '') {
      obj.wallet = message.wallet;
    }
    if (message.maxSweepFraction !== 0) {
      obj.maxSweepFraction = message.maxSweepFraction;
    }
    if (message.network !== '') {
      obj.network = message.network;
    }
    if (message.keychainTxFormat !== '') {
      obj.keychainTxFormat = message.keychainTxFormat;
    }
    if (message.enableBridge === true) {
      obj.enableBridge = message.enableBridge;
    }
    if (message.bridgeNetwork !== '') {
      obj.bridgeNetwork = message.bridgeNetwork;
    }
    if (message.bridgeCurrency !== '') {
      obj.bridgeCurrency = message.bridgeCurrency;
    }
    if (message.bridgeAccountId !== '') {
      obj.bridgeAccountId = message.bridgeAccountId;
    }
    if (message.ratesCurrency !== '') {
      obj.ratesCurrency = message.ratesCurrency;
    }
    if (message.enableOutboundAwareChunking === true) {
      obj.enableOutboundAwareChunking = message.enableOutboundAwareChunking;
    }
    if (message.enableFlush === true) {
      obj.enableFlush = message.enableFlush;
    }
    if (message.inboundMaxBalance !== 0) {
      obj.inboundMaxBalance = Math.round(message.inboundMaxBalance);
    }
    if (message.hotWalletBridgeCapacity !== 0) {
      obj.hotWalletBridgeCapacity = Math.round(message.hotWalletBridgeCapacity);
    }
    if (message.outboundMaxBalance !== 0) {
      obj.outboundMaxBalance = Math.round(message.outboundMaxBalance);
    }
    if (message.outboundMinBalance !== 0) {
      obj.outboundMinBalance = Math.round(message.outboundMinBalance);
    }
    if (message.outboundTargetBalance !== 0) {
      obj.outboundTargetBalance = Math.round(message.outboundTargetBalance);
    }
    if (message.enableLightning === true) {
      obj.enableLightning = message.enableLightning;
    }
    if (message.maxLightningBalanceDeltaPercent !== 0) {
      obj.maxLightningBalanceDeltaPercent = Math.round(message.maxLightningBalanceDeltaPercent);
    }
    if (message.maxLightningRestoreAmount !== 0) {
      obj.maxLightningRestoreAmount = Math.round(message.maxLightningRestoreAmount);
    }
    if (message.requireRestoreAttestation === true) {
      obj.requireRestoreAttestation = message.requireRestoreAttestation;
    }
    return obj;
  },

  create(base?: DeepPartial<Orchestration>): Orchestration {
    return Orchestration.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Orchestration>): Orchestration {
    const message = createBaseOrchestration();
    message.currency = object.currency ?? '';
    message.poolName = object.poolName ?? '';
    message.poolUuid = object.poolUuid ?? '';
    message.requiresApproval = object.requiresApproval ?? false;
    message.tierArray = object.tierArray ?? '';
    message.isLivePriceOrchestration = object.isLivePriceOrchestration ?? false;
    message.wallet = object.wallet ?? '';
    message.maxSweepFraction = object.maxSweepFraction ?? 0;
    message.network = object.network ?? '';
    message.keychainTxFormat = object.keychainTxFormat ?? '';
    message.enableBridge = object.enableBridge ?? false;
    message.bridgeNetwork = object.bridgeNetwork ?? '';
    message.bridgeCurrency = object.bridgeCurrency ?? '';
    message.bridgeAccountId = object.bridgeAccountId ?? '';
    message.ratesCurrency = object.ratesCurrency ?? '';
    message.enableOutboundAwareChunking = object.enableOutboundAwareChunking ?? false;
    message.enableFlush = object.enableFlush ?? false;
    message.inboundMaxBalance = object.inboundMaxBalance ?? 0;
    message.hotWalletBridgeCapacity = object.hotWalletBridgeCapacity ?? 0;
    message.outboundMaxBalance = object.outboundMaxBalance ?? 0;
    message.outboundMinBalance = object.outboundMinBalance ?? 0;
    message.outboundTargetBalance = object.outboundTargetBalance ?? 0;
    message.enableLightning = object.enableLightning ?? false;
    message.maxLightningBalanceDeltaPercent = object.maxLightningBalanceDeltaPercent ?? 0;
    message.maxLightningRestoreAmount = object.maxLightningRestoreAmount ?? 0;
    message.requireRestoreAttestation = object.requireRestoreAttestation ?? false;
    return message;
  },
};

function createBaseTierArray(): TierArray {
  return { tiers: [] };
}

export const TierArray = {
  encode(message: TierArray, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.tiers) {
      Tier.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TierArray {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTierArray();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tiers.push(Tier.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TierArray {
    return {
      tiers: globalThis.Array.isArray(object?.tiers)
        ? object.tiers.map((e: any) => Tier.fromJSON(e))
        : [],
    };
  },

  toJSON(message: TierArray): unknown {
    const obj: any = {};
    if (message.tiers?.length) {
      obj.tiers = message.tiers.map((e) => Tier.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<TierArray>): TierArray {
    return TierArray.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<TierArray>): TierArray {
    const message = createBaseTierArray();
    message.tiers = object.tiers?.map((e) => Tier.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTier(): Tier {
  return {
    name: '',
    dynastyId: '',
    tierCapacityFloorHwMaxMultiplier: 0,
    perKeyCapacityFloorHwMaxMultiplier: 0,
    tierRestoreThreshold: 0,
    tierCapacityFloorUsd: 0,
    perKeyCapacityFloorUsd: 0,
    custodyPortfolioId: '',
  };
}

export const Tier = {
  encode(message: Tier, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.dynastyId !== '') {
      writer.uint32(18).string(message.dynastyId);
    }
    if (message.tierCapacityFloorHwMaxMultiplier !== 0) {
      writer.uint32(25).double(message.tierCapacityFloorHwMaxMultiplier);
    }
    if (message.perKeyCapacityFloorHwMaxMultiplier !== 0) {
      writer.uint32(33).double(message.perKeyCapacityFloorHwMaxMultiplier);
    }
    if (message.tierRestoreThreshold !== 0) {
      writer.uint32(41).double(message.tierRestoreThreshold);
    }
    if (message.tierCapacityFloorUsd !== 0) {
      writer.uint32(48).uint64(message.tierCapacityFloorUsd);
    }
    if (message.perKeyCapacityFloorUsd !== 0) {
      writer.uint32(56).uint64(message.perKeyCapacityFloorUsd);
    }
    if (message.custodyPortfolioId !== '') {
      writer.uint32(74).string(message.custodyPortfolioId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tier {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTier();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.dynastyId = reader.string();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.tierCapacityFloorHwMaxMultiplier = reader.double();
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.perKeyCapacityFloorHwMaxMultiplier = reader.double();
          continue;
        case 5:
          if (tag !== 41) {
            break;
          }

          message.tierRestoreThreshold = reader.double();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.tierCapacityFloorUsd = longToNumber(reader.uint64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.perKeyCapacityFloorUsd = longToNumber(reader.uint64() as Long);
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.custodyPortfolioId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Tier {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      dynastyId: isSet(object.dynastyId) ? globalThis.String(object.dynastyId) : '',
      tierCapacityFloorHwMaxMultiplier: isSet(object.tierCapacityFloorHwMaxMultiplier)
        ? globalThis.Number(object.tierCapacityFloorHwMaxMultiplier)
        : 0,
      perKeyCapacityFloorHwMaxMultiplier: isSet(object.perKeyCapacityFloorHwMaxMultiplier)
        ? globalThis.Number(object.perKeyCapacityFloorHwMaxMultiplier)
        : 0,
      tierRestoreThreshold: isSet(object.tierRestoreThreshold)
        ? globalThis.Number(object.tierRestoreThreshold)
        : 0,
      tierCapacityFloorUsd: isSet(object.tierCapacityFloorUsd)
        ? globalThis.Number(object.tierCapacityFloorUsd)
        : 0,
      perKeyCapacityFloorUsd: isSet(object.perKeyCapacityFloorUsd)
        ? globalThis.Number(object.perKeyCapacityFloorUsd)
        : 0,
      custodyPortfolioId: isSet(object.custodyPortfolioId)
        ? globalThis.String(object.custodyPortfolioId)
        : '',
    };
  },

  toJSON(message: Tier): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.dynastyId !== '') {
      obj.dynastyId = message.dynastyId;
    }
    if (message.tierCapacityFloorHwMaxMultiplier !== 0) {
      obj.tierCapacityFloorHwMaxMultiplier = message.tierCapacityFloorHwMaxMultiplier;
    }
    if (message.perKeyCapacityFloorHwMaxMultiplier !== 0) {
      obj.perKeyCapacityFloorHwMaxMultiplier = message.perKeyCapacityFloorHwMaxMultiplier;
    }
    if (message.tierRestoreThreshold !== 0) {
      obj.tierRestoreThreshold = message.tierRestoreThreshold;
    }
    if (message.tierCapacityFloorUsd !== 0) {
      obj.tierCapacityFloorUsd = Math.round(message.tierCapacityFloorUsd);
    }
    if (message.perKeyCapacityFloorUsd !== 0) {
      obj.perKeyCapacityFloorUsd = Math.round(message.perKeyCapacityFloorUsd);
    }
    if (message.custodyPortfolioId !== '') {
      obj.custodyPortfolioId = message.custodyPortfolioId;
    }
    return obj;
  },

  create(base?: DeepPartial<Tier>): Tier {
    return Tier.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Tier>): Tier {
    const message = createBaseTier();
    message.name = object.name ?? '';
    message.dynastyId = object.dynastyId ?? '';
    message.tierCapacityFloorHwMaxMultiplier = object.tierCapacityFloorHwMaxMultiplier ?? 0;
    message.perKeyCapacityFloorHwMaxMultiplier = object.perKeyCapacityFloorHwMaxMultiplier ?? 0;
    message.tierRestoreThreshold = object.tierRestoreThreshold ?? 0;
    message.tierCapacityFloorUsd = object.tierCapacityFloorUsd ?? 0;
    message.perKeyCapacityFloorUsd = object.perKeyCapacityFloorUsd ?? 0;
    message.custodyPortfolioId = object.custodyPortfolioId ?? '';
    return message;
  },
};

function createBaseFeatureSetMetadata(): FeatureSetMetadata {
  return {
    name: '',
    entity: 0,
    source: 0,
    sourceConfig: {},
    timestampColumnName: '',
    entityColumnName: '',
    features: [],
    sql: '',
    joinOnRecent: false,
    timeSlide: 0,
    requiresLabel: false,
  };
}

export const FeatureSetMetadata = {
  encode(message: FeatureSetMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.entity !== 0) {
      writer.uint32(16).int32(message.entity);
    }
    if (message.source !== 0) {
      writer.uint32(24).int32(message.source);
    }
    Object.entries(message.sourceConfig).forEach(([key, value]) => {
      FeatureSetMetadata_SourceConfigEntry.encode(
        { key: key as any, value },
        writer.uint32(34).fork(),
      ).ldelim();
    });
    if (message.timestampColumnName !== '') {
      writer.uint32(42).string(message.timestampColumnName);
    }
    if (message.entityColumnName !== '') {
      writer.uint32(50).string(message.entityColumnName);
    }
    for (const v of message.features) {
      FeatureSetMetadata_FeatureMetadata.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.sql !== '') {
      writer.uint32(66).string(message.sql);
    }
    if (message.joinOnRecent === true) {
      writer.uint32(72).bool(message.joinOnRecent);
    }
    if (message.timeSlide !== 0) {
      writer.uint32(80).uint32(message.timeSlide);
    }
    if (message.requiresLabel === true) {
      writer.uint32(88).bool(message.requiresLabel);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FeatureSetMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeatureSetMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.entity = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.source = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = FeatureSetMetadata_SourceConfigEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.sourceConfig[entry4.key] = entry4.value;
          }
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.timestampColumnName = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.entityColumnName = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.features.push(FeatureSetMetadata_FeatureMetadata.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.sql = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.joinOnRecent = reader.bool();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.timeSlide = reader.uint32();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.requiresLabel = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FeatureSetMetadata {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      entity: isSet(object.entity) ? featureSetMetadata_EntityFromJSON(object.entity) : 0,
      source: isSet(object.source) ? featureSetMetadata_SourceFromJSON(object.source) : 0,
      sourceConfig: isObject(object.sourceConfig)
        ? Object.entries(object.sourceConfig).reduce<{ [key: string]: string }>(
            (acc, [key, value]) => {
              acc[key] = String(value);
              return acc;
            },
            {},
          )
        : {},
      timestampColumnName: isSet(object.timestampColumnName)
        ? globalThis.String(object.timestampColumnName)
        : '',
      entityColumnName: isSet(object.entityColumnName)
        ? globalThis.String(object.entityColumnName)
        : '',
      features: globalThis.Array.isArray(object?.features)
        ? object.features.map((e: any) => FeatureSetMetadata_FeatureMetadata.fromJSON(e))
        : [],
      sql: isSet(object.sql) ? globalThis.String(object.sql) : '',
      joinOnRecent: isSet(object.joinOnRecent) ? globalThis.Boolean(object.joinOnRecent) : false,
      timeSlide: isSet(object.timeSlide) ? globalThis.Number(object.timeSlide) : 0,
      requiresLabel: isSet(object.requiresLabel) ? globalThis.Boolean(object.requiresLabel) : false,
    };
  },

  toJSON(message: FeatureSetMetadata): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.entity !== 0) {
      obj.entity = featureSetMetadata_EntityToJSON(message.entity);
    }
    if (message.source !== 0) {
      obj.source = featureSetMetadata_SourceToJSON(message.source);
    }
    if (message.sourceConfig) {
      const entries = Object.entries(message.sourceConfig);
      if (entries.length > 0) {
        obj.sourceConfig = {};
        entries.forEach(([k, v]) => {
          obj.sourceConfig[k] = v;
        });
      }
    }
    if (message.timestampColumnName !== '') {
      obj.timestampColumnName = message.timestampColumnName;
    }
    if (message.entityColumnName !== '') {
      obj.entityColumnName = message.entityColumnName;
    }
    if (message.features?.length) {
      obj.features = message.features.map((e) => FeatureSetMetadata_FeatureMetadata.toJSON(e));
    }
    if (message.sql !== '') {
      obj.sql = message.sql;
    }
    if (message.joinOnRecent === true) {
      obj.joinOnRecent = message.joinOnRecent;
    }
    if (message.timeSlide !== 0) {
      obj.timeSlide = Math.round(message.timeSlide);
    }
    if (message.requiresLabel === true) {
      obj.requiresLabel = message.requiresLabel;
    }
    return obj;
  },

  create(base?: DeepPartial<FeatureSetMetadata>): FeatureSetMetadata {
    return FeatureSetMetadata.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<FeatureSetMetadata>): FeatureSetMetadata {
    const message = createBaseFeatureSetMetadata();
    message.name = object.name ?? '';
    message.entity = object.entity ?? 0;
    message.source = object.source ?? 0;
    message.sourceConfig = Object.entries(object.sourceConfig ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    message.timestampColumnName = object.timestampColumnName ?? '';
    message.entityColumnName = object.entityColumnName ?? '';
    message.features =
      object.features?.map((e) => FeatureSetMetadata_FeatureMetadata.fromPartial(e)) || [];
    message.sql = object.sql ?? '';
    message.joinOnRecent = object.joinOnRecent ?? false;
    message.timeSlide = object.timeSlide ?? 0;
    message.requiresLabel = object.requiresLabel ?? false;
    return message;
  },
};

function createBaseFeatureSetMetadata_FeatureMetadata(): FeatureSetMetadata_FeatureMetadata {
  return {
    name: '',
    type: 0,
    defaultValue: 0,
    numericValue: undefined,
    stringValue: undefined,
    aggregate: 0,
  };
}

export const FeatureSetMetadata_FeatureMetadata = {
  encode(
    message: FeatureSetMetadata_FeatureMetadata,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.defaultValue !== 0) {
      writer.uint32(24).int32(message.defaultValue);
    }
    if (message.numericValue !== undefined) {
      writer.uint32(33).double(message.numericValue);
    }
    if (message.stringValue !== undefined) {
      writer.uint32(42).string(message.stringValue);
    }
    if (message.aggregate !== 0) {
      writer.uint32(48).int32(message.aggregate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FeatureSetMetadata_FeatureMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeatureSetMetadata_FeatureMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.defaultValue = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.numericValue = reader.double();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.stringValue = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.aggregate = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FeatureSetMetadata_FeatureMetadata {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      type: isSet(object.type) ? featureSetMetadata_TypeFromJSON(object.type) : 0,
      defaultValue: isSet(object.defaultValue)
        ? featureSetMetadata_DefaultValueFromJSON(object.defaultValue)
        : 0,
      numericValue: isSet(object.numericValue) ? globalThis.Number(object.numericValue) : undefined,
      stringValue: isSet(object.stringValue) ? globalThis.String(object.stringValue) : undefined,
      aggregate: isSet(object.aggregate)
        ? featureSetMetadata_AggregateFromJSON(object.aggregate)
        : 0,
    };
  },

  toJSON(message: FeatureSetMetadata_FeatureMetadata): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.type !== 0) {
      obj.type = featureSetMetadata_TypeToJSON(message.type);
    }
    if (message.defaultValue !== 0) {
      obj.defaultValue = featureSetMetadata_DefaultValueToJSON(message.defaultValue);
    }
    if (message.numericValue !== undefined) {
      obj.numericValue = message.numericValue;
    }
    if (message.stringValue !== undefined) {
      obj.stringValue = message.stringValue;
    }
    if (message.aggregate !== 0) {
      obj.aggregate = featureSetMetadata_AggregateToJSON(message.aggregate);
    }
    return obj;
  },

  create(
    base?: DeepPartial<FeatureSetMetadata_FeatureMetadata>,
  ): FeatureSetMetadata_FeatureMetadata {
    return FeatureSetMetadata_FeatureMetadata.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<FeatureSetMetadata_FeatureMetadata>,
  ): FeatureSetMetadata_FeatureMetadata {
    const message = createBaseFeatureSetMetadata_FeatureMetadata();
    message.name = object.name ?? '';
    message.type = object.type ?? 0;
    message.defaultValue = object.defaultValue ?? 0;
    message.numericValue = object.numericValue ?? undefined;
    message.stringValue = object.stringValue ?? undefined;
    message.aggregate = object.aggregate ?? 0;
    return message;
  },
};

function createBaseFeatureSetMetadata_SourceConfigEntry(): FeatureSetMetadata_SourceConfigEntry {
  return { key: '', value: '' };
}

export const FeatureSetMetadata_SourceConfigEntry = {
  encode(
    message: FeatureSetMetadata_SourceConfigEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FeatureSetMetadata_SourceConfigEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeatureSetMetadata_SourceConfigEntry();
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

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FeatureSetMetadata_SourceConfigEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : '',
      value: isSet(object.value) ? globalThis.String(object.value) : '',
    };
  },

  toJSON(message: FeatureSetMetadata_SourceConfigEntry): unknown {
    const obj: any = {};
    if (message.key !== '') {
      obj.key = message.key;
    }
    if (message.value !== '') {
      obj.value = message.value;
    }
    return obj;
  },

  create(
    base?: DeepPartial<FeatureSetMetadata_SourceConfigEntry>,
  ): FeatureSetMetadata_SourceConfigEntry {
    return FeatureSetMetadata_SourceConfigEntry.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<FeatureSetMetadata_SourceConfigEntry>,
  ): FeatureSetMetadata_SourceConfigEntry {
    const message = createBaseFeatureSetMetadata_SourceConfigEntry();
    message.key = object.key ?? '';
    message.value = object.value ?? '';
    return message;
  },
};

function createBaseModelFeaturesConfig(): ModelFeaturesConfig {
  return {
    canonicalModelName: '',
    modelPackage: '',
    modelVariant: '',
    trainingJobId: '',
    labelFeatureSet: '',
    featureSets: [],
    descriptor: new Uint8Array(0),
    customLoadSql: '',
    datasetDates: [],
    labelColumn: '',
    labelColumnFromCustomSql: false,
    coerceDefaultValues: false,
    stripColumnPrefixes: false,
  };
}

export const ModelFeaturesConfig = {
  encode(message: ModelFeaturesConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.canonicalModelName !== '') {
      writer.uint32(10).string(message.canonicalModelName);
    }
    if (message.modelPackage !== '') {
      writer.uint32(18).string(message.modelPackage);
    }
    if (message.modelVariant !== '') {
      writer.uint32(26).string(message.modelVariant);
    }
    if (message.trainingJobId !== '') {
      writer.uint32(34).string(message.trainingJobId);
    }
    if (message.labelFeatureSet !== '') {
      writer.uint32(42).string(message.labelFeatureSet);
    }
    for (const v of message.featureSets) {
      ModelFeaturesConfig_ModelFeatureSet.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.descriptor.length !== 0) {
      writer.uint32(58).bytes(message.descriptor);
    }
    if (message.customLoadSql !== '') {
      writer.uint32(66).string(message.customLoadSql);
    }
    for (const v of message.datasetDates) {
      ModelFeaturesConfig_DatasetDate.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.labelColumn !== '') {
      writer.uint32(82).string(message.labelColumn);
    }
    if (message.labelColumnFromCustomSql === true) {
      writer.uint32(88).bool(message.labelColumnFromCustomSql);
    }
    if (message.coerceDefaultValues === true) {
      writer.uint32(96).bool(message.coerceDefaultValues);
    }
    if (message.stripColumnPrefixes === true) {
      writer.uint32(104).bool(message.stripColumnPrefixes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModelFeaturesConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModelFeaturesConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.canonicalModelName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.modelPackage = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.modelVariant = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.trainingJobId = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.labelFeatureSet = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.featureSets.push(
            ModelFeaturesConfig_ModelFeatureSet.decode(reader, reader.uint32()),
          );
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.descriptor = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.customLoadSql = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.datasetDates.push(
            ModelFeaturesConfig_DatasetDate.decode(reader, reader.uint32()),
          );
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.labelColumn = reader.string();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.labelColumnFromCustomSql = reader.bool();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.coerceDefaultValues = reader.bool();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.stripColumnPrefixes = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModelFeaturesConfig {
    return {
      canonicalModelName: isSet(object.canonicalModelName)
        ? globalThis.String(object.canonicalModelName)
        : '',
      modelPackage: isSet(object.modelPackage) ? globalThis.String(object.modelPackage) : '',
      modelVariant: isSet(object.modelVariant) ? globalThis.String(object.modelVariant) : '',
      trainingJobId: isSet(object.trainingJobId) ? globalThis.String(object.trainingJobId) : '',
      labelFeatureSet: isSet(object.labelFeatureSet)
        ? globalThis.String(object.labelFeatureSet)
        : '',
      featureSets: globalThis.Array.isArray(object?.featureSets)
        ? object.featureSets.map((e: any) => ModelFeaturesConfig_ModelFeatureSet.fromJSON(e))
        : [],
      descriptor: isSet(object.descriptor) ? bytesFromBase64(object.descriptor) : new Uint8Array(0),
      customLoadSql: isSet(object.customLoadSql) ? globalThis.String(object.customLoadSql) : '',
      datasetDates: globalThis.Array.isArray(object?.datasetDates)
        ? object.datasetDates.map((e: any) => ModelFeaturesConfig_DatasetDate.fromJSON(e))
        : [],
      labelColumn: isSet(object.labelColumn) ? globalThis.String(object.labelColumn) : '',
      labelColumnFromCustomSql: isSet(object.labelColumnFromCustomSql)
        ? globalThis.Boolean(object.labelColumnFromCustomSql)
        : false,
      coerceDefaultValues: isSet(object.coerceDefaultValues)
        ? globalThis.Boolean(object.coerceDefaultValues)
        : false,
      stripColumnPrefixes: isSet(object.stripColumnPrefixes)
        ? globalThis.Boolean(object.stripColumnPrefixes)
        : false,
    };
  },

  toJSON(message: ModelFeaturesConfig): unknown {
    const obj: any = {};
    if (message.canonicalModelName !== '') {
      obj.canonicalModelName = message.canonicalModelName;
    }
    if (message.modelPackage !== '') {
      obj.modelPackage = message.modelPackage;
    }
    if (message.modelVariant !== '') {
      obj.modelVariant = message.modelVariant;
    }
    if (message.trainingJobId !== '') {
      obj.trainingJobId = message.trainingJobId;
    }
    if (message.labelFeatureSet !== '') {
      obj.labelFeatureSet = message.labelFeatureSet;
    }
    if (message.featureSets?.length) {
      obj.featureSets = message.featureSets.map((e) =>
        ModelFeaturesConfig_ModelFeatureSet.toJSON(e),
      );
    }
    if (message.descriptor.length !== 0) {
      obj.descriptor = base64FromBytes(message.descriptor);
    }
    if (message.customLoadSql !== '') {
      obj.customLoadSql = message.customLoadSql;
    }
    if (message.datasetDates?.length) {
      obj.datasetDates = message.datasetDates.map((e) => ModelFeaturesConfig_DatasetDate.toJSON(e));
    }
    if (message.labelColumn !== '') {
      obj.labelColumn = message.labelColumn;
    }
    if (message.labelColumnFromCustomSql === true) {
      obj.labelColumnFromCustomSql = message.labelColumnFromCustomSql;
    }
    if (message.coerceDefaultValues === true) {
      obj.coerceDefaultValues = message.coerceDefaultValues;
    }
    if (message.stripColumnPrefixes === true) {
      obj.stripColumnPrefixes = message.stripColumnPrefixes;
    }
    return obj;
  },

  create(base?: DeepPartial<ModelFeaturesConfig>): ModelFeaturesConfig {
    return ModelFeaturesConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ModelFeaturesConfig>): ModelFeaturesConfig {
    const message = createBaseModelFeaturesConfig();
    message.canonicalModelName = object.canonicalModelName ?? '';
    message.modelPackage = object.modelPackage ?? '';
    message.modelVariant = object.modelVariant ?? '';
    message.trainingJobId = object.trainingJobId ?? '';
    message.labelFeatureSet = object.labelFeatureSet ?? '';
    message.featureSets =
      object.featureSets?.map((e) => ModelFeaturesConfig_ModelFeatureSet.fromPartial(e)) || [];
    message.descriptor = object.descriptor ?? new Uint8Array(0);
    message.customLoadSql = object.customLoadSql ?? '';
    message.datasetDates =
      object.datasetDates?.map((e) => ModelFeaturesConfig_DatasetDate.fromPartial(e)) || [];
    message.labelColumn = object.labelColumn ?? '';
    message.labelColumnFromCustomSql = object.labelColumnFromCustomSql ?? false;
    message.coerceDefaultValues = object.coerceDefaultValues ?? false;
    message.stripColumnPrefixes = object.stripColumnPrefixes ?? false;
    return message;
  },
};

function createBaseModelFeaturesConfig_ModelFeature(): ModelFeaturesConfig_ModelFeature {
  return { name: '', type: 0 };
}

export const ModelFeaturesConfig_ModelFeature = {
  encode(
    message: ModelFeaturesConfig_ModelFeature,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(50).string(message.name);
    }
    if (message.type !== 0) {
      writer.uint32(56).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModelFeaturesConfig_ModelFeature {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModelFeaturesConfig_ModelFeature();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 6:
          if (tag !== 50) {
            break;
          }

          message.name = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModelFeaturesConfig_ModelFeature {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      type: isSet(object.type) ? modelFeaturesConfig_ModelFeatureTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: ModelFeaturesConfig_ModelFeature): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.type !== 0) {
      obj.type = modelFeaturesConfig_ModelFeatureTypeToJSON(message.type);
    }
    return obj;
  },

  create(base?: DeepPartial<ModelFeaturesConfig_ModelFeature>): ModelFeaturesConfig_ModelFeature {
    return ModelFeaturesConfig_ModelFeature.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<ModelFeaturesConfig_ModelFeature>,
  ): ModelFeaturesConfig_ModelFeature {
    const message = createBaseModelFeaturesConfig_ModelFeature();
    message.name = object.name ?? '';
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseModelFeaturesConfig_ModelFeatureSet(): ModelFeaturesConfig_ModelFeatureSet {
  return { featureSet: '', joinKey: '', joinTo: '', features: [], autoJoin: false };
}

export const ModelFeaturesConfig_ModelFeatureSet = {
  encode(
    message: ModelFeaturesConfig_ModelFeatureSet,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.featureSet !== '') {
      writer.uint32(10).string(message.featureSet);
    }
    if (message.joinKey !== '') {
      writer.uint32(18).string(message.joinKey);
    }
    if (message.joinTo !== '') {
      writer.uint32(26).string(message.joinTo);
    }
    for (const v of message.features) {
      ModelFeaturesConfig_ModelFeature.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.autoJoin === true) {
      writer.uint32(56).bool(message.autoJoin);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModelFeaturesConfig_ModelFeatureSet {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModelFeaturesConfig_ModelFeatureSet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.featureSet = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.joinKey = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.joinTo = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.features.push(ModelFeaturesConfig_ModelFeature.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.autoJoin = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModelFeaturesConfig_ModelFeatureSet {
    return {
      featureSet: isSet(object.featureSet) ? globalThis.String(object.featureSet) : '',
      joinKey: isSet(object.joinKey) ? globalThis.String(object.joinKey) : '',
      joinTo: isSet(object.joinTo) ? globalThis.String(object.joinTo) : '',
      features: globalThis.Array.isArray(object?.features)
        ? object.features.map((e: any) => ModelFeaturesConfig_ModelFeature.fromJSON(e))
        : [],
      autoJoin: isSet(object.autoJoin) ? globalThis.Boolean(object.autoJoin) : false,
    };
  },

  toJSON(message: ModelFeaturesConfig_ModelFeatureSet): unknown {
    const obj: any = {};
    if (message.featureSet !== '') {
      obj.featureSet = message.featureSet;
    }
    if (message.joinKey !== '') {
      obj.joinKey = message.joinKey;
    }
    if (message.joinTo !== '') {
      obj.joinTo = message.joinTo;
    }
    if (message.features?.length) {
      obj.features = message.features.map((e) => ModelFeaturesConfig_ModelFeature.toJSON(e));
    }
    if (message.autoJoin === true) {
      obj.autoJoin = message.autoJoin;
    }
    return obj;
  },

  create(
    base?: DeepPartial<ModelFeaturesConfig_ModelFeatureSet>,
  ): ModelFeaturesConfig_ModelFeatureSet {
    return ModelFeaturesConfig_ModelFeatureSet.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<ModelFeaturesConfig_ModelFeatureSet>,
  ): ModelFeaturesConfig_ModelFeatureSet {
    const message = createBaseModelFeaturesConfig_ModelFeatureSet();
    message.featureSet = object.featureSet ?? '';
    message.joinKey = object.joinKey ?? '';
    message.joinTo = object.joinTo ?? '';
    message.features =
      object.features?.map((e) => ModelFeaturesConfig_ModelFeature.fromPartial(e)) || [];
    message.autoJoin = object.autoJoin ?? false;
    return message;
  },
};

function createBaseModelFeaturesConfig_DatasetDate(): ModelFeaturesConfig_DatasetDate {
  return { name: '', startDate: undefined, endDate: undefined, extraSqlContext: {}, source: 0 };
}

export const ModelFeaturesConfig_DatasetDate = {
  encode(
    message: ModelFeaturesConfig_DatasetDate,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.startDate !== undefined) {
      Timestamp.encode(toTimestamp(message.startDate), writer.uint32(18).fork()).ldelim();
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(toTimestamp(message.endDate), writer.uint32(26).fork()).ldelim();
    }
    Object.entries(message.extraSqlContext).forEach(([key, value]) => {
      ModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry.encode(
        { key: key as any, value },
        writer.uint32(34).fork(),
      ).ldelim();
    });
    if (message.source !== 0) {
      writer.uint32(40).int32(message.source);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModelFeaturesConfig_DatasetDate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModelFeaturesConfig_DatasetDate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.startDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.endDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = ModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry.decode(
            reader,
            reader.uint32(),
          );
          if (entry4.value !== undefined) {
            message.extraSqlContext[entry4.key] = entry4.value;
          }
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.source = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModelFeaturesConfig_DatasetDate {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      startDate: isSet(object.startDate) ? fromJsonTimestamp(object.startDate) : undefined,
      endDate: isSet(object.endDate) ? fromJsonTimestamp(object.endDate) : undefined,
      extraSqlContext: isObject(object.extraSqlContext)
        ? Object.entries(object.extraSqlContext).reduce<{ [key: string]: string }>(
            (acc, [key, value]) => {
              acc[key] = String(value);
              return acc;
            },
            {},
          )
        : {},
      source: isSet(object.source)
        ? modelFeaturesConfig_DatasetDateSourceFromJSON(object.source)
        : 0,
    };
  },

  toJSON(message: ModelFeaturesConfig_DatasetDate): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.startDate !== undefined) {
      obj.startDate = message.startDate.toISOString();
    }
    if (message.endDate !== undefined) {
      obj.endDate = message.endDate.toISOString();
    }
    if (message.extraSqlContext) {
      const entries = Object.entries(message.extraSqlContext);
      if (entries.length > 0) {
        obj.extraSqlContext = {};
        entries.forEach(([k, v]) => {
          obj.extraSqlContext[k] = v;
        });
      }
    }
    if (message.source !== 0) {
      obj.source = modelFeaturesConfig_DatasetDateSourceToJSON(message.source);
    }
    return obj;
  },

  create(base?: DeepPartial<ModelFeaturesConfig_DatasetDate>): ModelFeaturesConfig_DatasetDate {
    return ModelFeaturesConfig_DatasetDate.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<ModelFeaturesConfig_DatasetDate>,
  ): ModelFeaturesConfig_DatasetDate {
    const message = createBaseModelFeaturesConfig_DatasetDate();
    message.name = object.name ?? '';
    message.startDate = object.startDate ?? undefined;
    message.endDate = object.endDate ?? undefined;
    message.extraSqlContext = Object.entries(object.extraSqlContext ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.String(value);
      }
      return acc;
    }, {});
    message.source = object.source ?? 0;
    return message;
  },
};

function createBaseModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry(): ModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry {
  return { key: '', value: '' };
}

export const ModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry = {
  encode(
    message: ModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry();
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

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : '',
      value: isSet(object.value) ? globalThis.String(object.value) : '',
    };
  },

  toJSON(message: ModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry): unknown {
    const obj: any = {};
    if (message.key !== '') {
      obj.key = message.key;
    }
    if (message.value !== '') {
      obj.value = message.value;
    }
    return obj;
  },

  create(
    base?: DeepPartial<ModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry>,
  ): ModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry {
    return ModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<ModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry>,
  ): ModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry {
    const message = createBaseModelFeaturesConfig_DatasetDate_ExtraSqlContextEntry();
    message.key = object.key ?? '';
    message.value = object.value ?? '';
    return message;
  },
};

function createBaseModelScoreCachePolicy(): ModelScoreCachePolicy {
  return { modelTag: '', entity: '', ttl: 0 };
}

export const ModelScoreCachePolicy = {
  encode(message: ModelScoreCachePolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.modelTag !== '') {
      writer.uint32(10).string(message.modelTag);
    }
    if (message.entity !== '') {
      writer.uint32(18).string(message.entity);
    }
    if (message.ttl !== 0) {
      writer.uint32(25).double(message.ttl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModelScoreCachePolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModelScoreCachePolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.modelTag = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.entity = reader.string();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.ttl = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModelScoreCachePolicy {
    return {
      modelTag: isSet(object.modelTag) ? globalThis.String(object.modelTag) : '',
      entity: isSet(object.entity) ? globalThis.String(object.entity) : '',
      ttl: isSet(object.ttl) ? globalThis.Number(object.ttl) : 0,
    };
  },

  toJSON(message: ModelScoreCachePolicy): unknown {
    const obj: any = {};
    if (message.modelTag !== '') {
      obj.modelTag = message.modelTag;
    }
    if (message.entity !== '') {
      obj.entity = message.entity;
    }
    if (message.ttl !== 0) {
      obj.ttl = message.ttl;
    }
    return obj;
  },

  create(base?: DeepPartial<ModelScoreCachePolicy>): ModelScoreCachePolicy {
    return ModelScoreCachePolicy.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ModelScoreCachePolicy>): ModelScoreCachePolicy {
    const message = createBaseModelScoreCachePolicy();
    message.modelTag = object.modelTag ?? '';
    message.entity = object.entity ?? '';
    message.ttl = object.ttl ?? 0;
    return message;
  },
};

function createBaseModelScoreCachePolicyArray(): ModelScoreCachePolicyArray {
  return { policies: [] };
}

export const ModelScoreCachePolicyArray = {
  encode(
    message: ModelScoreCachePolicyArray,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.policies) {
      ModelScoreCachePolicy.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModelScoreCachePolicyArray {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModelScoreCachePolicyArray();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.policies.push(ModelScoreCachePolicy.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModelScoreCachePolicyArray {
    return {
      policies: globalThis.Array.isArray(object?.policies)
        ? object.policies.map((e: any) => ModelScoreCachePolicy.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ModelScoreCachePolicyArray): unknown {
    const obj: any = {};
    if (message.policies?.length) {
      obj.policies = message.policies.map((e) => ModelScoreCachePolicy.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ModelScoreCachePolicyArray>): ModelScoreCachePolicyArray {
    return ModelScoreCachePolicyArray.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ModelScoreCachePolicyArray>): ModelScoreCachePolicyArray {
    const message = createBaseModelScoreCachePolicyArray();
    message.policies = object.policies?.map((e) => ModelScoreCachePolicy.fromPartial(e)) || [];
    return message;
  },
};

function createBaseIntMap(): IntMap {
  return { intMap: {} };
}

export const IntMap = {
  encode(message: IntMap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.intMap).forEach(([key, value]) => {
      IntMap_IntMapEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntMap {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntMap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = IntMap_IntMapEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.intMap[entry1.key] = entry1.value;
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

  fromJSON(object: any): IntMap {
    return {
      intMap: isObject(object.intMap)
        ? Object.entries(object.intMap).reduce<{ [key: string]: number }>((acc, [key, value]) => {
            acc[key] = Number(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: IntMap): unknown {
    const obj: any = {};
    if (message.intMap) {
      const entries = Object.entries(message.intMap);
      if (entries.length > 0) {
        obj.intMap = {};
        entries.forEach(([k, v]) => {
          obj.intMap[k] = Math.round(v);
        });
      }
    }
    return obj;
  },

  create(base?: DeepPartial<IntMap>): IntMap {
    return IntMap.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<IntMap>): IntMap {
    const message = createBaseIntMap();
    message.intMap = Object.entries(object.intMap ?? {}).reduce<{ [key: string]: number }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = globalThis.Number(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseIntMap_IntMapEntry(): IntMap_IntMapEntry {
  return { key: '', value: 0 };
}

export const IntMap_IntMapEntry = {
  encode(message: IntMap_IntMapEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IntMap_IntMapEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIntMap_IntMapEntry();
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
          if (tag !== 16) {
            break;
          }

          message.value = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IntMap_IntMapEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : '',
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: IntMap_IntMapEntry): unknown {
    const obj: any = {};
    if (message.key !== '') {
      obj.key = message.key;
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create(base?: DeepPartial<IntMap_IntMapEntry>): IntMap_IntMapEntry {
    return IntMap_IntMapEntry.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<IntMap_IntMapEntry>): IntMap_IntMapEntry {
    const message = createBaseIntMap_IntMapEntry();
    message.key = object.key ?? '';
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseIncentiveExperimentsConfig(): IncentiveExperimentsConfig {
  return { experimentsConfig: {} };
}

export const IncentiveExperimentsConfig = {
  encode(
    message: IncentiveExperimentsConfig,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    Object.entries(message.experimentsConfig).forEach(([key, value]) => {
      IncentiveExperimentsConfig_ExperimentsConfigEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork(),
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IncentiveExperimentsConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIncentiveExperimentsConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = IncentiveExperimentsConfig_ExperimentsConfigEntry.decode(
            reader,
            reader.uint32(),
          );
          if (entry1.value !== undefined) {
            message.experimentsConfig[entry1.key] = entry1.value;
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

  fromJSON(object: any): IncentiveExperimentsConfig {
    return {
      experimentsConfig: isObject(object.experimentsConfig)
        ? Object.entries(object.experimentsConfig).reduce<{
            [key: string]: IncentiveExperimentsConfig_ExperimentGroupConfig;
          }>((acc, [key, value]) => {
            acc[key] = IncentiveExperimentsConfig_ExperimentGroupConfig.fromJSON(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: IncentiveExperimentsConfig): unknown {
    const obj: any = {};
    if (message.experimentsConfig) {
      const entries = Object.entries(message.experimentsConfig);
      if (entries.length > 0) {
        obj.experimentsConfig = {};
        entries.forEach(([k, v]) => {
          obj.experimentsConfig[k] = IncentiveExperimentsConfig_ExperimentGroupConfig.toJSON(v);
        });
      }
    }
    return obj;
  },

  create(base?: DeepPartial<IncentiveExperimentsConfig>): IncentiveExperimentsConfig {
    return IncentiveExperimentsConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<IncentiveExperimentsConfig>): IncentiveExperimentsConfig {
    const message = createBaseIncentiveExperimentsConfig();
    message.experimentsConfig = Object.entries(object.experimentsConfig ?? {}).reduce<{
      [key: string]: IncentiveExperimentsConfig_ExperimentGroupConfig;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = IncentiveExperimentsConfig_ExperimentGroupConfig.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseIncentiveExperimentsConfig_ExperimentGroupConfig(): IncentiveExperimentsConfig_ExperimentGroupConfig {
  return { groupAmounts: {} };
}

export const IncentiveExperimentsConfig_ExperimentGroupConfig = {
  encode(
    message: IncentiveExperimentsConfig_ExperimentGroupConfig,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    Object.entries(message.groupAmounts).forEach(([key, value]) => {
      IncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork(),
      ).ldelim();
    });
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): IncentiveExperimentsConfig_ExperimentGroupConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIncentiveExperimentsConfig_ExperimentGroupConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = IncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry.decode(
            reader,
            reader.uint32(),
          );
          if (entry1.value !== undefined) {
            message.groupAmounts[entry1.key] = entry1.value;
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

  fromJSON(object: any): IncentiveExperimentsConfig_ExperimentGroupConfig {
    return {
      groupAmounts: isObject(object.groupAmounts)
        ? Object.entries(object.groupAmounts).reduce<{ [key: string]: number }>(
            (acc, [key, value]) => {
              acc[key] = Number(value);
              return acc;
            },
            {},
          )
        : {},
    };
  },

  toJSON(message: IncentiveExperimentsConfig_ExperimentGroupConfig): unknown {
    const obj: any = {};
    if (message.groupAmounts) {
      const entries = Object.entries(message.groupAmounts);
      if (entries.length > 0) {
        obj.groupAmounts = {};
        entries.forEach(([k, v]) => {
          obj.groupAmounts[k] = Math.round(v);
        });
      }
    }
    return obj;
  },

  create(
    base?: DeepPartial<IncentiveExperimentsConfig_ExperimentGroupConfig>,
  ): IncentiveExperimentsConfig_ExperimentGroupConfig {
    return IncentiveExperimentsConfig_ExperimentGroupConfig.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<IncentiveExperimentsConfig_ExperimentGroupConfig>,
  ): IncentiveExperimentsConfig_ExperimentGroupConfig {
    const message = createBaseIncentiveExperimentsConfig_ExperimentGroupConfig();
    message.groupAmounts = Object.entries(object.groupAmounts ?? {}).reduce<{
      [key: string]: number;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = globalThis.Number(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseIncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry(): IncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry {
  return { key: '', value: 0 };
}

export const IncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry = {
  encode(
    message: IncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): IncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry();
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
          if (tag !== 16) {
            break;
          }

          message.value = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : '',
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: IncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry): unknown {
    const obj: any = {};
    if (message.key !== '') {
      obj.key = message.key;
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create(
    base?: DeepPartial<IncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry>,
  ): IncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry {
    return IncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry.fromPartial(
      base ?? {},
    );
  },
  fromPartial(
    object: DeepPartial<IncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry>,
  ): IncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry {
    const message = createBaseIncentiveExperimentsConfig_ExperimentGroupConfig_GroupAmountsEntry();
    message.key = object.key ?? '';
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseIncentiveExperimentsConfig_ExperimentsConfigEntry(): IncentiveExperimentsConfig_ExperimentsConfigEntry {
  return { key: '', value: undefined };
}

export const IncentiveExperimentsConfig_ExperimentsConfigEntry = {
  encode(
    message: IncentiveExperimentsConfig_ExperimentsConfigEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      IncentiveExperimentsConfig_ExperimentGroupConfig.encode(
        message.value,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): IncentiveExperimentsConfig_ExperimentsConfigEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIncentiveExperimentsConfig_ExperimentsConfigEntry();
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

          message.value = IncentiveExperimentsConfig_ExperimentGroupConfig.decode(
            reader,
            reader.uint32(),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IncentiveExperimentsConfig_ExperimentsConfigEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : '',
      value: isSet(object.value)
        ? IncentiveExperimentsConfig_ExperimentGroupConfig.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: IncentiveExperimentsConfig_ExperimentsConfigEntry): unknown {
    const obj: any = {};
    if (message.key !== '') {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = IncentiveExperimentsConfig_ExperimentGroupConfig.toJSON(message.value);
    }
    return obj;
  },

  create(
    base?: DeepPartial<IncentiveExperimentsConfig_ExperimentsConfigEntry>,
  ): IncentiveExperimentsConfig_ExperimentsConfigEntry {
    return IncentiveExperimentsConfig_ExperimentsConfigEntry.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<IncentiveExperimentsConfig_ExperimentsConfigEntry>,
  ): IncentiveExperimentsConfig_ExperimentsConfigEntry {
    const message = createBaseIncentiveExperimentsConfig_ExperimentsConfigEntry();
    message.key = object.key ?? '';
    message.value =
      object.value !== undefined && object.value !== null
        ? IncentiveExperimentsConfig_ExperimentGroupConfig.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseCurrency(): Currency {
  return {
    ticker: '',
    currencyName: '',
    networkName: '',
    precision: 0,
    atomicUnitName: '',
    forkedCurrencies: [],
    requiresGas: false,
    gasCurrency: '',
    requiresOrigination: false,
    originationOptions: undefined,
    disableSweepChunking: false,
    hasExtraRestoreParams: false,
    legacyId: '',
    defaultWallet: 0,
  };
}

export const Currency = {
  encode(message: Currency, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ticker !== '') {
      writer.uint32(10).string(message.ticker);
    }
    if (message.currencyName !== '') {
      writer.uint32(18).string(message.currencyName);
    }
    if (message.networkName !== '') {
      writer.uint32(26).string(message.networkName);
    }
    if (message.precision !== 0) {
      writer.uint32(32).uint32(message.precision);
    }
    if (message.atomicUnitName !== '') {
      writer.uint32(42).string(message.atomicUnitName);
    }
    for (const v of message.forkedCurrencies) {
      writer.uint32(50).string(v!);
    }
    if (message.requiresGas === true) {
      writer.uint32(56).bool(message.requiresGas);
    }
    if (message.gasCurrency !== '') {
      writer.uint32(66).string(message.gasCurrency);
    }
    if (message.requiresOrigination === true) {
      writer.uint32(72).bool(message.requiresOrigination);
    }
    if (message.originationOptions !== undefined) {
      StringMap.encode(message.originationOptions, writer.uint32(82).fork()).ldelim();
    }
    if (message.disableSweepChunking === true) {
      writer.uint32(88).bool(message.disableSweepChunking);
    }
    if (message.hasExtraRestoreParams === true) {
      writer.uint32(96).bool(message.hasExtraRestoreParams);
    }
    if (message.legacyId !== '') {
      writer.uint32(106).string(message.legacyId);
    }
    if (message.defaultWallet !== 0) {
      writer.uint32(112).int32(message.defaultWallet);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Currency {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCurrency();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ticker = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.currencyName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.networkName = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.precision = reader.uint32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.atomicUnitName = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.forkedCurrencies.push(reader.string());
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.requiresGas = reader.bool();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.gasCurrency = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.requiresOrigination = reader.bool();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.originationOptions = StringMap.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.disableSweepChunking = reader.bool();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.hasExtraRestoreParams = reader.bool();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.legacyId = reader.string();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.defaultWallet = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Currency {
    return {
      ticker: isSet(object.ticker) ? globalThis.String(object.ticker) : '',
      currencyName: isSet(object.currencyName) ? globalThis.String(object.currencyName) : '',
      networkName: isSet(object.networkName) ? globalThis.String(object.networkName) : '',
      precision: isSet(object.precision) ? globalThis.Number(object.precision) : 0,
      atomicUnitName: isSet(object.atomicUnitName) ? globalThis.String(object.atomicUnitName) : '',
      forkedCurrencies: globalThis.Array.isArray(object?.forkedCurrencies)
        ? object.forkedCurrencies.map((e: any) => globalThis.String(e))
        : [],
      requiresGas: isSet(object.requiresGas) ? globalThis.Boolean(object.requiresGas) : false,
      gasCurrency: isSet(object.gasCurrency) ? globalThis.String(object.gasCurrency) : '',
      requiresOrigination: isSet(object.requiresOrigination)
        ? globalThis.Boolean(object.requiresOrigination)
        : false,
      originationOptions: isSet(object.originationOptions)
        ? StringMap.fromJSON(object.originationOptions)
        : undefined,
      disableSweepChunking: isSet(object.disableSweepChunking)
        ? globalThis.Boolean(object.disableSweepChunking)
        : false,
      hasExtraRestoreParams: isSet(object.hasExtraRestoreParams)
        ? globalThis.Boolean(object.hasExtraRestoreParams)
        : false,
      legacyId: isSet(object.legacyId) ? globalThis.String(object.legacyId) : '',
      defaultWallet: isSet(object.defaultWallet) ? walletFromJSON(object.defaultWallet) : 0,
    };
  },

  toJSON(message: Currency): unknown {
    const obj: any = {};
    if (message.ticker !== '') {
      obj.ticker = message.ticker;
    }
    if (message.currencyName !== '') {
      obj.currencyName = message.currencyName;
    }
    if (message.networkName !== '') {
      obj.networkName = message.networkName;
    }
    if (message.precision !== 0) {
      obj.precision = Math.round(message.precision);
    }
    if (message.atomicUnitName !== '') {
      obj.atomicUnitName = message.atomicUnitName;
    }
    if (message.forkedCurrencies?.length) {
      obj.forkedCurrencies = message.forkedCurrencies;
    }
    if (message.requiresGas === true) {
      obj.requiresGas = message.requiresGas;
    }
    if (message.gasCurrency !== '') {
      obj.gasCurrency = message.gasCurrency;
    }
    if (message.requiresOrigination === true) {
      obj.requiresOrigination = message.requiresOrigination;
    }
    if (message.originationOptions !== undefined) {
      obj.originationOptions = StringMap.toJSON(message.originationOptions);
    }
    if (message.disableSweepChunking === true) {
      obj.disableSweepChunking = message.disableSweepChunking;
    }
    if (message.hasExtraRestoreParams === true) {
      obj.hasExtraRestoreParams = message.hasExtraRestoreParams;
    }
    if (message.legacyId !== '') {
      obj.legacyId = message.legacyId;
    }
    if (message.defaultWallet !== 0) {
      obj.defaultWallet = walletToJSON(message.defaultWallet);
    }
    return obj;
  },

  create(base?: DeepPartial<Currency>): Currency {
    return Currency.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Currency>): Currency {
    const message = createBaseCurrency();
    message.ticker = object.ticker ?? '';
    message.currencyName = object.currencyName ?? '';
    message.networkName = object.networkName ?? '';
    message.precision = object.precision ?? 0;
    message.atomicUnitName = object.atomicUnitName ?? '';
    message.forkedCurrencies = object.forkedCurrencies?.map((e) => e) || [];
    message.requiresGas = object.requiresGas ?? false;
    message.gasCurrency = object.gasCurrency ?? '';
    message.requiresOrigination = object.requiresOrigination ?? false;
    message.originationOptions =
      object.originationOptions !== undefined && object.originationOptions !== null
        ? StringMap.fromPartial(object.originationOptions)
        : undefined;
    message.disableSweepChunking = object.disableSweepChunking ?? false;
    message.hasExtraRestoreParams = object.hasExtraRestoreParams ?? false;
    message.legacyId = object.legacyId ?? '';
    message.defaultWallet = object.defaultWallet ?? 0;
    return message;
  },
};

function createBaseNetwork(): Network {
  return { networkName: '', siblingNetworks: [], curve: [], gasCurrency: '' };
}

export const Network = {
  encode(message: Network, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.networkName !== '') {
      writer.uint32(10).string(message.networkName);
    }
    for (const v of message.siblingNetworks) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.curve) {
      writer.uint32(26).string(v!);
    }
    if (message.gasCurrency !== '') {
      writer.uint32(34).string(message.gasCurrency);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Network {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetwork();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.networkName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.siblingNetworks.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.curve.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.gasCurrency = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Network {
    return {
      networkName: isSet(object.networkName) ? globalThis.String(object.networkName) : '',
      siblingNetworks: globalThis.Array.isArray(object?.siblingNetworks)
        ? object.siblingNetworks.map((e: any) => globalThis.String(e))
        : [],
      curve: globalThis.Array.isArray(object?.curve)
        ? object.curve.map((e: any) => globalThis.String(e))
        : [],
      gasCurrency: isSet(object.gasCurrency) ? globalThis.String(object.gasCurrency) : '',
    };
  },

  toJSON(message: Network): unknown {
    const obj: any = {};
    if (message.networkName !== '') {
      obj.networkName = message.networkName;
    }
    if (message.siblingNetworks?.length) {
      obj.siblingNetworks = message.siblingNetworks;
    }
    if (message.curve?.length) {
      obj.curve = message.curve;
    }
    if (message.gasCurrency !== '') {
      obj.gasCurrency = message.gasCurrency;
    }
    return obj;
  },

  create(base?: DeepPartial<Network>): Network {
    return Network.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Network>): Network {
    const message = createBaseNetwork();
    message.networkName = object.networkName ?? '';
    message.siblingNetworks = object.siblingNetworks?.map((e) => e) || [];
    message.curve = object.curve?.map((e) => e) || [];
    message.gasCurrency = object.gasCurrency ?? '';
    return message;
  },
};

function createBaseKillSwitch(): KillSwitch {
  return {
    killed: false,
    category: '',
    slack: [],
    pagerduty: [],
    clients: [],
    roles: [],
    group: '',
    storage: '',
    name: '',
    teamowner: '',
  };
}

export const KillSwitch = {
  encode(message: KillSwitch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.killed === true) {
      writer.uint32(8).bool(message.killed);
    }
    if (message.category !== '') {
      writer.uint32(18).string(message.category);
    }
    for (const v of message.slack) {
      writer.uint32(26).string(v!);
    }
    for (const v of message.pagerduty) {
      writer.uint32(34).string(v!);
    }
    for (const v of message.clients) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.roles) {
      writer.uint32(50).string(v!);
    }
    if (message.group !== '') {
      writer.uint32(58).string(message.group);
    }
    if (message.storage !== '') {
      writer.uint32(66).string(message.storage);
    }
    if (message.name !== '') {
      writer.uint32(74).string(message.name);
    }
    if (message.teamowner !== '') {
      writer.uint32(82).string(message.teamowner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KillSwitch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKillSwitch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.killed = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.category = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.slack.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.pagerduty.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.clients.push(reader.string());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.roles.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.group = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.storage = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.name = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.teamowner = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): KillSwitch {
    return {
      killed: isSet(object.killed) ? globalThis.Boolean(object.killed) : false,
      category: isSet(object.category) ? globalThis.String(object.category) : '',
      slack: globalThis.Array.isArray(object?.slack)
        ? object.slack.map((e: any) => globalThis.String(e))
        : [],
      pagerduty: globalThis.Array.isArray(object?.pagerduty)
        ? object.pagerduty.map((e: any) => globalThis.String(e))
        : [],
      clients: globalThis.Array.isArray(object?.clients)
        ? object.clients.map((e: any) => globalThis.String(e))
        : [],
      roles: globalThis.Array.isArray(object?.roles)
        ? object.roles.map((e: any) => globalThis.String(e))
        : [],
      group: isSet(object.group) ? globalThis.String(object.group) : '',
      storage: isSet(object.storage) ? globalThis.String(object.storage) : '',
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      teamowner: isSet(object.teamowner) ? globalThis.String(object.teamowner) : '',
    };
  },

  toJSON(message: KillSwitch): unknown {
    const obj: any = {};
    if (message.killed === true) {
      obj.killed = message.killed;
    }
    if (message.category !== '') {
      obj.category = message.category;
    }
    if (message.slack?.length) {
      obj.slack = message.slack;
    }
    if (message.pagerduty?.length) {
      obj.pagerduty = message.pagerduty;
    }
    if (message.clients?.length) {
      obj.clients = message.clients;
    }
    if (message.roles?.length) {
      obj.roles = message.roles;
    }
    if (message.group !== '') {
      obj.group = message.group;
    }
    if (message.storage !== '') {
      obj.storage = message.storage;
    }
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.teamowner !== '') {
      obj.teamowner = message.teamowner;
    }
    return obj;
  },

  create(base?: DeepPartial<KillSwitch>): KillSwitch {
    return KillSwitch.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<KillSwitch>): KillSwitch {
    const message = createBaseKillSwitch();
    message.killed = object.killed ?? false;
    message.category = object.category ?? '';
    message.slack = object.slack?.map((e) => e) || [];
    message.pagerduty = object.pagerduty?.map((e) => e) || [];
    message.clients = object.clients?.map((e) => e) || [];
    message.roles = object.roles?.map((e) => e) || [];
    message.group = object.group ?? '';
    message.storage = object.storage ?? '';
    message.name = object.name ?? '';
    message.teamowner = object.teamowner ?? '';
    return message;
  },
};

function createBaseMlModelThresholdConfig(): MlModelThresholdConfig {
  return { blockRates: [], defaultThresholds: [] };
}

export const MlModelThresholdConfig = {
  encode(message: MlModelThresholdConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.blockRates) {
      MlModelThresholdConfig_SegmentValues.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.defaultThresholds) {
      MlModelThresholdConfig_SegmentValues.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MlModelThresholdConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMlModelThresholdConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.blockRates.push(
            MlModelThresholdConfig_SegmentValues.decode(reader, reader.uint32()),
          );
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.defaultThresholds.push(
            MlModelThresholdConfig_SegmentValues.decode(reader, reader.uint32()),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MlModelThresholdConfig {
    return {
      blockRates: globalThis.Array.isArray(object?.blockRates)
        ? object.blockRates.map((e: any) => MlModelThresholdConfig_SegmentValues.fromJSON(e))
        : [],
      defaultThresholds: globalThis.Array.isArray(object?.defaultThresholds)
        ? object.defaultThresholds.map((e: any) => MlModelThresholdConfig_SegmentValues.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MlModelThresholdConfig): unknown {
    const obj: any = {};
    if (message.blockRates?.length) {
      obj.blockRates = message.blockRates.map((e) =>
        MlModelThresholdConfig_SegmentValues.toJSON(e),
      );
    }
    if (message.defaultThresholds?.length) {
      obj.defaultThresholds = message.defaultThresholds.map((e) =>
        MlModelThresholdConfig_SegmentValues.toJSON(e),
      );
    }
    return obj;
  },

  create(base?: DeepPartial<MlModelThresholdConfig>): MlModelThresholdConfig {
    return MlModelThresholdConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MlModelThresholdConfig>): MlModelThresholdConfig {
    const message = createBaseMlModelThresholdConfig();
    message.blockRates =
      object.blockRates?.map((e) => MlModelThresholdConfig_SegmentValues.fromPartial(e)) || [];
    message.defaultThresholds =
      object.defaultThresholds?.map((e) => MlModelThresholdConfig_SegmentValues.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseMlModelThresholdConfig_SegmentValues(): MlModelThresholdConfig_SegmentValues {
  return { name: '', values: [] };
}

export const MlModelThresholdConfig_SegmentValues = {
  encode(
    message: MlModelThresholdConfig_SegmentValues,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    writer.uint32(18).fork();
    for (const v of message.values) {
      writer.double(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MlModelThresholdConfig_SegmentValues {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMlModelThresholdConfig_SegmentValues();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag === 17) {
            message.values.push(reader.double());

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.values.push(reader.double());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MlModelThresholdConfig_SegmentValues {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      values: globalThis.Array.isArray(object?.values)
        ? object.values.map((e: any) => globalThis.Number(e))
        : [],
    };
  },

  toJSON(message: MlModelThresholdConfig_SegmentValues): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.values?.length) {
      obj.values = message.values;
    }
    return obj;
  },

  create(
    base?: DeepPartial<MlModelThresholdConfig_SegmentValues>,
  ): MlModelThresholdConfig_SegmentValues {
    return MlModelThresholdConfig_SegmentValues.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<MlModelThresholdConfig_SegmentValues>,
  ): MlModelThresholdConfig_SegmentValues {
    const message = createBaseMlModelThresholdConfig_SegmentValues();
    message.name = object.name ?? '';
    message.values = object.values?.map((e) => e) || [];
    return message;
  },
};

function createBaseEntryGatewayLoadTestConfig(): EntryGatewayLoadTestConfig {
  return { tests: [] };
}

export const EntryGatewayLoadTestConfig = {
  encode(
    message: EntryGatewayLoadTestConfig,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.tests) {
      EntryGatewayLoadTestConfig_Test.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EntryGatewayLoadTestConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntryGatewayLoadTestConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tests.push(EntryGatewayLoadTestConfig_Test.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EntryGatewayLoadTestConfig {
    return {
      tests: globalThis.Array.isArray(object?.tests)
        ? object.tests.map((e: any) => EntryGatewayLoadTestConfig_Test.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EntryGatewayLoadTestConfig): unknown {
    const obj: any = {};
    if (message.tests?.length) {
      obj.tests = message.tests.map((e) => EntryGatewayLoadTestConfig_Test.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<EntryGatewayLoadTestConfig>): EntryGatewayLoadTestConfig {
    return EntryGatewayLoadTestConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<EntryGatewayLoadTestConfig>): EntryGatewayLoadTestConfig {
    const message = createBaseEntryGatewayLoadTestConfig();
    message.tests = object.tests?.map((e) => EntryGatewayLoadTestConfig_Test.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEntryGatewayLoadTestConfig_Test(): EntryGatewayLoadTestConfig_Test {
  return {
    name: '',
    distribution: undefined,
    latency: 0,
    serverErrorRate: 0,
    additionalAttributes: undefined,
    route: '',
    weight: 0,
  };
}

export const EntryGatewayLoadTestConfig_Test = {
  encode(
    message: EntryGatewayLoadTestConfig_Test,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.distribution !== undefined) {
      EntryGatewayLoadTestConfig_Test_Distribution.encode(
        message.distribution,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.latency !== 0) {
      writer.uint32(24).uint64(message.latency);
    }
    if (message.serverErrorRate !== 0) {
      writer.uint32(33).double(message.serverErrorRate);
    }
    if (message.additionalAttributes !== undefined) {
      StringMap.encode(message.additionalAttributes, writer.uint32(42).fork()).ldelim();
    }
    if (message.route !== '') {
      writer.uint32(50).string(message.route);
    }
    if (message.weight !== 0) {
      writer.uint32(56).uint64(message.weight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EntryGatewayLoadTestConfig_Test {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntryGatewayLoadTestConfig_Test();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.distribution = EntryGatewayLoadTestConfig_Test_Distribution.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.latency = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 33) {
            break;
          }

          message.serverErrorRate = reader.double();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.additionalAttributes = StringMap.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.route = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.weight = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EntryGatewayLoadTestConfig_Test {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      distribution: isSet(object.distribution)
        ? EntryGatewayLoadTestConfig_Test_Distribution.fromJSON(object.distribution)
        : undefined,
      latency: isSet(object.latency) ? globalThis.Number(object.latency) : 0,
      serverErrorRate: isSet(object.serverErrorRate)
        ? globalThis.Number(object.serverErrorRate)
        : 0,
      additionalAttributes: isSet(object.additionalAttributes)
        ? StringMap.fromJSON(object.additionalAttributes)
        : undefined,
      route: isSet(object.route) ? globalThis.String(object.route) : '',
      weight: isSet(object.weight) ? globalThis.Number(object.weight) : 0,
    };
  },

  toJSON(message: EntryGatewayLoadTestConfig_Test): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.distribution !== undefined) {
      obj.distribution = EntryGatewayLoadTestConfig_Test_Distribution.toJSON(message.distribution);
    }
    if (message.latency !== 0) {
      obj.latency = Math.round(message.latency);
    }
    if (message.serverErrorRate !== 0) {
      obj.serverErrorRate = message.serverErrorRate;
    }
    if (message.additionalAttributes !== undefined) {
      obj.additionalAttributes = StringMap.toJSON(message.additionalAttributes);
    }
    if (message.route !== '') {
      obj.route = message.route;
    }
    if (message.weight !== 0) {
      obj.weight = Math.round(message.weight);
    }
    return obj;
  },

  create(base?: DeepPartial<EntryGatewayLoadTestConfig_Test>): EntryGatewayLoadTestConfig_Test {
    return EntryGatewayLoadTestConfig_Test.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<EntryGatewayLoadTestConfig_Test>,
  ): EntryGatewayLoadTestConfig_Test {
    const message = createBaseEntryGatewayLoadTestConfig_Test();
    message.name = object.name ?? '';
    message.distribution =
      object.distribution !== undefined && object.distribution !== null
        ? EntryGatewayLoadTestConfig_Test_Distribution.fromPartial(object.distribution)
        : undefined;
    message.latency = object.latency ?? 0;
    message.serverErrorRate = object.serverErrorRate ?? 0;
    message.additionalAttributes =
      object.additionalAttributes !== undefined && object.additionalAttributes !== null
        ? StringMap.fromPartial(object.additionalAttributes)
        : undefined;
    message.route = object.route ?? '';
    message.weight = object.weight ?? 0;
    return message;
  },
};

function createBaseEntryGatewayLoadTestConfig_Test_Distribution(): EntryGatewayLoadTestConfig_Test_Distribution {
  return { sigma: 0, mean: 0 };
}

export const EntryGatewayLoadTestConfig_Test_Distribution = {
  encode(
    message: EntryGatewayLoadTestConfig_Test_Distribution,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.sigma !== 0) {
      writer.uint32(9).double(message.sigma);
    }
    if (message.mean !== 0) {
      writer.uint32(17).double(message.mean);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): EntryGatewayLoadTestConfig_Test_Distribution {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntryGatewayLoadTestConfig_Test_Distribution();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.sigma = reader.double();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.mean = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EntryGatewayLoadTestConfig_Test_Distribution {
    return {
      sigma: isSet(object.sigma) ? globalThis.Number(object.sigma) : 0,
      mean: isSet(object.mean) ? globalThis.Number(object.mean) : 0,
    };
  },

  toJSON(message: EntryGatewayLoadTestConfig_Test_Distribution): unknown {
    const obj: any = {};
    if (message.sigma !== 0) {
      obj.sigma = message.sigma;
    }
    if (message.mean !== 0) {
      obj.mean = message.mean;
    }
    return obj;
  },

  create(
    base?: DeepPartial<EntryGatewayLoadTestConfig_Test_Distribution>,
  ): EntryGatewayLoadTestConfig_Test_Distribution {
    return EntryGatewayLoadTestConfig_Test_Distribution.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<EntryGatewayLoadTestConfig_Test_Distribution>,
  ): EntryGatewayLoadTestConfig_Test_Distribution {
    const message = createBaseEntryGatewayLoadTestConfig_Test_Distribution();
    message.sigma = object.sigma ?? 0;
    message.mean = object.mean ?? 0;
    return message;
  },
};

function createBaseFeeOverride(): FeeOverride {
  return { currency: '', cbCommission: 0, spreadPercentage: 0 };
}

export const FeeOverride = {
  encode(message: FeeOverride, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.currency !== '') {
      writer.uint32(10).string(message.currency);
    }
    if (message.cbCommission !== 0) {
      writer.uint32(17).double(message.cbCommission);
    }
    if (message.spreadPercentage !== 0) {
      writer.uint32(25).double(message.spreadPercentage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FeeOverride {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeeOverride();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.currency = reader.string();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.cbCommission = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.spreadPercentage = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FeeOverride {
    return {
      currency: isSet(object.currency) ? globalThis.String(object.currency) : '',
      cbCommission: isSet(object.cbCommission) ? globalThis.Number(object.cbCommission) : 0,
      spreadPercentage: isSet(object.spreadPercentage)
        ? globalThis.Number(object.spreadPercentage)
        : 0,
    };
  },

  toJSON(message: FeeOverride): unknown {
    const obj: any = {};
    if (message.currency !== '') {
      obj.currency = message.currency;
    }
    if (message.cbCommission !== 0) {
      obj.cbCommission = message.cbCommission;
    }
    if (message.spreadPercentage !== 0) {
      obj.spreadPercentage = message.spreadPercentage;
    }
    return obj;
  },

  create(base?: DeepPartial<FeeOverride>): FeeOverride {
    return FeeOverride.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<FeeOverride>): FeeOverride {
    const message = createBaseFeeOverride();
    message.currency = object.currency ?? '';
    message.cbCommission = object.cbCommission ?? 0;
    message.spreadPercentage = object.spreadPercentage ?? 0;
    return message;
  },
};

function createBaseCommerceAssets(): CommerceAssets {
  return { assetConfigs: [] };
}

export const CommerceAssets = {
  encode(message: CommerceAssets, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.assetConfigs) {
      CommerceAssets_Config.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommerceAssets {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommerceAssets();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.assetConfigs.push(CommerceAssets_Config.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommerceAssets {
    return {
      assetConfigs: globalThis.Array.isArray(object?.assetConfigs)
        ? object.assetConfigs.map((e: any) => CommerceAssets_Config.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CommerceAssets): unknown {
    const obj: any = {};
    if (message.assetConfigs?.length) {
      obj.assetConfigs = message.assetConfigs.map((e) => CommerceAssets_Config.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<CommerceAssets>): CommerceAssets {
    return CommerceAssets.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CommerceAssets>): CommerceAssets {
    const message = createBaseCommerceAssets();
    message.assetConfigs =
      object.assetConfigs?.map((e) => CommerceAssets_Config.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCommerceAssets_Config(): CommerceAssets_Config {
  return {
    assetName: '',
    stoneCurrencySymbol: '',
    commerceNetworkSym: '',
    isDefault: false,
    isReleased: false,
    addressPoolSupported: false,
    retailOmnibusLedgerAccountUuid: '',
    custodialFeeLedgerAccountUuid: '',
    autoconversionLimitUsd: 0,
    commerceWalletSupported: false,
    noncustodialFeeDestinationAddresses: [],
    metadata: undefined,
  };
}

export const CommerceAssets_Config = {
  encode(message: CommerceAssets_Config, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.assetName !== '') {
      writer.uint32(10).string(message.assetName);
    }
    if (message.stoneCurrencySymbol !== '') {
      writer.uint32(18).string(message.stoneCurrencySymbol);
    }
    if (message.commerceNetworkSym !== '') {
      writer.uint32(26).string(message.commerceNetworkSym);
    }
    if (message.isDefault === true) {
      writer.uint32(32).bool(message.isDefault);
    }
    if (message.isReleased === true) {
      writer.uint32(40).bool(message.isReleased);
    }
    if (message.addressPoolSupported === true) {
      writer.uint32(48).bool(message.addressPoolSupported);
    }
    if (message.retailOmnibusLedgerAccountUuid !== '') {
      writer.uint32(58).string(message.retailOmnibusLedgerAccountUuid);
    }
    if (message.custodialFeeLedgerAccountUuid !== '') {
      writer.uint32(66).string(message.custodialFeeLedgerAccountUuid);
    }
    if (message.autoconversionLimitUsd !== 0) {
      writer.uint32(72).uint32(message.autoconversionLimitUsd);
    }
    if (message.commerceWalletSupported === true) {
      writer.uint32(80).bool(message.commerceWalletSupported);
    }
    for (const v of message.noncustodialFeeDestinationAddresses) {
      writer.uint32(90).string(v!);
    }
    if (message.metadata !== undefined) {
      CommerceAssets_Config_Metadata.encode(message.metadata, writer.uint32(130).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommerceAssets_Config {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommerceAssets_Config();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.assetName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.stoneCurrencySymbol = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.commerceNetworkSym = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.isDefault = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.isReleased = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.addressPoolSupported = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.retailOmnibusLedgerAccountUuid = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.custodialFeeLedgerAccountUuid = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.autoconversionLimitUsd = reader.uint32();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.commerceWalletSupported = reader.bool();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.noncustodialFeeDestinationAddresses.push(reader.string());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.metadata = CommerceAssets_Config_Metadata.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommerceAssets_Config {
    return {
      assetName: isSet(object.assetName) ? globalThis.String(object.assetName) : '',
      stoneCurrencySymbol: isSet(object.stoneCurrencySymbol)
        ? globalThis.String(object.stoneCurrencySymbol)
        : '',
      commerceNetworkSym: isSet(object.commerceNetworkSym)
        ? globalThis.String(object.commerceNetworkSym)
        : '',
      isDefault: isSet(object.isDefault) ? globalThis.Boolean(object.isDefault) : false,
      isReleased: isSet(object.isReleased) ? globalThis.Boolean(object.isReleased) : false,
      addressPoolSupported: isSet(object.addressPoolSupported)
        ? globalThis.Boolean(object.addressPoolSupported)
        : false,
      retailOmnibusLedgerAccountUuid: isSet(object.retailOmnibusLedgerAccountUuid)
        ? globalThis.String(object.retailOmnibusLedgerAccountUuid)
        : '',
      custodialFeeLedgerAccountUuid: isSet(object.custodialFeeLedgerAccountUuid)
        ? globalThis.String(object.custodialFeeLedgerAccountUuid)
        : '',
      autoconversionLimitUsd: isSet(object.autoconversionLimitUsd)
        ? globalThis.Number(object.autoconversionLimitUsd)
        : 0,
      commerceWalletSupported: isSet(object.commerceWalletSupported)
        ? globalThis.Boolean(object.commerceWalletSupported)
        : false,
      noncustodialFeeDestinationAddresses: globalThis.Array.isArray(
        object?.noncustodialFeeDestinationAddresses,
      )
        ? object.noncustodialFeeDestinationAddresses.map((e: any) => globalThis.String(e))
        : [],
      metadata: isSet(object.metadata)
        ? CommerceAssets_Config_Metadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: CommerceAssets_Config): unknown {
    const obj: any = {};
    if (message.assetName !== '') {
      obj.assetName = message.assetName;
    }
    if (message.stoneCurrencySymbol !== '') {
      obj.stoneCurrencySymbol = message.stoneCurrencySymbol;
    }
    if (message.commerceNetworkSym !== '') {
      obj.commerceNetworkSym = message.commerceNetworkSym;
    }
    if (message.isDefault === true) {
      obj.isDefault = message.isDefault;
    }
    if (message.isReleased === true) {
      obj.isReleased = message.isReleased;
    }
    if (message.addressPoolSupported === true) {
      obj.addressPoolSupported = message.addressPoolSupported;
    }
    if (message.retailOmnibusLedgerAccountUuid !== '') {
      obj.retailOmnibusLedgerAccountUuid = message.retailOmnibusLedgerAccountUuid;
    }
    if (message.custodialFeeLedgerAccountUuid !== '') {
      obj.custodialFeeLedgerAccountUuid = message.custodialFeeLedgerAccountUuid;
    }
    if (message.autoconversionLimitUsd !== 0) {
      obj.autoconversionLimitUsd = Math.round(message.autoconversionLimitUsd);
    }
    if (message.commerceWalletSupported === true) {
      obj.commerceWalletSupported = message.commerceWalletSupported;
    }
    if (message.noncustodialFeeDestinationAddresses?.length) {
      obj.noncustodialFeeDestinationAddresses = message.noncustodialFeeDestinationAddresses;
    }
    if (message.metadata !== undefined) {
      obj.metadata = CommerceAssets_Config_Metadata.toJSON(message.metadata);
    }
    return obj;
  },

  create(base?: DeepPartial<CommerceAssets_Config>): CommerceAssets_Config {
    return CommerceAssets_Config.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CommerceAssets_Config>): CommerceAssets_Config {
    const message = createBaseCommerceAssets_Config();
    message.assetName = object.assetName ?? '';
    message.stoneCurrencySymbol = object.stoneCurrencySymbol ?? '';
    message.commerceNetworkSym = object.commerceNetworkSym ?? '';
    message.isDefault = object.isDefault ?? false;
    message.isReleased = object.isReleased ?? false;
    message.addressPoolSupported = object.addressPoolSupported ?? false;
    message.retailOmnibusLedgerAccountUuid = object.retailOmnibusLedgerAccountUuid ?? '';
    message.custodialFeeLedgerAccountUuid = object.custodialFeeLedgerAccountUuid ?? '';
    message.autoconversionLimitUsd = object.autoconversionLimitUsd ?? 0;
    message.commerceWalletSupported = object.commerceWalletSupported ?? false;
    message.noncustodialFeeDestinationAddresses =
      object.noncustodialFeeDestinationAddresses?.map((e) => e) || [];
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? CommerceAssets_Config_Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseCommerceAssets_Config_Metadata(): CommerceAssets_Config_Metadata {
  return { cbListedData: undefined, customData: undefined };
}

export const CommerceAssets_Config_Metadata = {
  encode(
    message: CommerceAssets_Config_Metadata,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.cbListedData !== undefined) {
      CommerceAssets_Config_Metadata_CoinbaseListed.encode(
        message.cbListedData,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.customData !== undefined) {
      CommerceAssets_Config_Metadata_Custom.encode(
        message.customData,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommerceAssets_Config_Metadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommerceAssets_Config_Metadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cbListedData = CommerceAssets_Config_Metadata_CoinbaseListed.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.customData = CommerceAssets_Config_Metadata_Custom.decode(
            reader,
            reader.uint32(),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommerceAssets_Config_Metadata {
    return {
      cbListedData: isSet(object.cbListedData)
        ? CommerceAssets_Config_Metadata_CoinbaseListed.fromJSON(object.cbListedData)
        : undefined,
      customData: isSet(object.customData)
        ? CommerceAssets_Config_Metadata_Custom.fromJSON(object.customData)
        : undefined,
    };
  },

  toJSON(message: CommerceAssets_Config_Metadata): unknown {
    const obj: any = {};
    if (message.cbListedData !== undefined) {
      obj.cbListedData = CommerceAssets_Config_Metadata_CoinbaseListed.toJSON(message.cbListedData);
    }
    if (message.customData !== undefined) {
      obj.customData = CommerceAssets_Config_Metadata_Custom.toJSON(message.customData);
    }
    return obj;
  },

  create(base?: DeepPartial<CommerceAssets_Config_Metadata>): CommerceAssets_Config_Metadata {
    return CommerceAssets_Config_Metadata.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CommerceAssets_Config_Metadata>): CommerceAssets_Config_Metadata {
    const message = createBaseCommerceAssets_Config_Metadata();
    message.cbListedData =
      object.cbListedData !== undefined && object.cbListedData !== null
        ? CommerceAssets_Config_Metadata_CoinbaseListed.fromPartial(object.cbListedData)
        : undefined;
    message.customData =
      object.customData !== undefined && object.customData !== null
        ? CommerceAssets_Config_Metadata_Custom.fromPartial(object.customData)
        : undefined;
    return message;
  },
};

function createBaseCommerceAssets_Config_Metadata_CoinbaseListed(): CommerceAssets_Config_Metadata_CoinbaseListed {
  return { cbAssetUuid: '' };
}

export const CommerceAssets_Config_Metadata_CoinbaseListed = {
  encode(
    message: CommerceAssets_Config_Metadata_CoinbaseListed,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.cbAssetUuid !== '') {
      writer.uint32(10).string(message.cbAssetUuid);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): CommerceAssets_Config_Metadata_CoinbaseListed {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommerceAssets_Config_Metadata_CoinbaseListed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cbAssetUuid = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommerceAssets_Config_Metadata_CoinbaseListed {
    return { cbAssetUuid: isSet(object.cbAssetUuid) ? globalThis.String(object.cbAssetUuid) : '' };
  },

  toJSON(message: CommerceAssets_Config_Metadata_CoinbaseListed): unknown {
    const obj: any = {};
    if (message.cbAssetUuid !== '') {
      obj.cbAssetUuid = message.cbAssetUuid;
    }
    return obj;
  },

  create(
    base?: DeepPartial<CommerceAssets_Config_Metadata_CoinbaseListed>,
  ): CommerceAssets_Config_Metadata_CoinbaseListed {
    return CommerceAssets_Config_Metadata_CoinbaseListed.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<CommerceAssets_Config_Metadata_CoinbaseListed>,
  ): CommerceAssets_Config_Metadata_CoinbaseListed {
    const message = createBaseCommerceAssets_Config_Metadata_CoinbaseListed();
    message.cbAssetUuid = object.cbAssetUuid ?? '';
    return message;
  },
};

function createBaseCommerceAssets_Config_Metadata_Custom(): CommerceAssets_Config_Metadata_Custom {
  return {
    slug: '',
    displayName: '',
    decimals: 0,
    contractAddress: '',
    imageUrl: '',
    minWithdrawalAmount: 0,
  };
}

export const CommerceAssets_Config_Metadata_Custom = {
  encode(
    message: CommerceAssets_Config_Metadata_Custom,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.slug !== '') {
      writer.uint32(10).string(message.slug);
    }
    if (message.displayName !== '') {
      writer.uint32(18).string(message.displayName);
    }
    if (message.decimals !== 0) {
      writer.uint32(24).uint32(message.decimals);
    }
    if (message.contractAddress !== '') {
      writer.uint32(34).string(message.contractAddress);
    }
    if (message.imageUrl !== '') {
      writer.uint32(42).string(message.imageUrl);
    }
    if (message.minWithdrawalAmount !== 0) {
      writer.uint32(49).double(message.minWithdrawalAmount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommerceAssets_Config_Metadata_Custom {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommerceAssets_Config_Metadata_Custom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.slug = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.decimals = reader.uint32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.contractAddress = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.imageUrl = reader.string();
          continue;
        case 6:
          if (tag !== 49) {
            break;
          }

          message.minWithdrawalAmount = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CommerceAssets_Config_Metadata_Custom {
    return {
      slug: isSet(object.slug) ? globalThis.String(object.slug) : '',
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : '',
      decimals: isSet(object.decimals) ? globalThis.Number(object.decimals) : 0,
      contractAddress: isSet(object.contractAddress)
        ? globalThis.String(object.contractAddress)
        : '',
      imageUrl: isSet(object.imageUrl) ? globalThis.String(object.imageUrl) : '',
      minWithdrawalAmount: isSet(object.minWithdrawalAmount)
        ? globalThis.Number(object.minWithdrawalAmount)
        : 0,
    };
  },

  toJSON(message: CommerceAssets_Config_Metadata_Custom): unknown {
    const obj: any = {};
    if (message.slug !== '') {
      obj.slug = message.slug;
    }
    if (message.displayName !== '') {
      obj.displayName = message.displayName;
    }
    if (message.decimals !== 0) {
      obj.decimals = Math.round(message.decimals);
    }
    if (message.contractAddress !== '') {
      obj.contractAddress = message.contractAddress;
    }
    if (message.imageUrl !== '') {
      obj.imageUrl = message.imageUrl;
    }
    if (message.minWithdrawalAmount !== 0) {
      obj.minWithdrawalAmount = message.minWithdrawalAmount;
    }
    return obj;
  },

  create(
    base?: DeepPartial<CommerceAssets_Config_Metadata_Custom>,
  ): CommerceAssets_Config_Metadata_Custom {
    return CommerceAssets_Config_Metadata_Custom.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<CommerceAssets_Config_Metadata_Custom>,
  ): CommerceAssets_Config_Metadata_Custom {
    const message = createBaseCommerceAssets_Config_Metadata_Custom();
    message.slug = object.slug ?? '';
    message.displayName = object.displayName ?? '';
    message.decimals = object.decimals ?? 0;
    message.contractAddress = object.contractAddress ?? '';
    message.imageUrl = object.imageUrl ?? '';
    message.minWithdrawalAmount = object.minWithdrawalAmount ?? 0;
    return message;
  },
};

function createBaseOpenBankingBankDetails(): OpenBankingBankDetails {
  return { bankDetail: [] };
}

export const OpenBankingBankDetails = {
  encode(message: OpenBankingBankDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.bankDetail) {
      OpenBankingBankDetails_BankDetail.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenBankingBankDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenBankingBankDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bankDetail.push(
            OpenBankingBankDetails_BankDetail.decode(reader, reader.uint32()),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OpenBankingBankDetails {
    return {
      bankDetail: globalThis.Array.isArray(object?.bankDetail)
        ? object.bankDetail.map((e: any) => OpenBankingBankDetails_BankDetail.fromJSON(e))
        : [],
    };
  },

  toJSON(message: OpenBankingBankDetails): unknown {
    const obj: any = {};
    if (message.bankDetail?.length) {
      obj.bankDetail = message.bankDetail.map((e) => OpenBankingBankDetails_BankDetail.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<OpenBankingBankDetails>): OpenBankingBankDetails {
    return OpenBankingBankDetails.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<OpenBankingBankDetails>): OpenBankingBankDetails {
    const message = createBaseOpenBankingBankDetails();
    message.bankDetail =
      object.bankDetail?.map((e) => OpenBankingBankDetails_BankDetail.fromPartial(e)) || [];
    return message;
  },
};

function createBaseOpenBankingBankDetails_DisplayDetails(): OpenBankingBankDetails_DisplayDetails {
  return { iconUrl: '', logoUrl: '', backgroundColor: '' };
}

export const OpenBankingBankDetails_DisplayDetails = {
  encode(
    message: OpenBankingBankDetails_DisplayDetails,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.iconUrl !== '') {
      writer.uint32(10).string(message.iconUrl);
    }
    if (message.logoUrl !== '') {
      writer.uint32(18).string(message.logoUrl);
    }
    if (message.backgroundColor !== '') {
      writer.uint32(26).string(message.backgroundColor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenBankingBankDetails_DisplayDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenBankingBankDetails_DisplayDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.iconUrl = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.logoUrl = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.backgroundColor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OpenBankingBankDetails_DisplayDetails {
    return {
      iconUrl: isSet(object.iconUrl) ? globalThis.String(object.iconUrl) : '',
      logoUrl: isSet(object.logoUrl) ? globalThis.String(object.logoUrl) : '',
      backgroundColor: isSet(object.backgroundColor)
        ? globalThis.String(object.backgroundColor)
        : '',
    };
  },

  toJSON(message: OpenBankingBankDetails_DisplayDetails): unknown {
    const obj: any = {};
    if (message.iconUrl !== '') {
      obj.iconUrl = message.iconUrl;
    }
    if (message.logoUrl !== '') {
      obj.logoUrl = message.logoUrl;
    }
    if (message.backgroundColor !== '') {
      obj.backgroundColor = message.backgroundColor;
    }
    return obj;
  },

  create(
    base?: DeepPartial<OpenBankingBankDetails_DisplayDetails>,
  ): OpenBankingBankDetails_DisplayDetails {
    return OpenBankingBankDetails_DisplayDetails.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<OpenBankingBankDetails_DisplayDetails>,
  ): OpenBankingBankDetails_DisplayDetails {
    const message = createBaseOpenBankingBankDetails_DisplayDetails();
    message.iconUrl = object.iconUrl ?? '';
    message.logoUrl = object.logoUrl ?? '';
    message.backgroundColor = object.backgroundColor ?? '';
    return message;
  },
};

function createBaseOpenBankingBankDetails_TruelayerDetails(): OpenBankingBankDetails_TruelayerDetails {
  return { providerId: '' };
}

export const OpenBankingBankDetails_TruelayerDetails = {
  encode(
    message: OpenBankingBankDetails_TruelayerDetails,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.providerId !== '') {
      writer.uint32(10).string(message.providerId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenBankingBankDetails_TruelayerDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenBankingBankDetails_TruelayerDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.providerId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OpenBankingBankDetails_TruelayerDetails {
    return { providerId: isSet(object.providerId) ? globalThis.String(object.providerId) : '' };
  },

  toJSON(message: OpenBankingBankDetails_TruelayerDetails): unknown {
    const obj: any = {};
    if (message.providerId !== '') {
      obj.providerId = message.providerId;
    }
    return obj;
  },

  create(
    base?: DeepPartial<OpenBankingBankDetails_TruelayerDetails>,
  ): OpenBankingBankDetails_TruelayerDetails {
    return OpenBankingBankDetails_TruelayerDetails.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<OpenBankingBankDetails_TruelayerDetails>,
  ): OpenBankingBankDetails_TruelayerDetails {
    const message = createBaseOpenBankingBankDetails_TruelayerDetails();
    message.providerId = object.providerId ?? '';
    return message;
  },
};

function createBaseOpenBankingBankDetails_BankDetail(): OpenBankingBankDetails_BankDetail {
  return { bankName: '', displayDetails: undefined, truelayerDetails: undefined, statusCode: 0 };
}

export const OpenBankingBankDetails_BankDetail = {
  encode(
    message: OpenBankingBankDetails_BankDetail,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.bankName !== '') {
      writer.uint32(10).string(message.bankName);
    }
    if (message.displayDetails !== undefined) {
      OpenBankingBankDetails_DisplayDetails.encode(
        message.displayDetails,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.truelayerDetails !== undefined) {
      OpenBankingBankDetails_TruelayerDetails.encode(
        message.truelayerDetails,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.statusCode !== 0) {
      writer.uint32(32).int32(message.statusCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenBankingBankDetails_BankDetail {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenBankingBankDetails_BankDetail();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bankName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.displayDetails = OpenBankingBankDetails_DisplayDetails.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.truelayerDetails = OpenBankingBankDetails_TruelayerDetails.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.statusCode = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OpenBankingBankDetails_BankDetail {
    return {
      bankName: isSet(object.bankName) ? globalThis.String(object.bankName) : '',
      displayDetails: isSet(object.displayDetails)
        ? OpenBankingBankDetails_DisplayDetails.fromJSON(object.displayDetails)
        : undefined,
      truelayerDetails: isSet(object.truelayerDetails)
        ? OpenBankingBankDetails_TruelayerDetails.fromJSON(object.truelayerDetails)
        : undefined,
      statusCode: isSet(object.statusCode) ? globalThis.Number(object.statusCode) : 0,
    };
  },

  toJSON(message: OpenBankingBankDetails_BankDetail): unknown {
    const obj: any = {};
    if (message.bankName !== '') {
      obj.bankName = message.bankName;
    }
    if (message.displayDetails !== undefined) {
      obj.displayDetails = OpenBankingBankDetails_DisplayDetails.toJSON(message.displayDetails);
    }
    if (message.truelayerDetails !== undefined) {
      obj.truelayerDetails = OpenBankingBankDetails_TruelayerDetails.toJSON(
        message.truelayerDetails,
      );
    }
    if (message.statusCode !== 0) {
      obj.statusCode = Math.round(message.statusCode);
    }
    return obj;
  },

  create(base?: DeepPartial<OpenBankingBankDetails_BankDetail>): OpenBankingBankDetails_BankDetail {
    return OpenBankingBankDetails_BankDetail.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<OpenBankingBankDetails_BankDetail>,
  ): OpenBankingBankDetails_BankDetail {
    const message = createBaseOpenBankingBankDetails_BankDetail();
    message.bankName = object.bankName ?? '';
    message.displayDetails =
      object.displayDetails !== undefined && object.displayDetails !== null
        ? OpenBankingBankDetails_DisplayDetails.fromPartial(object.displayDetails)
        : undefined;
    message.truelayerDetails =
      object.truelayerDetails !== undefined && object.truelayerDetails !== null
        ? OpenBankingBankDetails_TruelayerDetails.fromPartial(object.truelayerDetails)
        : undefined;
    message.statusCode = object.statusCode ?? 0;
    return message;
  },
};

function createBaseOpenBankingBankDetailsV2(): OpenBankingBankDetailsV2 {
  return { bankDetail: [] };
}

export const OpenBankingBankDetailsV2 = {
  encode(message: OpenBankingBankDetailsV2, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.bankDetail) {
      OpenBankingBankDetailsV2_BankDetail.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenBankingBankDetailsV2 {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenBankingBankDetailsV2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bankDetail.push(
            OpenBankingBankDetailsV2_BankDetail.decode(reader, reader.uint32()),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OpenBankingBankDetailsV2 {
    return {
      bankDetail: globalThis.Array.isArray(object?.bankDetail)
        ? object.bankDetail.map((e: any) => OpenBankingBankDetailsV2_BankDetail.fromJSON(e))
        : [],
    };
  },

  toJSON(message: OpenBankingBankDetailsV2): unknown {
    const obj: any = {};
    if (message.bankDetail?.length) {
      obj.bankDetail = message.bankDetail.map((e) => OpenBankingBankDetailsV2_BankDetail.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<OpenBankingBankDetailsV2>): OpenBankingBankDetailsV2 {
    return OpenBankingBankDetailsV2.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<OpenBankingBankDetailsV2>): OpenBankingBankDetailsV2 {
    const message = createBaseOpenBankingBankDetailsV2();
    message.bankDetail =
      object.bankDetail?.map((e) => OpenBankingBankDetailsV2_BankDetail.fromPartial(e)) || [];
    return message;
  },
};

function createBaseOpenBankingBankDetailsV2_DisplayDetails(): OpenBankingBankDetailsV2_DisplayDetails {
  return { iconUrl: '', logoUrl: '', backgroundColor: '' };
}

export const OpenBankingBankDetailsV2_DisplayDetails = {
  encode(
    message: OpenBankingBankDetailsV2_DisplayDetails,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.iconUrl !== '') {
      writer.uint32(10).string(message.iconUrl);
    }
    if (message.logoUrl !== '') {
      writer.uint32(18).string(message.logoUrl);
    }
    if (message.backgroundColor !== '') {
      writer.uint32(26).string(message.backgroundColor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenBankingBankDetailsV2_DisplayDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenBankingBankDetailsV2_DisplayDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.iconUrl = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.logoUrl = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.backgroundColor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OpenBankingBankDetailsV2_DisplayDetails {
    return {
      iconUrl: isSet(object.iconUrl) ? globalThis.String(object.iconUrl) : '',
      logoUrl: isSet(object.logoUrl) ? globalThis.String(object.logoUrl) : '',
      backgroundColor: isSet(object.backgroundColor)
        ? globalThis.String(object.backgroundColor)
        : '',
    };
  },

  toJSON(message: OpenBankingBankDetailsV2_DisplayDetails): unknown {
    const obj: any = {};
    if (message.iconUrl !== '') {
      obj.iconUrl = message.iconUrl;
    }
    if (message.logoUrl !== '') {
      obj.logoUrl = message.logoUrl;
    }
    if (message.backgroundColor !== '') {
      obj.backgroundColor = message.backgroundColor;
    }
    return obj;
  },

  create(
    base?: DeepPartial<OpenBankingBankDetailsV2_DisplayDetails>,
  ): OpenBankingBankDetailsV2_DisplayDetails {
    return OpenBankingBankDetailsV2_DisplayDetails.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<OpenBankingBankDetailsV2_DisplayDetails>,
  ): OpenBankingBankDetailsV2_DisplayDetails {
    const message = createBaseOpenBankingBankDetailsV2_DisplayDetails();
    message.iconUrl = object.iconUrl ?? '';
    message.logoUrl = object.logoUrl ?? '';
    message.backgroundColor = object.backgroundColor ?? '';
    return message;
  },
};

function createBaseOpenBankingBankDetailsV2_TruelayerDetails(): OpenBankingBankDetailsV2_TruelayerDetails {
  return { providerId: '' };
}

export const OpenBankingBankDetailsV2_TruelayerDetails = {
  encode(
    message: OpenBankingBankDetailsV2_TruelayerDetails,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.providerId !== '') {
      writer.uint32(10).string(message.providerId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): OpenBankingBankDetailsV2_TruelayerDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenBankingBankDetailsV2_TruelayerDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.providerId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OpenBankingBankDetailsV2_TruelayerDetails {
    return { providerId: isSet(object.providerId) ? globalThis.String(object.providerId) : '' };
  },

  toJSON(message: OpenBankingBankDetailsV2_TruelayerDetails): unknown {
    const obj: any = {};
    if (message.providerId !== '') {
      obj.providerId = message.providerId;
    }
    return obj;
  },

  create(
    base?: DeepPartial<OpenBankingBankDetailsV2_TruelayerDetails>,
  ): OpenBankingBankDetailsV2_TruelayerDetails {
    return OpenBankingBankDetailsV2_TruelayerDetails.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<OpenBankingBankDetailsV2_TruelayerDetails>,
  ): OpenBankingBankDetailsV2_TruelayerDetails {
    const message = createBaseOpenBankingBankDetailsV2_TruelayerDetails();
    message.providerId = object.providerId ?? '';
    return message;
  },
};

function createBaseOpenBankingBankDetailsV2_BankDetail(): OpenBankingBankDetailsV2_BankDetail {
  return {
    bankName: '',
    displayDetails: undefined,
    truelayerDetails: undefined,
    bankAvailabilityStatusCode: 0,
    bankAvailabilityForBuysStatusCode: 0,
  };
}

export const OpenBankingBankDetailsV2_BankDetail = {
  encode(
    message: OpenBankingBankDetailsV2_BankDetail,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.bankName !== '') {
      writer.uint32(10).string(message.bankName);
    }
    if (message.displayDetails !== undefined) {
      OpenBankingBankDetailsV2_DisplayDetails.encode(
        message.displayDetails,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.truelayerDetails !== undefined) {
      OpenBankingBankDetailsV2_TruelayerDetails.encode(
        message.truelayerDetails,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.bankAvailabilityStatusCode !== 0) {
      writer.uint32(32).int32(message.bankAvailabilityStatusCode);
    }
    if (message.bankAvailabilityForBuysStatusCode !== 0) {
      writer.uint32(40).int32(message.bankAvailabilityForBuysStatusCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenBankingBankDetailsV2_BankDetail {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenBankingBankDetailsV2_BankDetail();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bankName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.displayDetails = OpenBankingBankDetailsV2_DisplayDetails.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.truelayerDetails = OpenBankingBankDetailsV2_TruelayerDetails.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.bankAvailabilityStatusCode = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.bankAvailabilityForBuysStatusCode = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OpenBankingBankDetailsV2_BankDetail {
    return {
      bankName: isSet(object.bankName) ? globalThis.String(object.bankName) : '',
      displayDetails: isSet(object.displayDetails)
        ? OpenBankingBankDetailsV2_DisplayDetails.fromJSON(object.displayDetails)
        : undefined,
      truelayerDetails: isSet(object.truelayerDetails)
        ? OpenBankingBankDetailsV2_TruelayerDetails.fromJSON(object.truelayerDetails)
        : undefined,
      bankAvailabilityStatusCode: isSet(object.bankAvailabilityStatusCode)
        ? globalThis.Number(object.bankAvailabilityStatusCode)
        : 0,
      bankAvailabilityForBuysStatusCode: isSet(object.bankAvailabilityForBuysStatusCode)
        ? globalThis.Number(object.bankAvailabilityForBuysStatusCode)
        : 0,
    };
  },

  toJSON(message: OpenBankingBankDetailsV2_BankDetail): unknown {
    const obj: any = {};
    if (message.bankName !== '') {
      obj.bankName = message.bankName;
    }
    if (message.displayDetails !== undefined) {
      obj.displayDetails = OpenBankingBankDetailsV2_DisplayDetails.toJSON(message.displayDetails);
    }
    if (message.truelayerDetails !== undefined) {
      obj.truelayerDetails = OpenBankingBankDetailsV2_TruelayerDetails.toJSON(
        message.truelayerDetails,
      );
    }
    if (message.bankAvailabilityStatusCode !== 0) {
      obj.bankAvailabilityStatusCode = Math.round(message.bankAvailabilityStatusCode);
    }
    if (message.bankAvailabilityForBuysStatusCode !== 0) {
      obj.bankAvailabilityForBuysStatusCode = Math.round(message.bankAvailabilityForBuysStatusCode);
    }
    return obj;
  },

  create(
    base?: DeepPartial<OpenBankingBankDetailsV2_BankDetail>,
  ): OpenBankingBankDetailsV2_BankDetail {
    return OpenBankingBankDetailsV2_BankDetail.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<OpenBankingBankDetailsV2_BankDetail>,
  ): OpenBankingBankDetailsV2_BankDetail {
    const message = createBaseOpenBankingBankDetailsV2_BankDetail();
    message.bankName = object.bankName ?? '';
    message.displayDetails =
      object.displayDetails !== undefined && object.displayDetails !== null
        ? OpenBankingBankDetailsV2_DisplayDetails.fromPartial(object.displayDetails)
        : undefined;
    message.truelayerDetails =
      object.truelayerDetails !== undefined && object.truelayerDetails !== null
        ? OpenBankingBankDetailsV2_TruelayerDetails.fromPartial(object.truelayerDetails)
        : undefined;
    message.bankAvailabilityStatusCode = object.bankAvailabilityStatusCode ?? 0;
    message.bankAvailabilityForBuysStatusCode = object.bankAvailabilityForBuysStatusCode ?? 0;
    return message;
  },
};

function createBaseLoadShedRules(): LoadShedRules {
  return { albs: [] };
}

export const LoadShedRules = {
  encode(message: LoadShedRules, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.albs) {
      LoadShedRules_ApplicationLoadBalancer.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadShedRules {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadShedRules();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.albs.push(LoadShedRules_ApplicationLoadBalancer.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LoadShedRules {
    return {
      albs: globalThis.Array.isArray(object?.albs)
        ? object.albs.map((e: any) => LoadShedRules_ApplicationLoadBalancer.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LoadShedRules): unknown {
    const obj: any = {};
    if (message.albs?.length) {
      obj.albs = message.albs.map((e) => LoadShedRules_ApplicationLoadBalancer.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<LoadShedRules>): LoadShedRules {
    return LoadShedRules.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<LoadShedRules>): LoadShedRules {
    const message = createBaseLoadShedRules();
    message.albs =
      object.albs?.map((e) => LoadShedRules_ApplicationLoadBalancer.fromPartial(e)) || [];
    return message;
  },
};

function createBaseLoadShedRules_ApplicationLoadBalancer(): LoadShedRules_ApplicationLoadBalancer {
  return { name: '', tgs: [] };
}

export const LoadShedRules_ApplicationLoadBalancer = {
  encode(
    message: LoadShedRules_ApplicationLoadBalancer,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.tgs) {
      LoadShedRules_ApplicationLoadBalancer_TargetGroup.encode(
        v!,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoadShedRules_ApplicationLoadBalancer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadShedRules_ApplicationLoadBalancer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.tgs.push(
            LoadShedRules_ApplicationLoadBalancer_TargetGroup.decode(reader, reader.uint32()),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LoadShedRules_ApplicationLoadBalancer {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      tgs: globalThis.Array.isArray(object?.tgs)
        ? object.tgs.map((e: any) => LoadShedRules_ApplicationLoadBalancer_TargetGroup.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LoadShedRules_ApplicationLoadBalancer): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.tgs?.length) {
      obj.tgs = message.tgs.map((e) => LoadShedRules_ApplicationLoadBalancer_TargetGroup.toJSON(e));
    }
    return obj;
  },

  create(
    base?: DeepPartial<LoadShedRules_ApplicationLoadBalancer>,
  ): LoadShedRules_ApplicationLoadBalancer {
    return LoadShedRules_ApplicationLoadBalancer.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<LoadShedRules_ApplicationLoadBalancer>,
  ): LoadShedRules_ApplicationLoadBalancer {
    const message = createBaseLoadShedRules_ApplicationLoadBalancer();
    message.name = object.name ?? '';
    message.tgs =
      object.tgs?.map((e) => LoadShedRules_ApplicationLoadBalancer_TargetGroup.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseLoadShedRules_ApplicationLoadBalancer_TargetGroup(): LoadShedRules_ApplicationLoadBalancer_TargetGroup {
  return { name: '', rules: [] };
}

export const LoadShedRules_ApplicationLoadBalancer_TargetGroup = {
  encode(
    message: LoadShedRules_ApplicationLoadBalancer_TargetGroup,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.rules) {
      LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule.encode(
        v!,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): LoadShedRules_ApplicationLoadBalancer_TargetGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadShedRules_ApplicationLoadBalancer_TargetGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.rules.push(
            LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule.decode(reader, reader.uint32()),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LoadShedRules_ApplicationLoadBalancer_TargetGroup {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      rules: globalThis.Array.isArray(object?.rules)
        ? object.rules.map((e: any) =>
            LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule.fromJSON(e),
          )
        : [],
    };
  },

  toJSON(message: LoadShedRules_ApplicationLoadBalancer_TargetGroup): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.rules?.length) {
      obj.rules = message.rules.map((e) =>
        LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule.toJSON(e),
      );
    }
    return obj;
  },

  create(
    base?: DeepPartial<LoadShedRules_ApplicationLoadBalancer_TargetGroup>,
  ): LoadShedRules_ApplicationLoadBalancer_TargetGroup {
    return LoadShedRules_ApplicationLoadBalancer_TargetGroup.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<LoadShedRules_ApplicationLoadBalancer_TargetGroup>,
  ): LoadShedRules_ApplicationLoadBalancer_TargetGroup {
    const message = createBaseLoadShedRules_ApplicationLoadBalancer_TargetGroup();
    message.name = object.name ?? '';
    message.rules =
      object.rules?.map((e) =>
        LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule.fromPartial(e),
      ) || [];
    return message;
  },
};

function createBaseLoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule(): LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule {
  return {
    pattern: '',
    callerService: '',
    requestMethod: '',
    exactLoadShedding: 0,
    monitorId: 0,
    delta: 0,
    period: undefined,
    maxLoadShedding: 0,
    dryRun: false,
  };
}

export const LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule = {
  encode(
    message: LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.pattern !== '') {
      writer.uint32(10).string(message.pattern);
    }
    if (message.callerService !== '') {
      writer.uint32(18).string(message.callerService);
    }
    if (message.requestMethod !== '') {
      writer.uint32(26).string(message.requestMethod);
    }
    if (message.exactLoadShedding !== 0) {
      writer.uint32(32).uint32(message.exactLoadShedding);
    }
    if (message.monitorId !== 0) {
      writer.uint32(40).uint32(message.monitorId);
    }
    if (message.delta !== 0) {
      writer.uint32(48).uint32(message.delta);
    }
    if (message.period !== undefined) {
      Duration.encode(message.period, writer.uint32(58).fork()).ldelim();
    }
    if (message.maxLoadShedding !== 0) {
      writer.uint32(64).uint32(message.maxLoadShedding);
    }
    if (message.dryRun === true) {
      writer.uint32(72).bool(message.dryRun);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pattern = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.callerService = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.requestMethod = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.exactLoadShedding = reader.uint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.monitorId = reader.uint32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.delta = reader.uint32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.period = Duration.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.maxLoadShedding = reader.uint32();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.dryRun = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule {
    return {
      pattern: isSet(object.pattern) ? globalThis.String(object.pattern) : '',
      callerService: isSet(object.callerService) ? globalThis.String(object.callerService) : '',
      requestMethod: isSet(object.requestMethod) ? globalThis.String(object.requestMethod) : '',
      exactLoadShedding: isSet(object.exactLoadShedding)
        ? globalThis.Number(object.exactLoadShedding)
        : 0,
      monitorId: isSet(object.monitorId) ? globalThis.Number(object.monitorId) : 0,
      delta: isSet(object.delta) ? globalThis.Number(object.delta) : 0,
      period: isSet(object.period) ? Duration.fromJSON(object.period) : undefined,
      maxLoadShedding: isSet(object.maxLoadShedding)
        ? globalThis.Number(object.maxLoadShedding)
        : 0,
      dryRun: isSet(object.dryRun) ? globalThis.Boolean(object.dryRun) : false,
    };
  },

  toJSON(message: LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule): unknown {
    const obj: any = {};
    if (message.pattern !== '') {
      obj.pattern = message.pattern;
    }
    if (message.callerService !== '') {
      obj.callerService = message.callerService;
    }
    if (message.requestMethod !== '') {
      obj.requestMethod = message.requestMethod;
    }
    if (message.exactLoadShedding !== 0) {
      obj.exactLoadShedding = Math.round(message.exactLoadShedding);
    }
    if (message.monitorId !== 0) {
      obj.monitorId = Math.round(message.monitorId);
    }
    if (message.delta !== 0) {
      obj.delta = Math.round(message.delta);
    }
    if (message.period !== undefined) {
      obj.period = Duration.toJSON(message.period);
    }
    if (message.maxLoadShedding !== 0) {
      obj.maxLoadShedding = Math.round(message.maxLoadShedding);
    }
    if (message.dryRun === true) {
      obj.dryRun = message.dryRun;
    }
    return obj;
  },

  create(
    base?: DeepPartial<LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule>,
  ): LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule {
    return LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule>,
  ): LoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule {
    const message = createBaseLoadShedRules_ApplicationLoadBalancer_TargetGroup_Rule();
    message.pattern = object.pattern ?? '';
    message.callerService = object.callerService ?? '';
    message.requestMethod = object.requestMethod ?? '';
    message.exactLoadShedding = object.exactLoadShedding ?? 0;
    message.monitorId = object.monitorId ?? 0;
    message.delta = object.delta ?? 0;
    message.period =
      object.period !== undefined && object.period !== null
        ? Duration.fromPartial(object.period)
        : undefined;
    message.maxLoadShedding = object.maxLoadShedding ?? 0;
    message.dryRun = object.dryRun ?? false;
    return message;
  },
};

function createBaseHorusConfig(): HorusConfig {
  return { expWeight: 0, v1Weight: 0, v2Weight: 0, printDiff: false };
}

export const HorusConfig = {
  encode(message: HorusConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.expWeight !== 0) {
      writer.uint32(8).uint32(message.expWeight);
    }
    if (message.v1Weight !== 0) {
      writer.uint32(16).uint32(message.v1Weight);
    }
    if (message.v2Weight !== 0) {
      writer.uint32(24).uint32(message.v2Weight);
    }
    if (message.printDiff === true) {
      writer.uint32(32).bool(message.printDiff);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HorusConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHorusConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.expWeight = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.v1Weight = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.v2Weight = reader.uint32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.printDiff = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HorusConfig {
    return {
      expWeight: isSet(object.expWeight) ? globalThis.Number(object.expWeight) : 0,
      v1Weight: isSet(object.v1Weight) ? globalThis.Number(object.v1Weight) : 0,
      v2Weight: isSet(object.v2Weight) ? globalThis.Number(object.v2Weight) : 0,
      printDiff: isSet(object.printDiff) ? globalThis.Boolean(object.printDiff) : false,
    };
  },

  toJSON(message: HorusConfig): unknown {
    const obj: any = {};
    if (message.expWeight !== 0) {
      obj.expWeight = Math.round(message.expWeight);
    }
    if (message.v1Weight !== 0) {
      obj.v1Weight = Math.round(message.v1Weight);
    }
    if (message.v2Weight !== 0) {
      obj.v2Weight = Math.round(message.v2Weight);
    }
    if (message.printDiff === true) {
      obj.printDiff = message.printDiff;
    }
    return obj;
  },

  create(base?: DeepPartial<HorusConfig>): HorusConfig {
    return HorusConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<HorusConfig>): HorusConfig {
    const message = createBaseHorusConfig();
    message.expWeight = object.expWeight ?? 0;
    message.v1Weight = object.v1Weight ?? 0;
    message.v2Weight = object.v2Weight ?? 0;
    message.printDiff = object.printDiff ?? false;
    return message;
  },
};

function createBaseCloudKillSwitchConfig(): CloudKillSwitchConfig {
  return { protocolDetails: undefined };
}

export const CloudKillSwitchConfig = {
  encode(message: CloudKillSwitchConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.protocolDetails !== undefined) {
      CloudKillSwitchConfig_ProtocolDetails.encode(
        message.protocolDetails,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CloudKillSwitchConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCloudKillSwitchConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocolDetails = CloudKillSwitchConfig_ProtocolDetails.decode(
            reader,
            reader.uint32(),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CloudKillSwitchConfig {
    return {
      protocolDetails: isSet(object.protocolDetails)
        ? CloudKillSwitchConfig_ProtocolDetails.fromJSON(object.protocolDetails)
        : undefined,
    };
  },

  toJSON(message: CloudKillSwitchConfig): unknown {
    const obj: any = {};
    if (message.protocolDetails !== undefined) {
      obj.protocolDetails = CloudKillSwitchConfig_ProtocolDetails.toJSON(message.protocolDetails);
    }
    return obj;
  },

  create(base?: DeepPartial<CloudKillSwitchConfig>): CloudKillSwitchConfig {
    return CloudKillSwitchConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CloudKillSwitchConfig>): CloudKillSwitchConfig {
    const message = createBaseCloudKillSwitchConfig();
    message.protocolDetails =
      object.protocolDetails !== undefined && object.protocolDetails !== null
        ? CloudKillSwitchConfig_ProtocolDetails.fromPartial(object.protocolDetails)
        : undefined;
    return message;
  },
};

function createBaseCloudKillSwitchConfig_ProtocolDetails(): CloudKillSwitchConfig_ProtocolDetails {
  return { killSwitch: false, networkDetails: {} };
}

export const CloudKillSwitchConfig_ProtocolDetails = {
  encode(
    message: CloudKillSwitchConfig_ProtocolDetails,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.killSwitch === true) {
      writer.uint32(8).bool(message.killSwitch);
    }
    Object.entries(message.networkDetails).forEach(([key, value]) => {
      CloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork(),
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CloudKillSwitchConfig_ProtocolDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCloudKillSwitchConfig_ProtocolDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.killSwitch = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = CloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry.decode(
            reader,
            reader.uint32(),
          );
          if (entry2.value !== undefined) {
            message.networkDetails[entry2.key] = entry2.value;
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

  fromJSON(object: any): CloudKillSwitchConfig_ProtocolDetails {
    return {
      killSwitch: isSet(object.killSwitch) ? globalThis.Boolean(object.killSwitch) : false,
      networkDetails: isObject(object.networkDetails)
        ? Object.entries(object.networkDetails).reduce<{
            [key: string]: CloudKillSwitchConfig_ProtocolDetails_NetworkDetails;
          }>((acc, [key, value]) => {
            acc[key] = CloudKillSwitchConfig_ProtocolDetails_NetworkDetails.fromJSON(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: CloudKillSwitchConfig_ProtocolDetails): unknown {
    const obj: any = {};
    if (message.killSwitch === true) {
      obj.killSwitch = message.killSwitch;
    }
    if (message.networkDetails) {
      const entries = Object.entries(message.networkDetails);
      if (entries.length > 0) {
        obj.networkDetails = {};
        entries.forEach(([k, v]) => {
          obj.networkDetails[k] = CloudKillSwitchConfig_ProtocolDetails_NetworkDetails.toJSON(v);
        });
      }
    }
    return obj;
  },

  create(
    base?: DeepPartial<CloudKillSwitchConfig_ProtocolDetails>,
  ): CloudKillSwitchConfig_ProtocolDetails {
    return CloudKillSwitchConfig_ProtocolDetails.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<CloudKillSwitchConfig_ProtocolDetails>,
  ): CloudKillSwitchConfig_ProtocolDetails {
    const message = createBaseCloudKillSwitchConfig_ProtocolDetails();
    message.killSwitch = object.killSwitch ?? false;
    message.networkDetails = Object.entries(object.networkDetails ?? {}).reduce<{
      [key: string]: CloudKillSwitchConfig_ProtocolDetails_NetworkDetails;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = CloudKillSwitchConfig_ProtocolDetails_NetworkDetails.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseCloudKillSwitchConfig_ProtocolDetails_NetworkDetails(): CloudKillSwitchConfig_ProtocolDetails_NetworkDetails {
  return { killSwitch: false, actionDetails: {} };
}

export const CloudKillSwitchConfig_ProtocolDetails_NetworkDetails = {
  encode(
    message: CloudKillSwitchConfig_ProtocolDetails_NetworkDetails,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.killSwitch === true) {
      writer.uint32(8).bool(message.killSwitch);
    }
    Object.entries(message.actionDetails).forEach(([key, value]) => {
      CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork(),
      ).ldelim();
    });
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): CloudKillSwitchConfig_ProtocolDetails_NetworkDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCloudKillSwitchConfig_ProtocolDetails_NetworkDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.killSwitch = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 =
            CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry.decode(
              reader,
              reader.uint32(),
            );
          if (entry2.value !== undefined) {
            message.actionDetails[entry2.key] = entry2.value;
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

  fromJSON(object: any): CloudKillSwitchConfig_ProtocolDetails_NetworkDetails {
    return {
      killSwitch: isSet(object.killSwitch) ? globalThis.Boolean(object.killSwitch) : false,
      actionDetails: isObject(object.actionDetails)
        ? Object.entries(object.actionDetails).reduce<{
            [key: string]: CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails;
          }>((acc, [key, value]) => {
            acc[key] =
              CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails.fromJSON(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: CloudKillSwitchConfig_ProtocolDetails_NetworkDetails): unknown {
    const obj: any = {};
    if (message.killSwitch === true) {
      obj.killSwitch = message.killSwitch;
    }
    if (message.actionDetails) {
      const entries = Object.entries(message.actionDetails);
      if (entries.length > 0) {
        obj.actionDetails = {};
        entries.forEach(([k, v]) => {
          obj.actionDetails[k] =
            CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails.toJSON(v);
        });
      }
    }
    return obj;
  },

  create(
    base?: DeepPartial<CloudKillSwitchConfig_ProtocolDetails_NetworkDetails>,
  ): CloudKillSwitchConfig_ProtocolDetails_NetworkDetails {
    return CloudKillSwitchConfig_ProtocolDetails_NetworkDetails.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<CloudKillSwitchConfig_ProtocolDetails_NetworkDetails>,
  ): CloudKillSwitchConfig_ProtocolDetails_NetworkDetails {
    const message = createBaseCloudKillSwitchConfig_ProtocolDetails_NetworkDetails();
    message.killSwitch = object.killSwitch ?? false;
    message.actionDetails = Object.entries(object.actionDetails ?? {}).reduce<{
      [key: string]: CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] =
          CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseCloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails(): CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails {
  return { killSwitch: false };
}

export const CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails = {
  encode(
    message: CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.killSwitch === true) {
      writer.uint32(8).bool(message.killSwitch);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.killSwitch = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails {
    return { killSwitch: isSet(object.killSwitch) ? globalThis.Boolean(object.killSwitch) : false };
  },

  toJSON(message: CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails): unknown {
    const obj: any = {};
    if (message.killSwitch === true) {
      obj.killSwitch = message.killSwitch;
    }
    return obj;
  },

  create(
    base?: DeepPartial<CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails>,
  ): CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails {
    return CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails.fromPartial(
      base ?? {},
    );
  },
  fromPartial(
    object: DeepPartial<CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails>,
  ): CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails {
    const message = createBaseCloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails();
    message.killSwitch = object.killSwitch ?? false;
    return message;
  },
};

function createBaseCloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry(): CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry {
  return { key: '', value: undefined };
}

export const CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry = {
  encode(
    message: CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails.encode(
        message.value,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message =
      createBaseCloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry();
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

          message.value = CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails.decode(
            reader,
            reader.uint32(),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : '',
      value: isSet(object.value)
        ? CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(
    message: CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry,
  ): unknown {
    const obj: any = {};
    if (message.key !== '') {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails.toJSON(
        message.value,
      );
    }
    return obj;
  },

  create(
    base?: DeepPartial<CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry>,
  ): CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry {
    return CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry.fromPartial(
      base ?? {},
    );
  },
  fromPartial(
    object: DeepPartial<CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry>,
  ): CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry {
    const message =
      createBaseCloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetailsEntry();
    message.key = object.key ?? '';
    message.value =
      object.value !== undefined && object.value !== null
        ? CloudKillSwitchConfig_ProtocolDetails_NetworkDetails_ActionDetails.fromPartial(
            object.value,
          )
        : undefined;
    return message;
  },
};

function createBaseCloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry(): CloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry {
  return { key: '', value: undefined };
}

export const CloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry = {
  encode(
    message: CloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      CloudKillSwitchConfig_ProtocolDetails_NetworkDetails.encode(
        message.value,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): CloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry();
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

          message.value = CloudKillSwitchConfig_ProtocolDetails_NetworkDetails.decode(
            reader,
            reader.uint32(),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : '',
      value: isSet(object.value)
        ? CloudKillSwitchConfig_ProtocolDetails_NetworkDetails.fromJSON(object.value)
        : undefined,
    };
  },

  toJSON(message: CloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry): unknown {
    const obj: any = {};
    if (message.key !== '') {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = CloudKillSwitchConfig_ProtocolDetails_NetworkDetails.toJSON(message.value);
    }
    return obj;
  },

  create(
    base?: DeepPartial<CloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry>,
  ): CloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry {
    return CloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<CloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry>,
  ): CloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry {
    const message = createBaseCloudKillSwitchConfig_ProtocolDetails_NetworkDetailsEntry();
    message.key = object.key ?? '';
    message.value =
      object.value !== undefined && object.value !== null
        ? CloudKillSwitchConfig_ProtocolDetails_NetworkDetails.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseRiskCheckConfig(): RiskCheckConfig {
  return {
    riskCheck: 0,
    exemptionRuleNull: undefined,
    kytExemptionRule: undefined,
    urmExemptionRule: undefined,
  };
}

export const RiskCheckConfig = {
  encode(message: RiskCheckConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.riskCheck !== 0) {
      writer.uint32(8).int32(message.riskCheck);
    }
    if (message.exemptionRuleNull !== undefined) {
      writer.uint32(16).bool(message.exemptionRuleNull);
    }
    if (message.kytExemptionRule !== undefined) {
      RiskCheckConfig_KytExemptionRule.encode(
        message.kytExemptionRule,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    if (message.urmExemptionRule !== undefined) {
      RiskCheckConfig_UrmExemptionRule.encode(
        message.urmExemptionRule,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RiskCheckConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRiskCheckConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.riskCheck = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.exemptionRuleNull = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.kytExemptionRule = RiskCheckConfig_KytExemptionRule.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.urmExemptionRule = RiskCheckConfig_UrmExemptionRule.decode(
            reader,
            reader.uint32(),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RiskCheckConfig {
    return {
      riskCheck: isSet(object.riskCheck) ? riskCheckConfig_RiskCheckFromJSON(object.riskCheck) : 0,
      exemptionRuleNull: isSet(object.exemptionRuleNull)
        ? globalThis.Boolean(object.exemptionRuleNull)
        : undefined,
      kytExemptionRule: isSet(object.kytExemptionRule)
        ? RiskCheckConfig_KytExemptionRule.fromJSON(object.kytExemptionRule)
        : undefined,
      urmExemptionRule: isSet(object.urmExemptionRule)
        ? RiskCheckConfig_UrmExemptionRule.fromJSON(object.urmExemptionRule)
        : undefined,
    };
  },

  toJSON(message: RiskCheckConfig): unknown {
    const obj: any = {};
    if (message.riskCheck !== 0) {
      obj.riskCheck = riskCheckConfig_RiskCheckToJSON(message.riskCheck);
    }
    if (message.exemptionRuleNull !== undefined) {
      obj.exemptionRuleNull = message.exemptionRuleNull;
    }
    if (message.kytExemptionRule !== undefined) {
      obj.kytExemptionRule = RiskCheckConfig_KytExemptionRule.toJSON(message.kytExemptionRule);
    }
    if (message.urmExemptionRule !== undefined) {
      obj.urmExemptionRule = RiskCheckConfig_UrmExemptionRule.toJSON(message.urmExemptionRule);
    }
    return obj;
  },

  create(base?: DeepPartial<RiskCheckConfig>): RiskCheckConfig {
    return RiskCheckConfig.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<RiskCheckConfig>): RiskCheckConfig {
    const message = createBaseRiskCheckConfig();
    message.riskCheck = object.riskCheck ?? 0;
    message.exemptionRuleNull = object.exemptionRuleNull ?? undefined;
    message.kytExemptionRule =
      object.kytExemptionRule !== undefined && object.kytExemptionRule !== null
        ? RiskCheckConfig_KytExemptionRule.fromPartial(object.kytExemptionRule)
        : undefined;
    message.urmExemptionRule =
      object.urmExemptionRule !== undefined && object.urmExemptionRule !== null
        ? RiskCheckConfig_UrmExemptionRule.fromPartial(object.urmExemptionRule)
        : undefined;
    return message;
  },
};

function createBaseRiskCheckConfig_KytExemptionRule(): RiskCheckConfig_KytExemptionRule {
  return { userIds: [], addresses: [], userAddressPair: [] };
}

export const RiskCheckConfig_KytExemptionRule = {
  encode(
    message: RiskCheckConfig_KytExemptionRule,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.userIds) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.addresses) {
      writer.uint32(18).string(v!);
    }
    for (const v of message.userAddressPair) {
      RiskCheckConfig_KytExemptionRule_UserAddressPair.encode(
        v!,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RiskCheckConfig_KytExemptionRule {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRiskCheckConfig_KytExemptionRule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userIds.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.addresses.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.userAddressPair.push(
            RiskCheckConfig_KytExemptionRule_UserAddressPair.decode(reader, reader.uint32()),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RiskCheckConfig_KytExemptionRule {
    return {
      userIds: globalThis.Array.isArray(object?.userIds)
        ? object.userIds.map((e: any) => globalThis.String(e))
        : [],
      addresses: globalThis.Array.isArray(object?.addresses)
        ? object.addresses.map((e: any) => globalThis.String(e))
        : [],
      userAddressPair: globalThis.Array.isArray(object?.userAddressPair)
        ? object.userAddressPair.map((e: any) =>
            RiskCheckConfig_KytExemptionRule_UserAddressPair.fromJSON(e),
          )
        : [],
    };
  },

  toJSON(message: RiskCheckConfig_KytExemptionRule): unknown {
    const obj: any = {};
    if (message.userIds?.length) {
      obj.userIds = message.userIds;
    }
    if (message.addresses?.length) {
      obj.addresses = message.addresses;
    }
    if (message.userAddressPair?.length) {
      obj.userAddressPair = message.userAddressPair.map((e) =>
        RiskCheckConfig_KytExemptionRule_UserAddressPair.toJSON(e),
      );
    }
    return obj;
  },

  create(base?: DeepPartial<RiskCheckConfig_KytExemptionRule>): RiskCheckConfig_KytExemptionRule {
    return RiskCheckConfig_KytExemptionRule.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<RiskCheckConfig_KytExemptionRule>,
  ): RiskCheckConfig_KytExemptionRule {
    const message = createBaseRiskCheckConfig_KytExemptionRule();
    message.userIds = object.userIds?.map((e) => e) || [];
    message.addresses = object.addresses?.map((e) => e) || [];
    message.userAddressPair =
      object.userAddressPair?.map((e) =>
        RiskCheckConfig_KytExemptionRule_UserAddressPair.fromPartial(e),
      ) || [];
    return message;
  },
};

function createBaseRiskCheckConfig_KytExemptionRule_UserAddressPair(): RiskCheckConfig_KytExemptionRule_UserAddressPair {
  return { userId: '', address: '' };
}

export const RiskCheckConfig_KytExemptionRule_UserAddressPair = {
  encode(
    message: RiskCheckConfig_KytExemptionRule_UserAddressPair,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.userId !== '') {
      writer.uint32(10).string(message.userId);
    }
    if (message.address !== '') {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RiskCheckConfig_KytExemptionRule_UserAddressPair {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRiskCheckConfig_KytExemptionRule_UserAddressPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RiskCheckConfig_KytExemptionRule_UserAddressPair {
    return {
      userId: isSet(object.userId) ? globalThis.String(object.userId) : '',
      address: isSet(object.address) ? globalThis.String(object.address) : '',
    };
  },

  toJSON(message: RiskCheckConfig_KytExemptionRule_UserAddressPair): unknown {
    const obj: any = {};
    if (message.userId !== '') {
      obj.userId = message.userId;
    }
    if (message.address !== '') {
      obj.address = message.address;
    }
    return obj;
  },

  create(
    base?: DeepPartial<RiskCheckConfig_KytExemptionRule_UserAddressPair>,
  ): RiskCheckConfig_KytExemptionRule_UserAddressPair {
    return RiskCheckConfig_KytExemptionRule_UserAddressPair.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<RiskCheckConfig_KytExemptionRule_UserAddressPair>,
  ): RiskCheckConfig_KytExemptionRule_UserAddressPair {
    const message = createBaseRiskCheckConfig_KytExemptionRule_UserAddressPair();
    message.userId = object.userId ?? '';
    message.address = object.address ?? '';
    return message;
  },
};

function createBaseRiskCheckConfig_UrmExemptionRule(): RiskCheckConfig_UrmExemptionRule {
  return { userIds: [] };
}

export const RiskCheckConfig_UrmExemptionRule = {
  encode(
    message: RiskCheckConfig_UrmExemptionRule,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.userIds) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RiskCheckConfig_UrmExemptionRule {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRiskCheckConfig_UrmExemptionRule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userIds.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RiskCheckConfig_UrmExemptionRule {
    return {
      userIds: globalThis.Array.isArray(object?.userIds)
        ? object.userIds.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: RiskCheckConfig_UrmExemptionRule): unknown {
    const obj: any = {};
    if (message.userIds?.length) {
      obj.userIds = message.userIds;
    }
    return obj;
  },

  create(base?: DeepPartial<RiskCheckConfig_UrmExemptionRule>): RiskCheckConfig_UrmExemptionRule {
    return RiskCheckConfig_UrmExemptionRule.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<RiskCheckConfig_UrmExemptionRule>,
  ): RiskCheckConfig_UrmExemptionRule {
    const message = createBaseRiskCheckConfig_UrmExemptionRule();
    message.userIds = object.userIds?.map((e) => e) || [];
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, 'base64'));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString('base64');
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(''));
  }
}

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
