import type { MetadataRoute } from 'next';
import { catalogProducts } from '../data/catalogProducts';
import { laminates } from '../data/laminates';
import { agriculturalProducts } from '../data/agriculturalProducts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swamimarvels.com';
  const now = new Date();

  // 1. Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/laminates`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/agricultural-products`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/export`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // 2. Sheet Products Dynamic Routes (/laminates/[slug])
  const sheetProductRoutes: MetadataRoute.Sitemap = catalogProducts
    .filter((p) => Boolean(p.slug))
    .map((product) => ({
      url: `${baseUrl}/laminates/${product.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    }));

  // 3. ASA Laminates Dynamic Routes (/laminates/[slug])
  const laminateRoutes: MetadataRoute.Sitemap = laminates
    .filter((l) => Boolean(l.slug))
    .map((laminate) => ({
      url: `${baseUrl}/laminates/${laminate.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    }));

  // 4. Agricultural Products Dynamic Routes (/agricultural-products/[slug])
  const agriRoutes: MetadataRoute.Sitemap = agriculturalProducts
    .filter((a) => Boolean(a.slug))
    .map((product) => ({
      url: `${baseUrl}/agricultural-products/${product.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    }));

  return [
    ...staticRoutes,
    ...sheetProductRoutes,
    ...laminateRoutes,
    ...agriRoutes,
  ];
}
