// src/components/SelectableCustomerAddressList.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Plus, MapPin, Pencil, Trash2 } from "lucide-react";
import AddAddressModal from "../../UserDashboard/components/AddAddressModel";
import CustomerInfoFormModal from "../../UserDashboard/components/CustomerInfoFormModal";
import { motion, AnimatePresence } from "framer-motion";
import CustomerInfoService from "../../../../service/CustomerInfoService";
import { toast } from "react-toastify";

export default function SelectableCustomerAddressList({
  loading,
  customerInfos,
  setCustomerInfos,
  selectedCustomer,
  setSelectedCustomer, // ✅ callback để parent biết customer nào được chọn
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    dateOfBirth: null,
  });

  const handleAddAddress = () => setIsAdding(true);

  const handleCloseForm = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      fullName: "",
      phone: "",
      address: "",
      ward: "",
      district: "",
      city: "",
      dateOfBirth: null,
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!validate()) return;

    const formattedData = {
      fullName: formData.fullName,
      phoneNumber: formData.phone,
      dateOfBirth: formData.dateOfBirth
        ? `${formData.dateOfBirth.getFullYear()}-${String(
          formData.dateOfBirth.getMonth() + 1
        ).padStart(2, "0")}-${String(formData.dateOfBirth.getDate()).padStart(2, "0")}`
        : "",
      address: {
        street: formData.address,
        ward: formData.ward,
        district: formData.district,
        province: formData.city,
      },
    };

    try {
      setIsSaving(true);
      const res = await CustomerInfoService.createCustomerInfo(formattedData);
      if (res.success) {
        toast.success("Đã thêm địa chỉ mới!");

        const updatedList = await CustomerInfoService.getCustomerInfos();
        if (updatedList.success) setCustomerInfos(updatedList.data);

        handleCloseForm();
      } else {
        toast.error(res.message || "Lỗi khi thêm địa chỉ");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi hệ thống!");
    } finally{
        setIsSaving(false);
    }
  };

  const handleEdit = (info) => {
    setEditingId(info.id);
    setFormData({
      fullName: info.fullName,
      phone: info.phoneNumber,
      address: info.address.street,
      ward: info.address.ward,
      district: info.address.district,
      city: info.address.province,
      dateOfBirth: info.dateOfBirth ? new Date(info.dateOfBirth) : null,
    });
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    const formattedData = {
      fullName: formData.fullName,
      phoneNumber: formData.phone,
      dateOfBirth: formData.dateOfBirth
        ? `${formData.dateOfBirth.getFullYear()}-${String(
          formData.dateOfBirth.getMonth() + 1
        ).padStart(2, "0")}-${String(formData.dateOfBirth.getDate()).padStart(2, "0")}`
        : "",
      address: {
        street: formData.address,
        ward: formData.ward,
        district: formData.district,
        province: formData.city,
      },
    };

    try {
      setIsUpdating(true);
      const res = await CustomerInfoService.updateCustomerInfo(editingId, formattedData);

      if (res.success) {
        toast.success("Cập nhật thành công!");
        const updatedList = await CustomerInfoService.getCustomerInfos();
        if (updatedList.success) setCustomerInfos(updatedList.data);
        handleCloseForm();
        setEditingId(null);
      } else {
        toast.error(res.message || "Lỗi khi cập nhật");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi hệ thống!");
    }finally{
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Xóa địa chỉ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
    if (!confirmResult.isConfirmed) return;
    const res = await CustomerInfoService.deleteCustomerInfo(id);
    if (res.success) setCustomerInfos((prev) => prev.filter((c) => c.id !== id));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Họ và tên bắt buộc";
    if (!formData.phone.trim()) newErrors.phone = "Số điện thoại bắt buộc";
    if (!formData.address.trim()) newErrors.address = "Địa chỉ bắt buộc";
    if (!formData.ward.trim()) newErrors.ward = "Phường/Xã bắt buộc";
    if (!formData.district.trim()) newErrors.district = "Quận/Huyện bắt buộc";
    if (!formData.city.trim()) newErrors.city = "Tỉnh/Thành phố bắt buộc";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-black">Địa chỉ nhận hàng</h2>
          <button className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium" onClick={handleAddAddress}>
            <Plus className="w-4 h-4" /> Thêm địa chỉ
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Đang tải danh sách địa chỉ...</p>
        ) : customerInfos.length === 0 ? (
          <p className="text-gray-500 text-sm">Bạn chưa có địa chỉ nào</p>
        ) : (
          <div className="space-y-4">
            {customerInfos.map((info) => (
              <div
                key={info.id}
                className={`border p-4 rounded-lg flex items-start justify-between cursor-pointer hover:shadow-md transition ${selectedCustomer?.id === info.id ? "border-red-600 bg-red-50" : "border-gray-200"
                  }`}
                onClick={() => setSelectedCustomer(info)} // ✅ chọn địa chỉ
              >
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-800">{info.fullName} — {info.phoneNumber}</h3>
                    <p className="text-gray-600 mt-1 text-sm">
                      {info.address.street}, {info.address.ward}, {info.address.district}, {info.address.province}
                    </p>
                    {info.dateOfBirth && <p className="text-gray-500 text-xs mt-1">Ngày sinh: {new Date(info.dateOfBirth).toLocaleDateString("vi-VN")}</p>}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={(e) => { e.stopPropagation(); handleEdit(info); }} className="text-blue-500 hover:text-blue-700">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(info.id); }} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isAdding && (
          <CustomerInfoFormModal
            visible={isAdding}
            onClose={handleCloseForm}
            title="Thêm địa chỉ mới"
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            onSubmit={handleSave}
            isSubmitting={isSaving}
            mode="add"
          />
        )}

        {isEditing && (
          <CustomerInfoFormModal
            visible={isEditing}
            onClose={handleCloseForm}
            title="Chỉnh sửa địa chỉ"
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            onSubmit={handleUpdate}
            isSubmitting={isUpdating}
            mode="edit"
          />
        )}
      </AnimatePresence>

      {toast.show && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500">
          <div className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
}
