const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const Survey = require('../models/survey')
const Response = require('../models/response')

router.post('/survey', async (req, res) => {
  try {
    console.log(req.body)
    const { data } = req.body
    const obj = new Survey(data)
    await obj.save()
    
    res.json({
      status: true,
      msg: 'The survey has been uploaded.'
    })
  } catch (e) {
    console.log(e)
    res.json({
      status: false,
      msg: 'Internal server error. Please check and make a resubmission'
    })
  }
})

router.get('/response/:id', async (req, res) => {
  const { id } = req.params
  let response = await Response.find({ survey_id: id })
  const survey = await Survey.findOne({ _id: id })
  
  res.json({
    status: true,
    response,
    survey
  })
})

module.exports = router;