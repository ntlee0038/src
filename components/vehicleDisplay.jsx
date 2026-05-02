import { useState, useEffect } from "react";

export default function VehicleDisplay() {
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("vehicle"));
    setVehicle(stored);
  }, []);

  if (!vehicle) {
    return <p>No vehicle saved yet.</p>;
  }

  return (
    <div className="vehicle-info">
      <h2>Your Vehicle</h2>
      <p><strong>Make:</strong> {vehicle.make}</p>
      <p><strong>Model:</strong> {vehicle.model}</p>
      <p><strong>Year:</strong> {vehicle.year}</p>
      <p><strong>Mileage:</strong> {vehicle.mileage}</p>
    </div>
  );
}