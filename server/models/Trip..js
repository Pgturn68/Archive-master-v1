const mongoose = require('mongoose')

const trip = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Business', 'Family', 'Vacation'],
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: false
    },
},
    {
        collection: "trips"
    }
)

const Trip = mongoose.model('Trip', trip);

// Default Export
module.exports = Trip;
