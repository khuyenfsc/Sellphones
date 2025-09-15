-- CATEGORY
INSERT INTO category (name, created_at) VALUES ('Điện thoại', CURRENT_TIMESTAMP);
INSERT INTO category (name, created_at) VALUES ('Tablet', CURRENT_TIMESTAMP);
INSERT INTO category (name, created_at) VALUES ('Laptop', CURRENT_TIMESTAMP);

INSERT INTO brand (id, name, brand_icon) VALUES (1, 'Apple', 'https://example.com/icons/apple.png');
INSERT INTO brand (id, name, brand_icon) VALUES (2, 'Samsung', 'https://example.com/icons/samsung.png');
INSERT INTO brand (id, name, brand_icon) VALUES (3, 'Google', 'https://example.com/icons/google.png');
INSERT INTO brand (id, name, brand_icon) VALUES (4, 'OnePlus', 'https://example.com/icons/oneplus.png');
INSERT INTO brand (id, name, brand_icon) VALUES (5, 'Xiaomi', 'https://example.com/icons/xiaomi.png');
INSERT INTO brand (id, name, brand_icon) VALUES (6, 'Oppo', 'https://example.com/icons/oppo.png');
INSERT INTO brand (id, name, brand_icon) VALUES (7, 'Vivo', 'https://example.com/icons/vivo.png');
INSERT INTO brand (id, name, brand_icon) VALUES (8, 'Sony', 'https://example.com/icons/sony.png');
INSERT INTO brand (id, name, brand_icon) VALUES (9, 'Asus', 'https://example.com/icons/asus.png');
INSERT INTO brand (id, name, brand_icon) VALUES (10, 'Realme', 'https://example.com/icons/realme.png');
INSERT INTO brand (id, name, brand_icon) VALUES (11, 'Huawei', 'https://example.com/icons/huawei.png');
INSERT INTO brand (id, name, brand_icon) VALUES (12, 'Nothing', 'https://example.com/icons/nothing.png');
INSERT INTO brand (id, name, brand_icon) VALUES (13, 'Dell', 'https://example.com/icons/dell.png');
INSERT INTO brand (id, name, brand_icon) VALUES (14, 'HP', 'https://example.com/icons/hp.png');
INSERT INTO brand (id, name, brand_icon) VALUES (15, 'Lenovo', 'https://example.com/icons/lenovo.png');
INSERT INTO brand (id, name, brand_icon) VALUES (16, 'MSI', 'https://example.com/icons/msi.png');
INSERT INTO brand (id, name, brand_icon) VALUES (17, 'Acer', 'https://example.com/icons/acer.png');
INSERT INTO brand (id, name, brand_icon) VALUES (18, 'Razer', 'https://example.com/icons/razer.png');
INSERT INTO brand (id, name, brand_icon) VALUES (19, 'Microsoft', 'https://example.com/icons/microsoft.png');

INSERT INTO app_user (id, full_name, avatar_url, email, password, date_of_birth, phone_number, role, gender, created_at)
VALUES
(1, 'Nguyen Van A', NULL, 'a@example.com', '{noop}123456', NULL, NULL, 'ADMIN', 'MALE', CURRENT_TIMESTAMP),
(2, 'Tran Thi B', NULL, 'b@example.com', '{noop}123456', NULL, NULL, 'CUSTOMER', 'FEMALE', CURRENT_TIMESTAMP),
(3, 'Le Van C', NULL, 'c@example.com', '{noop}123456', NULL, NULL, 'CUSTOMER', 'MALE', CURRENT_TIMESTAMP),
(4, 'Pham Thi D', NULL, 'd@example.com', '{noop}123456', NULL, NULL, 'CUSTOMER', 'FEMALE', CURRENT_TIMESTAMP),
(5, 'Hoang Van E', NULL, 'e@example.com', '{noop}123456', NULL, NULL, 'CUSTOMER', 'MALE', CURRENT_TIMESTAMP),
(6, 'Vu Thi F', NULL, 'f@example.com', '{noop}123456', NULL, NULL, 'CUSTOMER', 'FEMALE', CURRENT_TIMESTAMP),
(7, 'Do Van G', NULL, 'g@example.com', '{noop}123456', NULL, NULL, 'CUSTOMER', 'MALE', CURRENT_TIMESTAMP),
(8, 'Nguyen Thi H', NULL, 'h@example.com', '{noop}123456', NULL, NULL, 'CUSTOMER', 'FEMALE', CURRENT_TIMESTAMP);

-- Giỏ hàng của User 1
INSERT INTO cart (id, user_id, created_at, updated_at)
VALUES (1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Giỏ hàng của User 2
INSERT INTO cart (id, user_id, created_at, updated_at)
VALUES (2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Giỏ hàng của User 3
INSERT INTO cart (id, user_id, created_at, updated_at)
VALUES (3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO category_option (name, category_id, created_at) VALUES ('Hãng điện thoại', 1, CURRENT_TIMESTAMP);
INSERT INTO category_option (name, category_id, created_at) VALUES ('Mức giá', 1, CURRENT_TIMESTAMP);

INSERT INTO category_option (name, category_id, created_at) VALUES ('Hãng sản xuất', 2, CURRENT_TIMESTAMP);
INSERT INTO category_option (name, category_id, created_at) VALUES ('Mức giá', 2, CURRENT_TIMESTAMP);

INSERT INTO category_option (name, category_id, created_at) VALUES ('Thương hiệu', 3, CURRENT_TIMESTAMP);
INSERT INTO category_option (name, category_id, created_at) VALUES ('Phân khúc giá', 3, CURRENT_TIMESTAMP);
INSERT INTO category_option (name, category_id, created_at) VALUES ('Nhu cầu sử dụng', 3, CURRENT_TIMESTAMP);

INSERT INTO category_option_value (name, category_option_id, created_at) VALUES ('Apple', 1, CURRENT_TIMESTAMP);
INSERT INTO category_option_value (name, category_option_id, created_at) VALUES ('Samsung', 1, CURRENT_TIMESTAMP);

INSERT INTO category_option_value (name, category_option_id, created_at) VALUES ('Dưới 2 triệu', 2, CURRENT_TIMESTAMP);
INSERT INTO category_option_value (name, category_option_id, created_at) VALUES ('Từ 3 đến 5 triệu', 2, CURRENT_TIMESTAMP);
INSERT INTO category_option_value (name, category_option_id, created_at) VALUES ('Trên 10 triệu', 2, CURRENT_TIMESTAMP);

INSERT INTO category_option_value (name, category_option_id, created_at) VALUES ('Dell', 3, CURRENT_TIMESTAMP);
INSERT INTO category_option_value (name, category_option_id, created_at) VALUES ('Macbook', 3, CURRENT_TIMESTAMP);

INSERT INTO category_option_value (name, category_option_id, created_at) VALUES ('Dưới 10 triệu', 5, CURRENT_TIMESTAMP);
INSERT INTO category_option_value (name, category_option_id, created_at) VALUES ('Từ 10 đến 15 triệu', 5, CURRENT_TIMESTAMP);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, created_at, category_id, is_featured)
VALUES (1, 'iPhone 15', 'https://example.com/iphone15.jpg', 'Latest iPhone model', 1, CURRENT_TIMESTAMP, 1, true);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, created_at, category_id, is_featured)
VALUES (2, 'Samsung Galaxy S24', 'https://example.com/galaxyS24.jpg', 'Latest Samsung Galaxy', 2, CURRENT_TIMESTAMP, 1, true);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, created_at, category_id, is_featured)
VALUES (3, 'Google Pixel 8 Pro', 'https://example.com/pixel8pro.jpg', 'Flagship mới nhất của Google', 3, CURRENT_TIMESTAMP, 1, true);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, created_at, category_id, is_featured)
VALUES (4, 'OnePlus 12', 'https://example.com/oneplus12.jpg', 'Điện thoại hiệu năng cao của OnePlus', 4, CURRENT_TIMESTAMP, 1, false);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, created_at, category_id, is_featured)
VALUES (5, 'Xiaomi 14 Ultra', 'https://example.com/xiaomi14ultra.jpg', 'Camera đỉnh cao, cấu hình mạnh mẽ', 5, CURRENT_TIMESTAMP, 1, true);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, created_at, category_id, is_featured)
VALUES (6, 'Oppo Find X7 Pro', 'https://example.com/findx7pro.jpg', 'Thiết kế sang trọng, chụp ảnh đẹp', 6, CURRENT_TIMESTAMP, 1, false);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, created_at, category_id, is_featured)
VALUES (7, 'Vivo X100 Pro', 'https://example.com/vivox100pro.jpg', 'Điện thoại chuyên chụp ảnh', 7, CURRENT_TIMESTAMP, 1, true);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, created_at, category_id, is_featured)
VALUES (8, 'Sony Xperia 1 V', 'https://example.com/xperia1v.jpg', 'Smartphone cao cấp với màn hình 4K', 8, CURRENT_TIMESTAMP, 1, false);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, created_at, category_id, is_featured)
VALUES (9, 'Asus ROG Phone 8', 'https://example.com/rogphone8.jpg', 'Gaming phone cực mạnh', 9, CURRENT_TIMESTAMP, 1, true);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, created_at, category_id, is_featured)
VALUES (10, 'Realme GT 6 Pro', 'https://example.com/realmegt6pro.jpg', 'Điện thoại flagship giá tốt', 10, CURRENT_TIMESTAMP, 1, false);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, created_at, category_id, is_featured)
VALUES (11, 'Huawei P60 Pro', 'https://example.com/p60pro.jpg', 'Camera Leica, chụp ảnh xuất sắc', 11, CURRENT_TIMESTAMP, 1, true);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, created_at, category_id, is_featured)
VALUES (12, 'Nothing Phone 2', 'https://example.com/nothingphone2.jpg', 'Thiết kế độc đáo với đèn LED', 12, CURRENT_TIMESTAMP, 1, false);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, category_id, is_featured, created_at)
VALUES (13, 'MacBook Pro 14"', 'https://example.com/macbookpro14.jpg', 'Apple MacBook Pro 14-inch with M2 Pro chip', 1, 2, true, CURRENT_TIMESTAMP);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, category_id, is_featured, created_at)
VALUES (14, 'Dell XPS 13', 'https://example.com/dellxps13.jpg', 'Dell XPS 13 ultrabook with InfinityEdge display', 13, 2, true, CURRENT_TIMESTAMP);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, category_id, is_featured, created_at)
VALUES (15, 'HP Spectre x360', 'https://example.com/hpspectrex360.jpg', 'Convertible 2-in-1 laptop with OLED display', 14, 2, true, CURRENT_TIMESTAMP);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, category_id, is_featured, created_at)
VALUES (16, 'Lenovo ThinkPad X1 Carbon', 'https://example.com/thinkpadx1carbon.jpg', 'Business laptop with lightweight carbon fiber body', 15, 2, false, CURRENT_TIMESTAMP);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, category_id, is_featured, created_at)
VALUES (17, 'Asus ROG Zephyrus G14', 'https://example.com/rogzephyrusg14.jpg', 'Compact gaming laptop with Ryzen 9 processor', 9, 2, false, CURRENT_TIMESTAMP);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, category_id, is_featured, created_at)
VALUES (18, 'MSI Stealth 15M', 'https://example.com/msistealth15m.jpg', 'Slim gaming laptop with RTX 4060 GPU', 16, 2, false, CURRENT_TIMESTAMP);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, category_id, is_featured, created_at)
VALUES (19, 'Acer Swift 3', 'https://example.com/acerswift3.jpg', 'Lightweight laptop with long battery life', 17, 2, false, CURRENT_TIMESTAMP);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, category_id, is_featured, created_at)
VALUES (20, 'Razer Blade 15', 'https://example.com/razerblade15.jpg', 'Premium gaming laptop with aluminum chassis', 18, 2, false, CURRENT_TIMESTAMP);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, category_id, is_featured, created_at)
VALUES (21, 'Microsoft Surface Laptop 5', 'https://example.com/surfacelaptop5.jpg', 'Touchscreen laptop with sleek design', 19, 2, false, CURRENT_TIMESTAMP);

INSERT INTO product (id, name, thumbnail_url, description, brand_id, category_id, is_featured, created_at)
VALUES (22, 'Huawei MateBook X Pro', 'https://example.com/matebookxpro.jpg', 'Ultra-slim laptop with 3K touchscreen', 11, 2, false, CURRENT_TIMESTAMP);

-- Variants cho iPhone 15
INSERT INTO product_variant (id, product_variant_name, price, sku, product_id, stock, created_at, variant_image)
VALUES (1, 'iPhone 15B - 128G - Black', 24990000, 'IP15-128-BLK', 1, 50, CURRENT_TIMESTAMP, 'https://example.com/images/ip15-128-blk.jpg');

INSERT INTO product_variant (id, product_variant_name, price, sku, product_id, stock, created_at, variant_image)
VALUES (2, 'iPhone 15 - 256GB - White', 27990000, 'IP15-256-WHT', 1, 30, CURRENT_TIMESTAMP, 'https://example.com/images/ip15-256-wht.jpg');

-- Variants cho Samsung Galaxy S24
INSERT INTO product_variant (id, product_variant_name, price, sku, product_id, stock, created_at, variant_image)
VALUES (3, 'Galaxy S24 - 128GB - Phantom Black', 21990000, 'SGS24-128-BLK', 2, 40, CURRENT_TIMESTAMP, 'https://example.com/images/sgs24-128-blk.jpg');

INSERT INTO product_variant (id, product_variant_name, price, sku, product_id, stock, created_at, variant_image)
VALUES (4, 'Galaxy S24 - 256GB - Cream', 24990000, 'SGS24-256-CRM', 2, 25, CURRENT_TIMESTAMP, 'https://example.com/images/sgs24-256-crm.jpg');

-- Variants cho Google Pixel 8 Pro
INSERT INTO product_variant (id, product_variant_name, price, sku, product_id, stock, created_at, variant_image)
VALUES (5, 'Pixel 8 Pro - 128GB - Obsidian', 20990000, 'PIX8P-128-OBS', 3, 35, CURRENT_TIMESTAMP, 'https://example.com/images/pix8p-128-obs.jpg');

-- Variants cho MacBook Pro 14
INSERT INTO product_variant (id, product_variant_name, price, sku, product_id, stock, created_at, variant_image)
VALUES (6, 'MacBook Pro 14\" - M2 Pro - 16GB RAM - 512GB SSD', 49990000, 'MBP14-M2P-16-512', 13, 20, CURRENT_TIMESTAMP, 'https://example.com/images/mbp14-m2p-16-512.jpg');

INSERT INTO product_variant (id, product_variant_name, price, sku, product_id, stock, created_at, variant_image)
VALUES (7, 'MacBook Pro 14\" - M2 Pro - 32GB RAM - 1TB SSD', 59990000, 'MBP14-M2P-32-1TB', 13, 10, CURRENT_TIMESTAMP, 'https://example.com/images/mbp14-m2p-32-1tb.jpg');

-- Variants cho Dell XPS 13
INSERT INTO product_variant (id, product_variant_name, price, sku, product_id, stock, created_at, variant_image)
VALUES (8, 'Dell XPS 13 - Core i7 - 16GB RAM - 512GB SSD', 37990000, 'DXPS13-I7-16-512', 14, 15, CURRENT_TIMESTAMP, 'https://example.com/images/dxps13-i7-16-512.jpg');

INSERT INTO product_variant (id, product_variant_name, price, sku, product_id, stock, created_at, variant_image)
VALUES (9, 'Dell XPS 13 - Core i5 - 8GB RAM - 256GB SSD', 28990000, 'DXPS13-I5-8-256', 14, 25, CURRENT_TIMESTAMP, 'https://example.com/images/dxps13-i5-8-256.jpg');

-- Variants cho OnePlus 12
INSERT INTO product_variant (id, product_variant_name, price, sku, product_id, stock, created_at, variant_image)
VALUES (10, 'OnePlus 12 - 12GB RAM - 256GB', 18990000, 'OP12-12-256', 4, 40, CURRENT_TIMESTAMP, 'https://example.com/images/op12-12-256.jpg');

INSERT INTO product_variant (id, product_variant_name, price, sku, product_id, stock, created_at, variant_image)
VALUES (11, 'OnePlus 12 - 16GB RAM - 512GB', 22990000, 'OP12-16-512', 4, 20, CURRENT_TIMESTAMP, 'https://example.com/images/op12-16-512.jpg');

-- iPhone 15 128GB (id=1) có 2 khuyến mãi
INSERT INTO product_promotion (id, name, description, promotion_type, config, condition, start_date, end_date) VALUES
(1, 'Giảm 1 triệu iPhone 15 128GB', 'Giảm trực tiếp 1,000,000đ', 'DISCOUNT_AMOUNT', '{"amount":1000000}', NULL, '2025-09-01', '2025-09-30'),
(2, 'Voucher iPhone128-5%', 'Nhập mã IP128 giảm thêm 5%', 'DISCOUNT_PERCENT', '{"percent":5}', NULL, '2025-09-05', '2025-09-25');

-- iPhone 15 256GB (id=2) có 3 khuyến mãi
INSERT INTO product_promotion (id, name, description, promotion_type, config, condition, start_date, end_date) VALUES
(3, 'Giảm 10% iPhone 15 256GB', 'Giảm 10% trên giá niêm yết', 'DISCOUNT_PERCENT', '{"percent":10}', NULL, '2025-09-05', '2025-09-20'),
(4, 'Tặng bảo hành 12 tháng', 'Bảo hành thêm 12 tháng miễn phí', 'SERVICE', '{"service":"Extended Warranty","duration":"12 months"}', NULL, '2025-09-01', '2025-12-31'),
(5, 'Voucher IP256-7%', 'Nhập mã IP256 giảm thêm 7%', 'DISCOUNT_PERCENT', '{"percent":7}', '{"paymentMethods":["VISA"]}', '2025-09-10', '2025-09-25');

-- Galaxy S24 (id=3) có 2 khuyến mãi
INSERT INTO product_promotion (id, name, description, promotion_type, config, condition, start_date, end_date) VALUES
(6, 'Giảm giá trực tiếp 2 triệu', 'Giảm 2,000,000đ khi mua Galaxy S24', 'DISCOUNT_AMOUNT', '{"amount":2000000}', NULL, '2025-09-10', '2025-09-30'),
(7, 'Voucher Galaxy 10%', 'Nhập mã GS24 giảm thêm 10%', 'DISCOUNT_PERCENT', '{"percent":10}', '{"paymentMethods":["VISA","MASTERCARD"]}', '2025-09-15', '2025-09-30');

-- MacBook Air M3 (id=4) có 3 khuyến mãi
INSERT INTO product_promotion (id, name, description, promotion_type, config, condition, start_date, end_date) VALUES
(8, 'Tặng Office 365 1 năm', 'Miễn phí Microsoft Office 365 trong 12 tháng', 'SERVICE', '{"service":"Office 365","duration":"12 months"}', NULL, '2025-09-01', '2025-12-31'),
(9, 'Giảm 5% khi thanh toán qua thẻ Visa', 'Thanh toán qua Visa giảm thêm 5%', 'DISCOUNT_PERCENT', '{"percent":5}', '{"paymentMethods":["VISA"]}', '2025-09-01', '2025-09-30'),
(10, 'Voucher MBA-3%', 'Nhập mã MBA3 giảm thêm 3%', 'DISCOUNT_PERCENT', '{"percent":3}', '{"paymentMethods":["VISA","MASTERCARD"]}', '2025-09-10', '2025-09-30');

-- iPhone 15 128GB (id=1) liên kết với promotions 1, 2
INSERT INTO product_variant_promotion (product_variant_id, product_promotion_id) VALUES
(1, 1),
(1, 2);

-- iPhone 15 256GB (id=2) liên kết với promotions 3, 4, 5
INSERT INTO product_variant_promotion (product_variant_id, product_promotion_id) VALUES
(2, 3),
(2, 4),
(2, 5);

-- Galaxy S24 (id=3) liên kết với promotions 6, 7
INSERT INTO product_variant_promotion (product_variant_id, product_promotion_id) VALUES
(3, 6),
(3, 7);

-- MacBook Air M3 (id=4) liên kết với promotions 8, 9, 10
INSERT INTO product_variant_promotion (product_variant_id, product_promotion_id) VALUES
(4, 8),
(4, 9),
(4, 10);




INSERT INTO warranty (id, name, number_of_months, val, description)
VALUES
(1, 'Bảo hành 12 tháng chính hãng', 12, 0, 'Bảo hành phần cứng chính hãng trong 12 tháng'),
(2, 'Bảo hành mở rộng 24 tháng', 24, 600000, 'Mua thêm 24 tháng bảo hành mở rộng'),
(3, 'Bảo hành rơi vỡ, vào nước 12 tháng', 12, 900000, 'Bao gồm rơi vỡ, vào nước 1 lần/năm'),
(4, 'Bảo hành VIP 36 tháng', 36, 1800000, 'Bảo hành toàn diện 36 tháng, 1 đổi 1 trong 30 ngày'),
(5, 'Bảo hành pin 18 tháng', 18, 300000, 'Thay pin miễn phí 1 lần trong 18 tháng');


-- iPhone 15B - 128G - Black
INSERT INTO variant_warranty (product_variant_id, warranty_id)
VALUES
(1, 1),  -- bảo hành chính hãng
(1, 2),  -- mua thêm 24 tháng
(1, 3);  -- thêm bảo hành rơi vỡ

-- iPhone 15 - 256GB - White
INSERT INTO variant_warranty (product_variant_id, warranty_id)
VALUES
(2, 1),
(2, 4);  -- VIP 36 tháng

-- Galaxy S24 - 128GB
INSERT INTO variant_warranty (product_variant_id, warranty_id)
VALUES
(3, 1),
(3, 5);  -- bảo hành pin riêng

-- Galaxy S24 - 256GB
INSERT INTO variant_warranty (product_variant_id, warranty_id)
VALUES
(4, 1),
(4, 2),
(4, 3);

-- Pixel 8 Pro - 128GB
INSERT INTO variant_warranty (product_variant_id, warranty_id)
VALUES
(5, 1),
(5, 5);

-- MacBook Pro 14" - M2 Pro - 16GB
INSERT INTO variant_warranty (product_variant_id, warranty_id)
VALUES
(6, 1),
(6, 2),
(6, 4);

-- MacBook Pro 14" - M2 Pro - 32GB
INSERT INTO variant_warranty (product_variant_id, warranty_id)
VALUES
(7, 1),
(7, 4);

-- Dell XPS 13 - Core i7
INSERT INTO variant_warranty (product_variant_id, warranty_id)
VALUES
(8, 1),
(8, 2);

-- Dell XPS 13 - Core i5
INSERT INTO variant_warranty (product_variant_id, warranty_id)
VALUES
(9, 1),
(9, 5);

-- OnePlus 12 - 12GB RAM
INSERT INTO variant_warranty (product_variant_id, warranty_id)
VALUES
(10, 1),
(10, 3);

-- OnePlus 12 - 16GB RAM
INSERT INTO variant_warranty (product_variant_id, warranty_id)
VALUES
(11, 1),
(11, 2),
(11, 4);



-- Quà tặng 1: Ốp lưng iPhone 15
INSERT INTO gift_product (id, name, stock, description, thumbnail_url, price)
VALUES (1, 'Ốp lưng silicon iPhone 15', 100, 'Ốp lưng silicon trong suốt, bảo vệ điện thoại tốt',
        'https://example.com/iphone15-case.jpg', 0);

-- Quà tặng 2: Tai nghe Bluetooth mini
INSERT INTO gift_product (id, name, stock, description, thumbnail_url, price)
VALUES (2, 'Tai nghe Bluetooth mini', 50, 'Tai nghe không dây, pin 12h, dễ mang theo',
        'https://example.com/bluetooth-earbuds.jpg', 0);

-- Quà tặng 3: Bình giữ nhiệt
INSERT INTO gift_product (id, name, stock, description, thumbnail_url, price)
VALUES (3, 'Bình giữ nhiệt 500ml', 200, 'Bình giữ nhiệt inox, giữ nóng/lạnh 8h',
        'https://example.com/thermos.jpg', 0);

-- iPhone 15 (id=1 trong bảng product) được tặng kèm ốp lưng và tai nghe
INSERT INTO product_variant_gift (gift_product_id, product_variant_id) VALUES (1, 1);
INSERT INTO product_variant_gift (gift_product_id, product_variant_id) VALUES (2, 1);

-- Samsung Galaxy S24 (id=2 trong bảng product) được tặng kèm bình giữ nhiệt
INSERT INTO product_variant_gift (gift_product_id, product_variant_id) VALUES (3, 2);



UPDATE product p
SET min_price = (
    SELECT MIN(v.price)
    FROM product_variant v
    WHERE v.product_id = p.id
)
WHERE EXISTS (
    SELECT 1 FROM product_variant v WHERE v.product_id = p.id
);

-- User 1: có 2 sản phẩm trong giỏ (iPhone 15 128GB và MacBook Pro 14 - 16GB/512GB)
INSERT INTO cart_item (cart_id, product_variant_id, quantity, added_at, created_at)
VALUES
(1, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- iPhone 15 128GB
(1, 6, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- MacBook Pro 14 16GB/512GB

-- User 2: có 3 sản phẩm (Galaxy S24, Pixel 8 Pro, OnePlus 12 16GB/512GB)
INSERT INTO cart_item (cart_id, product_variant_id, quantity, added_at, created_at)
VALUES
(2, 3, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Galaxy S24 128GB
(2, 5, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Pixel 8 Pro 128GB
(2, 11, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- OnePlus 12 16GB/512GB

-- User 3: có 1 sản phẩm (Dell XPS 13 Core i7)
INSERT INTO cart_item (cart_id, product_variant_id, quantity, added_at, created_at)
VALUES
(3, 8, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO review (id, user_id, content, rating_score, product_variant_id, created_at)
VALUES
-- Reviews for variant 1
(1, 1, 'Sản phẩm rất tốt, pin khỏe.', 5, 1, CURRENT_TIMESTAMP),
(2, 2, 'Máy chạy mượt, đáng tiền.', 4, 1, CURRENT_TIMESTAMP),
(3, 3, 'Hơi nóng khi chơi game.', 3, 1, CURRENT_TIMESTAMP),
(4, 4, 'Thiết kế đẹp, cầm chắc tay.', 5, 1, CURRENT_TIMESTAMP),
(5, 5, 'Camera ổn nhưng pin hơi yếu.', 3, 1, CURRENT_TIMESTAMP),

-- Reviews for variant 2
(6, 2, 'Màu sắc đẹp, giao hàng nhanh.', 4, 2, CURRENT_TIMESTAMP),
(7, 3, 'Màn hình sáng, hiển thị tốt.', 5, 2, CURRENT_TIMESTAMP),
(8, 6, 'Loa ngoài hơi nhỏ.', 3, 2, CURRENT_TIMESTAMP),
(9, 7, 'Pin trâu, sạc nhanh.', 5, 2, CURRENT_TIMESTAMP),
(10, 8, 'Máy hơi nặng, không thoải mái.', 2, 2, CURRENT_TIMESTAMP),

-- Reviews for variant 3
(11, 1, 'Giá hợp lý, cấu hình mạnh.', 4, 3, CURRENT_TIMESTAMP),
(12, 4, 'Cảm ứng mượt, không bị lag.', 5, 3, CURRENT_TIMESTAMP),
(13, 5, 'Pin xuống khá nhanh.', 3, 3, CURRENT_TIMESTAMP),
(14, 6, 'Thiết kế tinh tế, sang trọng.', 5, 3, CURRENT_TIMESTAMP),

-- Reviews for variant 4
(15, 2, 'Chụp ảnh đẹp, nhiều tính năng.', 5, 4, CURRENT_TIMESTAMP),
(16, 7, 'Tốc độ xử lý tốt.', 4, 4, CURRENT_TIMESTAMP),
(17, 8, 'Khá nóng khi chơi game nặng.', 3, 4, CURRENT_TIMESTAMP),
(18, 3, 'Màn hình lớn, dễ xem phim.', 5, 4, CURRENT_TIMESTAMP),

-- Reviews for variant 5
(19, 1, 'Sản phẩm mới, đóng gói cẩn thận.', 5, 5, CURRENT_TIMESTAMP),
(20, 4, 'Dung lượng pin chưa như kỳ vọng.', 3, 5, CURRENT_TIMESTAMP),
(21, 5, 'Hỗ trợ 5G, tốc độ mạng nhanh.', 4, 5, CURRENT_TIMESTAMP),
(22, 6, 'Thiết kế đẹp, nhẹ.', 5, 5, CURRENT_TIMESTAMP);


INSERT INTO review_images (review_id, image_url)
VALUES
(1, 'https://example.com/review1-img1.jpg'),
(1, 'https://example.com/review1-img2.jpg'),
(2, 'https://example.com/review2-img1.jpg'),
(3, 'https://example.com/review3-img1.jpg'),
(3, 'https://example.com/review3-img2.jpg');

-- Bình luận gốc (parent_comment_id = NULL)
INSERT INTO comment (id, user_id, product_id, content, parent_comment_id, created_at)
VALUES
(1, 1, 1, 'Sản phẩm này dùng khá ổn, chất lượng tốt.', NULL, CURRENT_TIMESTAMP),
(2, 2, 1, 'Mình thấy giá hơi cao so với mặt bằng chung.', NULL, CURRENT_TIMESTAMP),
(3, 3, 1, 'Đóng gói cẩn thận, giao hàng nhanh.', NULL, CURRENT_TIMESTAMP);

-- Bình luận trả lời (child comment cho id = 1)
INSERT INTO comment (id, user_id, product_id, content, parent_comment_id, created_at)
VALUES
(4, 4, 1, 'Bạn dùng lâu chưa, pin có ổn không?', 1, CURRENT_TIMESTAMP),
(5, 5, 1, 'Mình cũng thấy chất lượng ổn thật.', 1, CURRENT_TIMESTAMP);

-- Trả lời vào comment id = 4 (tức là reply lồng 2 cấp)
INSERT INTO comment (id, user_id, product_id, content, parent_comment_id, created_at)
VALUES
(6, 1, 1, 'Mình dùng được 3 tháng rồi, pin vẫn ngon nhé.', 4, CURRENT_TIMESTAMP);

-- Trả lời vào comment id = 2
INSERT INTO comment (id, user_id, product_id, content, parent_comment_id, created_at)
VALUES
(7, 6, 1, 'Theo mình thì so với tính năng thì giá hợp lý.', 2, CURRENT_TIMESTAMP),
(8, 7, 1, 'Có shop nào bán rẻ hơn không?', 2, CURRENT_TIMESTAMP);

-- Trả lời vào comment id = 7
INSERT INTO comment (id, user_id, product_id, content, parent_comment_id, created_at)
VALUES
(9, 2, 1, 'Mình thấy trên web chính hãng thì cũng bằng giá thôi.', 7, CURRENT_TIMESTAMP);

-- Trả lời vào comment id = 3
INSERT INTO comment (id, user_id, product_id, content, parent_comment_id, created_at)
VALUES
(10, 8, 1, 'Chuẩn, shipper cũng thân thiện nữa.', 3, CURRENT_TIMESTAMP);



INSERT INTO attribute (name, created_at) VALUES ('RAM', CURRENT_TIMESTAMP);
INSERT INTO attribute (name, created_at) VALUES ('ROM', CURRENT_TIMESTAMP);
INSERT INTO attribute (name, created_at) VALUES ('Màn hình', CURRENT_TIMESTAMP);
INSERT INTO attribute (name, created_at) VALUES ('Pin', CURRENT_TIMESTAMP);
INSERT INTO attribute (name, created_at) VALUES ('CPU', CURRENT_TIMESTAMP);
INSERT INTO attribute (name, created_at) VALUES ('GPU', CURRENT_TIMESTAMP);



--✅ iPhone 15 (variant 1: 128GB Black)
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('6GB', 6, 1, 1, 1, CURRENT_TIMESTAMP); -- RAM

INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('128GB', 128, 1, 1, 2, CURRENT_TIMESTAMP); -- ROM
--

--✅ iPhone 15 (variant 2: 256GB White)
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('6GB', 6, 1, 2, 1, CURRENT_TIMESTAMP);

INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('256GB', 256, 1, 2, 2, CURRENT_TIMESTAMP);


--

--✅ Samsung Galaxy S24 (variant 3: 128GB Black)
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('8GB', 8, 2, 3, 1, CURRENT_TIMESTAMP);

INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('128GB', 128, 2, 3, 2, CURRENT_TIMESTAMP);


--

--✅ Samsung Galaxy S24 (variant 4: 256GB Cream)
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('8GB', 8, 2, 4, 1, CURRENT_TIMESTAMP);

INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('256GB', 256, 2, 4, 2, CURRENT_TIMESTAMP);

--

--✅ Google Pixel 8 Pro (variant 5)
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('12GB', 12, 3, 5, 1, CURRENT_TIMESTAMP);

INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('128GB', 128, 3, 5, 2, CURRENT_TIMESTAMP);


--

--✅ MacBook Pro 14" (variant 6: 16GB RAM / 512GB)
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('16GB', 16, 13, 6, 1, CURRENT_TIMESTAMP);

INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('512GB', 512, 13, 6, 2, CURRENT_TIMESTAMP);

--

--✅ MacBook Pro 14" (variant 7: 32GB RAM / 1TB)
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('32GB', 32, 13, 7, 1, CURRENT_TIMESTAMP);

INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('1024GB', 1024, 13, 7, 2, CURRENT_TIMESTAMP); -- ROM 1TB đổi thành 1024GB


--

--✅ Dell XPS 13 (variant 8: i7, 16GB / 512GB)
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('16GB', 16, 14, 8, 1, CURRENT_TIMESTAMP);

INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('512GB', 512, 14, 8, 2, CURRENT_TIMESTAMP);

--

--✅ Dell XPS 13 (variant 9: i5, 8GB / 256GB)
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('8GB', 8, 14, 9, 1, CURRENT_TIMESTAMP);

INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('256GB', 256, 14, 9, 2, CURRENT_TIMESTAMP);

--

-- Attribute Values cho OnePlus 12 - Common
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('5000 mAh', 5000, 4, NULL, 4, CURRENT_TIMESTAMP);
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('6.7 inch AMOLED', NULL, 4, NULL, 3, CURRENT_TIMESTAMP); -- Màn hình
--


-- Attribute Values cho OnePlus 12 - Variant 10
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('12GB', 12, 4, 10, 1, CURRENT_TIMESTAMP); -- RAM
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('256GB', 256, 4, 10, 2, CURRENT_TIMESTAMP); -- ROM
--


-- Attribute Values cho OnePlus 12 - Variant 11
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('16GB', 16, 4, 11, 1, CURRENT_TIMESTAMP);
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('512GB', 512, 4, 11, 2, CURRENT_TIMESTAMP);
--


-- Sony Xperia 1 V không có variant, attribute gắn trực tiếp vào product
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('12GB', 12, 8, NULL, 1, CURRENT_TIMESTAMP); -- RAM
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('256GB', 256, 8, NULL, 2, CURRENT_TIMESTAMP); -- ROM
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('6.5 inch 4K OLED', NULL, 8, NULL, 3, CURRENT_TIMESTAMP); -- Màn hình
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('5000 mAh', 5000, 8, NULL, 4, CURRENT_TIMESTAMP); -- Pin

-- Surface Laptop 5 không có variant, gắn attribute trực tiếp
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('16GB', 16, 21, NULL, 1, CURRENT_TIMESTAMP); -- RAM
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('512GB', 512, 21, NULL, 2, CURRENT_TIMESTAMP); -- ROM
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('Intel Core i7-1255U', NULL, 21, NULL, 5, CURRENT_TIMESTAMP); -- CPU
INSERT INTO product_attribute_value (str_val, numeric_val, product_id, product_variant_id, attribute_id, created_at)
VALUES ('Intel Iris Xe', NULL, 21, NULL, 6, CURRENT_TIMESTAMP); -- GPU



-- Insert product images
INSERT INTO product_images (product_id, image_url) VALUES (1, 'https://example.com/iphone15-1.jpg');
INSERT INTO product_images (product_id, image_url) VALUES (1, 'https://example.com/iphone15-2.jpg');
INSERT INTO product_images (product_id, image_url) VALUES (2, 'https://example.com/galaxyS24-1.jpg');


INSERT INTO product_category (product_id, category_option_value_id) VALUES (1, 1);
INSERT INTO product_category (product_id, category_option_value_id) VALUES (1, 5);

INSERT INTO product_category (product_id, category_option_value_id) VALUES (2, 2);
INSERT INTO product_category (product_id, category_option_value_id) VALUES (2, 4);

INSERT INTO promotion_banner (id, name, img_url, target_url, banner_type, position) VALUES
(1, 'Back to School Sale', 'https://cdn.example.com/banners/back-to-school.jpg', 'https://shop.example.com/sale/back-to-school', 'SLIDER', 1),
(2, 'Summer Mega Sale', 'https://cdn.example.com/banners/summer-mega-sale.jpg', 'https://shop.example.com/sale/summer', 'SLIDER', 2),
(3, 'New Arrivals', 'https://cdn.example.com/banners/new-arrivals.jpg', 'https://shop.example.com/new', 'SLIDER', 3),
(4, 'Flash Deal - 50% OFF', 'https://cdn.example.com/banners/flash-deal.jpg', 'https://shop.example.com/deals/flash', 'RIGHT', 1),
(5, 'Christmas Specials', 'https://cdn.example.com/banners/christmas-specials.jpg', 'https://shop.example.com/sale/christmas', 'SINGLE', 1);



-- Product Filters
INSERT INTO product_filter (name, attribute_id, created_at) VALUES ('Dung lượng RAM', 1, CURRENT_TIMESTAMP);
INSERT INTO product_filter (name, attribute_id, created_at) VALUES ('Bộ nhớ trong', 2, CURRENT_TIMESTAMP);
INSERT INTO product_filter (name, attribute_id, created_at) VALUES ('Chọn hãng', 3, CURRENT_TIMESTAMP);
INSERT INTO product_filter (name, attribute_id, created_at) VALUES ('Giá', 4, CURRENT_TIMESTAMP);

-- Filter Options cho category = 'Điện thoại' (id = 1)
INSERT INTO filter_option (name, condition, sort_order, product_filter_id, category_id, created_at)
VALUES ('4 GB', 'bang-4gb', 1, 1, 1, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, condition, sort_order, product_filter_id, category_id, created_at)
VALUES ('8 GB', 'bang-8gb', 2, 1, 1, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, condition, sort_order, product_filter_id, category_id, created_at)
VALUES ('64 GB', 'bang-64gb', 1, 2, 1, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, condition, sort_order, product_filter_id, category_id, created_at)
VALUES ('128 GB', 'bang-128gb', 2, 2, 1, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, condition, sort_order, product_filter_id, category_id, created_at)
VALUES ('Samsung', 'chua-Samsung', 1, 3, 1, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, condition, sort_order, product_filter_id, category_id, created_at)
VALUES ('Apple', 'chua-Apple', 2, 3, 1, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, condition, sort_order, product_filter_id, category_id, created_at)
VALUES ('Dưới 5 triệu', 'duoi-5000000', 1, 4, 1, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, condition, sort_order, product_filter_id, category_id, created_at)
VALUES ('5 - 10 triệu', '5000000-10000000', 2, 4, 1, CURRENT_TIMESTAMP);

-- Filter Options cho category = 'Laptop' (id = 3)
INSERT INTO filter_option (name, condition, sort_order, product_filter_id, category_id, created_at)
VALUES ('8 GB', 'bang-8', 1, 1, 3, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, condition, sort_order, product_filter_id, category_id, created_at)
VALUES ('16 GB', 'bang-16', 2, 1, 3, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, condition, sort_order, product_filter_id, category_id, created_at)
VALUES ('256 GB SSD', 'bang-256', 1, 2, 3, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, condition, sort_order, product_filter_id, category_id, created_at)
VALUES ('512 GB SSD', 'bang-512', 2, 2, 3, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, condition, sort_order, product_filter_id, category_id, created_at)
VALUES ('Dell', 'chua-Dell', 1, 3, 3, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, condition, sort_order, product_filter_id, category_id, created_at)
VALUES ('Asus', 'chua-Asus', 2, 3, 3, CURRENT_TIMESTAMP);






