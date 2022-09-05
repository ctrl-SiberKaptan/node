/* eslint-disable */
import {
  PageRequest,
  PageResponse,
} from "../../../cosmos/base/query/v1beta1/pagination";
import { FullStaker } from "./query";
import { Valaccount } from "../../stakers/v1beta1/stakers";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.query.v1beta1";

/** QueryStakersRequest is the request type for the Query/Stakers RPC method. */
export interface QueryStakersRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/** QueryStakersResponse is the response type for the Query/Stakers RPC method. */
export interface QueryStakersResponse {
  /** stakers ... */
  stakers: FullStaker[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryStakerRequest is the request type for the Query/Staker RPC method. */
export interface QueryStakerRequest {
  /** address ... */
  address: string;
}

/** QueryStakerResponse is the response type for the Query/Staker RPC method. */
export interface QueryStakerResponse {
  /** staker ... */
  staker?: FullStaker;
}

/** QueryStakersByPoolRequest is the request type for the Query/Staker RPC method. */
export interface QueryStakersByPoolRequest {
  /** pool_id ... */
  pool_id: string;
}

/** QueryStakersByPoolResponse is the response type for the Query/Staker RPC method. */
export interface QueryStakersByPoolResponse {
  /** stakers ... */
  stakers: StakerPoolResponse[];
}

/** StakerPoolResponse ... */
export interface StakerPoolResponse {
  /** staker ... */
  staker?: FullStaker;
  /** valaccount ... */
  valaccount?: Valaccount;
}

function createBaseQueryStakersRequest(): QueryStakersRequest {
  return { pagination: undefined };
}

export const QueryStakersRequest = {
  encode(
    message: QueryStakersRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryStakersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryStakersRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryStakersRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakersRequest>, I>>(
    object: I
  ): QueryStakersRequest {
    const message = createBaseQueryStakersRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryStakersResponse(): QueryStakersResponse {
  return { stakers: [], pagination: undefined };
}

export const QueryStakersResponse = {
  encode(
    message: QueryStakersResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.stakers) {
      FullStaker.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryStakersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stakers.push(FullStaker.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryStakersResponse {
    return {
      stakers: Array.isArray(object?.stakers)
        ? object.stakers.map((e: any) => FullStaker.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryStakersResponse): unknown {
    const obj: any = {};
    if (message.stakers) {
      obj.stakers = message.stakers.map((e) =>
        e ? FullStaker.toJSON(e) : undefined
      );
    } else {
      obj.stakers = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakersResponse>, I>>(
    object: I
  ): QueryStakersResponse {
    const message = createBaseQueryStakersResponse();
    message.stakers =
      object.stakers?.map((e) => FullStaker.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryStakerRequest(): QueryStakerRequest {
  return { address: "" };
}

export const QueryStakerRequest = {
  encode(
    message: QueryStakerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryStakerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryStakerRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: QueryStakerRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakerRequest>, I>>(
    object: I
  ): QueryStakerRequest {
    const message = createBaseQueryStakerRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryStakerResponse(): QueryStakerResponse {
  return { staker: undefined };
}

export const QueryStakerResponse = {
  encode(
    message: QueryStakerResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.staker !== undefined) {
      FullStaker.encode(message.staker, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryStakerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.staker = FullStaker.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryStakerResponse {
    return {
      staker: isSet(object.staker)
        ? FullStaker.fromJSON(object.staker)
        : undefined,
    };
  },

  toJSON(message: QueryStakerResponse): unknown {
    const obj: any = {};
    message.staker !== undefined &&
      (obj.staker = message.staker
        ? FullStaker.toJSON(message.staker)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakerResponse>, I>>(
    object: I
  ): QueryStakerResponse {
    const message = createBaseQueryStakerResponse();
    message.staker =
      object.staker !== undefined && object.staker !== null
        ? FullStaker.fromPartial(object.staker)
        : undefined;
    return message;
  },
};

function createBaseQueryStakersByPoolRequest(): QueryStakersByPoolRequest {
  return { pool_id: "0" };
}

export const QueryStakersByPoolRequest = {
  encode(
    message: QueryStakersByPoolRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryStakersByPoolRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakersByPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryStakersByPoolRequest {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
    };
  },

  toJSON(message: QueryStakersByPoolRequest): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakersByPoolRequest>, I>>(
    object: I
  ): QueryStakersByPoolRequest {
    const message = createBaseQueryStakersByPoolRequest();
    message.pool_id = object.pool_id ?? "0";
    return message;
  },
};

function createBaseQueryStakersByPoolResponse(): QueryStakersByPoolResponse {
  return { stakers: [] };
}

export const QueryStakersByPoolResponse = {
  encode(
    message: QueryStakersByPoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.stakers) {
      StakerPoolResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryStakersByPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakersByPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stakers.push(
            StakerPoolResponse.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryStakersByPoolResponse {
    return {
      stakers: Array.isArray(object?.stakers)
        ? object.stakers.map((e: any) => StakerPoolResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryStakersByPoolResponse): unknown {
    const obj: any = {};
    if (message.stakers) {
      obj.stakers = message.stakers.map((e) =>
        e ? StakerPoolResponse.toJSON(e) : undefined
      );
    } else {
      obj.stakers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakersByPoolResponse>, I>>(
    object: I
  ): QueryStakersByPoolResponse {
    const message = createBaseQueryStakersByPoolResponse();
    message.stakers =
      object.stakers?.map((e) => StakerPoolResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStakerPoolResponse(): StakerPoolResponse {
  return { staker: undefined, valaccount: undefined };
}

export const StakerPoolResponse = {
  encode(
    message: StakerPoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.staker !== undefined) {
      FullStaker.encode(message.staker, writer.uint32(10).fork()).ldelim();
    }
    if (message.valaccount !== undefined) {
      Valaccount.encode(message.valaccount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StakerPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStakerPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.staker = FullStaker.decode(reader, reader.uint32());
          break;
        case 2:
          message.valaccount = Valaccount.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StakerPoolResponse {
    return {
      staker: isSet(object.staker)
        ? FullStaker.fromJSON(object.staker)
        : undefined,
      valaccount: isSet(object.valaccount)
        ? Valaccount.fromJSON(object.valaccount)
        : undefined,
    };
  },

  toJSON(message: StakerPoolResponse): unknown {
    const obj: any = {};
    message.staker !== undefined &&
      (obj.staker = message.staker
        ? FullStaker.toJSON(message.staker)
        : undefined);
    message.valaccount !== undefined &&
      (obj.valaccount = message.valaccount
        ? Valaccount.toJSON(message.valaccount)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StakerPoolResponse>, I>>(
    object: I
  ): StakerPoolResponse {
    const message = createBaseStakerPoolResponse();
    message.staker =
      object.staker !== undefined && object.staker !== null
        ? FullStaker.fromPartial(object.staker)
        : undefined;
    message.valaccount =
      object.valaccount !== undefined && object.valaccount !== null
        ? Valaccount.fromPartial(object.valaccount)
        : undefined;
    return message;
  },
};

/** QueryStakers ... */
export interface QueryStakers {
  /** Stakers queries for all stakers. */
  Stakers(request: QueryStakersRequest): Promise<QueryStakersResponse>;
  /** Staker queries for all stakers. */
  Staker(request: QueryStakerRequest): Promise<QueryStakerResponse>;
  /** StakersByPool queries for all stakers that are currently participating in the given pool */
  StakersByPool(
    request: QueryStakersByPoolRequest
  ): Promise<QueryStakersByPoolResponse>;
}

export class QueryStakersClientImpl implements QueryStakers {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Stakers = this.Stakers.bind(this);
    this.Staker = this.Staker.bind(this);
    this.StakersByPool = this.StakersByPool.bind(this);
  }
  Stakers(request: QueryStakersRequest): Promise<QueryStakersResponse> {
    const data = QueryStakersRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.query.v1beta1.QueryStakers",
      "Stakers",
      data
    );
    return promise.then((data) =>
      QueryStakersResponse.decode(new _m0.Reader(data))
    );
  }

  Staker(request: QueryStakerRequest): Promise<QueryStakerResponse> {
    const data = QueryStakerRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.query.v1beta1.QueryStakers",
      "Staker",
      data
    );
    return promise.then((data) =>
      QueryStakerResponse.decode(new _m0.Reader(data))
    );
  }

  StakersByPool(
    request: QueryStakersByPoolRequest
  ): Promise<QueryStakersByPoolResponse> {
    const data = QueryStakersByPoolRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.query.v1beta1.QueryStakers",
      "StakersByPool",
      data
    );
    return promise.then((data) =>
      QueryStakersByPoolResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
