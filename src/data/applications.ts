import type { Application } from '../types/collection';
import { media } from './media';

export const applications: Application[] = [
{
  id: 'app-1',
  slug: 'kitchen',
  name: 'Kitchen',
  description:
  'Shutter fronts, tall units and backing panels that hold up to daily heat, moisture and cleaning.',
  image: media.applications.kitchen,
  order: 1
},
{
  id: 'app-2',
  slug: 'furniture',
  name: 'Furniture & Wardrobes',
  description:
  'Large-format sheets for wardrobe shutters, beds, storage and loose furniture with matched edges.',
  image: media.applications.furniture,
  order: 2
},
{
  id: 'app-3',
  slug: 'bathroom',
  name: 'Bathroom & Vanity',
  description:
  'Moisture-resistant surfaces for vanity units, cubicles and utility areas in humid conditions.',
  image: media.applications.bathroom,
  order: 3
},
{
  id: 'app-4',
  slug: 'commercial',
  name: 'Commercial Interiors',
  description:
  'Reception desks, wall cladding, workstations and retail fit-outs in high-traffic environments.',
  image: media.applications.commercial,
  order: 4
}];


export const getApplication = (slug: string) => applications.find((a) => a.slug === slug);