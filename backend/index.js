
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./passport'); // Your Google strategy setup
const cors = require('cors');
const { ensureAuthenticated } = require('./middleware/auth');
require('dotenv').config();

const app = express();

// ====== Middleware ======
app.use(cors({
  origin: 'http://localhost:3000', // adjust to your frontend URL
  credentials: true
}));
app.use(express.json());

// ====== Session Config ======
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_default_secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// ====== MongoDB Connection ======
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// ====== Auth Routes ======
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000/dashboard'); // Frontend dashboard
  }
);

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// ====== Protected API Routes ======
app.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.json({
    message: `Welcome ${req.user.displayName}`,
    user: req.user
  });
});

// Load Routes
app.use('/api/customers', ensureAuthenticated, require('./routes/customers'));
app.use('/api/campaigns', ensureAuthenticated, require('./routes/campaigns'));
app.use('/api/logs', ensureAuthenticated, require('./routes/logs'));

// ====== Server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
