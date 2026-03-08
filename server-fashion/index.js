const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const fashionRoutes = require('./routes/fashionRoutes');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors({
  origin: ['http://localhost:4001', 'http://localhost:4002'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// MongoDB Connection
const MONGODB_URI = 'mongodb://localhost:27017/FashionData';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB - FashionData database');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api', fashionRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Fashion Management API',
    version: '1.0.0',
    endpoints: {
      getAllFashions: 'GET /api/fashions',
      getFashionsByStyle: 'GET /api/fashions/style/:style',
      getFashionById: 'GET /api/fashions/:id',
      createFashion: 'POST /api/fashions',
      updateFashion: 'PUT /api/fashions/:id',
      deleteFashion: 'DELETE /api/fashions/:id'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 API Documentation: http://localhost:${PORT}`);
});
