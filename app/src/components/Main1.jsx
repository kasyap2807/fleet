import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function Main1() {
  const [vehicles, setVehicles] = useState([]);

  const emojiIcon = new L.DivIcon({
    html: '🚗',
    className: 'myicons',
    iconSize: [24, 24],
  });

  // Function to fetch vehicle data
  const fetchVehicles = () => {
    axios.get('http://localhost:8080/api/vehicles')
      .then(res => setVehicles(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchVehicles(); // initial fetch

    const interval = setInterval(() => {
      fetchVehicles(); // fetch every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <MapContainer center={[20, 78]} zoom={5} style={{ height: '100vh' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vehicles.map((v, i) => (
        <Marker
          key={v.vehicleId || i}
          position={[v.latitude, v.longitude]}
          icon={emojiIcon}
          title={`Vehicle ID: ${v.vehicleId}`}
        />
      ))}
    </MapContainer>
  );
}

export default Main1;
