const mongoose = require('mongoose')

const response = mongoose.Schema({
  user_id: {
    type: String,
    required: [true]
  },
  answers: [],
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('response', response)