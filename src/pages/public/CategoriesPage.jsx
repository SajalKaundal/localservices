import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

// Reusing landing page css for grid
import './LandingPage.css';
import './CategoriesPage.css';

const allCategories = [
  { id: 1, name: 'Home Cleaning', image: '/images/HouseCleaning.jpg', desc: 'Deep cleaning, regular cleaning' },
  { id: 2, name: 'Electrician', image: '/images/Electrician.jpg', desc: 'Wiring, repairs, installations' },
  { id: 3, name: 'Plumbing', image: '/images/Plumber.jpg', desc: 'Leaks, pipes, fixtures' },
  { id: 4, name: 'AC Repair', image: '/images/AcRepair.jpg', desc: 'Servicing, gas refill' },
  { id: 5, name: 'Carpentry', image: '/images/Carpanter.jpg', desc: 'Furniture, repairs' },
  { id: 6, name: 'Painting', image: '/images/Painter.jpg', desc: 'Interior, exterior' },
  { id: 7, name: 'Pest Control', image: '/images/PestControl.jpg', desc: 'Insects, rodents' },
  { id: 8, name: 'Appliance Repair', image: '/images/Appliance Repair.jpg', desc: 'Washing machines, TVs' },
];

const CategoriesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="categories-page">
      <div className="container" style={{paddingTop: '40px', paddingBottom: '80px'}}>
        <div className="categories-header">
          <h1 className="heading-1">All Services</h1>
          <p className="body-large body-muted">Find exactly what you need.</p>
          
          <div className="filters-bar">
            <Input placeholder="Search categories..." className="search-input-cat" />
            <Button variant="secondary">Popular</Button>
            <Button variant="secondary">Highest Rated</Button>
          </div>
        </div>

        <div className="categories-grid" style={{marginTop: '40px'}}>
          {allCategories.map(cat => (
            <Card key={cat.id} className="category-card detailed-cat-card" onClick={() => navigate(`/services/${cat.id}`)}>
              <div className="category-image-wrapper">
                <img src={cat.image} alt={cat.name} className="category-cover-img detailed-cover-img" />
              </div>
              <div className="category-content">
                <h3 className="heading-4">{cat.name}</h3>
                <p className="body-medium body-muted" style={{marginTop: '8px'}}>{cat.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
