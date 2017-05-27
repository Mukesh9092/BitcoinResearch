# Sessions
How to get sessions to work?

I have an app that is rendered on the client and on the server. All users
should be authenticated. What is the best way to implement authentication?

Right now I see two ways:

## 1) HTTP Headers
Set the session token in a HTTP header. Store it in a Cookie. Requests that
have no session token get a new one so that all users, anonymous or not, have a
session in the system.

## 2) GraphQL API
Let all authentication pass through GraphQL. Every Mutation and Query include a
`token` parameter that is the session token.

  1) Let all authentication pass through GraphQL. Require GraphQL API to take a
     token with every query/mutation.
  2) Use HTTP headers for authentication.
