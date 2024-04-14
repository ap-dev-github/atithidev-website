const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviews = new Schema({
	id: {
    type: Number,
    required: true,
	},
	name: {
    type: String,
    required: true
  },
  host: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true
  },
  visit: {
    type: Boolean,
    required: true
  },
  visit_date: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
 amenities: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('reviews', reviews);
