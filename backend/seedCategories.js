import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';

dotenv.config();
mongoose.connect(process.env.DB_URI);

const categories = [
  { name: "Electricity", subcategories: ["Electrician", "AC Repair", "Wiring"] },
  { name: "Water & Plumbing", subcategories: ["Plumber", "Leak Fix"] },
  { name: "Carpentry", subcategories: ["Furniture", "Woodwork"] },
  { name: "Cleaning & Home Care", subcategories: ["Home Cleaning", "Laundry"] },
];

const seed = async () => {
  await Category.deleteMany({});
  await Category.insertMany(categories);
  console.log('Categories seeded!');
  mongoose.disconnect();
};

seed();