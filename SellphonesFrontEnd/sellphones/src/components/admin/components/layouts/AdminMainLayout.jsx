import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { AdminPermissionProvider } from "../../context/AdminPermissionContext";

export default function AdminMainLayout() {
  return (
    <AdminPermissionProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <AdminHeader />
        <div
          style={{
            display: "flex",
            flex: 1,
            overflow: "hidden",
          }}
          onWheel={(e) => {
            // nếu chuột không trên main → ngăn scroll
            const main = e.currentTarget.querySelector("main");
            if (!main.contains(e.target)) {
              e.preventDefault();
            }
          }}
        >
          <AdminSidebar
            style={{
              width: 240,
              flex: "none",
              height: "100%",
              backgroundColor: "#222",
              color: "#fff",
            }}
          />
          <main
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              backgroundColor: "#fff",
            }}
          >
            <Outlet />
          </main>
        </div>
      </div>

    </AdminPermissionProvider>
  );
}

