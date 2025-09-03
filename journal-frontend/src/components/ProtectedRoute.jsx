// journal-frontend/src/components/ProtectedRoute.jsx

import { Navigate, useLocation } from 'react-router-dom';
// PERBAIKAN: Impor 'useAuth' sebagai named export.
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children, roles }) {
  // PERBAIKAN: Menggunakan hook 'useAuth' untuk memeriksa status login dan role user.
  const { user, loading } = useAuth();
  const location = useLocation();

  // Selama sesi masih divalidasi, tampilkan pesan loading.
  if (loading) {
    return <div>Memvalidasi sesi...</div>;
  }

  // Jika tidak ada user yang login, arahkan ke halaman login.
  // Simpan lokasi saat ini agar bisa kembali setelah login berhasil.
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  // Jika rute ini memerlukan role tertentu dan role user tidak cocok,
  // arahkan ke halaman yang sesuai dengan rolenya (atau halaman utama jika tidak terduga).
  if (roles && !roles.includes(user.role)) {
    // Navigasi ke halaman default berdasarkan peran pengguna
    switch(user.role) {
        case 'superadmin': return <Navigate to="/superadmin/dashboard" replace />;
        case 'admin': return <Navigate to="/admin/dashboard" replace />;
        case 'pengelola': return <Navigate to="/pengelola/my-journals" replace />;
        default: return <Navigate to="/" replace />;
    }
  }

  // Jika semua pemeriksaan lolos, tampilkan komponen anak (halaman yang dituju).
  return children;
}