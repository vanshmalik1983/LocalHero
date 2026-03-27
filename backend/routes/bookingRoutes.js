import express from 'express';
import Booking from '../models/Booking.js';
import { io } from '../server.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    // Emit notification via Socket.io
    io.emit('new-booking', booking);

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;