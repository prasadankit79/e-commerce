const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  inStock: Boolean,
  images: [String],
});

module.exports = mongoose.model('Product', productSchema);
