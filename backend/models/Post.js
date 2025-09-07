const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, required: true, trim: true, maxlength: 5000 },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
