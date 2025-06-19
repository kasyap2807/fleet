import React, { useState } from 'react';
import axios from 'axios';

function AddVehicleForm() {
  const [vehicle, setVehicle] = useState({
    vehicleId: '',
    latitude: '',
    longitude: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/vehicles', vehicle);
      alert('Vehicle location saved!');
      setVehicle({ vehicleId: '', latitude: '', longitude: '' }); // reset form
    } catch (error) {
      console.error('Error saving vehicle:', error);
      alert('Failed to save vehicle.');
    }
  };

  return (
    <div className="add-vehicle-form" style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Add Vehicle Location</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Vehicle ID:</label>
          <input
            type="text"
            name="vehicleId"
            value={vehicle.vehicleId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            name="latitude"
            step="any"
            value={vehicle.latitude}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            name="longitude"
            step="any"
            value={vehicle.longitude}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Location</button>
      </form>
    </div>
  );
}

export default AddVehicleForm;
