const express = require('express');
const router = express.Router();
const {
    registerOrganizer,
    loginOrganizer,
    logout,
    getProfile,
    updateProfile
} = require('../controllers/organizerController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.post('/register', registerOrganizer);
router.post('/login', loginOrganizer);
router.post('/logout', protect, restrictTo('organizer'), logout);
router.get('/profile', protect, restrictTo('organizer'), getProfile);
router.put('/profile', protect, restrictTo('organizer'), updateProfile);

module.exports = router; 