// src/pages/superadmin/SuperadminLayout.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function SuperadminLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
        <h1 className="text-xl font-bold mb-6">Superadmin Panel</h1>
        <nav className="flex flex-col gap-3">
          <NavLink to="/superadmin/dashboard" className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
          }>
            Dashboard
          </NavLink>
          <NavLink to="/superadmin/admins" className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
          }>
            Kelola Admin
          </NavLink>
          <NavLink to="/superadmin/managers" className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
          }>
            Kelola Pengelola
          </NavLink>
          <NavLink to="/superadmin/journals" className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
          }>
            Semua Jurnal
          </NavLink>
          <NavLink to="/superadmin/users" className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
          }>
            Users
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
