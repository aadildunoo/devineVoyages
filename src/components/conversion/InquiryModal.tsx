import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import './InquiryModal.css';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourName?: string;
}

export function InquiryModal({ isOpen, onClose, tourName }: InquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSubmitted(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="inquiry-modal-backdrop" onClick={onClose}>
      <div className="inquiry-modal" onClick={e => e.stopPropagation()}>
        <button className="inquiry-modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {submitted ? (
          <div className="inquiry-success">
            <div className="inquiry-success-icon">✅</div>
            <h3>Request Received!</h3>
            <p>Our travel expert will contact you shortly about your inquiry{tourName ? ` for ${tourName}` : ''}.</p>
            <Button variant="primary" onClick={onClose} fullWidth>Close</Button>
          </div>
        ) : (
          <>
            <h2 className="inquiry-modal-title">Quick Inquiry</h2>
            <p className="inquiry-modal-subtitle">
              {tourName ? `Interested in ${tourName}? Let's talk.` : 'Have a question? We are here to help.'}
            </p>

            <form className="inquiry-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="inquiry-field">
                <label>Name</label>
                <input type="text" required placeholder="Your name" />
              </div>
              <div className="inquiry-field">
                <label>Phone / WhatsApp</label>
                <input type="tel" required placeholder="+91 98765 43210" />
              </div>
              <div className="inquiry-field">
                <label>Message</label>
                <textarea rows={3} required placeholder="Any specific requirements?" />
              </div>
              <Button variant="primary" size="lg" type="submit" fullWidth icon={<Send size={18} />}>
                Send Request
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
