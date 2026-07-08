import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { TourCard } from '@/components/tours/TourCard';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/Button';
import { tours } from '@/data/tours';
import { TOUR_CATEGORIES } from '@/lib/constants';
import './Tours.css';

export function Tours() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const activeCategory = searchParams.get('category') || '';
  const activeDifficulty = searchParams.get('difficulty') || '';
  const activeSortBy = searchParams.get('sort') || 'popular';

  const filteredTours = useMemo(() => {
    let result = [...tours];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.destination.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory) {
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
  }, [search, activeCategory, activeDifficulty, activeSortBy]);

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

  const hasActiveFilters = activeCategory || activeDifficulty || search;

  return (
    <>
      <SEOHead
        title="Sacred Tours & Pilgrimage Packages"
        description="Browse our curated collection of spiritual tours across India. Char Dham Yatra, Jyotirlinga tours, temple visits, yoga retreats & more. Book your divine journey today!"
        canonical="/tours"
      />

      {/* Page Header */}
      <section className="tours-hero">
        <div className="container">
          <h1>Sacred Tours & Pilgrimages</h1>
          <p>Curated spiritual journeys to India's most divine destinations</p>
        </div>
      </section>

      <section className="tours-page section">
        <div className="container">
          {/* Search & Filter Bar */}
          <div className="tours-toolbar">
            <div className="tours-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search tours by name, destination, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="tour-search"
              />
            </div>
            <div className="tours-toolbar-actions">
              <button
                className="tours-filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
              <select
                value={activeSortBy}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="tours-sort"
                id="tour-sort"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="duration">Shortest First</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="tours-filters">
              <div className="tours-filter-group">
                <label>Category</label>
                <div className="tours-filter-chips">
                  {TOUR_CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      className={`tours-filter-chip ${activeCategory === cat ? 'active' : ''}`}
                      onClick={() => updateFilter('category', activeCategory === cat ? '' : cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="tours-filter-group">
                <label>Difficulty</label>
                <div className="tours-filter-chips">
                  {['Easy', 'Moderate', 'Challenging'].map(d => (
                    <button
                      key={d}
                      className={`tours-filter-chip ${activeDifficulty === d ? 'active' : ''}`}
                      onClick={() => updateFilter('difficulty', activeDifficulty === d ? '' : d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="tours-active-filters">
              <span className="tours-results-count">{filteredTours.length} tours found</span>
              <div className="tours-active-chips">
                {activeCategory && (
                  <span className="tours-active-chip">
                    {activeCategory} <X size={14} onClick={() => updateFilter('category', '')} />
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

          {/* Tour Grid */}
          {filteredTours.length > 0 ? (
            <div className="tours-grid">
              {filteredTours.map(tour => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="tours-empty">
              <div className="tours-empty-icon">🔍</div>
              <h3>No tours found</h3>
              <p>Try adjusting your filters or search terms</p>
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
