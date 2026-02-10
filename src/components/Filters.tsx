import React from 'react';
import { FilterOptions } from '../types';
import './Filters.css';

interface FiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const handleChange = (key: keyof FilterOptions, value: string | number) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label>
          Symbol:
          <input
            type="text"
            placeholder="e.g., AAPL, SPY"
            value={filters.symbol}
            onChange={(e) => handleChange('symbol', e.target.value.toUpperCase())}
          />
        </label>
      </div>

      <div className="filter-group">
        <label>
          Type:
          <select
            value={filters.optionType}
            onChange={(e) => handleChange('optionType', e.target.value as 'All' | 'Call' | 'Put')}
          >
            <option value="All">All</option>
            <option value="Call">Calls</option>
            <option value="Put">Puts</option>
          </select>
        </label>
      </div>

      <div className="filter-group">
        <label>
          Min Volume:
          <input
            type="number"
            value={filters.minVolume}
            onChange={(e) => handleChange('minVolume', Number(e.target.value))}
            min="0"
          />
        </label>
      </div>

      <div className="filter-group">
        <label>
          Strike Range:
          <div className="range-inputs">
            <input
              type="number"
              placeholder="Min"
              value={filters.minStrike || ''}
              onChange={(e) => handleChange('minStrike', Number(e.target.value))}
              min="0"
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxStrike || ''}
              onChange={(e) => handleChange('maxStrike', Number(e.target.value))}
              min="0"
            />
          </div>
        </label>
      </div>

      <div className="filter-group">
        <label>
          IV Range:
          <div className="range-inputs">
            <input
              type="number"
              placeholder="Min"
              value={filters.minIV || ''}
              onChange={(e) => handleChange('minIV', Number(e.target.value))}
              min="0"
              step="0.1"
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxIV || ''}
              onChange={(e) => handleChange('maxIV', Number(e.target.value))}
              min="0"
              step="0.1"
            />
          </div>
        </label>
      </div>

      <div className="filter-group">
        <label>
          Sort By:
          <select
            value={filters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
          >
            <option value="volume">Volume</option>
            <option value="orderFlow.netFlow">Net Flow</option>
            <option value="impliedVolatility">IV</option>
            <option value="lastPrice">Last Price</option>
            <option value="openInterest">Open Interest</option>
          </select>
        </label>
      </div>

      <div className="filter-group">
        <label>
          Order:
          <select
            value={filters.sortOrder}
            onChange={(e) => handleChange('sortOrder', e.target.value as 'asc' | 'desc')}
          >
            <option value="desc">Highest First</option>
            <option value="asc">Lowest First</option>
          </select>
        </label>
      </div>

      <button
        className="reset-button"
        onClick={() =>
          onFilterChange({
            symbol: '',
            minVolume: 0,
            maxStrike: 0,
            minStrike: 0,
            optionType: 'All',
            minIV: 0,
            maxIV: 0,
            sortBy: 'volume',
            sortOrder: 'desc',
          })
        }
      >
        Reset Filters
      </button>
    </div>
  );
};
