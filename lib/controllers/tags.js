const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Tag = require('../models/Tag');

module.exports = Router();
