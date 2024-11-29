require('dotenv').config();
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/auth');
const protectedRoutes = require('./src/routes/protected');

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',                   
    'https://vrv123.netlify.app', 
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});