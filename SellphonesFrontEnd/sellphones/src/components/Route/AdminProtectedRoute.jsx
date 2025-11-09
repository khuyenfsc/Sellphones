// src/components/AdminProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../admin/context/AdminAuthContext";
export default function AdminProtectedRoute({ children }) {

  const { admin, loading } = useContext(AdminAuthContext);
  if (loading) return <div>Đang tải...</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;
  // if (user.role?.roleName !== "ADMIN") return <Navigate to="/notfound" replace />;

  return children;
}
