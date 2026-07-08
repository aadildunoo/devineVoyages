import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Calendar,
  Utensils,
  Building2,
  Bus,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DifficultyBadge } from "@/components/ui/Badge";
import { TourCard } from "@/components/tours/TourCard";
import { SEOHead } from "@/components/seo/SEOHead";
import { InquiryModal } from "@/components/conversion/InquiryModal";
import { getTourBySlug, tours } from "@/data/tours";
import { SITE_CONFIG } from "@/lib/constants";
import "./TourDetails.css";

export function TourDetails() {
  const { slug } = useParams<{ slug: string }>();
  const tour = getTourBySlug(slug || "");
  const [activeTab, setActiveTab] = useState<
    "overview" | "itinerary" | "inclusions" | "dates"
  >("overview");
  const [openDay, setOpenDay] = useState<number | null>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!tour) {
    return (
      <div className="tour-not-found container section">
        <h2>Tour Not Found</h2>
        <p>The tour you're looking for doesn't exist.</p>
        <Link to="/tours">
          <Button variant="primary">
            Browse All Tours
          </Button>
        </Link>
      </div>
    );
  }
  const relatedTours = tours
    .filter(
      (t) =>
        t.category === tour.category && t.id !== tour.id,
    )
    .slice(0, 3);

  const tourSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description,
    touristType: "Pilgrimage",
    provider: {
      "@type": "TravelAgency",
      name: SITE_CONFIG.name,
      telephone: SITE_CONFIG.phone,
    },
    offers: {
      "@type": "Offer",
      price: tour.price.discounted,
      priceCurrency: "INR",
    },
  };

  return (
    <>
      <SEOHead
        title={tour.title}
        description={tour.shortDescription}
        canonical={`/tours/${tour.slug}`}
        schema={tourSchema}
      />

      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/tours">Tours</Link>
          <span>/</span>
          <span className="breadcrumb-current">
            {tour.title}
          </span>
        </div>
      </nav>

      {/* Tour Hero */}
      <section className="td-hero">
        {tour.heroImage ? (
          <img 
            src={tour.heroImage} 
            alt={tour.title} 
            className="td-hero-bg"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        ) : (
          <div
            className="td-hero-bg"
            style={{
              background: `linear-gradient(135deg, ${getCategoryGradient(tour.category)})`,
            }}>
            <div className="td-hero-icon">🕉️</div>
          </div>
        )}
        <div className="td-hero-overlay" />
        <div className="td-hero-content container">
          <div className="td-hero-badges">
            <DifficultyBadge difficulty={tour.difficulty} />
            <span className="td-hero-category">
              {tour.category}
            </span>
          </div>
          <h1>{tour.title}</h1>
          <p className="td-hero-subtitle">
            {tour.subtitle}
          </p>
          <div className="td-hero-meta">
            <span>
              <MapPin size={16} /> {tour.destination},{" "}
              {tour.state}
            </span>
            <span>
              <Clock size={16} /> {tour.duration.days} Days
              / {tour.duration.nights} Nights
            </span>
            <span>
              <Users size={16} /> {tour.groupSize.min}-
              {tour.groupSize.max} people
            </span>
            <span>
              <Star size={16} fill="currentColor" />{" "}
              {tour.rating} ({tour.reviewCount} reviews)
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="td-main container section">
        <div className="td-layout">
          {/* Left Content */}
          <div className="td-content">
            {/* Tabs */}
            <div className="td-tabs" role="tablist">
              {(
                [
                  "overview",
                  "itinerary",
                  "inclusions",
                  "dates",
                ] as const
              ).map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`td-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}>
                  {tab.charAt(0).toUpperCase() +
                    tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="td-panel">
                <h2>About This Tour</h2>
                <p className="td-description">
                  {tour.description}
                </p>

                <h3>Tour Highlights</h3>
                <ul className="td-highlights">
                  {tour.highlights.map((h, i) => (
                    <li key={i}>
                      <Check size={16} /> {h}
                    </li>
                  ))}
                </ul>

                <div className="td-info-cards">
                  <div className="td-info-card">
                    <Building2 size={20} />
                    <div>
                      <strong>Accommodation</strong>
                      <p>{tour.accommodation}</p>
                    </div>
                  </div>
                  <div className="td-info-card">
                    <Bus size={20} />
                    <div>
                      <strong>Transport</strong>
                      <p>{tour.transport}</p>
                    </div>
                  </div>
                  <div className="td-info-card">
                    <Utensils size={20} />
                    <div>
                      <strong>Meals</strong>
                      <p>{tour.meals}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "itinerary" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="td-panel">
                <h2>Day-wise Itinerary</h2>
                <div className="td-itinerary">
                  {tour.itinerary.map((day) => (
                    <div
                      key={day.day}
                      className={`td-day ${openDay === day.day ? "open" : ""}`}>
                      <button
                        className="td-day-header"
                        onClick={() =>
                          setOpenDay(
                            openDay === day.day
                              ? null
                              : day.day,
                          )
                        }>
                        <div className="td-day-number">
                          Day {day.day}
                        </div>
                        <div className="td-day-title">
                          {day.title}
                        </div>
                        {openDay === day.day ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>
                      {openDay === day.day && (
                        <div className="td-day-content">
                          <p>{day.description}</p>
                          {day.meals.length > 0 && (
                            <div className="td-day-meals">
                              <Utensils size={14} />{" "}
                              {day.meals.join(" • ")}
                            </div>
                          )}
                          {day.accommodation && (
                            <div className="td-day-stay">
                              <Building2 size={14} />{" "}
                              {day.accommodation}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "inclusions" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="td-panel">
                <div className="td-inclusions-grid">
                  <div>
                    <h3 className="td-inc-title td-inc-included">
                      ✅ What's Included
                    </h3>
                    <ul className="td-inc-list">
                      {tour.inclusions.map((item, i) => (
                        <li key={i}>
                          <Check
                            size={16}
                            className="td-inc-check"
                          />{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="td-inc-title td-inc-excluded">
                      ❌ What's Not Included
                    </h3>
                    <ul className="td-inc-list">
                      {tour.exclusions.map((item, i) => (
                        <li key={i}>
                          <X
                            size={16}
                            className="td-inc-cross"
                          />{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "dates" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="td-panel">
                <h2>Available Dates</h2>
                <div className="td-dates">
                  {tour.availableDates.map((date, i) => (
                    <div
                      key={i}
                      className={`td-date-card ${date.status === "Sold Out" ? "sold-out" : ""}`}>
                      <div className="td-date-info">
                        <Calendar size={16} />
                        <span>
                          {new Date(
                            date.startDate,
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          —{" "}
                          {new Date(
                            date.endDate,
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="td-date-spots">
                        <span
                          className={`td-date-status status-${date.status.toLowerCase().replace(" ", "-")}`}>
                          {date.status}
                        </span>
                        {date.status !== "Sold Out" && (
                          <span className="td-date-left">
                            {date.spotsLeft} spots left
                          </span>
                        )}
                      </div>
                      <Button
                        variant={
                          date.status === "Sold Out"
                            ? "ghost"
                            : "primary"
                        }
                        size="sm"
                        disabled={
                          date.status === "Sold Out"
                        }>
                        {date.status === "Sold Out"
                          ? "Sold Out"
                          : "Book Now"}
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="td-sidebar">
            <div className="td-price-card">
              <div className="td-price-details">
                <div className="td-price-detail">
                  <Clock size={16} /> {tour.duration.days}{" "}
                  Days / {tour.duration.nights} Nights
                </div>
                <div className="td-price-detail">
                  <Users size={16} /> Group size:{" "}
                  {tour.groupSize.min}-{tour.groupSize.max}
                </div>
                <div className="td-price-detail">
                  <Utensils size={16} /> {tour.meals}
                </div>
              </div>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setIsModalOpen(true)}>
                Enquire Now
              </Button>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="td-price-call">
                <Phone size={16} /> Call:{" "}
                {SITE_CONFIG.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Tours */}
      {relatedTours.length > 0 && (
        <section
          className="section"
          style={{ background: "var(--cream)" }}>
          <div className="container">
            <h2 className="section-title">Similar Tours</h2>
            <p className="section-subtitle">
              Other {tour.category} tours you might love
            </p>
            <div className="tours-grid">
              {relatedTours.map((t) => (
                <TourCard key={t.id} tour={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile Sticky Booking Bar */}
      <div className="td-mobile-sticky">
        <Button
          variant="primary"
          style={{ flex: 1 }}
          onClick={() => setIsModalOpen(true)}>
          Enquire Now
        </Button>
      </div>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tourName={tour.title}
      />
    </>
  );
}

function getCategoryGradient(category: string): string {
  const gradients: Record<string, string> = {
    "Char Dham": "#FF6B2B 0%, #FF8A50 50%, #FFD700 100%",
    Jyotirlinga: "#5B1A2A 0%, #7A2E3F 50%, #D4A853 100%",
    "Temple Tour": "#E55A1B 0%, #FF6B2B 50%, #FFD93D 100%",
    "River Pilgrimage":
      "#0EA5E9 0%, #38BDF8 50%, #7DD3FC 100%",
    "Mountain Pilgrimage":
      "#475569 0%, #64748B 50%, #94A3B8 100%",
    "Festival Special":
      "#D946EF 0%, #F0ABFC 50%, #FDE047 100%",
    "South India": "#059669 0%, #10B981 50%, #34D399 100%",
    "Buddhist Circuit":
      "#F59E0B 0%, #FBBF24 50%, #FDE68A 100%",
  };
  return gradients[category] || "#FF6B2B 0%, #FF8A50 100%";
}
