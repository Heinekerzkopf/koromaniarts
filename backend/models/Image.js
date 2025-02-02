const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true } // Путь к изображению
});

module.exports = mongoose.model('Image', ImageSchema);
