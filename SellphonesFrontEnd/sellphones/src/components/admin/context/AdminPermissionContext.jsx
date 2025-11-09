import React, { createContext, useState, useEffect } from "react";
import AdminService from "../service/AdminPermissionService"; 
import AdminPermissionService from "../service/AdminPermissionService";

export const AdminPermissionContext = createContext();

export const AdminPermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPermissions = async () => {
      const res = await AdminPermissionService.getPermissions();

      if (res.success) {
        setPermissions(res.permissions || []);
      }

      setLoading(false);
    };

    fetchPermissions();
  }, []);

  return (
    <AdminPermissionContext.Provider value={{ permissions, loading }}>
      {children}
    </AdminPermissionContext.Provider>
  );
};
