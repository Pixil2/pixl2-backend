const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Image = require('../models/Image');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const image = await Image.insert(req.body);
      res.send(image);
    } catch (error) {
      next(error);
    }
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
    try {
      let image = await Image.deleteTagRef(req.params.id);
      image = await Image.deleteById(req.params.id);
      res.send(image);
    } catch (error) {
      next(error);
    }
  });
