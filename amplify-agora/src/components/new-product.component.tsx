import React from 'react';
import { Form, Button, Input, Notification, Radio, Progress } from 'element-react';
import { PhotoPicker } from 'aws-amplify-react';
import { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
import aws_exports from '../aws-exports';

import { createProduct } from '../graphql/mutations';
import { convertDollarsToCents } from '../utils/utils';

interface ImgFile {
  file: any;
  name: string;
  size: number;
  type: string;
}

interface Props {
  marketId: string;
}

const NewProduct: React.FC<Props> = ({ marketId }) => {
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [isShipped, setIsShipped] = React.useState(false);
  const [imagePreview, setImagePrivew] = React.useState('');
  const [imgFile, setImgFile] = React.useState<ImgFile | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);

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

          {imagePreview && (
            <img src={imagePreview} alt="Product  Preview" className="image-preview" />
          )}
          <PhotoPicker
            title="Product Image"
            preview="hidden"
            onLoad={(url: string) => setImagePrivew(url)}
            onPick={(file: string) => setImgFile(file as any)}
            theme={{
              photoPickerButton: { display: 'none' },
            }}
          />

          <Form.Item>
            <Button
              type="primary"
              disabled={!description || !price || !imagePreview || isUploading}
              loading={isUploading}
              onClick={async () => {
                if (!imgFile) return;
                try {
                  const visibility = 'public';

                  const { identityId } = await Auth.currentCredentials();
                  const filename = `${identityId}/${Date.now()}-${imgFile.name}`;
                  console.log('filename: ', filename);
                  console.log('imgFile: ', imgFile);
                  const uploadedFile: any = await Storage.put(filename, imgFile, {
                    contentType: imgFile.type,
                  });

                  const file = {
                    key: uploadedFile.key,
                    bucket: aws_exports.aws_user_files_s3_bucket,
                    region: aws_exports.aws_project_region,
                  };
                  console.log('file: ', file);

                  const input = {
                    productMarketId: marketId,
                    description,
                    shipped: isShipped,
                    price: convertDollarsToCents(parseFloat(price)),
                    file,
                  };

                  const result = await API.graphql(graphqlOperation(createProduct, { input }));
                  console.log('result: ', result);
                  Notification({
                    title: 'Success',
                    message: 'Product successfully created',
                    type: 'success',
                  });

                  setIsUploading(true);

                  setDescription('');
                  setPrice('');
                  setIsShipped(false);
                  setImagePrivew('');
                  setImgFile(null);
                } catch (err) {
                  console.error('Error adding product', err);
                }
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
