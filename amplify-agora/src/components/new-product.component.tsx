import React from 'react';
import { Form, Button, Input, Notification, Radio, Progress } from 'element-react';
import { PhotoPicker } from 'aws-amplify-react';

const NewProduct: React.FC = () => {
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [isShipped, setIsShipped] = React.useState(false);

  return (
    <div className="flex-center">
      <h2 className="header">Add New Product</h2>
      <div>
        <Form className="market-header">
          <Form.Item label="Add Product Description ">
            <Input
              value={description}
              type="text"
              icon="information"
              placeholder="description"
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

          <Form.Item label="Is the Product Shipped or Emailed to the Customer?">
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

          <PhotoPicker />

          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                console.log('product added');
              }}
            >
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewProduct;
