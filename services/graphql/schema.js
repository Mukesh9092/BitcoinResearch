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

  type OHLCV {
    time: Date!
    open: Float!
    high: Float!
    low: Float!
    close: Float!
    volume: Float!
  }
  
  type LineIndicator { time: Date! value: Float! } type BandIndicator { time: Date! upper: Float! middle: Float! lower: Float! }

  type RootQuery {
    market: Market
    markets: [Market]
    orderBook(key: String!): OrderBook
    getOHLCV(key: String!, period: String!, from: Date!, to: Date!): [OHLCV]
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
