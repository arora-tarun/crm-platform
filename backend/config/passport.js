const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // adjust path if needed
const passport = require('passport');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://crm-platform-s759.onrender.com/auth/google/callback", // ✅ keep this as a string
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('✅ Google profile received:', profile);

        // Check if user exists
        let user = await User.findOne({ googleId: profile.id });

        // If not, create new user
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName || 'No Name',
            email: profile.emails?.[0]?.value || 'No Email',
            photo: profile.photos?.[0]?.value || '',
          });
        }

        return done(null, user);
      } catch (err) {
        console.error('❌ Error in GoogleStrategy:', err);
        return done(err, null);
      }
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
