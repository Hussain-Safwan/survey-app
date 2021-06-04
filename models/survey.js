const mongoose = require('mongoose')

const survey = mongoose.Schema({
  title: {
    type: String,
    required: [true]
  },
  questions: [
    {
      question: {
        type: String, 
        required: [true]
      },
      type: {
        type: String,
        required: [true]
      },
      options: [], 
      jumps: []
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('survey', survey)