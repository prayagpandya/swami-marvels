import type { Collection, Finish } from '../types/collection';
import { media } from './media';

export const collections: Collection[] = [
{
  id: 'col-1',
  slug: 'modern-living',
  name: 'Modern Living',
  description:
  'Quiet, contemporary surfaces built around linen, cotton and concrete textures for everyday interiors.',
  accent: '#C9BCA8',
  image: media.applications.kitchen,
  order: 1
},
{
  id: 'col-2',
  slug: 'solid-tone',
  name: 'Solid Tone',
  description:
  'A disciplined palette of flat colours — from ivory and sand through to charcoal, olive and burgundy.',
  accent: '#5C6A4C',
  image: media.divisions.laminate,
  order: 2
},
{
  id: 'col-3',
  slug: 'artistic-inspired',
  name: 'Artistic Inspired',
  description:
  'Fluted, ribbed and directional surfaces for feature walls, reception fronts and statement joinery.',
  accent: '#A45F35',
  image: media.applications.commercial,
  order: 3
},
{
  id: 'col-4',
  slug: 'woodgrain-naturals',
  name: 'Woodgrain Naturals',
  description:
  'Walnut, teak and oak grains reproduced with matched pore texture for wardrobes and cabinetry.',
  accent: '#6B4A32',
  image: media.surfaces.walnut,
  order: 4
},
{
  id: 'col-5',
  slug: 'stone-mineral',
  name: 'Stone & Mineral',
  description:
  'Travertine, marble and slate interpretations for worktops, vanities and vertical cladding.',
  accent: '#8A8377',
  image: media.surfaces.stone,
  order: 5
},
{
  id: 'col-6',
  slug: 'shine-craft',
  name: 'Shine Craft Acrylic',
  description:
  'Mirror-grade reflective acrylic laminates and high-gloss metallic surfaces for luxury joinery and architectural paneling.',
  accent: '#D4AF37',
  image: '/mirror_acrylic_sheets.webp',
  order: 6
}];


export const finishes: Finish[] = [
{ id: 'fin-1', slug: 'suede-matt', name: 'Suede Matt', description: 'Low-sheen, soft to touch.' },
{ id: 'fin-2', slug: 'high-gloss', name: 'High Gloss', description: 'Reflective mirror-grade surface.' },
{ id: 'fin-3', slug: 'natural-grain', name: 'Natural Grain', description: 'Registered wood pore texture.' },
{ id: 'fin-4', slug: 'textured', name: 'Textured', description: 'Fine tactile linen-like structure.' },
{ id: 'fin-5', slug: 'leather-touch', name: 'Leather Touch', description: 'Deep matt with a fine leather grain.' }];


export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);