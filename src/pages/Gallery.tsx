import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useState } from 'react';
import { X, Play } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import './Gallery.css';

const galleryItems = [
  { id: 1, title: 'Evening Ganga Aarti', location: 'Varanasi', category: 'Rituals', type: 'image', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Kedarnath Temple', location: 'Uttarakhand', category: 'Temples', type: 'image', image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Pilgrims at Ghats', location: 'Rishikesh', category: 'People', type: 'image', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Rameshwaram Corridor', location: 'Tamil Nadu', category: 'Architecture', type: 'image', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Morning Chants', location: 'Haridwar', category: 'Rituals', type: 'video', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Badrinath Valley', location: 'Uttarakhand', category: 'Nature', type: 'image', image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&q=80&w=800' },
  { id: 7, title: 'Golden Temple', location: 'Amritsar', category: 'Temples', type: 'image', image: 'https://images.unsplash.com/photo-1532664189809-02133fee698d?auto=format&fit=crop&q=80&w=800' },
  { id: 8, title: 'Sadhus in Meditation', location: 'Varanasi', category: 'People', type: 'image', image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80&w=800' },
  { id: 9, title: 'Meenakshi Temple', location: 'Madurai', category: 'Architecture', type: 'image', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
];

const categories = ['All', 'Temples', 'Rituals', 'People', 'Architecture', 'Nature'];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <>
      <SEOHead
        title="Photo Gallery — Glimpses of the Divine"
        description="Explore our photo and video gallery showcasing the beauty of India's sacred destinations, spiritual rituals, and transformative pilgrimages."
        canonical="/gallery"
      />

      <section className="gallery-hero">
        <div className="container">
          <h1>Glimpses of the Divine</h1>
          <p>Moments of spirituality captured across sacred India</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className="gallery-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`gallery-filter ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            className="gallery-grid"
            initial="hidden"
            animate="visible"
            key={activeCategory}
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                className={`gallery-item ${item.type === 'video' ? 'gallery-item-video' : ''}`}
                variants={fadeInUp}
                onClick={() => setLightboxIndex(i)}
              >
                <div className="gallery-item-bg">
                  <img src={item.image} alt={item.title} style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'block' }} />
                </div>
                
                {item.type === 'video' && (
                  <div className="gallery-play-btn">
                    <Play size={24} fill="currentColor" />
                  </div>
                )}

                <div className="gallery-item-overlay">
                  <h4>{item.title}</h4>
                  <p>{item.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="lightbox" onClick={() => setLightboxIndex(null)}>
          <button className="lightbox-close"><X size={32} /></button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <div className="lightbox-media">
              <img src={filteredItems[lightboxIndex].image} alt={filteredItems[lightboxIndex].title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              {filteredItems[lightboxIndex].type === 'video' && (
                <div className="lightbox-play-indicator">
                  <Play size={64} fill="currentColor" opacity={0.5} />
                </div>
              )}
            </div>
            <div className="lightbox-caption">
              <h3>{filteredItems[lightboxIndex].title}</h3>
              <p>{filteredItems[lightboxIndex].location} • {filteredItems[lightboxIndex].category}</p>
            </div>
            
            {/* Prev/Next buttons could go here */}
            {lightboxIndex > 0 && (
              <button className="lightbox-nav lightbox-prev" onClick={() => setLightboxIndex(lightboxIndex - 1)}>
                &lt;
              </button>
            )}
            {lightboxIndex < filteredItems.length - 1 && (
              <button className="lightbox-nav lightbox-next" onClick={() => setLightboxIndex(lightboxIndex + 1)}>
                &gt;
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
