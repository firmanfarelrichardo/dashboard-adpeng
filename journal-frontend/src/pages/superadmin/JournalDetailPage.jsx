// journal-frontend/src/pages/superadmin/JournalDetailPage.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../lib/api.js';
import { Save, ArrowLeft } from 'lucide-react';

// Komponen kecil untuk menampilkan detail agar lebih rapi
const DetailItem = ({ label, value }) => (
    <div>
        <dt className="text-sm font-medium text-gray-400">{label}</dt>
        <dd className="mt-1 text-sm text-gray-100">{value || '-'}</dd>
    </div>
);

export default function SuperadminJournalDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [status, setStatus] = useState('');
    const [oaiLink, setOaiLink] = useState('');

    useEffect(() => {
        const fetchJournal = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/admin/journals/${id}`);
                setJournal(response.data);
                setStatus(response.data.status);
                setOaiLink(response.data.oai_link || '');
                setError('');
            } catch (err) {
                setError('Gagal memuat detail jurnal.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchJournal();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/admin/journals/${id}`, {
                status: status,
                oai_link: oaiLink
            });
            alert('Perubahan berhasil disimpan!');
            navigate('/superadmin/journals');
        } catch (err) {
            alert('Gagal menyimpan perubahan.');
            console.error(err);
        }
    };

    if (loading) return <p>Memuat detail...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!journal) return <p>Data jurnal tidak ditemukan.</p>;

    return (
        <div className="space-y-8">
            <div>
                <Link to="/superadmin/journals" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-4">
                    <ArrowLeft size={16} className="mr-2" /> Kembali ke Daftar Jurnal
                </Link>
                <h1 className="text-3xl font-bold text-gray-800">Detail Jurnal</h1>
            </div>

            {/* Panel Informasi Pendaftaran */}
            <div className="bg-gray-800 text-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Informasi Pendaftaran</h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <DetailItem label="Judul Jurnal" value={journal.title} />
                    <DetailItem label="URL Jurnal" value={<a href={journal.journal_url} target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">{journal.journal_url}</a>} />
                    <DetailItem label="Institusi" value={journal.institution} />
                    <DetailItem label="Fakultas" value={journal.faculty} />
                    <DetailItem label="Nama Kontak" value={journal.contact_name} />
                    <DetailItem label="Email Kontak" value={journal.contact_email} />
                    <DetailItem label="Nama Pengelola" value={journal.user?.name} />
                    <DetailItem label="Email Pengelola" value={journal.user?.email} />
                </dl>
            </div>

            {/* Panel Aksi Admin */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Panel Kontrol</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label htmlFor="oai_link" className="block text-sm font-medium text-gray-700">Link OAI</label>
                        <input
                            type="url"
                            id="oai_link"
                            value={oaiLink}
                            onChange={(e) => setOaiLink(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            placeholder="https://.../index.php/jurnal/oai"
                        />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Ubah Status</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="needs_edit">Needs Edit</option>
                        </select>
                    </div>
                    <div className="text-right">
                        <button type="submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                            <Save className="w-5 h-5 mr-2" /> Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}