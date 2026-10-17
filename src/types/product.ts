export type ProductDivision = 'laminate' | 'industrial' | 'agricultural';

export interface Specification {
  label: string;
  value: string;
}

export interface BaseProduct {
  id: string;
  slug: string;
  name: string;
  productCode?: string;
  category?: string;
  subcategory?: string;
  mainCategory?: string;
  shortDescription?: string;
  description: string;
  specifications?: Specification[];
  features?: string[];
  applications?: string[];
  availability?: string;
  price?: number | string;
  currency?: string;
  unit?: string;
  pricingType?: 'quote_only' | 'fixed' | 'range';
  showPrice?: boolean;
  images: string[];
  featured: boolean;
  published: boolean;
  division: ProductDivision;
  brand?: string;
}

export type Product = BaseProduct;