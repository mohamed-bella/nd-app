const router = require('express').Router();

const publicController = require('../controllers/publicController')
const onboardingController = require('../controllers/onboardingController')

router.get('/', publicController.getHome)
router.get('/nos-dresseurs', publicController.getTrainers)
router.get('/trainer/:id', publicController.getTrainer)



router.get('/onboarding', onboardingController.getOnboarding)
router.post('/onboarding', onboardingController.postOnboarding)

module.exports = router;