// controllers/onboardingController.js

const User = require('../models/user'); // Adjust the path as needed

// GET request handler for displaying the onboarding form
exports.getOnboarding = async (req, res) => {
     try {
          // Fetch the user information from the database
          const userId = req.user._id; // Assuming you have user authentication and user ID is stored in req.user
          const user = await User.findById(userId);

          // Render the onboarding form with user data
          if (!user.onboardingComplete) {
               // Render the onboarding form if not completed
               res.render('public/dashboard/onboarding', {
                    user,
                    title: 'complete your profile'
               });
          } else {
               // Redirect to the profile or another page if onboarding is already completed
               res.redirect('/dashboard');
          }
     } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
     }
};

// POST request handler for handling form submission
exports.postOnboarding = async (req, res) => {
     try {
          const userId = req.user._id;
          const { location, bio, experience, specialization, certifications, trainingMethods, programs, pricing, availability } = req.body;

          // Update the user's information in the database
          await User.findByIdAndUpdate(userId, {
               location,
               bio,
               experience,
               specialization: specialization.split(',').map(tag => tag.trim()),
               certifications: certifications.split(',').map(cert => cert.trim()),
               trainingMethods,
               servicesOffered: {
                    programs: programs.split(',').map(program => program.trim()),
                    pricing,
                    availability
               },
               onboardingComplete: true
          });

          res.redirect('/dashboard'); // Redirect to profile or another relevant page after completion
     } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
     }
};
