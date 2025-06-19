import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import L from "leaflet";

function Main2() {
  const [vehicleId, setVehicleId] = useState('');
  const [vehicle, setVehicle] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const emojiIcon = new L.DivIcon({
    html: "🚗",
    className: "myicons",
    iconSize: [24, 24],
  });

  const handleStartTracking = () => {
    if (!vehicleId) return alert("Please enter a Vehicle ID");

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            const newLocation = {
              vehicleId,
              latitude,
              longitude,
            };

            axios
              .post('http://localhost:8080/api/vehicles', newLocation)
              .then(() => setVehicle(newLocation))
              .catch((err) => console.error(err));
          },
          (err) => console.error("Geolocation error:", err),
          { enableHighAccuracy: true }
        );
      } else {
        console.error("Geolocation not supported");
      }
    };

    updateLocation(); // initial fetch
    const id = setInterval(updateLocation, 5000); // every 5 seconds
    setIntervalId(id);
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <div>
      {!vehicle ? (
        <div style={{ padding: "20px" }}>
          <h2>Enter Vehicle ID to Start Tracking</h2>
          <input
            type="text"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            placeholder="Vehicle ID"
          />
          <button onClick={handleStartTracking}>Start</button>
        </div>
      ) : (
        <MapContainer center={[vehicle.latitude, vehicle.longitude]} zoom={13} style={{ height: '100vh' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[vehicle.latitude, vehicle.longitude]} icon={emojiIcon} />
        </MapContainer>
      )}
    </div>
  );
}

export default Main2;
