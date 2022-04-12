const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Image = require('../models/Image');

module.exports = Router().post('/', authenticate, async (req, res, next) => {
  try {
    const image = await Image.insert(req.body);
    res.send(image);
  } catch (error) {
    next(error);
  }
});
