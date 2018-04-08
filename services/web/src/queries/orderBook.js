import gql from 'graphql-tag';

export const orderBookQuery = gql`
  query orderBook($marketKey: String!) {
    orderBook(marketKey: $marketKey) {
      marketKey
      bids {
        rate
        amount
      }
      asks {
        rate
        amount
      }
    }
  }
`;
