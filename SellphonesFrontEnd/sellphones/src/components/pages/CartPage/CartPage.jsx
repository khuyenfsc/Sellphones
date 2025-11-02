import React, { useState } from 'react';
import { ShoppingCart, ArrowLeft, Minus, Plus, Trash2, Package, Shield, Gift } from 'lucide-react';

const CartPage = () => {
    const [selectedAll, setSelectedAll] = useState(false);
    const [activeTab, setActiveTab] = useState('cart');
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            selected: false,
            name: 'MacBook Air M4 13 inch 2025 10CPU 10GPU 16GB 512GB',
            brand: 'Chính hãng Apple',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
            price: 30790000,
            originalPrice: 31990000,
            quantity: 1,
            promotion: 'Đặc quyền trợ giá lên đến 3 triệu khi thu cũ lên đời Macbook'
        }
    ]);

    const [addOnProducts, setAddOnProducts] = useState([
        {
            id: 1,
            name: 'Ưu đãi tối đa 100k khi mua kèm chuột - bàn phím',
            image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&q=80',
            discount: 'Giảm thêm 5%',
            selected: false
        },
        {
            id: 2,
            name: 'Ưu đãi tối đa 200K khi mua kèm màn hình',
            image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&q=80',
            discount: '',
            selected: false
        }
    ]);

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

    const handleQuantityChange = (id, change) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
        ));
    };

    const handleDeleteItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleSelectAddOn = (id) => {
        setAddOnProducts(addOnProducts.map(product =>
            product.id === id ? { ...product, selected: !product.selected } : product
        ));
    };

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN') + 'đ';
    };

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => item.selected ? sum + (item.price * item.quantity) : sum, 0);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between relative">
                    {/* Tiêu đề căn giữa */}
                    <div className="text-lg font-semibold text-black mx-auto">Giỏ hàng của bạn</div>
                </div>
            </div>


            <div className="max-w-6xl mx-auto px-4 py-6">

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Select All */}
                        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedAll}
                                    onChange={handleSelectAll}
                                    className="w-5 h-5 rounded-full border-gray-300 text-blue-600 bg-white focus:ring-blue-500 checked:bg-white checked:border-blue-600"
                                />
                                <span className="ml-3 font-medium text-gray-700">Chọn tất cả</span>
                            </label>
                        </div>


                        {/* Cart Items */}
                        {cartItems.map(item => (
                            <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 mb-4">
                                <div className="flex items-start gap-4">
                                    <input
                                        type="checkbox"
                                        checked={item.selected}
                                        onChange={() => handleSelectItem(item.id)}
                                        className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500 mt-1"
                                    />

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                                        <p className="text-sm text-gray-500 mb-3">{item.brand}</p>

                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-xl font-bold text-red-600">
                                                {formatPrice(item.price)}
                                            </span>
                                            <span className="text-sm text-gray-400 line-through">
                                                {formatPrice(item.originalPrice)}
                                            </span>
                                        </div>

                                        {/* Promotion */}
                                        <div className="bg-red-50 rounded-lg p-3 mb-4">
                                            <div className="flex items-start gap-2">
                                                <Gift className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="font-medium text-red-600 text-sm mb-1">Khuyến mãi hấp dẫn</p>
                                                    <p className="text-sm text-gray-700 flex items-start gap-2">
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                                                        {item.promotion}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Warranty */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Shield className="w-5 h-5" />
                                                <span>Bảo vệ toàn diện với Bảo hành mở rộng</span>
                                            </div>
                                            <button className="text-red-600 text-sm font-medium hover:underline">
                                                chọn gói
                                            </button>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 border border-gray-300 rounded-lg">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    className="p-2 hover:bg-gray-100 transition"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-12 text-center font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    className="p-2 hover:bg-gray-100 transition"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => handleDeleteItem(item.id)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition"
                                            >
                                                <Trash2 className="w-5 h-5 text-red-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Add-on Products */}
                        <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-lg shadow-sm p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Package className="w-6 h-6 text-red-600" />
                                <h3 className="font-semibold text-gray-900">Mua kèm tiết kiệm hơn</h3>
                            </div>

                            {addOnProducts.map(product => (
                                <div key={product.id} className="bg-white rounded-lg p-4 mb-3 last:mb-0 hover:shadow-md transition">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 mb-1">{product.name}</p>
                                            {product.discount && (
                                                <span className="inline-block bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                                                    {product.discount}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleSelectAddOn(product.id)}
                                            className={`px-6 py-2 rounded-lg font-medium transition ${product.selected
                                                ? 'bg-gray-200 text-gray-700'
                                                : 'bg-red-600 text-white hover:bg-red-700'
                                                }`}
                                        >
                                            {product.selected ? 'Đã chọn' : 'Chọn'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary Sidebar */}
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
                                disabled={cartItems.filter(item => item.selected).length === 0}
                                className={`w-full py-4 rounded-lg font-semibold text-lg transition ${cartItems.filter(item => item.selected).length > 0
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Mua ngay
                            </button>

                            <p className="text-xs text-center text-gray-500 mt-3">
                                Vui lòng chọn sản phẩm để tiếp tục
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;