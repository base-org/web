/* eslint-disable */
import type { CallContext, CallOptions } from 'nice-grpc-common';
import _m0 from 'protobufjs/minimal';

export const protobufPackage = 'coinbase.key_automation';

export interface GrantRequest {
  /** Optional. Defaults to the project and config name tags from the request's IAM credentials */
  scope: string;
  region: string;
  skipCache: boolean;
}

/** The response message containing the key grant token */
export interface GrantReply {
  grantToken: string;
  tokenSet: GrantToken[];
}

/** An individual grant token as returned in a multi-token reply */
export interface GrantToken {
  scope: string;
  grantToken: string;
  accountId: string;
  region: string;
}

function createBaseGrantRequest(): GrantRequest {
  return { scope: '', region: '', skipCache: false };
}

export const GrantRequest = {
  encode(message: GrantRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scope !== '') {
      writer.uint32(10).string(message.scope);
    }
    if (message.region !== '') {
      writer.uint32(18).string(message.region);
    }
    if (message.skipCache === true) {
      writer.uint32(24).bool(message.skipCache);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GrantRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrantRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.scope = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.region = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.skipCache = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GrantRequest {
    return {
      scope: isSet(object.scope) ? globalThis.String(object.scope) : '',
      region: isSet(object.region) ? globalThis.String(object.region) : '',
      skipCache: isSet(object.skipCache) ? globalThis.Boolean(object.skipCache) : false,
    };
  },

  toJSON(message: GrantRequest): unknown {
    const obj: any = {};
    if (message.scope !== '') {
      obj.scope = message.scope;
    }
    if (message.region !== '') {
      obj.region = message.region;
    }
    if (message.skipCache === true) {
      obj.skipCache = message.skipCache;
    }
    return obj;
  },

  create(base?: DeepPartial<GrantRequest>): GrantRequest {
    return GrantRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GrantRequest>): GrantRequest {
    const message = createBaseGrantRequest();
    message.scope = object.scope ?? '';
    message.region = object.region ?? '';
    message.skipCache = object.skipCache ?? false;
    return message;
  },
};

function createBaseGrantReply(): GrantReply {
  return { grantToken: '', tokenSet: [] };
}

export const GrantReply = {
  encode(message: GrantReply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.grantToken !== '') {
      writer.uint32(10).string(message.grantToken);
    }
    for (const v of message.tokenSet) {
      GrantToken.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GrantReply {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrantReply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.grantToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.tokenSet.push(GrantToken.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GrantReply {
    return {
      grantToken: isSet(object.grantToken) ? globalThis.String(object.grantToken) : '',
      tokenSet: globalThis.Array.isArray(object?.tokenSet)
        ? object.tokenSet.map((e: any) => GrantToken.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GrantReply): unknown {
    const obj: any = {};
    if (message.grantToken !== '') {
      obj.grantToken = message.grantToken;
    }
    if (message.tokenSet?.length) {
      obj.tokenSet = message.tokenSet.map((e) => GrantToken.toJSON(e));
    }
    return obj;
  },

  create(base?: DeepPartial<GrantReply>): GrantReply {
    return GrantReply.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GrantReply>): GrantReply {
    const message = createBaseGrantReply();
    message.grantToken = object.grantToken ?? '';
    message.tokenSet = object.tokenSet?.map((e) => GrantToken.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGrantToken(): GrantToken {
  return { scope: '', grantToken: '', accountId: '', region: '' };
}

export const GrantToken = {
  encode(message: GrantToken, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scope !== '') {
      writer.uint32(10).string(message.scope);
    }
    if (message.grantToken !== '') {
      writer.uint32(18).string(message.grantToken);
    }
    if (message.accountId !== '') {
      writer.uint32(26).string(message.accountId);
    }
    if (message.region !== '') {
      writer.uint32(34).string(message.region);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GrantToken {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGrantToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.scope = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.grantToken = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.accountId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.region = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GrantToken {
    return {
      scope: isSet(object.scope) ? globalThis.String(object.scope) : '',
      grantToken: isSet(object.grantToken) ? globalThis.String(object.grantToken) : '',
      accountId: isSet(object.accountId) ? globalThis.String(object.accountId) : '',
      region: isSet(object.region) ? globalThis.String(object.region) : '',
    };
  },

  toJSON(message: GrantToken): unknown {
    const obj: any = {};
    if (message.scope !== '') {
      obj.scope = message.scope;
    }
    if (message.grantToken !== '') {
      obj.grantToken = message.grantToken;
    }
    if (message.accountId !== '') {
      obj.accountId = message.accountId;
    }
    if (message.region !== '') {
      obj.region = message.region;
    }
    return obj;
  },

  create(base?: DeepPartial<GrantToken>): GrantToken {
    return GrantToken.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GrantToken>): GrantToken {
    const message = createBaseGrantToken();
    message.scope = object.scope ?? '';
    message.grantToken = object.grantToken ?? '';
    message.accountId = object.accountId ?? '';
    message.region = object.region ?? '';
    return message;
  },
};

/** The KeyGrantor service definition */
export type KeyGrantorDefinition = typeof KeyGrantorDefinition;
export const KeyGrantorDefinition = {
  name: 'KeyGrantor',
  fullName: 'coinbase.key_automation.KeyGrantor',
  methods: {
    /** Grant a key to the requester based on the request's signed IAM credentials */
    grantKey: {
      name: 'GrantKey',
      requestType: GrantRequest,
      requestStream: false,
      responseType: GrantReply,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface KeyGrantorServiceImplementation<CallContextExt = {}> {
  /** Grant a key to the requester based on the request's signed IAM credentials */
  grantKey(
    request: GrantRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<GrantReply>>;
}

export interface KeyGrantorClient<CallOptionsExt = {}> {
  /** Grant a key to the requester based on the request's signed IAM credentials */
  grantKey(
    request: DeepPartial<GrantRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<GrantReply>;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
