const mongoose = require('mongoose');

const VehicleLocationSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true },
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VehicleLocation', VehicleLocationSchema);
