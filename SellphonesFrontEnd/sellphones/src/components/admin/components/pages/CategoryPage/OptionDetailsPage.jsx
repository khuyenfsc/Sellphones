import React, { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminCategoryService from "../../../service/AdminCategoryService";
import EditOptionModal from "./components/EditOptionModal";
// import ValueTable from "./components/ValueTable";
// import CreateValueModal from "./components/CreateValueModal";

const OptionDetailsPage = () => {
  const { categoryId, optionId } = useParams();
  const navigate = useNavigate();

  const [option, setOption] = useState(null);
  const [isCreateValueModalOpen, setIsCreateValueModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReloaded, setIsReloaded] = useState(true);

  const fetchOption = async () => {
    try {
      const res = await AdminCategoryService.getOptionById(optionId);
      if (res.success) setOption(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi tải thông tin option");
    }
  };

  const handleDeleteOption = async () => {
    const result = await Swal.fire({
      title: "Xác nhận xóa",
      text: "Bạn có chắc chắn muốn xóa option này? Sau khi xóa, tất cả giá trị của nó cũng sẽ bị xóa.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        const res = await AdminCategoryService.deleteCategoryOption(optionId);
        if (res.success) {
          toast.success("Xóa option thành công!");
          navigate(`/admin/categories/view/${categoryId}`);
        } else {
          toast.error(res.message || "Xóa option thất bại");
        }
      } catch (err) {
        console.error(err);
        toast.error("Đã xảy ra lỗi khi xóa option");
      }
    }
  };

  const handleUpdateOption = async (updatedData) => {
    try {
      const res = await AdminCategoryService.updateCategoryOption(optionId, updatedData);
      if (res.success) {
        toast.success("Cập nhật option thành công!");
        setIsEditModalOpen(false);
        fetchOption();
      } else {
        toast.error(res.message || "Cập nhật option thất bại");
      }
    } catch (err) {
      console.error(err);
      toast.error("Đã xảy ra lỗi khi cập nhật option");
    }
  };

  const handleCreateValue = async (valueData) => {
    if (!valueData.name?.trim()) {
      toast.error("Tên value không được để trống");
      return;
    }

    try {
      const res = await AdminCategoryService.createOptionValue(categoryId, optionId, valueData);
      if (res.success) {
        toast.success("Tạo value thành công");
        setIsReloaded(!isReloaded);
      } else {
        toast.error(res.message || "Lỗi khi tạo value");
      }
    } catch (err) {
      console.error(err);
      toast.error("Đã xảy ra lỗi khi tạo value");
    }
  };

  useEffect(() => {
    fetchOption();
  }, [categoryId, optionId]);

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
    <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          {option ? option.name : "Chi tiết Option"}
        </h1>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
            onClick={handleDeleteOption}
          >
            <XCircle size={20} />
            <span className="text-sm font-medium">Xóa Option</span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
            onClick={() => setIsCreateValueModalOpen(true)}
          >
            Thêm Value mới
          </button>
        </div>
      </div>

      {/* Main content: Table (center) + Info (right) */}
      <div className="flex gap-6">
        {/* Center: Table hiển thị Values */}
        <div className="flex-1 bg-slate-900 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Danh sách Value</h2>
          {/* <ValueTable optionId={optionId} isReloaded={isReloaded} /> */}
          <div className="text-slate-400 italic">
            (Bảng Value sẽ được hiển thị ở đây)
          </div>
        </div>

        {/* Right: Option Info */}
        <div className="w-80 bg-slate-900 rounded-lg p-6 flex flex-col gap-4 h-fit">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Thông tin Option</h2>
            {option && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-yellow-400 hover:text-yellow-200 transition px-2 py-1 rounded border border-yellow-400"
              >
                Sửa
              </button>
            )}
          </div>

          {option ? (
            <>
              <div>
                <span className="text-slate-400">Tên:</span>{" "}
                <span className="text-slate-200">{option.name}</span>
              </div>
              <div>
                <span className="text-slate-400">Id:</span>{" "}
                <span className="text-slate-200">{option.id || "-"}</span>
              </div>
              <div>
                <span className="text-slate-400">Ngày tạo:</span>{" "}
                <span className="text-slate-200">{formatDate(option.createdAt)}</span>
              </div>
            </>
          ) : (
            <div className="text-slate-400">Đang tải thông tin Option...</div>
          )}
        </div>

      </div>

      {/* Modal thêm Value */}
      {/* <CreateValueModal
        isOpen={isCreateValueModalOpen}
        onClose={() => setIsCreateValueModalOpen(false)}
        onCreate={handleCreateValue}
      /> */}

      <EditOptionModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        option={option}
        onUpdate={handleUpdateOption}
      />
    </div>
  );
};

export default OptionDetailsPage;
