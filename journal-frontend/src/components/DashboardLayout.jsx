import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout({ role }) {
  const menus = {
    admin: [
      { path: "/admin/dashboard", label: "Dashboard" },
      { path: "/admin/managers", label: "Kelola Pengelola" },
      { path: "/admin/journals", label: "Kelola Jurnal" },
    ],
    superadmin: [
      { path: "/superadmin/dashboard", label: "Dashboard" },
      { path: "/superadmin/admins", label: "Kelola Admin" },
      { path: "/superadmin/managers", label: "Kelola Pengelola" },
      { path: "/superadmin/journals", label: "Kelola Jurnal" },
      { path: "/superadmin/users", label: "Kelola Semua User" }, // ekstra fitur superadmin
    ],
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="p-6 font-bold text-xl capitalize">
          {role} Panel
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {menus[role].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded ${
                  isActive ? "bg-blue-900" : "hover:bg-blue-800"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
