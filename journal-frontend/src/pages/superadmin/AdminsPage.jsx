// journal-frontend/src/pages/superadmin/AdminsPage.jsx

import { useState, useEffect } from 'react';
import { api } from '../../lib/api.js';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminsPage() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAdmin, setCurrentAdmin] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const fetchAdmins = async () => {
        setLoading(true);
        try {
            const response = await api.get('/superadmin/admins');
            setAdmins(response.data);
            setError('');
        } catch (err) {
            setError('Gagal memuat data admin.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const openModalForCreate = () => {
        setCurrentAdmin(null);
        setFormData({ name: '', email: '', password: '' });
        setIsModalOpen(true);
    };

    const openModalForEdit = (admin) => {
        setCurrentAdmin(admin);
        setFormData({ name: admin.name, email: admin.email, password: '' });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentAdmin(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...formData };
        if (!payload.password) delete payload.password;

        try {
            if (currentAdmin) {
                await api.put(`/superadmin/admins/${currentAdmin.id}`, payload);
            } else {
                await api.post('/superadmin/admins', payload);
            }
            fetchAdmins();
            closeModal();
        } catch (err) {
            alert('Operasi gagal. Pastikan email unik dan password diisi untuk admin baru.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus permanen admin ini?')) {
            try {
                await api.delete(`/superadmin/admins/${id}`);
                fetchAdmins();
            } catch (err) {
                alert('Gagal menghapus admin.');
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Manajemen Admin</h1>
                <button onClick={openModalForCreate} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    <Plus className="w-5 h-5 mr-2" /> Tambah Admin
                </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {loading ? <p>Loading data...</p> : (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">Nama</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-100 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-100 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {admins.map(admin => (
                            <tr key={admin.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{admin.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                    <button onClick={() => openModalForEdit(admin)} className="text-purple-600 hover:text-purple-900"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(admin.id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-5">{currentAdmin ? 'Edit Admin' : 'Tambah Admin Baru'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder={currentAdmin ? 'Kosongkan jika tidak ingin mengubah' : ''} required={!currentAdmin} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
                            </div>
                            <div className="flex justify-end space-x-3 pt-4">
                                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Batal</button>
                                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}