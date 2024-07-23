/* eslint-disable */
import type { CallContext, CallOptions } from 'nice-grpc-common';
import _m0 from 'protobufjs/minimal';
import { Timestamp } from '../../google/protobuf/timestamp';
import {
  Account,
  Environment,
  environmentFromJSON,
  environmentToJSON,
  Namespace,
  Parameter,
  ParameterBody,
  ParameterID,
  ParameterIDAndVersion,
  Scope,
  ScopeID,
  UnencryptedSecret,
} from './resources';

export const protobufPackage = 'coinbase.config';

export interface Empty {}

export interface PingResponse {
  /**
   * id is a unique id that is generated when the server instance is
   * initialized.
   */
  id: string;
  /** update is how long the server instance has been up for. */
  uptime: string;
  /** version is the git sha used to build the server. */
  version: string;
  /** multiaccount announces if the server can accept multiaccount requests. */
  multiaccount: boolean;
  /** transport is the transport used by this server. */
  transport: PingResponse_TransportMode;
  /**
   * authrity is the :authority pseudo header of the grpc request. This is
   * only available when using the grpc transport.
   */
  authority: string;
  /** runtime_version is the version of the Go runtime used to build the server. */
  runtimeVersion: string;
}

export enum PingResponse_TransportMode {
  UNKNOWN = 0,
  GRPC = 1,
  HTTP = 2,
  UNRECOGNIZED = -1,
}

export function pingResponse_TransportModeFromJSON(object: any): PingResponse_TransportMode {
  switch (object) {
    case 0:
    case 'UNKNOWN':
      return PingResponse_TransportMode.UNKNOWN;
    case 1:
    case 'GRPC':
      return PingResponse_TransportMode.GRPC;
    case 2:
    case 'HTTP':
      return PingResponse_TransportMode.HTTP;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return PingResponse_TransportMode.UNRECOGNIZED;
  }
}

export function pingResponse_TransportModeToJSON(object: PingResponse_TransportMode): string {
  switch (object) {
    case PingResponse_TransportMode.UNKNOWN:
      return 'UNKNOWN';
    case PingResponse_TransportMode.GRPC:
      return 'GRPC';
    case PingResponse_TransportMode.HTTP:
      return 'HTTP';
    case PingResponse_TransportMode.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export interface AccountsResponse {
  namespaces: Account[];
}

export interface ScopesRequest {
  /** The environment for the scopes. Either use this or namespace. */
  env: Environment;
  key: LastEvaluatedKey | undefined;
  search: string;
  /** The namespace of the scopes. Either use this or env. */
  namespace: Namespace | undefined;
}

export interface LastEvaluatedKey {
  attributes: { [key: string]: string };
}

export interface LastEvaluatedKey_AttributesEntry {
  key: string;
  value: string;
}

export interface ScopesResponse {
  scopes: Scope[];
  key: LastEvaluatedKey | undefined;
}

export interface PendingScopesRequest {
  /** The environment for the scopes. Either use this or namespace. */
  env: Environment;
  key: LastEvaluatedKey | undefined;
  /** The namespace of the scopes. Either use this or env. */
  namespace: Namespace | undefined;
}

export interface PendingScopesResponse {
  scopes: Scope[];
  key: LastEvaluatedKey | undefined;
}

export interface GetScopeHistoryRequestWithPagination {
  scopeId: ScopeID | undefined;
  key: LastEvaluatedKey | undefined;
}

export interface ScopeHistoryResponse {
  scopeId: ScopeID | undefined;
  scopes: Scope[];
  key: LastEvaluatedKey | undefined;
}

/** Search within a scope for parameters containing a certain string match. */
export interface SearchRequest {
  /** Scope to search in. */
  scopeId: ScopeID | undefined;
  /** String to match against the parameter names. */
  search: string;
  /**
   * For multiple pages of data, this is the last evaluated key from the
   * previous response.
   */
  key: LastEvaluatedKey | undefined;
}

/** List of parameters returned from a Search. */
export interface SearchResponse {
  /** All parameters returned. */
  responses: Parameter[];
  /** If multiple pages of data, this key should be sent on the next page. */
  key: LastEvaluatedKey | undefined;
}

/** Request all parameters within a scope. */
export interface GetAllParametersRequestWithPagination {
  /** The scope to return. */
  scopeId: ScopeID | undefined;
  /** Pass this key from the response to list all parameters in the next page. */
  key: LastEvaluatedKey | undefined;
}

/** The response containing a list of parameters. */
export interface AllParametersResponse {
  /** All parameters returned in this response. */
  responses: Parameter[];
  /**
   * If this exists, there are more parameters available and client should
   * make another request to pull the next page of parameters.
   */
  key: LastEvaluatedKey | undefined;
}

export interface PendingParametersRequest {
  scopeId: ScopeID | undefined;
  key: LastEvaluatedKey | undefined;
}

export interface PendingParametersResponse {
  parameters: Parameter[];
  key: LastEvaluatedKey | undefined;
}

export interface GetParametersChangedRequest {
  scopeId: ScopeID | undefined;
  /**
   * Deprecated. To be deleted once all clients migrated to latest_version.
   * Client supplied timestamps could be out of sync with the server.
   */
  timestamp: Date | undefined;
  lastEvaluatedKey: LastEvaluatedKey | undefined;
  latestVersion: string;
  /**
   * Maximum version seen by the client, used in conjunction with last_evaluated_key
   * in order to find a new latest version in a large scope during a refresh.
   */
  maxVersion: string;
}

export interface GetParametersChangedResponse {
  parameters: Parameter[];
  lastEvaluatedKey: LastEvaluatedKey | undefined;
  latestVersion: string;
}

export interface GetHistoryRequestWithPagination {
  parameterId: ParameterID | undefined;
  key: LastEvaluatedKey | undefined;
}

export interface ParameterHistoryResponse {
  id: ParameterID | undefined;
  versions: Parameter[];
  key: LastEvaluatedKey | undefined;
}

export interface CreateRequest {
  id: ParameterID | undefined;
  body: ParameterBody | undefined;
  author: string;
  note: string;
  delegatedAuthor: string;
}

export interface UpdateRequest {
  id: ParameterID | undefined;
  body: ParameterBody | undefined;
  author: string;
  expectedVersion: string;
  note: string;
  delegatedAuthor: string;
}

export interface DeleteRequest {
  id: ParameterID | undefined;
  author: string;
  delegatedAuthor: string;
  expectedVersion: string;
}

/** Returned for parameter create and updates. */
export interface ModifyResponse {
  /** Did this fail? */
  success: boolean;
  /** Reason enumeration. */
  reason: ModifyResponse_Reason;
  /** The parameter that failed. */
  param: Parameter | undefined;
}

/** Why did this fail? */
export enum ModifyResponse_Reason {
  UNKNOWN = 0,
  VERSION_CONFLICT = 1,
  UNKNOWN_SCOPE = 2,
  UNRECOGNIZED = -1,
}

export function modifyResponse_ReasonFromJSON(object: any): ModifyResponse_Reason {
  switch (object) {
    case 0:
    case 'UNKNOWN':
      return ModifyResponse_Reason.UNKNOWN;
    case 1:
    case 'VERSION_CONFLICT':
      return ModifyResponse_Reason.VERSION_CONFLICT;
    case 2:
    case 'UNKNOWN_SCOPE':
      return ModifyResponse_Reason.UNKNOWN_SCOPE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ModifyResponse_Reason.UNRECOGNIZED;
  }
}

export function modifyResponse_ReasonToJSON(object: ModifyResponse_Reason): string {
  switch (object) {
    case ModifyResponse_Reason.UNKNOWN:
      return 'UNKNOWN';
    case ModifyResponse_Reason.VERSION_CONFLICT:
      return 'VERSION_CONFLICT';
    case ModifyResponse_Reason.UNKNOWN_SCOPE:
      return 'UNKNOWN_SCOPE';
    case ModifyResponse_Reason.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

/** [nodoc] */
export interface CreateScopeRequest {
  scope: Scope | undefined;
  author: string;
}

/** [nodoc] */
export interface UpdateScopeRequest {
  scope: Scope | undefined;
  expectedVersion: string;
  author: string;
}

/** [nodoc] */
export interface DeleteScopeRequest {
  scopeId: ScopeID | undefined;
  expectedVersion: string;
  author: string;
}

/** [nodoc] */
export interface ModifyScopeResponse {
  success: boolean;
  reason: ModifyScopeResponse_Reason;
  scope: Scope | undefined;
}

export enum ModifyScopeResponse_Reason {
  UNKNOWN = 0,
  VERSION_CONFLICT = 1,
  UNKNOWN_SCOPE = 2,
  UNRECOGNIZED = -1,
}

export function modifyScopeResponse_ReasonFromJSON(object: any): ModifyScopeResponse_Reason {
  switch (object) {
    case 0:
    case 'UNKNOWN':
      return ModifyScopeResponse_Reason.UNKNOWN;
    case 1:
    case 'VERSION_CONFLICT':
      return ModifyScopeResponse_Reason.VERSION_CONFLICT;
    case 2:
    case 'UNKNOWN_SCOPE':
      return ModifyScopeResponse_Reason.UNKNOWN_SCOPE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ModifyScopeResponse_Reason.UNRECOGNIZED;
  }
}

export function modifyScopeResponse_ReasonToJSON(object: ModifyScopeResponse_Reason): string {
  switch (object) {
    case ModifyScopeResponse_Reason.UNKNOWN:
      return 'UNKNOWN';
    case ModifyScopeResponse_Reason.VERSION_CONFLICT:
      return 'VERSION_CONFLICT';
    case ModifyScopeResponse_Reason.UNKNOWN_SCOPE:
      return 'UNKNOWN_SCOPE';
    case ModifyScopeResponse_Reason.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

/** [nodoc] */
export interface ModifyPendingScopesRequest {
  requests: ModifyPendingScopeRequest[];
  author: string;
}

/** [nodoc] */
export interface ModifyPendingScopeRequest {
  id: ScopeID | undefined;
  expectedVersion: string;
}

/** [nodoc] */
export interface ModifyPendingScopesResponse {
  success: boolean;
  failures: FailedModifyScopeResponse[];
}

/** [nodoc] */
export interface FailedModifyScopeResponse {
  id: ScopeID | undefined;
  error: string;
}

/** [nodoc] */
export interface SnapshotScopeRequest {
  scopeId: ScopeID | undefined;
}

/** [nodoc] */
export interface SnapshotScopeResponse {
  snapshotUrl: string;
}

/** [nodoc] */
export interface ModifyPendingParameterRequest {
  id: ParameterID | undefined;
  expectedVersion: string;
}

/** [nodoc] */
export interface ModifyPendingParametersRequest {
  parameters: ModifyPendingParameterRequest[];
  author: string;
}

/** [nodoc] */
export interface ModifyPendingParametersResponse {
  success: boolean;
  failures: FailedModifyParameterResponse[];
}

/** [nodoc] */
export interface FailedModifyParameterResponse {
  id: ParameterID | undefined;
  error: string;
}

/** [nodoc] */
export interface ReapplyParameterRequest {
  /** Parameter to reapply as a new version. */
  id: ParameterID | undefined;
  /** Version of that parameter to reapply. */
  version: string;
  /** New author. */
  author: string;
  /** New note. */
  note: string;
}

export interface KnownClientEntity {
  value: number;
  name: string;
}

export interface KnownClientsResponse {
  knownClients: KnownClientEntity[];
}

function createBaseEmpty(): Empty {
  return {};
}

export const Empty = {
  encode(_: Empty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Empty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<Empty>): Empty {
    return Empty.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<Empty>): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

function createBasePingResponse(): PingResponse {
  return {
    id: '',
    uptime: '',
    version: '',
    multiaccount: false,
    transport: 0,
    authority: '',
    runtimeVersion: '',
  };
}

export const PingResponse = {
  encode(message: PingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    if (message.uptime !== '') {
      writer.uint32(18).string(message.uptime);
    }
    if (message.version !== '') {
      writer.uint32(26).string(message.version);
    }
    if (message.multiaccount === true) {
      writer.uint32(32).bool(message.multiaccount);
    }
    if (message.transport !== 0) {
      writer.uint32(40).int32(message.transport);
    }
    if (message.authority !== '') {
      writer.uint32(50).string(message.authority);
    }
    if (message.runtimeVersion !== '') {
      writer.uint32(58).string(message.runtimeVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PingResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePingResponse();
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

          message.uptime = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.version = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.multiaccount = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.transport = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.runtimeVersion = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PingResponse {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : '',
      uptime: isSet(object.uptime) ? globalThis.String(object.uptime) : '',
      version: isSet(object.version) ? globalThis.String(object.version) : '',
      multiaccount: isSet(object.multiaccount) ? globalThis.Boolean(object.multiaccount) : false,
      transport: isSet(object.transport) ? pingResponse_TransportModeFromJSON(object.transport) : 0,
      authority: isSet(object.authority) ? globalThis.String(object.authority) : '',
      runtimeVersion: isSet(object.runtimeVersion) ? globalThis.String(object.runtimeVersion) : '',
    };
  },

  toJSON(message: PingResponse): unknown {
    const obj: any = {};
    if (message.id !== '') {
      obj.id = message.id;
    }
    if (message.uptime !== '') {
      obj.uptime = message.uptime;
    }
    if (message.version !== '') {
      obj.version = message.version;
    }
    if (message.multiaccount === true) {
      obj.multiaccount = message.multiaccount;
    }
    if (message.transport !== 0) {
      obj.transport = pingResponse_TransportModeToJSON(message.transport);
    }
    if (message.authority !== '') {
      obj.authority = message.authority;
    }
    if (message.runtimeVersion !== '') {
      obj.runtimeVersion = message.runtimeVersion;
    }
    return obj;
  },

  create(base?: DeepPartial<PingResponse>): PingResponse {
    return PingResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PingResponse>): PingResponse {
    const message = createBasePingResponse();
    message.id = object.id ?? '';
    message.uptime = object.uptime ?? '';
    message.version = object.version ?? '';
    message.multiaccount = object.multiaccount ?? false;
    message.transport = object.transport ?? 0;
    message.authority = object.authority ?? '';
    message.runtimeVersion = object.runtimeVersion ?? '';
    return message;
  },
};

function createBaseAccountsResponse(): AccountsResponse {
  return { namespaces: [] };
}

export const AccountsResponse = {
  encode(message: AccountsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.namespaces) {
      Account.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AccountsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAccountsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.namespaces.push(Account.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AccountsResponse {
    return {
      namespaces: globalThis.Array.isArray(object?.namespaces)
        ? object.namespaces.map((e: any) => Account.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AccountsResponse): unknown {
    const obj: any = {};
    if (message.namespaces?.length) {
      obj.namespaces = message.namespaces.map((e) => Account.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<AccountsResponse>): AccountsResponse {
    return AccountsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AccountsResponse>): AccountsResponse {
    const message = createBaseAccountsResponse();
    message.namespaces = object.namespaces?.map((e) => Account.fromPartial(e)) || [];
    return message;
  },
};

function createBaseScopesRequest(): ScopesRequest {
  return { env: 0, key: undefined, search: '', namespace: undefined };
}

export const ScopesRequest = {
  encode(message: ScopesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.env !== 0) {
      writer.uint32(8).int32(message.env);
    }
    if (message.key !== undefined) {
      LastEvaluatedKey.encode(message.key, writer.uint32(18).fork()).ldelim();
    }
    if (message.search !== '') {
      writer.uint32(26).string(message.search);
    }
    if (message.namespace !== undefined) {
      Namespace.encode(message.namespace, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScopesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScopesRequest();
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

          message.key = LastEvaluatedKey.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.search = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): ScopesRequest {
    return {
      env: isSet(object.env) ? environmentFromJSON(object.env) : 0,
      key: isSet(object.key) ? LastEvaluatedKey.fromJSON(object.key) : undefined,
      search: isSet(object.search) ? globalThis.String(object.search) : '',
      namespace: isSet(object.namespace) ? Namespace.fromJSON(object.namespace) : undefined,
    };
  },

  toJSON(message: ScopesRequest): unknown {
    const obj: any = {};
    if (message.env !== 0) {
      obj.env = environmentToJSON(message.env);
    }
    if (message.key !== undefined) {
      obj.key = LastEvaluatedKey.toJSON(message.key);
    }
    if (message.search !== '') {
      obj.search = message.search;
    }
    if (message.namespace !== undefined) {
      obj.namespace = Namespace.toJSON(message.namespace);
    }
    return obj;
  },

  create(base?: DeepPartial<ScopesRequest>): ScopesRequest {
    return ScopesRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ScopesRequest>): ScopesRequest {
    const message = createBaseScopesRequest();
    message.env = object.env ?? 0;
    message.key =
      object.key !== undefined && object.key !== null
        ? LastEvaluatedKey.fromPartial(object.key)
        : undefined;
    message.search = object.search ?? '';
    message.namespace =
      object.namespace !== undefined && object.namespace !== null
        ? Namespace.fromPartial(object.namespace)
        : undefined;
    return message;
  },
};

function createBaseLastEvaluatedKey(): LastEvaluatedKey {
  return { attributes: {} };
}

export const LastEvaluatedKey = {
  encode(message: LastEvaluatedKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.attributes).forEach(([key, value]) => {
      LastEvaluatedKey_AttributesEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork(),
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LastEvaluatedKey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLastEvaluatedKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = LastEvaluatedKey_AttributesEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.attributes[entry1.key] = entry1.value;
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

  fromJSON(object: any): LastEvaluatedKey {
    return {
      attributes: isObject(object.attributes)
        ? Object.entries(object.attributes).reduce<{ [key: string]: string }>(
            (acc, [key, value]) => {
              acc[key] = String(value);
              return acc;
            },
            {},
          )
        : {},
    };
  },

  toJSON(message: LastEvaluatedKey): unknown {
    const obj: any = {};
    if (message.attributes) {
      const entries = Object.entries(message.attributes);
      if (entries.length > 0) {
        obj.attributes = {};
        entries.forEach(([k, v]) => {
          obj.attributes[k] = v;
        });
      }
    }
    return obj;
  },

  create(base?: DeepPartial<LastEvaluatedKey>): LastEvaluatedKey {
    return LastEvaluatedKey.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<LastEvaluatedKey>): LastEvaluatedKey {
    const message = createBaseLastEvaluatedKey();
    message.attributes = Object.entries(object.attributes ?? {}).reduce<{ [key: string]: string }>(
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

function createBaseLastEvaluatedKey_AttributesEntry(): LastEvaluatedKey_AttributesEntry {
  return { key: '', value: '' };
}

export const LastEvaluatedKey_AttributesEntry = {
  encode(
    message: LastEvaluatedKey_AttributesEntry,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): LastEvaluatedKey_AttributesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLastEvaluatedKey_AttributesEntry();
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

  fromJSON(object: any): LastEvaluatedKey_AttributesEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : '',
      value: isSet(object.value) ? globalThis.String(object.value) : '',
    };
  },

  toJSON(message: LastEvaluatedKey_AttributesEntry): unknown {
    const obj: any = {};
    if (message.key !== '') {
      obj.key = message.key;
    }
    if (message.value !== '') {
      obj.value = message.value;
    }
    return obj;
  },

  create(base?: DeepPartial<LastEvaluatedKey_AttributesEntry>): LastEvaluatedKey_AttributesEntry {
    return LastEvaluatedKey_AttributesEntry.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<LastEvaluatedKey_AttributesEntry>,
  ): LastEvaluatedKey_AttributesEntry {
    const message = createBaseLastEvaluatedKey_AttributesEntry();
    message.key = object.key ?? '';
    message.value = object.value ?? '';
    return message;
  },
};

function createBaseScopesResponse(): ScopesResponse {
  return { scopes: [], key: undefined };
}

export const ScopesResponse = {
  encode(message: ScopesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.scopes) {
      Scope.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.key !== undefined) {
      LastEvaluatedKey.encode(message.key, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScopesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScopesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.scopes.push(Scope.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = LastEvaluatedKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScopesResponse {
    return {
      scopes: globalThis.Array.isArray(object?.scopes)
        ? object.scopes.map((e: any) => Scope.fromJSON(e))
        : [],
      key: isSet(object.key) ? LastEvaluatedKey.fromJSON(object.key) : undefined,
    };
  },

  toJSON(message: ScopesResponse): unknown {
    const obj: any = {};
    if (message.scopes?.length) {
      obj.scopes = message.scopes.map((e) => Scope.toJSON(e));
    }
    if (message.key !== undefined) {
      obj.key = LastEvaluatedKey.toJSON(message.key);
    }
    return obj;
  },

  create(base?: DeepPartial<ScopesResponse>): ScopesResponse {
    return ScopesResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ScopesResponse>): ScopesResponse {
    const message = createBaseScopesResponse();
    message.scopes = object.scopes?.map((e) => Scope.fromPartial(e)) || [];
    message.key =
      object.key !== undefined && object.key !== null
        ? LastEvaluatedKey.fromPartial(object.key)
        : undefined;
    return message;
  },
};

function createBasePendingScopesRequest(): PendingScopesRequest {
  return { env: 0, key: undefined, namespace: undefined };
}

export const PendingScopesRequest = {
  encode(message: PendingScopesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.env !== 0) {
      writer.uint32(8).int32(message.env);
    }
    if (message.key !== undefined) {
      LastEvaluatedKey.encode(message.key, writer.uint32(18).fork()).ldelim();
    }
    if (message.namespace !== undefined) {
      Namespace.encode(message.namespace, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PendingScopesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePendingScopesRequest();
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

          message.key = LastEvaluatedKey.decode(reader, reader.uint32());
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

  fromJSON(object: any): PendingScopesRequest {
    return {
      env: isSet(object.env) ? environmentFromJSON(object.env) : 0,
      key: isSet(object.key) ? LastEvaluatedKey.fromJSON(object.key) : undefined,
      namespace: isSet(object.namespace) ? Namespace.fromJSON(object.namespace) : undefined,
    };
  },

  toJSON(message: PendingScopesRequest): unknown {
    const obj: any = {};
    if (message.env !== 0) {
      obj.env = environmentToJSON(message.env);
    }
    if (message.key !== undefined) {
      obj.key = LastEvaluatedKey.toJSON(message.key);
    }
    if (message.namespace !== undefined) {
      obj.namespace = Namespace.toJSON(message.namespace);
    }
    return obj;
  },

  create(base?: DeepPartial<PendingScopesRequest>): PendingScopesRequest {
    return PendingScopesRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PendingScopesRequest>): PendingScopesRequest {
    const message = createBasePendingScopesRequest();
    message.env = object.env ?? 0;
    message.key =
      object.key !== undefined && object.key !== null
        ? LastEvaluatedKey.fromPartial(object.key)
        : undefined;
    message.namespace =
      object.namespace !== undefined && object.namespace !== null
        ? Namespace.fromPartial(object.namespace)
        : undefined;
    return message;
  },
};

function createBasePendingScopesResponse(): PendingScopesResponse {
  return { scopes: [], key: undefined };
}

export const PendingScopesResponse = {
  encode(message: PendingScopesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.scopes) {
      Scope.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.key !== undefined) {
      LastEvaluatedKey.encode(message.key, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PendingScopesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePendingScopesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.scopes.push(Scope.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = LastEvaluatedKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PendingScopesResponse {
    return {
      scopes: globalThis.Array.isArray(object?.scopes)
        ? object.scopes.map((e: any) => Scope.fromJSON(e))
        : [],
      key: isSet(object.key) ? LastEvaluatedKey.fromJSON(object.key) : undefined,
    };
  },

  toJSON(message: PendingScopesResponse): unknown {
    const obj: any = {};
    if (message.scopes?.length) {
      obj.scopes = message.scopes.map((e) => Scope.toJSON(e));
    }
    if (message.key !== undefined) {
      obj.key = LastEvaluatedKey.toJSON(message.key);
    }
    return obj;
  },

  create(base?: DeepPartial<PendingScopesResponse>): PendingScopesResponse {
    return PendingScopesResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PendingScopesResponse>): PendingScopesResponse {
    const message = createBasePendingScopesResponse();
    message.scopes = object.scopes?.map((e) => Scope.fromPartial(e)) || [];
    message.key =
      object.key !== undefined && object.key !== null
        ? LastEvaluatedKey.fromPartial(object.key)
        : undefined;
    return message;
  },
};

function createBaseGetScopeHistoryRequestWithPagination(): GetScopeHistoryRequestWithPagination {
  return { scopeId: undefined, key: undefined };
}

export const GetScopeHistoryRequestWithPagination = {
  encode(
    message: GetScopeHistoryRequestWithPagination,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.scopeId !== undefined) {
      ScopeID.encode(message.scopeId, writer.uint32(10).fork()).ldelim();
    }
    if (message.key !== undefined) {
      LastEvaluatedKey.encode(message.key, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetScopeHistoryRequestWithPagination {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetScopeHistoryRequestWithPagination();
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

          message.key = LastEvaluatedKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetScopeHistoryRequestWithPagination {
    return {
      scopeId: isSet(object.scopeId) ? ScopeID.fromJSON(object.scopeId) : undefined,
      key: isSet(object.key) ? LastEvaluatedKey.fromJSON(object.key) : undefined,
    };
  },

  toJSON(message: GetScopeHistoryRequestWithPagination): unknown {
    const obj: any = {};
    if (message.scopeId !== undefined) {
      obj.scopeId = ScopeID.toJSON(message.scopeId);
    }
    if (message.key !== undefined) {
      obj.key = LastEvaluatedKey.toJSON(message.key);
    }
    return obj;
  },

  create(
    base?: DeepPartial<GetScopeHistoryRequestWithPagination>,
  ): GetScopeHistoryRequestWithPagination {
    return GetScopeHistoryRequestWithPagination.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<GetScopeHistoryRequestWithPagination>,
  ): GetScopeHistoryRequestWithPagination {
    const message = createBaseGetScopeHistoryRequestWithPagination();
    message.scopeId =
      object.scopeId !== undefined && object.scopeId !== null
        ? ScopeID.fromPartial(object.scopeId)
        : undefined;
    message.key =
      object.key !== undefined && object.key !== null
        ? LastEvaluatedKey.fromPartial(object.key)
        : undefined;
    return message;
  },
};

function createBaseScopeHistoryResponse(): ScopeHistoryResponse {
  return { scopeId: undefined, scopes: [], key: undefined };
}

export const ScopeHistoryResponse = {
  encode(message: ScopeHistoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scopeId !== undefined) {
      ScopeID.encode(message.scopeId, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.scopes) {
      Scope.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.key !== undefined) {
      LastEvaluatedKey.encode(message.key, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScopeHistoryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScopeHistoryResponse();
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

          message.scopes.push(Scope.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.key = LastEvaluatedKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScopeHistoryResponse {
    return {
      scopeId: isSet(object.scopeId) ? ScopeID.fromJSON(object.scopeId) : undefined,
      scopes: globalThis.Array.isArray(object?.scopes)
        ? object.scopes.map((e: any) => Scope.fromJSON(e))
        : [],
      key: isSet(object.key) ? LastEvaluatedKey.fromJSON(object.key) : undefined,
    };
  },

  toJSON(message: ScopeHistoryResponse): unknown {
    const obj: any = {};
    if (message.scopeId !== undefined) {
      obj.scopeId = ScopeID.toJSON(message.scopeId);
    }
    if (message.scopes?.length) {
      obj.scopes = message.scopes.map((e) => Scope.toJSON(e));
    }
    if (message.key !== undefined) {
      obj.key = LastEvaluatedKey.toJSON(message.key);
    }
    return obj;
  },

  create(base?: DeepPartial<ScopeHistoryResponse>): ScopeHistoryResponse {
    return ScopeHistoryResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ScopeHistoryResponse>): ScopeHistoryResponse {
    const message = createBaseScopeHistoryResponse();
    message.scopeId =
      object.scopeId !== undefined && object.scopeId !== null
        ? ScopeID.fromPartial(object.scopeId)
        : undefined;
    message.scopes = object.scopes?.map((e) => Scope.fromPartial(e)) || [];
    message.key =
      object.key !== undefined && object.key !== null
        ? LastEvaluatedKey.fromPartial(object.key)
        : undefined;
    return message;
  },
};

function createBaseSearchRequest(): SearchRequest {
  return { scopeId: undefined, search: '', key: undefined };
}

export const SearchRequest = {
  encode(message: SearchRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scopeId !== undefined) {
      ScopeID.encode(message.scopeId, writer.uint32(10).fork()).ldelim();
    }
    if (message.search !== '') {
      writer.uint32(18).string(message.search);
    }
    if (message.key !== undefined) {
      LastEvaluatedKey.encode(message.key, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchRequest();
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

          message.search = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.key = LastEvaluatedKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchRequest {
    return {
      scopeId: isSet(object.scopeId) ? ScopeID.fromJSON(object.scopeId) : undefined,
      search: isSet(object.search) ? globalThis.String(object.search) : '',
      key: isSet(object.key) ? LastEvaluatedKey.fromJSON(object.key) : undefined,
    };
  },

  toJSON(message: SearchRequest): unknown {
    const obj: any = {};
    if (message.scopeId !== undefined) {
      obj.scopeId = ScopeID.toJSON(message.scopeId);
    }
    if (message.search !== '') {
      obj.search = message.search;
    }
    if (message.key !== undefined) {
      obj.key = LastEvaluatedKey.toJSON(message.key);
    }
    return obj;
  },

  create(base?: DeepPartial<SearchRequest>): SearchRequest {
    return SearchRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SearchRequest>): SearchRequest {
    const message = createBaseSearchRequest();
    message.scopeId =
      object.scopeId !== undefined && object.scopeId !== null
        ? ScopeID.fromPartial(object.scopeId)
        : undefined;
    message.search = object.search ?? '';
    message.key =
      object.key !== undefined && object.key !== null
        ? LastEvaluatedKey.fromPartial(object.key)
        : undefined;
    return message;
  },
};

function createBaseSearchResponse(): SearchResponse {
  return { responses: [], key: undefined };
}

export const SearchResponse = {
  encode(message: SearchResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.responses) {
      Parameter.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.key !== undefined) {
      LastEvaluatedKey.encode(message.key, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.responses.push(Parameter.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.key = LastEvaluatedKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SearchResponse {
    return {
      responses: globalThis.Array.isArray(object?.responses)
        ? object.responses.map((e: any) => Parameter.fromJSON(e))
        : [],
      key: isSet(object.key) ? LastEvaluatedKey.fromJSON(object.key) : undefined,
    };
  },

  toJSON(message: SearchResponse): unknown {
    const obj: any = {};
    if (message.responses?.length) {
      obj.responses = message.responses.map((e) => Parameter.toJSON(e));
    }
    if (message.key !== undefined) {
      obj.key = LastEvaluatedKey.toJSON(message.key);
    }
    return obj;
  },

  create(base?: DeepPartial<SearchResponse>): SearchResponse {
    return SearchResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SearchResponse>): SearchResponse {
    const message = createBaseSearchResponse();
    message.responses = object.responses?.map((e) => Parameter.fromPartial(e)) || [];
    message.key =
      object.key !== undefined && object.key !== null
        ? LastEvaluatedKey.fromPartial(object.key)
        : undefined;
    return message;
  },
};

function createBaseGetAllParametersRequestWithPagination(): GetAllParametersRequestWithPagination {
  return { scopeId: undefined, key: undefined };
}

export const GetAllParametersRequestWithPagination = {
  encode(
    message: GetAllParametersRequestWithPagination,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.scopeId !== undefined) {
      ScopeID.encode(message.scopeId, writer.uint32(10).fork()).ldelim();
    }
    if (message.key !== undefined) {
      LastEvaluatedKey.encode(message.key, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetAllParametersRequestWithPagination {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAllParametersRequestWithPagination();
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

          message.key = LastEvaluatedKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetAllParametersRequestWithPagination {
    return {
      scopeId: isSet(object.scopeId) ? ScopeID.fromJSON(object.scopeId) : undefined,
      key: isSet(object.key) ? LastEvaluatedKey.fromJSON(object.key) : undefined,
    };
  },

  toJSON(message: GetAllParametersRequestWithPagination): unknown {
    const obj: any = {};
    if (message.scopeId !== undefined) {
      obj.scopeId = ScopeID.toJSON(message.scopeId);
    }
    if (message.key !== undefined) {
      obj.key = LastEvaluatedKey.toJSON(message.key);
    }
    return obj;
  },

  create(
    base?: DeepPartial<GetAllParametersRequestWithPagination>,
  ): GetAllParametersRequestWithPagination {
    return GetAllParametersRequestWithPagination.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<GetAllParametersRequestWithPagination>,
  ): GetAllParametersRequestWithPagination {
    const message = createBaseGetAllParametersRequestWithPagination();
    message.scopeId =
      object.scopeId !== undefined && object.scopeId !== null
        ? ScopeID.fromPartial(object.scopeId)
        : undefined;
    message.key =
      object.key !== undefined && object.key !== null
        ? LastEvaluatedKey.fromPartial(object.key)
        : undefined;
    return message;
  },
};

function createBaseAllParametersResponse(): AllParametersResponse {
  return { responses: [], key: undefined };
}

export const AllParametersResponse = {
  encode(message: AllParametersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.responses) {
      Parameter.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.key !== undefined) {
      LastEvaluatedKey.encode(message.key, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AllParametersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllParametersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.responses.push(Parameter.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = LastEvaluatedKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AllParametersResponse {
    return {
      responses: globalThis.Array.isArray(object?.responses)
        ? object.responses.map((e: any) => Parameter.fromJSON(e))
        : [],
      key: isSet(object.key) ? LastEvaluatedKey.fromJSON(object.key) : undefined,
    };
  },

  toJSON(message: AllParametersResponse): unknown {
    const obj: any = {};
    if (message.responses?.length) {
      obj.responses = message.responses.map((e) => Parameter.toJSON(e));
    }
    if (message.key !== undefined) {
      obj.key = LastEvaluatedKey.toJSON(message.key);
    }
    return obj;
  },

  create(base?: DeepPartial<AllParametersResponse>): AllParametersResponse {
    return AllParametersResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AllParametersResponse>): AllParametersResponse {
    const message = createBaseAllParametersResponse();
    message.responses = object.responses?.map((e) => Parameter.fromPartial(e)) || [];
    message.key =
      object.key !== undefined && object.key !== null
        ? LastEvaluatedKey.fromPartial(object.key)
        : undefined;
    return message;
  },
};

function createBasePendingParametersRequest(): PendingParametersRequest {
  return { scopeId: undefined, key: undefined };
}

export const PendingParametersRequest = {
  encode(message: PendingParametersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scopeId !== undefined) {
      ScopeID.encode(message.scopeId, writer.uint32(10).fork()).ldelim();
    }
    if (message.key !== undefined) {
      LastEvaluatedKey.encode(message.key, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PendingParametersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePendingParametersRequest();
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

          message.key = LastEvaluatedKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PendingParametersRequest {
    return {
      scopeId: isSet(object.scopeId) ? ScopeID.fromJSON(object.scopeId) : undefined,
      key: isSet(object.key) ? LastEvaluatedKey.fromJSON(object.key) : undefined,
    };
  },

  toJSON(message: PendingParametersRequest): unknown {
    const obj: any = {};
    if (message.scopeId !== undefined) {
      obj.scopeId = ScopeID.toJSON(message.scopeId);
    }
    if (message.key !== undefined) {
      obj.key = LastEvaluatedKey.toJSON(message.key);
    }
    return obj;
  },

  create(base?: DeepPartial<PendingParametersRequest>): PendingParametersRequest {
    return PendingParametersRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PendingParametersRequest>): PendingParametersRequest {
    const message = createBasePendingParametersRequest();
    message.scopeId =
      object.scopeId !== undefined && object.scopeId !== null
        ? ScopeID.fromPartial(object.scopeId)
        : undefined;
    message.key =
      object.key !== undefined && object.key !== null
        ? LastEvaluatedKey.fromPartial(object.key)
        : undefined;
    return message;
  },
};

function createBasePendingParametersResponse(): PendingParametersResponse {
  return { parameters: [], key: undefined };
}

export const PendingParametersResponse = {
  encode(message: PendingParametersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.parameters) {
      Parameter.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.key !== undefined) {
      LastEvaluatedKey.encode(message.key, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PendingParametersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePendingParametersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parameters.push(Parameter.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = LastEvaluatedKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PendingParametersResponse {
    return {
      parameters: globalThis.Array.isArray(object?.parameters)
        ? object.parameters.map((e: any) => Parameter.fromJSON(e))
        : [],
      key: isSet(object.key) ? LastEvaluatedKey.fromJSON(object.key) : undefined,
    };
  },

  toJSON(message: PendingParametersResponse): unknown {
    const obj: any = {};
    if (message.parameters?.length) {
      obj.parameters = message.parameters.map((e) => Parameter.toJSON(e));
    }
    if (message.key !== undefined) {
      obj.key = LastEvaluatedKey.toJSON(message.key);
    }
    return obj;
  },

  create(base?: DeepPartial<PendingParametersResponse>): PendingParametersResponse {
    return PendingParametersResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<PendingParametersResponse>): PendingParametersResponse {
    const message = createBasePendingParametersResponse();
    message.parameters = object.parameters?.map((e) => Parameter.fromPartial(e)) || [];
    message.key =
      object.key !== undefined && object.key !== null
        ? LastEvaluatedKey.fromPartial(object.key)
        : undefined;
    return message;
  },
};

function createBaseGetParametersChangedRequest(): GetParametersChangedRequest {
  return {
    scopeId: undefined,
    timestamp: undefined,
    lastEvaluatedKey: undefined,
    latestVersion: '',
    maxVersion: '',
  };
}

export const GetParametersChangedRequest = {
  encode(
    message: GetParametersChangedRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.scopeId !== undefined) {
      ScopeID.encode(message.scopeId, writer.uint32(10).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim();
    }
    if (message.lastEvaluatedKey !== undefined) {
      LastEvaluatedKey.encode(message.lastEvaluatedKey, writer.uint32(26).fork()).ldelim();
    }
    if (message.latestVersion !== '') {
      writer.uint32(34).string(message.latestVersion);
    }
    if (message.maxVersion !== '') {
      writer.uint32(42).string(message.maxVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetParametersChangedRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetParametersChangedRequest();
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

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lastEvaluatedKey = LastEvaluatedKey.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.latestVersion = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.maxVersion = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetParametersChangedRequest {
    return {
      scopeId: isSet(object.scopeId) ? ScopeID.fromJSON(object.scopeId) : undefined,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      lastEvaluatedKey: isSet(object.lastEvaluatedKey)
        ? LastEvaluatedKey.fromJSON(object.lastEvaluatedKey)
        : undefined,
      latestVersion: isSet(object.latestVersion) ? globalThis.String(object.latestVersion) : '',
      maxVersion: isSet(object.maxVersion) ? globalThis.String(object.maxVersion) : '',
    };
  },

  toJSON(message: GetParametersChangedRequest): unknown {
    const obj: any = {};
    if (message.scopeId !== undefined) {
      obj.scopeId = ScopeID.toJSON(message.scopeId);
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    if (message.lastEvaluatedKey !== undefined) {
      obj.lastEvaluatedKey = LastEvaluatedKey.toJSON(message.lastEvaluatedKey);
    }
    if (message.latestVersion !== '') {
      obj.latestVersion = message.latestVersion;
    }
    if (message.maxVersion !== '') {
      obj.maxVersion = message.maxVersion;
    }
    return obj;
  },

  create(base?: DeepPartial<GetParametersChangedRequest>): GetParametersChangedRequest {
    return GetParametersChangedRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetParametersChangedRequest>): GetParametersChangedRequest {
    const message = createBaseGetParametersChangedRequest();
    message.scopeId =
      object.scopeId !== undefined && object.scopeId !== null
        ? ScopeID.fromPartial(object.scopeId)
        : undefined;
    message.timestamp = object.timestamp ?? undefined;
    message.lastEvaluatedKey =
      object.lastEvaluatedKey !== undefined && object.lastEvaluatedKey !== null
        ? LastEvaluatedKey.fromPartial(object.lastEvaluatedKey)
        : undefined;
    message.latestVersion = object.latestVersion ?? '';
    message.maxVersion = object.maxVersion ?? '';
    return message;
  },
};

function createBaseGetParametersChangedResponse(): GetParametersChangedResponse {
  return { parameters: [], lastEvaluatedKey: undefined, latestVersion: '' };
}

export const GetParametersChangedResponse = {
  encode(
    message: GetParametersChangedResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.parameters) {
      Parameter.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.lastEvaluatedKey !== undefined) {
      LastEvaluatedKey.encode(message.lastEvaluatedKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.latestVersion !== '') {
      writer.uint32(26).string(message.latestVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetParametersChangedResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetParametersChangedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parameters.push(Parameter.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.lastEvaluatedKey = LastEvaluatedKey.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.latestVersion = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetParametersChangedResponse {
    return {
      parameters: globalThis.Array.isArray(object?.parameters)
        ? object.parameters.map((e: any) => Parameter.fromJSON(e))
        : [],
      lastEvaluatedKey: isSet(object.lastEvaluatedKey)
        ? LastEvaluatedKey.fromJSON(object.lastEvaluatedKey)
        : undefined,
      latestVersion: isSet(object.latestVersion) ? globalThis.String(object.latestVersion) : '',
    };
  },

  toJSON(message: GetParametersChangedResponse): unknown {
    const obj: any = {};
    if (message.parameters?.length) {
      obj.parameters = message.parameters.map((e) => Parameter.toJSON(e));
    }
    if (message.lastEvaluatedKey !== undefined) {
      obj.lastEvaluatedKey = LastEvaluatedKey.toJSON(message.lastEvaluatedKey);
    }
    if (message.latestVersion !== '') {
      obj.latestVersion = message.latestVersion;
    }
    return obj;
  },

  create(base?: DeepPartial<GetParametersChangedResponse>): GetParametersChangedResponse {
    return GetParametersChangedResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetParametersChangedResponse>): GetParametersChangedResponse {
    const message = createBaseGetParametersChangedResponse();
    message.parameters = object.parameters?.map((e) => Parameter.fromPartial(e)) || [];
    message.lastEvaluatedKey =
      object.lastEvaluatedKey !== undefined && object.lastEvaluatedKey !== null
        ? LastEvaluatedKey.fromPartial(object.lastEvaluatedKey)
        : undefined;
    message.latestVersion = object.latestVersion ?? '';
    return message;
  },
};

function createBaseGetHistoryRequestWithPagination(): GetHistoryRequestWithPagination {
  return { parameterId: undefined, key: undefined };
}

export const GetHistoryRequestWithPagination = {
  encode(
    message: GetHistoryRequestWithPagination,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.parameterId !== undefined) {
      ParameterID.encode(message.parameterId, writer.uint32(10).fork()).ldelim();
    }
    if (message.key !== undefined) {
      LastEvaluatedKey.encode(message.key, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetHistoryRequestWithPagination {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetHistoryRequestWithPagination();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parameterId = ParameterID.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = LastEvaluatedKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetHistoryRequestWithPagination {
    return {
      parameterId: isSet(object.parameterId) ? ParameterID.fromJSON(object.parameterId) : undefined,
      key: isSet(object.key) ? LastEvaluatedKey.fromJSON(object.key) : undefined,
    };
  },

  toJSON(message: GetHistoryRequestWithPagination): unknown {
    const obj: any = {};
    if (message.parameterId !== undefined) {
      obj.parameterId = ParameterID.toJSON(message.parameterId);
    }
    if (message.key !== undefined) {
      obj.key = LastEvaluatedKey.toJSON(message.key);
    }
    return obj;
  },

  create(base?: DeepPartial<GetHistoryRequestWithPagination>): GetHistoryRequestWithPagination {
    return GetHistoryRequestWithPagination.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<GetHistoryRequestWithPagination>,
  ): GetHistoryRequestWithPagination {
    const message = createBaseGetHistoryRequestWithPagination();
    message.parameterId =
      object.parameterId !== undefined && object.parameterId !== null
        ? ParameterID.fromPartial(object.parameterId)
        : undefined;
    message.key =
      object.key !== undefined && object.key !== null
        ? LastEvaluatedKey.fromPartial(object.key)
        : undefined;
    return message;
  },
};

function createBaseParameterHistoryResponse(): ParameterHistoryResponse {
  return { id: undefined, versions: [], key: undefined };
}

export const ParameterHistoryResponse = {
  encode(message: ParameterHistoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ParameterID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.versions) {
      Parameter.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.key !== undefined) {
      LastEvaluatedKey.encode(message.key, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParameterHistoryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParameterHistoryResponse();
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

          message.versions.push(Parameter.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.key = LastEvaluatedKey.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ParameterHistoryResponse {
    return {
      id: isSet(object.id) ? ParameterID.fromJSON(object.id) : undefined,
      versions: globalThis.Array.isArray(object?.versions)
        ? object.versions.map((e: any) => Parameter.fromJSON(e))
        : [],
      key: isSet(object.key) ? LastEvaluatedKey.fromJSON(object.key) : undefined,
    };
  },

  toJSON(message: ParameterHistoryResponse): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = ParameterID.toJSON(message.id);
    }
    if (message.versions?.length) {
      obj.versions = message.versions.map((e) => Parameter.toJSON(e));
    }
    if (message.key !== undefined) {
      obj.key = LastEvaluatedKey.toJSON(message.key);
    }
    return obj;
  },

  create(base?: DeepPartial<ParameterHistoryResponse>): ParameterHistoryResponse {
    return ParameterHistoryResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ParameterHistoryResponse>): ParameterHistoryResponse {
    const message = createBaseParameterHistoryResponse();
    message.id =
      object.id !== undefined && object.id !== null
        ? ParameterID.fromPartial(object.id)
        : undefined;
    message.versions = object.versions?.map((e) => Parameter.fromPartial(e)) || [];
    message.key =
      object.key !== undefined && object.key !== null
        ? LastEvaluatedKey.fromPartial(object.key)
        : undefined;
    return message;
  },
};

function createBaseCreateRequest(): CreateRequest {
  return { id: undefined, body: undefined, author: '', note: '', delegatedAuthor: '' };
}

export const CreateRequest = {
  encode(message: CreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ParameterID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.body !== undefined) {
      ParameterBody.encode(message.body, writer.uint32(18).fork()).ldelim();
    }
    if (message.author !== '') {
      writer.uint32(26).string(message.author);
    }
    if (message.note !== '') {
      writer.uint32(34).string(message.note);
    }
    if (message.delegatedAuthor !== '') {
      writer.uint32(42).string(message.delegatedAuthor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateRequest();
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

          message.body = ParameterBody.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.author = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.note = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.delegatedAuthor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateRequest {
    return {
      id: isSet(object.id) ? ParameterID.fromJSON(object.id) : undefined,
      body: isSet(object.body) ? ParameterBody.fromJSON(object.body) : undefined,
      author: isSet(object.author) ? globalThis.String(object.author) : '',
      note: isSet(object.note) ? globalThis.String(object.note) : '',
      delegatedAuthor: isSet(object.delegatedAuthor)
        ? globalThis.String(object.delegatedAuthor)
        : '',
    };
  },

  toJSON(message: CreateRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = ParameterID.toJSON(message.id);
    }
    if (message.body !== undefined) {
      obj.body = ParameterBody.toJSON(message.body);
    }
    if (message.author !== '') {
      obj.author = message.author;
    }
    if (message.note !== '') {
      obj.note = message.note;
    }
    if (message.delegatedAuthor !== '') {
      obj.delegatedAuthor = message.delegatedAuthor;
    }
    return obj;
  },

  create(base?: DeepPartial<CreateRequest>): CreateRequest {
    return CreateRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CreateRequest>): CreateRequest {
    const message = createBaseCreateRequest();
    message.id =
      object.id !== undefined && object.id !== null
        ? ParameterID.fromPartial(object.id)
        : undefined;
    message.body =
      object.body !== undefined && object.body !== null
        ? ParameterBody.fromPartial(object.body)
        : undefined;
    message.author = object.author ?? '';
    message.note = object.note ?? '';
    message.delegatedAuthor = object.delegatedAuthor ?? '';
    return message;
  },
};

function createBaseUpdateRequest(): UpdateRequest {
  return {
    id: undefined,
    body: undefined,
    author: '',
    expectedVersion: '',
    note: '',
    delegatedAuthor: '',
  };
}

export const UpdateRequest = {
  encode(message: UpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ParameterID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.body !== undefined) {
      ParameterBody.encode(message.body, writer.uint32(18).fork()).ldelim();
    }
    if (message.author !== '') {
      writer.uint32(26).string(message.author);
    }
    if (message.expectedVersion !== '') {
      writer.uint32(34).string(message.expectedVersion);
    }
    if (message.note !== '') {
      writer.uint32(42).string(message.note);
    }
    if (message.delegatedAuthor !== '') {
      writer.uint32(50).string(message.delegatedAuthor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateRequest();
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

          message.body = ParameterBody.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.author = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.expectedVersion = reader.string();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateRequest {
    return {
      id: isSet(object.id) ? ParameterID.fromJSON(object.id) : undefined,
      body: isSet(object.body) ? ParameterBody.fromJSON(object.body) : undefined,
      author: isSet(object.author) ? globalThis.String(object.author) : '',
      expectedVersion: isSet(object.expectedVersion)
        ? globalThis.String(object.expectedVersion)
        : '',
      note: isSet(object.note) ? globalThis.String(object.note) : '',
      delegatedAuthor: isSet(object.delegatedAuthor)
        ? globalThis.String(object.delegatedAuthor)
        : '',
    };
  },

  toJSON(message: UpdateRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = ParameterID.toJSON(message.id);
    }
    if (message.body !== undefined) {
      obj.body = ParameterBody.toJSON(message.body);
    }
    if (message.author !== '') {
      obj.author = message.author;
    }
    if (message.expectedVersion !== '') {
      obj.expectedVersion = message.expectedVersion;
    }
    if (message.note !== '') {
      obj.note = message.note;
    }
    if (message.delegatedAuthor !== '') {
      obj.delegatedAuthor = message.delegatedAuthor;
    }
    return obj;
  },

  create(base?: DeepPartial<UpdateRequest>): UpdateRequest {
    return UpdateRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UpdateRequest>): UpdateRequest {
    const message = createBaseUpdateRequest();
    message.id =
      object.id !== undefined && object.id !== null
        ? ParameterID.fromPartial(object.id)
        : undefined;
    message.body =
      object.body !== undefined && object.body !== null
        ? ParameterBody.fromPartial(object.body)
        : undefined;
    message.author = object.author ?? '';
    message.expectedVersion = object.expectedVersion ?? '';
    message.note = object.note ?? '';
    message.delegatedAuthor = object.delegatedAuthor ?? '';
    return message;
  },
};

function createBaseDeleteRequest(): DeleteRequest {
  return { id: undefined, author: '', delegatedAuthor: '', expectedVersion: '' };
}

export const DeleteRequest = {
  encode(message: DeleteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ParameterID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.author !== '') {
      writer.uint32(18).string(message.author);
    }
    if (message.delegatedAuthor !== '') {
      writer.uint32(26).string(message.delegatedAuthor);
    }
    if (message.expectedVersion !== '') {
      writer.uint32(34).string(message.expectedVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteRequest();
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

          message.author = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.delegatedAuthor = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.expectedVersion = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteRequest {
    return {
      id: isSet(object.id) ? ParameterID.fromJSON(object.id) : undefined,
      author: isSet(object.author) ? globalThis.String(object.author) : '',
      delegatedAuthor: isSet(object.delegatedAuthor)
        ? globalThis.String(object.delegatedAuthor)
        : '',
      expectedVersion: isSet(object.expectedVersion)
        ? globalThis.String(object.expectedVersion)
        : '',
    };
  },

  toJSON(message: DeleteRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = ParameterID.toJSON(message.id);
    }
    if (message.author !== '') {
      obj.author = message.author;
    }
    if (message.delegatedAuthor !== '') {
      obj.delegatedAuthor = message.delegatedAuthor;
    }
    if (message.expectedVersion !== '') {
      obj.expectedVersion = message.expectedVersion;
    }
    return obj;
  },

  create(base?: DeepPartial<DeleteRequest>): DeleteRequest {
    return DeleteRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<DeleteRequest>): DeleteRequest {
    const message = createBaseDeleteRequest();
    message.id =
      object.id !== undefined && object.id !== null
        ? ParameterID.fromPartial(object.id)
        : undefined;
    message.author = object.author ?? '';
    message.delegatedAuthor = object.delegatedAuthor ?? '';
    message.expectedVersion = object.expectedVersion ?? '';
    return message;
  },
};

function createBaseModifyResponse(): ModifyResponse {
  return { success: false, reason: 0, param: undefined };
}

export const ModifyResponse = {
  encode(message: ModifyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.reason !== 0) {
      writer.uint32(16).int32(message.reason);
    }
    if (message.param !== undefined) {
      Parameter.encode(message.param, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModifyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModifyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.reason = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.param = Parameter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModifyResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      reason: isSet(object.reason) ? modifyResponse_ReasonFromJSON(object.reason) : 0,
      param: isSet(object.param) ? Parameter.fromJSON(object.param) : undefined,
    };
  },

  toJSON(message: ModifyResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    if (message.reason !== 0) {
      obj.reason = modifyResponse_ReasonToJSON(message.reason);
    }
    if (message.param !== undefined) {
      obj.param = Parameter.toJSON(message.param);
    }
    return obj;
  },

  create(base?: DeepPartial<ModifyResponse>): ModifyResponse {
    return ModifyResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ModifyResponse>): ModifyResponse {
    const message = createBaseModifyResponse();
    message.success = object.success ?? false;
    message.reason = object.reason ?? 0;
    message.param =
      object.param !== undefined && object.param !== null
        ? Parameter.fromPartial(object.param)
        : undefined;
    return message;
  },
};

function createBaseCreateScopeRequest(): CreateScopeRequest {
  return { scope: undefined, author: '' };
}

export const CreateScopeRequest = {
  encode(message: CreateScopeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scope !== undefined) {
      Scope.encode(message.scope, writer.uint32(10).fork()).ldelim();
    }
    if (message.author !== '') {
      writer.uint32(18).string(message.author);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateScopeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateScopeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.scope = Scope.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.author = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateScopeRequest {
    return {
      scope: isSet(object.scope) ? Scope.fromJSON(object.scope) : undefined,
      author: isSet(object.author) ? globalThis.String(object.author) : '',
    };
  },

  toJSON(message: CreateScopeRequest): unknown {
    const obj: any = {};
    if (message.scope !== undefined) {
      obj.scope = Scope.toJSON(message.scope);
    }
    if (message.author !== '') {
      obj.author = message.author;
    }
    return obj;
  },

  create(base?: DeepPartial<CreateScopeRequest>): CreateScopeRequest {
    return CreateScopeRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CreateScopeRequest>): CreateScopeRequest {
    const message = createBaseCreateScopeRequest();
    message.scope =
      object.scope !== undefined && object.scope !== null
        ? Scope.fromPartial(object.scope)
        : undefined;
    message.author = object.author ?? '';
    return message;
  },
};

function createBaseUpdateScopeRequest(): UpdateScopeRequest {
  return { scope: undefined, expectedVersion: '', author: '' };
}

export const UpdateScopeRequest = {
  encode(message: UpdateScopeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scope !== undefined) {
      Scope.encode(message.scope, writer.uint32(10).fork()).ldelim();
    }
    if (message.expectedVersion !== '') {
      writer.uint32(18).string(message.expectedVersion);
    }
    if (message.author !== '') {
      writer.uint32(26).string(message.author);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateScopeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateScopeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.scope = Scope.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.expectedVersion = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.author = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateScopeRequest {
    return {
      scope: isSet(object.scope) ? Scope.fromJSON(object.scope) : undefined,
      expectedVersion: isSet(object.expectedVersion)
        ? globalThis.String(object.expectedVersion)
        : '',
      author: isSet(object.author) ? globalThis.String(object.author) : '',
    };
  },

  toJSON(message: UpdateScopeRequest): unknown {
    const obj: any = {};
    if (message.scope !== undefined) {
      obj.scope = Scope.toJSON(message.scope);
    }
    if (message.expectedVersion !== '') {
      obj.expectedVersion = message.expectedVersion;
    }
    if (message.author !== '') {
      obj.author = message.author;
    }
    return obj;
  },

  create(base?: DeepPartial<UpdateScopeRequest>): UpdateScopeRequest {
    return UpdateScopeRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UpdateScopeRequest>): UpdateScopeRequest {
    const message = createBaseUpdateScopeRequest();
    message.scope =
      object.scope !== undefined && object.scope !== null
        ? Scope.fromPartial(object.scope)
        : undefined;
    message.expectedVersion = object.expectedVersion ?? '';
    message.author = object.author ?? '';
    return message;
  },
};

function createBaseDeleteScopeRequest(): DeleteScopeRequest {
  return { scopeId: undefined, expectedVersion: '', author: '' };
}

export const DeleteScopeRequest = {
  encode(message: DeleteScopeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scopeId !== undefined) {
      ScopeID.encode(message.scopeId, writer.uint32(10).fork()).ldelim();
    }
    if (message.expectedVersion !== '') {
      writer.uint32(18).string(message.expectedVersion);
    }
    if (message.author !== '') {
      writer.uint32(26).string(message.author);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteScopeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteScopeRequest();
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

          message.expectedVersion = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.author = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteScopeRequest {
    return {
      scopeId: isSet(object.scopeId) ? ScopeID.fromJSON(object.scopeId) : undefined,
      expectedVersion: isSet(object.expectedVersion)
        ? globalThis.String(object.expectedVersion)
        : '',
      author: isSet(object.author) ? globalThis.String(object.author) : '',
    };
  },

  toJSON(message: DeleteScopeRequest): unknown {
    const obj: any = {};
    if (message.scopeId !== undefined) {
      obj.scopeId = ScopeID.toJSON(message.scopeId);
    }
    if (message.expectedVersion !== '') {
      obj.expectedVersion = message.expectedVersion;
    }
    if (message.author !== '') {
      obj.author = message.author;
    }
    return obj;
  },

  create(base?: DeepPartial<DeleteScopeRequest>): DeleteScopeRequest {
    return DeleteScopeRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<DeleteScopeRequest>): DeleteScopeRequest {
    const message = createBaseDeleteScopeRequest();
    message.scopeId =
      object.scopeId !== undefined && object.scopeId !== null
        ? ScopeID.fromPartial(object.scopeId)
        : undefined;
    message.expectedVersion = object.expectedVersion ?? '';
    message.author = object.author ?? '';
    return message;
  },
};

function createBaseModifyScopeResponse(): ModifyScopeResponse {
  return { success: false, reason: 0, scope: undefined };
}

export const ModifyScopeResponse = {
  encode(message: ModifyScopeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.reason !== 0) {
      writer.uint32(16).int32(message.reason);
    }
    if (message.scope !== undefined) {
      Scope.encode(message.scope, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModifyScopeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModifyScopeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.reason = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.scope = Scope.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModifyScopeResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      reason: isSet(object.reason) ? modifyScopeResponse_ReasonFromJSON(object.reason) : 0,
      scope: isSet(object.scope) ? Scope.fromJSON(object.scope) : undefined,
    };
  },

  toJSON(message: ModifyScopeResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    if (message.reason !== 0) {
      obj.reason = modifyScopeResponse_ReasonToJSON(message.reason);
    }
    if (message.scope !== undefined) {
      obj.scope = Scope.toJSON(message.scope);
    }
    return obj;
  },

  create(base?: DeepPartial<ModifyScopeResponse>): ModifyScopeResponse {
    return ModifyScopeResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ModifyScopeResponse>): ModifyScopeResponse {
    const message = createBaseModifyScopeResponse();
    message.success = object.success ?? false;
    message.reason = object.reason ?? 0;
    message.scope =
      object.scope !== undefined && object.scope !== null
        ? Scope.fromPartial(object.scope)
        : undefined;
    return message;
  },
};

function createBaseModifyPendingScopesRequest(): ModifyPendingScopesRequest {
  return { requests: [], author: '' };
}

export const ModifyPendingScopesRequest = {
  encode(
    message: ModifyPendingScopesRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.requests) {
      ModifyPendingScopeRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.author !== '') {
      writer.uint32(18).string(message.author);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModifyPendingScopesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModifyPendingScopesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.requests.push(ModifyPendingScopeRequest.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.author = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModifyPendingScopesRequest {
    return {
      requests: globalThis.Array.isArray(object?.requests)
        ? object.requests.map((e: any) => ModifyPendingScopeRequest.fromJSON(e))
        : [],
      author: isSet(object.author) ? globalThis.String(object.author) : '',
    };
  },

  toJSON(message: ModifyPendingScopesRequest): unknown {
    const obj: any = {};
    if (message.requests?.length) {
      obj.requests = message.requests.map((e) => ModifyPendingScopeRequest.toJSON(e));
    }
    if (message.author !== '') {
      obj.author = message.author;
    }
    return obj;
  },

  create(base?: DeepPartial<ModifyPendingScopesRequest>): ModifyPendingScopesRequest {
    return ModifyPendingScopesRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ModifyPendingScopesRequest>): ModifyPendingScopesRequest {
    const message = createBaseModifyPendingScopesRequest();
    message.requests = object.requests?.map((e) => ModifyPendingScopeRequest.fromPartial(e)) || [];
    message.author = object.author ?? '';
    return message;
  },
};

function createBaseModifyPendingScopeRequest(): ModifyPendingScopeRequest {
  return { id: undefined, expectedVersion: '' };
}

export const ModifyPendingScopeRequest = {
  encode(message: ModifyPendingScopeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ScopeID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.expectedVersion !== '') {
      writer.uint32(18).string(message.expectedVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModifyPendingScopeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModifyPendingScopeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = ScopeID.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.expectedVersion = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModifyPendingScopeRequest {
    return {
      id: isSet(object.id) ? ScopeID.fromJSON(object.id) : undefined,
      expectedVersion: isSet(object.expectedVersion)
        ? globalThis.String(object.expectedVersion)
        : '',
    };
  },

  toJSON(message: ModifyPendingScopeRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = ScopeID.toJSON(message.id);
    }
    if (message.expectedVersion !== '') {
      obj.expectedVersion = message.expectedVersion;
    }
    return obj;
  },

  create(base?: DeepPartial<ModifyPendingScopeRequest>): ModifyPendingScopeRequest {
    return ModifyPendingScopeRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ModifyPendingScopeRequest>): ModifyPendingScopeRequest {
    const message = createBaseModifyPendingScopeRequest();
    message.id =
      object.id !== undefined && object.id !== null ? ScopeID.fromPartial(object.id) : undefined;
    message.expectedVersion = object.expectedVersion ?? '';
    return message;
  },
};

function createBaseModifyPendingScopesResponse(): ModifyPendingScopesResponse {
  return { success: false, failures: [] };
}

export const ModifyPendingScopesResponse = {
  encode(
    message: ModifyPendingScopesResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.failures) {
      FailedModifyScopeResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModifyPendingScopesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModifyPendingScopesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.failures.push(FailedModifyScopeResponse.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModifyPendingScopesResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      failures: globalThis.Array.isArray(object?.failures)
        ? object.failures.map((e: any) => FailedModifyScopeResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ModifyPendingScopesResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    if (message.failures?.length) {
      obj.failures = message.failures.map((e) => FailedModifyScopeResponse.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ModifyPendingScopesResponse>): ModifyPendingScopesResponse {
    return ModifyPendingScopesResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ModifyPendingScopesResponse>): ModifyPendingScopesResponse {
    const message = createBaseModifyPendingScopesResponse();
    message.success = object.success ?? false;
    message.failures = object.failures?.map((e) => FailedModifyScopeResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFailedModifyScopeResponse(): FailedModifyScopeResponse {
  return { id: undefined, error: '' };
}

export const FailedModifyScopeResponse = {
  encode(message: FailedModifyScopeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ScopeID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== '') {
      writer.uint32(18).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FailedModifyScopeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFailedModifyScopeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = ScopeID.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FailedModifyScopeResponse {
    return {
      id: isSet(object.id) ? ScopeID.fromJSON(object.id) : undefined,
      error: isSet(object.error) ? globalThis.String(object.error) : '',
    };
  },

  toJSON(message: FailedModifyScopeResponse): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = ScopeID.toJSON(message.id);
    }
    if (message.error !== '') {
      obj.error = message.error;
    }
    return obj;
  },

  create(base?: DeepPartial<FailedModifyScopeResponse>): FailedModifyScopeResponse {
    return FailedModifyScopeResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<FailedModifyScopeResponse>): FailedModifyScopeResponse {
    const message = createBaseFailedModifyScopeResponse();
    message.id =
      object.id !== undefined && object.id !== null ? ScopeID.fromPartial(object.id) : undefined;
    message.error = object.error ?? '';
    return message;
  },
};

function createBaseSnapshotScopeRequest(): SnapshotScopeRequest {
  return { scopeId: undefined };
}

export const SnapshotScopeRequest = {
  encode(message: SnapshotScopeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scopeId !== undefined) {
      ScopeID.encode(message.scopeId, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotScopeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotScopeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.scopeId = ScopeID.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SnapshotScopeRequest {
    return { scopeId: isSet(object.scopeId) ? ScopeID.fromJSON(object.scopeId) : undefined };
  },

  toJSON(message: SnapshotScopeRequest): unknown {
    const obj: any = {};
    if (message.scopeId !== undefined) {
      obj.scopeId = ScopeID.toJSON(message.scopeId);
    }
    return obj;
  },

  create(base?: DeepPartial<SnapshotScopeRequest>): SnapshotScopeRequest {
    return SnapshotScopeRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SnapshotScopeRequest>): SnapshotScopeRequest {
    const message = createBaseSnapshotScopeRequest();
    message.scopeId =
      object.scopeId !== undefined && object.scopeId !== null
        ? ScopeID.fromPartial(object.scopeId)
        : undefined;
    return message;
  },
};

function createBaseSnapshotScopeResponse(): SnapshotScopeResponse {
  return { snapshotUrl: '' };
}

export const SnapshotScopeResponse = {
  encode(message: SnapshotScopeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.snapshotUrl !== '') {
      writer.uint32(10).string(message.snapshotUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotScopeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSnapshotScopeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.snapshotUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SnapshotScopeResponse {
    return { snapshotUrl: isSet(object.snapshotUrl) ? globalThis.String(object.snapshotUrl) : '' };
  },

  toJSON(message: SnapshotScopeResponse): unknown {
    const obj: any = {};
    if (message.snapshotUrl !== '') {
      obj.snapshotUrl = message.snapshotUrl;
    }
    return obj;
  },

  create(base?: DeepPartial<SnapshotScopeResponse>): SnapshotScopeResponse {
    return SnapshotScopeResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<SnapshotScopeResponse>): SnapshotScopeResponse {
    const message = createBaseSnapshotScopeResponse();
    message.snapshotUrl = object.snapshotUrl ?? '';
    return message;
  },
};

function createBaseModifyPendingParameterRequest(): ModifyPendingParameterRequest {
  return { id: undefined, expectedVersion: '' };
}

export const ModifyPendingParameterRequest = {
  encode(
    message: ModifyPendingParameterRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== undefined) {
      ParameterID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.expectedVersion !== '') {
      writer.uint32(18).string(message.expectedVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModifyPendingParameterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModifyPendingParameterRequest();
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

          message.expectedVersion = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModifyPendingParameterRequest {
    return {
      id: isSet(object.id) ? ParameterID.fromJSON(object.id) : undefined,
      expectedVersion: isSet(object.expectedVersion)
        ? globalThis.String(object.expectedVersion)
        : '',
    };
  },

  toJSON(message: ModifyPendingParameterRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = ParameterID.toJSON(message.id);
    }
    if (message.expectedVersion !== '') {
      obj.expectedVersion = message.expectedVersion;
    }
    return obj;
  },

  create(base?: DeepPartial<ModifyPendingParameterRequest>): ModifyPendingParameterRequest {
    return ModifyPendingParameterRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ModifyPendingParameterRequest>): ModifyPendingParameterRequest {
    const message = createBaseModifyPendingParameterRequest();
    message.id =
      object.id !== undefined && object.id !== null
        ? ParameterID.fromPartial(object.id)
        : undefined;
    message.expectedVersion = object.expectedVersion ?? '';
    return message;
  },
};

function createBaseModifyPendingParametersRequest(): ModifyPendingParametersRequest {
  return { parameters: [], author: '' };
}

export const ModifyPendingParametersRequest = {
  encode(
    message: ModifyPendingParametersRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.parameters) {
      ModifyPendingParameterRequest.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.author !== '') {
      writer.uint32(18).string(message.author);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModifyPendingParametersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModifyPendingParametersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parameters.push(ModifyPendingParameterRequest.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.author = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModifyPendingParametersRequest {
    return {
      parameters: globalThis.Array.isArray(object?.parameters)
        ? object.parameters.map((e: any) => ModifyPendingParameterRequest.fromJSON(e))
        : [],
      author: isSet(object.author) ? globalThis.String(object.author) : '',
    };
  },

  toJSON(message: ModifyPendingParametersRequest): unknown {
    const obj: any = {};
    if (message.parameters?.length) {
      obj.parameters = message.parameters.map((e) => ModifyPendingParameterRequest.toJSON(e));
    }
    if (message.author !== '') {
      obj.author = message.author;
    }
    return obj;
  },

  create(base?: DeepPartial<ModifyPendingParametersRequest>): ModifyPendingParametersRequest {
    return ModifyPendingParametersRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ModifyPendingParametersRequest>): ModifyPendingParametersRequest {
    const message = createBaseModifyPendingParametersRequest();
    message.parameters =
      object.parameters?.map((e) => ModifyPendingParameterRequest.fromPartial(e)) || [];
    message.author = object.author ?? '';
    return message;
  },
};

function createBaseModifyPendingParametersResponse(): ModifyPendingParametersResponse {
  return { success: false, failures: [] };
}

export const ModifyPendingParametersResponse = {
  encode(
    message: ModifyPendingParametersResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    for (const v of message.failures) {
      FailedModifyParameterResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModifyPendingParametersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModifyPendingParametersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.failures.push(FailedModifyParameterResponse.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ModifyPendingParametersResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      failures: globalThis.Array.isArray(object?.failures)
        ? object.failures.map((e: any) => FailedModifyParameterResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ModifyPendingParametersResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    if (message.failures?.length) {
      obj.failures = message.failures.map((e) => FailedModifyParameterResponse.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ModifyPendingParametersResponse>): ModifyPendingParametersResponse {
    return ModifyPendingParametersResponse.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<ModifyPendingParametersResponse>,
  ): ModifyPendingParametersResponse {
    const message = createBaseModifyPendingParametersResponse();
    message.success = object.success ?? false;
    message.failures =
      object.failures?.map((e) => FailedModifyParameterResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFailedModifyParameterResponse(): FailedModifyParameterResponse {
  return { id: undefined, error: '' };
}

export const FailedModifyParameterResponse = {
  encode(
    message: FailedModifyParameterResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== undefined) {
      ParameterID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== '') {
      writer.uint32(18).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FailedModifyParameterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFailedModifyParameterResponse();
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

          message.error = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FailedModifyParameterResponse {
    return {
      id: isSet(object.id) ? ParameterID.fromJSON(object.id) : undefined,
      error: isSet(object.error) ? globalThis.String(object.error) : '',
    };
  },

  toJSON(message: FailedModifyParameterResponse): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = ParameterID.toJSON(message.id);
    }
    if (message.error !== '') {
      obj.error = message.error;
    }
    return obj;
  },

  create(base?: DeepPartial<FailedModifyParameterResponse>): FailedModifyParameterResponse {
    return FailedModifyParameterResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<FailedModifyParameterResponse>): FailedModifyParameterResponse {
    const message = createBaseFailedModifyParameterResponse();
    message.id =
      object.id !== undefined && object.id !== null
        ? ParameterID.fromPartial(object.id)
        : undefined;
    message.error = object.error ?? '';
    return message;
  },
};

function createBaseReapplyParameterRequest(): ReapplyParameterRequest {
  return { id: undefined, version: '', author: '', note: '' };
}

export const ReapplyParameterRequest = {
  encode(message: ReapplyParameterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ParameterID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.version !== '') {
      writer.uint32(18).string(message.version);
    }
    if (message.author !== '') {
      writer.uint32(26).string(message.author);
    }
    if (message.note !== '') {
      writer.uint32(34).string(message.note);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReapplyParameterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReapplyParameterRequest();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.author = reader.string();
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

  fromJSON(object: any): ReapplyParameterRequest {
    return {
      id: isSet(object.id) ? ParameterID.fromJSON(object.id) : undefined,
      version: isSet(object.version) ? globalThis.String(object.version) : '',
      author: isSet(object.author) ? globalThis.String(object.author) : '',
      note: isSet(object.note) ? globalThis.String(object.note) : '',
    };
  },

  toJSON(message: ReapplyParameterRequest): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = ParameterID.toJSON(message.id);
    }
    if (message.version !== '') {
      obj.version = message.version;
    }
    if (message.author !== '') {
      obj.author = message.author;
    }
    if (message.note !== '') {
      obj.note = message.note;
    }
    return obj;
  },

  create(base?: DeepPartial<ReapplyParameterRequest>): ReapplyParameterRequest {
    return ReapplyParameterRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ReapplyParameterRequest>): ReapplyParameterRequest {
    const message = createBaseReapplyParameterRequest();
    message.id =
      object.id !== undefined && object.id !== null
        ? ParameterID.fromPartial(object.id)
        : undefined;
    message.version = object.version ?? '';
    message.author = object.author ?? '';
    message.note = object.note ?? '';
    return message;
  },
};

function createBaseKnownClientEntity(): KnownClientEntity {
  return { value: 0, name: '' };
}

export const KnownClientEntity = {
  encode(message: KnownClientEntity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value !== 0) {
      writer.uint32(8).int32(message.value);
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KnownClientEntity {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKnownClientEntity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.value = reader.int32();
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

  fromJSON(object: any): KnownClientEntity {
    return {
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : '',
    };
  },

  toJSON(message: KnownClientEntity): unknown {
    const obj: any = {};
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    if (message.name !== '') {
      obj.name = message.name;
    }
    return obj;
  },

  create(base?: DeepPartial<KnownClientEntity>): KnownClientEntity {
    return KnownClientEntity.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<KnownClientEntity>): KnownClientEntity {
    const message = createBaseKnownClientEntity();
    message.value = object.value ?? 0;
    message.name = object.name ?? '';
    return message;
  },
};

function createBaseKnownClientsResponse(): KnownClientsResponse {
  return { knownClients: [] };
}

export const KnownClientsResponse = {
  encode(message: KnownClientsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.knownClients) {
      KnownClientEntity.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KnownClientsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKnownClientsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.knownClients.push(KnownClientEntity.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): KnownClientsResponse {
    return {
      knownClients: globalThis.Array.isArray(object?.knownClients)
        ? object.knownClients.map((e: any) => KnownClientEntity.fromJSON(e))
        : [],
    };
  },

  toJSON(message: KnownClientsResponse): unknown {
    const obj: any = {};
    if (message.knownClients?.length) {
      obj.knownClients = message.knownClients.map((e) => KnownClientEntity.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<KnownClientsResponse>): KnownClientsResponse {
    return KnownClientsResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<KnownClientsResponse>): KnownClientsResponse {
    const message = createBaseKnownClientsResponse();
    message.knownClients = object.knownClients?.map((e) => KnownClientEntity.fromPartial(e)) || [];
    return message;
  },
};

/** RPC API definition */
export type ConfigDefinition = typeof ConfigDefinition;
export const ConfigDefinition = {
  name: 'Config',
  fullName: 'coinbase.config.Config',
  methods: {
    /**
     * Ping can be called from the client to ensure that the server is up and
     * responding. It also reports some useful information about the server.
     */
    ping: {
      name: 'Ping',
      requestType: Empty,
      requestStream: false,
      responseType: PingResponse,
      responseStream: false,
      options: {},
    },
    accounts: {
      name: 'Accounts',
      requestType: Empty,
      requestStream: false,
      responseType: AccountsResponse,
      responseStream: false,
      options: {},
    },
    /** Scopes returns all scopes. */
    scopes: {
      name: 'Scopes',
      requestType: ScopesRequest,
      requestStream: false,
      responseType: ScopesResponse,
      responseStream: false,
      options: {},
    },
    /** GetScope returns the specified scope. */
    getScope: {
      name: 'GetScope',
      requestType: ScopeID,
      requestStream: false,
      responseType: Scope,
      responseStream: false,
      options: {},
    },
    /** GetPendingScopes returns a pending scopes. */
    getPendingScopes: {
      name: 'GetPendingScopes',
      requestType: PendingScopesRequest,
      requestStream: false,
      responseType: PendingScopesResponse,
      responseStream: false,
      options: {},
    },
    /** GetScopeHistory returns the history of a scope. */
    getScopeHistory: {
      name: 'GetScopeHistory',
      requestType: GetScopeHistoryRequestWithPagination,
      requestStream: false,
      responseType: ScopeHistoryResponse,
      responseStream: false,
      options: {},
    },
    /**
     * StreamParameterUpdates is an RPC for asynchronously fetching parameter
     * updates. This allows clients to send a stream of requested parameters and
     * receive a stream of those parameters back asynchronously. This should be
     * used by clients after they have values in-memory locally so they can
     * request refreshes as they need them without blocking.
     */
    streamParameterUpdates: {
      name: 'StreamParameterUpdates',
      requestType: ParameterID,
      requestStream: true,
      responseType: Parameter,
      responseStream: true,
      options: {},
    },
    /** GetParameter returns the specified parameter. */
    getParameter: {
      name: 'GetParameter',
      requestType: ParameterID,
      requestStream: false,
      responseType: Parameter,
      responseStream: false,
      options: {},
    },
    /** Search searches a scope for parameters that match a substring. */
    search: {
      name: 'Search',
      requestType: SearchRequest,
      requestStream: false,
      responseType: SearchResponse,
      responseStream: false,
      options: {},
    },
    /**
     * GetAllParameters returns all the approved parameters in a scope.
     *
     * NOTE: This is used for async routine polling of values from client libraries.
     */
    getAllParameters: {
      name: 'GetAllParameters',
      requestType: GetAllParametersRequestWithPagination,
      requestStream: false,
      responseType: AllParametersResponse,
      responseStream: false,
      options: {},
    },
    /** GetAllParameters returns all the pending parameters in a scope. */
    getPendingParameters: {
      name: 'GetPendingParameters',
      requestType: PendingParametersRequest,
      requestStream: false,
      responseType: PendingParametersResponse,
      responseStream: false,
      options: {},
    },
    /** GetAllDeletedParameters returns all the deleted parameters in a scope. */
    getAllDeletedParameters: {
      name: 'GetAllDeletedParameters',
      requestType: GetAllParametersRequestWithPagination,
      requestStream: false,
      responseType: AllParametersResponse,
      responseStream: false,
      options: {},
    },
    /**
     * GetParametersChanged returns all parameters in a scope if the scope
     * changed since the timestamp in the request. Returns no parameters
     * otherwise.
     */
    getParametersChanged: {
      name: 'GetParametersChanged',
      requestType: GetParametersChangedRequest,
      requestStream: false,
      responseType: GetParametersChangedResponse,
      responseStream: false,
      options: {},
    },
    /** GetHistory returns the history of a parameter. */
    getHistory: {
      name: 'GetHistory',
      requestType: GetHistoryRequestWithPagination,
      requestStream: false,
      responseType: ParameterHistoryResponse,
      responseStream: false,
      options: {},
    },
    /**
     * CreateParameter creates a parameter.
     *
     * NOTE: This method is required to be invoked by the apigw lambda from a
     * known client for this scope.
     */
    createParameter: {
      name: 'CreateParameter',
      requestType: CreateRequest,
      requestStream: false,
      responseType: ModifyResponse,
      responseStream: false,
      options: {},
    },
    /**
     * UpdateParameter updates a parameter.
     *
     * NOTE: This method is required to be invoked by the apigw lambda from a
     * known client for this scope.
     */
    updateParameter: {
      name: 'UpdateParameter',
      requestType: UpdateRequest,
      requestStream: false,
      responseType: ModifyResponse,
      responseStream: false,
      options: {},
    },
    /**
     * DeleteParameter deletes a parameter.
     *
     * NOTE: This method is required to be invoked by the apigw lambda from a
     * known client for this scope.
     */
    deleteParameter: {
      name: 'DeleteParameter',
      requestType: DeleteRequest,
      requestStream: false,
      responseType: ModifyResponse,
      responseStream: false,
      options: {},
    },
    /**
     * DecryptSecret takes a ParameterID
     * and returns a UnencryptedSecret with a plaintext body. Only implemented in userapi lambda.
     */
    decryptSecret: {
      name: 'DecryptSecret',
      requestType: ParameterID,
      requestStream: false,
      responseType: UnencryptedSecret,
      responseStream: false,
      options: {},
    },
    /**
     * DecryptSecretVersion takes a ParameterID + version string
     * and returns a UnencryptedSecret with a plaintext body. Only implemented in userapi lambda.
     * Ideally, DecryptSecret wouldn't exist and we'd only use this.
     */
    decryptSecretVersion: {
      name: 'DecryptSecretVersion',
      requestType: ParameterIDAndVersion,
      requestStream: false,
      responseType: UnencryptedSecret,
      responseStream: false,
      options: {},
    },
    /**
     * EncryptAndCreateSecret encrypts an UnencryptedSecret
     * and creates a secret_text parameter with it
     */
    encryptAndCreateSecret: {
      name: 'EncryptAndCreateSecret',
      requestType: UnencryptedSecret,
      requestStream: false,
      responseType: ModifyResponse,
      responseStream: false,
      options: {},
    },
    /**
     * EncryptAndCreateSecret encrypts an UnencryptedSecret
     * and updates a secret_text parameter with it
     */
    encryptAndUpdateSecret: {
      name: 'EncryptAndUpdateSecret',
      requestType: UnencryptedSecret,
      requestStream: false,
      responseType: ModifyResponse,
      responseStream: false,
      options: {},
    },
    /**
     * CreateScope creates a scope.
     * [nodoc]
     */
    createScope: {
      name: 'CreateScope',
      requestType: CreateScopeRequest,
      requestStream: false,
      responseType: ModifyScopeResponse,
      responseStream: false,
      options: {},
    },
    /**
     * UpdateScope updates a scope.
     * [nodoc]
     */
    updateScope: {
      name: 'UpdateScope',
      requestType: UpdateScopeRequest,
      requestStream: false,
      responseType: ModifyScopeResponse,
      responseStream: false,
      options: {},
    },
    /**
     * DeleteScope deletes a scope.
     * [nodoc]
     */
    deleteScope: {
      name: 'DeleteScope',
      requestType: DeleteScopeRequest,
      requestStream: false,
      responseType: ModifyScopeResponse,
      responseStream: false,
      options: {},
    },
    /**
     * ApproveScopes approves a list of scopes based on the array of IDs.
     * [nodoc]
     */
    approveScopes: {
      name: 'ApproveScopes',
      requestType: ModifyPendingScopesRequest,
      requestStream: false,
      responseType: ModifyPendingScopesResponse,
      responseStream: false,
      options: {},
    },
    /**
     * RejectScopes rejects a pending list of scopes.
     * [nodoc]
     */
    rejectScopes: {
      name: 'RejectScopes',
      requestType: ModifyPendingScopesRequest,
      requestStream: false,
      responseType: ModifyPendingScopesResponse,
      responseStream: false,
      options: {},
    },
    /**
     * SnapshotScope makes and stores a snapshot of a scope in S3.
     * [nodoc]
     */
    snapshotScope: {
      name: 'SnapshotScope',
      requestType: SnapshotScopeRequest,
      requestStream: false,
      responseType: SnapshotScopeResponse,
      responseStream: false,
      options: {},
    },
    /**
     * ApproveParameters approves a list of parameters based on the array of IDs.
     * [nodoc]
     */
    approveParameters: {
      name: 'ApproveParameters',
      requestType: ModifyPendingParametersRequest,
      requestStream: false,
      responseType: ModifyPendingParametersResponse,
      responseStream: false,
      options: {},
    },
    /**
     * RejectParameters rejects the pending version.
     * [nodoc]
     */
    rejectParameters: {
      name: 'RejectParameters',
      requestType: ModifyPendingParametersRequest,
      requestStream: false,
      responseType: ModifyPendingParametersResponse,
      responseStream: false,
      options: {},
    },
    /**
     * ReapplyParameter reverts the parameter to an old version of the
     * parameter. It will follow the same workflow as a update parameter. If
     * consensus is required, it will required consensus to be met before change
     * can be applied.
     * [nodoc]
     */
    reapplyParameter: {
      name: 'ReapplyParameter',
      requestType: ReapplyParameterRequest,
      requestStream: false,
      responseType: ModifyResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Clean removes the data from dynamodb table
     *
     * NOTE: This should only ever be invoked during test and local development.
     * [nodoc]
     */
    clean: {
      name: 'Clean',
      requestType: Empty,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    getKnownClients: {
      name: 'GetKnownClients',
      requestType: Empty,
      requestStream: false,
      responseType: KnownClientsResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface ConfigServiceImplementation<CallContextExt = {}> {
  /**
   * Ping can be called from the client to ensure that the server is up and
   * responding. It also reports some useful information about the server.
   */
  ping(request: Empty, context: CallContext & CallContextExt): Promise<DeepPartial<PingResponse>>;
  accounts(
    request: Empty,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AccountsResponse>>;
  /** Scopes returns all scopes. */
  scopes(
    request: ScopesRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ScopesResponse>>;
  /** GetScope returns the specified scope. */
  getScope(request: ScopeID, context: CallContext & CallContextExt): Promise<DeepPartial<Scope>>;
  /** GetPendingScopes returns a pending scopes. */
  getPendingScopes(
    request: PendingScopesRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<PendingScopesResponse>>;
  /** GetScopeHistory returns the history of a scope. */
  getScopeHistory(
    request: GetScopeHistoryRequestWithPagination,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ScopeHistoryResponse>>;
  /**
   * StreamParameterUpdates is an RPC for asynchronously fetching parameter
   * updates. This allows clients to send a stream of requested parameters and
   * receive a stream of those parameters back asynchronously. This should be
   * used by clients after they have values in-memory locally so they can
   * request refreshes as they need them without blocking.
   */
  streamParameterUpdates(
    request: AsyncIterable<ParameterID>,
    context: CallContext & CallContextExt,
  ): ServerStreamingMethodResult<DeepPartial<Parameter>>;
  /** GetParameter returns the specified parameter. */
  getParameter(
    request: ParameterID,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<Parameter>>;
  /** Search searches a scope for parameters that match a substring. */
  search(
    request: SearchRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<SearchResponse>>;
  /**
   * GetAllParameters returns all the approved parameters in a scope.
   *
   * NOTE: This is used for async routine polling of values from client libraries.
   */
  getAllParameters(
    request: GetAllParametersRequestWithPagination,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AllParametersResponse>>;
  /** GetAllParameters returns all the pending parameters in a scope. */
  getPendingParameters(
    request: PendingParametersRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<PendingParametersResponse>>;
  /** GetAllDeletedParameters returns all the deleted parameters in a scope. */
  getAllDeletedParameters(
    request: GetAllParametersRequestWithPagination,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AllParametersResponse>>;
  /**
   * GetParametersChanged returns all parameters in a scope if the scope
   * changed since the timestamp in the request. Returns no parameters
   * otherwise.
   */
  getParametersChanged(
    request: GetParametersChangedRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<GetParametersChangedResponse>>;
  /** GetHistory returns the history of a parameter. */
  getHistory(
    request: GetHistoryRequestWithPagination,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ParameterHistoryResponse>>;
  /**
   * CreateParameter creates a parameter.
   *
   * NOTE: This method is required to be invoked by the apigw lambda from a
   * known client for this scope.
   */
  createParameter(
    request: CreateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ModifyResponse>>;
  /**
   * UpdateParameter updates a parameter.
   *
   * NOTE: This method is required to be invoked by the apigw lambda from a
   * known client for this scope.
   */
  updateParameter(
    request: UpdateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ModifyResponse>>;
  /**
   * DeleteParameter deletes a parameter.
   *
   * NOTE: This method is required to be invoked by the apigw lambda from a
   * known client for this scope.
   */
  deleteParameter(
    request: DeleteRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ModifyResponse>>;
  /**
   * DecryptSecret takes a ParameterID
   * and returns a UnencryptedSecret with a plaintext body. Only implemented in userapi lambda.
   */
  decryptSecret(
    request: ParameterID,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UnencryptedSecret>>;
  /**
   * DecryptSecretVersion takes a ParameterID + version string
   * and returns a UnencryptedSecret with a plaintext body. Only implemented in userapi lambda.
   * Ideally, DecryptSecret wouldn't exist and we'd only use this.
   */
  decryptSecretVersion(
    request: ParameterIDAndVersion,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UnencryptedSecret>>;
  /**
   * EncryptAndCreateSecret encrypts an UnencryptedSecret
   * and creates a secret_text parameter with it
   */
  encryptAndCreateSecret(
    request: UnencryptedSecret,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ModifyResponse>>;
  /**
   * EncryptAndCreateSecret encrypts an UnencryptedSecret
   * and updates a secret_text parameter with it
   */
  encryptAndUpdateSecret(
    request: UnencryptedSecret,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ModifyResponse>>;
  /**
   * CreateScope creates a scope.
   * [nodoc]
   */
  createScope(
    request: CreateScopeRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ModifyScopeResponse>>;
  /**
   * UpdateScope updates a scope.
   * [nodoc]
   */
  updateScope(
    request: UpdateScopeRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ModifyScopeResponse>>;
  /**
   * DeleteScope deletes a scope.
   * [nodoc]
   */
  deleteScope(
    request: DeleteScopeRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ModifyScopeResponse>>;
  /**
   * ApproveScopes approves a list of scopes based on the array of IDs.
   * [nodoc]
   */
  approveScopes(
    request: ModifyPendingScopesRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ModifyPendingScopesResponse>>;
  /**
   * RejectScopes rejects a pending list of scopes.
   * [nodoc]
   */
  rejectScopes(
    request: ModifyPendingScopesRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ModifyPendingScopesResponse>>;
  /**
   * SnapshotScope makes and stores a snapshot of a scope in S3.
   * [nodoc]
   */
  snapshotScope(
    request: SnapshotScopeRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<SnapshotScopeResponse>>;
  /**
   * ApproveParameters approves a list of parameters based on the array of IDs.
   * [nodoc]
   */
  approveParameters(
    request: ModifyPendingParametersRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ModifyPendingParametersResponse>>;
  /**
   * RejectParameters rejects the pending version.
   * [nodoc]
   */
  rejectParameters(
    request: ModifyPendingParametersRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ModifyPendingParametersResponse>>;
  /**
   * ReapplyParameter reverts the parameter to an old version of the
   * parameter. It will follow the same workflow as a update parameter. If
   * consensus is required, it will required consensus to be met before change
   * can be applied.
   * [nodoc]
   */
  reapplyParameter(
    request: ReapplyParameterRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ModifyResponse>>;
  /**
   * Clean removes the data from dynamodb table
   *
   * NOTE: This should only ever be invoked during test and local development.
   * [nodoc]
   */
  clean(request: Empty, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
  getKnownClients(
    request: Empty,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<KnownClientsResponse>>;
}

export interface ConfigClient<CallOptionsExt = {}> {
  /**
   * Ping can be called from the client to ensure that the server is up and
   * responding. It also reports some useful information about the server.
   */
  ping(request: DeepPartial<Empty>, options?: CallOptions & CallOptionsExt): Promise<PingResponse>;
  accounts(
    request: DeepPartial<Empty>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AccountsResponse>;
  /** Scopes returns all scopes. */
  scopes(
    request: DeepPartial<ScopesRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ScopesResponse>;
  /** GetScope returns the specified scope. */
  getScope(request: DeepPartial<ScopeID>, options?: CallOptions & CallOptionsExt): Promise<Scope>;
  /** GetPendingScopes returns a pending scopes. */
  getPendingScopes(
    request: DeepPartial<PendingScopesRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<PendingScopesResponse>;
  /** GetScopeHistory returns the history of a scope. */
  getScopeHistory(
    request: DeepPartial<GetScopeHistoryRequestWithPagination>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ScopeHistoryResponse>;
  /**
   * StreamParameterUpdates is an RPC for asynchronously fetching parameter
   * updates. This allows clients to send a stream of requested parameters and
   * receive a stream of those parameters back asynchronously. This should be
   * used by clients after they have values in-memory locally so they can
   * request refreshes as they need them without blocking.
   */
  streamParameterUpdates(
    request: AsyncIterable<DeepPartial<ParameterID>>,
    options?: CallOptions & CallOptionsExt,
  ): AsyncIterable<Parameter>;
  /** GetParameter returns the specified parameter. */
  getParameter(
    request: DeepPartial<ParameterID>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<Parameter>;
  /** Search searches a scope for parameters that match a substring. */
  search(
    request: DeepPartial<SearchRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<SearchResponse>;
  /**
   * GetAllParameters returns all the approved parameters in a scope.
   *
   * NOTE: This is used for async routine polling of values from client libraries.
   */
  getAllParameters(
    request: DeepPartial<GetAllParametersRequestWithPagination>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AllParametersResponse>;
  /** GetAllParameters returns all the pending parameters in a scope. */
  getPendingParameters(
    request: DeepPartial<PendingParametersRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<PendingParametersResponse>;
  /** GetAllDeletedParameters returns all the deleted parameters in a scope. */
  getAllDeletedParameters(
    request: DeepPartial<GetAllParametersRequestWithPagination>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AllParametersResponse>;
  /**
   * GetParametersChanged returns all parameters in a scope if the scope
   * changed since the timestamp in the request. Returns no parameters
   * otherwise.
   */
  getParametersChanged(
    request: DeepPartial<GetParametersChangedRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<GetParametersChangedResponse>;
  /** GetHistory returns the history of a parameter. */
  getHistory(
    request: DeepPartial<GetHistoryRequestWithPagination>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ParameterHistoryResponse>;
  /**
   * CreateParameter creates a parameter.
   *
   * NOTE: This method is required to be invoked by the apigw lambda from a
   * known client for this scope.
   */
  createParameter(
    request: DeepPartial<CreateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ModifyResponse>;
  /**
   * UpdateParameter updates a parameter.
   *
   * NOTE: This method is required to be invoked by the apigw lambda from a
   * known client for this scope.
   */
  updateParameter(
    request: DeepPartial<UpdateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ModifyResponse>;
  /**
   * DeleteParameter deletes a parameter.
   *
   * NOTE: This method is required to be invoked by the apigw lambda from a
   * known client for this scope.
   */
  deleteParameter(
    request: DeepPartial<DeleteRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ModifyResponse>;
  /**
   * DecryptSecret takes a ParameterID
   * and returns a UnencryptedSecret with a plaintext body. Only implemented in userapi lambda.
   */
  decryptSecret(
    request: DeepPartial<ParameterID>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UnencryptedSecret>;
  /**
   * DecryptSecretVersion takes a ParameterID + version string
   * and returns a UnencryptedSecret with a plaintext body. Only implemented in userapi lambda.
   * Ideally, DecryptSecret wouldn't exist and we'd only use this.
   */
  decryptSecretVersion(
    request: DeepPartial<ParameterIDAndVersion>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UnencryptedSecret>;
  /**
   * EncryptAndCreateSecret encrypts an UnencryptedSecret
   * and creates a secret_text parameter with it
   */
  encryptAndCreateSecret(
    request: DeepPartial<UnencryptedSecret>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ModifyResponse>;
  /**
   * EncryptAndCreateSecret encrypts an UnencryptedSecret
   * and updates a secret_text parameter with it
   */
  encryptAndUpdateSecret(
    request: DeepPartial<UnencryptedSecret>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ModifyResponse>;
  /**
   * CreateScope creates a scope.
   * [nodoc]
   */
  createScope(
    request: DeepPartial<CreateScopeRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ModifyScopeResponse>;
  /**
   * UpdateScope updates a scope.
   * [nodoc]
   */
  updateScope(
    request: DeepPartial<UpdateScopeRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ModifyScopeResponse>;
  /**
   * DeleteScope deletes a scope.
   * [nodoc]
   */
  deleteScope(
    request: DeepPartial<DeleteScopeRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ModifyScopeResponse>;
  /**
   * ApproveScopes approves a list of scopes based on the array of IDs.
   * [nodoc]
   */
  approveScopes(
    request: DeepPartial<ModifyPendingScopesRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ModifyPendingScopesResponse>;
  /**
   * RejectScopes rejects a pending list of scopes.
   * [nodoc]
   */
  rejectScopes(
    request: DeepPartial<ModifyPendingScopesRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ModifyPendingScopesResponse>;
  /**
   * SnapshotScope makes and stores a snapshot of a scope in S3.
   * [nodoc]
   */
  snapshotScope(
    request: DeepPartial<SnapshotScopeRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<SnapshotScopeResponse>;
  /**
   * ApproveParameters approves a list of parameters based on the array of IDs.
   * [nodoc]
   */
  approveParameters(
    request: DeepPartial<ModifyPendingParametersRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ModifyPendingParametersResponse>;
  /**
   * RejectParameters rejects the pending version.
   * [nodoc]
   */
  rejectParameters(
    request: DeepPartial<ModifyPendingParametersRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ModifyPendingParametersResponse>;
  /**
   * ReapplyParameter reverts the parameter to an old version of the
   * parameter. It will follow the same workflow as a update parameter. If
   * consensus is required, it will required consensus to be met before change
   * can be applied.
   * [nodoc]
   */
  reapplyParameter(
    request: DeepPartial<ReapplyParameterRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ModifyResponse>;
  /**
   * Clean removes the data from dynamodb table
   *
   * NOTE: This should only ever be invoked during test and local development.
   * [nodoc]
   */
  clean(request: DeepPartial<Empty>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  getKnownClients(
    request: DeepPartial<Empty>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<KnownClientsResponse>;
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

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export type ServerStreamingMethodResult<Response> = {
  [Symbol.asyncIterator](): AsyncIterator<Response, void>;
};
