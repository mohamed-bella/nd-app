// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const User = require('../models/user');
const { ensureAuthenticated } = require('../middlewares/auth');

// GET: Display Review Form
// router.get('/reviews/:trainerId', ensureAuthenticated, async (req, res) => {
//      try {
//           const trainer = await User.findById(req.params.trainerId);
//           if (!trainer) {
//                return res.status(404).send('Éducateur canin non trouvé');
//           }
//           res.render('reviewForm', { trainer });
//      } catch (error) {
//           console.error(error);
//           res.status(500).send('Erreur serveur');
//      }
// });

// POST: Submit Review
router.post('/reviews/:trainerId', async (req, res) => {
     try {
          const { rating, review, email } = req.body;
          const trainer = await User.findById(req.params.trainerId);
          if (!trainer) {
               return res.status(404).send('Éducateur canin non trouvé');
          }

          await User.findByIdAndUpdate(req.params.trainerId, { $inc: { reviewCount: 1 } });

          const reviews = await Review.find({ trainer: trainer._id });
          const avgRating = reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length;
          trainer.avgRating = avgRating.toFixed(1);
          await trainer.save();


          const newReview = new Review({
               trainer: trainer._id,
               // client: req.user._id,

               rating,
               review,
               email,
          });
          // console.log(newReview)

          await newReview.save();

          // Optionally, update trainer's average rating




          res.redirect(`/trainer/${trainer._id}`); // Redirect to trainer's profile
     } catch (error) {
          console.error(error);
          res.status(500).send('Erreur serveur');
     }
});

module.exports = router;
