import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Market = {
   __typename?: 'Market',
  base: Scalars['String'],
  quote: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  /** 
 * getChartById(id: ID!): Chart
   * getCurrentUser: User
   * getDashboard(userId: ID!): Dashboard
 */
  getMarkets?: Maybe<Array<Maybe<Market>>>,
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
    