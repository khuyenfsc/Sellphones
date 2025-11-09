import React, { createContext, useState, useEffect } from "react";
import AdminService from "../service/AdminService"; 

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await AdminService.getCurrentUser();
        if (res) setAdmin(res.user);
      } catch (error) {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ admin, setAdmin, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
