import { useState } from 'react';
import api from '../services/api';
import useStore from '../store/store';

export default function ProviderRegister() {
  const { user } = useStore();
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [pricing, setPricing] = useState({});
  const [location, setLocation] = useState({ lat: 28.6139, lng: 77.2090 });

  const handleSubmit = async () => {
    try {
      const res = await api.post('/providers', { categories, services, pricing, location });
      alert('Provider registered!');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Provider Registration</h2>
      {/* Add input fields for categories, services, pricing, location */}
      <button onClick={handleSubmit} className="bg-green-500 text-white p-2 mt-2">Register</button>
    </div>
  );
}