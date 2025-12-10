import React, { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen, File } from "lucide-react";

// Ánh xạ tiếng Anh sang tiếng Việt
const TRANSLATION_MAP = {
    // Modules
    "DASHBOARD": "Trang chủ",
    "SALES": "Bán hàng",
    "CATALOG": "Danh mục",
    "INVENTORY": "Kho hàng",
    "CUSTOMER": "Khách hàng",
    "PROMOTIONS": "Khuyến mãi",
    "SETTINGS": "Cài đặt",
    
    // Sub-modules
    "ORDERS": "Đơn hàng",
    "SHIPMENTS": "Vận chuyển",
    "PRODUCTS": "Sản phẩm",
    "ATTRIBUTES": "Thuộc tính",
    "BRANDS": "Thương hiệu",
    "CATEGORIES": "Danh mục",
    "PRODUCT_FILTERS": "Bộ lọc sản phẩm",
    "WARRANTIES": "Bảo hành",
    "INVENTORIES": "Tồn kho",
    "SUPPLIERS": "Nhà cung cấp",
    "STOCK_ENTRIES": "Nhập kho",
    "WAREHOUSES": "Kho",
    "CUSTOMERS": "Khách hàng",
    "ADDRESSES": "Địa chỉ",
    "REVIEWS": "Đánh giá",
    "COMMENTS": "Bình luận",
    "PRODUCT_PROMOTIONS": "Khuyến mãi sản phẩm",
    "GIFT_PRODUCTS": "Sản phẩm quà tặng",
    "BANNERS": "Banner",
    "ROLES": "Vai trò",
    "USERS": "Người dùng",
    "Dashboard": "Trang chủ"
};

// Hàm dịch
const translate = (text) => {
    return TRANSLATION_MAP[text] || text;
};

// Danh sách permissions đã rút gọn
const ALL_SYSTEM_PERMISSIONS = [
    { id: 1, name: "Dashboard", code: "DASHBOARD" },
    { id: 2, name: "Orders", code: "SALES.ORDERS" },
    { id: 3, name: "Shipments", code: "SALES.SHIPMENTS" },
    { id: 4, name: "Products", code: "CATALOG.PRODUCTS" },
    { id: 5, name: "Attributes", code: "CATALOG.ATTRIBUTES" },
    { id: 6, name: "Brands", code: "CATALOG.BRANDS" },
    { id: 7, name: "Categories", code: "CATALOG.CATEGORIES" },
    { id: 8, name: "Warranties", code: "CATALOG.WARRANTIES" },
    { id: 9, name: "Suppliers", code: "INVENTORY.SUPPLIERS" },
    { id: 10, name: "Warehouses", code: "INVENTORY.WAREHOUSES" },
    { id: 11, name: "Customers", code: "CUSTOMER.CUSTOMERS" },
    { id: 12, name: "Reviews", code: "CUSTOMER.REVIEWS" },
    { id: 13, name: "Comments", code: "CUSTOMER.COMMENTS" },
    { id: 14, name: "Product promotions", code: "PROMOTIONS.PRODUCT_PROMOTIONS" },
    { id: 15, name: "Gift products", code: "PROMOTIONS.GIFT_PRODUCTS" },
    { id: 16, name: "Banners", code: "PROMOTIONS.BANNERS" },
    { id: 17, name: "Roles", code: "SETTINGS.ROLES" },
    { id: 18, name: "Users", code: "SETTINGS.USERS" },
];


// Xây dựng cây permission từ ALL_SYSTEM_PERMISSIONS
const buildPermissionTree = (permissions) => {
    const tree = {};
    permissions.forEach((p) => {
        if (!p || !p.code) return;
        
        const parts = p.code.split(".");
        
        // Nếu chỉ có 1 phần (như DASHBOARD), thêm trực tiếp vào root
        if (parts.length === 1) {
            tree[parts[0]] = {
                _permission: p,
                _children: {},
                _name: parts[0]
            };
            return;
        }
        
        // Nếu có nhiều phần, xây dựng cây
        let current = tree;
        parts.forEach((part, idx) => {
            if (!current[part]) {
                current[part] = { 
                    _children: {}, 
                    _permission: null,
                    _name: part
                };
            }
            
            // Nếu là phần cuối cùng, gán permission
            if (idx === parts.length - 1) {
                current[part]._permission = p;
            }
            
            current = current[part]._children;
        });
    });
    return tree;
};

// Node cây với khả năng mở/đóng
const PermissionNode = ({ nodeKey, node, selectedPermissions, togglePermission, level = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    
    if (!node) return null;
    
    const hasChildren = Object.keys(node._children).length > 0;
    const hasPermission = node._permission !== null;

    return (
        <div className="select-none">
            <div className="flex items-center gap-1 py-1 hover:bg-slate-800 rounded px-1">
                {hasChildren ? (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-4 h-4 flex items-center justify-center hover:bg-slate-700 rounded"
                    >
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                ) : (
                    <div className="w-4" />
                )}

                <div className="flex items-center gap-2 flex-1">
                    {hasChildren ? (
                        isExpanded ? <FolderOpen size={16} className="text-blue-400" /> : <Folder size={16} className="text-blue-400" />
                    ) : (
                        <File size={16} className="text-slate-500" />
                    )}
                    
                    {hasPermission ? (
                        <label className="flex items-center gap-2 cursor-pointer flex-1">
                            <input
                                type="checkbox"
                                checked={selectedPermissions.includes(node._permission.id)}
                                onChange={() => togglePermission(node._permission.id)}
                                className="w-4 h-4 accent-blue-500"
                            />
                            <span className="text-sm text-slate-300 font-medium">{translate(nodeKey)}</span>
                        </label>
                    ) : (
                        <span className="text-sm text-slate-300 font-medium">{translate(nodeKey)}</span>
                    )}
                </div>
            </div>

            {isExpanded && hasChildren && (
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
        </div>
    );
};

const PermissionsTree = ({ selectedPermissions = [], togglePermission }) => {
    const displayTree = buildPermissionTree(ALL_SYSTEM_PERMISSIONS);

    // Chọn/Bỏ chọn tất cả permissions
    const handleSelectAll = (shouldSelect) => {
        ALL_SYSTEM_PERMISSIONS.forEach(p => {
            const isCurrentlySelected = selectedPermissions.includes(p.id);
            if (shouldSelect && !isCurrentlySelected) {
                togglePermission(p.id);
            } else if (!shouldSelect && isCurrentlySelected) {
                togglePermission(p.id);
            }
        });
    };

    const isAllSelected = selectedPermissions.length === ALL_SYSTEM_PERMISSIONS.length;

    return (
        <div className="bg-slate-800 rounded-lg shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-100">Quản lý quyền</h2>

                <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={() => handleSelectAll(!isAllSelected)}
                        className="w-4 h-4 accent-blue-500"
                    />
                    <span>{isAllSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}</span>
                </label>
            </div>

            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 max-h-[600px] overflow-y-auto">
                {Object.keys(displayTree).map((key) => (
                    <PermissionNode
                        key={key}
                        nodeKey={key}
                        node={displayTree[key]}
                        selectedPermissions={selectedPermissions}
                        togglePermission={togglePermission}
                    />
                ))}
            </div>

            <div className="mt-4 p-3 bg-slate-700 rounded text-sm text-slate-300">
                <strong>Đã chọn:</strong> {selectedPermissions.length} / {ALL_SYSTEM_PERMISSIONS.length} quyền
            </div>
        </div>
    );
};

export default PermissionsTree;