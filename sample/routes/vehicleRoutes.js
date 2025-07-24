const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

router.post('/location', vehicleController.updateLocation);
router.get('/location/:vehicleId', vehicleController.getLocation);
router.get('/history/:vehicleId', vehicleController.getLocationHistory);

module.exports = router;
