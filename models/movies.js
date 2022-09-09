const mongoose = require('mongoose')

const MoviesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
},{ collection: 'movie-names' })

module.exports = mongoose.model('Movies', MoviesSchema)