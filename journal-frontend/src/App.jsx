// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import LoginPage from "./pages/LoginPage";

// Admin
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import ManagersPage from "./pages/admin/ManagersPage";
import JournalsAdminPage from "./pages/admin/JournalsPage";

// Pengelola
import PengelolaLayout from "./pages/pengelola/PengelolaLayout";
import PengelolaDashboard from "./pages/pengelola/Dashboard";
import MyJournalsPage from "./pages/pengelola/MyJournalsPage";
import NewJournalPage from "./pages/pengelola/NewJournalPage";
import PreviewJournalPage from "./pages/pengelola/PreviewJournalPage";

// Superadmin
import SuperadminLayout from "./pages/superadmin/SuperadminLayout";
import SuperadminDashboard from "./pages/superadmin/Dashboard";
import SuperadminAdminsPage from "./pages/superadmin/AdminsPage";
import SuperadminManagersPage from "./pages/superadmin/ManagersPage";
import SuperadminJournalsPage from "./pages/superadmin/JournalsPage";
import UsersPage from "./pages/superadmin/UsersPage";

// Komponen proteksi route
const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <Routes>
      {/* Login default */}
      <Route path="/" element={<LoginPage />} />

      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute role="admin">
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="managers" element={<ManagersPage />} />
        <Route path="journals" element={<JournalsAdminPage />} />
      </Route>

      {/* Pengelola routes */}
      <Route
        path="/pengelola/*"
        element={
          <PrivateRoute role="pengelola">
            <PengelolaLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<PengelolaDashboard />} />
        <Route path="my-journals" element={<MyJournalsPage />} />
        <Route path="new-journal" element={<NewJournalPage />} />
        <Route path="preview/:id" element={<PreviewJournalPage />} />
      </Route>

      {/* Superadmin routes */}
      <Route
      path="/superadmin/*"
      element={
        <PrivateRoute role="superadmin">
          <SuperadminLayout />
        </PrivateRoute>
      }
    >
      <Route path="dashboard" element={<SuperadminDashboard />} />
      <Route path="admins" element={<SuperadminAdminsPage />} />
      <Route path="managers" element={<SuperadminManagersPage />} />
      <Route path="journals" element={<SuperadminJournalsPage />} />
      <Route path="users" element={<UsersPage />} />
    </Route>

      {/* 404 */}
      <Route
        path="*"
        element={
          <div style={{ padding: "2rem" }}>
            <h1>404 - Page Not Found 😢</h1>
          </div>
        }
      />
    </Routes>
  );
}
