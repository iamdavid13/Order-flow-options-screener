import { OptionData } from './types';

const underlyingSymbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'SPY', 'QQQ', 'AMD', 'META', 'AMZN'];
const expirations = ['2024-03-15', '2024-04-19', '2024-05-17', '2024-06-21'];

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateStrikePrices(basePrice: number): number[] {
  const strikes: number[] = [];
  const increment = basePrice > 100 ? 5 : basePrice > 50 ? 2.5 : 1;
  
  for (let i = -5; i <= 5; i++) {
    strikes.push(Number((basePrice + (i * increment)).toFixed(2)));
  }
  
  return strikes;
}

export function generateMockOptionsData(count: number = 100): OptionData[] {
  const options: OptionData[] = [];
  
  for (let i = 0; i < count; i++) {
    const underlying = underlyingSymbols[Math.floor(Math.random() * underlyingSymbols.length)];
    const basePrice = randomInRange(50, 500);
    const strikes = generateStrikePrices(basePrice);
    const strike = strikes[Math.floor(Math.random() * strikes.length)];
    const expiration = expirations[Math.floor(Math.random() * expirations.length)];
    const type = Math.random() > 0.5 ? 'Call' : 'Put';
    
    const lastPrice = randomInRange(0.5, 50);
    const spread = randomInRange(0.01, 0.5);
    const bid = lastPrice - spread / 2;
    const ask = lastPrice + spread / 2;
    
    const volume = Math.floor(randomInRange(0, 10000));
    const buyVolume = Math.floor(volume * randomInRange(0.3, 0.7));
    const sellVolume = volume - buyVolume;
    
    options.push({
      id: `${underlying}-${strike}-${expiration}-${type}-${i}`,
      symbol: `${underlying} ${new Date(expiration).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ${strike}${type === 'Call' ? 'C' : 'P'}`,
      underlying,
      strike,
      expiration,
      type,
      lastPrice: Number(lastPrice.toFixed(2)),
      bid: Number(bid.toFixed(2)),
      ask: Number(ask.toFixed(2)),
      volume,
      openInterest: Math.floor(randomInRange(0, 50000)),
      impliedVolatility: Number(randomInRange(0.15, 1.5).toFixed(2)),
      delta: Number((type === 'Call' ? randomInRange(0.1, 0.9) : randomInRange(-0.9, -0.1)).toFixed(3)),
      gamma: Number(randomInRange(0.001, 0.1).toFixed(4)),
      theta: Number(randomInRange(-0.5, -0.01).toFixed(3)),
      vega: Number(randomInRange(0.01, 0.5).toFixed(3)),
      premium: Number((lastPrice * 100).toFixed(2)),
      bidAskSpread: Number(spread.toFixed(2)),
      orderFlow: {
        buyVolume,
        sellVolume,
        netFlow: buyVolume - sellVolume,
        largeOrders: Math.floor(randomInRange(0, 50)),
      },
    });
  }
  
  return options;
}
