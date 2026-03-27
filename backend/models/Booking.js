import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
  service: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'completed'], default: 'pending' },
  dateTime: { type: Date, required: true },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);