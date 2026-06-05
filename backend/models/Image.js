const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrls: [{ type: String, required: true }],
  availability: {
    type: String,
    enum: ['AVAILABLE', 'NOT_AVAILABLE'],
    required: true,
    default: 'AVAILABLE',
    index: true,
  },
  year: {
    type: Number,
    required: true,
    default: 2024,
  }
});

module.exports = mongoose.model('Image', ImageSchema);