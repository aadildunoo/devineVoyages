import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import './Header.css';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`} id="main-header">
      <div className="header-container container">
        {/* Logo */}
        <Link to="/" className="header-logo" aria-label="Divine Voyages Home">
          <span className="header-logo-icon">🙏</span>
          <div className="header-logo-text">
            <span className="header-logo-name">Divine Voyages</span>
            <span className="header-logo-tagline">Sacred Journeys</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav" aria-label="Main navigation">
          {NAV_LINKS.map((item) => (
            <div
              key={item.href}
              className="header-nav-item"
              onMouseEnter={() => (item as any).children && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                to={item.href}
                className="header-nav-link"
                onClick={() => setActiveDropdown(null)}
              >
                {item.label}
                {(item as any).children && <ChevronDown size={14} />}
              </Link>

              {(item as any).children && activeDropdown === item.label && (
                <div className="header-dropdown">
                  {(item as any).children.map((child: any) => (
                    <Link
                      key={child.label}
                      to={child.href}
                      className="header-dropdown-item"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="header-actions">
          <Link to="/contact" className="header-btn-contact">Contact Us</Link>
          <Button variant="primary" className="header-btn-book">Book Now</Button>
          
          <button 
            className="header-mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`header-mobile ${isMobileOpen ? 'open' : ''}`}>
        <nav className="header-mobile-nav" aria-label="Mobile navigation">
          {NAV_LINKS.map((item) => (
            <div key={item.href} className="header-mobile-item">
              <Link 
                to={item.href} 
                className="header-mobile-link"
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </Link>
              {(item as any).children && (
                <div className="header-mobile-sub">
                  {(item as any).children.map((child: any) => (
                    <Link 
                      key={child.href} 
                      to={child.href} 
                      className="header-mobile-sub-link"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="header-mobile-actions">
          <a href={`tel:${SITE_CONFIG.phone}`} className="header-mobile-phone">
            <Phone size={18} /> {SITE_CONFIG.phone}
          </a>
          <Link to="/contact" style={{ width: '100%' }}>
            <Button variant="primary" fullWidth>Enquire Now</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
