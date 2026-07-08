import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (tourId: string) => void;
  isInWishlist: (tourId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('divineVoyages_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('divineVoyages_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (tourId: string) => {
    setWishlist(prev => 
      prev.includes(tourId) 
        ? prev.filter(id => id !== tourId)
        : [...prev, tourId]
    );
  };

  const isInWishlist = (tourId: string) => wishlist.includes(tourId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
