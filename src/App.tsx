import { useState, useEffect, useMemo } from 'react';
import { OptionData, FilterOptions } from './types';
import { generateMockOptionsData } from './mockData';
import { Filters } from './components/Filters';
import { OptionsTable } from './components/OptionsTable';
import './App.css';

function App() {
  const [allOptions, setAllOptions] = useState<OptionData[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    symbol: '',
    minVolume: 0,
    maxStrike: 0,
    minStrike: 0,
    optionType: 'All',
    minIV: 0,
    maxIV: 0,
    sortBy: 'volume',
    sortOrder: 'desc',
  });

  useEffect(() => {
    // Generate mock data on mount
    const mockData = generateMockOptionsData(200);
    setAllOptions(mockData);
  }, []);

  const filteredAndSortedOptions = useMemo(() => {
    let filtered = [...allOptions];

    // Apply filters
    if (filters.symbol) {
      filtered = filtered.filter((opt) =>
        opt.underlying.includes(filters.symbol)
      );
    }

    if (filters.optionType !== 'All') {
      filtered = filtered.filter((opt) => opt.type === filters.optionType);
    }

    if (filters.minVolume > 0) {
      filtered = filtered.filter((opt) => opt.volume >= filters.minVolume);
    }

    if (filters.minStrike > 0) {
      filtered = filtered.filter((opt) => opt.strike >= filters.minStrike);
    }

    if (filters.maxStrike > 0) {
      filtered = filtered.filter((opt) => opt.strike <= filters.maxStrike);
    }

    if (filters.minIV > 0) {
      filtered = filtered.filter((opt) => opt.impliedVolatility >= filters.minIV);
    }

    if (filters.maxIV > 0) {
      filtered = filtered.filter((opt) => opt.impliedVolatility <= filters.maxIV);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: number;
      let bValue: number;

      if (filters.sortBy === 'orderFlow.netFlow') {
        aValue = a.orderFlow.netFlow;
        bValue = b.orderFlow.netFlow;
      } else {
        aValue = a[filters.sortBy] as number;
        bValue = b[filters.sortBy] as number;
      }

      if (filters.sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return filtered;
  }, [allOptions, filters]);

  const handleRefresh = () => {
    const mockData = generateMockOptionsData(200);
    setAllOptions(mockData);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>📊 Options Flow Screener</h1>
          <p className="subtitle">
            Real-time options order flow analysis and screening
          </p>
        </div>
        <div className="header-actions">
          <button onClick={handleRefresh} className="refresh-button">
            🔄 Refresh Data
          </button>
        </div>
      </header>

      <main className="main">
        <Filters filters={filters} onFilterChange={setFilters} />
        
        <div className="results-info">
          <span className="result-count">
            Showing {filteredAndSortedOptions.length} of {allOptions.length} options
          </span>
        </div>

        <OptionsTable options={filteredAndSortedOptions} />
      </main>

      <footer className="footer">
        <p>
          ⚠️ This is a demo application with mock data for educational purposes only.
          Not financial advice.
        </p>
      </footer>
    </div>
  );
}

export default App;
