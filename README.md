# Order Flow Options Screener

A modern, real-time options flow analysis and screening tool built with React and TypeScript.

## Features

- 📊 **Real-time Options Data**: View and analyze options chains with comprehensive market data
- 🔍 **Advanced Filtering**: Filter options by symbol, type (Call/Put), volume, strike price, and implied volatility
- 📈 **Order Flow Analysis**: Track buy/sell volume, net flow, and large institutional orders
- 🎯 **Smart Sorting**: Sort by volume, net flow, IV, price, or open interest
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, professional interface with dark/light mode support

## Option Metrics Displayed

- **Symbol & Strike**: Option contract details
- **Type**: Call or Put options
- **Last Price**: Current market price
- **Bid/Ask**: Current bid and ask prices
- **Volume**: Daily trading volume
- **Open Interest (OI)**: Total open contracts
- **Implied Volatility (IV)**: Market's expectation of volatility
- **Greeks**: Delta, Gamma, Theta, Vega
- **Order Flow**: Buy/Sell volume breakdown and net flow
- **Large Orders**: Count of institutional-sized orders

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/iamdavid13/Order-flow-options-screener.git
cd Order-flow-options-screener
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## Usage

1. **Filter Options**: Use the filter controls at the top to narrow down options:
   - Enter a symbol (e.g., AAPL, SPY)
   - Select option type (All, Calls, or Puts)
   - Set minimum volume threshold
   - Define strike price range
   - Set implied volatility range

2. **Sort Results**: Choose how to sort the results:
   - Volume (highest trading activity)
   - Net Flow (bullish vs bearish sentiment)
   - Implied Volatility
   - Last Price
   - Open Interest

3. **Analyze Order Flow**: Review the order flow columns to identify:
   - Net bullish/bearish flow (green = buying pressure, red = selling pressure)
   - Buy/Sell volume breakdown
   - Large institutional orders

4. **Refresh Data**: Click the "Refresh Data" button to get new market snapshots

## Technology Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe code
- **Vite**: Fast build tool and dev server
- **CSS3**: Custom styling with dark/light mode

## Demo Data

This application uses mock data for demonstration purposes. In a production environment, you would integrate with:
- Market data APIs (e.g., IEX Cloud, Alpha Vantage, TD Ameritrade API)
- Real-time WebSocket feeds for live updates
- Options data providers (e.g., CBOE, Bloomberg, OptionMetrics)

## Disclaimer

⚠️ **Important**: This is a demonstration application with mock data for educational purposes only. This is not financial advice. Always conduct your own research and consult with a qualified financial advisor before making investment decisions.

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
