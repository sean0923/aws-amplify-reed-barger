export type S3ObjectInput = {
  bucket: string;
  region: string;
  key: string;
};

export type Product = {
  id?: string;
  description: string;
  file: S3ObjectInput;
  price: number;
  shipped: boolean;
  owner?: string | null;
  createdAt?: string | null;
  productMarketId?: string | null;
};
