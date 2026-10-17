import type { Category } from '../types/category';

export const categories: Category[] = [
  {
    id: 'cat-1',
    slug: 'floriculture-seeds',
    name: 'Floriculture & Seeds',
    description: 'Fresh cut flowers and agricultural seeds prepared for air-freight and bulk despatch.',
    image: '/greenhouse_flower_seeds.webp',
    order: 1
  },
  {
    id: 'cat-2',
    slug: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    description: 'Seasonal fresh produce graded, packed and shipped to buyer specification.',
    image: '/fruits_and_vegetables.webp',
    order: 2
  },
  {
    id: 'cat-3',
    slug: 'processed-fruits-vegetables',
    name: 'Processed Fruits & Vegetables',
    description: 'Pulps, pastes, dehydrated and frozen lines in aseptic and retail-ready packing.',
    image: '/Alphonso Mango Pulp (Sweetened).webp',
    order: 3
  },
  {
    id: 'cat-4',
    slug: 'dairy-honey',
    name: 'Dairy Products & Honey',
    description: 'Export of pure vegetarian dairy commodities (skimmed milk powder) and 100% natural organic forest honey under APEDA Schedule 04.',
    image: '/Premium Skimmed Milk Powder.webp',
    order: 4
  },
  {
    id: 'cat-5',
    slug: 'other-processed-foods',
    name: 'Other Processed Foods',
    description: 'Sweeteners, kernels, guar gum and cocoa products supplied in bulk food-grade packaging.',
    image: '/Shelled Raw Groundnuts (Peanuts).webp',
    order: 5
  },
  {
    id: 'cat-6',
    slug: 'cereals',
    name: 'Cereals',
    description: 'Rice, wheat and maize in container loads with agreed moisture and purity parameters.',
    image: '/Aged 1121 Basmati Rice (Premium).jpg',
    order: 6
  },
  {
    id: 'cat-7',
    slug: 'de-oiled-rice-bran',
    name: 'De-oiled Rice Bran',
    description: 'De-oiled rice bran supplied loose or bagged for feed and industrial applications.',
    image: '/De-oiled Rice Bran (DORB).webp',
    order: 7
  }
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);