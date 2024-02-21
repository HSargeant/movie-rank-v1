const mongoose = require('mongoose')

const GoogleUserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  likedMovies: {
    type: Map,
    of: Boolean
  },
  addedMovies: {
    type:Map,
    of: Boolean
  },
}, { timestamps: true })

module.exports = mongoose.model('G-User', GoogleUserSchema)