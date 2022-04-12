const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Profile = require('../models/Profile');

//get theme
//change theme

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const profile = await Profile.insert({
        ...req.body,
      });
      res.send(profile);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', authenticate, async (req, res, next) => {
    try {
      const profile = await Profile.findById(req.params.id);
      res.send(profile);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
