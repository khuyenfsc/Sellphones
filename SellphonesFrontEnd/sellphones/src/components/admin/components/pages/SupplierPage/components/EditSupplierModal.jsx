// EditSupplierModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function EditSupplierModal({ isOpen, onClose, onUpdate, supplier }) {
  const [formData, setFormData] = useState({
    name: "",
    contactName: "",
    phoneNumber: "",
    email: "",
    street: "",
    ward: "",
    district: "",
    city: "",
    taxCode: "",
    status: "ACTIVE",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ⬇️ Fill dữ liệu khi mở modal
  useEffect(() => {
    if (isOpen && supplier) {
      setFormData({
        name: supplier.name || "",
        contactName: supplier.contactName || "",
        phoneNumber: supplier.phoneNumber || "",
        email: supplier.email || "",
        street: supplier.address?.street || "",
        ward: supplier.address?.ward || "",
        district: supplier.address?.district || "",
        city: supplier.address?.city || "",
        taxCode: supplier.taxCode || "",
        status: supplier.status || "ACTIVE",
      });
      setErrors({});
    }
  }, [isOpen, supplier]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Tên nhà cung cấp không được để trống";
    if (!formData.contactName.trim()) newErrors.contactName = "Tên người liên hệ không được để trống";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Số điện thoại không được để trống";

    if (!formData.email.trim()) newErrors.email = "Email không được để trống";
    else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      newErrors.email = "Email không hợp lệ";

    if (!formData.street.trim()) newErrors.street = "Số nhà / Đường không được để trống";
    if (!formData.ward.trim()) newErrors.ward = "Phường/Xã không được để trống";
    if (!formData.district.trim()) newErrors.district = "Quận/Huyện không được để trống";
    if (!formData.city.trim()) newErrors.city = "Tỉnh/Thành phố không được để trống";
    if (!formData.taxCode.trim()) newErrors.taxCode = "Mã số thuế không được để trống";

    if (!formData.status) newErrors.status = "Trạng thái không được để trống";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const updatedSupplier = {
        id: supplier.id,
        name: formData.name,
        contactName: formData.contactName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        address: {
          street: formData.street,
          ward: formData.ward,
          district: formData.district,
          city: formData.city,
        },
        taxCode: formData.taxCode,
        status: formData.status,
      };

      if (onUpdate) await onUpdate(updatedSupplier);

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 h-full w-[500px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h2 className="text-xl font-semibold mb-6 text-white">
              Chỉnh sửa nhà cung cấp
            </h2>

            <div className="space-y-4">

              {/* Name */}
              <div>
                <label className="text-gray-300 block mb-1">Tên nhà cung cấp</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
              </div>

              {/* Contact Name */}
              <div>
                <label className="text-gray-300 block mb-1">Tên người liên hệ</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => handleChange("contactName", e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.contactName && (
                  <div className="text-red-500 text-sm mt-1">{errors.contactName}</div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-gray-300 block mb-1">Số điện thoại</label>
                <input
                  type="text"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phoneNumber && (
                  <div className="text-red-500 text-sm mt-1">{errors.phoneNumber}</div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-300 block mb-1">Email</label>
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
              </div>

              {/* Address */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 block mb-1">Số nhà / Đường</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => handleChange("street", e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.street && <div className="text-red-500 text-sm mt-1">{errors.street}</div>}
                </div>

                <div>
                  <label className="text-gray-300 block mb-1">Phường / Xã</label>
                  <input
                    type="text"
                    value={formData.ward}
                    onChange={(e) => handleChange("ward", e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.ward && <div className="text-red-500 text-sm mt-1">{errors.ward}</div>}
                </div>

                <div>
                  <label className="text-gray-300 block mb-1">Quận / Huyện</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleChange("district", e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.district && (
                    <div className="text-red-500 text-sm mt-1">{errors.district}</div>
                  )}
                </div>

                <div>
                  <label className="text-gray-300 block mb-1">Tỉnh / Thành phố</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.city && <div className="text-red-500 text-sm mt-1">{errors.city}</div>}
                </div>
              </div>

              {/* Tax Code */}
              <div>
                <label className="text-gray-300 block mb-1">Mã số thuế</label>
                <input
                  type="text"
                  value={formData.taxCode}
                  onChange={(e) => handleChange("taxCode", e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.taxCode && (
                  <div className="text-red-500 text-sm mt-1">{errors.taxCode}</div>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="text-gray-300 block mb-1">Trạng thái</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
                {errors.status && (
                  <div className="text-red-500 text-sm mt-1">{errors.status}</div>
                )}
              </div>

              <button
                onClick={handleUpdate}
                disabled={isSubmitting}
                className={`mt-6 w-full px-4 py-2 rounded text-white transition ${
                  isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isSubmitting ? "Đang cập nhật..." : "Cập nhật nhà cung cấp"}
              </button>

              <button
                onClick={onClose}
                className="mt-2 w-full px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
