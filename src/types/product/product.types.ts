// types/product.types.ts

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  sellingPrice: number;
  primaryUnit: string;
  secondaryUnit: string | null;
  conversionRate: number | null;
  secondaryUnitPrice: number | null;
  shopproductcategoryId: string | null;
  shopproductsubcategoryId: string | null;
  isAvailable: boolean;
  showonCostumerMenu: boolean;
  imageUrl: string;
  secondaryImageUrls: string[];
  brand: string | null;
  sku: string;
  current_stock_quantity: number;
  minimum_stock_quantity: number;
  isVariant: boolean;
  addons: any[];
  variants: any[];
  additonalFields: string | null;
}

export interface ProductResponse {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  data: Product[];
}