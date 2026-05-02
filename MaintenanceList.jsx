import { useEffect, useState } from "react";

export default function MaintenanceList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const selectedId = Number(localStorage.getItem("selectedVehicleId"));

    const selectedVehicle = vehicles.find(v => v.id === selectedId);

    setRecords(selectedVehicle?.maintenance || []);
  }, []);

  const handleDelete = (index) => {
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const selectedId = Number(localStorage.getItem("selectedVehicleId"));

    const updatedVehicles = vehicles.map(v => {
      if (v.id === selectedId) {
        const updated = v.maintenance.filter((_, i) => i !== index);
        return { ...v, maintenance: updated };
      }
      return v;
    });

    localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));
    window.location.reload();
  };

  if (records.length === 0) {
    return <p>No maintenance records yet.</p>;
  }

  return (
    <div>
      <h2>Maintenance History</h2>

      {records.map((r, index) => (
        <div key={index} className="record">
          <p><strong>Service:</strong> {r.service}</p>
          <p><strong>Date:</strong> {r.date}</p>
          <p><strong>Mileage:</strong> {r.mileage}</p>
          <p><strong>Cost:</strong> ${r.cost}</p>

          <button className="delete" onClick={() => handleDelete(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}