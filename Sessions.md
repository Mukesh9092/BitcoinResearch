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




- browser requests a page without token, for example GET /
  - hits nginx at GET /
    - forwards to app service
  - hits app service at GET /
    - middleware detects no token
      - a session is created and saved in the request
    - renders page for GET /
    - returns the page with token in the header

- browser requests POST /api/authentication/local with body { email: 'admin@test.com', password: 'test' } with token 12345
  - hits nginx at POST /api
    - forwards to api service
  - hits api service at POST /api/authentication/local with body { email: 'admin@test.com', password: 'test' } with token 12345
    - middleware detects the token
      - a session is loaded and saved in the request
