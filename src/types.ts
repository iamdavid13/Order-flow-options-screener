export interface OptionData {
  id: string;
  symbol: string;
  underlying: string;
  strike: number;
  expiration: string;
  type: 'Call' | 'Put';
  lastPrice: number;
  bid: number;
  ask: number;
  volume: number;
  openInterest: number;
  impliedVolatility: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  premium: number;
  bidAskSpread: number;
  orderFlow: {
    buyVolume: number;
    sellVolume: number;
    netFlow: number;
    largeOrders: number;
  };
}

export interface FilterOptions {
  symbol: string;
  minVolume: number;
  maxStrike: number;
  minStrike: number;
  optionType: 'All' | 'Call' | 'Put';
  minIV: number;
  maxIV: number;
  sortBy: keyof OptionData | 'orderFlow.netFlow';
  sortOrder: 'asc' | 'desc';
}
