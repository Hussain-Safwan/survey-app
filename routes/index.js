const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const Response = require('../models/response')
const Survey = require('../models/survey');
const Conversations = require('../models/conversations');
const axios = require('axios')

router.get('/surveys', async (req, res) => {
  let data = await Survey.find()
  res.json(data)
})

router.get('/queries', async (req, res) => {
  let data = await Survey.find()
  data = data[data.length-1]
  res.json(data)
})

router.post('/survey', async (req, res) => {
  const data = new Response(req.body)
  await data.save()
  res.json({
    status: true,
    msg: 'Your response has been recorded. Thanks.'
  })
})

router.get('/conversations', async (req, res) => {
  const data = await Conversations.find()
  res.json({
    status: true,
    data
  })

router.get('/conversation/new', async (req, resp) => {
  axios.get('https://randomuser.me/api/').then(async res => {
    const user = {
      name: res.data.results[0].name.first + ' ' + res.data.results[0].name.last,
      image: res.data.results[0].picture.medium, 
      hour: res.data.results[0].name.first.length,
      messages: []
    }

    const conv = new Conversations(user)
    await conv.save()
    resp.json({
      status: true,
      data: user
    })
  })
})

router.post('/conversations/update', async (req, res) => {
  const { user_id, name, image, hour, active } = req.body
  await Conversations.findOneAndUpdate({ _id: user_id }, {$set: {
    name: name,
    image: image,
    hour: hour,
    active: active
  }})

  res.json({
    status: true
  })
})

router.post('/conversations/new-msg', async (req, res) => {
  const { user_id, sender, msg } = req.body
  await Conversations.findOneAndUpdate({_id: user_id}, {$push: {messages: {sender, msg}}})
  res.json({
    status: true
  })
})

router.get('/delete/:id', async (req, res) => {
  console.log(req.params.id)
  await Conversations.findOneAndDelete({ _id: req.params.id })
  res.json({
    status: true
  })
})

})

module.exports = router;