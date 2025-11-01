import React, { useState, useEffect } from "react";
import { Edit2 } from "lucide-react";
import { parse, format, isValid } from "date-fns";
import EditProfileModal from "./EditProfileModal";
import UserService from "../../../../service/UserService";

export default function UserProfile({ user, setUser }) {
    const [isEditing, setIsEditing] = useState(false);
    const [dobInput, setDobInput] = useState(""); // giá trị hiển thị trong input
    const [errors, setErrors] = useState({});
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });
    const [profileFormData, setProfileFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        gender: "",
    });

    
    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });

        // 3 giây tự ẩn
        setTimeout(() => {
            setToast({ show: false, message: "", type });
        }, 3000);
    };


    useEffect(() => {
        if (user) {
            const dobISO = user.dateOfBirth || "";
            setProfileFormData({
                fullName: user.fullName || "",
                dateOfBirth: dobISO,
                gender: user.gender || "",
            });

            // chuyển ISO -> dd/MM/yyyy để hiển thị trong input
            if (dobISO) {
                const parsed = parse(dobISO, "yyyy-MM-dd", new Date());
                if (isValid(parsed)) {
                    setDobInput(format(parsed, "dd/MM/yyyy"));
                }
            } else {
                setDobInput("");
            }
        }
    }, [user]);

    // Hàm validate trước khi lưu
    const validate = () => {
        const newErrors = {};

        if (!profileFormData.fullName.trim()) {
            newErrors.fullName = "Họ và tên không được để trống";
        }

        // Regex dd/MM/yyyy
        const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        console.log(dobInput)
        if (!dobRegex.test(dobInput)) {
            newErrors.dateOfBirth = "Ngày sinh phải đúng định dạng dd/MM/yyyy";
        }

        if (!profileFormData.gender) {
            newErrors.gender = "Vui lòng chọn giới tính";
        }

        setErrors(newErrors);

        // Trả về true nếu không có lỗi
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => { const { name, value } = e.target; setProfileFormData((prev) => ({ ...prev, [name]: value })); }

    const handleDateChange = (e) => {
        let val = e.target.value.replace(/\D/g, ""); // chỉ giữ số

        if (val.length > 8) val = val.slice(0, 8); // tối đa 8 số (ddMMyyyy)

        // tự thêm dấu "/"
        if (val.length >= 3 && val.length <= 4) {
            val = val.slice(0, 2) + "/" + val.slice(2);
        } else if (val.length >= 5 && val.length <= 8) {
            val = val.slice(0, 2) + "/" + val.slice(2, 4) + "/" + val.slice(4);
        }

        setDobInput(val);

        // lưu ISO nếu đủ 8 số
        if (val.length === 10) {
            const parsedDate = parse(val, "dd/MM/yyyy", new Date());
            if (isValid(parsedDate)) {
                setProfileFormData((prev) => ({
                    ...prev,
                    dateOfBirth: format(parsedDate, "yyyy-MM-dd"),
                }));
            }
        }
    }

    const handleSave = async () => {
        try {
            if (!validate()) return; // kiểm tra validate trước

            // Gọi hàm updateProfile
            const res = await UserService.updateProfile(profileFormData);

            if (res.success) {
                showToast("Cập nhật thông tin thành công!", "success");

                setUser(res.user);


                // Cập nhật state nếu cần
                setIsEditing(false);
            } else {
                alert(res.message || "Đã xảy ra lỗi khi lưu. Vui lòng thử lại!");
            }
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật thông tin:", error);
            alert("Đã xảy ra lỗi khi lưu. Vui lòng thử lại!");
        }
    };

    const formattedDate = profileFormData.dateOfBirth
        ? format(new Date(profileFormData.dateOfBirth), "dd/MM/yyyy")
        : "";

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
                    >
                        <Edit2 className="w-4 h-4" />
                        Cập nhật
                    </button>
                </div>

                {/* Hiển thị thông tin người dùng */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex">
                            <label className="text-gray-600 w-32">Họ và tên:</label>
                            <span className="font-medium flex-1">{user.fullName || "-"}</span>
                        </div>
                        <div className="flex">
                            <label className="text-gray-600 w-32">Số điện thoại:</label>
                            <span className="font-medium flex-1">{user.phoneNumber || "-"}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex">
                            <label className="text-gray-600 w-32">Giới tính:</label>
                            <span className="font-medium flex-1">
                                {user.gender === "MALE"
                                    ? "Nam"
                                    : user.gender === "FEMALE"
                                        ? "Nữ"
                                        : "-"}
                            </span>
                        </div>

                        <div className="flex">
                            <label className="text-gray-600 w-32">Email:</label>
                            <span className="font-medium flex-1">{user.email || "-"}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex">
                            <label className="text-gray-600 w-32">Ngày sinh:</label>
                            <span className="font-medium flex-1">
                                {user.dateOfBirth
                                    ? new Date(user.dateOfBirth).toLocaleDateString("vi-VN")
                                    : "-"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gọi modal riêng */}
            <EditProfileModal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                profileFormData={profileFormData}
                errors={errors}
                dobInput={dobInput}
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                handleSave={handleSave}
            />

            {toast.show && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500">
                    <div className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg
            ${toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}
        `}>
                        {toast.type === "success" && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}
        </>
    );
}
