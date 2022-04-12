const { Router } = require('express');
const jwt = require('jsonwebtoken');
// const authenticate = require('../middleware/authenticate');
// const GithubUser = require('../models/GithubUser');
// const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router().get('/login', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
  );
});