const Organizer = require('../models/organizerModel');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// Register Organizer
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

        // Generate token
        const token = generateToken(organizer._id, 'organizer');

        res.status(201).json({
            success: true,
            data: {
                _id: organizer._id,
                name: organizer.name,
                email: organizer.email,
                phone: organizer.phone,
                organization: organizer.organization,
                role: organizer.role
            },
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Login Organizer
exports.loginOrganizer = async (req, res) => {
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

        // Generate token
        const token = generateToken(organizer._id, 'organizer');

        res.status(200).json({
            success: true,
            data: {
                _id: organizer._id,
                name: organizer.name,
                email: organizer.email,
                phone: organizer.phone,
                organization: organizer.organization,
                role: organizer.role
            },
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Logout Organizer
exports.logout = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};

// Get Organizer Profile
exports.getProfile = async (req, res) => {
    try {
        const organizer = await Organizer.findById(req.user._id);
        res.status(200).json({
            success: true,
            data: {
                _id: organizer._id,
                name: organizer.name,
                email: organizer.email,
                phone: organizer.phone,
                organization: organizer.organization,
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

// Update Organizer Profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, organization } = req.body;
        const organizer = await Organizer.findById(req.user._id);

        if (name) organizer.name = name;
        if (phone) organizer.phone = phone;
        if (organization) organizer.organization = organization;

        await organizer.save();

        res.status(200).json({
            success: true,
            data: {
                _id: organizer._id,
                name: organizer.name,
                email: organizer.email,
                phone: organizer.phone,
                organization: organizer.organization,
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