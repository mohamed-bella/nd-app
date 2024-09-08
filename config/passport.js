// config/passport-setup.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user'); // Assuming you have a User model
require('dotenv').config()

passport.use(
     new GoogleStrategy({
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: '/auth/google/cb'
     },
          async (accessToken, refreshToken, profile, done) => {
               // Check if the user already exists in your database
               try {
                    let user = await User.findOne({ googleId: profile.id });

                    if (!user) {
                         // If user doesn't exist, create a new user
                         user = new User({
                              googleId: profile.id,
                              displayName: profile.displayName,
                              firstName: profile.name.givenName,
                              lastName: profile.name.familyName,
                              image: profile.photos[0].value
                         });

                         await user.save();
                    }

                    done(null, user);
               } catch (err) {
                    console.error(err);
                    done(err, null);
               }
          })
);

passport.serializeUser((user, done) => {
     done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
     try {
          const user = await User.findById(id);
          done(null, user);
     } catch (err) {
          done(err, null);
     }
});
