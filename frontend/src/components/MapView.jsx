import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import api from '../services/api';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const providerIcon = new L.Icon({
  iconUrl: '/marker.png', // replace with your marker image
  iconSize: [35, 45],
  iconAnchor: [17, 45],
  popupAnchor: [0, -40]
});

export default function MapView({ category }) {
  const [providers, setProviders] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: 28.6139, lng: 77.2090 }); // default Delhi

  // Detect user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  // Fetch providers whenever category or location changes
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await api.get(`/providers?lat=${userLocation.lat}&lng=${userLocation.lng}&category=${category || 'Electricity'}`);
      setProviders(res.data);
    };
    fetchProviders();
  }, [category, userLocation]);

  return (
    <div className="relative w-full h-full rounded-xl shadow-lg overflow-hidden">
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location Marker */}
        <CircleMarker
          center={[userLocation.lat, userLocation.lng]}
          radius={12}
          pathOptions={{ color: '#007bff', fillColor: '#007bff', fillOpacity: 0.7 }}
        >
          <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
            You are here
          </Tooltip>
        </CircleMarker>

        {/* Providers */}
        {providers.map(p => (
          <Marker key={p._id} position={[p.location.lat, p.location.lng]} icon={providerIcon}>
            <Popup>
              <div className="w-60 p-2">
                <h2 className="font-bold text-md">{p.name}</h2>
                <p className="text-sm text-gray-700">{p.services.join(', ')}</p>
                <p className="text-yellow-600 font-semibold">Rating: {p.rating || 'N/A'}</p>
                <motion.button
                  className="mt-2 w-full bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700 transition"
                  whileHover={{ scale: 1.05 }}
                >
                  Book Now
                </motion.button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Overlay line / branding */}
      <div className="absolute top-4 left-4 text-white font-bold text-lg bg-black/40 p-2 rounded">
        LocalHero – Call for Problems
      </div>
    </div>
  );
}