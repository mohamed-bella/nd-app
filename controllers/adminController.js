const User = require('../models/user')
const Review = require('../models/review')




exports.getHome = async (req, res) => {

     const totalTrainers = await User.countDocuments({ role: 'trainer' });

     const oneWeekAgo = new Date();
     oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
     const newUsers = await User.countDocuments({ createdAt: { $gte: oneWeekAgo } });
     const recentReviews = await Review.find().sort({ createdAt: -1 }).limit(5);

     const approvedTrainers = await User.countDocuments({ role: 'trainer', status: 'approved' });
     const pendingTrainers = await User.countDocuments({ role: 'trainer', status: 'Pending' });
     const pendingTrainersList = await User.find({ role: 'trainer', status: 'Pending' });

     // console.log(recentReviews)
     res.render('admin/home', {
          totalTrainers,
          oneWeekAgo,
          newUsers,
          recentReviews,
          approvedTrainers,
          pendingTrainers,
          pendingTrainersList

     })

}