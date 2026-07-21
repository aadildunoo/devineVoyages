import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar as CalendarIcon, X, Minus, Plus } from 'lucide-react';
import './AirbnbSearchBar.css';

interface AirbnbSearchBarProps {
  isCompact?: boolean;
  onSearch?: (location: string, date: string, guests: number) => void;
}

const POPULAR_DESTINATIONS = [
  { name: 'Varanasi', sub: 'Sacred Ganges Ghats & Kashi Vishwanath' },
  { name: 'Kedarnath', sub: 'Himalayan Shrine & Char Dham' },
  { name: 'Rishikesh', sub: 'Yoga Capital & River Retreat' },
  { name: 'Madurai', sub: 'Meenakshi Temple Dravidian Wonder' },
  { name: 'Tirupati', sub: 'Sacred Tirumala Hills VIP Darshan' },
  { name: 'Bodh Gaya', sub: 'UNESCO Enlightenment Heritage' },
];

export function AirbnbSearchBar({ isCompact = false, onSearch }: AirbnbSearchBarProps) {
  const [activeTab, setActiveTab] = useState<'where' | 'when' | 'who' | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const totalGuests = adults + children;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveTab(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setActiveTab(null);
    if (onSearch) {
      onSearch(selectedLocation, selectedDate, totalGuests);
    } else {
      const params = new URLSearchParams();
      if (selectedLocation) params.set('destination', selectedLocation);
      if (totalGuests) params.set('guests', totalGuests.toString());
      navigate(`/tours?${params.toString()}`);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`airbnb-search-bar ${isCompact ? 'compact' : 'expanded'} ${activeTab ? 'has-active-tab' : ''}`}
    >
      <div className="search-inputs-wrapper">
        {/* WHERE */}
        <div 
          className={`search-field ${activeTab === 'where' ? 'active' : ''}`}
          onClick={() => setActiveTab('where')}
        >
          <div className="search-field-content">
            <span className="field-label">Where</span>
            <input 
              type="text" 
              placeholder="Search sacred destinations" 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="field-input"
            />
          </div>
          {selectedLocation && (
            <button 
              type="button" 
              className="clear-field-btn" 
              onClick={(e) => { e.stopPropagation(); setSelectedLocation(''); }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="search-divider" />

        {/* WHEN */}
        <div 
          className={`search-field ${activeTab === 'when' ? 'active' : ''}`}
          onClick={() => setActiveTab('when')}
        >
          <div className="search-field-content">
            <span className="field-label">When</span>
            <span className="field-value">
              {selectedDate || 'Any week / month'}
            </span>
          </div>
        </div>

        <div className="search-divider" />

        {/* WHO */}
        <div 
          className={`search-field ${activeTab === 'who' ? 'active' : ''}`}
          onClick={() => setActiveTab('who')}
        >
          <div className="search-field-content">
            <span className="field-label">Who</span>
            <span className="field-value">
              {totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : 'Add guests'}
            </span>
          </div>
        </div>

        {/* SEARCH BUTTON */}
        <button 
          type="button" 
          className="search-submit-btn" 
          onClick={() => handleSearchSubmit()}
          aria-label="Search stays & tours"
        >
          <Search size={18} strokeWidth={2.5} />
          {!isCompact && <span className="btn-text">Search</span>}
        </button>
      </div>

      {/* POPOVERS */}
      {activeTab === 'where' && (
        <div className="search-popover destination-popover">
          <div className="popover-title">Suggested sacred places</div>
          <div className="destinations-list">
            <div 
              className={`destination-item ${selectedLocation === '' ? 'selected' : ''}`}
              onClick={() => { setSelectedLocation(''); setActiveTab('when'); }}
            >
              <div className="dest-icon-box">
                <MapPin size={18} />
              </div>
              <div className="dest-text">
                <span className="dest-name">I'm flexible</span>
                <span className="dest-sub">Explore all spiritual journeys & retreats</span>
              </div>
            </div>

            {POPULAR_DESTINATIONS.map((dest) => (
              <div 
                key={dest.name} 
                className={`destination-item ${selectedLocation === dest.name ? 'selected' : ''}`}
                onClick={() => { setSelectedLocation(dest.name); setActiveTab('when'); }}
              >
                <div className="dest-icon-box">
                  <MapPin size={18} />
                </div>
                <div className="dest-text">
                  <span className="dest-name">{dest.name}</span>
                  <span className="dest-sub">{dest.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'when' && (
        <div className="search-popover dates-popover">
          <div className="popover-title">Select dates or flexible duration</div>
          <div className="date-options-grid">
            {['Anytime', 'This Month', 'Next Month', 'August 2026', 'September 2026', 'October 2026'].map((d) => (
              <button 
                key={d}
                type="button"
                className={`date-pill ${selectedDate === d ? 'active' : ''}`}
                onClick={() => { setSelectedDate(d === 'Anytime' ? '' : d); setActiveTab('who'); }}
              >
                <CalendarIcon size={16} />
                <span>{d}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'who' && (
        <div className="search-popover guests-popover">
          <div className="guest-row">
            <div className="guest-info">
              <span className="guest-type">Adults</span>
              <span className="guest-desc">Ages 13 or above</span>
            </div>
            <div className="guest-counter">
              <button 
                type="button"
                disabled={adults <= 1} 
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="counter-btn"
              >
                <Minus size={14} />
              </button>
              <span className="counter-value">{adults}</span>
              <button 
                type="button"
                onClick={() => setAdults(adults + 1)}
                className="counter-btn"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="guest-row">
            <div className="guest-info">
              <span className="guest-type">Children</span>
              <span className="guest-desc">Ages 2–12</span>
            </div>
            <div className="guest-counter">
              <button 
                type="button"
                disabled={children <= 0} 
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="counter-btn"
              >
                <Minus size={14} />
              </button>
              <span className="counter-value">{children}</span>
              <button 
                type="button"
                onClick={() => setChildren(children + 1)}
                className="counter-btn"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
