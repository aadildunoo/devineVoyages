// Constants used throughout the application

export const SITE_CONFIG = {
  name: 'Divine Voyages',
  tagline: 'Sacred Journeys, Divine Experiences',
  description: 'India\'s premier spiritual travel company offering curated pilgrimage tours, temple visits, and sacred journeys across the subcontinent.',
  url: 'https://devinevoyages.com',
  phone: '+1 (416) 450-0089',
  indiaPhone: '+91 96509 61142',
  whatsapp: '+14164500089',
  address: 'Main Office: Mississauga, ON | Branch Office: New Delhi, India',
  social: {
    instagram: 'https://instagram.com/devinevoyages',
    facebook: 'https://www.facebook.com/people/India-Vacanza/100063871487881/',
    youtube: 'https://youtube.com/@devinevoyages',
    twitter: 'https://twitter.com/devinevoyages',
  },
  stats: {
    toursCompleted: 2500,
    happyPilgrims: 48000,
    destinations: 120,
    yearsExperience: 15,
  },
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  {
    label: 'Tours',
    href: '/tours',
    children: [
      { label: 'All Tours', href: '/tours' },
      { label: 'Char Dham Yatra', href: '/tours?category=Char+Dham' },
      { label: 'Jyotirlinga Circuit', href: '/tours?category=Jyotirlinga' },
      { label: 'Temple Tours', href: '/tours?category=Temple+Tour' },
      { label: 'South India Tours', href: '/tours?category=South+India' },
      { label: 'Festival Specials', href: '/tours?category=Festival+Special' },
    ],
  },
  {
    label: 'Destinations',
    href: '/destinations',
  },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;

export const TOUR_CATEGORIES = [
  'Char Dham',
  'Jyotirlinga',
  'Temple Tour',
  'River Pilgrimage',
  'Mountain Pilgrimage',
  'Festival Special',
  'South India',
  'Buddhist Circuit',
] as const;

export const DIFFICULTY_COLORS = {
  Easy: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
  Moderate: { bg: '#fef9c3', text: '#854d0e', border: '#fde047' },
  Challenging: { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
} as const;

export const COLORS = {
  saffron: '#FF6B2B',
  saffronLight: '#FF8A50',
  saffronDark: '#E55A1B',
  gold: '#D4A853',
  goldLight: '#E8C97A',
  maroon: '#5B1A2A',
  maroonLight: '#7A2E3F',
  warmWhite: '#FFF9F0',
  cream: '#FAF5EB',
  slate: '#374151',
  slateLight: '#6B7280',
} as const;
