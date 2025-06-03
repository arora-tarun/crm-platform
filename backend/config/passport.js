const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Adjust the path if needed

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://crm-platform-s759.onrender.com/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('✅ Google profile received:', {
          id: profile.id,
          displayName: profile.displayName,
          email: profile.emails?.[0]?.value,
        });

        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName || 'No Name',
            email: profile.emails?.[0]?.value || 'No Email',
            photo: profile.photos?.[0]?.value || '',
          });
          console.log('🆕 New user created:', user.email);
        } else {
          console.log('✅ Existing user found:', user.email);
        }

        return done(null, user);
      } catch (err) {
        console.error('❌ Error in GoogleStrategy:', err);
        return done(err, null);
      }
    }
  )
);

// Serialize user ID into the session
passport.serializeUser((user, done) => {
  console.log('🔐 Serializing user:', user.id);
  done(null, user.id);
});

// Deserialize user by ID from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (user) {
      console.log('🔓 Deserialized user:', user.email);
    } else {
      console.warn('⚠️ Deserialization failed: user not found');
    }
    done(null, user);
  } catch (err) {
    console.error('❌ Error during deserialization:', err);
    done(err, null);
  }
});
