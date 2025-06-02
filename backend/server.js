const dashboardRoutes = require('./routes/dashboardRoutes');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./config/passport');

const customerRoutes = require('./routes/customers');
const campaignRoutes = require('./routes/campaigns');
const logRoutes = require('./routes/logs');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow frontend origin and allow credentials
app.use(cors({
  origin: 'https://crm-frontend-s759.onrender.com',   // React frontend URL
  credentials: true,                 // Allow cookies to be sent cross-origin
}));

app.use(express.json());

// Session setup (must be before passport middleware)
app.use(session({
  secret: 'your_secret_key', // Change this to a strong secret in production!
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,  // Set true if using HTTPS in production
    maxAge: 24 * 60 * 60 * 1000, // 1 day session duration
  }
}));
//middelwares 
app.use('/api/dashboard', dashboardRoutes);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/logs', logRoutes);
app.use('/auth', authRoutes);

// Connect to MongoDB and start server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Atlas connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

startServer();
