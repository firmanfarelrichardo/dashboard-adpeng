// journal-frontend/src/pages/superadmin/JournalsPage.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api.js';
import { Eye } from 'lucide-react';

// Fungsi helper untuk mendapatkan warna status
const getStatusColor = (status) => {
    switch (status) {
        case 'approved': return 'bg-green-500';
        case 'pending': return 'bg-yellow-500';
        case 'rejected': return 'bg-red-500';
        case 'needs_edit': return 'bg-blue-500';
        default: return 'bg-gray-500';
    }
};

export default function SuperadminJournalsPage() {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJournals = async () => {
            setLoading(true);
            try {
                // Mengambil data semua jurnal dari endpoint admin
                const response = await api.get('/admin/journals');
                setJournals(response.data);
                setError('');
            } catch (err) {
                setError('Gagal memuat daftar jurnal.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchJournals();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Manajemen Jurnal</h1>
            
            {error && <p className="text-red-500">{error}</p>}
            {loading ? <p>Memuat data jurnal...</p> : (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">Judul & Institusi</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">Pengelola</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">Tanggal Dibuat</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-100 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {journals.length > 0 ? journals.map((journal) => (
                            <tr key={journal.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-bold text-gray-900">{journal.title || 'Tanpa Judul'}</div>
                                    <div className="text-sm text-gray-500">{journal.institution}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{journal.user?.name || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${getStatusColor(journal.status)}`}>
                                        {journal.status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {new Date(journal.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link to={`/superadmin/journals/${journal.id}`} className="inline-flex items-center text-purple-600 hover:text-purple-900">
                                        <Eye size={18} className="mr-1" /> Periksa
                                    </Link>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500">
                                    Belum ada jurnal yang didaftarkan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
}