const { Router } = require('express');
// const authenticate = require('../middleware/authenticate');
const Profile = require('../models/Profile');

//add theme
//get theme
//change theme

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const profile = await Profile.insert({
      ...req.body,
    });
    res.send(profile);
  } catch (error) {
    next(error);
  }
});
