export type ProductStatus =
  | "active"
  | "inactive"
  | "draft"
  | "discontinued";

export type ProductCategory =
  | "Face"
  | "Eyes"
  | "Lips"
  | "Cheeks"
  | "Brows"
  | "Body"
  | "Hair"
  | "Makeup"
  | "Nail"
  | "Skin"
  | "Sets"
  | "Other";

export type ProductCollection =
  | "Everyday Glow"
  | "Night Out"
  | "Clean Skin"
  | "New Drop"
  | "Best Sellers";

export type ProductFeatured =
  | "New Arrival"
  | "Best Seller"
  | "Trending"
  | "Limited Edition"
  | "Recommended";

export interface ProductPrice {
  regularPrice?: string;
  salePrice?: string;
  costprice?: string;
  currency?: "PKR";
  discountstartdate?: string;
  discountenddate?: string;
}

export interface ProductInventory {
  stockquantity: number;
  lowStockThreshold: number;
  barcode: string;
}

export interface FormulaandFinish {
  finish?: string;
  category?: string;
  undertone?: string;
  shadefamily?: string;
  formula?: string;
  skinType?: string;
  countryorigin?: string;
  shelfLife?: string;
}

/** Request body for POST /api/create */
export interface AddProductBody {
  productName: string;
  slug?: string;
  brandName?: string;
  productDescription?: string;
  Price?: string;
  discountedPrice?: string;
  amountInStock?: number;
  productImages?: string[];
  productVideo?: string;
  product360Image?: string;
  productGradeCode?: string;
  productPrice?: ProductPrice;
  productInventory?: ProductInventory;
  formulaandFinish?: FormulaandFinish;
  ProductStatus?: ProductStatus;
  collection?: ProductCollection[];
  category?: ProductCategory;
  featured?: ProductFeatured;
}

/** @deprecated Use AddProductBody */
export type CreateProductRequest = AddProductBody;

export interface CreateProductResponse {
  status?: number;
  message?: string;
  data?: unknown;
}

export interface UpdateProductBody extends Partial<AddProductBody> {
  _id: string;
}

export interface DeleteProductBody {
  _id: string;
}
