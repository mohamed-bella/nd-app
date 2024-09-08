// routes/index.js
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const User = require('../models/user')

// Configure Cloudinary
cloudinary.config({
     cloud_name: 'dxg2nsnkj',
     api_key: '759116646597221',
     api_secret: 'NtwqyLjl48AXfgqxDyv86hPb3rk',
});

// Set up multer storage for Cloudinary
const storage = new CloudinaryStorage({
     cloudinary: cloudinary,
     folder: 'ndressilik', // Optional: folder name in Cloudinary
     allowedFormats: ['jpg', 'png'],
});

const upload = multer({ storage: storage });

// // POST route to handle image upload
// router.post('/upload-photos', upload.array('photos', 10), async (req, res) => {
//      try {
//           const userId = req.user._id; // Assuming you're using Passport.js
//           const uploadedImages = req.files.map(file => file.path);

//           // Save the URLs to the database
//           await User.findByIdAndUpdate(userId, {
//                $push: { photos: { $each: uploadedImages } }
//           });

//           res.status(200).json({ message: 'Photos uploaded successfully!', photos: uploadedImages });

//      } catch (error) {
//           console.error('Error uploading images:', error);
//           res.status(500).json({ message: 'Failed to upload photos' });
//      }
// });


const dashboardController = require('../controllers/dashboardController')
router.get('/', ensureAuthenticated, dashboardController.getDashboard);
router.get('/profile', ensureAuthenticated, dashboardController.getProfile);
router.get('/update-profile', ensureAuthenticated, dashboardController.getUpdateProfile)
// router.post('/update-profile', ensureAuthenticated, dashboardController.postUpdateProfile)


// Route for Basic Information
router.post('/update-basic-info', ensureAuthenticated, dashboardController.updateBasicInfo);

// Route for Professional Details
router.post('/update-professional-details', ensureAuthenticated, dashboardController.updateProfessionalDetails);

// Route for Services Offered
router.post('/update-services-offered', ensureAuthenticated, dashboardController.updateServicesOffered);

// Route for Uploading Photos
router.post('/upload-photos', upload.array('photos'), ensureAuthenticated, dashboardController.uploadPhotos);


module.exports = router;