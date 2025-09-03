import { useEffect, useState } from 'react';
// PERBAIKAN: Mengubah dari `import { api }` menjadi `import api` 
// karena 'api.js' menggunakan 'export default'.
import { api } from '../../lib/api.js';

export default function MyJournalsPage() {
  const [items, setItems] = useState([]);
  
  // Fungsi untuk memuat data jurnal dari API.
  const load = async () => {
    try {
      // Mengambil data dari endpoint '/my/journals'.
      const { data } = await api.get('/my/journals');
      // Menyimpan data ke dalam state 'items'.
      setItems(data);
    } catch (error) {
      // Menampilkan error di console jika gagal mengambil data.
      console.error("Gagal memuat jurnal:", error);
    }
  };

  // useEffect akan menjalankan fungsi 'load' sekali saat komponen pertama kali dirender.
  useEffect(() => {
    load();
  }, []); // Array dependensi kosong agar hanya berjalan sekali.

  // Fungsi untuk mengirim permintaan 'edit' atau 'delete' ke admin.
  const request = async (id, type) => {
    const message = prompt(`Pesan untuk ${type}? (opsional)`) || '';
    
    // Peringatan: Penggunaan 'alert' dan 'prompt' tidak disarankan di aplikasi modern.
    // Sebaiknya diganti dengan komponen modal untuk user experience yang lebih baik.
    if (message === null) { // Jika pengguna menekan 'cancel' pada prompt
      return; 
    }

    try {
      // Mengirim request POST ke API.
      await api.post(`/my/journals/${id}/request`, { type, message });
      alert('Permintaan dikirim ke admin'); // Memberi notifikasi bahwa permintaan berhasil.
      load(); // Memuat ulang data untuk menampilkan status terbaru (jika ada perubahan).
    } catch (error) {
      console.error(`Gagal mengirim permintaan ${type}:`, error);
      alert(`Gagal mengirim permintaan ${type}.`); // Notifikasi jika gagal.
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Jurnal Saya</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jurnal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map(j => (
              <tr key={j.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-semibold">{j.institution} • {j.faculty}</div>
                  <a className="text-indigo-600 hover:text-indigo-800 underline" href={j.journal_url} target="_blank" rel="noopener noreferrer">
                    {j.journal_url}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{j.status}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-4">
                  {j.status === 'draft' && 
                    <a href={`/pengelola/journals/${j.id}/preview`} className="text-indigo-600 hover:text-indigo-800 underline">
                      Preview & Submit
                    </a>
                  }
                  {j.status !== 'draft' && (
                    <>
                      <button onClick={() => request(j.id, 'edit')} className="text-blue-600 hover:text-blue-800 underline">
                        Ajukan Edit
                      </button>
                      <button onClick={() => request(j.id, 'delete')} className="text-red-600 hover:text-red-800 underline">
                        Ajukan Hapus
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
