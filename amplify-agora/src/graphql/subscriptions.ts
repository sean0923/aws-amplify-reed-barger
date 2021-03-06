// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateMarket = `subscription OnCreateMarket {
  onCreateMarket {
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
}
`;
export const onUpdateMarket = `subscription OnUpdateMarket {
  onUpdateMarket {
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
}
`;
export const onDeleteMarket = `subscription OnDeleteMarket {
  onDeleteMarket {
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
}
`;
export const onCreateProduct = `subscription OnCreateProduct($owner: String!) {
  onCreateProduct(owner: $owner) {
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
}
`;
export const onUpdateProduct = `subscription OnUpdateProduct($owner: String!) {
  onUpdateProduct(owner: $owner) {
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
}
`;
export const onDeleteProduct = `subscription OnDeleteProduct($owner: String!) {
  onDeleteProduct(owner: $owner) {
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
}
`;
