const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const Response = require('../models/response')

router.get('/queries', async (req, res) => {
  let data = await fs.readFileSync(path.resolve('data', 'queries.json'), 'utf8')
  data = JSON.parse(data)

  res.json(data)
})

router.post('/user/survey', async (req, res) => {
  const data = new Response(req.body)
  console.log(data)
  await data.save()
  res.json({
    status: true,
    msg: 'Your response has been recorded. Thanks.'
  })
})

module.exports = router;