export interface UnsanitizedOrderBookMessage {
  type: 'orderBook';
  data: {
    bids: {
      [key: string]: number;
    };
    asks: {
      [key: string]: number;
    };
  };
}

export interface UnsanitizedOrderBookModifyMessage {
  type: 'orderBookModify';
  data: {
    type: 'bid' | 'ask';
    rate: string;
    amount: string;
  };
}

export interface UnsanitizedOrderBookRemoveMessage {
  type: 'orderBookRemove';
  data: {
    type: 'bid' | 'ask';
    rate: string;
    amount: string;
  };
}

export type UnsanitizedMessage =
  | UnsanitizedOrderBookMessage
  | UnsanitizedOrderBookModifyMessage
  | UnsanitizedOrderBookRemoveMessage;

export interface OrderBookMessage {
  mutationType: 'modify' | 'remove';
  mutationSide: 'bid' | 'ask';
  rate: number;
  amount: number;
}
