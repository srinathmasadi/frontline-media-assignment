const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Company = require('../models/Company');
const connectDB = require('../config/db');
const sample = [
  { name: 'TechNova Solutions', industry: 'Software', location: 'Bengaluru', foundedYear: 2015, employeeCount: 120, website: 'https://technova.example' },
  { name: 'GreenField Agro', industry: 'Agriculture', location: 'Hyderabad', foundedYear: 2010, employeeCount: 45, website: 'https://greenfield.example' },
  { name: 'FinEdge Capital', industry: 'Fintech', location: 'Mumbai', foundedYear: 2018, employeeCount: 80, website: 'https://finedge.example' },
  { name: 'HealthBridge Labs', industry: 'Healthcare', location: 'Chennai', foundedYear: 2012, employeeCount: 200, website: 'https://healthbridge.example' },
  { name: 'EduSpark Academy', industry: 'Education', location: 'Pune', foundedYear: 2019, employeeCount: 30, website: 'https://eduspark.example' }
];
const seed = async () => {
  try {
    await connectDB();
    await Company.deleteMany({});
    await Company.insertMany(sample);
    console.log('Seed data inserted');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
seed();
