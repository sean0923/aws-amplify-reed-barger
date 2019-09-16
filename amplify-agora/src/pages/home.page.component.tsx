import React from 'react';

import { API, graphqlOperation } from 'aws-amplify';
import NewMarket from '../components/new-market.component';
import MarketList from '../components/market-list.component';
import { searchMarkets } from '../graphql/queries';

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
    e.preventDefault();
    setIsSearching(true);
    API.graphql(
      graphqlOperation(searchMarkets, {
        filter: {
          or: [
            { name: { match: searchTerm } },
            { owner: { match: searchTerm } },
            { tags: { match: searchTerm } },
          ],
        },
      })
    )
      .then((resp: any) => {
        console.log('resp: ', resp);
        setIsSearching(false);
        setSearchResults(resp.data.searchMarkets.items);
      })
      .catch((err: any) => {
        console.log('err: ', err);
      });
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
      <MarketList searchTerm={searchTerm} searchResults={searchResults} />
    </>
  );
};

export default HomePage;
