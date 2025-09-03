// journal-frontend/src/context/AuthContext.jsx

import { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../lib/api.js';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateSession = async () => {
            try {
                const response = await api.auth.getUser();
                setUser(response.data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        
        validateSession();
    }, []);

    const login = async (credentials) => {
        try {
            await api.initialize(); // Ambil CSRF cookie
            await api.auth.login(credentials); // Lakukan login
            const userResponse = await api.auth.getUser(); // Ambil data user
            setUser(userResponse.data);
            return userResponse.data;
        } catch (error) {
            console.error("Proses login gagal:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.auth.logout();
        } catch (error) {
            console.error("Logout di server gagal, sesi lokal tetap dihapus.", error);
        } finally {
            setUser(null);
        }
    };
    
    const value = { user, login, logout, loading };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};