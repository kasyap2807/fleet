import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Main1 from './components/Main1';
import Main2 from './components/Main2';
import AddVehicleForm from './components/AddVehicleForm'
function App() {


  const [select,setselect] = useState("Admin");
  return (
    <div className="App">
      <button onClick={()=>{setselect("Admin")}}>Admin</button>
      <button onClick={()=>{setselect("user")}}>user</button>
      <button onClick={()=>{setselect("Vehcal")}}>add Vehcal</button>


      {select == "Admin"&& (
        <Main1/>
      )}
      {select == "user"&& (
        <Main2/>
      )}
      {select == "Vehcal"&& (
        <AddVehicleForm/>
      )}
    </div>
  );
}

export default App;
