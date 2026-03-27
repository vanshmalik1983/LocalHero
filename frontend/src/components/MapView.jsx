import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import api from '../services/api';

export default function MapView({ category }) {
  const [providers, setProviders] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: 28.6139, lng: 77.2090 }); // default Delhi

  useEffect(() => {
    // Detect user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }

    // Fetch providers for selected category
    const fetchProviders = async () => {
      const res = await api.get(`/providers?lat=${userLocation.lat}&lng=${userLocation.lng}&category=${category || 'Electricity'}`);
      setProviders(res.data);
    };

    fetchProviders();
  }, [category, userLocation.lat, userLocation.lng]);

  return (
    <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {providers.map(p => (
        <Marker key={p._id} position={[p.location.lat, p.location.lng]}>
          <Popup>
            <h2>{p.services.join(', ')}</h2>
            <p>Rating: {p.rating}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}