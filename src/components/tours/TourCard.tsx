import { Link } from 'react-router-dom';
import { Clock, MapPin, Star, Users, Heart } from 'lucide-react';
import { DifficultyBadge } from '@/components/ui/Badge';
import type { Tour } from '@/lib/types';
import { useWishlist } from '@/context/WishlistContext';
import './TourCard.css';

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(tour.id);

  return (
    <Link to={`/tours/${tour.slug}`} className="tour-card" id={`tour-card-${tour.id}`}>
      <div className="tour-card-image">
        {tour.heroImage ? (
          <img 
            src={tour.heroImage} 
            alt={tour.title} 
            className="tour-card-image-bg"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        ) : (
          <div
            className="tour-card-image-bg"
            style={{
              background: `linear-gradient(135deg, ${getGradientForCategory(tour.category)})`,
            }}
          >
            <div className="tour-card-image-icon">🕉️</div>
          </div>
        )}
        <div className="tour-card-image-overlay" />
        <div className="tour-card-badges">
          <DifficultyBadge difficulty={tour.difficulty} />
        </div>
        <button
          className={`tour-card-wishlist ${isWishlisted ? 'wishlisted' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(tour.id);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="tour-card-content">
        <div className="tour-card-meta">
          <span className="tour-card-category">{tour.category}</span>
          <span className="tour-card-rating">
            <Star size={14} fill="currentColor" /> {tour.rating} ({tour.reviewCount})
          </span>
        </div>

        <h3 className="tour-card-title">{tour.title}</h3>
        <p className="tour-card-description">{tour.shortDescription}</p>

        <div className="tour-card-details">
          <span className="tour-card-detail">
            <MapPin size={14} /> {tour.destination}
          </span>
          <span className="tour-card-detail">
            <Clock size={14} /> {tour.duration.days}D / {tour.duration.nights}N
          </span>
          <span className="tour-card-detail">
            <Users size={14} /> Max {tour.groupSize.max}
          </span>
        </div>

        <div className="tour-card-footer" style={{ justifyContent: 'center' }}>
          <span className="tour-card-cta-btn" style={{ background: 'var(--saffron)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-full)', fontWeight: 600, transition: 'background var(--transition-base)' }}>Enquire Now</span>
        </div>
      </div>
    </Link>
  );
}

function getGradientForCategory(category: string): string {
  const gradients: Record<string, string> = {
    'Char Dham': '#FF6B2B 0%, #FF8A50 50%, #FFD700 100%',
    'Jyotirlinga': '#5B1A2A 0%, #7A2E3F 50%, #D4A853 100%',
    'Temple Tour': '#E55A1B 0%, #FF6B2B 50%, #FFD93D 100%',
    'River Pilgrimage': '#0EA5E9 0%, #38BDF8 50%, #7DD3FC 100%',
    'Mountain Pilgrimage': '#475569 0%, #64748B 50%, #94A3B8 100%',
    'Festival Special': '#D946EF 0%, #F0ABFC 50%, #FDE047 100%',
    'South India': '#059669 0%, #10B981 50%, #34D399 100%',
    'Buddhist Circuit': '#F59E0B 0%, #FBBF24 50%, #FDE68A 100%',
  };
  return gradients[category] || '#FF6B2B 0%, #FF8A50 100%';
}
