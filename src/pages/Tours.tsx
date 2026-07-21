import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, Heart } from 'lucide-react';
import { ListingCard } from '@/components/tours/ListingCard';
import { SEOHead } from '@/components/seo/SEOHead';
import { CategoryFilter } from '@/components/common/CategoryFilter';
import { MapToggle } from '@/components/common/MapToggle';
import { Button } from '@/components/ui/Button';
import { tours } from '@/data/tours';
import { useWishlist } from '@/context/WishlistContext';
import './Tours.css';

export function Tours() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('destination') || '');
  const [showFilters, setShowFilters] = useState(false);
  const { wishlist } = useWishlist();

  const activeCategory = searchParams.get('category') || 'All';
  const activeDifficulty = searchParams.get('difficulty') || '';
  const activeSortBy = searchParams.get('sort') || 'popular';
  const isWishlistOnly = searchParams.get('wishlist') === 'true';

  const filteredTours = useMemo(() => {
    let result = [...tours];

    if (isWishlistOnly) {
      result = result.filter(t => wishlist.includes(t.id));
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.destination.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory && activeCategory !== 'All') {
      result = result.filter(t => t.category === activeCategory);
    }

    if (activeDifficulty) {
      result = result.filter(t => t.difficulty === activeDifficulty);
    }

    switch (activeSortBy) {
      case 'price-low':
        result.sort((a, b) => a.price.discounted - b.price.discounted);
        break;
      case 'price-high':
        result.sort((a, b) => b.price.discounted - a.price.discounted);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        result.sort((a, b) => a.duration.days - b.duration.days);
        break;
      default:
        result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    return result;
  }, [search, activeCategory, activeDifficulty, activeSortBy, isWishlistOnly, wishlist]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearch('');
  };

  const hasActiveFilters = (activeCategory !== 'All') || activeDifficulty || search || isWishlistOnly;

  return (
    <>
      <SEOHead
        title="Explore All Sacred Stays & Yatras"
        description="Browse our curated collection of spiritual stays & pilgrimage tours across India. Char Dham Yatra, Jyotirlinga tours, temple stays, yoga retreats & more."
        canonical="/tours"
      />

      <CategoryFilter 
        activeCategory={activeCategory} 
        onSelectCategory={(cat) => updateFilter('category', cat)}
        onOpenFilterModal={() => setShowFilters(!showFilters)}
      />

      <section className="tours-page-section">
        <div className="container">
          {/* TOOLBAR */}
          <div className="tours-toolbar">
            <div className="tours-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search stays, destinations, or yatras..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button type="button" className="clear-search-btn" onClick={() => setSearch('')}>
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="tours-toolbar-actions">
              {wishlist.length > 0 && (
                <button
                  type="button"
                  className={`tours-wishlist-toggle ${isWishlistOnly ? 'active' : ''}`}
                  onClick={() => updateFilter('wishlist', isWishlistOnly ? '' : 'true')}
                >
                  <Heart size={16} fill={isWishlistOnly ? '#FF385C' : 'none'} color={isWishlistOnly ? '#FF385C' : '#222'} />
                  <span>Wishlist ({wishlist.length})</span>
                </button>
              )}

              <select
                value={activeSortBy}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="tours-sort-select"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="duration">Shortest Duration</option>
              </select>
            </div>
          </div>

          {/* ACTIVE FILTER TAGS */}
          {hasActiveFilters && (
            <div className="tours-active-filters">
              <span className="tours-results-count">{filteredTours.length} stays & tours found</span>
              <div className="tours-active-chips">
                {isWishlistOnly && (
                  <span className="tours-active-chip">
                    Wishlist Only <X size={14} onClick={() => updateFilter('wishlist', '')} />
                  </span>
                )}
                {activeCategory !== 'All' && (
                  <span className="tours-active-chip">
                    {activeCategory} <X size={14} onClick={() => updateFilter('category', 'All')} />
                  </span>
                )}
                {activeDifficulty && (
                  <span className="tours-active-chip">
                    {activeDifficulty} <X size={14} onClick={() => updateFilter('difficulty', '')} />
                  </span>
                )}
                {search && (
                  <span className="tours-active-chip">
                    "{search}" <X size={14} onClick={() => setSearch('')} />
                  </span>
                )}
              </div>
              <button className="tours-clear-btn" onClick={clearFilters}>
                <Filter size={14} /> Clear All
              </button>
            </div>
          )}

          {/* TOUR LISTINGS GRID */}
          {filteredTours.length > 0 ? (
            <div className="airbnb-listings-grid">
              {filteredTours.map(tour => (
                <ListingCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="tours-empty">
              <div className="tours-empty-icon">🔍</div>
              <h3>No stays or yatras found</h3>
              <p>Try clearing filters or searching for another sacred destination.</p>
              <Button variant="outline" onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </section>

      <MapToggle tours={tours} />
    </>
  );
}
