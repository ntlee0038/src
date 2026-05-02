import "./App.css";
import VehicleForm from "./components/VehicleForm";
import VehicleList from "./components/VehicleList";
import VehicleDisplay from "./components/VehicleDisplay";
import MaintenanceForm from "./components/MaintenanceForm";
import MaintenanceList from "./components/MaintenanceList";
import ReminderCard from "./components/ReminderCard";

export default function App() {
  return (
    <div className="app">
      <h1>AutoTrack 🚗</h1>
      <p>Track your vehicle maintenance in one place.</p>

      <div className="card">
        <VehicleForm />
      </div>

      <div className="card">
        <VehicleList />
      </div>

      <div className="card">
        <VehicleDisplay />
      </div>

      <div className="card">
        <ReminderCard />
      </div>

      <div className="card">
        <MaintenanceForm />
      </div>

      <div className="card">
        <MaintenanceList />
      </div>
    </div>
  );
}