import { media } from './media';

export interface FeatureEntry {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const laminateFeatures: FeatureEntry[] = [
{
  id: 'anti-scratch',
  title: 'Anti-Scratch Surface',
  description:
  'A hardened decorative layer that resists everyday abrasion from cutlery, keys and cleaning — important on shutters and worktops that are handled daily.',
  image: media.surfaces.walnut
},
{
  id: 'water-resistance',
  title: 'Water Resistance',
  description:
  'Suitable for kitchens, vanities and utility areas where surfaces meet moisture and are wiped down repeatedly.',
  image: media.applications.bathroom
},
{
  id: 'durability',
  title: 'Durability In Use',
  description:
  'Dense, pressed construction that holds its edge in high-traffic commercial interiors and heavy-use residential joinery.',
  image: media.applications.commercial
},
{
  id: 'colour-stability',
  title: 'Colour Stability',
  description:
  'Decor and tone are held across the sheet so batches read consistently when large runs are installed side by side.',
  image: media.surfaces.stone
}];


export interface ReasonEntry {
  id: string;
  title: string;
  description: string;
}

export const reasons: ReasonEntry[] = [
{
  id: 'range',
  title: 'Product Range',
  description:
  'Two divisions under one supplier — decorative laminates for interiors, and fresh and processed agricultural products for food and trade buyers.'
},
{
  id: 'quality',
  title: 'Quality Focus',
  description:
  'Specification, grading and packing are agreed before an order is confirmed, so the despatched consignment matches the quotation.'
},
{
  id: 'export',
  title: 'Export Orientation',
  description:
  'Packing, documentation and despatch coordination are handled as part of the order rather than as an afterthought.'
},
{
  id: 'customer',
  title: 'Customer Focus',
  description:
  'Enquiries are answered with real availability and lead times, and requirements are matched to the products we can genuinely supply.'
}];


export const exportStages: {id: string;title: string;description: string;}[] = [
{ id: 'product', title: 'Product', description: 'Selection and grading against the agreed specification.' },
{ id: 'packaging', title: 'Packaging', description: 'Protective, food-grade or export-grade packing per product.' },
{ id: 'container', title: 'Container', description: 'Stuffing plans built around volume, weight and transit.' },
{ id: 'transport', title: 'Transport', description: 'Inland movement coordinated to the loading schedule.' },
{ id: 'shipment', title: 'Shipment', description: 'Documentation prepared and consignment handed over.' },
{ id: 'market', title: 'Global Market', description: 'Delivery to the buyer in the destination market.' }];


export const exportProcess: {id: string;title: string;description: string;}[] = [
{ id: 'enquiry', title: 'Enquiry', description: 'You share the product, quantity and destination.' },
{ id: 'selection', title: 'Product Selection', description: 'We confirm grade, variety, packaging and availability.' },
{ id: 'quotation', title: 'Quotation', description: 'A written offer covering terms and lead time.' },
{ id: 'confirmation', title: 'Confirmation', description: 'Order confirmed and production or procurement scheduled.' },
{ id: 'shipment', title: 'Shipment', description: 'Packing, documentation and despatch to the agreed port.' }];