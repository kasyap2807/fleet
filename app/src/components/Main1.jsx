import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const emojiIcon = new L.DivIcon({
  html: '🚗',
  className: 'emoji-icon',
  iconSize: [24, 24],
});

function Main1() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [routeHistory, setRouteHistory] = useState([]);

  useEffect(() => {
    const fetchVehicleData = () => {
      axios.get('http://localhost:8080/api/vehicles/getAll')
        .then(res => setVehicles(res.data))
        .catch(err => console.error('Error fetching vehicle data:', err));
    };

    const fetchRouteHistory = () => {
      if (selectedVehicleId) {
        axios.get(`http://localhost:8080/api/vehicles/history/${selectedVehicleId}`)
          .then(res => setRouteHistory(res.data.reverse()))
          .catch(err => {
            console.error("Error fetching route history:", err);
            setRouteHistory([]);
          });
      } else {
        fetchVehicleData();
        setRouteHistory([]);
      }
    };

    fetchRouteHistory();
    const interval = setInterval(fetchRouteHistory, 5000);
    return () => clearInterval(interval);
  }, [selectedVehicleId]);

  const vehicleIds = [...new Set(vehicles.map(v => v.vehicleId))];

  const lastPosition = routeHistory.length > 0
    ? [routeHistory[0].latitude, routeHistory[0].longitude]
    : [20, 78];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Fleet Dashboard</h1>
        <div className="vehicle-selector">
          <label htmlFor="vehicleDropdown">Select Vehicle:</label>
          <select
            id="vehicleDropdown"
            value={selectedVehicleId}
            onChange={(e) => setSelectedVehicleId(e.target.value)}
          >
            <option value="">-- Select Vehicle --</option>
            {vehicleIds.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
      </header>

      <MapContainer center={lastPosition} zoom={6} style={{ height: '85vh', borderRadius: '8px', margin: '10px' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {routeHistory.length > 1 && (
          <Polyline
            positions={routeHistory.map(p => [p.latitude, p.longitude])}
            pathOptions={{ color: '#1e90ff' }}
          />
        )}

        {routeHistory.map((v, i) => (
          <Marker
            key={i}
            position={[v.latitude, v.longitude]}
            icon={emojiIcon}
          >
            <Popup>
              <strong>Vehicle ID:</strong> {v.vehicleId}<br />
              <strong>Lat:</strong> {v.latitude}<br />
              <strong>Lng:</strong> {v.longitude}<br />
              <strong>Time:</strong> {new Date(v.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <style>{`
        .dashboard {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f4f6f9;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: #2c3e50;
          color: white;
        }

        .vehicle-selector label {
          margin-right: 8px;
        }

        .vehicle-selector select {
          padding: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .emoji-icon {
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
}

export default Main1;

