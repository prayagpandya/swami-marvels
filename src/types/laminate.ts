import type { BaseProduct } from './product';

export interface Laminate extends BaseProduct {
  division: 'laminate';
  productCode: string;
  colour: string;
  colourFamily: string;
  /** Hex value used to render the surface when no photograph exists. */
  swatch: string;
  collection: string;
  finish: string;
  dimensions: string;
  thickness: string;
  features: string[];
  applications: string[];
}