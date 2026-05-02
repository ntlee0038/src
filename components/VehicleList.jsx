import { useEffect, useState } from "react";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const selectedVehicleId = Number(localStorage.getItem("selectedVehicleId"));

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("vehicles")) || [];
    setVehicles(stored);
  }, []);

  const selectVehicle = (id) => {
    localStorage.setItem("selectedVehicleId", id);
    window.location.reload();
  };

  if (vehicles.length === 0) {
    return <p>No vehicles saved yet.</p>;
  }

  return (
    <div>
      <h2>Saved Vehicles</h2>

      {vehicles.map((vehicle) => (
        <button
          key={vehicle.id}
          onClick={() => selectVehicle(vehicle.id)}
          className={vehicle.id === selectedVehicleId ? "selected" : ""}
        >
          {vehicle.year} {vehicle.make} {vehicle.model}
        </button>
      ))}
    </div>
  );
}