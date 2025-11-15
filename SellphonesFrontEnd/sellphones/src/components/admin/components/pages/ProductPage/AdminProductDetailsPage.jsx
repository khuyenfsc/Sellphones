import React, { useEffect, useState } from "react";
import { Save, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AdminProductService from "../../../service/AdminProductService";
import AdminCategoryService from "../../../service/AdminCategoryService";
import AdminBrandService from "../../../service/AdminBrandService";
import VariantTable from "./components/VariantTable";

const AdminProductDetailsPage = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    variant: "",
    category: "",
    brand: "",
    thumbnail: ""
  });


  const fetchProduct = async () => {
    try {
      const res = await AdminProductService.getProductById(productId);
      if (res.success) {
        setProduct(res.data);
        setProductName(res.data?.name);
      }
    } catch (err) {
      toast.error("Lỗi tải sản phẩm");
    }
  };

  const loadCategories = async () => {
    try {
      const res = await AdminCategoryService.getCategories({ size: 1000 });
      if (res.success) setCategories(res.data.result);
    } catch (err) {
      toast.error("Lỗi tải danh mục");
    }
  };

  const loadBrands = async () => {
    try {
      const res = await AdminBrandService.getBrands({ size: 1000 });
      if (res.success) setBrands(res.data.result);
    } catch (err) {
      toast.error("Lỗi tải thương hiệu");
    }
  };

  useEffect(() => {
    fetchProduct();
    loadCategories();
    loadBrands();
  }, [productId]);

  useEffect(() => {
    if (!product) return;

    // Thumbnail có từ server → convert thành File
    if (product.thumbnail) {
      urlToFile(product.thumbnail, "thumbnail.jpg").then(file => {
        setThumbnailFile(file);
        setPreviewThumbnail(URL.createObjectURL(file));
      });
    }

    if (product.images?.length > 0) {
      Promise.all(
        product.images.map((url, idx) => urlToFile(url, `image-${idx}.jpg`))
      ).then(files => {
        setImageFiles(files);                          // File thật
        setNewImages(files.map(f => URL.createObjectURL(f)));  // preview
      });
    }

  }, [product]);


  const handleInputChange = (field, value) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    const newErrors = {
      name: "",
      variant: "",
      category: "",
      brand: "",
      thumbnail: ""
    };

    // Check tên
    if (!product.name?.trim()) {
      newErrors.name = "Tên sản phẩm không được để trống.";
    }

    // Check category
    if (!product.category?.id) {
      newErrors.category = "Bạn phải chọn danh mục.";
    }

    // Check brand
    if (!product.brand?.id) {
      newErrors.brand = "Bạn phải chọn thương hiệu.";
    }

    // Check variant regex
    const regex = /^(?!.*--)(?!^-)(?!.*-$)[^-]+(?:-[^-]+)*$/;

    // Check rỗng trước
    if (!product.variantAttributeNames?.trim()) {
      newErrors.variant = "Thuộc tính Variant không được để trống.";
    } else if (!regex.test(product.variantAttributeNames.trim())) {
      // Sau đó mới check regex
      newErrors.variant =
        "Thuộc tính Variant không hợp lệ. Ví dụ hợp lệ: RAM-ROM.";
    }


    // Check thumbnail
    if (!thumbnailFile && !product.thumbnail) {
      newErrors.thumbnail = "Thumbnail không được để trống.";
    }

    setErrors(newErrors);

    // Nếu có bất kỳ lỗi nào -> false
    return Object.values(newErrors).every((e) => e === "");
  };


  const handleSave = async () => {
    if (!validate()) {
      return;
    }

    const result = await Swal.fire({
      title: "Lưu thay đổi?",
      text: "Các thay đổi sẽ được cập nhật lên server.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    try {

      const updatePayload = {
        name: product.name,
        description: product.description,
        categoryId: product.category?.id,
        brandId: product.brand?.id,
        status: product.status,
        isFeatured: product.isFeatured,
        isNew: product.isNew,
        variantAttributeNames: product.variantAttributeNames,
      };

      console.log(thumbnailFile);

      const res = await AdminProductService.updateProduct(
        productId,
        updatePayload,
        thumbnailFile,
        imageFiles
      );

      if (res.success) {
        toast.success("Cập nhật thành công!");
        fetchProduct();
        setNewImages([]);
      } else {
        toast.error(res.message || "Cập nhật thất bại");
      }

    } catch (err) {
      console.log(err);
      toast.error("Lỗi cập nhật sản phẩm");
    }

    setLoading(false);
  };


  const handleRemoveImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };


  async function urlToFile(url, filename) {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">{productName || "Chi tiết Sản phẩm"}</h1>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          <Save size={20} /> Lưu thay đổi
        </button>
      </div>

      <div className="flex gap-6">
        {/* Left panel: product info + images */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-slate-900 rounded-lg p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-2">Thông tin Sản phẩm</h2>

            <div>
              <label className="text-slate-400">Tên:</label>
              <input
                type="text"
                className="bg-slate-800 p-2 rounded w-full mt-1"
                value={product?.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />

              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="text-slate-400">Danh mục:</label>
              <select
                className="bg-slate-800 p-2 rounded w-full mt-1"
                value={product?.category?.id || ""}
                onChange={(e) => {
                  const selectedId = Number(e.target.value);
                  const selectedCategory = categories.find((c) => c.id === selectedId);
                  handleInputChange("category", selectedCategory); // cập nhật toàn bộ object
                }}
              >
                <option value="">Chọn danh mục</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {errors.category && (
                <p className="text-red-400 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="text-slate-400">Thương hiệu:</label>
              <select
                className="bg-slate-800 p-2 rounded w-full mt-1"
                value={product?.brand?.id || ""}
                onChange={(e) => {
                  const selectedId = Number(e.target.value);
                  const selectedBrand = brands.find((b) => b.id === selectedId);
                  handleInputChange("brand", selectedBrand);
                }}
              >
                <option value="">Chọn thương hiệu</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>

              {errors.brand && (
                <p className="text-red-400 text-sm mt-1">{errors.brand}</p>
              )}
            </div>


            <div>
              <label className="text-slate-400">Thuộc tính Variant:</label>
              <input
                type="text"
                className="bg-slate-800 p-2 rounded w-full mt-1"
                value={product?.variantAttributeNames || ""}
                placeholder="Ví dụ: RAM-ROM"
                onChange={(e) => handleInputChange("variantAttributeNames", e.target.value)}
              />
              {errors.variant && (
                <p className="text-red-400 text-sm mt-1">{errors.variant}</p>
              )}
              <p className="text-slate-500 text-sm mt-1">
                Nhập tên thuộc tính theo dạng ví dụ: <span className="text-slate-300">RAM-ROM</span>
                (ngăn cách bằng dấu -)
              </p>
            </div>


            <div className="mt-4">
              <label className="text-slate-400">Trạng thái:</label>

              <div
                onClick={() =>
                  handleInputChange(
                    "status",
                    product?.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
                  )
                }
                className={`mt-1 w-12 h-6 flex items-center rounded-full cursor-pointer transition
      ${product?.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transform transition
        ${product?.status === "ACTIVE" ? "translate-x-6" : "translate-x-1"}`}
                ></div>
              </div>

              <span className="text-sm text-slate-400 mt-1 block">
                {product?.status === "ACTIVE" ? "Đang hoạt động" : "Ngừng kinh doanh"}
              </span>
            </div>

            <div className="mt-4">
              <label className="text-slate-400">Nổi bật:</label>

              <div
                onClick={() => handleInputChange("isFeatured", !product?.isFeatured)}
                className={`mt-1 w-12 h-6 flex items-center rounded-full cursor-pointer transition
      ${product?.isFeatured ? "bg-yellow-500" : "bg-slate-600"}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transform transition
        ${product?.isFeatured ? "translate-x-6" : "translate-x-1"}`}
                ></div>
              </div>

              <span className="text-sm text-slate-400 mt-1 block">
                {product?.isFeatured ? "Sản phẩm nổi bật" : "Không nổi bật"}
              </span>
            </div>

            <div className="mt-4">
              <label className="text-slate-400">Hàng mới:</label>

              <div
                onClick={() => handleInputChange("isNew", !product?.isNew)}
                className={`mt-1 w-12 h-6 flex items-center rounded-full cursor-pointer transition
      ${product?.isNew ? "bg-blue-500" : "bg-slate-600"}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transform transition
        ${product?.isNew ? "translate-x-6" : "translate-x-1"}`}
                ></div>
              </div>

              <span className="text-sm text-slate-400 mt-1 block">
                {product?.isNew ? "Sản phẩm mới" : "Không phải hàng mới"}
              </span>
            </div>


            <div>
              <label className="text-slate-400">Mô tả:</label>
              <textarea
                className="bg-slate-800 p-2 rounded w-full mt-1"
                rows={4}
                value={product?.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>

            {/* Thumbnail */}
            <div className="mt-4">
              <label className="text-slate-400 mb-1 block">Thumbnail:</label>
              <div className="relative w-40 h-40 group rounded-lg overflow-hidden">
                {previewThumbnail || product?.thumbnail ? (
                  <>
                    <img
                      src={previewThumbnail || product.thumbnail}
                      alt="Thumbnail"
                      className="w-40 h-40 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                    />

                    <button
                      onClick={() => {
                        setPreviewThumbnail("");
                        setThumbnailFile(null);
                        handleInputChange("thumbnail", null);
                      }}
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition rounded-full p-1 border border-red-400/50 bg-red-500/20 hover:bg-red-500/30 text-white"
                    >
                      <XCircle size={20} />
                    </button>
                  </>
                ) : (
                  <div className="w-40 h-40 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                    Chưa có ảnh
                  </div>
                )}
              </div>

              <label className="mt-2 inline-block bg-blue-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-700">
                {previewThumbnail || product?.thumbnail ? "Đổi ảnh" : "Thêm ảnh"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setThumbnailFile(file);
                      setPreviewThumbnail(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>

              {errors.thumbnail && (
                <p className="text-red-400 text-sm mt-1">{errors.thumbnail}</p>
              )}
            </div>


            {/* Product images with add/delete */}
            <div>
              <label className="text-slate-400">Hình ảnh sản phẩm:</label>

              <div className="flex gap-2 flex-wrap mt-2">

                {newImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group w-24 h-24 rounded-lg overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`image-${idx}`}
                      className="w-24 h-24 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
                    />

                    <button
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition p-1 rounded-full border border-red-400/50 bg-red-500/20 hover:bg-red-500/30 text-white"
                      title="Xóa ảnh"
                    >
                      <XCircle size={16} />
                    </button>
                  </div>
                ))}

              </div>

              {/* Nút upload thêm ảnh */}
              <label className="mt-2 inline-block bg-blue-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-700">
                Thêm ảnh
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    if (files.length > 0) {
                      // thêm file vào danh sách file thật
                      setImageFiles(prev => [...prev, ...files]);

                      // thêm preview
                      const previews = files.map(f => URL.createObjectURL(f));
                      setNewImages(prev => [...prev, ...previews]);
                    }
                  }}
                />
              </label>
            </div>


          </div>

          <div className="flex justify-between items-center mt-4 mb-2">
            <h2 className="text-lg font-semibold">Danh sách các phiên bản</h2>

            <button
              // onClick={onCreateVariant}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Tạo phiên bản mới mới
            </button>
          </div>
          <VariantTable productId={productId} />
        </div>

        {/* Right panel: thumbnailProduct info (readonly) */}
        <div className="w-80 bg-slate-900 rounded-lg p-6 flex flex-col gap-6">
          <h2 className="text-lg font-semibold mb-2">Phiên bản chính</h2>
          {product?.thumbnailProduct ? (
            <>
              <div>
                <span className="text-slate-400">Tên phiên bản:</span>
                <div className="text-slate-200 mt-1">{product.thumbnailProduct.productVariantName}</div>
              </div>
              <div>
                <span className="text-slate-400">SKU:</span>
                <div className="text-slate-200 mt-1">{product.thumbnailProduct.sku}</div>
              </div>
              <div>
                <span className="text-slate-400">Giá:</span>
                <div className="text-slate-200 mt-1">
                  {Number(product.thumbnailProduct.currentPrice || 0).toLocaleString("vi-VN")} ₫
                </div>
              </div>

              <div>
                <span className="text-slate-400">Giá gốc:</span>
                <div className="text-slate-200 mt-1">
                  {Number(product.thumbnailProduct.rootPrice || 0).toLocaleString("vi-VN")} ₫
                </div>
              </div>

              <div>
                <span className="text-slate-400">Tồn kho:</span>
                <div className="text-slate-200 mt-1">{product.thumbnailProduct.stock}</div>
              </div>
              <div>
                <span className="text-slate-400">Ảnh biến thể:</span>
                <img
                  src={product.thumbnailProduct.variantImage}
                  alt="variant"
                  className="w-32 h-32 object-cover rounded-lg mt-1"
                />
              </div>
            </>
          ) : (
            <div className="text-slate-400">Không có biến thể chính</div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminProductDetailsPage;
