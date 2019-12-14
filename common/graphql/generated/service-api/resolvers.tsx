import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
};

export type Chart = {
   __typename?: 'Chart',
  id: Scalars['ID'],
  dashboard: Dashboard,
  period: Period,
  market: Market,
  from: Scalars['DateTime'],
  to: Scalars['DateTime'],
};

export type Dashboard = {
   __typename?: 'Dashboard',
  id: Scalars['ID'],
  user: User,
  charts?: Maybe<Array<Chart>>,
};


export type Market = {
   __typename?: 'Market',
  id: Scalars['ID'],
  base: Scalars['String'],
  quote: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
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
   __typename?: 'OHLCV',
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
  Minute1 = 'MINUTE1',
  Minute5 = 'MINUTE5',
  Hour1 = 'HOUR1',
  Hour6 = 'HOUR6',
  Hour12 = 'HOUR12',
  Day1 = 'DAY1'
}

export type Query = {
   __typename?: 'Query',
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
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Chart: ResolverTypeWrapper<Chart>,
  Dashboard: ResolverTypeWrapper<Dashboard>,
  User: ResolverTypeWrapper<User>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Period: Period,
  Market: ResolverTypeWrapper<Market>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  OHLCV: ResolverTypeWrapper<Ohlcv>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  Mutation: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ID: Scalars['ID'],
  Chart: Chart,
  Dashboard: Dashboard,
  User: User,
  String: Scalars['String'],
  Period: Period,
  Market: Market,
  DateTime: Scalars['DateTime'],
  OHLCV: Ohlcv,
  Float: Scalars['Float'],
  Mutation: {},
  Boolean: Scalars['Boolean'],
};

export type ChartResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chart'] = ResolversParentTypes['Chart']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  dashboard?: Resolver<ResolversTypes['Dashboard'], ParentType, ContextType>,
  period?: Resolver<ResolversTypes['Period'], ParentType, ContextType>,
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>,
  from?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  to?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type DashboardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dashboard'] = ResolversParentTypes['Dashboard']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  charts?: Resolver<Maybe<Array<ResolversTypes['Chart']>>, ParentType, ContextType>,
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type MarketResolvers<ContextType = any, ParentType extends ResolversParentTypes['Market'] = ResolversParentTypes['Market']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  base?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  quote?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createChart?: Resolver<Maybe<ResolversTypes['Chart']>, ParentType, ContextType, RequireFields<MutationCreateChartArgs, 'dashboardId' | 'marketId' | 'period' | 'from' | 'to'>>,
  deleteChart?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteChartArgs, 'chartId'>>,
};

export type OhlcvResolvers<ContextType = any, ParentType extends ResolversParentTypes['OHLCV'] = ResolversParentTypes['OHLCV']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  market?: Resolver<ResolversTypes['Market'], ParentType, ContextType>,
  period?: Resolver<ResolversTypes['Period'], ParentType, ContextType>,
  datetime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  open?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  high?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  low?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  close?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  volume?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getChartById?: Resolver<Maybe<ResolversTypes['Chart']>, ParentType, ContextType, RequireFields<QueryGetChartByIdArgs, 'id'>>,
  getCurrentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  getDashboard?: Resolver<Maybe<ResolversTypes['Dashboard']>, ParentType, ContextType, RequireFields<QueryGetDashboardArgs, 'userId'>>,
  getMarkets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Market']>>>, ParentType, ContextType>,
  getOHLCVs?: Resolver<Maybe<Array<Maybe<ResolversTypes['OHLCV']>>>, ParentType, ContextType, RequireFields<QueryGetOhlcVsArgs, 'marketId' | 'period' | 'from' | 'to'>>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Chart?: ChartResolvers<ContextType>,
  Dashboard?: DashboardResolvers<ContextType>,
  DateTime?: GraphQLScalarType,
  Market?: MarketResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  OHLCV?: OhlcvResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
