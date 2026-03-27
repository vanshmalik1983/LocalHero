import express from 'express';
import Provider from '../models/Provider.js';

const router = express.Router();

// Get providers by category
router.get('/', async (req, res) => {
  const { category } = req.query;
  try {
    const providers = await Provider.find({ categories: category });
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;