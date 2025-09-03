import { useState } from 'react';
// PERBAIKAN: Mengubah impor dari '{ api }' menjadi 'api' agar sesuai dengan 'export default'.
// Juga menambahkan ekstensi '.js' untuk memastikan modul ditemukan.
import { api } from '../../lib/api.js';
import { useNavigate } from 'react-router-dom';

// Komponen untuk halaman pembuatan jurnal baru.
export default function NewJournalPage() {
  const navigate = useNavigate(); // Hook untuk navigasi.
  
  // State untuk menyimpan data form.
  const [form, setForm] = useState({
    contact_name: '',
    contact_email: '',
    institution: '',
    faculty: '',
    journal_url: ''
  });
  
  // State untuk menyimpan pesan error.
  const [error, setError] = useState('');

  // Fungsi untuk menangani perubahan pada input form.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  // Fungsi untuk menangani submit form.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman.
    setError(''); // Reset pesan error.

    try {
      // Kirim data form ke backend.
      const { data } = await api.post('/my/journals', form);
      // Jika berhasil, arahkan ke halaman preview jurnal yang baru dibuat.
      navigate(`/pengelola/journals/${data.id}/preview`);
    } catch (e) {
      // Jika gagal, tampilkan pesan error.
      setError('Pastikan semua kolom diisi dengan benar dan sesuai format.');
      console.error("Gagal mendaftarkan jurnal:", e);
    }
  };
  
  // Daftar field untuk form, agar lebih mudah dikelola.
  const formFields = [
    { name: 'contact_name', placeholder: 'Nama Kontak', type: 'text' },
    { name: 'contact_email', placeholder: 'Email Kontak', type: 'email' },
    { name: 'institution', placeholder: 'Institusi', type: 'text' },
    { name: 'faculty', placeholder: 'Fakultas', type: 'text' },
    { name: 'journal_url', placeholder: 'URL Jurnal', type: 'url' },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftarkan Jurnal Baru</h1>
        
        {/* Tampilkan pesan error jika ada */}
        {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {formFields.map(field => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 capitalize">
                {field.placeholder}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder={`Masukkan ${field.placeholder}`}
                value={form[field.name]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}
          
          <button 
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Simpan & Lihat Preview
          </button>
        </form>
      </div>
    </div>
  );
}