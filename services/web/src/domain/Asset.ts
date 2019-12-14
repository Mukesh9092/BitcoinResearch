export interface Asset {
  active: boolean
  base: string
  baseId: string
  id: string
  maker: number
  percentage: boolean
  precision_amount: number
  precision_base: number
  precision_price: number
  precision_quote: number
  quote: string
  quoteId: string
  symbol: string
  taker: number
  tierBased: boolean
}
