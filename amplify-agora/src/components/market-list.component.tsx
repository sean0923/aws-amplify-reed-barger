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

const MarketList = () => {
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

        return (
          <>
            <h2 className="header">
              <img
                src={utils.getIconUrl('store_mall_directory', '527FFF')}
                alt="store_mall_directory"
                className="large-icon"
              />
              Markets
            </h2>
            {data.listMarkets.items.map((market) => {
              if (!market) return null;
              if (!market.products) return null;
              if (!market.products.items) return null;

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
                        <Link to={`/markets/${2}`} className="link">
                          {market.name}
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
                        market.tags.map((tag) => {
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
