export interface IMarket {
  id?: string
  active: boolean
  trader: string
  category: string
  type: string
  base: string
  quote: string
  maker: string
  taker: string
  precisionAmount: number
  precisionBase: number
  precisionPrice: number
  precisionQuote: number
}
