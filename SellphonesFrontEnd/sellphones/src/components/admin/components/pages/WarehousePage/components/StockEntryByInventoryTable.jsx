// import React, { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import AdminWarehouseService from "../../../../service/AdminWarehouseService";
// import StockEntryFilterModal from "../../SupplierPage/components/StockEntryFilterModal.";

// export default function StockEntryByInventoryTable({ isReloaded, inventoryId }) {
//     const navigate = useNavigate();
//     const [entries, setEntries] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [inputValue, setInputValue] = useState(1);
//     const [perPage, setPerPage] = useState(5);
//     const [totalPages, setTotalPages] = useState(1);
//     const [total, setTotal] = useState(0);

//     const [filterRequest, setFilterRequest] = useState({
//         productVariantName: null,
//         page: 0,
//         size: perPage,
//     });

//     const fetchStockEntries = async () => {
//         setLoading(true);
//         try {
//             const res = await AdminWarehouseService.getStockEntriesByInventory(
//                 inventoryId,
//                 {
//                     ...filterRequest,
//                     productVariantName: searchTerm.trim() || null,
//                     page: currentPage - 1,
//                     size: perPage,
//                 }
//             );

//             if (res.success) {
//                 setEntries(res.data.result || []);
//                 setTotalPages(res.data.totalPages || 1);
//                 setTotal(res.data.total || 0);
//             } else {
//                 toast.error(res.message || "Không thể tải danh sách phiếu nhập kho");
//             }
//         } catch (err) {
//             toast.error("Đã xảy ra lỗi khi tải dữ liệu");
//             console.error(err);
//         }
//         setLoading(false);
//     };

//     const handleFilter = (filters) => {
//         const cleanFilters = {};
//         Object.entries(filters).forEach(([key, value]) => {
//             if (value !== "" && value != null) {
//                 cleanFilters[key] = value;
//             }
//         });

//         setFilterRequest({
//             ...cleanFilters,
//             page: 0,
//         });

//         setCurrentPage(1);
//     };

//     useEffect(() => {
//         setInputValue(currentPage);
//     }, [currentPage]);

//     useEffect(() => {
//         fetchStockEntries();
//     }, [currentPage, perPage, filterRequest, isReloaded]);

//     const handleSearchKeyDown = (e) => {
//         if (e.key === "Enter") {
//             setFilterRequest({ ...filterRequest, productVariantName: searchTerm });
//             setCurrentPage(1);
//         }
//     };

//     const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//     const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

//     const formatDate = (dateStr) => {
//         if (!dateStr) return "—";
//         const date = new Date(dateStr);
//         return `${String(date.getDate()).padStart(2, "0")}/${String(
//             date.getMonth() + 1
//         ).padStart(2, "0")}/${date.getFullYear()}`;
//     };

//     const formatAddress = (address) => {
//         if (!address) return "";
//         return `${address.street}, ${address.ward}, ${address.district}, ${address.province}`;
//     };

//     return (
//         <>
//             {/* Header Controls */}
//             <div className="flex justify-between items-center mb-6">
//                 <div className="flex items-center gap-3">
//                     <div className="relative">
//                         <input
//                             type="text"
//                             placeholder="Tìm kiếm theo tên sản phẩm"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             onKeyDown={handleSearchKeyDown}
//                             className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 pl-9 w-48 focus:outline-none focus:border-blue-500"
//                         />
//                         <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
//                     </div>
//                     <span className="text-slate-400 text-sm whitespace-nowrap">
//                         Tổng kết quả: {total}
//                     </span>
//                 </div>

//                 <div className="flex items-center gap-3">
//                     <button
//                         onClick={() => setIsFilterModalOpen(true)}
//                         className="flex items-center gap-1 px-3 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
//                     >
//                         <Filter size={16} />
//                         <span className="text-sm">Lọc</span>
//                     </button>

//                     <select
//                         value={perPage}
//                         onChange={(e) => {
//                             const newSize = Number(e.target.value);
//                             setPerPage(newSize);
//                             setCurrentPage(1);
//                             setFilterRequest({ ...filterRequest, page: 0, size: newSize });
//                         }}
//                         className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 focus:outline-none focus:border-blue-500"
//                     >
//                         <option>5</option>
//                         <option>10</option>
//                         <option>25</option>
//                     </select>
//                     <span className="text-slate-400">Phiếu nhập hàng / Trang</span>

//                     <div className="flex items-center gap-1">
//                         <span className="text-slate-400 flex items-center gap-1">
//                             <input
//                                 type="number"
//                                 value={inputValue}
//                                 onChange={(e) => setInputValue(e.target.value)}
//                                 onKeyDown={(e) => {
//                                     if (e.key === "Enter") {
//                                         const newPage = Number(inputValue);
//                                         if (newPage >= 1 && newPage <= totalPages) {
//                                             setCurrentPage(newPage);
//                                         } else {
//                                             setInputValue(currentPage);
//                                         }
//                                     }
//                                 }}
//                                 className="w-12 text-center bg-gray-800 rounded px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <span className="text-xs">/ {totalPages}</span>
//                         </span>

//                         <button
//                             onClick={handlePrevPage}
//                             disabled={currentPage === 1}
//                             className="p-1 bg-slate-800 rounded hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             <ChevronLeft size={16} />
//                         </button>

//                         <button
//                             onClick={handleNextPage}
//                             disabled={currentPage === totalPages}
//                             className="p-1 bg-slate-800 rounded hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             <ChevronRight size={16} />
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Table */}
//             <div className="bg-slate-900 rounded-lg overflow-hidden">
//                 <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 text-slate-400 text-sm">
//                     <div className="col-span-2">ID / Ngày nhập</div>
//                     <div className="col-span-3">Sản phẩm</div>
//                     <div className="col-span-3">Kho</div>
//                     <div className="col-span-1">Số lượng</div>
//                     <div className="col-span-1">Giá nhập</div>
//                     <div className="col-span-1 text-center"></div>
//                 </div>

//                 {loading ? (
//                     <div className="flex items-center justify-center py-20">
//                         <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
//                     </div>
//                 ) : entries.length === 0 ? (
//                     <div className="text-center text-slate-400 py-6">Không có phiếu nhập kho nào</div>
//                 ) : (
//                     entries.map((e) => (
//                         <div
//                             key={e.id}
//                             className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-800 hover:bg-slate-800/50 transition"
//                         >
//                             <div className="col-span-2">
//                                 <div className="font-medium">#{e.id}</div>
//                                 <div className="text-slate-400 text-sm">{formatDate(e.importDate)}</div>
//                             </div>

//                             <div className="col-span-3 font-medium">
//                                 {e.inventory?.productVariant?.productVariantName}
//                             </div>

//                             <div className="col-span-3">
//                                 <div className="font-medium">{e.inventory?.warehouse?.name}</div>
//                                 <div className="text-slate-400 text-sm truncate">
//                                     {formatAddress(e.inventory?.warehouse?.address)}
//                                 </div>
//                             </div>

//                             <div className="col-span-1">{e.quantity}</div>
//                             <div className="col-span-1">{e.purchasePrice.toLocaleString()} đ</div>

//                             <div className="col-span-1 text-center">
//                                 <button
//                                     className="text-slate-400 hover:text-white transition"
//                                     onClick={() => navigate(`/admin/stock-entries/view/${e.id}`)}
//                                 >
//                                     <ChevronRight size={20} />
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>

//             <StockEntryFilterModal
//                 isOpen={isFilterModalOpen}
//                 onClose={() => setIsFilterModalOpen(false)}
//                 onApply={handleFilter}
//             />
//         </>
//     );
// }
