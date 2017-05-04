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
  session: Session
}

type Session {
  id: String!
  user: User!
}

# the schema allows the following query:
type Query {
  articles(offset: Int!, limit: Int!): [Article]
  articlesByUser(username: String!, offset: Int!, limit: Int!): [Article]
  articlesByTag(tag: String!, offset: Int!, limit: Int!): [Article]
  articleById(id: String!): Article
  articleBySlug(slug: String!): Article

  tags: [Tag]

  users: [User]
  userById(id: String!): User
  userByEmail(email: String!): User
  userByUsername(username: String!): User
}

type Mutation {
  sessionWithEmail(email: String!, password: String!): Session
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`
