import React from 'react';

import { Button, Dialog, Notification } from 'element-react';

import { Product } from '../../utils/custom-types';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteProduct } from '../../graphql/mutations';

interface Props {
  isOpen: boolean;
  closeDialog: () => void;
  product: Product;
}

const DeleteProductDialog: React.FC<Props> = ({ isOpen, closeDialog, product }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDeleteProduct = async (productId: string) => {
    setIsLoading(true);

    try {
      const input = { id: productId };

      const resp = await API.graphql(graphqlOperation(deleteProduct, { input }));
      console.log('resp: ', resp);

      Notification({
        title: 'success',
        message: 'Product successfully deleted',
        type: 'success',
      });
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      console.error('error: ', error);
      Notification({
        title: 'failed',
        message: 'Error during deleting',
        type: 'error',
      });
      setIsLoading(false);
      closeDialog();
    }
  };

  return (
    <Dialog
      title="Delete Product"
      size="large"
      customClass="dialog"
      visible={isOpen}
      onCancel={closeDialog}
    >
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
          loading={isLoading}
          onClick={() => handleDeleteProduct(product.id as string)}
        >
          Delete Product
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
};

export default DeleteProductDialog;
