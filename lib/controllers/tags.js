const { Router } = require('express');
// const authenticate = require('../middleware/authenticate');
const Tag = require('../models/Tag');

module.exports = Router().get('/', async (req, res) => {
  const tag = await Tag.getAllTags();
  res.send(tag);
});
