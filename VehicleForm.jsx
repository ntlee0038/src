import { useState } from "react";

export default function VehicleForm() {
  const [vehicle, setVehicle] = useState({
    make: "",
    model: "",
    year: "",
    mileage: ""
  });

  const handleChange = (e) => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingVehicles = JSON.parse(localStorage.getItem("vehicles")) || [];

    const newVehicle = {
      id: Date.now(),
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      mileage: vehicle.mileage,
      maintenance: []
    };

    localStorage.setItem("vehicles", JSON.stringify([...existingVehicles, newVehicle]));
    localStorage.setItem("selectedVehicleId", newVehicle.id);

    window.location.reload();
  };

  return (
    <div>
      <h2>Add Your Vehicle</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input name="make" placeholder="Make" value={vehicle.make} onChange={handleChange} />
          <input name="model" placeholder="Model" value={vehicle.model} onChange={handleChange} />
          <input name="year" placeholder="Year" value={vehicle.year} onChange={handleChange} />
          <input name="mileage" placeholder="Mileage" value={vehicle.mileage} onChange={handleChange} />

          <button type="submit">Save Vehicle</button>
        </div>
      </form>
    </div>
  );
}