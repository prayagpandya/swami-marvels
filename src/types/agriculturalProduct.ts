import type { BaseProduct, Specification } from './product';

export interface AgriculturalProduct extends BaseProduct {
  division: 'agricultural';
  category: string;
  grade: string;
  packaging: string;
  availability: string;
  specifications: Specification[];
  apedaSchedule?: string;
  apedaItem?: string;
  itemNumber?: number;
  origin?: string;
  shelfLife?: string;
  containerLoad?: string;
}