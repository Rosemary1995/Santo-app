const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  teaserUrl: String,
  bookUrl: String,
  coverImage: String,
  description: String,
  bookingCost: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

