// Types for the entire Divine Voyages application

export interface Tour {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  shortDescription: string;
  category: TourCategory;
  destination: string;
  state: string;
  duration: { days: number; nights: number };
  price: { original: number; discounted: number; currency: string };
  groupSize: { min: number; max: number };
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  rating: number;
  reviewCount: number;
  heroImage: string;
  images: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  availableDates: TourDate[];
  accommodation: string;
  transport: string;
  meals: string;
  featured: boolean;
  popular: boolean;
  tags: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals: string[];
  accommodation?: string;
}

export interface TourDate {
  startDate: string;
  endDate: string;
  spotsLeft: number;
  status: 'Available' | 'Limited' | 'Sold Out';
}

export type TourCategory =
  | 'Char Dham'
  | 'Jyotirlinga'
  | 'Temple Tour'
  | 'River Pilgrimage'
  | 'Mountain Pilgrimage'
  | 'Festival Special'
  | 'South India'
  | 'Buddhist Circuit';

export interface Destination {
  id: string;
  slug: string;
  name: string;
  state: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  description: string;
  shortDescription: string;
  image: string;
  tourCount: number;
  significance: string;
  bestSeason: string;
  popular: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  tourName: string;
  date: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: TeamMember;
  category: string;
  image: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  image?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FilterState {
  category: string;
  duration: string;
  priceRange: string;
  difficulty: string;
  search: string;
  sortBy: string;
}
