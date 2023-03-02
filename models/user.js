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
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  likedMovies:{
    type: Object
  },
  addedMovies:{
    type: Object
  }
},{ timestamps: true })

module.exports = mongoose.model('G-User', GoogleUserSchema)