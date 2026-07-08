import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SEOHead } from '@/components/seo/SEOHead';
import { SITE_CONFIG } from '@/lib/constants';
import './Contact.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Contact() {
  const [formState, setFormState] = useState({
    name: '', email: '', phone: '', tour: '', message: '', date: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('https://formspree.io/f/mlgyzvvn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      
      if (response.ok) {
        setSubmitted(true);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: SITE_CONFIG.name,
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '42, Spiritual Lane',
      addressLocality: 'Rishikesh',
      addressRegion: 'Uttarakhand',
      postalCode: '249201',
      addressCountry: 'IN',
    },
    openingHours: 'Mo-Sa 09:00-18:00',
  };

  return (
    <>
      <SEOHead
        title="Contact Us — Plan Your Sacred Journey"
        description="Get in touch with Divine Voyages. Call, WhatsApp, or fill our inquiry form to plan your perfect spiritual tour across India."
        canonical="/contact"
        schema={contactSchema}
      />

      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to help you plan your sacred journey</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            {/* Form */}
            <motion.div className="contact-form-wrapper" initial="hidden" animate="visible" variants={fadeInUp}>
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon">✅</div>
                  <h3>Thank You!</h3>
                  <p>Your inquiry has been received. Our team will contact you within 24 hours.</p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>Send Another</Button>
                </div>
              ) : (
                <>
                  <h2>Send Us an Inquiry</h2>
                  <p className="contact-form-desc">Fill out the form and our travel consultants will get back to you within 24 hours.</p>
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="contact-form-row">
                      <div className="contact-field">
                        <label htmlFor="contact-name">Full Name *</label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Your full name"
                          value={formState.name}
                          onChange={e => setFormState({ ...formState, name: e.target.value })}
                        />
                      </div>
                      <div className="contact-field">
                        <label htmlFor="contact-email">Email Address *</label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={formState.email}
                          onChange={e => setFormState({ ...formState, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="contact-form-row">
                      <div className="contact-field">
                        <label htmlFor="contact-phone">Phone / WhatsApp *</label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formState.phone}
                          onChange={e => setFormState({ ...formState, phone: e.target.value })}
                        />
                      </div>
                      <div className="contact-field">
                        <label htmlFor="contact-date">Preferred Travel Date</label>
                        <input
                          id="contact-date"
                          type="date"
                          value={formState.date}
                          onChange={e => setFormState({ ...formState, date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="contact-field">
                      <label htmlFor="contact-tour">Interested Tour</label>
                      <select
                        id="contact-tour"
                        value={formState.tour}
                        onChange={e => setFormState({ ...formState, tour: e.target.value })}
                      >
                        <option value="">Select a tour (optional)</option>
                        <option>Char Dham Yatra</option>
                        <option>Varanasi Spiritual Experience</option>
                        <option>South India Temple Trail</option>
                        <option>12 Jyotirlinga Darshan</option>
                        <option>Kailash Mansarovar Yatra</option>
                        <option>Rishikesh Yoga Retreat</option>
                        <option>Custom Tour</option>
                      </select>
                    </div>
                    <div className="contact-field">
                      <label htmlFor="contact-message">Your Message *</label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        placeholder="Tell us about your travel plans, group size, special requirements..."
                        value={formState.message}
                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                      />
                    </div>
                    {status === 'error' && (
                      <p style={{ color: 'red', marginBottom: '1rem' }}>
                        Oops! There was a problem sending your message. Please try again.
                      </p>
                    )}
                    <Button 
                      variant="primary" 
                      size="lg" 
                      type="submit" 
                      icon={<Send size={18} />}
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div className="contact-info" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}>
              <motion.div className="contact-info-card" variants={fadeInUp}>
                <div className="contact-info-icon"><Phone size={22} /></div>
                <div>
                  <h4>Call Us</h4>
                  <a href={`tel:${SITE_CONFIG.phone}`}>{SITE_CONFIG.phone}</a>
                  <p>Mon-Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </motion.div>

              <motion.div className="contact-info-card" variants={fadeInUp}>
                <div className="contact-info-icon whatsapp"><MessageCircle size={22} /></div>
                <div>
                  <h4>WhatsApp</h4>
                  <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    {SITE_CONFIG.phone}
                  </a>
                  <p>Quick responses, 24/7</p>
                </div>
              </motion.div>

              <motion.div className="contact-info-card" variants={fadeInUp}>
                <div className="contact-info-icon"><MapPin size={22} /></div>
                <div>
                  <h4>Office Address</h4>
                  <p>{SITE_CONFIG.address}</p>
                </div>
              </motion.div>

              <motion.div className="contact-info-card contact-hours" variants={fadeInUp}>
                <div className="contact-info-icon"><Clock size={22} /></div>
                <div>
                  <h4>Working Hours</h4>
                  <p>Monday – Saturday: 9:00 AM – 6:00 PM</p>
                  <p>Sunday: By Appointment</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
