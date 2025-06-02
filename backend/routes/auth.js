const express = require('express');
const passport = require('passport');
const router = express.Router();

// Load environment variable for frontend URL
const FRONTEND_URL = process.env.CLIENT_REDIRECT_URL || 'http://localhost:3000';

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    // Redirect to frontend dashboard after successful login
    res.redirect(`${FRONTEND_URL}/dashboard`);
  }
);

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    // Redirect to frontend homepage after logout
    res.redirect(`${FRONTEND_URL}/`);
  });
});

router.get('/failure', (req, res) => {
  res.status(401).json({ message: 'Authentication failed' });
});

module.exports = router;
