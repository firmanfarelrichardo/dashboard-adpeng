// journal-frontend/src/context/AuthContext.jsx

import { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../lib/api.js';

// Buat context untuk autentikasi
const AuthContext = createContext();

// Buat hook kustom untuk mempermudah penggunaan context
export const useAuth = () => {
    return useContext(AuthContext);
};

// Buat provider yang akan membungkus aplikasi
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state untuk validasi sesi awal

    // Efek ini berjalan sekali saat aplikasi dimuat untuk memeriksa
    // apakah sudah ada sesi yang valid di server (misalnya setelah refresh).
    useEffect(() => {
        const validateSession = async () => {
            try {
                // Mencoba mengambil data user dari endpoint '/api/user'
                const response = await api.auth.getUser();
                setUser(response.data); // Jika berhasil, set data user
            } catch (error) {
                // Jika gagal (misal, session expired), pastikan user null
                setUser(null);
                console.log("Sesi tidak valid atau belum login.");
            } finally {
                // Selesaikan proses loading
                setLoading(false);
            }
        };
        
        validateSession();
    }, []); // Array dependensi kosong berarti hanya berjalan sekali

    /**
     * Fungsi untuk menangani proses login.
     * @param {object} credentials - { email, password }
     * @returns {Promise<object>} - Data user yang berhasil login
     */
    const login = async (credentials) => {
        try {
            // 1. Langkah pertama dan paling penting untuk Sanctum: ambil CSRF cookie.
            await api.initialize();
            
            // 2. Kirim kredensial ke endpoint login.
            // Backend sekarang akan mengembalikan data user jika berhasil.
            const response = await api.auth.login(credentials);
            
            // 3. Set state user dengan data yang dikembalikan dari backend.
            setUser(response.data);
            
            // 4. Kembalikan data user ke komponen LoginPage untuk navigasi.
            return response.data;
        } catch (error) {
            console.error("Proses login gagal:", error);
            // Lempar kembali error agar bisa ditangani di LoginPage
            throw error;
        }
    };

    /**
     * Fungsi untuk menangani proses logout.
     */
    const logout = async () => {
        try {
            // Kirim permintaan logout ke server
            await api.auth.logout();
        } catch (error) {
            // Jika ada error di server, tetap hapus sesi di sisi klien
            console.error("Logout di server gagal, sesi lokal tetap dihapus.", error);
        } finally {
            // Hapus data user dari state
            setUser(null);
        }
    };
    
    // Nilai yang akan disediakan oleh context
    const value = { user, login, logout, loading };

    return (
        <AuthContext.Provider value={value}>
            {/* Tampilkan anak komponen hanya setelah validasi sesi selesai */}
            {!loading && children}
        </AuthContext.Provider>
    );
};