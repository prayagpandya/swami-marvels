import cloudinaryMap from './cloudinaryMap.json';

const map = (cloudinaryMap as Record<string, string>) || {};

const getUrl = (path: string): string => {
  return map[path] || map[`/${path}`] || (path.startsWith('/') ? path : `/${path}`);
};

/** Single source of truth for imagery so the UI never hard-codes asset URLs. */
export const media = {
  brandMark: getUrl('/swami_marvels_logo.webp'),
  heroInterior: getUrl('/reception.jpg'),

  surfaces: {
    walnut: getUrl('/lam_1.jpg'),
    teak: getUrl('/lam_2.jpg'),
    oak: getUrl('/lam_3.jpg'),
    stone: getUrl('/lam_4.jpg'),
    marble: getUrl('/lam_5.jpg'),
  },
  applications: {
    kitchen: getUrl('/kitchen.jpg'),
    furniture: getUrl('/bedroom.jpg'),
    bathroom: getUrl('/bathroom.jpg'),
    commercial: getUrl('/reception.jpg'),
  },
  divisions: {
    laminate: getUrl('/hero_bg.webp'),
    agricultural: getUrl('/agri-products.jpg'),
  },
  agriculture: {
    cereals: getUrl('/grains.jpg'),
    fruitsVegetables: getUrl('/veges.jpg'),
    floriculture: getUrl('/flower-3.jpg'),
    processed: getUrl('/grains-2.jpg'),
  },
  banners: {
    desktop: [
      getUrl('/hero_bg_lg_i.webp'),
      getUrl('/hero_bg_lg_ii.webp'),
      getUrl('/hero_bg_lg_iii.webp')
    ],
    tablet: [
      getUrl('/hero_bg_md_i.webp'),
      getUrl('/hero_bg_md_ii.webp'),
      getUrl('/hero_bg_md_iii.webp')
    ],
    mobile: [
      getUrl('/hero_bg_sm_i.webp'),
      getUrl('/hero_bg_sm_ii.webp'),
      getUrl('/hero_bg_sm_iii.webp')
    ]
  }
};