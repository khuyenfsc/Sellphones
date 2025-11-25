import React, { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen, File, CheckSquare, Square } from "lucide-react";

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
    
    // Actions
    "View": "Xem",
    "Create": "Tạo mới",
    "Edit": "Chỉnh sửa",
    "Delete": "Xóa",
    "Cancel": "Hủy",
    "Reply": "Trả lời",
    "Dashboard": "Trang chủ"
};

// Hàm dịch
const translate = (text) => {
    return TRANSLATION_MAP[text] || text;
};

// Danh sách TẤT CẢ permissions trong hệ thống
const ALL_SYSTEM_PERMISSIONS = [
    { id: 1, name: "Dashboard", code: "DASHBOARD" },
    
    // SALES
    { id: 2, name: "Create", code: "SALES.ORDERS.CREATE" },
    { id: 3, name: "Edit", code: "SALES.ORDERS.EDIT" },
    { id: 4, name: "View", code: "SALES.ORDERS.VIEW" },
    { id: 5, name: "Cancel", code: "SALES.ORDERS.CANCEL" },
    { id: 6, name: "View", code: "SALES.SHIPMENTS.VIEW" },
    { id: 7, name: "Create", code: "SALES.SHIPMENTS.CREATE" },
    
    // CATALOG - PRODUCTS
    { id: 8, name: "View", code: "CATALOG.PRODUCTS.VIEW" },
    { id: 9, name: "Create", code: "CATALOG.PRODUCTS.CREATE" },
    { id: 10, name: "Edit", code: "CATALOG.PRODUCTS.EDIT" },
    { id: 11, name: "Delete", code: "CATALOG.PRODUCTS.DELETE" },
    
    // CATALOG - ATTRIBUTES
    { id: 12, name: "View", code: "CATALOG.ATTRIBUTES.VIEW" },
    { id: 13, name: "Create", code: "CATALOG.ATTRIBUTES.CREATE" },
    { id: 14, name: "Edit", code: "CATALOG.ATTRIBUTES.EDIT" },
    { id: 15, name: "Delete", code: "CATALOG.ATTRIBUTES.DELETE" },
    
    // CATALOG - BRANDS
    { id: 16, name: "View", code: "CATALOG.BRANDS.VIEW" },
    { id: 17, name: "Create", code: "CATALOG.BRANDS.CREATE" },
    { id: 18, name: "Edit", code: "CATALOG.BRANDS.EDIT" },
    { id: 19, name: "Delete", code: "CATALOG.BRANDS.DELETE" },
    
    // CATALOG - CATEGORIES
    { id: 20, name: "View", code: "CATALOG.CATEGORIES.VIEW" },
    { id: 21, name: "Create", code: "CATALOG.CATEGORIES.CREATE" },
    { id: 22, name: "Edit", code: "CATALOG.CATEGORIES.EDIT" },
    { id: 23, name: "Delete", code: "CATALOG.CATEGORIES.DELETE" },
    
    // CATALOG - PRODUCT_FILTERS
    { id: 24, name: "View", code: "CATALOG.PRODUCT_FILTERS.VIEW" },
    { id: 25, name: "Create", code: "CATALOG.PRODUCT_FILTERS.CREATE" },
    { id: 26, name: "Edit", code: "CATALOG.PRODUCT_FILTERS.EDIT" },
    { id: 27, name: "Delete", code: "CATALOG.PRODUCT_FILTERS.DELETE" },
    
    // CATALOG - WARRANTIES
    { id: 28, name: "View", code: "CATALOG.WARRANTIES.VIEW" },
    { id: 29, name: "Create", code: "CATALOG.WARRANTIES.CREATE" },
    { id: 30, name: "Edit", code: "CATALOG.WARRANTIES.EDIT" },
    { id: 31, name: "Delete", code: "CATALOG.WARRANTIES.DELETE" },
    
    // INVENTORY - INVENTORIES
    { id: 32, name: "View", code: "INVENTORY.INVENTORIES.VIEW" },
    { id: 33, name: "Create", code: "INVENTORY.INVENTORIES.CREATE" },
    { id: 34, name: "Edit", code: "INVENTORY.INVENTORIES.EDIT" },
    { id: 35, name: "Delete", code: "INVENTORY.INVENTORIES.DELETE" },
    
    // INVENTORY - SUPPLIERS
    { id: 36, name: "View", code: "INVENTORY.SUPPLIERS.VIEW" },
    { id: 37, name: "Create", code: "INVENTORY.SUPPLIERS.CREATE" },
    { id: 38, name: "Edit", code: "INVENTORY.SUPPLIERS.EDIT" },
    { id: 39, name: "Delete", code: "INVENTORY.SUPPLIERS.DELETE" },
    
    // INVENTORY - STOCK_ENTRIES
    { id: 40, name: "View", code: "INVENTORY.STOCK_ENTRIES.VIEW" },
    { id: 41, name: "Create", code: "INVENTORY.STOCK_ENTRIES.CREATE" },
    { id: 42, name: "Edit", code: "INVENTORY.STOCK_ENTRIES.EDIT" },
    { id: 43, name: "Delete", code: "INVENTORY.STOCK_ENTRIES.DELETE" },
    
    // INVENTORY - WAREHOUSES
    { id: 44, name: "View", code: "INVENTORY.WAREHOUSES.VIEW" },
    { id: 45, name: "Create", code: "INVENTORY.WAREHOUSES.CREATE" },
    { id: 46, name: "Edit", code: "INVENTORY.WAREHOUSES.EDIT" },
    { id: 47, name: "Delete", code: "INVENTORY.WAREHOUSES.DELETE" },
    
    // CUSTOMER - CUSTOMERS
    { id: 48, name: "View", code: "CUSTOMER.CUSTOMERS.VIEW" },
    { id: 49, name: "Create", code: "CUSTOMER.CUSTOMERS.CREATE" },
    { id: 50, name: "Edit", code: "CUSTOMER.CUSTOMERS.EDIT" },
    { id: 51, name: "Delete", code: "CUSTOMER.CUSTOMERS.DELETE" },
    
    // CUSTOMER - ADDRESSES
    { id: 52, name: "View", code: "CUSTOMER.ADDRESSES.VIEW" },
    { id: 53, name: "Create", code: "CUSTOMER.ADDRESSES.CREATE" },
    { id: 54, name: "Edit", code: "CUSTOMER.ADDRESSES.EDIT" },
    { id: 55, name: "Delete", code: "CUSTOMER.ADDRESSES.DELETE" },
    
    // CUSTOMER - REVIEWS
    { id: 56, name: "View", code: "CUSTOMER.REVIEWS.VIEW" },
    { id: 57, name: "Edit", code: "CUSTOMER.REVIEWS.EDIT" },
    { id: 58, name: "Delete", code: "CUSTOMER.REVIEWS.DELETE" },
    
    // CUSTOMER - COMMENTS
    { id: 59, name: "View", code: "CUSTOMER.COMMENTS.VIEW" },
    { id: 60, name: "Reply", code: "CUSTOMER.COMMENTS.REPLY" },
    { id: 61, name: "Edit", code: "CUSTOMER.COMMENTS.EDIT" },
    { id: 62, name: "Delete", code: "CUSTOMER.COMMENTS.DELETE" },
    
    // PROMOTIONS - PRODUCT_PROMOTIONS
    { id: 63, name: "View", code: "PROMOTIONS.PRODUCT_PROMOTIONS.VIEW" },
    { id: 64, name: "Create", code: "PROMOTIONS.PRODUCT_PROMOTIONS.CREATE" },
    { id: 65, name: "Edit", code: "PROMOTIONS.PRODUCT_PROMOTIONS.EDIT" },
    { id: 66, name: "Delete", code: "PROMOTIONS.PRODUCT_PROMOTIONS.DELETE" },
    
    // PROMOTIONS - GIFT_PRODUCTS
    { id: 67, name: "View", code: "PROMOTIONS.GIFT_PRODUCTS.VIEW" },
    { id: 68, name: "Create", code: "PROMOTIONS.GIFT_PRODUCTS.CREATE" },
    { id: 69, name: "Edit", code: "PROMOTIONS.GIFT_PRODUCTS.EDIT" },
    { id: 70, name: "Delete", code: "PROMOTIONS.GIFT_PRODUCTS.DELETE" },
    
    // PROMOTIONS - BANNERS
    { id: 71, name: "View", code: "PROMOTIONS.BANNERS.VIEW" },
    { id: 72, name: "Create", code: "PROMOTIONS.BANNERS.CREATE" },
    { id: 73, name: "Edit", code: "PROMOTIONS.BANNERS.EDIT" },
    { id: 74, name: "Delete", code: "PROMOTIONS.BANNERS.DELETE" },
    
    // SETTINGS - ROLES
    { id: 75, name: "View", code: "SETTINGS.ROLES.VIEW" },
    { id: 76, name: "Create", code: "SETTINGS.ROLES.CREATE" },
    { id: 77, name: "Edit", code: "SETTINGS.ROLES.EDIT" },
    { id: 78, name: "Delete", code: "SETTINGS.ROLES.DELETE" },
    
    // SETTINGS - USERS
    { id: 79, name: "View", code: "SETTINGS.USERS.VIEW" },
    { id: 80, name: "Create", code: "SETTINGS.USERS.CREATE" },
    { id: 81, name: "Edit", code: "SETTINGS.USERS.EDIT" },
    { id: 82, name: "Delete", code: "SETTINGS.USERS.DELETE" },
];

// Xây dựng cây permission từ ALL_SYSTEM_PERMISSIONS
const buildPermissionTree = (permissions) => {
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
    
    if (!node || !node._children || !node._permissions) {
        return null;
    }
    
    const hasChildren = Object.keys(node._children).length > 0;
    const hasPermissions = node._permissions.length > 0;

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
                    
                    <span className="text-sm text-slate-300 font-medium">{translate(nodeKey)}</span>
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
                                    <span className="text-sm text-slate-300">{translate(perm.name)}</span>
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

                {/* Nút chọn tất cả gọn */}
                <label className="flex items-center gap-1 text-sm text-slate-400 cursor-pointer">
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
        </div>
    );
};

export default PermissionsTree;
