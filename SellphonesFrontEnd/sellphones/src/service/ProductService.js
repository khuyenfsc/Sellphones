import AxiosClient from "../api/AxiosClient";

const ProductService = {
  async getFeaturedProductsByCategoryName(categoryName) {
    try {
      // Encode để tránh lỗi khi category có dấu hoặc ký tự đặc biệt
      const encodedCategory = encodeURIComponent(categoryName);

      const res = await AxiosClient.get(`/products/featured-products/${encodedCategory}`);
      const products = res?.data?.result ?? [];

      // 👉 Có thể transform thêm nếu cần
      return products;
    } catch (error) {
      console.error(`❌ Lỗi khi tải sản phẩm nổi bật cho danh mục "${categoryName}":`, error);
      return [];
    }
  },

  async getProductById(id) {
    try {

      const res = await AxiosClient.get(`/products/${id}`);
      const product = res?.data?.result ?? null;

      // 👉 Có thể transform thêm nếu cần
      return product;
    } catch (error) {
      console.error(`❌ Lỗi khi tải sản phẩm  "${id}":`, error);
      return null;
    }
  },

  async getProductVariantById(id) {
    try {

      const res = await AxiosClient.get(`/products/product-variants/${id}`);
      const productVariant = res?.data?.result ?? null;

      // 👉 Có thể transform thêm nếu cần
      return productVariant;
    } catch (error) {
      console.error(`❌ Lỗi khi tải phiên bản sản phẩm "${id}":`, error);
      return null;
    }
  },

  async getSimilarProducts(id) {
    try {

      const res = await AxiosClient.get(`/products/${id}/similar-products`);
      const similarProducts = res?.data?.result ?? null;

      // 👉 Có thể transform thêm nếu cần
      return similarProducts;
    } catch (error) {
      console.error(`❌ Lỗi khi tải sản phẩm tương tự "${id}":`, error);
      return null;
    }
  },

  async getProductsByFilters(selectedOptions, staticParams, page = 0, size = 5, sort = "desc") {
    try {
      // 🔹 Bước 1: Chuyển selectedOptions → dynamicFilters
      const dynamicFilters = {};

      Object.entries(selectedOptions).forEach(([groupName, option]) => {
        const groupId = option.groupId;
        const condition = option.condition;

        if (groupName === "Giá" && condition.includes("-")) {
          const [min, max] = condition.split("-");
          dynamicFilters["price"] = `${min}-${max}`;
        } else {
          dynamicFilters[groupId] = condition;
        }
      });

      // 🔹 Bước 2: Format body request
      const filterRequest = {
        query: {
          _static: {
            categoryName: staticParams.categoryName,
            brandId: staticParams.brandId || null,
            priceRange: staticParams.priceRange || null,
          },
          dynamic: dynamicFilters,
        },
        page,
        size,
        sort,
      };

      // 🔹 Bước 3: Gửi request đến API
      const res = await AxiosClient.post("/products/query", filterRequest);
      const data = res?.data?.products ?? {};

      return {
        products: data.result ?? [],
        totalPages: data.totalPages ?? 1,
      };
    } catch (error) {
      console.error("❌ Lỗi khi lọc sản phẩm:", error);
      return {
        products: [],
        totalPages: 1,
      };
    }
  },
};

export default ProductService;
