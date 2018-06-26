const schema = `
  scalar Date
  
  type MarketInfo {
    symbol: String!
    status: String
    baseAsset: String!
    baseAssetPrecision: Int!
    quoteAsset: String!
    quotePrecision: Int
    orderTypes: [String]!
  }
  
  type MarketFilter {
    filterType: String!
    minPrice: String
    maxPrice: String
    minQty: String
    maxQty: String
    tickSize: String
    stepSize: String
    minNotional: String
  }
  
  type MarketLimitsMinMax {
    min: Int
    max: Int
  }
  
  type MarketLimits {
    amount: MarketLimitsMinMax!
    price: MarketLimitsMinMax!
    cost: MarketLimitsMinMax!
  }
  
  type MarketPrecision {
    base: Int!
    quote: Int!
    amount: Int!
    price: Int!
  }

  type Market {
    active: Boolean!
    base: String!
    baseId: String!
    filters: [MarketFilter]!
    icebergAllowed: Boolean!
    id: String!
    info: MarketInfo!
    limits: MarketLimits!
    lot: Boolean!
    maker: Int!
    percentage: Boolean!
    precision: MarketPrecision!
    quote: String!
    quoteId: String!
    symbol: String!
    taker: Int!
    tierBased: Boolean!
  }

  type OrderBookEntry {
    rate: String!
    amount: String!
  }

  type OrderBook {
    key: String!

    bids: [OrderBookEntry]
    asks: [OrderBookEntry]
  }

  type OHLC {
    date: Int!
    open: Float!
    high: Float!
    low: Float!
    close: Float!
    volume: Float!
    quoteVolume: Float!
    weightedAverage: Float!
  }

  type RootQuery {
    market: Market
    markets: [Market]
    orderBook(key: String!): OrderBook
    getOHLC(key: String!, size: String!, from: Date!, to: Date!): [OHLC]
  }

  type OrderBookModifyEvent {
    key: String!
    mutationType: String!
    mutationSide: String!
    rate: String!
    amount: String!
  }

  type OrderBookRemoveEvent {
    key: String!
    mutationType: String!
    mutationSide: String!
    rate: String!
    amount: String!
  }

  type OrderBookNewTradeEvent {
    key: String!
    mutationType: String!
    mutationSide: String!
    rate: String!
    amount: String!
  }

  type RootSubscription {
    orderBookModify(key: String!): OrderBookModifyEvent
    orderBookRemove(key: String!): OrderBookRemoveEvent
    orderBookNewTrade(key: String!): OrderBookNewTradeEvent
  }

  schema {
    query: RootQuery
    subscription: RootSubscription
  }
`

export default schema
