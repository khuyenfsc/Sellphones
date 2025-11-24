import React, { useState } from "react";
import { Save, ChevronRight, ChevronDown, Folder, FolderOpen, File } from "lucide-react";

// Xây dựng cây permission từ mảng permissions
const buildPermissionTree = (permissions) => {
    if (!permissions || !Array.isArray(permissions)) {
        return {};
    }
    
    const tree = {};
    permissions.forEach((p) => {
        if (!p || !p.code) return;
        
        const parts = p.code.split(".");
        let current = tree;

        parts.forEach((part, idx) => {
            if (!current[part]) {
                current[part] = { 
                    _children: {}, 
                    _permissions: [],
                    _name: part
                };
            }
            if (idx === parts.length - 1) {
                current[part]._permissions.push({ ...p });
            }
            current = current[part]._children;
        });
    });
    return tree;
};

// Node cây với khả năng mở/đóng
const PermissionNode = ({ nodeKey, node, selectedPermissions, togglePermission, level = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    
    // Kiểm tra an toàn trước khi truy cập
    if (!node || !node._children || !node._permissions) {
        return null;
    }
    
    const hasChildren = Object.keys(node._children).length > 0;
    const hasPermissions = node._permissions.length > 0;

    return (
        <div className="select-none">
            <div className="flex items-center gap-1 py-1 hover:bg-slate-800 rounded px-1">
                {hasChildren && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-4 h-4 flex items-center justify-center hover:bg-slate-700 rounded"
                    >
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                )}
                {!hasChildren && <div className="w-4" />}
                
                <div className="flex items-center gap-2 flex-1">
                    {hasChildren ? (
                        isExpanded ? <FolderOpen size={16} className="text-blue-400" /> : <Folder size={16} className="text-blue-400" />
                    ) : (
                        <File size={16} className="text-slate-500" />
                    )}
                    
                    <span className="text-sm text-slate-300 font-medium">{nodeKey}</span>
                </div>
            </div>

            {isExpanded && (
                <>
                    {hasPermissions && (
                        <div className="pl-9 flex flex-wrap gap-3 py-1">
                            {node._permissions.map((perm) => (
                                <label key={perm.id} className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedPermissions.includes(perm.id)}
                                        onChange={() => togglePermission(perm.id)}
                                        className="w-4 h-4 accent-blue-500"
                                    />
                                    <span className="text-sm text-slate-300">{perm.name}</span>
                                </label>
                            ))}
                        </div>
                    )}
                    
                    {hasChildren && (
                        <div className="pl-5 border-l border-slate-700 ml-2">
                            {Object.keys(node._children).map((key) => (
                                <PermissionNode
                                    key={key}
                                    nodeKey={key}
                                    node={node._children[key]}
                                    selectedPermissions={selectedPermissions}
                                    togglePermission={togglePermission}
                                    level={level + 1}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

// Component chính PermissionsTree
const PermissionsTree = ({ permissions, selectedPermissions, togglePermission, onSave }) => {
    const displayTree = buildPermissionTree(permissions || []);

    return (
        <div className="bg-slate-800 rounded-lg shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-100">Permissions Management</h2>
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition text-white font-medium"
                    onClick={onSave}
                >
                    <Save size={18} />
                    <span>Save Changes</span>
                </button>
            </div>

            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                {Object.keys(displayTree).length > 0 ? (
                    Object.keys(displayTree).map((key) => (
                        <PermissionNode
                            key={key}
                            nodeKey={key}
                            node={displayTree[key]}
                            selectedPermissions={selectedPermissions || []}
                            togglePermission={togglePermission}
                        />
                    ))
                ) : (
                    <div className="text-slate-400 text-center py-8">No permissions available</div>
                )}
            </div>
        </div>
    );
};

export default PermissionsTree;