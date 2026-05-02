import { useEffect, useState } from "react";

export default function ReminderCard() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const selectedId = Number(localStorage.getItem("selectedVehicleId"));

    const selectedVehicle = vehicles.find((v) => v.id === selectedId);

    if (!selectedVehicle) {
      setReminders([{ text: "No vehicle selected", type: "none" }]);
      return;
    }

    const records = selectedVehicle.maintenance || [];

    const currentMileage = Number(
      selectedVehicle.mileage.toString().replace(/,/g, "")
    );

    const maintenanceRules = [
      { name: "Oil Change", icon: "🛢️", keywords: ["oil"], interval: 5000 },
      { name: "Air Filter", icon: "🌬️", keywords: ["air filter"], interval: 15000 },
      { name: "Transmission Fluid", icon: "⚙️", keywords: ["transmission fluid"], interval: 30000 },
      { name: "Coolant / Radiator", icon: "🌡️", keywords: ["coolant"], interval: 30000 },
      { name: "Spark Plugs", icon: "⚡", keywords: ["spark"], interval: 60000 },
      { name: "Valve Cover Gasket", icon: "🔧", keywords: ["valve cover"], interval: 70000 },
      { name: "Suspension", icon: "🛞", keywords: ["suspension"], interval: 50000 },
      { name: "Differential Fluid", icon: "⚙️", keywords: ["differential fluid"], interval: 30000 },
      { name: "Power Steering Fluid", icon: "🕹️", keywords: ["power steering"], interval: 30000 },
      { name: "Brakes / Rotors", icon: "🛑", keywords: ["brake pads", "brakes / rotors", "rotors"], interval: 30000 },
      { name: "Brake Fluid", icon: "💧", keywords: ["brake fluid"], interval: 30000 }
    ];

    const results = maintenanceRules.map((rule) => {
      const matches = records.filter((record) => {
        const service = record.service.toLowerCase();

        return rule.keywords.some((keyword) =>
          service.includes(keyword.toLowerCase())
        );
      });

      if (matches.length === 0) {
        return {
          text: `${rule.icon} ${rule.name}: No record`,
          type: "none"
        };
      }

      const last = matches.reduce((latest, current) => {
        const latestMileage = Number(
          latest.mileage.toString().replace(/,/g, "")
        );

        const currentMileage = Number(
          current.mileage.toString().replace(/,/g, "")
        );

        return currentMileage > latestMileage ? current : latest;
      });

      const lastMileage = Number(last.mileage.toString().replace(/,/g, ""));
      const nextDue = lastMileage + rule.interval;

      if (currentMileage >= nextDue) {
        return {
          text: `${rule.icon} ${rule.name}: OVERDUE (was due at ${nextDue.toLocaleString()} miles)`,
          type: "overdue"
        };
      } else if (currentMileage >= nextDue - 1000) {
        return {
          text: `${rule.icon} ${rule.name}: Due soon (at ${nextDue.toLocaleString()} miles)`,
          type: "soon"
        };
      } else {
        return {
          text: `${rule.icon} ${rule.name}: OK (next at ${nextDue.toLocaleString()} miles)`,
          type: "ok"
        };
      }
    });

    setReminders(results);
  }, []);

  return (
    <div className="vehicle-info">
      <h2>Maintenance Reminders</h2>

      {reminders.map((reminder, index) => (
        <p key={index} className={`reminder ${reminder.type}`}>
          {reminder.text}
        </p>
      ))}
    </div>
  );
}