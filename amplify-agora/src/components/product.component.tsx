import React from 'react';
import { S3Image } from 'aws-amplify-react';
import { getIconUrl, convertCentsToDollars } from '../utils/utils';

import { Button, Card } from 'element-react';

import { AuthContext } from '../context/auth/auth.context';
import UpdateProductDialog from './update-product-dialog/update-product-dialog.component';
import DeleteProductDialog from './delete-product-dialog/delete-product-dialog.component';
// import PayButton from './pay-button.component';

import { Product as _Product } from '../utils/custom-types';

interface Props {
  product: _Product;
}

const Product: React.FC<Props> = ({ product }) => {
  const { auth } = React.useContext(AuthContext);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const isProductOwner = auth && auth.attributes.sub === product.owner;

  return (
    <div className="card-container">
      <Card bodyStyle={{ padding: 0, minWidth: '200px' }}>
        <S3Image
          imgKey={product.file.key}
          theme={{
            photoImg: { maxWidth: '100%', maxHeight: '100%' },
          }}
        />
        <div className="card-body">
          <h3 className="m-0">{product.description}</h3>
          <div className="items-center">
            <img
              src={getIconUrl(product.shipped ? 'markunread_mailbox' : 'mail', '')}
              alt="Shipping Icon"
            />
            {product.shipped ? 'Shipped' : 'Emailed'}
          </div>
          <div className="text-right">
            <span className="mx-1">{convertCentsToDollars(product.price)}</span>
            {/* Update / Delete Product Buttons */}
            <div className="text-center">
              {isProductOwner && (
                <>
                  <Button
                    type="warning"
                    icon="edit"
                    className="m-1"
                    onClick={() => {
                      setIsUploadDialogOpen(true);
                    }}
                  />
                  <Button
                    type="danger"
                    icon="delete"
                    className="m-1"
                    onClick={() => {
                      setIsDeleteDialogOpen(true);
                    }}
                  />
                </>
              )}
            </div>
            {/* Update Product Dialog */}

            <UpdateProductDialog
              closeDialog={() => setIsUploadDialogOpen(false)}
              isOpen={isUploadDialogOpen}
              product={product}
            />

            <DeleteProductDialog
              closeDialog={() => setIsDeleteDialogOpen(false)}
              isOpen={isDeleteDialogOpen}
              product={product}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

// const Product = () => {
//   return <div>Product</div>;
// };

export default Product;
