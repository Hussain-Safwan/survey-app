const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const Response = require('../models/response')
const Survey = require('../models/survey')

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
  console.log(data)
  await data.save()
  res.json({
    status: true,
    msg: 'Your response has been recorded. Thanks.'
  })
})

module.exports = router;