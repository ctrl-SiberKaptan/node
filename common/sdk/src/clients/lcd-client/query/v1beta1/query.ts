import { kyve, cosmos } from "@kyve/proto";
import kyveQuery = kyve.query.v1beta1.kyveQuery;
import kyveQueryRes = kyve.query.v1beta1.kyveQuery;

import kyveQueryAccount = kyve.query.v1beta1.kyveQueryAccount;
import kyveQueryAccountRes = kyve.query.v1beta1.kyveQueryAccountRes;
import kyveQueryBundles = kyve.query.v1beta1.kyveQueryBundles;
import kyveQueryBundlesRes = kyve.query.v1beta1.kyveQueryBundlesRes;
import kyveQueryPools = kyve.query.v1beta1.kyveQueryPools;
import kyveQueryPoolsRes = kyve.query.v1beta1.kyveQueryPoolsRes;
import kyveQueryStakersRes = kyve.query.v1beta1.kyveQueryStakersRes;
import kyveQueryStakers = kyve.query.v1beta1.kyveQueryStakers;
import kyveQueryDelegation = kyve.query.v1beta1.kyveQueryDelegation;
import kyveQueryDelegationRes = kyve.query.v1beta1.kyveQueryDelegationRes;
import kyveQueryParamsReq = kyve.query.v1beta1.kyveQueryParams;
import kyveQueryParamsRes = kyve.query.v1beta1.kyveQueryParams;
import PageRequest = cosmos.registry.v1beta1.cosmosPaginationQuery.PageRequest;
import { AbstractKyveLCDClient } from "../../lcd-client.abstract";

type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R>
    ? Array<NestedPartial<R>>
    : NestedPartial<T[K]>;
};
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
type PaginationRequestType = {
  offset: string;
  limit: string;
  count_total: boolean;
  reverse: boolean;
  key: string;
};
type PaginationPartialRequestUtilType<T extends { pagination?: PageRequest }> =
  Overwrite<T, { pagination?: Partial<PaginationRequestType> }>;
type PaginationAllPartialRequestUtilType<T> = NestedPartial<
  Overwrite<
    T,
    {
      pagination?: {
        offset: string;
        limit: string;
        count_total: boolean;
        reverse: boolean;
        key: string;
      };
    }
  >
>;

type PaginationResponseTypeUtil<T> = Overwrite<
  T,
  { pagination?: { next_key: string; total: string } }
>;

export class KyveRegistryLCDClient extends AbstractKyveLCDClient {
  constructor(restEndpoint: string) {
    super(restEndpoint);
  }

  async params(): Promise<kyveQueryParamsRes.QueryParamsResponse> {
    const endpoint = `/kyve/query/v1beta1/params`;
    return await this.request(endpoint);
  }

  /** Pools **/
  async pool(
    params: kyveQueryPools.QueryPoolRequest
  ): Promise<kyveQueryPoolsRes.QueryPoolResponse> {
    const endpoint = `/kyve/query/v1beta1/pool/${params.id}`;
    return await this.request(endpoint);
  }

  async pools(
    params?: PaginationAllPartialRequestUtilType<kyveQueryPools.QueryPoolsRequest>
  ): Promise<PaginationResponseTypeUtil<kyveQueryPoolsRes.QueryPoolsResponse>> {
    const parameters: Record<string, any> = {};
    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }

    if (typeof params?.search !== "undefined") {
      parameters.search = params.search;
    }

    if (typeof params?.runtime !== "undefined") {
      parameters.runtime = params.runtime;
    }

    if (typeof params?.paused !== "undefined") {
      parameters.paused = params.paused;
    }

    const endpoint = `/kyve/query/v1beta1/pools`;
    return await this.request(endpoint, parameters);
  }
  /** end Pools **/
  /** Stakers **/
  async stakers(
    params: PaginationPartialRequestUtilType<kyveQueryStakers.QueryStakersRequest>
  ): Promise<
    PaginationResponseTypeUtil<kyveQueryStakersRes.QueryStakersResponse>
  > {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }
    const endpoint = `/kyve/query/v1beta1/stakers`;
    return await this.request(endpoint, params);
  }

  async staker(
    params: kyveQueryStakers.QueryStakerRequest
  ): Promise<kyveQueryStakersRes.QueryStakerResponse> {
    const endpoint = `/kyve/query/v1beta1/staker/${params.address}`;
    return await this.request(endpoint);
  }

  async stakersByPool(
    params: kyveQueryStakers.QueryStakersByPoolRequest
  ): Promise<kyveQueryStakersRes.QueryStakersByPoolResponse> {
    const endpoint = `/kyve/query/v1beta1/stakers_by_pool/${params.pool_id}`;
    return await this.request(endpoint);
  }
  /** end stakers **/

  // async finalizedBundles(
  //   params: PaginationPartialRequestUtilType<kyveQueryBundles.QueryFinalizedBundlesRequest>
  // ): Promise<
  //   PaginationResponseTypeUtil<kyveQueryRes.QueryFinalizedBundlesResponse>
  // > {
  //   const parameters: Record<string, any> = {};
  //
  //   if (typeof params?.pagination !== "undefined") {
  //     parameters.pagination = params.pagination;
  //   }
  //   const endpoint = `kyve/query/v1beta1/finalized_bundles/${params.pool_id}`;
  //   return await this.request(endpoint, parameters);
  // }
  /** Bundles **/
  async finalizedBundle(
    params: kyveQueryBundles.QueryFinalizedBundleRequest
  ): Promise<kyveQueryBundles.QueryFinalizedBundleResponse> {
    const endpoint = `/kyve/query/v1beta1/finalized_bundle/${params.pool_id}/${params.id}`;
    return await this.request(endpoint);
  }

  async finalizedBundles(
    params: PaginationPartialRequestUtilType<kyveQueryBundles.QueryFinalizedBundlesRequest>
  ): Promise<
    PaginationResponseTypeUtil<kyveQueryBundlesRes.QueryFinalizedBundlesResponse>
  > {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }
    const endpoint = `/kyve/query/v1beta1/finalized_bundles/${params.pool_id}`;
    return await this.request(endpoint, parameters);
  }
  async currentVoteStatus(
    params: kyveQueryBundles.QueryCurrentVoteStatusRequest
  ): Promise<kyveQueryBundlesRes.QueryCurrentVoteStatusResponse> {
    const endpoint = `/kyve/query/v1beta1/current_vote_status/${params.pool_id}`;
    return await this.request(endpoint);
  }

  async canValidate(
    params: kyveQueryBundles.QueryCanValidateRequest
  ): Promise<kyveQueryBundles.QueryCanValidateResponse> {
    const endpoint = `/kyve/query/v1beta1/can_validate/${params.pool_id}/${params.valaddress}`;
    return await this.request(endpoint);
  }
  async canPropose(
    params: kyveQueryBundles.QueryCanProposeRequest
  ): Promise<kyveQueryBundles.QueryCanProposeResponse> {
    const endpoint = `/kyve/query/v1beta1/can_propose/${params.pool_id}/${params.staker}/${params.proposer}/${params.from_height}`;
    return await this.request(endpoint);
  }
  async canVote(
    params: kyveQueryBundles.QueryCanVoteRequest
  ): Promise<kyveQueryBundles.QueryCanVoteResponse> {
    const endpoint = `/kyve/query/v1beta1/can_vote/${params.pool_id}/${params.staker}/${params.voter}/${params.storage_id}`;
    return await this.request(endpoint);
  }
  /** end Bundles **/
  /** Delegations **/
  async delegator(
    params: kyveQueryDelegation.QueryDelegatorRequest
  ): Promise<kyveQueryDelegationRes.QueryDelegatorResponse> {
    const endpoint = `/kyve/query/v1beta1/delegator/${params.staker}/${params.delegator}`;
    return await this.request(endpoint);
  }
  async delegatorsByStaker(
    params: PaginationPartialRequestUtilType<kyveQueryDelegation.QueryDelegatorsByStakerRequest>
  ): Promise<
    PaginationResponseTypeUtil<kyveQueryDelegationRes.QueryDelegatorsByStakerResponse>
  > {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }
    const endpoint = `/kyve/query/v1beta1/delegators_by_staker/${params.staker}`;
    return await this.request(endpoint, parameters);
  }
  async stakersByDelegator(
    params: PaginationPartialRequestUtilType<kyveQueryDelegation.QueryStakersByDelegatorRequest>
  ): Promise<
    PaginationResponseTypeUtil<kyveQueryDelegationRes.QueryStakersByDelegatorResponse>
  > {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }
    const endpoint = `/kyve/query/v1beta1/stakers_by_delegator/${params.delegator}`;
    return await this.request(endpoint, parameters);
  }
  /** end Delegations **/

  /*** Account **/
  async accountAssets(
    params: kyveQueryAccount.QueryAccountAssetsRequest
  ): Promise<kyveQueryAccountRes.QueryAccountAssetsResponse> {
    const endpoint = `/kyve/query/v1beta1/account_assets/${params.address}`;
    return await this.request(endpoint);
  }

  async accountDelegationUnbondings(
    params: PaginationPartialRequestUtilType<kyveQueryAccount.QueryAccountDelegationUnbondingsRequest>
  ): Promise<
    PaginationResponseTypeUtil<kyveQueryAccountRes.QueryAccountDelegationUnbondingsResponse>
  > {
    const endpoint = `/kyve/query/v1beta1/account_delegation_unbondings/${params.address}`;
    return await this.request(endpoint);
  }
  async accountFundedList(
    params: kyveQueryAccount.QueryAccountFundedListRequest
  ): Promise<kyveQueryAccountRes.QueryAccountFundedListResponse> {
    const endpoint = `/kyve/query/v1beta1/account_funded_list/${params.address}`;
    return await this.request(endpoint);
  }
  async accountRedelegation(
    params: kyveQueryAccount.QueryAccountRedelegationRequest
  ): Promise<kyveQueryAccountRes.QueryAccountRedelegationResponse> {
    const endpoint = `/kyve/query/v1beta1/account_redelegation/${params.address}`;
    return await this.request(endpoint);
  }
  /** End Account **/
}
