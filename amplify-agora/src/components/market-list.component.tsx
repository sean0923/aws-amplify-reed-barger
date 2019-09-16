import React from 'react';
import { Loading, Card, Icon, Tag } from 'element-react';
import { graphqlOperation } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';

import Error from './error.component';

import { listMarkets } from '../graphql/queries';
import * as ApiTypes from '../API';
import { Link } from 'react-router-dom';

import * as utils from '../utils/utils';
import { onCreateMarket } from '../graphql/subscriptions';

interface Props {
  searchResults: any;
  searchTerm: string;
}

const MarketList: React.FC<Props> = ({ searchResults, searchTerm }) => {
  const onNewData = (
    prevData: ApiTypes.ListMarketsQuery,
    newData: ApiTypes.OnCreateMarketSubscription
  ) => {
    if (!prevData.listMarkets) return;
    if (!prevData.listMarkets.items) return;

    const updatedData = {
      ...prevData,
      listMarkets: { items: [newData.onCreateMarket, ...prevData.listMarkets.items] },
    };

    return updatedData;
  };

  return (
    <Connect
      query={graphqlOperation(listMarkets)}
      subscription={graphqlOperation(onCreateMarket)}
      onSubscriptionMsg={onNewData}
    >
      {({
        data,
        loading,
        errors,
      }: {
        data: ApiTypes.ListMarketsQuery;
        loading: boolean;
        errors: { message: string }[];
      }) => {
        if (errors.length > 0) return <Error errors={errors} />;
        if (loading) return <Loading fullscreen />;
        if (!data.listMarkets) return <Error errors={errors} />;
        if (!data.listMarkets.items) return <Error errors={errors} />;

        const shouldDisplaySearchResults = searchResults.length !== 0;
        const marketData = shouldDisplaySearchResults ? searchResults : data.listMarkets.items;

        return (
          <>
            {shouldDisplaySearchResults ? (
              <h2 className="text-green">
                <Icon name="check" className="icon" />
                {searchResults.length} Results
              </h2>
            ) : (
              <h2 className="header">
                <img
                  src={utils.getIconUrl('store_mall_directory', '527FFF')}
                  alt="store_mall_directory"
                  className="large-icon"
                />
                Markets
              </h2>
            )}

            {marketData.map((market: any) => {
              if (!market) return null;
              if (!market.products) return null;
              if (!market.products.items) return null;
              console.log('market.id: ', market.id);

              return (
                <div className="my-2" key={market.id}>
                  <Card
                    bodyStyle={{
                      padding: '0.7em',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <span className="flex">
                        <Link to={`/markets/${market.id}`} className="link">
                          {market.name}
                          {/* {market.createdAt} */}
                        </Link>
                        <span style={{ color: 'var(--darkAmazonOrange)' }}>
                          {market.products.items.length}
                        </span>
                        <img src={utils.getIconUrl('shopping_cart', 'f60')} alt="Shopping Cart" />
                      </span>
                      <div style={{ color: 'var(--lightSquidInk)' }}>{market.owner}</div>
                    </div>
                    <div>
                      {market.tags &&
                        market.tags.map((tag: any) => {
                          if (!tag) return null;

                          return (
                            <Tag key={tag} type="danger" className="mx-1">
                              {tag}
                            </Tag>
                          );
                        })}
                    </div>
                  </Card>
                </div>
              );
            })}
          </>
        );
      }}
    </Connect>
  );
};

export default MarketList;
