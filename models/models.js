const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
    givenName: {
        type: String
    },
    surname: {
        type: String
    },
    city: {
        type: String
    }
});

module.exports = mongoose.model('shipment', ShipmentSchema);