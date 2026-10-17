export interface LaminateProduct {
  SKU: string;
  "Product Name": string;
  Category: string;
  Subcategory: string;
  Collection: string;
  Thickness: string;
  Size: string;
  Color: string;
  "Surface Finish": string;
  "Key Features": string;
  Applications: string;
  Material: string;
  Printability: string;
  Warranty: string;
  Brand: string;
  Slug: string;
  featured?: boolean;
  published?: boolean;
  description?: string;
  images?: string[];
}

export interface AgriculturalProduct {
  SKU: string;
  name: string;
  category: string;
  description: string;
  specifications: string;
  grade: string;
  packaging: string;
  availability: string;
  images?: string[];
  featured?: boolean;
  published?: boolean;
  slug: string;
}

export interface Enquiry {
  id: string;
  productDivision: 'Laminates' | 'Agricultural';
  productCode: string;
  productName: string;
  quantity: string;
  destinationCountry?: string;
  company?: string;
  contactPerson: string;
  email: string;
  phone: string;
  message: string;
  status: 'New' | 'Contacted' | 'In Discussion' | 'Converted' | 'Closed';
  date: string;
}

export interface SiteContent {
  hero: {
    headline: string;
    supportingCopy: string;
  };
  about: {
    whoWeAre: string;
    ourApproach: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
}
