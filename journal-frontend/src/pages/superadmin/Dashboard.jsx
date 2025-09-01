// src/pages/superadmin/Dashboard.jsx
import React, { useEffect, useState } from "react";

export default function SuperadminDashboard() {
  const [stats, setStats] = useState({
    admins: 0,
    managers: 0,
    users: 0,
    journals: 0,
  });

  useEffect(() => {
    // 🚀 Nanti ganti dengan API backend
    setStats({
      admins: 3,
      managers: 8,
      users: 120,
      journals: 45,
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Superadmin</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg capitalize">{key}</h3>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
