import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { destinations } from '@/data/destinations';
import { Button } from '@/components/ui/Button';
import './Destinations.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Destinations() {
  const regions = ['All', 'North', 'South', 'East', 'West', 'Central'];
  const [activeRegion, setActiveRegion] = useState('All');

  const filtered = activeRegion === 'All'
    ? destinations
    : destinations.filter(d => d.region === activeRegion);

  return (
    <>
      <SEOHead
        title="Sacred Destinations Across India"
        description="Explore India's most revered spiritual destinations — from Himalayan temples to sacred southern shores. Plan your pilgrimage with Divine Voyages."
        canonical="/destinations"
      />

      <section className="dest-hero">
        <div className="container">
          <h1>Sacred Destinations</h1>
          <p>Explore India's most revered spiritual sites</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="dest-tabs">
            {regions.map(r => (
              <button
                key={r}
                className={`dest-tab ${activeRegion === r ? 'active' : ''}`}
                onClick={() => setActiveRegion(r)}
              >
                {r === 'All' ? '🇮🇳 All Regions' : `${getRegionEmoji(r)} ${r} India`}
              </button>
            ))}
          </div>

          <motion.div
            className="dest-grid"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            key={activeRegion}
          >
            {filtered.map(dest => (
              <motion.div key={dest.id} variants={fadeInUp}>
                <div className="dest-card">
                  <div className="dest-card-image">
                    {dest.image ? (
                      <img
                        src={dest.image}
                        alt={dest.name}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    ) : (
                      <div style={{
                        background: `linear-gradient(135deg, ${getRegionGradient(dest.region)})`,
                        width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <div className="dest-card-icon">{getRegionIcon(dest.region)}</div>
                      </div>
                    )}
                  </div>
                  <div className="dest-card-body">
                    <h3>{dest.name}</h3>
                    <p className="dest-card-state"><MapPin size={14} /> {dest.state}</p>
                    <p className="dest-card-desc">{dest.description}</p>
                    <div className="dest-card-info">
                      <span className="dest-card-significance">{dest.significance}</span>
                    </div>
                    <div className="dest-card-footer">
                      <span><Calendar size={14} /> {dest.bestSeason}</span>
                      <span>{dest.tourCount} tours available</span>
                    </div>
                    <Link to="/tours">
                      <Button variant="outline" size="sm" fullWidth>View Tours</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';

function getRegionEmoji(region: string): string {
  const map: Record<string, string> = { North: '🏔️', South: '🛕', East: '🌊', West: '🕌', Central: '☀️' };
  return map[region] || '🙏';
}

function getRegionGradient(region: string): string {
  const map: Record<string, string> = {
    North: '#FF6B2B 0%, #FFD700 100%',
    South: '#059669 0%, #34D399 100%',
    East: '#2563EB 0%, #60A5FA 100%',
    West: '#D946EF 0%, #F0ABFC 100%',
    Central: '#F59E0B 0%, #FDE68A 100%',
  };
  return map[region] || '#FF6B2B 0%, #FFD700 100%';
}

function getRegionIcon(region: string): string {
  const map: Record<string, string> = { North: '🏔️', South: '🛕', East: '🌊', West: '🕌', Central: '☀️' };
  return map[region] || '🙏';
}
