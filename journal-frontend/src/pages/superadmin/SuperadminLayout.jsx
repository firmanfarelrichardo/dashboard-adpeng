// journal-frontend/src/pages/superadmin/SuperadminLayout.jsx

import { Outlet, NavLink, useNavigate } from 'react-router-dom';
// PERBAIKAN: Impor 'useAuth' sebagai named export, bukan default.
import { useAuth } from '../../context/AuthContext.jsx';
import { ShieldCheck, Users, BookOpen, LogOut } from 'lucide-react'; 

export default function SuperadminLayout() {
  // PERBAIKAN: Menggunakan hook 'useAuth' untuk mengakses data user dan fungsi logout.
  // Ini lebih ringkas dan best practice daripada menggunakan useContext secara langsung.
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 text-gray-200 rounded-lg transition-colors duration-200 ${
      isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <div className="flex h-screen bg-gray-200">
      <aside className="w-64 flex-shrink-0 bg-gray-800 text-gray-100 flex flex-col">
        <div className="h-20 flex items-center justify-center bg-gray-900">
          <h1 className="text-2xl font-bold text-white">Superadmin</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink to="/superadmin/dashboard" className={navLinkClass}>
            <ShieldCheck className="w-5 h-5 mr-3" /> Dashboard
          </NavLink>
          <NavLink to="/superadmin/admins" className={navLinkClass}>
            <Users className="w-5 h-5 mr-3" /> Kelola Admin
          </NavLink>
          <NavLink to="/superadmin/managers" className={navLinkClass}>
            <Users className="w-5 h-5 mr-3" /> Kelola Pengelola
          </NavLink>
          <NavLink to="/superadmin/journals" className={navLinkClass}>
            <BookOpen className="w-5 h-5 mr-3" /> Semua Jurnal
          </NavLink>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-gray-200 rounded-lg hover:bg-red-700 hover:text-white transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-100">
        <header className="bg-white shadow-sm p-4">
          <p className="text-gray-700">Login sebagai: <strong>{user?.name}</strong> ({user?.email})</p>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}