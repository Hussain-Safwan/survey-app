const mongoose = require('mongoose')

const survey = mongoose.Schema({
  name: {
    type: String,
    required: [true]
  },
  questions: [
    {
      question: {
        type: String
      },
      type: {
        type: String
      },
      options: []
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('survey', survey)