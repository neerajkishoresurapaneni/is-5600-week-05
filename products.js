// products.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  description: { type: String, required: true },
  alt_description: String,
  likes: Number,
  urls: {
    regular: { type: String, required: true },
    small: String,
    thumb: String
  },
  links: {
    self: String,
    html: String
  },
  user: {
    id: String,
    first_name: String,
    last_name: String,
    portfolio_url: String,
    username: String
  },
  tags: [
    {
      title: String
    }
  ]
});

module.exports = mongoose.model("Product", productSchema);
