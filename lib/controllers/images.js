const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Image = require('../models/Image');
const Tag = require('../models/Tag');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const image = await Image.insert(req.body);
      res.send(image);
    } catch (error) {
      next(error);
    }
  })
  .get('/count', async (req, res) => {
    const count = await Image.getCount();
    res.send(count);
  })
  .get('/user/:userId', authenticate, async (req, res, next) => {
    try {
      const image = await Image.getUserImages(req.params.userId);
      res.send(image);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', authenticate, async (req, res, next) => {
    try {
      const image = await Image.findById(req.params.id);
      res.send(image);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', authenticate, async (req, res, next) => {
    try {
      const image = await Image.updateById(req.params.id, req.body);
      res.send(image);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', authenticate, async (req, res, next) => {
    const { id } = req.params;
    // console.log('THIS IS THE THING YOU ARE LOOKING FOR!!!!!!!!!!!!!!!!', id);
    try {
      let image = await Image.deleteTagRef(id);
      image = await Image.deleteById(id);
      res.send(image);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id/tags', async (req, res, next) => {
    try {
      const image = await Image.findById(req.params.id);
      const tag = await image.findTagByImage();
      res.send(tag);
    } catch (error) {
      next(error);
    }
  })
  .post('/:id/tags/:tag_id', async (req, res) => {
    const image = await Image.findById(req.params.id);
    const tag = await Tag.getTagById(req.params.tag_id);

    const imageTag = await Image.addTag(image.id, tag.id);
    res.send(imageTag);
  });
