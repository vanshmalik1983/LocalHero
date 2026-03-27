import express from 'express';
import Provider from '../models/Provider.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register / update provider profile
router.post('/', protect, async (req, res) => {
  const { categories, services, pricing, location } = req.body;
  try {
    let provider = await Provider.findOne({ userId: req.user._id });
    if (provider) {
      // Update existing
      provider.categories = categories;
      provider.services = services;
      provider.pricing = pricing;
      provider.location = location;
    } else {
      // Create new
      provider = new Provider({
        userId: req.user._id,
        categories,
        services,
        pricing,
        location
      });
    }
    await provider.save();
    res.json(provider);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get providers by location & category
router.get('/', async (req, res) => {
  const { lat, lng, category, radius = 5 } = req.query;
  try {
    const providers = await Provider.find({ categories: category });

    // Filter within radius (approximate Haversine)
    const filtered = providers.filter(p => {
      const distance = getDistanceFromLatLonInKm(lat, lng, p.location.lat, p.location.lng);
      return distance <= radius;
    });

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Haversine formula
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
}
function deg2rad(deg) { return deg * (Math.PI/180); }

export default router;