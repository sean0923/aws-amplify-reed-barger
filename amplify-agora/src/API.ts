/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateMarketInput = {
  id?: string | null,
  name: string,
  tags?: Array< string | null > | null,
  owner: string,
  createdAt?: string | null,
};

export type UpdateMarketInput = {
  id: string,
  name?: string | null,
  tags?: Array< string | null > | null,
  owner?: string | null,
  createdAt?: string | null,
};

export type DeleteMarketInput = {
  id?: string | null,
};

export type CreateProductInput = {
  id?: string | null,
  description: string,
  file: S3ObjectInput,
  price: number,
  shipped: boolean,
  owner?: string | null,
  createdAt?: string | null,
  productMarketId?: string | null,
};

export type S3ObjectInput = {
  bucket: string,
  region: string,
  key: string,
};

export type UpdateProductInput = {
  id: string,
  description?: string | null,
  file?: S3ObjectInput | null,
  price?: number | null,
  shipped?: boolean | null,
  owner?: string | null,
  createdAt?: string | null,
  productMarketId?: string | null,
};

export type DeleteProductInput = {
  id?: string | null,
};

export type CreateUserInput = {
  id?: string | null,
  username: string,
  email: string,
  registered?: boolean | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  email?: string | null,
  registered?: boolean | null,
};

export type CreateOrderInput = {
  id?: string | null,
  shippingAddress?: ShippingAddressInput | null,
  createdAt?: string | null,
  orderProductId?: string | null,
  orderUserId?: string | null,
};

export type ShippingAddressInput = {
  city: string,
  country: string,
  address_line1: string,
  address_state: string,
  address_zip: string,
};

export type ModelMarketFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  tags?: ModelStringFilterInput | null,
  owner?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  and?: Array< ModelMarketFilterInput | null > | null,
  or?: Array< ModelMarketFilterInput | null > | null,
  not?: ModelMarketFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelProductFilterInput = {
  id?: ModelIDFilterInput | null,
  description?: ModelStringFilterInput | null,
  price?: ModelFloatFilterInput | null,
  shipped?: ModelBooleanFilterInput | null,
  owner?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  and?: Array< ModelProductFilterInput | null > | null,
  or?: Array< ModelProductFilterInput | null > | null,
  not?: ModelProductFilterInput | null,
};

export type ModelFloatFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanFilterInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type SearchableMarketFilterInput = {
  id?: SearchableIDFilterInput | null,
  name?: SearchableStringFilterInput | null,
  tags?: SearchableStringFilterInput | null,
  owner?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableMarketFilterInput | null > | null,
  or?: Array< SearchableMarketFilterInput | null > | null,
  not?: SearchableMarketFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
};

export type SearchableMarketSortInput = {
  field?: SearchableMarketSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableMarketSortableFields {
  id = "id",
  name = "name",
  tags = "tags",
  owner = "owner",
  createdAt = "createdAt",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type CreateMarketMutationVariables = {
  input: CreateMarketInput,
};

export type CreateMarketMutation = {
  createMarket:  {
    __typename: "Market",
    id: string,
    name: string,
    tags: Array< string | null > | null,
    owner: string,
    products:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        description: string,
        market:  {
          __typename: "Market",
          id: string,
          name: string,
          tags: Array< string | null > | null,
          owner: string,
          createdAt: string | null,
        } | null,
        file:  {
          __typename: "S3Object",
          bucket: string,
          region: string,
          key: string,
        },
        price: number,
        shipped: boolean,
        owner: string | null,
        createdAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string | null,
  } | null,
};

export type UpdateMarketMutationVariables = {
  input: UpdateMarketInput,
};

export type UpdateMarketMutation = {
  updateMarket:  {
    __typename: "Market",
    id: string,
    name: string,
    tags: Array< string | null > | null,
    owner: string,
    products:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        description: string,
        market:  {
          __typename: "Market",
          id: string,
          name: string,
          tags: Array< string | null > | null,
          owner: string,
          createdAt: string | null,
        } | null,
        file:  {
          __typename: "S3Object",
          bucket: string,
          region: string,
          key: string,
        },
        price: number,
        shipped: boolean,
        owner: string | null,
        createdAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string | null,
  } | null,
};

export type DeleteMarketMutationVariables = {
  input: DeleteMarketInput,
};

export type DeleteMarketMutation = {
  deleteMarket:  {
    __typename: "Market",
    id: string,
    name: string,
    tags: Array< string | null > | null,
    owner: string,
    products:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        description: string,
        market:  {
          __typename: "Market",
          id: string,
          name: string,
          tags: Array< string | null > | null,
          owner: string,
          createdAt: string | null,
        } | null,
        file:  {
          __typename: "S3Object",
          bucket: string,
          region: string,
          key: string,
        },
        price: number,
        shipped: boolean,
        owner: string | null,
        createdAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string | null,
  } | null,
};

export type CreateProductMutationVariables = {
  input: CreateProductInput,
};

export type CreateProductMutation = {
  createProduct:  {
    __typename: "Product",
    id: string,
    description: string,
    market:  {
      __typename: "Market",
      id: string,
      name: string,
      tags: Array< string | null > | null,
      owner: string,
      products:  {
        __typename: "ModelProductConnection",
        items:  Array< {
          __typename: "Product",
          id: string,
          description: string,
          price: number,
          shipped: boolean,
          owner: string | null,
          createdAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
    } | null,
    file:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    },
    price: number,
    shipped: boolean,
    owner: string | null,
    createdAt: string | null,
  } | null,
};

export type UpdateProductMutationVariables = {
  input: UpdateProductInput,
};

export type UpdateProductMutation = {
  updateProduct:  {
    __typename: "Product",
    id: string,
    description: string,
    market:  {
      __typename: "Market",
      id: string,
      name: string,
      tags: Array< string | null > | null,
      owner: string,
      products:  {
        __typename: "ModelProductConnection",
        items:  Array< {
          __typename: "Product",
          id: string,
          description: string,
          price: number,
          shipped: boolean,
          owner: string | null,
          createdAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
    } | null,
    file:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    },
    price: number,
    shipped: boolean,
    owner: string | null,
    createdAt: string | null,
  } | null,
};

export type DeleteProductMutationVariables = {
  input: DeleteProductInput,
};

export type DeleteProductMutation = {
  deleteProduct:  {
    __typename: "Product",
    id: string,
    description: string,
    market:  {
      __typename: "Market",
      id: string,
      name: string,
      tags: Array< string | null > | null,
      owner: string,
      products:  {
        __typename: "ModelProductConnection",
        items:  Array< {
          __typename: "Product",
          id: string,
          description: string,
          price: number,
          shipped: boolean,
          owner: string | null,
          createdAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
    } | null,
    file:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    },
    price: number,
    shipped: boolean,
    owner: string | null,
    createdAt: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    registered: boolean | null,
    orders:  {
      __typename: "ModelOrderConnection",
      items:  Array< {
        __typename: "Order",
        id: string,
        product:  {
          __typename: "Product",
          id: string,
          description: string,
          price: number,
          shipped: boolean,
          owner: string | null,
          createdAt: string | null,
        } | null,
        user:  {
          __typename: "User",
          id: string,
          username: string,
          email: string,
          registered: boolean | null,
        } | null,
        shippingAddress:  {
          __typename: "ShippingAddress",
          city: string,
          country: string,
          address_line1: string,
          address_state: string,
          address_zip: string,
        } | null,
        createdAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    registered: boolean | null,
    orders:  {
      __typename: "ModelOrderConnection",
      items:  Array< {
        __typename: "Order",
        id: string,
        product:  {
          __typename: "Product",
          id: string,
          description: string,
          price: number,
          shipped: boolean,
          owner: string | null,
          createdAt: string | null,
        } | null,
        user:  {
          __typename: "User",
          id: string,
          username: string,
          email: string,
          registered: boolean | null,
        } | null,
        shippingAddress:  {
          __typename: "ShippingAddress",
          city: string,
          country: string,
          address_line1: string,
          address_state: string,
          address_zip: string,
        } | null,
        createdAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateOrderMutationVariables = {
  input: CreateOrderInput,
};

export type CreateOrderMutation = {
  createOrder:  {
    __typename: "Order",
    id: string,
    product:  {
      __typename: "Product",
      id: string,
      description: string,
      market:  {
        __typename: "Market",
        id: string,
        name: string,
        tags: Array< string | null > | null,
        owner: string,
        products:  {
          __typename: "ModelProductConnection",
          nextToken: string | null,
        } | null,
        createdAt: string | null,
      } | null,
      file:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      price: number,
      shipped: boolean,
      owner: string | null,
      createdAt: string | null,
    } | null,
    user:  {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      registered: boolean | null,
      orders:  {
        __typename: "ModelOrderConnection",
        items:  Array< {
          __typename: "Order",
          id: string,
          createdAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
    } | null,
    shippingAddress:  {
      __typename: "ShippingAddress",
      city: string,
      country: string,
      address_line1: string,
      address_state: string,
      address_zip: string,
    } | null,
    createdAt: string | null,
  } | null,
};

export type GetMarketQueryVariables = {
  id: string,
};

export type GetMarketQuery = {
  getMarket:  {
    __typename: "Market",
    id: string,
    name: string,
    tags: Array< string | null > | null,
    owner: string,
    products:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        description: string,
        market:  {
          __typename: "Market",
          id: string,
          name: string,
          tags: Array< string | null > | null,
          owner: string,
          createdAt: string | null,
        } | null,
        file:  {
          __typename: "S3Object",
          bucket: string,
          region: string,
          key: string,
        },
        price: number,
        shipped: boolean,
        owner: string | null,
        createdAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string | null,
  } | null,
};

export type ListMarketsQueryVariables = {
  filter?: ModelMarketFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMarketsQuery = {
  listMarkets:  {
    __typename: "ModelMarketConnection",
    items:  Array< {
      __typename: "Market",
      id: string,
      name: string,
      tags: Array< string | null > | null,
      owner: string,
      products:  {
        __typename: "ModelProductConnection",
        items:  Array< {
          __typename: "Product",
          id: string,
          description: string,
          price: number,
          shipped: boolean,
          owner: string | null,
          createdAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetProductQueryVariables = {
  id: string,
};

export type GetProductQuery = {
  getProduct:  {
    __typename: "Product",
    id: string,
    description: string,
    market:  {
      __typename: "Market",
      id: string,
      name: string,
      tags: Array< string | null > | null,
      owner: string,
      products:  {
        __typename: "ModelProductConnection",
        items:  Array< {
          __typename: "Product",
          id: string,
          description: string,
          price: number,
          shipped: boolean,
          owner: string | null,
          createdAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
    } | null,
    file:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    },
    price: number,
    shipped: boolean,
    owner: string | null,
    createdAt: string | null,
  } | null,
};

export type ListProductsQueryVariables = {
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsQuery = {
  listProducts:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      description: string,
      market:  {
        __typename: "Market",
        id: string,
        name: string,
        tags: Array< string | null > | null,
        owner: string,
        products:  {
          __typename: "ModelProductConnection",
          nextToken: string | null,
        } | null,
        createdAt: string | null,
      } | null,
      file:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      price: number,
      shipped: boolean,
      owner: string | null,
      createdAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    registered: boolean | null,
    orders:  {
      __typename: "ModelOrderConnection",
      items:  Array< {
        __typename: "Order",
        id: string,
        product:  {
          __typename: "Product",
          id: string,
          description: string,
          price: number,
          shipped: boolean,
          owner: string | null,
          createdAt: string | null,
        } | null,
        user:  {
          __typename: "User",
          id: string,
          username: string,
          email: string,
          registered: boolean | null,
        } | null,
        shippingAddress:  {
          __typename: "ShippingAddress",
          city: string,
          country: string,
          address_line1: string,
          address_state: string,
          address_zip: string,
        } | null,
        createdAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type SearchMarketsQueryVariables = {
  filter?: SearchableMarketFilterInput | null,
  sort?: SearchableMarketSortInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SearchMarketsQuery = {
  searchMarkets:  {
    __typename: "SearchableMarketConnection",
    items:  Array< {
      __typename: "Market",
      id: string,
      name: string,
      tags: Array< string | null > | null,
      owner: string,
      products:  {
        __typename: "ModelProductConnection",
        items:  Array< {
          __typename: "Product",
          id: string,
          description: string,
          price: number,
          shipped: boolean,
          owner: string | null,
          createdAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateMarketSubscription = {
  onCreateMarket:  {
    __typename: "Market",
    id: string,
    name: string,
    tags: Array< string | null > | null,
    owner: string,
    products:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        description: string,
        market:  {
          __typename: "Market",
          id: string,
          name: string,
          tags: Array< string | null > | null,
          owner: string,
          createdAt: string | null,
        } | null,
        file:  {
          __typename: "S3Object",
          bucket: string,
          region: string,
          key: string,
        },
        price: number,
        shipped: boolean,
        owner: string | null,
        createdAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string | null,
  } | null,
};

export type OnUpdateMarketSubscription = {
  onUpdateMarket:  {
    __typename: "Market",
    id: string,
    name: string,
    tags: Array< string | null > | null,
    owner: string,
    products:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        description: string,
        market:  {
          __typename: "Market",
          id: string,
          name: string,
          tags: Array< string | null > | null,
          owner: string,
          createdAt: string | null,
        } | null,
        file:  {
          __typename: "S3Object",
          bucket: string,
          region: string,
          key: string,
        },
        price: number,
        shipped: boolean,
        owner: string | null,
        createdAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string | null,
  } | null,
};

export type OnDeleteMarketSubscription = {
  onDeleteMarket:  {
    __typename: "Market",
    id: string,
    name: string,
    tags: Array< string | null > | null,
    owner: string,
    products:  {
      __typename: "ModelProductConnection",
      items:  Array< {
        __typename: "Product",
        id: string,
        description: string,
        market:  {
          __typename: "Market",
          id: string,
          name: string,
          tags: Array< string | null > | null,
          owner: string,
          createdAt: string | null,
        } | null,
        file:  {
          __typename: "S3Object",
          bucket: string,
          region: string,
          key: string,
        },
        price: number,
        shipped: boolean,
        owner: string | null,
        createdAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string | null,
  } | null,
};

export type OnCreateProductSubscriptionVariables = {
  owner: string,
};

export type OnCreateProductSubscription = {
  onCreateProduct:  {
    __typename: "Product",
    id: string,
    description: string,
    market:  {
      __typename: "Market",
      id: string,
      name: string,
      tags: Array< string | null > | null,
      owner: string,
      products:  {
        __typename: "ModelProductConnection",
        items:  Array< {
          __typename: "Product",
          id: string,
          description: string,
          price: number,
          shipped: boolean,
          owner: string | null,
          createdAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
    } | null,
    file:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    },
    price: number,
    shipped: boolean,
    owner: string | null,
    createdAt: string | null,
  } | null,
};

export type OnUpdateProductSubscriptionVariables = {
  owner: string,
};

export type OnUpdateProductSubscription = {
  onUpdateProduct:  {
    __typename: "Product",
    id: string,
    description: string,
    market:  {
      __typename: "Market",
      id: string,
      name: string,
      tags: Array< string | null > | null,
      owner: string,
      products:  {
        __typename: "ModelProductConnection",
        items:  Array< {
          __typename: "Product",
          id: string,
          description: string,
          price: number,
          shipped: boolean,
          owner: string | null,
          createdAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
    } | null,
    file:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    },
    price: number,
    shipped: boolean,
    owner: string | null,
    createdAt: string | null,
  } | null,
};

export type OnDeleteProductSubscriptionVariables = {
  owner: string,
};

export type OnDeleteProductSubscription = {
  onDeleteProduct:  {
    __typename: "Product",
    id: string,
    description: string,
    market:  {
      __typename: "Market",
      id: string,
      name: string,
      tags: Array< string | null > | null,
      owner: string,
      products:  {
        __typename: "ModelProductConnection",
        items:  Array< {
          __typename: "Product",
          id: string,
          description: string,
          price: number,
          shipped: boolean,
          owner: string | null,
          createdAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      createdAt: string | null,
    } | null,
    file:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    },
    price: number,
    shipped: boolean,
    owner: string | null,
    createdAt: string | null,
  } | null,
};
