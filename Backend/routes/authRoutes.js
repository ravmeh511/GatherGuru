const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect } = require('../middleware/auth');
const {
    adminLogin,
    adminLogout,
    getAdminProfile,
    registerOrganizer,
    organizerLogin,
    organizerLogout,
    getOrganizerProfile,
    registerUser,
    userLogin,
    userLogout,
    getUserProfile,
    updateUserProfile,
    updateUserProfilePicture
} = require('../controllers/authController');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'profile-pictures');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for profile picture uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File size is too large. Maximum size is 5MB.'
            });
        }
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    if (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    next();
};

// Admin routes
router.post('/admin/login', adminLogin);
router.get('/admin/logout', protect, adminLogout);
router.get('/admin/profile', protect, getAdminProfile);

// Organizer routes
router.post('/organizer/register', registerOrganizer);
router.post('/organizer/login', organizerLogin);
router.get('/organizer/logout', protect, organizerLogout);
router.get('/organizer/profile', protect, getOrganizerProfile);

// User routes
router.post('/user/register', registerUser);
router.post('/user/login', userLogin);
router.get('/user/logout', protect, userLogout);
router.get('/user/profile', protect, getUserProfile);
router.put('/user/profile', protect, updateUserProfile);
router.post('/user/profile/picture', protect, upload.single('profilePicture'), handleMulterError, updateUserProfilePicture);

module.exports = router; 