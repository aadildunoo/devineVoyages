import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import type { Tour } from '@/lib/types';
import { useWishlist } from '@/context/WishlistContext';
import './ListingCard.css';

interface ListingCardProps {
  tour: Tour;
}

export function ListingCard({ tour }: ListingCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();

  const allImages = [tour.heroImage, ...(tour.images || [])].filter(Boolean);
  const isWishlisted = isInWishlist(tour.id);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(tour.id);
  };

  return (
    <div 
      className="airbnb-listing-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGE CONTAINER */}
      <div className="card-image-wrap">
        <Link to={`/tours/${tour.slug}`} className="card-image-link">
          <img 
            src={allImages[currentImageIndex] || tour.heroImage} 
            alt={tour.title} 
            className="card-img"
            loading="lazy"
          />
        </Link>

        {/* WISHLIST HEART BUTTON */}
        <button 
          type="button" 
          className={`wishlist-heart-btn ${isWishlisted ? 'liked' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart 
            size={22} 
            fill={isWishlisted ? 'var(--airbnb-coral, #ff385c)' : 'rgba(0, 0, 0, 0.4)'} 
            stroke={isWishlisted ? 'var(--airbnb-coral, #ff385c)' : '#ffffff'}
            strokeWidth={2}
          />
        </button>

        {/* GUEST FAVORITE BADGE */}
        {tour.rating >= 4.8 && (
          <div className="guest-favorite-badge">
            <Award size={13} />
            <span>Guest favorite</span>
          </div>
        )}

        {/* CAROUSEL ARROWS */}
        {allImages.length > 1 && isHovered && (
          <>
            <button 
              type="button" 
              className="carousel-btn prev-btn" 
              onClick={handlePrevImage}
              aria-label="Previous photo"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              type="button" 
              className="carousel-btn next-btn" 
              onClick={handleNextImage}
              aria-label="Next photo"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* CAROUSEL DOTS */}
        {allImages.length > 1 && (
          <div className="carousel-dots">
            {allImages.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* CARD CONTENT */}
      <Link to={`/tours/${tour.slug}`} className="card-content-link">
        <div className="card-header-line">
          <h3 className="card-title-text">{tour.title}</h3>
          <div className="card-rating-badge">
            <Star size={14} className="star-icon" />
            <span className="rating-score">{tour.rating.toFixed(2)}</span>
          </div>
        </div>

        <p className="card-subtitle-line">{tour.destination}, {tour.state}</p>
        <p className="card-meta-line">{tour.duration.days} days • {tour.difficulty} Yatra</p>

        <div className="card-price-line">
          <span className="price-amount">{tour.price.currency}{tour.price.discounted.toLocaleString('en-IN')}</span>
          <span className="price-unit"> total package</span>
          {tour.price.original > tour.price.discounted && (
            <span className="price-original">{tour.price.currency}{tour.price.original.toLocaleString('en-IN')}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
