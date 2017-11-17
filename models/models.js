const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    givenName: {
        type: String
    },
    surname: {
        type: String
    }
});

module.exports = mongoose.model('shipment', shipmentSchema);