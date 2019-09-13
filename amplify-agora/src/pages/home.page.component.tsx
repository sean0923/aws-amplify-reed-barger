import React from 'react';

import NewMarket from '../components/new-market.component';
import MarketList from '../components/market-list.component';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleSearch = (e: any) => {
    // e.prevent.default();
    setIsSearching(true);
    console.log(searchTerm);
  };

  return (
    <>
      <NewMarket
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        clearSearch={clearSearch}
        handleSearch={handleSearch}
        isSearching={isSearching}
      />
      <MarketList />
    </>
  );
};

export default HomePage;
