import React, { useState, useEffect } from "react";
import { Calendar, X } from "lucide-react";
import DatePicker, { registerLocale } from "react-datepicker";
import { vi } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserService from "../../../service/UserService";

registerLocale("vi", vi);

export default function OAuth2UpdatePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: null,
    gender: "",
    phoneNumber: "",
    email: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeToken, setActiveToken] = useState("");

  // Lấy dữ liệu từ URL khi trang load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = decodeURIComponent(params.get("email") || "");
    const name = decodeURIComponent(params.get("name") || "");
    const token = params.get("activeToken") || "";

    setFormData((prev) => ({
      ...prev,
      fullName: name,
      email: email,
    }));
    setActiveToken(token);
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear lỗi khi sửa
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, dateOfBirth: date }));
    setErrors((prev) => ({ ...prev, dateOfBirth: "" }));
  };


  const clearFullName = () => {
    setFormData((prev) => ({ ...prev, fullName: "" }));
  };

  const handleSubmit = async () => {

    if (isSubmitting) return;
    let newErrors = {};

    // 🔹 Kiểm tra họ tên
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên.";
    }

    // 🔹 Kiểm tra ngày sinh
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Vui lòng chọn ngày sinh.";
    }

    // 🔹 Kiểm tra giới tính
    if (!formData.gender) {
      newErrors.gender = "Vui lòng chọn giới tính.";
    }

    // 🔹 Kiểm tra số điện thoại (chỉ khi không rỗng)
    const phoneRegex = /^\+?[0-9]{8,15}$/;
    if (formData.phoneNumber && formData.phoneNumber.trim() !== "") {
      if (!phoneRegex.test(formData.phoneNumber.trim())) {
        newErrors.phoneNumber = "Số điện thoại không hợp lệ.";
      }
    }

    // ❌ Nếu có lỗi thì dừng lại
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // ✅ Format lại ngày sinh
    const formattedDate = formData.dateOfBirth
      ? formData.dateOfBirth.toISOString().split("T")[0]
      : null;

    const { email, ...dataToSend } = formData;

    const payload = {
      ...dataToSend,
      dateOfBirth: formattedDate,
      activeToken: activeToken,
    };

    try {
      console.log("📤 Payload gửi đi:", payload);
      const res = await UserService.registerWithGoogle(payload);

      if (res.success) {
        toast.success("🎉 Đăng ký bằng Google thành công!");
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        toast.error(res.message || "Đăng ký bằng Google thất bại!");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("❌ Lỗi khi gọi API đăng ký:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
      setIsSubmitting(false);
    }
  };



  const handleBack = () => {
    console.log("Quay lại đăng nhập");
    // TODO: thêm logic điều hướng nếu cần
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
          Cập nhật thông tin
        </h1>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 text-black">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Thông tin cá nhân
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all pr-10 ${errors.fullName ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {formData.fullName && (
                    <button
                      onClick={clearFullName}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Birth Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày sinh
                </label>
                <div className="relative">
                  <DatePicker
                    selected={formData.dateOfBirth}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    locale={vi}
                    placeholderText="dd/mm/yyyy"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all pr-10 ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                      }`}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giới tính
                </label>

                <div className="flex items-center gap-6">
                  {["MALE", "FEMALE"].map((g) => {
                    const isSelected = formData.gender === g;

                    return (
                      <label
                        key={g}
                        htmlFor={`register-gender-${g}`}
                        className="flex items-center gap-2 cursor-pointer select-none"
                      >
                        <input
                          id={`register-gender-${g}`}
                          type="radio"
                          name="register_gender" // ✅ Đổi name để tránh conflict với radio khác
                          value={g}
                          checked={isSelected}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, gender: e.target.value }))
                          }
                          className="hidden peer"
                        />
                        <span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
            peer-checked:bg-red-500 peer-checked:border-red-500 border-gray-400`}
                        >
                          {isSelected && <span className="w-2.5 h-2.5 bg-white rounded-full" />}
                        </span>
                        <span>{g === "MALE" ? "Nam" : "Nữ"}</span>
                      </label>
                    );
                  })}
                </div>

                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                )}
              </div>


              {/* phoneNumber */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại{" "}
                  <span className="text-gray-400 text-xs">(không bắt buộc)</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                />

                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email{" "}
                  <span className="text-gray-400 text-xs font-normal">
                    (Không thể chỉnh sửa)
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 bg-gray-100 rounded-lg text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Terms */}
            <p className="text-sm text-gray-600">
              Bằng việc Đăng ký, bạn đã đọc và đồng ý với{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Điều khoản sử dụng
              </a>{" "}
              và{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Chính sách bảo mật của SellphoneS
              </a>
              .
            </p>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <button
              onClick={() => navigate("/login")}
              className="py-3 px-6 bg-white border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-lg">←</span>
              <span>Quay lại đăng nhập</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`py-3 px-6 rounded-lg font-medium transition-colors ${isSubmitting
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              {isSubmitting ? "Đang xử lý..." : "Hoàn tất đăng ký"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
