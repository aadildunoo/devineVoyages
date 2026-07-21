import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  Sparkles, 
  Star, 
  Award, 
  Shield, 
  Users, 
  Headphones, 
  Clock, 
  Quote
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SEOHead } from '@/components/seo/SEOHead';
import { AirbnbSearchBar } from '@/components/search/AirbnbSearchBar';
import { CategoryFilter } from '@/components/common/CategoryFilter';
import { ListingCard } from '@/components/tours/ListingCard';
import { MapToggle } from '@/components/common/MapToggle';
import { tours } from '@/data/tours';
import { getPopularDestinations } from '@/data/destinations';
import { testimonials } from '@/data/testimonials';
import { faqs } from '@/data/faqs';
import { SITE_CONFIG } from '@/lib/constants';
import './Home.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentTestimonial] = useState(0);

  const popularDestinations = getPopularDestinations();

  // Filter tours based on category
  const filteredTours = selectedCategory === 'All'
    ? tours
    : tours.filter(t => t.category === selectedCategory || t.tags.includes(selectedCategory.toLowerCase()));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '42, Spiritual Lane',
      addressLocality: 'Rishikesh',
      addressRegion: 'Uttarakhand',
      postalCode: '249201',
      addressCountry: 'IN',
    },
  };

  return (
    <>
      <SEOHead
        title="Sacred Stays & Spiritual Yatras Across India"
        description="Discover India's most sacred stays and pilgrimages with Divine Voyages. Curated stays, temple visits, Char Dham Yatra, Jyotirlinga tours & VIP darshan."
        canonical="/"
        schema={{ ...orgSchema, ...faqSchema }}
      />

      {/* ============ HERO SECTION ============ */}
      <section className="airbnb-hero-section" id="hero">
        <div className="hero-backdrop">
          <img 
            src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=1920" 
            alt="Sacred Ganges Varanasi at sunrise" 
            className="hero-backdrop-img"
          />
          <div className="hero-overlay-gradient" />
        </div>

        <div className="container hero-container-inner">
          <motion.div
            className="hero-text-block"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span className="hero-pill-tag" variants={fadeInUp}>
              <Sparkles size={15} /> Divine Voyages Stays & Experiences
            </motion.span>
            <motion.h1 className="hero-main-heading" variants={fadeInUp}>
              Find your next sacred stay & spiritual journey
            </motion.h1>
            <motion.p className="hero-subtext" variants={fadeInUp}>
              Explore verified Himalayan ashrams, sacred temple stays, and guided yatras across India with VIP darshan & authentic local hospitality.
            </motion.p>
          </motion.div>

          {/* FLOATING AIRBNB SEARCH BAR */}
          <motion.div 
            className="hero-search-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AirbnbSearchBar />
          </motion.div>
        </div>
      </section>

      {/* ============ CATEGORY ICON FILTER BAR ============ */}
      <CategoryFilter 
        activeCategory={selectedCategory} 
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* ============ MAIN LISTINGS GRID SECTION ============ */}
      <section className="section listings-section" id="listings">
        <div className="container">
          <div className="listings-header-line">
            <h2 className="listings-grid-title">
              {selectedCategory === 'All' ? 'Explore Sacred Stays & Yatras' : `${selectedCategory} Journeys`}
            </h2>
            <span className="listings-count">{filteredTours.length} places available</span>
          </div>

          <div className="airbnb-listings-grid">
            {filteredTours.map((tour) => (
              <ListingCard key={tour.id} tour={tour} />
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className="no-listings-state">
              <p>No journeys found in this category.</p>
              <Button variant="outline" onClick={() => setSelectedCategory('All')}>View all stays</Button>
            </div>
          )}
        </div>
      </section>

      {/* ============ POPULAR SACRED DESTINATIONS ============ */}
      <section className="section destinations-section bg-subtle" id="destinations">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.span className="section-label" variants={fadeInUp}>Where Divinity Awaits</motion.span>
            <motion.h2 className="section-title" variants={fadeInUp}>Popular Sacred Destinations</motion.h2>
            <motion.p className="section-subtitle" variants={fadeInUp}>
              From the Himalayan snow peaks to the sacred shores of the south — explore India's most revered spiritual hubs.
            </motion.p>
          </motion.div>

          <div className="airbnb-destinations-grid">
            {popularDestinations.slice(0, 8).map((dest) => (
              <Link key={dest.id} to={`/destinations`} className="airbnb-dest-card">
                <div className="airbnb-dest-img-wrap">
                  <img src={dest.image} alt={dest.name} className="airbnb-dest-img" loading="lazy" />
                  <span className="airbnb-dest-badge">{dest.tourCount} Stays</span>
                </div>
                <div className="airbnb-dest-info">
                  <h3 className="airbnb-dest-name">{dest.name}</h3>
                  <p className="airbnb-dest-state">{dest.state}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="section why-section" id="why-choose-us">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.span className="section-label" variants={fadeInUp}>Why Devotees Love Us</motion.span>
            <motion.h2 className="section-title" variants={fadeInUp}>Trusted by 48,000+ Devotees</motion.h2>
            <motion.p className="section-subtitle" variants={fadeInUp}>
              We craft authentic, serene, and spiritually enriching journeys with top-rated hospitality.
            </motion.p>
          </motion.div>

          <div className="why-grid">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="why-card">
                <div className="why-card-icon">{item.icon}</div>
                <h3 className="why-card-title">{item.title}</h3>
                <p className="why-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section testimonials-section bg-subtle" id="testimonials">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Devotee Experiences</span>
            <h2 className="section-title">Stories of Transformation</h2>
          </div>

          <div className="testimonial-card-featured">
            <Quote size={36} className="quote-icon" />
            <p className="testimonial-text">{testimonials[currentTestimonial].text}</p>
            <div className="testimonial-rating">
              {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                <Star key={i} size={16} fill="#FF385C" color="#FF385C" />
              ))}
            </div>
            <div className="testimonial-author">
              <div className="testimonial-avatar">
                {testimonials[currentTestimonial].name.charAt(0)}
              </div>
              <div>
                <strong>{testimonials[currentTestimonial].name}</strong>
                <p>{testimonials[currentTestimonial].location} • {testimonials[currentTestimonial].tourName}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING MAP VIEW TOGGLE */}
      <MapToggle tours={tours} />
    </>
  );
}

const whyChooseUs = [
  {
    icon: <Award size={26} />,
    title: 'Expert Pandits & Local Guides',
    desc: 'Knowledgeable pandits and local guides who bring every temple and ritual to life with devotion.',
  },
  {
    icon: <Shield size={26} />,
    title: 'VIP Darshan Guarantees',
    desc: 'Skip the long queues with our special VIP darshan arrangements at major temples across India.',
  },
  {
    icon: <Users size={26} />,
    title: 'Small Private & Group Stays',
    desc: 'Intimate group sizes ensuring personalized attention and peaceful spiritual reflections.',
  },
  {
    icon: <Headphones size={26} />,
    title: '24/7 Pilgrimage Support',
    desc: 'Round-the-clock assistance from booking to safe return home.',
  },
  {
    icon: <Star size={26} />,
    title: 'Best-in-Class Accommodation',
    desc: 'Handpicked ashrams, boutique heritage hotels, and hygienic Sattvic meals.',
  },
  {
    icon: <Clock size={26} />,
    title: '15+ Years Trust',
    desc: 'Decades of expertise in organizing sacred yatras for thousands of families.',
  },
];
