import React from 'react';

import { Button, Dialog, Form, Radio, Input, Notification } from 'element-react';

import { Product } from '../../utils/custom-types';
import { convertCentsToDollars, convertDollarsToCents } from '../../utils/utils';
import { API, graphqlOperation } from 'aws-amplify';
import { updateProduct } from '../../graphql/mutations';

interface Props {
  isOpen: boolean;
  closeDialog: () => void;
  product: Product;
}

const UpdateProductDialog: React.FC<Props> = ({ isOpen, closeDialog, product }) => {
  const [description, setDescription] = React.useState(product.description);
  const [price, setPrice] = React.useState(convertCentsToDollars(product.price));
  const [isShipped, setIsShipped] = React.useState(product.shipped);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleUpdateProduct = async (productId: string) => {
    setIsUpdating(true);

    try {
      const input = {
        id: productId,
        description,
        shipped: isShipped,
        price: convertDollarsToCents(parseInt(price)),
      };

      const resp = await API.graphql(graphqlOperation(updateProduct, { input }));

      console.log('resp: ', resp);

      Notification({
        title: 'success',
        message: 'Product successfully updated',
        type: 'success',
      });
      setIsUpdating(false);
      closeDialog();
    } catch (error) {
      console.error('error: ', error);
      Notification({
        title: 'failed',
        message: 'Error during uploading',
        type: 'error',
      });
      setIsUpdating(false);
      closeDialog();
    }
  };

  return (
    <Dialog
      title="Update Product"
      size="large"
      customClass="dialog"
      visible={isOpen}
      onCancel={closeDialog}
    >
      <Dialog.Body>
        <Form className="market-header">
          <Form.Item label="Add Product Description ">
            <Input
              value={description}
              type="text"
              icon="information"
              placeholder="Product Description"
              onChange={(description) => {
                setDescription(description as string);
              }}
            />
          </Form.Item>

          <Form.Item label="Set Product Price">
            <Input
              value={price}
              type="number"
              icon="plus"
              placeholder="Price ($USD)"
              onChange={(price) => {
                setPrice(price as string);
              }}
            />
          </Form.Item>

          <Form.Item label="Update Shippint">
            <div className="text-center">
              <Radio value="true" checked={isShipped === true} onChange={() => setIsShipped(true)}>
                Shipped
              </Radio>
              <Radio
                value="true"
                checked={isShipped === false}
                onChange={() => setIsShipped(false)}
              >
                Emailed
              </Radio>
            </div>
          </Form.Item>
        </Form>
      </Dialog.Body>
      <Dialog.Footer>
        <Button
          onClick={() => {
            closeDialog();
          }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          disabled={!description || !price}
          loading={isUpdating}
          onClick={() => handleUpdateProduct(product.id as string)}
        >
          Update Product
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default UpdateProductDialog;
