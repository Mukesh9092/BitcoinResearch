module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.29.2). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateChart {
  count: Int!
}

type AggregateDashboard {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type Chart implements Node {
  id: ID!
  from: DateTime!
  to: DateTime!
  period: Period!
  base: String!
  quote: String!
  dashboard: Dashboard!
}

"""A connection to a list of items."""
type ChartConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ChartEdge]!
  aggregate: AggregateChart!
}

input ChartCreateInput {
  from: DateTime!
  to: DateTime!
  period: Period!
  base: String!
  quote: String!
  dashboard: DashboardCreateOneWithoutChartsInput!
}

input ChartCreateManyWithoutDashboardInput {
  create: [ChartCreateWithoutDashboardInput!]
  connect: [ChartWhereUniqueInput!]
}

input ChartCreateWithoutDashboardInput {
  from: DateTime!
  to: DateTime!
  period: Period!
  base: String!
  quote: String!
}

"""An edge in a connection."""
type ChartEdge {
  """The item at the end of the edge."""
  node: Chart!

  """A cursor for use in pagination."""
  cursor: String!
}

enum ChartOrderByInput {
  id_ASC
  id_DESC
  from_ASC
  from_DESC
  to_ASC
  to_DESC
  period_ASC
  period_DESC
  base_ASC
  base_DESC
  quote_ASC
  quote_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ChartPreviousValues {
  id: ID!
  from: DateTime!
  to: DateTime!
  period: Period!
  base: String!
  quote: String!
}

input ChartScalarWhereInput {
  """Logical AND on all given filters."""
  AND: [ChartScalarWhereInput!]

  """Logical OR on all given filters."""
  OR: [ChartScalarWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ChartScalarWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  from: DateTime

  """All values that are not equal to given value."""
  from_not: DateTime

  """All values that are contained in given list."""
  from_in: [DateTime!]

  """All values that are not contained in given list."""
  from_not_in: [DateTime!]

  """All values less than the given value."""
  from_lt: DateTime

  """All values less than or equal the given value."""
  from_lte: DateTime

  """All values greater than the given value."""
  from_gt: DateTime

  """All values greater than or equal the given value."""
  from_gte: DateTime
  to: DateTime

  """All values that are not equal to given value."""
  to_not: DateTime

  """All values that are contained in given list."""
  to_in: [DateTime!]

  """All values that are not contained in given list."""
  to_not_in: [DateTime!]

  """All values less than the given value."""
  to_lt: DateTime

  """All values less than or equal the given value."""
  to_lte: DateTime

  """All values greater than the given value."""
  to_gt: DateTime

  """All values greater than or equal the given value."""
  to_gte: DateTime
  period: Period

  """All values that are not equal to given value."""
  period_not: Period

  """All values that are contained in given list."""
  period_in: [Period!]

  """All values that are not contained in given list."""
  period_not_in: [Period!]
  base: String

  """All values that are not equal to given value."""
  base_not: String

  """All values that are contained in given list."""
  base_in: [String!]

  """All values that are not contained in given list."""
  base_not_in: [String!]

  """All values less than the given value."""
  base_lt: String

  """All values less than or equal the given value."""
  base_lte: String

  """All values greater than the given value."""
  base_gt: String

  """All values greater than or equal the given value."""
  base_gte: String

  """All values containing the given string."""
  base_contains: String

  """All values not containing the given string."""
  base_not_contains: String

  """All values starting with the given string."""
  base_starts_with: String

  """All values not starting with the given string."""
  base_not_starts_with: String

  """All values ending with the given string."""
  base_ends_with: String

  """All values not ending with the given string."""
  base_not_ends_with: String
  quote: String

  """All values that are not equal to given value."""
  quote_not: String

  """All values that are contained in given list."""
  quote_in: [String!]

  """All values that are not contained in given list."""
  quote_not_in: [String!]

  """All values less than the given value."""
  quote_lt: String

  """All values less than or equal the given value."""
  quote_lte: String

  """All values greater than the given value."""
  quote_gt: String

  """All values greater than or equal the given value."""
  quote_gte: String

  """All values containing the given string."""
  quote_contains: String

  """All values not containing the given string."""
  quote_not_contains: String

  """All values starting with the given string."""
  quote_starts_with: String

  """All values not starting with the given string."""
  quote_not_starts_with: String

  """All values ending with the given string."""
  quote_ends_with: String

  """All values not ending with the given string."""
  quote_not_ends_with: String
}

type ChartSubscriptionPayload {
  mutation: MutationType!
  node: Chart
  updatedFields: [String!]
  previousValues: ChartPreviousValues
}

input ChartSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ChartSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ChartSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ChartSubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ChartWhereInput
}

input ChartUpdateInput {
  from: DateTime
  to: DateTime
  period: Period
  base: String
  quote: String
  dashboard: DashboardUpdateOneRequiredWithoutChartsInput
}

input ChartUpdateManyDataInput {
  from: DateTime
  to: DateTime
  period: Period
  base: String
  quote: String
}

input ChartUpdateManyMutationInput {
  from: DateTime
  to: DateTime
  period: Period
  base: String
  quote: String
}

input ChartUpdateManyWithoutDashboardInput {
  create: [ChartCreateWithoutDashboardInput!]
  connect: [ChartWhereUniqueInput!]
  disconnect: [ChartWhereUniqueInput!]
  delete: [ChartWhereUniqueInput!]
  update: [ChartUpdateWithWhereUniqueWithoutDashboardInput!]
  updateMany: [ChartUpdateManyWithWhereNestedInput!]
  deleteMany: [ChartScalarWhereInput!]
  upsert: [ChartUpsertWithWhereUniqueWithoutDashboardInput!]
}

input ChartUpdateManyWithWhereNestedInput {
  where: ChartScalarWhereInput!
  data: ChartUpdateManyDataInput!
}

input ChartUpdateWithoutDashboardDataInput {
  from: DateTime
  to: DateTime
  period: Period
  base: String
  quote: String
}

input ChartUpdateWithWhereUniqueWithoutDashboardInput {
  where: ChartWhereUniqueInput!
  data: ChartUpdateWithoutDashboardDataInput!
}

input ChartUpsertWithWhereUniqueWithoutDashboardInput {
  where: ChartWhereUniqueInput!
  update: ChartUpdateWithoutDashboardDataInput!
  create: ChartCreateWithoutDashboardInput!
}

input ChartWhereInput {
  """Logical AND on all given filters."""
  AND: [ChartWhereInput!]

  """Logical OR on all given filters."""
  OR: [ChartWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ChartWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  from: DateTime

  """All values that are not equal to given value."""
  from_not: DateTime

  """All values that are contained in given list."""
  from_in: [DateTime!]

  """All values that are not contained in given list."""
  from_not_in: [DateTime!]

  """All values less than the given value."""
  from_lt: DateTime

  """All values less than or equal the given value."""
  from_lte: DateTime

  """All values greater than the given value."""
  from_gt: DateTime

  """All values greater than or equal the given value."""
  from_gte: DateTime
  to: DateTime

  """All values that are not equal to given value."""
  to_not: DateTime

  """All values that are contained in given list."""
  to_in: [DateTime!]

  """All values that are not contained in given list."""
  to_not_in: [DateTime!]

  """All values less than the given value."""
  to_lt: DateTime

  """All values less than or equal the given value."""
  to_lte: DateTime

  """All values greater than the given value."""
  to_gt: DateTime

  """All values greater than or equal the given value."""
  to_gte: DateTime
  period: Period

  """All values that are not equal to given value."""
  period_not: Period

  """All values that are contained in given list."""
  period_in: [Period!]

  """All values that are not contained in given list."""
  period_not_in: [Period!]
  base: String

  """All values that are not equal to given value."""
  base_not: String

  """All values that are contained in given list."""
  base_in: [String!]

  """All values that are not contained in given list."""
  base_not_in: [String!]

  """All values less than the given value."""
  base_lt: String

  """All values less than or equal the given value."""
  base_lte: String

  """All values greater than the given value."""
  base_gt: String

  """All values greater than or equal the given value."""
  base_gte: String

  """All values containing the given string."""
  base_contains: String

  """All values not containing the given string."""
  base_not_contains: String

  """All values starting with the given string."""
  base_starts_with: String

  """All values not starting with the given string."""
  base_not_starts_with: String

  """All values ending with the given string."""
  base_ends_with: String

  """All values not ending with the given string."""
  base_not_ends_with: String
  quote: String

  """All values that are not equal to given value."""
  quote_not: String

  """All values that are contained in given list."""
  quote_in: [String!]

  """All values that are not contained in given list."""
  quote_not_in: [String!]

  """All values less than the given value."""
  quote_lt: String

  """All values less than or equal the given value."""
  quote_lte: String

  """All values greater than the given value."""
  quote_gt: String

  """All values greater than or equal the given value."""
  quote_gte: String

  """All values containing the given string."""
  quote_contains: String

  """All values not containing the given string."""
  quote_not_contains: String

  """All values starting with the given string."""
  quote_starts_with: String

  """All values not starting with the given string."""
  quote_not_starts_with: String

  """All values ending with the given string."""
  quote_ends_with: String

  """All values not ending with the given string."""
  quote_not_ends_with: String
  dashboard: DashboardWhereInput
}

input ChartWhereUniqueInput {
  id: ID
}

type Dashboard implements Node {
  id: ID!
  user: User!
  charts(where: ChartWhereInput, orderBy: ChartOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Chart!]
}

"""A connection to a list of items."""
type DashboardConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [DashboardEdge]!
  aggregate: AggregateDashboard!
}

input DashboardCreateInput {
  user: UserCreateOneWithoutDashboardInput!
  charts: ChartCreateManyWithoutDashboardInput
}

input DashboardCreateOneWithoutChartsInput {
  create: DashboardCreateWithoutChartsInput
  connect: DashboardWhereUniqueInput
}

input DashboardCreateOneWithoutUserInput {
  create: DashboardCreateWithoutUserInput
  connect: DashboardWhereUniqueInput
}

input DashboardCreateWithoutChartsInput {
  user: UserCreateOneWithoutDashboardInput!
}

input DashboardCreateWithoutUserInput {
  charts: ChartCreateManyWithoutDashboardInput
}

"""An edge in a connection."""
type DashboardEdge {
  """The item at the end of the edge."""
  node: Dashboard!

  """A cursor for use in pagination."""
  cursor: String!
}

enum DashboardOrderByInput {
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type DashboardPreviousValues {
  id: ID!
}

type DashboardSubscriptionPayload {
  mutation: MutationType!
  node: Dashboard
  updatedFields: [String!]
  previousValues: DashboardPreviousValues
}

input DashboardSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [DashboardSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [DashboardSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DashboardSubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: DashboardWhereInput
}

input DashboardUpdateInput {
  user: UserUpdateOneRequiredWithoutDashboardInput
  charts: ChartUpdateManyWithoutDashboardInput
}

input DashboardUpdateOneRequiredWithoutChartsInput {
  create: DashboardCreateWithoutChartsInput
  connect: DashboardWhereUniqueInput
  update: DashboardUpdateWithoutChartsDataInput
  upsert: DashboardUpsertWithoutChartsInput
}

input DashboardUpdateOneWithoutUserInput {
  create: DashboardCreateWithoutUserInput
  connect: DashboardWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: DashboardUpdateWithoutUserDataInput
  upsert: DashboardUpsertWithoutUserInput
}

input DashboardUpdateWithoutChartsDataInput {
  user: UserUpdateOneRequiredWithoutDashboardInput
}

input DashboardUpdateWithoutUserDataInput {
  charts: ChartUpdateManyWithoutDashboardInput
}

input DashboardUpsertWithoutChartsInput {
  update: DashboardUpdateWithoutChartsDataInput!
  create: DashboardCreateWithoutChartsInput!
}

input DashboardUpsertWithoutUserInput {
  update: DashboardUpdateWithoutUserDataInput!
  create: DashboardCreateWithoutUserInput!
}

input DashboardWhereInput {
  """Logical AND on all given filters."""
  AND: [DashboardWhereInput!]

  """Logical OR on all given filters."""
  OR: [DashboardWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DashboardWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  user: UserWhereInput
  charts_every: ChartWhereInput
  charts_some: ChartWhereInput
  charts_none: ChartWhereInput
}

input DashboardWhereUniqueInput {
  id: ID
}

scalar DateTime

"""Raw JSON value"""
scalar Json

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createUser(data: UserCreateInput!): User!
  createDashboard(data: DashboardCreateInput!): Dashboard!
  createChart(data: ChartCreateInput!): Chart!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateDashboard(data: DashboardUpdateInput!, where: DashboardWhereUniqueInput!): Dashboard
  updateChart(data: ChartUpdateInput!, where: ChartWhereUniqueInput!): Chart
  deleteUser(where: UserWhereUniqueInput!): User
  deleteDashboard(where: DashboardWhereUniqueInput!): Dashboard
  deleteChart(where: ChartWhereUniqueInput!): Chart
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertDashboard(where: DashboardWhereUniqueInput!, create: DashboardCreateInput!, update: DashboardUpdateInput!): Dashboard!
  upsertChart(where: ChartWhereUniqueInput!, create: ChartCreateInput!, update: ChartUpdateInput!): Chart!
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  updateManyCharts(data: ChartUpdateManyMutationInput!, where: ChartWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyDashboards(where: DashboardWhereInput): BatchPayload!
  deleteManyCharts(where: ChartWhereInput): BatchPayload!
  executeRaw(database: PrismaDatabase, query: String!): Json!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

enum Period {
  MINUTE1
  MINUTE15
  HOUR1
  HOUR6
  HOUR12
  DAY1
}

enum PrismaDatabase {
  default
}

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  dashboards(where: DashboardWhereInput, orderBy: DashboardOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Dashboard]!
  charts(where: ChartWhereInput, orderBy: ChartOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Chart]!
  user(where: UserWhereUniqueInput!): User
  dashboard(where: DashboardWhereUniqueInput!): Dashboard
  chart(where: ChartWhereUniqueInput!): Chart
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  dashboardsConnection(where: DashboardWhereInput, orderBy: DashboardOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DashboardConnection!
  chartsConnection(where: ChartWhereInput, orderBy: ChartOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ChartConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  dashboard(where: DashboardSubscriptionWhereInput): DashboardSubscriptionPayload
  chart(where: ChartSubscriptionWhereInput): ChartSubscriptionPayload
}

type User implements Node {
  id: ID!
  name: String!
  dashboard: Dashboard
}

"""A connection to a list of items."""
type UserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  dashboard: DashboardCreateOneWithoutUserInput
}

input UserCreateOneWithoutDashboardInput {
  create: UserCreateWithoutDashboardInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutDashboardInput {
  name: String!
}

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [UserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserSubscriptionWhereInput!]

  """The subscription event gets dispatched when it's listed in mutation_in"""
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  name: String
  dashboard: DashboardUpdateOneWithoutUserInput
}

input UserUpdateManyMutationInput {
  name: String
}

input UserUpdateOneRequiredWithoutDashboardInput {
  create: UserCreateWithoutDashboardInput
  connect: UserWhereUniqueInput
  update: UserUpdateWithoutDashboardDataInput
  upsert: UserUpsertWithoutDashboardInput
}

input UserUpdateWithoutDashboardDataInput {
  name: String
}

input UserUpsertWithoutDashboardInput {
  update: UserUpdateWithoutDashboardDataInput!
  create: UserCreateWithoutDashboardInput!
}

input UserWhereInput {
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  dashboard: DashboardWhereInput
}

input UserWhereUniqueInput {
  id: ID
}
`
      }
    