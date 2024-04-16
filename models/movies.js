import { Schema, model } from 'mongoose'

const MoviesSchema = new Schema({
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: "G-User"
  }
},{ timestamps: true })

export default model('Movies', MoviesSchema)