// EditWarehouseModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function EditWarehouseModal({ isOpen, onClose, onUpdate, warehouse }) {
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    ward: "",
    district: "",
    province: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fill dữ liệu khi mở modal
  useEffect(() => {
    if (isOpen && warehouse) {
      setFormData({
        name: warehouse.name || "",
        street: warehouse.address?.street || "",
        ward: warehouse.address?.ward || "",
        district: warehouse.address?.district || "",
        province: warehouse.address?.province || "",
      });
      setErrors({});
    }
  }, [isOpen, warehouse]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Tên kho không được để trống";
    if (!formData.street.trim()) newErrors.street = "Số nhà / Đường không được để trống";
    if (!formData.ward.trim()) newErrors.ward = "Phường/Xã không được để trống";
    if (!formData.district.trim()) newErrors.district = "Quận/Huyện không được để trống";
    if (!formData.province.trim()) newErrors.province = "Tỉnh/Thành phố không được để trống";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const updatedWarehouse = {
        id: warehouse.id,
        name: formData.name,
        address: {
          street: formData.street,
          ward: formData.ward,
          district: formData.district,
          province: formData.province,
        },
      };

      if (onUpdate) await onUpdate(updatedWarehouse);
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
              Chỉnh sửa kho
            </h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-gray-300 block mb-1">Tên kho</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
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
                  {errors.district && <div className="text-red-500 text-sm mt-1">{errors.district}</div>}
                </div>

                <div>
                  <label className="text-gray-300 block mb-1">Tỉnh / Thành phố</label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => handleChange("province", e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.province && <div className="text-red-500 text-sm mt-1">{errors.province}</div>}
                </div>
              </div>

              <button
                onClick={handleUpdate}
                disabled={isSubmitting}
                className={`mt-6 w-full px-4 py-2 rounded text-white transition ${
                  isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isSubmitting ? "Đang cập nhật..." : "Cập nhật kho"}
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
