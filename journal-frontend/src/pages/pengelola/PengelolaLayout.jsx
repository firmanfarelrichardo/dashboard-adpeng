import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PengelolaLayout(){
  const { logout } = useAuth();
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="bg-indigo-900 text-white p-4 space-y-3">
        <nav className="flex flex-col gap-2">
          <Link to="/pengelola">Dashboard</Link>
          <Link to="/pengelola/journals">Daftar Jurnal</Link>
          <Link to="/pengelola/journals/new">Daftarkan Jurnal</Link>
          <button onClick={logout} className="text-left mt-4 opacity-80 hover:opacity-100">Logout</button>
        </nav>
      </aside>
      <main className="p-6 bg-gray-50"><Outlet/></main>
    </div>
  )
}
