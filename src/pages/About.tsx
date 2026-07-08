import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Award, Target, Eye, Users, MapPin, Calendar, Trophy } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { team } from '@/data/team';
import { SITE_CONFIG } from '@/lib/constants';
import { useEffect, useRef, useState } from 'react';
import './About.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function About() {
  return (
    <>
      <SEOHead
        title="About Us — Our Story & Mission"
        description="Learn about Divine Voyages — India's premier spiritual travel company with 15+ years of experience and 48,000+ happy pilgrims."
        canonical="/about"
      />

      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Our Story
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Connecting souls to the divine since 2011
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div className="about-cards">
            <motion.div className="about-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="about-card-icon"><Target size={28} /></div>
              <h3>Our Mission</h3>
              <p>To make sacred pilgrimages accessible, comfortable, and deeply meaningful for every devotee, regardless of age or physical ability.</p>
            </motion.div>
            <motion.div className="about-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="about-card-icon"><Eye size={28} /></div>
              <h3>Our Vision</h3>
              <p>To be India's most trusted spiritual travel company, transforming lives through divine journeys to every sacred corner of the subcontinent.</p>
            </motion.div>
            <motion.div className="about-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="about-card-icon"><Award size={28} /></div>
              <h3>Our Values</h3>
              <p>Devotion, safety, comfort, authenticity, and environmental responsibility guide every journey we craft.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container">
          <div className="about-stats-grid">
            <CounterStat value={SITE_CONFIG.stats.toursCompleted} label="Tours Completed" icon={<Trophy size={24} />} />
            <CounterStat value={SITE_CONFIG.stats.happyPilgrims} label="Happy Pilgrims" icon={<Users size={24} />} />
            <CounterStat value={SITE_CONFIG.stats.destinations} label="Destinations" icon={<MapPin size={24} />} />
            <CounterStat value={SITE_CONFIG.stats.yearsExperience} label="Years Experience" icon={<Calendar size={24} />} />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container container-narrow">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">From a Small Dream to India's Leading Spiritual Tour Operator</h2>
          </motion.div>
          <motion.div className="about-story" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p>
              Divine Voyages was born in 2011 from a simple yet powerful idea: every devotee deserves a
              comfortable, safe, and spiritually enriching pilgrimage experience. Our founder, Aadil Khan,
              after personally undertaking the Char Dham Yatra and witnessing the challenges pilgrims faced,
              decided to create a travel company that truly understands the needs of spiritual travelers.
            </p>
            <p>
              Starting with just 3 tour packages and a team of 5, we have grown to offer over 30 curated
              pilgrimage experiences across 120+ destinations in India and neighboring countries. Our team
              of 50+ includes experienced pandits, certified mountain guides, travel health advisors, and
              dedicated support staff.
            </p>
            <p>
              Today, with 48,000+ happy pilgrims and counting, we continue our mission of connecting souls
              to the divine. Whether it's a first-time visitor to Varanasi or a seasoned trekker heading to
              Kailash Mansarovar, we ensure every journey is safe, comfortable, and spiritually transformative.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <span className="section-label">Our Team</span>
          <h2 className="section-title">Meet the People Behind Your Journey</h2>
          <p className="section-subtitle">Passionate travelers and spiritual seekers dedicated to crafting your perfect pilgrimage.</p>
          <div className="about-team">
            {team.map(member => (
              <motion.div key={member.id} className="team-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <div className="team-avatar">
                  {member.image ? (
                    <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>
                <h4>{member.name}</h4>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function CounterStat({ value, label, icon }: { value: number; label: string; icon: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const increment = value / 60;
        const timer = setInterval(() => {
          start += increment;
          if (start >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="counter-stat" ref={ref}>
      <div className="counter-icon">{icon}</div>
      <div className="counter-value">{count.toLocaleString()}+</div>
      <div className="counter-label">{label}</div>
    </div>
  );
}
