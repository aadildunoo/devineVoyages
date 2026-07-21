import { useState } from 'react';
import { Map, List, X, Star } from 'lucide-react';
import type { Tour } from '@/lib/types';
import { Link } from 'react-router-dom';
import './MapToggle.css';

interface MapToggleProps {
  tours: Tour[];
}

export function MapToggle({ tours }: MapToggleProps) {
  const [showMap, setShowMap] = useState(false);
  const [selectedPinTour, setSelectedPinTour] = useState<Tour | null>(null);

  return (
    <>
      {/* FLOATING BUTTON AT BOTTOM CENTER */}
      <div className="floating-map-toggle-wrap">
        <button 
          type="button" 
          className="map-toggle-pill"
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? (
            <>
              <span>Show list</span>
              <List size={16} />
            </>
          ) : (
            <>
              <span>Show map</span>
              <Map size={16} />
            </>
          )}
        </button>
      </div>

      {/* MAP OVERLAY MODAL */}
      {showMap && (
        <div className="map-view-overlay">
          <div className="map-overlay-header">
            <h2 className="map-title font-semibold">Interactive Sacred Journeys Map</h2>
            <button 
              type="button" 
              className="map-close-btn"
              onClick={() => setShowMap(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div className="map-container-mock">
            {/* Simulated Interactive Map canvas with Pins */}
            <div className="map-canvas">
              <div className="map-watermark">
                🗺️ Interactive Yatra Map • {tours.length} Destinations
              </div>

              {tours.map((tour, idx) => {
                // Generate distributed positions for map pins
                const top = 20 + ((idx * 17) % 65);
                const left = 15 + ((idx * 23) % 70);

                return (
                  <div 
                    key={tour.id} 
                    className="map-price-pin"
                    style={{ top: `${top}%`, left: `${left}%` }}
                    onClick={() => setSelectedPinTour(tour)}
                  >
                    <span className="pin-price">{tour.price.currency}{Math.round(tour.price.discounted / 1000)}k</span>
                  </div>
                );
              })}

              {/* SELECTED TOUR PREVIEW CARD ON MAP */}
              {selectedPinTour && (
                <div className="map-selected-card">
                  <button 
                    type="button" 
                    className="card-close"
                    onClick={() => setSelectedPinTour(null)}
                  >
                    <X size={14} />
                  </button>

                  <img 
                    src={selectedPinTour.heroImage} 
                    alt={selectedPinTour.title} 
                    className="map-card-img" 
                  />
                  <div className="map-card-body">
                    <div className="map-card-rating">
                      <Star size={12} fill="#222" />
                      <span>{selectedPinTour.rating.toFixed(2)}</span>
                    </div>
                    <h4 className="map-card-title">{selectedPinTour.title}</h4>
                    <p className="map-card-sub">{selectedPinTour.destination}, {selectedPinTour.state}</p>
                    <div className="map-card-price">
                      <strong>{selectedPinTour.price.currency}{selectedPinTour.price.discounted.toLocaleString('en-IN')}</strong> / tour
                    </div>
                    <Link to={`/tours/${selectedPinTour.slug}`} className="map-card-link">
                      View details
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
