const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    adminLogin,
    adminLogout,
    getAdminProfile,
    registerOrganizer,
    organizerLogin,
    organizerLogout,
    getOrganizerProfile
} = require('../controllers/authController');

// Admin routes
router.post('/admin/login', adminLogin);
router.get('/admin/logout', protect, adminLogout);
router.get('/admin/profile', protect, getAdminProfile);

// Organizer routes
router.post('/organizer/register', registerOrganizer);
router.post('/organizer/login', organizerLogin);
router.get('/organizer/logout', protect, organizerLogout);
router.get('/organizer/profile', protect, getOrganizerProfile);

module.exports = router; 