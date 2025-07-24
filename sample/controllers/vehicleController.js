const VehicleLocation = require('../models/VehicleLocation');
const VehicleLocationHistory = require('../models/VehicleLocationHistory');

// POST: Add/Update vehicle location
exports.updateLocation = async (req, res) => {
  const { vehicleId, latitude, longitude } = req.body;

  try {
    let location = await VehicleLocation.findOne({ vehicleId });

    if (location) {
      location.latitude = latitude;
      location.longitude = longitude;
      location.timestamp = new Date();
      await location.save();
    } else {
      location = new VehicleLocation({ vehicleId, latitude, longitude });
      await location.save();
    }

    const history = new VehicleLocationHistory({
      vehicleId,
      latitude,
      longitude
    });
    await history.save();

    res.json({ message: 'Location updated', location });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: Get current location of a vehicle
exports.getLocation = async (req, res) => {
  try {
    const location = await VehicleLocation.findOne({ vehicleId: req.params.vehicleId });
    if (!location) return res.status(404).json({ message: 'Vehicle not found' });

    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: Get location history of a vehicle
exports.getLocationHistory = async (req, res) => {
  try {
    const history = await VehicleLocationHistory.find({ vehicleId: req.params.vehicleId });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
