import React from "react";

export default function RoleInfoPanel({ role, onChange }) {
    if (!role) {
        return <div className="text-slate-400">Đang tải thông tin Role...</div>;
    }

    return (
        <div className="w-80 bg-slate-900 rounded-lg p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-2">Thông tin Role</h2>

            <>
                <div className="flex flex-col gap-1">
                    <label className="text-slate-400">Tên Role:</label>
                    <input
                        value={role.name}
                        onChange={(e) => onChange("name", e.target.value)}
                        className="bg-slate-800 text-slate-200 px-3 py-2 rounded border border-slate-700"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-slate-400">Mô tả:</label>
                    <textarea
                        value={role.description}
                        onChange={(e) => onChange("description", e.target.value)}
                        className="bg-slate-800 text-slate-200 px-3 py-2 rounded border border-slate-700 h-20 resize-none"
                    />
                </div>
            </>
        </div>
    );
}
