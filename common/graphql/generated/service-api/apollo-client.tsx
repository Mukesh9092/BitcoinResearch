import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: Date,
};

export type Chart = {
   __typename: 'Chart',
  id: Scalars['ID'],
  dashboard: Dashboard,
  period: Period,
  market: Market,
  from: Scalars['DateTime'],
  to: Scalars['DateTime'],
};

export type Dashboard = {
   __typename: 'Dashboard',
  id: Scalars['ID'],
  user: User,
  charts?: Maybe<Array<Chart>>,
};


export type Market = {
   __typename: 'Market',
  id: Scalars['ID'],
  base: Scalars['String'],
  quote: Scalars['String'],
};

export type Mutation = {
   __typename: 'Mutation',
  createChart?: Maybe<Chart>,
  deleteChart?: Maybe<Scalars['Boolean']>,
};


export type MutationCreateChartArgs = {
  dashboardId: Scalars['ID'],
  marketId: Scalars['ID'],
  period: Period,
  from: Scalars['DateTime'],
  to: Scalars['DateTime']
};


export type MutationDeleteChartArgs = {
  chartId: Scalars['ID']
};

export type Ohlcv = {
   __typename: 'OHLCV',
  id: Scalars['ID'],
  market: Market,
  period: Period,
  datetime: Scalars['DateTime'],
  open: Scalars['Float'],
  high: Scalars['Float'],
  low: Scalars['Float'],
  close: Scalars['Float'],
  volume: Scalars['Float'],
};

export enum Period {
  MINUTE1 = 'MINUTE1',
  MINUTE5 = 'MINUTE5',
  HOUR1 = 'HOUR1',
  HOUR6 = 'HOUR6',
  HOUR12 = 'HOUR12',
  DAY1 = 'DAY1'
}

export type Query = {
   __typename: 'Query',
  getChartById?: Maybe<Chart>,
  getCurrentUser?: Maybe<User>,
  getDashboard?: Maybe<Dashboard>,
  getMarkets?: Maybe<Array<Maybe<Market>>>,
  getOHLCVs?: Maybe<Array<Maybe<Ohlcv>>>,
};


export type QueryGetChartByIdArgs = {
  id: Scalars['ID']
};


export type QueryGetDashboardArgs = {
  userId: Scalars['ID']
};


export type QueryGetOhlcVsArgs = {
  marketId: Scalars['ID'],
  period: Period,
  from: Scalars['DateTime'],
  to: Scalars['DateTime']
};

export type User = {
   __typename: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  dashboard?: Maybe<Dashboard>,
};

export const ChartFragmentDoc = gql`
    fragment Chart on Chart {
  id
  period
  dashboard {
    id
  }
  market {
    id
  }
  from
  to
}
    `;
export const DashboardFragmentDoc = gql`
    fragment Dashboard on Dashboard {
  id
  user {
    id
  }
  charts {
    id
  }
}
    `;
export const MarketFragmentDoc = gql`
    fragment Market on Market {
  id
  base
  quote
}
    `;
export const OhlcvFragmentDoc = gql`
    fragment OHLCV on OHLCV {
  id
  market {
    id
  }
  period
  datetime
  open
  high
  low
  close
  volume
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  name
}
    `;
export const CreateChartDocument = gql`
    mutation createChart($dashboardId: ID!, $marketId: ID!, $period: Period!, $from: DateTime!, $to: DateTime!) {
  createChart(dashboardId: $dashboardId, marketId: $marketId, period: $period, from: $from, to: $to) {
    ...Chart
  }
}
    ${ChartFragmentDoc}`;
export type CreateChartMutationFn = ApolloReactCommon.MutationFunction<CreateChartMutation, CreateChartMutationVariables>;
export type CreateChartProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateChartMutation, CreateChartMutationVariables> | TChildProps;
export function withCreateChart<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateChartMutation,
  CreateChartMutationVariables,
  CreateChartProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateChartMutation, CreateChartMutationVariables, CreateChartProps<TChildProps>>(CreateChartDocument, {
      alias: 'createChart',
      ...operationOptions
    });
};

/**
 * __useCreateChartMutation__
 *
 * To run a mutation, you first call `useCreateChartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChartMutation, { data, loading, error }] = useCreateChartMutation({
 *   variables: {
 *      dashboardId: // value for 'dashboardId'
 *      marketId: // value for 'marketId'
 *      period: // value for 'period'
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useCreateChartMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateChartMutation, CreateChartMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateChartMutation, CreateChartMutationVariables>(CreateChartDocument, baseOptions);
      }
export type CreateChartMutationHookResult = ReturnType<typeof useCreateChartMutation>;
export type CreateChartMutationResult = ApolloReactCommon.MutationResult<CreateChartMutation>;
export type CreateChartMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateChartMutation, CreateChartMutationVariables>;
export const DeleteChartDocument = gql`
    mutation deleteChart($chartId: ID!) {
  deleteChart(chartId: $chartId)
}
    `;
export type DeleteChartMutationFn = ApolloReactCommon.MutationFunction<DeleteChartMutation, DeleteChartMutationVariables>;
export type DeleteChartProps<TChildProps = {}> = ApolloReactHoc.MutateProps<DeleteChartMutation, DeleteChartMutationVariables> | TChildProps;
export function withDeleteChart<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteChartMutation,
  DeleteChartMutationVariables,
  DeleteChartProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteChartMutation, DeleteChartMutationVariables, DeleteChartProps<TChildProps>>(DeleteChartDocument, {
      alias: 'deleteChart',
      ...operationOptions
    });
};

/**
 * __useDeleteChartMutation__
 *
 * To run a mutation, you first call `useDeleteChartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChartMutation, { data, loading, error }] = useDeleteChartMutation({
 *   variables: {
 *      chartId: // value for 'chartId'
 *   },
 * });
 */
export function useDeleteChartMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteChartMutation, DeleteChartMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteChartMutation, DeleteChartMutationVariables>(DeleteChartDocument, baseOptions);
      }
export type DeleteChartMutationHookResult = ReturnType<typeof useDeleteChartMutation>;
export type DeleteChartMutationResult = ApolloReactCommon.MutationResult<DeleteChartMutation>;
export type DeleteChartMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteChartMutation, DeleteChartMutationVariables>;
export const GetChartByIdDocument = gql`
    query getChartById($id: ID!) {
  getChartById(id: $id) {
    ...Chart
  }
}
    ${ChartFragmentDoc}`;
export type GetChartByIdProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetChartByIdQuery, GetChartByIdQueryVariables> | TChildProps;
export function withGetChartById<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetChartByIdQuery,
  GetChartByIdQueryVariables,
  GetChartByIdProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetChartByIdQuery, GetChartByIdQueryVariables, GetChartByIdProps<TChildProps>>(GetChartByIdDocument, {
      alias: 'getChartById',
      ...operationOptions
    });
};

/**
 * __useGetChartByIdQuery__
 *
 * To run a query within a React component, call `useGetChartByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChartByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChartByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetChartByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetChartByIdQuery, GetChartByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<GetChartByIdQuery, GetChartByIdQueryVariables>(GetChartByIdDocument, baseOptions);
      }
export function useGetChartByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetChartByIdQuery, GetChartByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetChartByIdQuery, GetChartByIdQueryVariables>(GetChartByIdDocument, baseOptions);
        }
export type GetChartByIdQueryHookResult = ReturnType<typeof useGetChartByIdQuery>;
export type GetChartByIdLazyQueryHookResult = ReturnType<typeof useGetChartByIdLazyQuery>;
export type GetChartByIdQueryResult = ApolloReactCommon.QueryResult<GetChartByIdQuery, GetChartByIdQueryVariables>;
export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  getCurrentUser {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type GetCurrentUserProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetCurrentUserQuery, GetCurrentUserQueryVariables> | TChildProps;
export function withGetCurrentUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  GetCurrentUserProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetCurrentUserQuery, GetCurrentUserQueryVariables, GetCurrentUserProps<TChildProps>>(GetCurrentUserDocument, {
      alias: 'getCurrentUser',
      ...operationOptions
    });
};

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, baseOptions);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, baseOptions);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = ApolloReactCommon.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetDashboardDocument = gql`
    query getDashboard($userId: ID!) {
  getDashboard(userId: $userId) {
    id
  }
}
    `;
export type GetDashboardProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetDashboardQuery, GetDashboardQueryVariables> | TChildProps;
export function withGetDashboard<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetDashboardQuery,
  GetDashboardQueryVariables,
  GetDashboardProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetDashboardQuery, GetDashboardQueryVariables, GetDashboardProps<TChildProps>>(GetDashboardDocument, {
      alias: 'getDashboard',
      ...operationOptions
    });
};

/**
 * __useGetDashboardQuery__
 *
 * To run a query within a React component, call `useGetDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetDashboardQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDashboardQuery, GetDashboardQueryVariables>) {
        return ApolloReactHooks.useQuery<GetDashboardQuery, GetDashboardQueryVariables>(GetDashboardDocument, baseOptions);
      }
export function useGetDashboardLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDashboardQuery, GetDashboardQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetDashboardQuery, GetDashboardQueryVariables>(GetDashboardDocument, baseOptions);
        }
export type GetDashboardQueryHookResult = ReturnType<typeof useGetDashboardQuery>;
export type GetDashboardLazyQueryHookResult = ReturnType<typeof useGetDashboardLazyQuery>;
export type GetDashboardQueryResult = ApolloReactCommon.QueryResult<GetDashboardQuery, GetDashboardQueryVariables>;
export const GetMarketsDocument = gql`
    query getMarkets {
  getMarkets {
    ...Market
  }
}
    ${MarketFragmentDoc}`;
export type GetMarketsProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetMarketsQuery, GetMarketsQueryVariables> | TChildProps;
export function withGetMarkets<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMarketsQuery,
  GetMarketsQueryVariables,
  GetMarketsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetMarketsQuery, GetMarketsQueryVariables, GetMarketsProps<TChildProps>>(GetMarketsDocument, {
      alias: 'getMarkets',
      ...operationOptions
    });
};

/**
 * __useGetMarketsQuery__
 *
 * To run a query within a React component, call `useGetMarketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMarketsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMarketsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMarketsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMarketsQuery, GetMarketsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMarketsQuery, GetMarketsQueryVariables>(GetMarketsDocument, baseOptions);
      }
export function useGetMarketsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMarketsQuery, GetMarketsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMarketsQuery, GetMarketsQueryVariables>(GetMarketsDocument, baseOptions);
        }
export type GetMarketsQueryHookResult = ReturnType<typeof useGetMarketsQuery>;
export type GetMarketsLazyQueryHookResult = ReturnType<typeof useGetMarketsLazyQuery>;
export type GetMarketsQueryResult = ApolloReactCommon.QueryResult<GetMarketsQuery, GetMarketsQueryVariables>;
export const GetOhlcVsDocument = gql`
    query getOHLCVs($marketId: ID!, $period: Period!, $from: DateTime!, $to: DateTime!) {
  getOHLCVs(marketId: $marketId, period: $period, from: $from, to: $to) {
    ...OHLCV
  }
}
    ${OhlcvFragmentDoc}`;
export type GetOhlcVsProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetOhlcVsQuery, GetOhlcVsQueryVariables> | TChildProps;
export function withGetOhlcVs<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetOhlcVsQuery,
  GetOhlcVsQueryVariables,
  GetOhlcVsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetOhlcVsQuery, GetOhlcVsQueryVariables, GetOhlcVsProps<TChildProps>>(GetOhlcVsDocument, {
      alias: 'getOhlcVs',
      ...operationOptions
    });
};

/**
 * __useGetOhlcVsQuery__
 *
 * To run a query within a React component, call `useGetOhlcVsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOhlcVsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOhlcVsQuery({
 *   variables: {
 *      marketId: // value for 'marketId'
 *      period: // value for 'period'
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useGetOhlcVsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetOhlcVsQuery, GetOhlcVsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetOhlcVsQuery, GetOhlcVsQueryVariables>(GetOhlcVsDocument, baseOptions);
      }
export function useGetOhlcVsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOhlcVsQuery, GetOhlcVsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetOhlcVsQuery, GetOhlcVsQueryVariables>(GetOhlcVsDocument, baseOptions);
        }
export type GetOhlcVsQueryHookResult = ReturnType<typeof useGetOhlcVsQuery>;
export type GetOhlcVsLazyQueryHookResult = ReturnType<typeof useGetOhlcVsLazyQuery>;
export type GetOhlcVsQueryResult = ApolloReactCommon.QueryResult<GetOhlcVsQuery, GetOhlcVsQueryVariables>;
export type CreateChartMutationVariables = {
  dashboardId: Scalars['ID'],
  marketId: Scalars['ID'],
  period: Period,
  from: Scalars['DateTime'],
  to: Scalars['DateTime']
};


export type CreateChartMutation = { __typename: 'Mutation', createChart: Maybe<(
    { __typename: 'Chart' }
    & ChartFragment
  )> };

export type DeleteChartMutationVariables = {
  chartId: Scalars['ID']
};


export type DeleteChartMutation = { __typename: 'Mutation', deleteChart: Maybe<boolean> };

export type GetChartByIdQueryVariables = {
  id: Scalars['ID']
};


export type GetChartByIdQuery = { __typename: 'Query', getChartById: Maybe<(
    { __typename: 'Chart' }
    & ChartFragment
  )> };

export type GetCurrentUserQueryVariables = {};


export type GetCurrentUserQuery = { __typename: 'Query', getCurrentUser: Maybe<(
    { __typename: 'User' }
    & UserFragment
  )> };

export type GetDashboardQueryVariables = {
  userId: Scalars['ID']
};


export type GetDashboardQuery = { __typename: 'Query', getDashboard: Maybe<{ __typename: 'Dashboard', id: string }> };

export type GetMarketsQueryVariables = {};


export type GetMarketsQuery = { __typename: 'Query', getMarkets: Maybe<Array<Maybe<(
    { __typename: 'Market' }
    & MarketFragment
  )>>> };

export type GetOhlcVsQueryVariables = {
  marketId: Scalars['ID'],
  period: Period,
  from: Scalars['DateTime'],
  to: Scalars['DateTime']
};


export type GetOhlcVsQuery = { __typename: 'Query', getOHLCVs: Maybe<Array<Maybe<(
    { __typename: 'OHLCV' }
    & OhlcvFragment
  )>>> };

export type ChartFragment = { __typename: 'Chart', id: string, period: Period, from: Date, to: Date, dashboard: { __typename: 'Dashboard', id: string }, market: { __typename: 'Market', id: string } };

export type DashboardFragment = { __typename: 'Dashboard', id: string, user: { __typename: 'User', id: string }, charts: Maybe<Array<{ __typename: 'Chart', id: string }>> };

export type MarketFragment = { __typename: 'Market', id: string, base: string, quote: string };

export type OhlcvFragment = { __typename: 'OHLCV', id: string, period: Period, datetime: Date, open: number, high: number, low: number, close: number, volume: number, market: { __typename: 'Market', id: string } };

export type UserFragment = { __typename: 'User', id: string, name: string };


      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    