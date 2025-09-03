// journal-frontend/src/pages/admin/AdminLayout.jsx

import { Outlet, NavLink, useNavigate } from 'react-router-dom';
// PERBAIKAN: Impor 'useAuth' sebagai named export.
import { useAuth } from '../../context/AuthContext.jsx';
import { LayoutDashboard, Users, BookCopy, LogOut } from 'lucide-react';

export default function AdminLayout() {
  // PERBAIKAN: Menggunakan hook 'useAuth'.
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  
  const navLinkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors duration-200 ${
      isActive ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-200'
    }`;

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-20 flex items-center justify-center border-b">
          <h1 className="text-2xl font-bold text-indigo-600">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink to="/admin/dashboard" className={navLinkClass}>
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </NavLink>
          <NavLink to="/admin/managers" className={navLinkClass}>
            <Users className="w-5 h-5 mr-3" /> Kelola Pengelola
          </NavLink>
          <NavLink to="/admin/journals" className={navLinkClass}>
            <BookCopy className="w-5 h-5 mr-3" /> Semua Jurnal
          </NavLink>
        </nav>
        <div className="p-4 border-t border-gray-200">
           <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </aside>
      
      <main className="flex-1 overflow-y-auto bg-gray-100">
        <header className="bg-white shadow-sm p-4">
          <p className="text-gray-800">Selamat datang, <strong>{user?.name}</strong>!</p>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}