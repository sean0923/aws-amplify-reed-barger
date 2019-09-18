import React from 'react';
import { S3Image } from 'aws-amplify-react';
import { getIconUrl, convertCentsToDollars } from '../utils/utils';

import { Notification, Popover, Button, Dialog, Card, Form, Input, Radio } from 'element-react';

import { convertDollarsToCents } from '../utils/utils';
import { AuthContext } from '../context/auth/auth.context';
import UpdateProductDialog from './update-product-dialog/update-product-dialog.component';
import PayButton from './pay-button.component';

import { Product as _Product } from '../utils/custom-types';

interface Props {
  product: _Product;
}

const Product: React.FC<Props> = ({ product }) => {
  const { auth } = React.useContext(AuthContext);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
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
                      setIsDialogOpen(true);
                    }}
                  />
                  <Button type="danger" icon="delete" />
                </>
              )}
            </div>
            {/* Update Product Dialog */}
            <UpdateProductDialog
              closeDialog={() => setIsDialogOpen(false)}
              isOpen={isDialogOpen}
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
