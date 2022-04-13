const { Router } = require('express');
// const authenticate = require('../middleware/authenticate');
const Tag = require('../models/Tag');

module.exports = Router()
  .get('/', async (req, res) => {
    const tag = await Tag.getAllTags();
    res.send(tag);
  })
  .get('/:id', async (req, res) => {
    const tag = await Tag.getTagById(req.params.id);
    res.send(tag);
  })
  .get('/:id/images', async (req, res) => {
    const tag = await Tag.getTagById(req.params.id);
    const images = await tag.getImagesByTag();
    res.send(images);
  });
