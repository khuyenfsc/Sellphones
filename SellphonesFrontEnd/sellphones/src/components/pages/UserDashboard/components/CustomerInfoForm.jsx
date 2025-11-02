import DatePicker from "react-datepicker";

const CustomerInfoForm = ({
    formData,
    setFormData,
    errors,
    setErrors,
    onSubmit,
    mode = "add", // 'add' hoặc 'edit'
}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = "Họ và tên không được để trống";
        if (!formData.phone.trim()) newErrors.phone = "Số điện thoại không được để trống";
        else if (!/^(0\d{9})$/.test(formData.phone))
            newErrors.phone = "Số điện thoại phải có 10 chữ số và bắt đầu bằng 0";

        if (!formData.address.trim()) newErrors.address = "Địa chỉ không được để trống";
        if (!formData.ward.trim()) newErrors.ward = "Phường/Xã không được để trống";
        if (!formData.district.trim()) newErrors.district = "Quận/Huyện không được để trống";
        if (!formData.city.trim()) newErrors.city = "Tỉnh/Thành phố không được để trống";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit();
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
            </div>

            <div className="pt-4 flex justify-end gap-3">
                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                    {mode === "add" ? "Lưu" : "Cập nhật"}
                </button>
            </div>
        </form>
    );
};

export default CustomerInfoForm;
