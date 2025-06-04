const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const Organizer = require('../models/organizerModel');

// Protect routes
exports.protect = async (req, res, next) => {
    try {
        let token;

        // Get token from cookies
        if (req.cookies.token) {
            token = req.cookies.token;
        }

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route'
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check if user is admin or organizer based on role in token
            if (decoded.role === 'admin') {
                req.admin = await Admin.findById(decoded.id);
                if (!req.admin) {
                    return res.status(401).json({
                        success: false,
                        message: 'Not authorized to access this route'
                    });
                }
            } else if (decoded.role === 'organizer') {
                req.organizer = await Organizer.findById(decoded.id);
                if (!req.organizer) {
                    return res.status(401).json({
                        success: false,
                        message: 'Not authorized to access this route'
                    });
                }
            }

            next();
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Restrict to certain roles
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        let userRole;
        
        // Check if user is admin or organizer
        if (req.admin) {
            userRole = req.admin.role;
        } else if (req.organizer) {
            userRole = req.organizer.role;
        }

        if (!roles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this route'
            });
        }
        next();
    };
}; 