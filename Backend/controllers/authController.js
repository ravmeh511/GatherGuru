const Admin = require('../models/adminModel');
const Organizer = require('../models/organizerModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id, role) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// Admin Controllers
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin and include password
        const admin = await Admin.findOne({ email }).select('+password');

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await admin.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Create token
        const token = generateToken(admin._id, 'admin');

        // Set cookie
  res.cookie('token', token);

        res.status(200).json({
            success: true,
            data: {
                _id: admin._id,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.adminLogout = (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
};

exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id);
        res.json({
            success: true,
            data: {
                _id: admin._id,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Organizer Controllers
exports.registerOrganizer = async (req, res) => {
    try {
        const { name, email, password, phone, organization } = req.body;

        // Check if organizer exists
        const organizerExists = await Organizer.findOne({ email });

        if (organizerExists) {
            return res.status(400).json({
                success: false,
                message: 'Organizer already exists'
            });
        }

        // Create organizer
        const organizer = await Organizer.create({
            name,
            email,
            password,
            phone,
            organization
        });

        // Create token
        const token = generateToken(organizer._id, 'organizer');

        // Set cookie
        res.cookie('token', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.status(201).json({
            success: true,
            data: {
                _id: organizer._id,
                name: organizer.name,
                email: organizer.email,
                phone: organizer.phone,
                organization: organizer.organization,
                isVerified: organizer.isVerified,
                role: organizer.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.organizerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find organizer and include password
        const organizer = await Organizer.findOne({ email }).select('+password');

        if (!organizer) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await organizer.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Create token
        const token = generateToken(organizer._id, 'organizer');

        // Set cookie
        res.cookie('token', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.json({
            success: true,
            data: {
                _id: organizer._id,
                name: organizer.name,
                email: organizer.email,
                phone: organizer.phone,
                organization: organizer.organization,
                isVerified: organizer.isVerified,
                role: organizer.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.organizerLogout = (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
};

// User Controllers
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            phone
        });

        // Create token
        const token = generateToken(user._id, 'user');

        // Set cookie
        res.cookie('token', token, {
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                status: user.status
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user and include password
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Create token
        const token = generateToken(user._id, 'user');

        // Set cookie
        res.cookie('token', token, {
           
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                status: user.status
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.userLogout = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),
        path: '/'
    });
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({
            success: true,
            data: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                website: user.website,
                company: user.company,
                address: user.address,
                city: user.city,
                country: user.country,
                pincode: user.pincode,
                profilePicture: user.profilePicture,
                role: user.role,
                status: user.status
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getOrganizerProfile = async (req, res) => {
    try {
        const organizer = await Organizer.findById(req.organizer._id);
        res.json({
            success: true,
            data: {
                _id: organizer._id,
                name: organizer.name,
                email: organizer.email,
                phone: organizer.phone,
                organization: organizer.organization,
                isVerified: organizer.isVerified,
                role: organizer.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { firstName, lastName, website, company, phoneNumber, address, city, country, pincode } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Update user fields
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.website = website || user.website;
        user.company = company || user.company;
        user.phone = phoneNumber || user.phone;
        user.address = address || user.address;
        user.city = city || user.city;
        user.country = country || user.country;
        user.pincode = pincode || user.pincode;

        const updatedUser = await user.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                website: updatedUser.website,
                company: updatedUser.company,
                phone: updatedUser.phone,
                address: updatedUser.address,
                city: updatedUser.city,
                country: updatedUser.country,
                pincode: updatedUser.pincode,
                profilePicture: updatedUser.profilePicture,
                role: updatedUser.role,
                status: updatedUser.status
            }
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error updating profile'
        });
    }
};

exports.updateUserProfilePicture = async (req, res) => {
    try {
        console.log('Starting profile picture upload...');
        console.log('Request file:', req.file);
        console.log('Request user:', req.user);

        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        // Get user ID from auth middleware
        const userId = req.user._id;
        console.log('User ID:', userId);

        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found with ID:', userId);
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        console.log('Found user:', user);
        console.log('File details:', {
            filename: req.file.filename,
            path: req.file.path,
            mimetype: req.file.mimetype
        });

        // Update user's profile picture path
        user.profilePicture = `uploads/profile-pictures/${req.file.filename}`;
        await user.save();

        console.log('Profile picture updated successfully');
        res.status(200).json({
            success: true,
            data: {
                profilePicture: user.profilePicture
            },
            message: 'Profile picture updated successfully'
        });
    } catch (error) {
        console.error('Error in updateUserProfilePicture:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({
            success: false,
            message: error.message || 'Error updating profile picture',
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}; 