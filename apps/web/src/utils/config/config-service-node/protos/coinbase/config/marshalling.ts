/* eslint-disable */
import _m0 from 'protobufjs/minimal';
import { Parameter, ParameterID, ScopeID } from './resources';

export const protobufPackage = 'coinbase.config';

/** ChangeEvent occurs when a scope or parameter changes. */
export interface ChangeEvent {
  type: ChangeEvent_EventType;
  /** The old version, for retrieving what the previous value was. */
  oldVersionId: string;
  /** The new version representing the current version. */
  newVersionId: string;
  /** scope_id will be set if this change was for a scope. */
  scopeId?: ScopeID | undefined;
  /** param_id will be set if this change was for a parameter. */
  paramId?: ParameterID | undefined;
  /** The author of the change. */
  author: string;
}

/** The type of change, either update or create. */
export enum ChangeEvent_EventType {
  UNKNOWN = 0,
  CREATE = 1,
  UPDATE = 2,
  UNRECOGNIZED = -1,
}

export function changeEvent_EventTypeFromJSON(object: any): ChangeEvent_EventType {
  switch (object) {
    case 0:
    case 'UNKNOWN':
      return ChangeEvent_EventType.UNKNOWN;
    case 1:
    case 'CREATE':
      return ChangeEvent_EventType.CREATE;
    case 2:
    case 'UPDATE':
      return ChangeEvent_EventType.UPDATE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ChangeEvent_EventType.UNRECOGNIZED;
  }
}

export function changeEvent_EventTypeToJSON(object: ChangeEvent_EventType): string {
  switch (object) {
    case ChangeEvent_EventType.UNKNOWN:
      return 'UNKNOWN';
    case ChangeEvent_EventType.CREATE:
      return 'CREATE';
    case ChangeEvent_EventType.UPDATE:
      return 'UPDATE';
    case ChangeEvent_EventType.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export interface ScopeBackup {
  parameters: Parameter[];
}

function createBaseChangeEvent(): ChangeEvent {
  return {
    type: 0,
    oldVersionId: '',
    newVersionId: '',
    scopeId: undefined,
    paramId: undefined,
    author: '',
  };
}

export const ChangeEvent = {
  encode(message: ChangeEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.oldVersionId !== '') {
      writer.uint32(18).string(message.oldVersionId);
    }
    if (message.newVersionId !== '') {
      writer.uint32(26).string(message.newVersionId);
    }
    if (message.scopeId !== undefined) {
      ScopeID.encode(message.scopeId, writer.uint32(34).fork()).ldelim();
    }
    if (message.paramId !== undefined) {
      ParameterID.encode(message.paramId, writer.uint32(42).fork()).ldelim();
    }
    if (message.author !== '') {
      writer.uint32(50).string(message.author);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangeEvent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeEvent();
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

          message.oldVersionId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.newVersionId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.scopeId = ScopeID.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.paramId = ParameterID.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
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

  fromJSON(object: any): ChangeEvent {
    return {
      type: isSet(object.type) ? changeEvent_EventTypeFromJSON(object.type) : 0,
      oldVersionId: isSet(object.oldVersionId) ? globalThis.String(object.oldVersionId) : '',
      newVersionId: isSet(object.newVersionId) ? globalThis.String(object.newVersionId) : '',
      scopeId: isSet(object.scopeId) ? ScopeID.fromJSON(object.scopeId) : undefined,
      paramId: isSet(object.paramId) ? ParameterID.fromJSON(object.paramId) : undefined,
      author: isSet(object.author) ? globalThis.String(object.author) : '',
    };
  },

  toJSON(message: ChangeEvent): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = changeEvent_EventTypeToJSON(message.type);
    }
    if (message.oldVersionId !== '') {
      obj.oldVersionId = message.oldVersionId;
    }
    if (message.newVersionId !== '') {
      obj.newVersionId = message.newVersionId;
    }
    if (message.scopeId !== undefined) {
      obj.scopeId = ScopeID.toJSON(message.scopeId);
    }
    if (message.paramId !== undefined) {
      obj.paramId = ParameterID.toJSON(message.paramId);
    }
    if (message.author !== '') {
      obj.author = message.author;
    }
    return obj;
  },

  create(base?: DeepPartial<ChangeEvent>): ChangeEvent {
    return ChangeEvent.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ChangeEvent>): ChangeEvent {
    const message = createBaseChangeEvent();
    message.type = object.type ?? 0;
    message.oldVersionId = object.oldVersionId ?? '';
    message.newVersionId = object.newVersionId ?? '';
    message.scopeId =
      object.scopeId !== undefined && object.scopeId !== null
        ? ScopeID.fromPartial(object.scopeId)
        : undefined;
    message.paramId =
      object.paramId !== undefined && object.paramId !== null
        ? ParameterID.fromPartial(object.paramId)
        : undefined;
    message.author = object.author ?? '';
    return message;
  },
};

function createBaseScopeBackup(): ScopeBackup {
  return { parameters: [] };
}

export const ScopeBackup = {
  encode(message: ScopeBackup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.parameters) {
      Parameter.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ScopeBackup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScopeBackup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.parameters.push(Parameter.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ScopeBackup {
    return {
      parameters: globalThis.Array.isArray(object?.parameters)
        ? object.parameters.map((e: any) => Parameter.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ScopeBackup): unknown {
    const obj: any = {};
    if (message.parameters?.length) {
      obj.parameters = message.parameters.map((e) => Parameter.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<ScopeBackup>): ScopeBackup {
    return ScopeBackup.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ScopeBackup>): ScopeBackup {
    const message = createBaseScopeBackup();
    message.parameters = object.parameters?.map((e) => Parameter.fromPartial(e)) || [];
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
