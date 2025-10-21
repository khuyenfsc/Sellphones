import { captureOwnerStack, useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import CategoryService from "../../../../service/CategoryService"; // 🔹 Đảm bảo đúng path

export default function LeftSidebar() {
  const [categories, setCategories] = useState([]);
  const [hoveredCat, setHoveredCat] = useState(null); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await CategoryService.getAll();
        if (res?.data?.result) {
          setCategories(res.data.result);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
        setCategories([]);
      }
    };

      fetchCategories();
  }, []);

  useEffect(() => {
    if (hoveredCat) {
      console.log("Đang hover:", hoveredCat);
    } else {
      console.log("Không hover gì cả");
    }
  }, [hoveredCat]);

    return (
        <div className="relative flex">
            {/* LEFT SIDEBAR */}
            <aside className="w-64 flex-shrink-0 z-10">
                <nav className="bg-white rounded-lg shadow-sm overflow-visible">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="relative"
                            onMouseEnter={() => {
                                setHoveredCat(cat)
                                console.log(captureOwnerStack);
                            }} // hover vào => hiện submenu
                            onMouseLeave={() => setHoveredCat(null)} // rời ra => ẩn submenu
                        >
                            <button
                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 transition"
                            >
                                <div className="flex items-center gap-3">
                                    {cat.icon ? (
                                        <img
                                            src={cat.icon}
                                            alt={cat.name}
                                            className="w-6 h-6 object-contain"
                                        />
                                    ) : (
                                        <div className="w-6 h-6 bg-gray-200 rounded" />
                                    )}
                                    <span className="text-sm text-gray-700">{cat.name}</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-400" />
                            </button>

                            {/* SUBMENU hiển thị khi hover */}
                            {hoveredCat?.id === cat.id && cat.categoryOptions?.length > 0 && (
                                <div
                                    className="absolute top-0 left-full ml-1 bg-white shadow-lg rounded-lg w-64 p-3 border z-50"
                                    onMouseEnter={() => setHoveredCat(cat)}
                                    onMouseLeave={() => setHoveredCat(null)}
                                >
                                    {/* Bridge vô hình giữa category và submenu */}
                                    <div className="absolute -left-1 top-0 h-full w-2 bg-transparent" />

                                    {cat.categoryOptions.map((opt, idx) => (
                                        <div key={idx} className="mb-3">
                                            <div className="font-semibold text-gray-800 mb-1">
                                                {opt.name}
                                            </div>
                                            {opt.categoryOptionValues.length > 0 ? (
                                                <ul className="pl-2 space-y-1">
                                                    {opt.categoryOptionValues.map((val, i) => (
                                                        <li
                                                            key={i}
                                                            className="text-sm text-gray-600 hover:text-red-500 cursor-pointer transition"
                                                        >
                                                            {val.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <div className="text-xs text-gray-400 italic">(Không có giá trị)</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}


                        </div>
                    ))}

                    {categories.length === 0 && (
                        <div className="text-gray-400 text-sm text-center py-4">
                            Không có danh mục nào
                        </div>
                    )}
                </nav>
            </aside>
        </div>
    );
}
