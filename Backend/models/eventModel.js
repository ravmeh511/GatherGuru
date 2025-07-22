const mongoose = require('mongoose');

const EVENT_CATEGORIES = {
    MUSICAL_CONCERT: 'MUSICAL_CONCERT',
    WEDDING: 'WEDDING',
    CORPORATE_EVENT: 'CORPORATE_EVENT',
    BIRTHDAY_PARTY: 'BIRTHDAY_PARTY',
    CONFERENCE: 'CONFERENCE',
    SEMINAR: 'SEMINAR',
    WORKSHOP: 'WORKSHOP',
    EXHIBITION: 'EXHIBITION',
    SPORTS_EVENT: 'SPORTS_EVENT',
    CHARITY_EVENT: 'CHARITY_EVENT',
    FOOD_FESTIVAL: 'FOOD_FESTIVAL',
    CULTURAL_FESTIVAL: 'CULTURAL_FESTIVAL',
    THEATER_PLAY: 'THEATER_PLAY',
    COMEDY_SHOW: 'COMEDY_SHOW',
    NETWORKING_EVENT: 'NETWORKING_EVENT',
    OTHER: 'OTHER'
};

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Event title is required']
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organizer',
        required: true
    },
    category: {
        type: String,
        required: [true, 'Event category is required'],
        enum: Object.values(EVENT_CATEGORIES)
    },
    scheduleType: {
        type: String,
        enum: ['single', 'recurring'],
        required: true,
        default: 'single'
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required']
    },
    endTime: {
        type: String
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    bannerImage: {
        type: String,
        required: false // Will be required before publishing
    },
    ticketing: {
        type: [{
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
        required: false // Will be required before publishing
    },
    eventType: {
        type: String,
        enum: ['ticketed', 'free'],
        default: 'free'
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'cancelled'],
        default: 'draft'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = {
    Event,
    EVENT_CATEGORIES
}; 