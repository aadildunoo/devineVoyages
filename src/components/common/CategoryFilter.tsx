import { 
  Sparkles, 
  Mountain, 
  Sun, 
  Landmark, 
  Compass, 
  Waves, 
  MountainSnow, 
  Feather, 
  SlidersHorizontal,
  Globe
} from 'lucide-react';
import './CategoryFilter.css';

export interface CategoryItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'All', label: 'All Stays & Tours', icon: <Globe size={22} /> },
  { id: 'Char Dham', label: 'Char Dham Yatra', icon: <MountainSnow size={22} /> },
  { id: 'Jyotirlinga', label: '12 Jyotirlingas', icon: <Sun size={22} /> },
  { id: 'Temple Tour', label: 'Sacred Temples', icon: <Landmark size={22} /> },
  { id: 'South India', label: 'South India Trails', icon: <Compass size={22} /> },
  { id: 'River Pilgrimage', label: 'Ganga Ghats & Rivers', icon: <Waves size={22} /> },
  { id: 'Mountain Pilgrimage', label: 'Himalayan Retreats', icon: <Mountain size={22} /> },
  { id: 'Buddhist Circuit', label: 'Buddhist Circuit', icon: <Feather size={22} /> },
  { id: 'Spiritual Stays', label: 'Ashrams & Stays', icon: <Sparkles size={22} /> },
];

interface CategoryFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenFilterModal?: () => void;
}

export function CategoryFilter({ activeCategory, onSelectCategory, onOpenFilterModal }: CategoryFilterProps) {
  return (
    <div className="category-filter-wrapper">
      <div className="container category-container">
        <div className="category-scroll-container">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`category-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <div className="cat-icon-wrap">{cat.icon}</div>
                <span className="cat-label">{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="filter-modal-trigger-wrap">
          <button 
            type="button" 
            className="filter-btn-pill"
            onClick={onOpenFilterModal}
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
