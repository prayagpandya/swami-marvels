export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** Accent colour drawn from the collection's own surfaces. */
  accent: string;
  image: string;
  order: number;
}

export interface Application {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  order: number;
}

export interface Finish {
  id: string;
  slug: string;
  name: string;
  description: string;
}