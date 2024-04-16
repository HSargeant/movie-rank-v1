import { Schema, model } from 'mongoose'

const GoogleUserSchema = new Schema({
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

export default model('G-User', GoogleUserSchema)