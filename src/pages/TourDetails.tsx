import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Heart, 
  Share2, 
  Check, 
  X, 
  Utensils, 
  Building2, 
  Bus, 
  Phone, 
  Award, 
  Grid, 
  UserCheck 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SEOHead } from '@/components/seo/SEOHead';
import { InquiryModal } from '@/components/conversion/InquiryModal';
import { ListingCard } from '@/components/tours/ListingCard';
import { getTourBySlug, tours } from '@/data/tours';
import { useWishlist } from '@/context/WishlistContext';
import { SITE_CONFIG } from '@/lib/constants';
import './TourDetails.css';

export function TourDetails() {
  const { slug } = useParams<{ slug: string }>();
  const tour = getTourBySlug(slug || '');
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPhotoLightbox, setShowPhotoLightbox] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [guestCount, setGuestCount] = useState(1);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  if (!tour) {
    return (
      <div className="tour-not-found container section">
        <h2>Tour Not Found</h2>
        <p>The tour you're looking for doesn't exist.</p>
        <Link to="/tours">
          <Button variant="primary">Browse All Tours</Button>
        </Link>
      </div>
    );
  }

  const allPhotos = [tour.heroImage, ...(tour.images || [])].filter(Boolean);
  const isWishlisted = isInWishlist(tour.id);
  const relatedTours = tours.filter((t) => t.category === tour.category && t.id !== tour.id).slice(0, 4);

  const basePrice = tour.price.discounted;
  const totalPrice = basePrice * guestCount;

  const tourSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.description,
    provider: {
      '@type': 'TravelAgency',
      name: SITE_CONFIG.name,
      telephone: SITE_CONFIG.phone,
    },
    offers: {
      '@type': 'Offer',
      price: tour.price.discounted,
      priceCurrency: 'INR',
    },
  };

  return (
    <>
      <SEOHead
        title={`${tour.title} — Airbnb-Style Sacred Stay`}
        description={tour.shortDescription}
        canonical={`/tours/${tour.slug}`}
        schema={tourSchema}
      />

      <div className="tour-detail-page-wrapper">
        <div className="container">
          {/* TITLE & HEADER BAR */}
          <div className="td-header-top">
            <h1 className="td-main-title">{tour.title}</h1>
            <div className="td-sub-bar">
              <div className="td-sub-info">
                <span className="td-rating-chip">
                  <Star size={16} fill="#222" color="#222" />
                  <strong>{tour.rating.toFixed(2)}</strong>
                  <span className="td-review-count">({tour.reviewCount} reviews)</span>
                </span>
                <span className="td-dot">•</span>
                {tour.rating >= 4.8 && (
                  <>
                    <span className="td-badge-favorite">
                      <Award size={14} /> Guest favorite
                    </span>
                    <span className="td-dot">•</span>
                  </>
                )}
                <span className="td-location-link">
                  <MapPin size={15} /> {tour.destination}, {tour.state}, India
                </span>
              </div>

              <div className="td-header-actions">
                <button type="button" className="action-pill-btn" aria-label="Share">
                  <Share2 size={16} /> <span>Share</span>
                </button>
                <button 
                  type="button" 
                  className={`action-pill-btn ${isWishlisted ? 'liked' : ''}`}
                  onClick={() => toggleWishlist(tour.id)}
                  aria-label="Wishlist"
                >
                  <Heart size={16} fill={isWishlisted ? '#FF385C' : 'none'} color={isWishlisted ? '#FF385C' : '#222'} /> 
                  <span>{isWishlisted ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* AIRBNB 5-PHOTO MOSAIC GRID */}
          <div className="airbnb-photo-grid">
            <div className="photo-main-box" onClick={() => { setActivePhotoIdx(0); setShowPhotoLightbox(true); }}>
              <img src={allPhotos[0]} alt={tour.title} className="mosaic-img" />
            </div>

            <div className="photo-thumbnails-grid">
              {allPhotos.slice(1, 5).map((imgUrl, i) => (
                <div 
                  key={i} 
                  className="photo-thumb-box"
                  onClick={() => { setActivePhotoIdx(i + 1); setShowPhotoLightbox(true); }}
                >
                  <img src={imgUrl} alt={`${tour.title} ${i + 2}`} className="mosaic-img" />
                </div>
              ))}
            </div>

            <button 
              type="button" 
              className="show-all-photos-btn"
              onClick={() => setShowPhotoLightbox(true)}
            >
              <Grid size={16} /> <span>Show all {allPhotos.length} photos</span>
            </button>
          </div>

          {/* MAIN DETAILS & STICKY BOOKING SIDEBAR */}
          <div className="td-body-layout">
            {/* LEFT MAIN DETAILS */}
            <div className="td-main-content">
              {/* HOST & DURATION INFO */}
              <div className="td-host-banner">
                <div className="host-text">
                  <h2 className="host-title">Stay & Yatra hosted by Divine Voyages Pandits</h2>
                  <p className="host-meta">
                    {tour.duration.days} days • {tour.duration.nights} nights • Max {tour.groupSize.max} pilgrims • {tour.difficulty} difficulty
                  </p>
                </div>
                <div className="host-avatar-ring">
                  <UserCheck size={28} />
                </div>
              </div>

              <div className="td-section-divider" />

              {/* HIGHLIGHTS / AMENITIES CHECKLIST */}
              <div className="td-highlights-section">
                <h3 className="section-block-title">Key Sacred Highlights</h3>
                <div className="highlights-grid">
                  {tour.highlights.map((item, idx) => (
                    <div key={idx} className="highlight-item-card">
                      <div className="check-icon-wrap">
                        <Check size={16} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="td-section-divider" />

              {/* ABOUT / DESCRIPTION */}
              <div className="td-about-section">
                <h3 className="section-block-title">About this Sacred Experience</h3>
                <p className="description-paragraph">{tour.description}</p>
                <div className="specs-row">
                  <div className="spec-box">
                    <Building2 size={20} className="spec-icon" />
                    <div>
                      <strong>Stay & Accommodation</strong>
                      <p>{tour.accommodation}</p>
                    </div>
                  </div>
                  <div className="spec-box">
                    <Bus size={20} className="spec-icon" />
                    <div>
                      <strong>Transport</strong>
                      <p>{tour.transport}</p>
                    </div>
                  </div>
                  <div className="spec-box">
                    <Utensils size={20} className="spec-icon" />
                    <div>
                      <strong>Sattvic Meals</strong>
                      <p>{tour.meals}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="td-section-divider" />

              {/* VISUAL ITINERARY TIMELINE WITH IMAGE CARDS */}
              <div className="td-itinerary-section">
                <h3 className="section-block-title">Day-by-Day Journey Itinerary</h3>
                <div className="visual-itinerary-list">
                  {tour.itinerary.map((day) => (
                    <div key={day.day} className="itinerary-card">
                      {day.image && (
                        <div className="itinerary-card-img-wrap">
                          <img src={day.image} alt={day.title} className="itinerary-img" loading="lazy" />
                          <span className="day-badge">Day {day.day}</span>
                        </div>
                      )}
                      <div className="itinerary-card-body">
                        {!day.image && <span className="day-badge-inline">Day {day.day}</span>}
                        <h4 className="day-title-text">{day.title}</h4>
                        <p className="day-desc-text">{day.description}</p>
                        {day.meals.length > 0 && (
                          <div className="day-meal-tag">
                            <Utensils size={14} /> <span>{day.meals.join(' • ')}</span>
                          </div>
                        )}
                        {day.accommodation && (
                          <div className="day-stay-tag">
                            <Building2 size={14} /> <span>{day.accommodation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="td-section-divider" />

              {/* INCLUSIONS & EXCLUSIONS */}
              <div className="td-inclusions-section">
                <h3 className="section-block-title">What's Included & Excluded</h3>
                <div className="inc-exc-grid">
                  <div className="inc-box">
                    <h4 className="inc-title">✅ Included</h4>
                    <ul>
                      {tour.inclusions.map((inc, i) => (
                        <li key={i}><Check size={15} color="#16a34a" /> {inc}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="exc-box">
                    <h4 className="exc-title">❌ Excluded</h4>
                    <ul>
                      {tour.exclusions.map((exc, i) => (
                        <li key={i}><X size={15} color="#dc2626" /> {exc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="td-section-divider" />

              {/* REVIEWS & RATINGS BREAKDOWN */}
              <div className="td-reviews-section">
                <div className="reviews-header">
                  <Star size={24} fill="#222" color="#222" />
                  <h3>{tour.rating.toFixed(2)} • {tour.reviewCount} reviews</h3>
                </div>

                <div className="reviews-metrics-grid">
                  <div className="metric-row">
                    <span>Cleanliness & Hygiene</span>
                    <div className="metric-bar"><div className="bar-fill" style={{ width: '98%' }} /></div>
                    <span>4.9</span>
                  </div>
                  <div className="metric-row">
                    <span>Accuracy & Guidance</span>
                    <div className="metric-bar"><div className="bar-fill" style={{ width: '96%' }} /></div>
                    <span>4.9</span>
                  </div>
                  <div className="metric-row">
                    <span>Communication & Pandits</span>
                    <div className="metric-bar"><div className="bar-fill" style={{ width: '100%' }} /></div>
                    <span>5.0</span>
                  </div>
                  <div className="metric-row">
                    <span>VIP Darshan & Location</span>
                    <div className="metric-bar"><div className="bar-fill" style={{ width: '95%' }} /></div>
                    <span>4.8</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT STICKY AIRBNB RESERVATION SIDEBAR */}
            <aside className="td-sidebar-sticky">
              <div className="airbnb-reservation-card">
                <div className="res-price-line">
                  <div>
                    <span className="res-amount">{tour.price.currency}{tour.price.discounted.toLocaleString('en-IN')}</span>
                    <span className="res-unit"> / person</span>
                  </div>
                  <div className="res-rating-small">
                    <Star size={14} fill="#222" />
                    <span>{tour.rating.toFixed(2)}</span>
                  </div>
                </div>

                {/* DATE & GUEST INPUT BOX */}
                <div className="res-inputs-box">
                  <div className="res-input-row">
                    <label className="res-label">SELECT BATCH DATE</label>
                    <select 
                      value={selectedDateIndex} 
                      onChange={(e) => setSelectedDateIndex(Number(e.target.value))}
                      className="res-select"
                    >
                      {tour.availableDates.map((date, idx) => (
                        <option key={idx} value={idx} disabled={date.status === 'Sold Out'}>
                          {date.startDate} to {date.endDate} ({date.status})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="res-input-row">
                    <label className="res-label">GUESTS</label>
                    <div className="res-guest-select">
                      <span>{guestCount} Guest{guestCount > 1 ? 's' : ''}</span>
                      <div className="guest-controls">
                        <button 
                          type="button" 
                          disabled={guestCount <= 1} 
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        >-</button>
                        <button 
                          type="button" 
                          onClick={() => setGuestCount(guestCount + 1)}
                        >+</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RESERVE BUTTON */}
                <button 
                  type="button" 
                  className="airbnb-reserve-btn"
                  onClick={() => setIsModalOpen(true)}
                >
                  Reserve / Enquire Now
                </button>
                <p className="res-disclaimer">You won't be charged yet</p>

                {/* BREAKDOWN */}
                <div className="res-breakdown">
                  <div className="breakdown-line">
                    <span>{tour.price.currency}{basePrice.toLocaleString('en-IN')} x {guestCount} guest{guestCount > 1 ? 's' : ''}</span>
                    <span>{tour.price.currency}{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="breakdown-line">
                    <span>VIP Darshan & Guide Arrangement</span>
                    <span className="free-tag">Included</span>
                  </div>
                  <div className="breakdown-line">
                    <span>GST & Service Permit</span>
                    <span>Included</span>
                  </div>
                  <div className="breakdown-divider" />
                  <div className="breakdown-line total-line">
                    <span>Total Package</span>
                    <span>{tour.price.currency}{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="res-phone-help">
                  <Phone size={16} />
                  <span>Call Us: {SITE_CONFIG.phone}</span>
                </div>
              </div>
            </aside>
          </div>

          {/* SIMILAR TOURS */}
          {relatedTours.length > 0 && (
            <div className="td-related-section">
              <h2 className="section-block-title">Similar Sacred Stays You Might Like</h2>
              <div className="airbnb-listings-grid">
                {relatedTours.map((t) => (
                  <ListingCard key={t.id} tour={t} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PHOTO LIGHTBOX MODAL */}
      {showPhotoLightbox && (
        <div className="photo-lightbox-modal">
          <button 
            type="button" 
            className="lightbox-close-btn"
            onClick={() => setShowPhotoLightbox(false)}
          >
            <X size={24} />
          </button>
          <div className="lightbox-content">
            <img src={allPhotos[activePhotoIdx]} alt="Full view" className="lightbox-full-img" />
            <div className="lightbox-nav-bar">
              {allPhotos.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt="Thumb" 
                  className={`lightbox-thumb ${idx === activePhotoIdx ? 'active' : ''}`}
                  onClick={() => setActivePhotoIdx(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE STICKY BAR */}
      <div className="td-mobile-reserve-bar">
        <div>
          <span className="mobile-price">{tour.price.currency}{tour.price.discounted.toLocaleString('en-IN')}</span>
          <span className="mobile-unit"> / person</span>
        </div>
        <button 
          type="button" 
          className="airbnb-reserve-btn mobile"
          onClick={() => setIsModalOpen(true)}
        >
          Reserve
        </button>
      </div>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tourName={tour.title}
      />
    </>
  );
}
