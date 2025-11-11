import React, { useEffect, useState } from "react";
import { ChevronRight, Trash2, ShoppingCart, XCircle } from "lucide-react";
import AdminCustomerInfoService from "../../../service/AdminCustomerInfoService";
// import AdminPaymentService from "../../../service/AdminPaymentService";
import OrderList from "../OrderPage/components/OrderList";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import EditCustomerModal from "./components/EditCustomerModal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CustomerDetailsPage = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [payments, setPayments] = useState([]);
    const [loadingPayments, setLoadingPayments] = useState(false);
    const [isEditCustomerModalOpen, setIsEditCustomerModalOpen] = useState(false);
    const { customerId } = useParams();

    const fetchCustomer = async () => {
        try {
            const res = await AdminCustomerInfoService.getCustomerById(customerId);
            if (res.success) setCustomer(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // const fetchPayments = async () => {
    //     setLoadingPayments(true);
    //     try {
    //         const res = await AdminPaymentService.getPaymentsByCustomer(customerId);
    //         if (res.success) setPayments(res.data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    //     setLoadingPayments(false);
    // };

    const handleUpdate = async (updatedData) => {
        if (!customerId) return;

        try {
            const res = await AdminCustomerInfoService.updateCustomer(customerId, updatedData);

            if (res.success) {
                toast.success("Cập nhật khách hàng thành công!");
                setIsEditCustomerModalOpen(false);

                fetchCustomer();
            } else {
                toast.error(res.message || "Cập nhật thất bại!");
            }
        } catch (err) {
            console.error(err)
            toast.error("Đã xảy ra lỗi khi cập nhật khách hàng!");
        }
    };

    const handleDelete = async () => {
        if (!customerId) {
            toast.error("Không tìm thấy khách hàng để xóa.");
            return;
        }

        // Hiển thị popup confirm với SweetAlert2
        const result = await Swal.fire({
            title: "Xác nhận xóa",
            text: "Bạn có chắc chắn muốn xóa khách hàng này? Sau khi xóa thì đơn hàng của họ vẫn tồn tại trong hệ thống",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (result.isConfirmed) {
            try {
                const res = await AdminCustomerInfoService.deleteCustomer(customerId);

                if (res.success) {
                    toast.success("Xóa khách hàng thành công!");
                    navigate("/admin/customers");
                } else {
                    toast.error(res.message || "Xóa khách hàng thất bại");
                }
            } catch (err) {
                console.error(err);
                toast.error("Đã xảy ra lỗi khi xóa khách hàng");
            }
        }
    };


    useEffect(() => {
        fetchCustomer();
        // fetchPayments();
    }, [customerId]);

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                    {customer ? customer.fullName : "Chi tiết khách hàng"}
                </h1>
                <div className="flex gap-3">
                    <button
                        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                    >
                        <ShoppingCart size={20} />
                        <span className="text-sm font-medium">Tạo đơn hàng</span>
                    </button>
                    <button
                        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                        onClick={handleDelete}
                    >
                        <XCircle size={20} />
                        <span className="text-sm font-medium">Xóa khách hàng</span>
                    </button>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Left: Orders & Payments */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Orders Table */}
                    <OrderList customerId={customerId} />


                    {/* Payments Table */}
                    <div className="bg-slate-900 rounded-lg overflow-hidden">
                        <div className="flex justify-between items-center px-6 py-3 border-b border-slate-800">
                            <h2 className="text-lg font-semibold">Thanh toán ({payments.length})</h2>
                        </div>
                        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-800 text-slate-400 text-sm font-semibold">
                            <div className="col-span-1">ID</div>
                            <div className="col-span-3">Mã thanh toán</div>
                            <div className="col-span-3">Ngày thanh toán</div>
                            <div className="col-span-2">Số tiền</div>
                            <div className="col-span-3">Phương thức</div>
                        </div>
                        {loadingPayments ? (
                            <div className="flex items-center justify-center py-10">
                                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                            </div>
                        ) : payments.length === 0 ? (
                            <div className="text-center text-slate-400 py-6">Không có thanh toán nào</div>
                        ) : (
                            payments.map((payment) => (
                                <div
                                    key={payment.id}
                                    className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-800 hover:bg-slate-800/50 transition"
                                >
                                    <div className="col-span-1 text-slate-300">{payment.id}</div>
                                    <div className="col-span-3 text-slate-300">{payment.code}</div>
                                    <div className="col-span-3 text-slate-300">{payment.date}</div>
                                    <div className="col-span-2 text-slate-300">{payment.amount}</div>
                                    <div className="col-span-3 text-slate-300">{payment.method}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right: Customer Info */}
                <div className="w-80 bg-slate-900 rounded-lg p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold mb-2">Thông tin khách hàng</h2>
                        <button
                            onClick={() => setIsEditCustomerModalOpen(true)}
                            className="text-yellow-400 hover:text-yellow-200 transition px-2 py-1 rounded border border-yellow-400"
                        >
                            Sửa
                        </button>
                    </div>

                    {customer ? (
                        <>
                            <div>
                                <span className="text-slate-400">Họ tên:</span>{" "}
                                <span className="text-slate-200">{customer.fullName}</span>
                            </div>
                            <div>
                                <span className="text-slate-400">CCCD:</span>{" "}
                                <span className="text-slate-200">{customer.cccd || "-"}</span>
                            </div>
                            <div>
                                <span className="text-slate-400">Email:</span>{" "}
                                <span className="text-slate-200">{customer.user?.email || "-"}</span>
                            </div>
                            <div>
                                <span className="text-slate-400">Số điện thoại:</span>{" "}
                                <span className="text-slate-200">{customer.phoneNumber || "-"}</span>
                            </div>
                            <div>
                                <span className="text-slate-400">Địa chỉ:</span>{" "}
                                <span className="text-slate-200">
                                    {[
                                        customer.address?.street,
                                        customer.address?.ward,
                                        customer.address?.district,
                                        customer.address?.province,
                                    ]
                                        .filter(Boolean)
                                        .join(", ") || "-"}
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="text-slate-400">Đang tải thông tin khách hàng...</div>
                    )}
                </div>

            </div>


            <EditCustomerModal
                isOpen={isEditCustomerModalOpen}
                onClose={() => setIsEditCustomerModalOpen(false)}
                customer={customer}
                onUpdate={handleUpdate}
            />

        </div>
    );
};

export default CustomerDetailsPage;
