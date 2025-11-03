import React, { useState, useEffect } from 'react';
import { ShoppingCart, ArrowLeft, Minus, Plus, Trash2, Package, Shield, Gift } from 'lucide-react';
import CartService from '../../../service/CartService';
import CartItemSection from './components/CartItemSection';
import WarrantyModal from './components/WarrantyModal';
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const [selectedAll, setSelectedAll] = useState(false);
    const [activeTab, setActiveTab] = useState('cart');
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedWarrantyItem, setSelectedWarrantyItem] = useState(null);
    const selectedItems = cartItems.filter(item => item.selected);
    const canCheckout = selectedItems.length > 0 && selectedItems.every(item => item.selectedWarranty);
    const navigate = useNavigate();

    // ✅ Gọi API lấy giỏ hàng khi component mount
    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            const res = await CartService.getCart();
            if (res.success) {
                const mappedItems = res.result.map(item => ({
                    id: item.id,
                    selected: false,
                    productId: item.productVariant.product.id,
                    variantId: item.productVariant.id,
                    name: item.productVariant.productVariantName,
                    brand: "Chính hãng",
                    image: item.productVariant.variantImage,
                    price: item.productVariant.currentPrice,
                    originalPrice: item.productVariant.rootPrice,
                    quantity: item.quantity,
                    promotions: item.productVariant.promotions || [],
                    giftProducts: item.productVariant.giftProducts || [],
                    warranties: item.productVariant.warranties || []
                }));
                setCartItems(mappedItems);
            } else {
                console.error(res.message);
            }
            setLoading(false);
        };
        fetchCart();
    }, []);

    const handleCheckout = () => {
        const selectedItems = cartItems
            .filter(item => item.selected)
            .map(item => {
                const { total } = calculateItemTotal(item);
                return {
                    ...item,
                    total,
                    warrantyId: item.selectedWarranty?.id || null // lấy từ item
                };
            });

        if (selectedItems.length === 0) return;

        navigate("/checkout", { state: { selectedItems } });
    };



    const handleSelectWarranty = (itemId, warranty) => {
        setCartItems(prev =>
            prev.map(it =>
                it.id === itemId ? { ...it, selectedWarranty: warranty } : it
            )
        );
        setSelectedWarrantyItem(null);
    };

    const handleSelectAll = () => {
        const newValue = !selectedAll;
        setSelectedAll(newValue);
        setCartItems(cartItems.map(item => ({ ...item, selected: newValue })));
    };

    const handleSelectItem = (id) => {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, selected: !item.selected } : item
        );
        setCartItems(updatedItems);
        setSelectedAll(updatedItems.every(item => item.selected));
    };

    const handleQuantityChange = async (id, change) => {
        // ✅ Tìm item trong giỏ
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        // ✅ Cập nhật giao diện ngay
        setCartItems(updatedCart);

        // ✅ Gửi request lên server
        const item = updatedCart.find(item => item.id === id);
        const itemQuantityRequest = {
            cartItemId: item.id,        // id của item trong giỏ
            quantity: item.quantity     // số lượng mới
        };

        const res = await CartService.updateQuantity(itemQuantityRequest);

        if (!res.success) {
            console.error("❌ Lỗi cập nhật số lượng:", res.message);
            // 🔁 Nếu lỗi → khôi phục lại số lượng cũ
            setCartItems(cartItems);
        }
    };


    const handleDeleteItem = async (id) => {
        const res = await CartService.deleteCartItem(id);

        if (res.success) {
            // ✅ Xóa item khỏi danh sách hiển thị trên UI
            setCartItems(cartItems.filter(item => item.id !== id));
        } else {
            console.error("❌ Lỗi xóa sản phẩm:", res.message);
            alert("Không thể xóa sản phẩm khỏi giỏ hàng!");
        }
    };


    const formatPrice = (price) => {
        return price?.toLocaleString('vi-VN') + 'đ';
    };

    // ✅ Tính giá sau khuyến mãi, cộng bảo hành, nhân số lượng
    const calculateItemTotal = (item) => {
        let basePrice = item.price;
        let totalDiscount = 0;

        item.promotions.forEach(promo => {
            const config = promo.config ? JSON.parse(promo.config) : {};
            if (promo.type === "DISCOUNT_AMOUNT" && config.amount) {
                basePrice -= config.amount;
                totalDiscount += config.amount;
            } else if (promo.type === "DISCOUNT_PERCENT" && config.percent) {
                const discount = basePrice * (config.percent / 100);
                basePrice -= discount;
                totalDiscount += discount;
            }
        });

        const warrantyPrice = item.selectedWarranty?.price || 0;
        const total = (basePrice + warrantyPrice) * item.quantity;
        return { total, totalDiscount, warrantyPrice, basePrice };
    };

    // ✅ Tính tổng tạm tính tất cả sản phẩm được chọn
    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => {
            if (!item.selected) return sum;
            const { total } = calculateItemTotal(item);
            return sum + total;
        }, 0);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-gray-600 animate-pulse text-lg font-medium">
                    Đang tải giỏ hàng...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between relative">
                    <div className="text-lg font-semibold text-black mx-auto">Giỏ hàng của bạn</div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-4 mb-4">
                            <input
                                type="checkbox"
                                checked={selectedAll}
                                onChange={handleSelectAll}
                                className="appearance-none w-5 h-5 rounded-full border-2 border-blue-600 cursor-pointer transition-all duration-200 checked:bg-blue-600 checked:border-blue-600 bg-white"
                            />
                            <span className="font-medium text-gray-700">Chọn tất cả</span>
                        </div>

                        {/* Cart Items */}
                        {cartItems.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
                                Giỏ hàng trống.
                            </div>
                        ) : (
                            cartItems.map(item => (
                                <CartItemSection
                                    key={item.id}
                                    item={item}
                                    calculateItemTotal={calculateItemTotal}
                                    handleSelectItem={handleSelectItem}
                                    handleQuantityChange={handleQuantityChange}
                                    handleDeleteItem={handleDeleteItem}
                                    setSelectedWarrantyItem={setSelectedWarrantyItem}
                                    formatPrice={formatPrice}
                                />
                            ))
                        )}
                    </div>

                    {/* Sidebar tổng */}
                    <div className="lg:w-96">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Tạm tính:</span>
                                    <span className="font-semibold text-gray-900">
                                        {formatPrice(calculateTotal())}
                                    </span>
                                </div>
                            </div>

                            <button
                                disabled={!canCheckout}
                                onClick={handleCheckout}
                                className={`w-full py-4 rounded-lg font-semibold text-lg transition ${canCheckout
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Mua ngay
                            </button>


                            <p className={`text-xs text-center mt-3 font-semibold ${selectedItems.length === 0 || !selectedItems.every(item => item.selectedWarranty)
                                    ? 'text-red-600'
                                    : 'text-gray-500'
                                }`}>
                                {selectedItems.length === 0
                                    ? "Vui lòng chọn sản phẩm để tiếp tục"
                                    : !selectedItems.every(item => item.selectedWarranty)
                                        ? "Vui lòng chọn gói bảo hành cho sản phẩm đã chọn"
                                        : " "}
                            </p>

                        </div>
                    </div>
                </div>
            </div>

            {/* Modal chọn bảo hành */}
            <WarrantyModal
                selectedWarrantyItem={selectedWarrantyItem}
                cartItems={cartItems}
                handleSelectWarranty={handleSelectWarranty}
                setSelectedWarrantyItem={setSelectedWarrantyItem}
            />
        </div>
    );
};

export default CartPage;
