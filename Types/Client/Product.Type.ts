export type ApiProductPicture = {
  secure_url: string;
  public_id: string;
};

export type ApiProduct = {
  _id: string;
  productName: string;
  productDescription?: string;
  price?: number;
  Price?: string;
  discountedPrice?: string;
  stock?: number;
  amountInStock?: number;
  category?: string;
  picture?: ApiProductPicture;
  productImages?: string[];
  productVideo?: string;
  product360Image?: string;
  slug?: string;
  brandName?: string;
  productGradeCode?: string;
  ProductStatus?: "active" | "inactive" | "draft" | "discontinued" | string;
  collection?: string[] | string;
  featured?: string;
  createdAt: string;
  updatedAt?: string;
};

export type GetProductsResponse = {
  status: number;
  data: ApiProduct[];
};

export type GetProductByIdResponse = {
  status: number;
  data: ApiProduct;
};
