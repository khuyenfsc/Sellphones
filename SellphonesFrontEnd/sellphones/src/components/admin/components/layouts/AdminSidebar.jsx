import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { AdminPermissionContext } from "../../context/AdminPermissionContext";
import { labelMap } from "../../../../constans/PermissionLabels";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
    const { permissions, loading } = useContext(AdminPermissionContext);
    const [hoveredModule, setHoveredModule] = useState(null);
    const navigate = useNavigate();

    if (loading) {
        return (
            <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
                <span>Đang tải quyền...</span>
            </aside>
        );
    }

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
                        onMouseEnter={() => setHoveredModule(module.name)}
                        onMouseLeave={() => setHoveredModule(null)}
                    >
                        {/* Cấp 1: Module */}
                        <div
                            className="flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-800"
                            onClick={() => {
                                if (module.name === "DASHBOARD") navigate("/admin/dashboard");
                            }}
                        >
                            <span className="font-medium">
                                {labelMap[module.name] || module.name}
                            </span>
                            {module.childPermissions.length > 0 && (
                                <ChevronRight
                                    size={18}
                                    className={`transition-transform ${hoveredModule === module.name ? "rotate-90" : ""
                                        }`}
                                />
                            )}
                        </div>

                        {/* Dropdown cấp 2: Component */}
                        {hoveredModule === module.name &&
                            module.childPermissions.length > 0 && (
                                <div className="absolute left-full top-0 ml-1 w-48 bg-gray-800 rounded-lg shadow-lg z-50">
                                    {module.childPermissions.map((component) => (
                                        <NavLink
                                            key={component.name}
                                            to={`/admin/${component.name.toLowerCase()}`}
                                            className={({ isActive }) =>
                                                `block px-4 py-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""
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