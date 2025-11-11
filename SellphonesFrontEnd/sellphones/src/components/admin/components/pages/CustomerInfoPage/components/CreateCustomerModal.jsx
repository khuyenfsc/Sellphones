// CreateCustomerModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateCustomerModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cccd: "",
    street: "",
    ward: "",
    district: "",
    city: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ và tên không được để trống";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^(0\d{9})$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ (10 chữ số và bắt đầu bằng 0)";
    }

    if (!formData.street.trim()) {
      newErrors.street = "Số nhà / Đường không được để trống";
    }

    if (!formData.ward.trim()) {
      newErrors.ward = "Phường/Xã không được để trống";
    }

    if (!formData.district.trim()) {
      newErrors.district = "Quận/Huyện không được để trống";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Tỉnh/Thành phố không được để trống";
    }

    if (formData.dateOfBirth && isNaN(new Date(formData.dateOfBirth))) {
      newErrors.dateOfBirth = "Ngày sinh không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const newCustomer = {
        fullName: formData.fullName,
        phoneNumber: formData.phone,
        cccd: formData.cccd || null,
        dateOfBirth: formData.dateOfBirth || null,
        address: {
          street: formData.street,
          ward: formData.ward,
          district: formData.district,
          province: formData.city,
        },
      };

      if (onCreate) await onCreate(newCustomer);

      // Reset form nếu muốn
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        cccd: "",
        street: "",
        ward: "",
        district: "",
        city: "",
        dateOfBirth: "",
      });
      setErrors({});
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
            <h2 className="text-xl font-semibold mb-6 text-white">Tạo khách hàng mới</h2>

            <div className="space-y-4">
              {/* Full name */}
              <div>
                <label className="text-gray-300 block mb-1">Họ và tên</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập họ và tên"
                />
                {errors.fullName && <div className="text-red-500 text-sm mt-1">{errors.fullName}</div>}
              </div>

              {/* Phone */}
              <div>
                <label className="text-gray-300 block mb-1">Số điện thoại</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập số điện thoại"
                />
                {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
              </div>

              {/* CCCD (optional) */}
              <div>
                <label className="text-gray-300 block mb-1">CCCD (tùy chọn)</label>
                <input
                  type="text"
                  value={formData.cccd}
                  onChange={(e) => handleChange("cccd", e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập CCCD"
                />
              </div>

              {/* Date of birth */}
              <div>
                <label className="text-gray-300 block mb-1">Ngày sinh (tùy chọn)</label>
                <DatePicker
                  selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
                  onChange={(date) =>
                    handleChange("dateOfBirth", date ? date.toISOString().split("T")[0] : "")
                  }
                  locale="vi"
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholderText="Chọn ngày sinh"
                />
                {errors.dateOfBirth && <div className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</div>}
              </div>

              {/* Địa chỉ */}
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
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.city && <div className="text-red-500 text-sm mt-1">{errors.city}</div>}
                </div>
              </div>

              {/* Nút tạo */}
              <button
                onClick={handleCreate}
                disabled={isSubmitting}
                className={`mt-6 w-full px-4 py-2 rounded text-white transition ${isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {isSubmitting ? "Đang tạo..." : "Tạo khách hàng"}
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
