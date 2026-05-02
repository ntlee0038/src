import { useState } from "react";

export default function MaintenanceForm() {
  const [record, setRecord] = useState({
    service: "",
    date: "",
    mileage: "",
    cost: ""
  });

  const handleChange = (e) => {
    setRecord({
      ...record,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!record.service || !record.date || !record.mileage) {
      alert("Please fill out service, date, and mileage.");
      return;
    }

    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const selectedId = Number(localStorage.getItem("selectedVehicleId"));

    if (!selectedId) {
      alert("Please select a vehicle first.");
      return;
    }

    const updatedVehicles = vehicles.map((vehicle) => {
      if (vehicle.id === selectedId) {
        return {
          ...vehicle,
          maintenance: [...(vehicle.maintenance || []), record]
        };
      }
      return vehicle;
    });

    localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));
    window.location.reload();
  };

  return (
    <div>
      <h2>Add Maintenance Record</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <select name="service" value={record.service} onChange={handleChange}>
            <option value="">Select Service</option>
            <option value="Oil Change">Oil Change</option>
            <option value="Air Filter">Air Filter</option>
            <option value="Transmission Fluid">Transmission Fluid</option>
            <option value="Coolant">Coolant / Radiator</option>
            <option value="Spark Plugs">Spark Plugs</option>
            <option value="Brake Pads / Rotors">Brakes / Rotors</option>
            <option value="Brake Fluid">Brake Fluid</option>
            <option value="Power Steering Fluid">Power Steering Fluid</option>
            <option value="Differential Fluid">Differential Fluid</option>
            <option value="Suspension">Suspension</option>
            <option value="Valve Cover Gasket">Valve Cover Gasket</option>
          </select>

          <input name="date" type="date" value={record.date} onChange={handleChange} />
          <input name="mileage" placeholder="Mileage" value={record.mileage} onChange={handleChange} />
          <input name="cost" placeholder="Cost" value={record.cost} onChange={handleChange} />

          <button type="submit">Add Record</button>
        </div>
      </form>
    </div>
  );
}