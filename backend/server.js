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

// ======= Enhanced CORS Setup =======
const allowedOrigins = [
  'https://crm-frontend01.onrender.com',
  'https://crm-frontend.onrender.com' // Add other frontend URLs as needed
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());

// Add Vary header for proper caching
app.use((req, res, next) => {
  res.header('Vary', 'Origin');
  next();
});

app.use(express.json());

// ======= Debug Middleware =======
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('🔍 Origin:', req.get('origin'));
  console.log('🔍 Cookies:', req.headers.cookie);
  next();
});

// ======= Secure Session Setup =======
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60 // 1 day
  }),
  cookie: {
    sameSite: 'none',
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    domain: '.onrender.com' // Allow subdomains to access the cookie
  },
  name: 'crm.sid' // Custom session cookie name
}));

// ======= Passport Config =======
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// ======= Routes =======
app.get('/', (req, res) => {
  res.send('✅ CRM backend is live!');
});

app.get('/test-session', (req, res) => {
  res.json({
    sessionExists: !!req.session,
    sessionId: req.sessionID,
    authenticated: req.isAuthenticated()
  });
});

// ======= Auth Routes =======
app.get('/auth/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  prompt: 'select_account' // Forces account selection
}));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    console.log('✅ Google OAuth success, user:', req.user);
    res.redirect('https://crm-frontend01.onrender.com/dashboard');
  }
);

app.get('/auth/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ 
      user: req.user,
      session: req.sessionID
    });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

app.get('/auth/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.clearCookie('crm.sid', { 
      path: '/',
      domain: '.onrender.com',
      secure: true,
      sameSite: 'none'
    });
    res.redirect('https://crm-frontend01.onrender.com');
  });
});

app.get('/auth/failure', (req, res) => {
  res.status(401).json({ 
    message: 'Authentication failed',
    error: req.query.error 
  });
});

// ======= Protected Routes =======
const { ensureAuthenticated } = require('./middlewares/authMiddleware');
app.use('/api/customers', ensureAuthenticated, require('./routes/customers'));
app.use('/api/campaigns', ensureAuthenticated, require('./routes/campaigns'));
app.use('/api/logs', ensureAuthenticated, require('./routes/logs'));
app.use('/api/dashboard', ensureAuthenticated, require('./routes/dashboardRoutes'));

// ======= Error Handling =======
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ======= Start Server =======
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🛡️  CORS allowed for: ${allowedOrigins.join(', ')}`);
});
