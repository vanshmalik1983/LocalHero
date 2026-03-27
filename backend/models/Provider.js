import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  categories: [String],         // Example: ["Electricity","Plumbing"]
  services: [String],           // Example: ["AC Repair","Fan Repair"]
  pricing: { type: Map, of: Number }, // {"AC Repair": 500, "Fan Repair": 200}
  rating: { type: Number, default: 0 },
  availability: { type: Boolean, default: true },
  location: { lat: Number, lng: Number }
});

export default mongoose.model('Provider', providerSchema);