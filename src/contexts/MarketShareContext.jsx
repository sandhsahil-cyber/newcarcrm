import React, { createContext, useContext, useState, useEffect } from 'react';

const MarketShareContext = createContext();

export const MarketShareProvider = ({ children }) => {
  const [rtoData, setRtoData] = useState(() => {
    const saved = localStorage.getItem('rtoMarketShareData');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (rtoData) {
      localStorage.setItem('rtoMarketShareData', JSON.stringify(rtoData));
    }
  }, [rtoData]);

  const updateRtoData = (data) => {
    setRtoData(data);
  };

  const clearRtoData = () => {
    setRtoData(null);
    localStorage.removeItem('rtoMarketShareData');
  };

  return (
    <MarketShareContext.Provider value={{ rtoData, updateRtoData, clearRtoData }}>
      {children}
    </MarketShareContext.Provider>
  );
};

export const useMarketShare = () => {
  const context = useContext(MarketShareContext);
  if (!context) {
    throw new Error('useMarketShare must be used within a MarketShareProvider');
  }
  return context;
};
