import { useEffect, useState } from 'react';
import api from '../services/api';
import MapView from '../components/MapView';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Electricity');

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await api.get('/categories');
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {categories.map(c => (
          <div 
            key={c._id} 
            className={`border p-4 rounded shadow hover:shadow-lg cursor-pointer ${selectedCategory === c.name ? 'bg-blue-100' : ''}`}
            onClick={() => setSelectedCategory(c.name)}
          >
            <h2 className="font-bold">{c.name}</h2>
            <p className="text-sm">{c.subcategories.join(', ')}</p>
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-bold mb-4">Providers Map</h1>
      <MapView category={selectedCategory} />
    </div>
  );
}