import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getMarket } from '../../graphql/queries';
import { onDeleteProduct, onCreateProduct, onUpdateProduct } from '../../graphql/subscriptions';
import * as ApiTypes from '../../API';
import { AuthContext } from '../../context/auth/auth.context';

interface HookOutput {
  marketId: string;
  auth: any;
  marketData: any;
  isLoading: boolean;
}

interface HookInput {
  params: {
    marketId: string;
  };
}

type Hook = (match: HookInput) => HookOutput;

const useMarketLogic: Hook = (match) => {
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

  // * create product subscription
  React.useEffect(() => {
    const createProductListener = API.graphql(
      graphqlOperation(onCreateProduct, { owner })
    ).subscribe({
      next: (productData: any) => {
        const createdProduct = productData.value.data.onCreateProduct;
        const prevProducts = marketData.products.items.filter(
          (item: any) => item.id !== createdProduct.id
        );

        const updatedProducts = [createdProduct, ...prevProducts];
        const market = { ...marketData };
        market.products.items = updatedProducts;
        setMarketData(market);
      },
    });

    return () => {
      createProductListener.unsubscribe();
    };
  }, [marketData, owner]);

  // * update product subscription
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
  }, [marketData, owner]);

  // * delete product subscription
  React.useEffect(() => {
    const deleteProductListner = API.graphql(
      graphqlOperation(onDeleteProduct, { owner })
    ).subscribe({
      next: (productData: any) => {
        const deletedProduct = productData.value.data.onDeleteProduct;

        const prevProducts = marketData.products.items.filter(
          (item: any) => item.id !== deletedProduct.id
        );

        const market = { ...marketData };
        market.products.items = prevProducts;
        setMarketData(market);
      },
    });

    return () => {
      deleteProductListner.unsubscribe();
    };
  }, [marketData, owner]);

  return { marketId, auth, marketData, setMarketData, isLoading, setIsLoading };
};

export default useMarketLogic;
