import React from "react";

export default function RoleInfoPanel({ role, onEdit }) {
    const formatDate = (isoString) => {
        if (!isoString) return "-";
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return (
        <div className="w-80 bg-slate-900 rounded-lg p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold mb-2">Thông tin Role</h2>
                <button
                    onClick={onEdit}
                    className="text-yellow-400 hover:text-yellow-200 transition px-2 py-1 rounded border border-yellow-400"
                >
                    Sửa
                </button>
            </div>

            {role ? (
                <>
                    <div>
                        <span className="text-slate-400">Tên Role:</span>{" "}
                        <span className="text-slate-200">{role.name}</span>
                    </div>
                    <div>
                        <span className="text-slate-400">Mô tả:</span>{" "}
                        <span className="text-slate-200">{role.description}</span>
                    </div>
                    <div>
                        <span className="text-slate-400">Ngày tạo:</span>{" "}
                        <span className="text-slate-200">{formatDate(role.createdAt)}</span>
                    </div>
                </>
            ) : (
                <div className="text-slate-400">Đang tải thông tin Role...</div>
            )}
        </div>
    );
}
