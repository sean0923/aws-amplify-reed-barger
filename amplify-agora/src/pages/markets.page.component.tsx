import React from 'react';
import { Loading, Tabs, Icon } from 'element-react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { getMarket } from '../graphql/queries';
import { onDeleteProduct, onCreateProduct, onUpdateProduct } from '../graphql/subscriptions';
import * as ApiTypes from '../API';
import { AuthContext } from '../context/auth/auth.context';
import NewProduct from '../components/new-product.component';
import Product from '../components/product.component';

interface MatchParams {
  marketId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const MarketsPage: React.FC<Props> = ({ match }) => {
  const { marketId } = match.params;
  const { auth } = React.useContext(AuthContext);
  const owner = auth.username;
  const [marketData, setMarketData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  // 3d5b53dd-8205-4fd2-bdf1-9405caf151e8

  React.useEffect(() => {
    let hasUnmounted = false;

    const fetchMarketData = () => {
      const input = { id: marketId };
      setIsLoading(true);
      API.graphql(graphqlOperation(getMarket, input))
        .then(({ data }: { data: ApiTypes.GetMarketQuery }) => {
          if (data.getMarket) {
            if (!hasUnmounted) {
              setIsLoading(false);
              setMarketData(data.getMarket);
            }
          }
        })
        .catch((err: any) => {
          if (!hasUnmounted) {
            setIsLoading(false);
          }
          console.error('err: ', err);
        });
    };

    fetchMarketData();

    return () => {
      hasUnmounted = true;
    };
  }, [marketId]);

  // React.useEffect(() => {
  //   const createProductListener = API.graphql(graphqlOperation(onCreateProduct)).subscribe({
  //     next: (productData: any) => {
  //       const createdProduct = productData.value.data.onCreateProduct;
  //       const prevProducts = marketData.products.items.filter(
  //         (item: any) => item.id !== createdProduct.id
  //       );

  //       const updatedProducts = [createdProduct, ...prevProducts];
  //       const market = { ...marketData };
  //       market.products.items = updatedProducts;
  //       setMarketData(market);
  //     },
  //   });

  //   return createProductListener;
  // }, [marketData]);

  React.useEffect(() => {
    const updateProductListner = API.graphql(
      graphqlOperation(onUpdateProduct, { owner })
    ).subscribe({
      next: (productData: any) => {
        const updatedProduct = productData.value.data.onUpdateProduct;
        const updatedProductIndex = marketData.products.items.findIndex(
          (item: any) => item.id === updatedProduct.id
        );

        const updatedProducts = [
          ...marketData.products.items.slice(0, updatedProductIndex),
          updatedProduct,
          ...marketData.products.items.slice(updatedProductIndex + 1),
        ];
        const market = { ...marketData };
        market.products.items = updatedProducts;
        console.log('updatedProducts: ', updatedProducts);
        setMarketData(market);
      },
    });

    return () => {
      updateProductListner.unsubscribe();
    };
  }, [marketData]);

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
