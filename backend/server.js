const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// ======= Connect to MongoDB =======
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// ======= Middleware =======
app.use(cors({
  origin: 'https://crm-frontend01-s759.onrender.com',
  credentials: true,
}));

app.use(express.json());

// ======= Session Setup =======
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
  }),
  cookie: {
    sameSite: 'none',
    secure: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

// ======= Passport Config =======
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// ======= Basic Status Route =======
app.get('/', (req, res) => {
  res.send('✅ CRM backend is live!');
});

// ======= Auth Routes =======
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.redirect('https://crm-frontend01-s759.onrender.com/dashboard');
  }
);

app.get('/auth/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

app.get('/auth/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) return next(err);
    res.clearCookie('connect.sid');
    res.redirect('https://crm-frontend01-s759.onrender.com');
  });
});

app.get('/auth/failure', (req, res) => {
  res.status(401).json({ message: 'Authentication failed' });
});

// ======= Protected API Routes =======
const { ensureAuthenticated } = require('./middleware/authMiddleware');
app.use('/api/customers', ensureAuthenticated, require('./routes/customers'));
app.use('/api/campaigns', ensureAuthenticated, require('./routes/campaigns'));
app.use('/api/logs', ensureAuthenticated, require('./routes/logs'));
app.use('/api/dashboard', ensureAuthenticated, require('./routes/dashboardRoutes'));

// ======= Start Server =======
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
