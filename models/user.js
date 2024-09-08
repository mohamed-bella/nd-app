const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
     googleId: {
          type: String,
          required: true
     },
     displayName: {
          type: String,
          required: true
     },
     firstName: String,
     lastName: String,
     image: String,
     role: {
          type: String,
          // enum: ['dresseur', 'admin'],
          default: 'trainer'
     },
     location: String,
     bio: String,
     experience: {
          type: Number, // Number of years of experience
          min: 0
     },
     specialization: [String], // Array of specializations
     certifications: [String], // Array of certifications
     trainingMethods: String, // Overview of training methods
     servicesOffered: {
          programs: [String], // Array of training programs
          pricing: String, // Pricing structure
          availability: String // Availability details
     },
     reviewCount: {
          type: Number,
          default: 0,
     },
     contactInfo: {
          phone: String,
          email: String,
          socialMediaLinks: [String] // Array of social media links
     },
     additionalInfo: {
          languages: [String], // Languages spoken by the trainer
          travelRadius: String, // Area the trainer is willing to travel
          cancellationPolicy: String, // Information on cancellation policy
          faq: [
               {
                    question: String,
                    answer: String
               }
          ]
     },
     photos: {
          type: [String], // Array of strings to store image URLs
          default: []
     },
     createdAt: {
          type: Date,
          default: Date.now
     },
     avgRating: {
          type: Number,
          default: '0'
     },
     tags: [String],
     status: {
          type: String,
          enum: ['Pending', 'Approved', 'Rejected'],
          default: 'Pending'
     },
     views: { type: Number, default: 0 },
     onboardingComplete: {
          type: Boolean,
          default: false
     }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
