import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Globe, Menu, User, Heart, Compass, MapPin, Phone, HelpCircle, Shield } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import './Header.css';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'stays' | 'experiences'>('stays');
  
  const { wishlist } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`airbnb-header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-inner">
        {/* LOGO */}
        <Link to="/" className="header-logo-brand" aria-label="Divine Voyages Home">
          <div className="logo-icon-bg">
            <span className="logo-emoji">🙏</span>
          </div>
          <div className="logo-brand-text">
            <span className="brand-title">Divine Voyages</span>
            <span className="brand-subtitle">Sacred Stays & Yatra</span>
          </div>
        </Link>

        {/* CENTER CAPSULE / TABS */}
        <div className="header-center">
          {(!isHomePage || isScrolled) ? (
            <button 
              type="button" 
              className="compact-search-pill"
              onClick={() => navigate('/tours')}
            >
              <span className="pill-section font-semibold">Anywhere in India</span>
              <span className="pill-divider" />
              <span className="pill-section">Any week</span>
              <span className="pill-divider" />
              <span className="pill-section muted">Add guests</span>
              <div className="pill-search-icon">
                <Search size={14} strokeWidth={2.5} />
              </div>
            </button>
          ) : (
            <div className="header-tabs">
              <button 
                type="button" 
                className={`tab-btn ${activeTab === 'stays' ? 'active' : ''}`}
                onClick={() => setActiveTab('stays')}
              >
                Stays & Ashrams
              </button>
              <button 
                type="button" 
                className={`tab-btn ${activeTab === 'experiences' ? 'active' : ''}`}
                onClick={() => setActiveTab('experiences')}
              >
                Yatra Experiences
              </button>
            </div>
          )}
        </div>

        {/* RIGHT USER ACTIONS */}
        <div className="header-right-actions">
          <Link to="/contact" className="host-link">
            Partner with us
          </Link>
          
          <button type="button" className="globe-btn" aria-label="Language / Region">
            <Globe size={18} />
          </button>

          {/* USER PROFILE DROPDOWN */}
          <div ref={menuRef} className="user-menu-wrapper">
            <button 
              type="button" 
              className="user-menu-pill"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              aria-label="User menu"
            >
              <Menu size={18} />
              <div className="user-avatar-circle">
                <User size={16} />
              </div>
              {wishlist.length > 0 && (
                <span className="wishlist-badge">{wishlist.length}</span>
              )}
            </button>

            {isUserMenuOpen && (
              <div className="user-dropdown-menu">
                <div className="dropdown-group">
                  <Link to="/tours" className="dropdown-item">
                    <Compass size={18} />
                    <span>Explore All Stays & Yatras</span>
                  </Link>
                  <Link to="/destinations" className="dropdown-item">
                    <MapPin size={18} />
                    <span>Sacred Destinations</span>
                  </Link>
                </div>

                <div className="dropdown-divider" />

                <div className="dropdown-group">
                  <Link to="/tours?wishlist=true" className="dropdown-item">
                    <Heart size={18} className="heart-icon" />
                    <span>Wishlists</span>
                    {wishlist.length > 0 && (
                      <span className="dropdown-count">{wishlist.length}</span>
                    )}
                  </Link>
                  <Link to="/about" className="dropdown-item">
                    <Shield size={18} />
                    <span>About Divine Voyages</span>
                  </Link>
                </div>

                <div className="dropdown-divider" />

                <div className="dropdown-group">
                  <Link to="/contact" className="dropdown-item">
                    <Phone size={18} />
                    <span>Help & Contact Us</span>
                  </Link>
                  <Link to="/blog" className="dropdown-item">
                    <HelpCircle size={18} />
                    <span>Travel Guides & Blogs</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
