// journal-frontend/src/App.jsx

import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Layouts
import SuperadminLayout from './pages/superadmin/SuperadminLayout';
import AdminLayout from './pages/admin/AdminLayout';
import PengelolaLayout from './pages/pengelola/PengelolaLayout';

// Superadmin Pages
import SuperadminDashboard from './pages/superadmin/Dashboard';
import AdminsPage from './pages/superadmin/AdminsPage'; // Halaman baru
import SuperadminManagersPage from './pages/superadmin/ManagersPage';
import SuperadminJournalsPage from './pages/superadmin/JournalsPage';
import SuperadminJournalDetailPage from './pages/superadmin/JournalDetailPage'; // Halaman baru

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminManagersPage from './pages/admin/ManagersPage';
import AdminJournalsPage from './pages/admin/JournalsPage';
import AdminJournalDetailPage from './pages/admin/JournalDetailPage'; // Halaman baru

// Pengelola Pages
import PengelolaDashboard from './pages/pengelola/Dashboard';
import MyJournalsPage from './pages/pengelola/MyJournalsPage';
import NewJournalPage from './pages/pengelola/NewJournalPage';
import PreviewJournalPage from './pages/pengelola/PreviewJournalPage';

function App() {
  // PERBAIKAN: Komponen <Router> yang sebelumnya membungkus <Routes> telah dihapus.
  // Sekarang komponen ini hanya me-return <Routes> secara langsung.
  return (
      <Routes>
        {/* Rute publik untuk halaman login */}
        <Route path="/" element={<LoginPage />} />

        {/* === RUTE UNTUK SUPERADMIN === */}
        <Route 
          path="/superadmin" 
          element={<ProtectedRoute roles={['superadmin']}><SuperadminLayout /></ProtectedRoute>}
        >
          <Route path="dashboard" element={<SuperadminDashboard />} />
          <Route path="admins" element={<AdminsPage />} />
          <Route path="managers" element={<SuperadminManagersPage />} />
          <Route path="journals" element={<SuperadminJournalsPage />} />
          <Route path="journals/:id" element={<SuperadminJournalDetailPage />} />
        </Route>

        {/* === RUTE UNTUK ADMIN === */}
        <Route 
          path="/admin" 
          element={<ProtectedRoute roles={['admin', 'superadmin']}><AdminLayout /></ProtectedRoute>}
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="managers" element={<AdminManagersPage />} />
          <Route path="journals" element={<AdminJournalsPage />} />
          <Route path="journals/:id" element={<AdminJournalDetailPage />} />
        </Route>

        {/* === RUTE UNTUK PENGELOLA === */}
        <Route 
          path="/pengelola" 
          element={<ProtectedRoute roles={['pengelola']}><PengelolaLayout /></ProtectedRoute>}
        >
          <Route path="dashboard" element={<PengelolaDashboard />} />
          <Route path="my-journals" element={<MyJournalsPage />} />
          <Route path="new-journal" element={<NewJournalPage />} />
          <Route path="journals/:id/preview" element={<PreviewJournalPage />} />
        </Route>
      </Routes>
  );
}

export default App;