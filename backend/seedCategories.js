import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';

dotenv.config();

const categories = [
  { name: 'Electricity', subcategories: ['Electrician', 'AC Repair', 'Wiring'] },
  { name: 'Plumbing', subcategories: ['Pipe Fix', 'Leak Repair'] },
  { name: 'Cleaning', subcategories: ['Home Cleaning', 'Office Cleaning'] },
  { name: 'Food', subcategories: ['Tiffin', 'Catering'] },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected');
    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log('Categories seeded');
    process.exit();
  })
  .catch(err => console.error(err));