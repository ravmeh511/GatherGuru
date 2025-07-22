const express = require('express');
const router = express.Router();
const { protect: organizerProtect } = require('../middleware/authMiddleware');
const {
    createEventBasic,
    updateEventBanner,
    updateEventTicketing,
    publishEvent,
    getEventDetails,
    getOrganizerEvents,
    getEventCategories,
    getPopularEvents,
    getEventsByCategory,
    searchEvents,
    createTestEvent,
    getAllEvents
} = require('../controllers/eventController');

// Public routes (no authentication required)
router.get('/categories', getEventCategories);
router.get('/popular', getPopularEvents);
router.get('/category/:category', getEventsByCategory);
router.get('/search', searchEvents);
router.get('/all', getAllEvents);
router.get('/:eventId', getEventDetails);

// Test route (temporary)
router.post('/test/create', createTestEvent);

// Protected routes for organizers
router.use(organizerProtect); // Apply organizer protection to all routes below
router.post('/', createEventBasic);
router.patch('/:eventId/banner', updateEventBanner);
router.patch('/:eventId/ticketing', updateEventTicketing);
router.patch('/:eventId/publish', publishEvent);
router.get('/organizer/events', getOrganizerEvents);

module.exports = router; 