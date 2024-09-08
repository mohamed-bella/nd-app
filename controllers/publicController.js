const User = require('../models/user')
const Review = require('../models/review')
exports.getHome = async (req, res) => {
     const trainers = await User.find().sort({ createdAt: -1 })
     res.render('public/home', {
          title: 'HOME PAGE',
          heroTitle: 'Bienvenue à Ndressilik',
          heroDescription: 'La Référence pour les Propriétaires et Dresseurs de Chiens au Maroc',
          trainers,
     })
}

exports.getTrainers = async (req, res) => {
     const trainers = await User.find().sort({ createdAt: -1 })
     // console.log(trainers)
     res.render('public/trainers', {
          title: 'Nos Dresseurs',
          heroTitle: 'Nos Dresseurs',
          heroDescription: 'Match your perfect dog trainer for your dog ',
          trainers
     })
}

// get Trainer Profile
exports.getTrainer = async (req, res) => {
     const trainerID = req.params.id;

     const thisTrainer = await User.findById(trainerID);
     thisTrainer.views = (thisTrainer.views || 0) + 1;
     if (!req.session.viewed) {
          await thisTrainer.save();
     }
     req.session.viewed = true;

     const reviews = await Review.find({ trainer: thisTrainer._id }).populate('email');
     console.log(reviews)
     const trainer = await User.findById(trainerID).then((trainer) => {
          res.render('public/trainer', {
               title: `${trainer.displayName}'s Profile`,
               heroTitle: `${trainer.displayName}'s Profile`,
               heroDescription: ``,
               trainer,
               trainerID,
               reviews,
               // views
          })
     })
     // res.send(trainer)
}