import React, { useState } from 'react';
import './App.css';
import Main1 from './components/Main1';
import Main2 from './components/Main2';
import AddVehicleForm from './components/AddVehicleForm';

function App() {
  const [select, setSelect] = useState("Admin");

  return (
    <div className="App">
      <button onClick={() => setSelect("Admin")}>Admin</button>
      <button onClick={() => setSelect("User")}>User</button>
      <button onClick={() => setSelect("Vehicle")}>Add Vehicle</button>

      {select === "Admin" && <Main1 />}
      {select === "User" && <Main2 />}
      {select === "Vehicle" && <AddVehicleForm />}
    </div>
  );
}

export default App;