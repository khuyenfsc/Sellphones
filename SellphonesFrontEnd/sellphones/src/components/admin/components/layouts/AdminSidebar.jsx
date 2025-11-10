import React, { useContext, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { AdminPermissionContext } from "../../context/AdminPermissionContext";
import { labelMap } from "../../../../constans/PermissionLabels";

const AdminSidebar = () => {
  const { permissions, loading } = useContext(AdminPermissionContext);
  const [openModule, setOpenModule] = useState(null);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  if (loading) {
    return (
      <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
        <span>Đang tải quyền...</span>
      </aside>
    );
  }

  const handleMouseEnter = (moduleName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenModule(moduleName);
  };

  const handleMouseLeave = () => {
    // delay 150ms để tránh biến mất ngay khi di chuyển chuột sang dropdown
    timeoutRef.current = setTimeout(() => setOpenModule(null), 150);
  };

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col shadow-lg">
      <div className="px-6 py-4 text-xl font-semibold border-b border-gray-700">
        AdminPanel
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {permissions.map((module) => (
          <div
            key={module.name}
            className="relative"
            onMouseEnter={() => handleMouseEnter(module.name)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Module cấp 1 */}
            <div
              className="flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-800"
              onClick={() => {
                if (module.name === "DASHBOARD") navigate("/admin/dashboard");
              }}
            >
              <span className="font-medium">{labelMap[module.name] || module.name}</span>
              {module.childPermissions.length > 0 && (
                <ChevronRight
                  size={18}
                  className={`transition-transform ${
                    openModule === module.name ? "rotate-90" : ""
                  }`}
                />
              )}
            </div>

            {/* Dropdown cấp 2 */}
            {module.childPermissions.length > 0 && openModule === module.name && (
              <div className="absolute left-full top-0 ml-1 w-48 bg-gray-800 rounded-lg shadow-lg z-50">
                {module.childPermissions.map((component) => (
                  <NavLink
                    key={component.name}
                    to={`/admin/${component.name.toLowerCase()}`}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded hover:bg-gray-700 ${
                        isActive ? "bg-gray-700" : ""
                      }`
                    }
                  >
                    {labelMap[component.name] || component.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
