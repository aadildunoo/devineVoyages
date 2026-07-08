import { Phone, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import './FloatingActions.css';

export function FloatingActions() {
  return (
    <div className="floating-actions" id="floating-actions">
      <a
        href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi%20Divine%20Voyages!%20I'm%20interested%20in%20your%20tours.`}
        className="floating-btn floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={22} />
        <span className="floating-tooltip">WhatsApp</span>
      </a>
      <a
        href={`tel:${SITE_CONFIG.phone}`}
        className="floating-btn floating-call"
        aria-label="Call us"
      >
        <Phone size={22} />
        <span className="floating-tooltip">Call Us</span>
      </a>
    </div>
  );
}
