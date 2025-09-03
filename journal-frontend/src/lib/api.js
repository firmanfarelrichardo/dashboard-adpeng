// journal-frontend/src/lib/api.js

import axios from 'axios';

/**
 * Membuat instance Axios utama untuk seluruh aplikasi.
 * Konfigurasi ini adalah fondasi untuk komunikasi dengan backend Laravel.
 */
const apiClient = axios.create({
  // URL dasar menunjuk ke server API Laravel.
  baseURL: 'http://localhost:8000',
  // Opsi ini KRUSIAL untuk Laravel Sanctum. Ini memberitahu Axios untuk
  // secara otomatis mengirim dan menerima cookies (seperti session dan CSRF token)
  // yang diperlukan untuk autentikasi stateful.
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
  }
});

/**
 * PERBAIKAN PENTING: Menghapus Interceptor Token Manual.
 *
 * Alasan:
 * Laravel Sanctum untuk SPA (Single Page Application) tidak menggunakan Bearer Token
 * di header Authorization. Sebaliknya, ia menggunakan sistem autentikasi berbasis
 * session/cookie yang sudah ditangani secara otomatis oleh browser berkat
 * `withCredentials: true`.
 *
 * Menambahkan Bearer Token secara manual justru bisa menyebabkan konflik atau
 * masalah keamanan jika tidak dikelola dengan benar. Kita biarkan Sanctum
 * dan Axios yang menangani ini secara otomatis.
 */

/**
 * Fungsi inisialisasi untuk mengambil CSRF cookie dari Sanctum.
 * Ini adalah langkah PENTING yang harus dijalankan sebelum melakukan login
 * atau request lain yang memerlukan autentikasi. Tujuannya adalah untuk
 * melindungi aplikasi dari serangan Cross-Site Request Forgery (CSRF).
 */
const initializeCsrfCookie = () => {
  return apiClient.get('/sanctum/csrf-cookie');
};

/**
 * Mengorganisir semua fungsi API ke dalam satu objek 'api'.
 * Pola ini membuat pemanggilan di komponen menjadi lebih rapi dan terstruktur,
 * contoh: `api.auth.login()` atau `api.superadmin.getAdmins()`.
 */
export const api = {
  // Fungsi inisialisasi CSRF
  initialize: () => apiClient.get('/sanctum/csrf-cookie'),

  // --- FUNGSI AUTENTIKASI ---
  auth: {
    getUser: () => apiClient.get('/api/user'),
    login: (credentials) => apiClient.post('/api/login', credentials),
    logout: () => apiClient.post('/api/logout'),
  },

  // --- FUNGSI KHUSUS SUPERADMIN ---
  superadmin: {
    /**
     * Mengambil daftar semua admin.
     * @returns {Promise}
     */
    getAdmins: () => apiClient.get('/api/superadmin/admins'),
    
    /**
     * Membuat akun admin baru.
     * @param {object} adminData - { name, email, password }
     * @returns {Promise}
     */
    createAdmin: (adminData) => apiClient.post('/api/superadmin/admins', adminData),
    
    /**
     * Memperbarui data admin.
     * @param {number|string} id - ID admin
     * @param {object} adminData - { name, email, password? }
     * @returns {Promise}
     */
    updateAdmin: (id, adminData) => apiClient.put(`/api/superadmin/admins/${id}`, adminData),
    
    /**
     * Menghapus akun admin.
     * @param {number|string} id - ID admin
     * @returns {Promise}
     */
    deleteAdmin: (id) => apiClient.delete(`/api/superadmin/admins/${id}`),
  },

  // --- FUNGSI UNTUK ADMIN & SUPERADMIN ---
  admin: {
    // --- Manajemen Pengelola ---
    /**
     * Mengambil daftar semua pengelola.
     * @returns {Promise}
     */
    getManagers: () => apiClient.get('/api/admin/managers'),
    
    /**
     * Membuat akun pengelola baru.
     * @param {object} managerData - { name, email, password }
     * @returns {Promise}
     */
    createManager: (managerData) => apiClient.post('/api/admin/managers', managerData),
    
    /**
     * Memperbarui data pengelola.
     * @param {number|string} id - ID pengelola
     * @param {object} managerData - { name, email, password? }
     * @returns {Promise}
     */
    updateManager: (id, managerData) => apiClient.put(`/api/admin/managers/${id}`, managerData),
    
    /**
     * Menghapus akun pengelola.
     * @param {number|string} id - ID pengelola
     * @returns {Promise}
     */
    deleteManager: (id) => apiClient.delete(`/api/admin/managers/${id}`),

    // --- Manajemen Jurnal ---
    /**
     * Mengambil daftar semua jurnal dari semua pengelola.
     * @returns {Promise}
     */
    getJournals: () => apiClient.get('/api/admin/journals'),
    
    /**
     * Mengambil detail satu jurnal spesifik.
     * @param {number|string} id - ID jurnal
     * @returns {Promise}
     */
    getJournalDetail: (id) => apiClient.get(`/api/admin/journals/${id}`),
    
    /**
     * Memperbarui satu jurnal (status dan/atau link OAI).
     * PERBAIKAN: Menggabungkan update status dan link OAI menjadi satu fungsi
     * agar sesuai dengan metode PUT pada REST API.
     * @param {number|string} id - ID jurnal
     * @param {object} journalData - { status, oai_link }
     * @returns {Promise}
     */
    updateJournal: (id, journalData) => apiClient.put(`/api/admin/journals/${id}`, journalData),
  },

  // --- FUNGSI UNTUK PENGELOLA ---
  pengelola: {
    /**
     * Mengambil daftar jurnal milik pengelola yang sedang login.
     * PERBAIKAN: Menyesuaikan endpoint dari '/manager/my-journals' menjadi '/my/journals'
     * agar sesuai dengan file routes/api.php.
     * @returns {Promise}
     */
    getMyJournals: () => apiClient.get('/api/my/journals'),
    
    // ... (fungsi-fungsi lain untuk pengelola bisa ditambahkan di sini)
  },
};