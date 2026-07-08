import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Search, ArrowRight, Star, MapPin, Clock, Users, Shield, Headphones, Award, ChevronDown, ChevronUp, Sparkles, Quote } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { TourCard } from '@/components/tours/TourCard';
import { SEOHead } from '@/components/seo/SEOHead';
import { getFeaturedTours } from '@/data/tours';
import { getPopularDestinations } from '@/data/destinations';
import { testimonials } from '@/data/testimonials';
import { faqs } from '@/data/faqs';
import { SITE_CONFIG } from '@/lib/constants';
import './Home.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function Home() {
  const featuredTours = getFeaturedTours();
  const popularDestinations = getPopularDestinations();
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
        title="Sacred Pilgrimages & Spiritual Tours Across India"
        description="Discover India's most sacred journeys with Divine Voyages. Curated pilgrimage tours, temple visits, Char Dham Yatra, Jyotirlinga tours & more. Book now!"
        canonical="/"
        schema={{ ...orgSchema, ...faqSchema }}
      />

      {/* ============ HERO SECTION ============ */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-pattern" />
        </div>
        <div className="hero-content container">
          <motion.div
            className="hero-text"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span className="hero-label" variants={fadeInUp}>
              <Sparkles size={16} /> India's #1 Spiritual Travel Company
            </motion.span>
            <motion.h1 className="hero-title" variants={fadeInUp}>
              Discover India's Most{' '}
              <span className="gradient-text">Sacred Journeys</span>
            </motion.h1>
            <motion.p className="hero-subtitle" variants={fadeInUp}>
              Embark on transformative pilgrimages to ancient temples, holy rivers,
              and sacred mountains. Curated tours with VIP darshan, expert guides,
              and premium comfort.
            </motion.p>
            <motion.div className="hero-ctas" variants={fadeInUp}>
              <Link to="/tours">
                <Button variant="primary" size="lg" icon={<Search size={18} />}>
                  Explore Tours
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Plan Custom Journey
                </Button>
              </Link>
            </motion.div>
            <motion.div className="hero-stats" variants={fadeInUp}>
              <div className="hero-stat">
                <span className="hero-stat-value">{SITE_CONFIG.stats.toursCompleted.toLocaleString()}+</span>
                <span className="hero-stat-label">Tours Completed</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">{SITE_CONFIG.stats.happyPilgrims.toLocaleString()}+</span>
                <span className="hero-stat-label">Happy Pilgrims</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">{SITE_CONFIG.stats.destinations}+</span>
                <span className="hero-stat-label">Destinations</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">{SITE_CONFIG.stats.yearsExperience}+</span>
                <span className="hero-stat-label">Years Experience</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="hero-scroll-indicator">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ============ FEATURED TOURS ============ */}
      <section className="section" id="featured-tours">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.span className="section-label" variants={fadeInUp}>Our Best Sellers</motion.span>
            <motion.h2 className="section-title" variants={fadeInUp}>Featured Sacred Tours</motion.h2>
            <motion.p className="section-subtitle" variants={fadeInUp}>
              Handpicked pilgrimages loved by thousands of devotees. Each journey is crafted with devotion, comfort, and spiritual depth.
            </motion.p>
          </motion.div>
          <motion.div
            className="tours-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {featuredTours.map((tour) => (
              <motion.div key={tour.id} variants={fadeInUp}>
                <TourCard tour={tour} />
              </motion.div>
            ))}
          </motion.div>
          <div className="section-cta">
            <Link to="/tours">
              <Button variant="outline" size="lg" icon={<ArrowRight size={18} />}>
                View All Tours
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ POPULAR DESTINATIONS ============ */}
      <section className="section destinations-section" id="destinations">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.span className="section-label" variants={fadeInUp}>Where Divinity Awaits</motion.span>
            <motion.h2 className="section-title" variants={fadeInUp}>Popular Destinations</motion.h2>
            <motion.p className="section-subtitle" variants={fadeInUp}>
              From the Himalayan temples to the sacred shores of the south — explore India's most revered spiritual destinations.
            </motion.p>
          </motion.div>
          <motion.div
            className="destinations-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {popularDestinations.slice(0, 6).map((dest) => (
              <motion.div key={dest.id} variants={fadeInUp}>
                <Link to={`/destinations`} className="destination-card" id={`dest-${dest.id}`}>
                  <div className="destination-card-image" style={{
                    background: `linear-gradient(135deg, ${getDestGradient(dest.region)})`,
                  }}>
                    <div className="destination-card-icon">
                      {getDestIcon(dest.region)}
                    </div>
                  </div>
                  <div className="destination-card-content">
                    <h3 className="destination-card-name">{dest.name}</h3>
                    <p className="destination-card-state">{dest.state}</p>
                    <p className="destination-card-desc">{dest.shortDescription}</p>
                    <div className="destination-card-meta">
                      <span><MapPin size={14} /> {dest.tourCount} Tours</span>
                      <span className="destination-card-season">{dest.bestSeason}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <div className="section-cta">
            <Link to="/destinations">
              <Button variant="outline" size="lg" icon={<ArrowRight size={18} />}>
                Explore All Destinations
              </Button>
            </Link>
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
            <motion.span className="section-label" variants={fadeInUp}>Why Divine Voyages</motion.span>
            <motion.h2 className="section-title" variants={fadeInUp}>Trusted by 48,000+ Pilgrims</motion.h2>
            <motion.p className="section-subtitle" variants={fadeInUp}>
              We don't just plan trips — we craft spiritual experiences that transform lives.
            </motion.p>
          </motion.div>
          <motion.div
            className="why-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {whyChooseUs.map((item) => (
              <motion.div key={item.title} className="why-card" variants={fadeInUp}>
                <div className="why-card-icon">{item.icon}</div>
                <h3 className="why-card-title">{item.title}</h3>
                <p className="why-card-desc">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section testimonials-section" id="testimonials">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.span className="section-label" variants={fadeInUp}>What Pilgrims Say</motion.span>
            <motion.h2 className="section-title" variants={fadeInUp}>Stories of Transformation</motion.h2>
            <motion.p className="section-subtitle" variants={fadeInUp}>
              Hear from devotees who experienced divine journeys with us.
            </motion.p>
          </motion.div>

          <div className="testimonial-carousel">
            <div className="testimonial-card-featured">
              <div className="testimonial-quote">
                <Quote size={32} />
              </div>
              <p className="testimonial-text">{testimonials[currentTestimonial].text}</p>
              <div className="testimonial-rating">
                {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </div>
                <div>
                  <strong>{testimonials[currentTestimonial].name}</strong>
                  <p>{testimonials[currentTestimonial].location}</p>
                  <p className="testimonial-tour">{testimonials[currentTestimonial].tourName}</p>
                </div>
              </div>
            </div>
            <div className="testimonial-dots">
              {testimonials.slice(0, 6).map((_, i) => (
                <button
                  key={i}
                  className={`testimonial-dot ${i === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(i)}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQS ============ */}
      <section className="section" id="faqs">
        <div className="container container-narrow">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.span className="section-label" variants={fadeInUp}>Got Questions?</motion.span>
            <motion.h2 className="section-title" variants={fadeInUp}>Frequently Asked Questions</motion.h2>
            <motion.p className="section-subtitle" variants={fadeInUp}>
              Everything you need to know before your sacred journey.
            </motion.p>
          </motion.div>

          <div className="faq-list">
            {faqs.slice(0, 8).map((faq) => (
              <motion.div
                key={faq.id}
                className={`faq-item ${openFaq === faq.id ? 'open' : ''}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  aria-expanded={openFaq === faq.id}
                >
                  <span>{faq.question}</span>
                  {openFaq === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaq === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="cta-section" id="cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Begin Your Sacred Journey?</h2>
            <p>Let us craft a personalized pilgrimage experience just for you.</p>
            <div className="cta-buttons">
              <Link to="/tours">
                <Button variant="primary" size="lg">Browse Tours</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">Contact Us</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* Helper data */
const whyChooseUs = [
  {
    icon: <Award size={28} />,
    title: 'Expert Spiritual Guides',
    desc: 'Knowledgeable pandits and local guides who bring every temple and ritual to life.',
  },
  {
    icon: <Shield size={28} />,
    title: 'VIP Darshan Access',
    desc: 'Skip the long queues with our VIP darshan arrangements at major temples across India.',
  },
  {
    icon: <Users size={28} />,
    title: 'Small Groups',
    desc: 'Intimate group sizes ensuring personalized attention and meaningful experiences.',
  },
  {
    icon: <Headphones size={28} />,
    title: '24/7 Support',
    desc: 'Round-the-clock assistance from the moment you book till you return home safely.',
  },
  {
    icon: <Star size={28} />,
    title: 'Premium Comfort',
    desc: 'Best-in-class hotels, hygienic sattvic meals, and AC transport on every journey.',
  },
  {
    icon: <Clock size={28} />,
    title: '15+ Years Experience',
    desc: 'Decades of expertise in crafting sacred journeys trusted by 48,000+ pilgrims.',
  },
];

function getDestGradient(region: string): string {
  const map: Record<string, string> = {
    North: '#FF6B2B 0%, #FFD700 100%',
    South: '#059669 0%, #34D399 100%',
    East: '#2563EB 0%, #60A5FA 100%',
    West: '#D946EF 0%, #F0ABFC 100%',
    Central: '#F59E0B 0%, #FDE68A 100%',
  };
  return map[region] || '#FF6B2B 0%, #FFD700 100%';
}

function getDestIcon(region: string): string {
  const map: Record<string, string> = {
    North: '🏔️',
    South: '🛕',
    East: '🌊',
    West: '🕌',
    Central: '☀️',
  };
  return map[region] || '🙏';
}
