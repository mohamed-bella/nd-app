const User = require('../models/user')


exports.getDashboard = (req, res) => {
     res.render('public/dashboard/home', {
          title: 'Dashboard'
     });
}
exports.getUpdateProfile = (req, res) => {
     res.render('public/dashboard/update-profile', {
          title: 'Mettre en jour Votre Profile'
     })
}

// exports.postUpdateProfile = async (req, res) => {
//      try {
//           const { displayName, location, experience, specialization, certifications, trainingMethods, programs, pricing, availability } = req.body;
//           // let imageUrl = 'https://example.com/default-profile-pic.jpg'; // Default image URL

//           // Handle image upload to Telegraph
//           // if (req.file) {
//           //      console.log(req.file)
//           //      const imageBuffer = req.file.buffer;

//           //      // Upload to Telegraph
//           //      const formData = new FormData();
//           //      formData.append('file', imageBuffer, { filename: 'profile.jpg' });

//           //      const telegraphResponse = await axios.post('https://telegra.ph/upload', formData, {
//           //           headers: {
//           //                'Content-Type': 'multipart/form-data'
//           //           }
//           //      });

//           //      if (telegraphResponse.data && telegraphResponse.data[0] && telegraphResponse.data[0].src) {
//           //           imageUrl = `https://telegra.ph${telegraphResponse.data[0].src}`;
//           //      }
//           // }

//           // Update user profile
//           const updatedUser = await User.findByIdAndUpdate(
//                req.user._id,
//                {
//                     displayName,
//                     location,
//                     experience,
//                     specialization,
//                     certifications,
//                     trainingMethods,
//                     servicesOffered: {
//                          programs,
//                          pricing,
//                          availability
//                     },
//                },
//                { new: true }
//           );

//           res.redirect('/dashboard/');
//      } catch (error) {
//           console.error(error);
//           res.status(500).send('Server error');
//      }
// }
// controllers/profileController.js

exports.updateBasicInfo = (req, res) => {
     const { displayName, location, bio } = req.body;

     // Assuming `User` is your Mongoose model
     User.findByIdAndUpdate(req.user.id, {
          displayName,
          location,
          bio
     }, { new: true })
          .then(user => {
               res.redirect('/dashboard/update-profile');
          })
          .catch(err => {
               console.error(err);
               res.redirect('/dashboard/update-profile');
          });
};

exports.updateProfessionalDetails = (req, res) => {
     const { experience, specialization, certifications } = req.body;

     // Convert specialization and certifications to arrays if they are strings
     const specializationArray = specialization.split(',').map(item => item.trim());
     const certificationsArray = certifications.split(',').map(item => item.trim());

     User.findByIdAndUpdate(req.user.id, {
          experience,
          specialization: specializationArray,
          certifications: certificationsArray
     }, { new: true })
          .then(user => {
               res.redirect('/dashboard/update-profile');
          })
          .catch(err => {
               console.error(err);
               res.redirect('/dashboard/update-profile');
          });
};


exports.updateServicesOffered = (req, res) => {
     const { trainingMethods, programs, pricing, availability } = req.body;

     // Convert programs to array if it is a string
     const programsArray = programs.split(',').map(item => item.trim());

     User.findByIdAndUpdate(req.user.id, {
          servicesOffered: {
               trainingMethods,
               programs: programsArray,
               pricing,
               availability
          }
     }, { new: true })
          .then(user => {
               res.redirect('/dashboard/update-profile');
          })
          .catch(err => {
               console.error(err);
               res.redirect('/dashboard/update-profile');
          });
};

const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2; // Assuming you use Cloudinary

// Configure multer storage
const storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, './uploads/');  // Temporary folder
     },
     filename: function (req, file, cb) {
          cb(null, Date.now() + path.extname(file.originalname));
     }
});

const upload = multer({ storage: storage });

exports.uploadPhotos = (req, res) => {
     const files = req.files;

     const uploadPromises = files.map(file => {
          return cloudinary.uploader.upload(file.path)
               .then(result => result.url);
     });

     Promise.all(uploadPromises)
          .then(urls => {
               User.findByIdAndUpdate(req.user.id, {
                    $push: { photos: { $each: urls } }
               }, { new: true })
                    .then(user => {
                         res.redirect('/dashboard/update-profile');
                    });
          })
          .catch(err => {
               console.error(err);
               res.redirect('/dashboard/update-profile');
          });
};


exports.getProfile = (req, res) => {
     res.render('public/dashboard/profile', {
          title: 'Mon Profile'
     })
}