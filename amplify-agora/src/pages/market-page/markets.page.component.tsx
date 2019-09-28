import React from 'react';
import { Loading, Tabs, Icon } from 'element-react';
import { RouteComponentProps, Link } from 'react-router-dom';
import NewProduct from '../../components/new-product.component';
import Product from '../../components/product.component';
import useMarketLogic from './market.logic';

interface MatchParams {
  marketId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const MarketsPage: React.FC<Props> = ({ match }) => {
  const { auth, isLoading, marketData, marketId } = useMarketLogic(match);

  if (isLoading && !marketData) {
    return <Loading fullscreen />;
  }

  if (!marketData) {
    return <div>MarketId does not exsist</div>;
  }

  let isMarketOwner = false;
  if (auth) {
    isMarketOwner = auth.username === marketData.owner;
  }

  return (
    <div>
      {/* Back Button */}
      <Link to="/" className="link">
        Back to Home
      </Link>

      {/* Market MetaData */}
      <span className="items-center pt-2">
        <h2 className="mb-mr">{/* {marketData.name} - {marketData.owner} */}</h2>
      </span>
      <div className="item-cetner pt-2">
        <span style={{ color: 'var(--lightSquidInk', paddingBottom: '1em' }}>
          <Icon name="date" className="icon" />
          {marketData.createdAt}
        </span>
      </div>

      {/* New Proudct */}
      <Tabs type="border-card" value={isMarketOwner ? '1' : '2'}>
        {isMarketOwner && (
          <Tabs.Pane
            label={
              <>
                <Icon name="plus" className="icon" />
                Add Product
              </>
            }
            name="1"
          >
            <NewProduct marketId={marketId} />
          </Tabs.Pane>
        )}

        {/* Products List */}
        <Tabs.Pane
          label={
            <>
              <Icon name="plus" className="icon" />
              Products({marketData.products.items.length})
            </>
          }
          name="2"
        >
          {
            <div className="product-list">
              {marketData.products.items.map((product: any, idx: any) => {
                return <Product key={idx} product={product} />;
              })}
            </div>
          }
        </Tabs.Pane>
      </Tabs>
    </div>
  );
};

export default MarketsPage;
