import React, { useState } from "react";
import { toast } from "react-toastify";
import PromotionBannerTable from "./components/PromotionBannerTable";
import CreateBannerModal from "./components/CreateBannerModal";
import AdminPromotionBannerService from "../../../service/AdminPromotionBannerService";

const AdminPromotionBannerPage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isReloaded, setIsReloaded] = useState(true);

    const handleCreate = async (bannerData, file) => {

        try {
            const res = await AdminPromotionBannerService.createBanner(bannerData, file);
            if (res.success) {
                toast.success("Tạo banner khuyến mãi thành công");
                setIsReloaded(!isReloaded);
                setIsCreateModalOpen(false);
            } else {
                toast.error(res.message || "Lỗi khi tạo banner");
            }
        } catch {
            toast.error("Lỗi khi tạo banner");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Promotion Banner</h1>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
                >
                    Thêm Banner
                </button>
            </div>

            <PromotionBannerTable isReloaded={isReloaded} />

            <CreateBannerModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreate}
            />
        </div>
    );
};

export default AdminPromotionBannerPage;
