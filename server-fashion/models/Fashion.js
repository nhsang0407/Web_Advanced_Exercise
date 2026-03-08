const mongoose = require('mongoose');

const fashionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  details: {
    type: String,
    required: [true, 'Details are required']
  },
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail URL is required']
  },
  style: {
    type: String,
    required: [true, 'Style is required'],
    enum: ['Casual', 'Streetwear', 'Formal'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add index for better query performance
fashionSchema.index({ style: 1, createdAt: -1 });

const Fashion = mongoose.model('Fashion', fashionSchema);

module.exports = Fashion;
