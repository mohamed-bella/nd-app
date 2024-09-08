// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const isAuth = (req, res, next) => {
     if (!req.isAuthenticated()) {
          return next();
     }
     res.render('public/dashboard/home', {
          title: 'dashboard'
     });
}


router.get('/', isAuth, (req, res) => {
     res.render('public/auth', {
          title: 'Sign-in With Google',
          heroTitle: 'Sign-in With Google',
          heroDescription: 'Creating an account will let you submit your profile and more features'
     })
})
// @desc Auth with Google
// @route GET /auth/google
router.get('/google',
     passport.authenticate('google', { scope: ['profile'] })
);

// @desc Google auth callback
// @route GET /auth/google/callback
router.get('/google/cb',
     passport.authenticate('google', { failureRedirect: '/' }),
     (req, res) => {
          // Successful authentication, redirect to dashboard or home page.
          res.redirect('/onboarding');
     }
);

// @desc Logout user
// @route /auth/logout
router.get('/logout', (req, res) => {
     req.logout(() => {
          res.redirect('/');
     });
});


router.post('/logout', (req, res) => {
     req.logout((err) => {
          if (err) {
               return next(err);
          }
          res.redirect('/auth');
     });
})
module.exports = router;

