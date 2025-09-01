// src/pages/superadmin/ManagersPage.jsx
import React, { useState } from "react";

export default function SuperadminManagersPage() {
  const [managers, setManagers] = useState([
    { id: 1, name: "Manager A", email: "managerA@mail.com" },
    { id: 2, name: "Manager B", email: "managerB@mail.com" },
  ]);

  const removeManager = (id) => {
    setManagers(managers.filter((m) => m.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Kelola Pengelola</h2>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Nama</th>
            <th className="p-2">Email</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((m) => (
            <tr key={m.id} className="border-b">
              <td className="p-2">{m.id}</td>
              <td className="p-2">{m.name}</td>
              <td className="p-2">{m.email}</td>
              <td className="p-2">
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => removeManager(m.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
