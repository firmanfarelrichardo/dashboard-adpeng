// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const u = localStorage.getItem("user");
      const t = localStorage.getItem("token");
      if (u && t) {
        setUser(JSON.parse(u));
        setToken(t);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Login gagal");

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // redirect berdasarkan role
      if (data.user.role === "superadmin") navigate("/superadmin", { replace: true });
      else if (data.user.role === "admin") navigate("/admin", { replace: true });
      else if (data.user.role === "pengelola") navigate("/pengelola", { replace: true });
      else navigate("/login", { replace: true });

      return true;
    } catch (e) {
      console.error("login error:", e);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const value = { user, token, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Export default AuthProvider (so imports like `import AuthProvider from "...";` work)
export default AuthProvider;
