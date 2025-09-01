// src/pages/superadmin/JournalsPage.jsx
import React, { useState } from "react";

export default function SuperadminJournalsPage() {
  const [journals] = useState([
    { id: 1, title: "Jurnal A", author: "Manager A" },
    { id: 2, title: "Jurnal B", author: "Manager B" },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Semua Jurnal</h2>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Judul</th>
            <th className="p-2">Author</th>
          </tr>
        </thead>
        <tbody>
          {journals.map((j) => (
            <tr key={j.id} className="border-b">
              <td className="p-2">{j.id}</td>
              <td className="p-2">{j.title}</td>
              <td className="p-2">{j.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
