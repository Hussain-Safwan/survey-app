const mongoose = require('mongoose')

const Conversations = mongoose.Schema({
  name: String,
  image: String,
  hour: String,
  active: Boolean,
  messages: [
    {
      sender: String,
      msg: String
    }
  ]
})

module.exports = mongoose.model('conversations', Conversations)