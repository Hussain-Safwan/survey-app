const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const Survey = require('../models/survey')

router.post('/survey', async (req, res) => {
  console.log(req.body)
  res.json({
    status: true,
    msg: 'The survey has been uploaded.'
  })
})

module.exports = router;