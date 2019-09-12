import React from 'react';

import NewMarket from '../components/new-market.component';
import MarketList from '../components/market-list.component';

const HomePage: React.FC = () => {
  return (
    <>
      <NewMarket />
      <MarketList />
    </>
  );
};

export default HomePage;
