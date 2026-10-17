import { media } from './media';

/**
 * Editable website content. Contact values below are placeholders and are meant to be
 * replaced with the company's verified details from the admin content manager.
 */
export const siteContent = {
  brand: {
    name: 'Swami Marvels',
    wordmark: 'SWAMI MARVELS',
    tagline: 'Laminates & Agricultural Products',
    mark: media.brandMark
  },
  hero: {
    eyebrow: 'Acrylic & PVC Sheets · Architectural Laminates · Certified Agricultural Exports',
    headline: ['Engineered Precision.', 'Certified Global Trade.'],
    supporting:
      'Premier B2B suppliers and exporters of Acrylic Sheets, PVC Foam Boards, WPC Sheets, PP & Protective Sheets, and APEDA-Certified Agricultural Commodities for domestic and worldwide markets.',
    image: media.heroInterior
  },
  about: {
    intro:
      'Swami Marvels is a premier B2B trading and export house providing industrial acrylic and plastic sheets, surface solutions, and certified agricultural products to commercial enterprises, sign-makers, fabricators, and global importers.',
    body: [
      'The company operates across two specialized divisions: the Acrylic & Acrylic Laminates Division supplying Virgin Cast Acrylic Sheets, AcryGlo acrylics, PVC Foam Boards, WPC Boards, PP/HIPS sheets, and Acrylic Laminates; and the Agricultural Export Division supplying APEDA-certified pure vegetarian agricultural commodities.',
      'Our export operations adhere to international packaging, phytosanitary clearance, and container shipping standards, ensuring that every consignment delivered matches exact specifications.'
    ]
  },
  export: {
    intro:
      'Swami Marvels coordinates container and bulk export consignments across acrylic & architectural sheets and APEDA-certified vegetarian agricultural products with complete inspection, phytosanitary clearance, and global port logistics.'
  },
  contact: {
    phone: '+91-986-786-2233',
    email: 'info@swamimarvels.com',
    addressLines: [
      'Swami Marvels',
      '16/B, 1st Floor, The Chambers',
      'Opp NKGSB Bank, Sector 1',
      'Charkop Industrial Estate',
      'Kandivali West',
      'Mumbai - 400067, Maharashtra, India'
    ],
    mapUrl: 'https://www.google.com/maps/place/SWAMI+MARVELS/@19.2102522,72.8269633,979m/data=!3m1!1e3!4m6!3m5!1s0x3be7b759dca179e7:0x829b4f3862a40f2f!8m2!3d19.2102512!4d72.8269632!16s%2Fg%2F11rj682bx6?hl=en&entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D',
    googleMapsUrl: 'https://www.google.com/maps/place/SWAMI+MARVELS/@19.2102522,72.8269633,979m/data=!3m1!1e3!4m6!3m5!1s0x3be7b759dca179e7:0x829b4f3862a40f2f!8m2!3d19.2102512!4d72.8269632!16s%2Fg%2F11rj682bx6?hl=en&entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D',
    hours: 'Monday to Saturday, 9:00 AM – 6:30 PM (IST)'
  },
  featuredCollections: ['acrylic-sheets', 'pvc-foam-boards', 'wpc-boards', 'pp-hips-films', 'asa-laminates']
};

export type SiteContent = typeof siteContent;