import React from 'react';
import { OptionData } from '../types';
import './OptionsTable.css';

interface OptionsTableProps {
  options: OptionData[];
}

export const OptionsTable: React.FC<OptionsTableProps> = ({ options }) => {
  const formatNumber = (num: number, decimals: number = 2): string => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const formatPercent = (num: number): string => {
    return `${(num * 100).toFixed(1)}%`;
  };

  const getFlowColor = (netFlow: number): string => {
    if (netFlow > 0) return 'positive';
    if (netFlow < 0) return 'negative';
    return 'neutral';
  };

  if (options.length === 0) {
    return (
      <div className="no-results">
        <p>No options found matching your filters.</p>
        <p>Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="options-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Type</th>
            <th>Strike</th>
            <th>Expiration</th>
            <th>Last</th>
            <th>Bid/Ask</th>
            <th>Volume</th>
            <th>OI</th>
            <th>IV</th>
            <th>Delta</th>
            <th>Net Flow</th>
            <th>Buy/Sell</th>
            <th>Large Orders</th>
          </tr>
        </thead>
        <tbody>
          {options.map((option) => (
            <tr key={option.id}>
              <td className="symbol">{option.symbol}</td>
              <td>
                <span className={`type-badge ${option.type.toLowerCase()}`}>
                  {option.type}
                </span>
              </td>
              <td className="strike">${formatNumber(option.strike)}</td>
              <td>{new Date(option.expiration).toLocaleDateString()}</td>
              <td className="price">${formatNumber(option.lastPrice)}</td>
              <td className="bid-ask">
                ${formatNumber(option.bid)} / ${formatNumber(option.ask)}
              </td>
              <td className="volume">{formatNumber(option.volume, 0)}</td>
              <td>{formatNumber(option.openInterest, 0)}</td>
              <td>{formatPercent(option.impliedVolatility)}</td>
              <td className={option.delta > 0 ? 'positive' : 'negative'}>
                {formatNumber(option.delta, 3)}
              </td>
              <td className={getFlowColor(option.orderFlow.netFlow)}>
                {formatNumber(option.orderFlow.netFlow, 0)}
              </td>
              <td className="flow-ratio">
                <span className="buy">{formatNumber(option.orderFlow.buyVolume, 0)}</span>
                {' / '}
                <span className="sell">{formatNumber(option.orderFlow.sellVolume, 0)}</span>
              </td>
              <td className="large-orders">
                {option.orderFlow.largeOrders > 0 ? (
                  <span className="badge">{option.orderFlow.largeOrders}</span>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
