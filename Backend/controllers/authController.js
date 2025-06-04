const Admin = require('../models/adminModel');
const Organizer = require('../models/organizerModel');
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
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

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
            httpOnly: true,
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
            httpOnly: true,
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