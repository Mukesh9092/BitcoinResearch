import gql from 'graphql-tag';
export type Maybe<T> = T | null;
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
};


export type Market = {
   __typename?: 'Market',
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
  base: Scalars['String'],
  quote: Scalars['String'],
  from: Scalars['DateTime'],
  to: Scalars['DateTime'],
  period: Period
};


export type MutationDeleteChartArgs = {
  chartId: Scalars['ID']
};

export type Ohlcv = {
   __typename?: 'OHLCV',
  market: Market,
  period: Period,
  base: Scalars['String'],
  quote: Scalars['String'],
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
  base: Scalars['String'],
  quote: Scalars['String'],
  period: Period,
  from: Scalars['DateTime'],
  to: Scalars['DateTime']
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
};




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
    