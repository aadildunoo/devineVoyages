import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MainLayout } from './components/layout/MainLayout';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Tours = lazy(() => import('./pages/Tours').then(m => ({ default: m.Tours })));
const TourDetails = lazy(() => import('./pages/TourDetails').then(m => ({ default: m.TourDetails })));
const Destinations = lazy(() => import('./pages/Destinations').then(m => ({ default: m.Destinations })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const Gallery = lazy(() => import('./pages/Gallery').then(m => ({ default: m.Gallery })));

import { WishlistProvider } from './context/WishlistContext';

// Loading Fallback
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div className="spinner" style={{
      width: '40px', height: '40px', border: '4px solid var(--saffron-50)', 
      borderTopColor: 'var(--saffron)', borderRadius: '50%', animation: 'spin 1s linear infinite'
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <WishlistProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/tours/:slug" element={<TourDetails />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="*" element={<Home />} /> {/* Fallback to home */}
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </WishlistProvider>
    </HelmetProvider>
  );
}

export default App;
