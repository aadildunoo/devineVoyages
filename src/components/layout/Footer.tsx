import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import './Footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="site-footer">
      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <div className="container">
          <div className="footer-newsletter-content">
            <div className="footer-newsletter-text">
              <h3>Begin Your Sacred Journey</h3>
              <p>Subscribe for exclusive tour offers, spiritual travel guides, and pilgrimage tips.</p>
            </div>
            <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="footer-newsletter-input"
                aria-label="Email address for newsletter"
                required
              />
              <button type="submit" className="footer-newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-col footer-col-brand">
              <Link to="/" className="footer-logo">
                <span className="footer-logo-icon">🙏</span>
                <span className="footer-logo-name">Divine Voyages</span>
              </Link>
              <p className="footer-brand-desc">
                India's premier spiritual travel company offering curated pilgrimage tours
                and sacred journeys across the subcontinent.
              </p>
              <div className="footer-social">
                <a href={SITE_CONFIG.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="footer-social-link">IG</a>
                <a href={SITE_CONFIG.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="footer-social-link">FB</a>
                <a href={SITE_CONFIG.social.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="footer-social-link">YT</a>
                <a href={SITE_CONFIG.social.twitter} aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="footer-social-link">X</a>
              </div>
            </div>

            {/* Popular Tours */}
            <div className="footer-col">
              <h4 className="footer-col-title">Popular Tours</h4>
              <ul className="footer-links">
                <li><Link to="/tours/char-dham-yatra-complete">Char Dham Yatra</Link></li>
                <li><Link to="/tours/varanasi-spiritual-experience">Varanasi Experience</Link></li>
                <li><Link to="/tours/12-jyotirlinga-darshan">12 Jyotirlinga Tour</Link></li>
                <li><Link to="/tours/south-india-temple-trail">South India Temples</Link></li>
                <li><Link to="/tours/kailash-mansarovar-yatra">Kailash Mansarovar</Link></li>
                <li><Link to="/tours/rishikesh-yoga-retreat">Rishikesh Yoga Retreat</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/destinations">Destinations</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/blog">Travel Blog</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-col">
              <h4 className="footer-col-title">Contact Us</h4>
              <ul className="footer-contact">
                <li>
                  <MapPin size={16} />
                  <span>{SITE_CONFIG.address}</span>
                </li>
                <li>
                  <Phone size={16} />
                  <a href={`tel:${SITE_CONFIG.phone}`}>{SITE_CONFIG.phone}</a>
                </li>
              </ul>
              <div className="footer-trust">
                <div className="footer-trust-badge">✅ Verified Tour Operator</div>
                <div className="footer-trust-badge">🛡️ 100% Secure Booking</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>© {currentYear} Divine Voyages. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/refund">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
