const express = require('express');
const router = express.Router();
const {
    registerAdmin,
    loginAdmin,
    logout,
    getProfile,
    updateProfile
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', protect, logout);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router; 