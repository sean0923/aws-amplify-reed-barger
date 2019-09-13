// tslint:disable
// this is an auto generated file. This will be overwritten

export const getMarket = `query GetMarket($id: ID!) {
  getMarket(id: $id) {
    id
    name
    tags
    owner
    products {
      items {
        id
        description
        market {
          id
          name
          tags
          owner
          createdAt
        }
        file {
          bucket
          region
          key
        }
        price
        shipped
        owner
        createdAt
      }
      nextToken
    }
    createdAt
  }
}
`;
export const listMarkets = `query ListMarkets(
  $filter: ModelMarketFilterInput
  $limit: Int
  $nextToken: String
) {
  listMarkets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      tags
      owner
      products {
        items {
          id
          description
          price
          shipped
          owner
          createdAt
        }
        nextToken
      }
      createdAt
    }
    nextToken
  }
}
`;
export const getProduct = `query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    description
    market {
      id
      name
      tags
      owner
      products {
        items {
          id
          description
          price
          shipped
          owner
          createdAt
        }
        nextToken
      }
      createdAt
    }
    file {
      bucket
      region
      key
    }
    price
    shipped
    owner
    createdAt
  }
}
`;
export const listProducts = `query ListProducts(
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
) {
  listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      description
      market {
        id
        name
        tags
        owner
        products {
          nextToken
        }
        createdAt
      }
      file {
        bucket
        region
        key
      }
      price
      shipped
      owner
      createdAt
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    email
    registered
    orders {
      items {
        id
        product {
          id
          description
          price
          shipped
          owner
          createdAt
        }
        user {
          id
          username
          email
          registered
        }
        shippingAddress {
          city
          country
          address_line1
          address_state
          address_zip
        }
        createdAt
      }
      nextToken
    }
  }
}
`;
export const searchMarkets = `query SearchMarkets(
  $filter: SearchableMarketFilterInput
  $sort: SearchableMarketSortInput
  $limit: Int
  $nextToken: String
) {
  searchMarkets(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      tags
      owner
      products {
        items {
          id
          description
          price
          shipped
          owner
          createdAt
        }
        nextToken
      }
      createdAt
    }
    nextToken
  }
}
`;
