export default `
scalar Date

type Article {
  id: String!
  title: String!
  slug: String!
  body: String!
  created: Date!
  updated: Date!
  user: User!
  comments: [Comment]
  tags: [Tag]
}

type Comment {
  id: String!
  body: String!
  created: Date!
  updated: Date!
  user: User!
  article: Article!
}

type Tag {
  id: String!
  label: String!
  articles: [Article]
}

type User {
  id: String!
  email: String!
  username: String!
  articles: [Article]
  comments: [Comment]
  sessions: [Session]
}

type Session {
  app: String!
  token: String!
  ttl: Int!
  user: User
  ip: String!
}

type Sessions {
  sessions: [Session]
}

type SessionToken {
  token: String!
}

type SessionActivity {
  activity: Int!
}

type SessionsDestroyed {
  destroyed: Int!
}

# the schema allows the following query:
type Query {
  articles(offset: Int!, limit: Int!, token: String!): [Article]
  articlesByUser(username: String!, offset: Int!, limit: Int!, token: String!): [Article]
  articlesByTag(tag: String!, offset: Int!, limit: Int!, token: String!): [Article]
  articleById(id: String!, token: String!): Article
  articleBySlug(slug: String!, token: String!): Article

  tags(token: String!): [Tag]

  users(token: String!): [User]
  userById(id: String!, token: String!): User
  userByEmail(email: String!, token: String!): User
  userByUsername(username: String!, token: String!): User

  sessionGet(token: String!): Session
  sessionGetActive(deltaTime: Int!): ActiveSessions
  sessionGetActivity(deltaTime: Int!): SessionActivity
  sessionGetUser(userId: String!): UserSessions
}

type Mutation {
  sessionCreate(userId: String!, ip: String, ttl: Int): SessionToken
  sessionUpdate(token: String!, d: Object!): Session
  sessionDestroy(token: String!): SessionsDestroyed
  sessionDestroyUser(userId: String!): SessionsDestroyed
  sessionDestroyAll: SessionsDestroyed

  sessionForGuest: Session
  sessionForEmailPassword(email: String!, password: String!): Session
  sessionWithEmail(email: String!, password: String!): Session
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`
