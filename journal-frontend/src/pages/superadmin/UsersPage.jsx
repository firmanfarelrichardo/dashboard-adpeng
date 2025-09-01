// src/pages/superadmin/UsersPage.jsx
import React, { useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "User A", active: true },
    { id: 2, name: "User B", active: false },
  ]);

  const toggleUser = (id) => {
    setUsers(users.map(u =>
      u.id === id ? { ...u, active: !u.active } : u
    ));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Kelola Users</h2>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Nama</th>
            <th className="p-2">Status</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.active ? "Aktif" : "Suspend"}</td>
              <td className="p-2">
                <button
                  className={`px-3 py-1 rounded ${
                    u.active ? "bg-red-600" : "bg-green-600"
                  } text-white`}
                  onClick={() => toggleUser(u.id)}
                >
                  {u.active ? "Suspend" : "Aktifkan"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
