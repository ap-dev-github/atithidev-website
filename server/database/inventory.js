const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rooms = new Schema({
host_id: {
    type: Number,
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

module.exports = mongoose.model('rooms', rooms);
