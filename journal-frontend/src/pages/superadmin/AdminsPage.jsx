// src/pages/superadmin/AdminsPage.jsx
import React, { useState } from "react";

export default function SuperadminAdminsPage() {
  const [admins, setAdmins] = useState([
    { id: 1, name: "Admin Satu", email: "admin1@mail.com" },
    { id: 2, name: "Admin Dua", email: "admin2@mail.com" },
  ]);

  const addAdmin = () => {
    const newAdmin = {
      id: admins.length + 1,
      name: `Admin ${admins.length + 1}`,
      email: `admin${admins.length + 1}@mail.com`,
    };
    setAdmins([...admins, newAdmin]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Kelola Admin</h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={addAdmin}
      >
        Tambah Admin
      </button>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Nama</th>
            <th className="p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((a) => (
            <tr key={a.id} className="border-b">
              <td className="p-2">{a.id}</td>
              <td className="p-2">{a.name}</td>
              <td className="p-2">{a.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
