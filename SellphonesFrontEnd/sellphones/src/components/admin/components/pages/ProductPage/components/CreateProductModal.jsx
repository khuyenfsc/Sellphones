import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AdminCategoryService from "../../../../service/AdminCategoryService";
import AdminBrandService from "../../../../service/AdminBrandService";
import { XCircle } from "lucide-react";

export default function CreateProductModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load category & brand khi mở modal
  useEffect(() => {
    if (isOpen) {
      loadCategories();
      loadBrands();
    }
  }, [isOpen]);

  const loadCategories = async () => {
    const res = await AdminCategoryService.getCategories({size:1000});
    if (res.success) setCategories(res.data.result);
  };

  const loadBrands = async () => {
    const res = await AdminBrandService.getBrands({size:1000});
    if (res.success) setBrands(res.data.result);
  };

  // Xem trước thumbnail
  useEffect(() => {
    if (!thumbnail) return setThumbnailPreview(null);
    const url = URL.createObjectURL(thumbnail);
    setThumbnailPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [thumbnail]);

  // Xem trước images
  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    setImagePreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  const handleCreate = async () => {
    if (!name.trim()) return setError("Tên sản phẩm không được để trống");
    if (!description.trim()) return setError("Mô tả không được để trống");
    if (!categoryId) return setError("Vui lòng chọn danh mục");
    if (!brandId) return setError("Vui lòng chọn thương hiệu");
    if (!thumbnail) return setError("Vui lòng chọn ảnh thumbnail");

    setLoading(true);
    setError("");

    const productData = {
      name: name.trim(),
      description: description.trim(),
      categoryId,
      brandId,
      thumbnail,
      images,
    };

    await onCreate(productData);
    setLoading(false);
    onClose();

    // Reset form
    setName("");
    setDescription("");
    setCategoryId("");
    setBrandId("");
    setThumbnail(null);
    setThumbnailPreview(null);
    setImages([]);
    setImagePreviews([]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[500px] bg-gray-900 shadow-xl z-50 p-6 overflow-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h2 className="text-xl font-semibold mb-6 text-white">
              Tạo sản phẩm mới
            </h2>

            <div className="space-y-5">
              {/* Tên sản phẩm */}
              <div>
                <label className="text-gray-300 block mb-1">Tên sản phẩm</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên sản phẩm"
                />
              </div>

              {/* Mô tả */}
              <div>
                <label className="text-gray-300 block mb-1">Mô tả</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white h-28 focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập mô tả sản phẩm"
                />
              </div>

              {/* Danh mục */}
              <div>
                <label className="text-gray-300 block mb-1">Danh mục</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="text-gray-300 block mb-1">Thương hiệu</label>
                <select
                  value={brandId}
                  onChange={(e) => setBrandId(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Chọn thương hiệu --</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              

              {/* Thumbnail */}
              <div>
                <label className="text-gray-300 block mb-1">Thumbnail</label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg p-4 bg-gray-800 hover:border-blue-500 transition">
                  {thumbnailPreview && (
                    <div className="relative flex flex-col items-center">
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail"
                        className="w-32 h-32 object-cover rounded-md mb-3 border border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => setThumbnail(null)}
                        className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 transition"
                      >
                        <XCircle size={16} /> Xóa thumbnail
                      </button>
                    </div>
                  )}
                  <label
                    htmlFor="thumbnailUpload"
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition mt-2"
                  >
                    {thumbnail ? "Đổi thumbnail" : "Chọn thumbnail"}
                  </label>
                  <input
                    id="thumbnailUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbnail(e.target.files[0] || null)}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="text-gray-300 block mb-1">Ảnh sản phẩm</label>
                <div className="flex flex-wrap gap-2">
                  {imagePreviews.map((url, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${idx}`}
                        className="w-24 h-24 object-cover rounded border border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-0 right-0 text-red-500 hover:text-red-400"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <label
                  htmlFor="imagesUpload"
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition mt-2 inline-block"
                >
                  Thêm ảnh
                </label>
                <input
                  id="imagesUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setImages((prev) => [...prev, ...Array.from(e.target.files)])
                  }
                  className="hidden"
                />
              </div>

              {/* Error */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Buttons */}
              <button
                onClick={handleCreate}
                disabled={loading}
                className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Đang tạo..." : "Tạo sản phẩm"}
              </button>

              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
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
