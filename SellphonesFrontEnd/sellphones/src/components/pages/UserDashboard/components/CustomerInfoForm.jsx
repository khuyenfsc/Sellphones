import DatePicker, { registerLocale } from "react-datepicker";
import { vi } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("vi", vi);

const CustomerInfoForm = ({
    formData,
    setFormData,
    errors,
    setErrors,
    onSubmit,
    isSubmitting,
    mode = "add", // 'add' hoặc 'edit'
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="space-y-4 text-black">
            <div>
                <label className="block text-gray-700 mb-1">Họ và tên</label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>

            <div>
                <label className="block text-gray-700 mb-1">Số điện thoại</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div>
                <label className="block text-gray-700 mb-1">Số nhà</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 mb-1">Phường/Xã</label>
                    <input
                        type="text"
                        name="ward"
                        value={formData.ward}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                    {errors.ward && <p className="text-red-500 text-sm">{errors.ward}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Quận/Huyện</label>
                    <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                    {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
                </div>
            </div>

            <div>
                <label className="block text-gray-700 mb-1">Tỉnh/Thành phố</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>

            <div>
                <label className="block text-gray-700 mb-1">Ngày sinh</label>
                <DatePicker
                    selected={formData.dateOfBirth}
                    onChange={(date) => setFormData((prev) => ({ ...prev, dateOfBirth: date }))}
                    dateFormat="dd/MM/yyyy"
                    locale="vi"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black"
                />


            </div>

            <div className="pt-4 flex justify-end gap-3">
                <button
                    type="button" // ❌ không dùng submit
                    onClick={onSubmit} // ✅ xử lý submit ở đây
                    disabled={isSubmitting} // ✅ disable khi submit
                    className={`px-4 py-2 rounded-lg text-white ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
                >
                    {isSubmitting
                        ? mode === "add"
                            ? "Đang lưu..."
                            : "Đang cập nhật..."
                        : mode === "add"
                            ? "Lưu"
                            : "Cập nhật"}
                </button>
            </div>
        </div>


    );
};

export default CustomerInfoForm;
