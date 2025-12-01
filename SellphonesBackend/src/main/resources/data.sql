-- CATEGORY
-- Danh mục chính hiện có
-- Bổ sung thêm các danh mục mới cho Điện thoại, Tablet, Laptop

INSERT INTO category (code, name, icon, featured_on_homepage, created_at) VALUES
-- DT và LT được set là TRUE/1
('DT', 'Điện thoại', 'DT.png', TRUE, CURRENT_TIMESTAMP),
('TB', 'Tablet', 'TB.png', TRUE, CURRENT_TIMESTAMP),
('LT', 'Laptop', 'LT.png', TRUE, CURRENT_TIMESTAMP);


-- Định nghĩa các cột cần chèn (bao gồm cột mới)
INSERT INTO category (code, name, icon, featured_on_homepage, created_at) VALUES
-- Màn hình (MH) và PC được set là TRUE/1
('PK', 'Phụ kiện', 'PK.png', FALSE, CURRENT_TIMESTAMP),
('MH', 'Màn hình', 'MH.png', FALSE, CURRENT_TIMESTAMP),
('PC', 'Máy tính để bàn', 'PC.png', FALSE, CURRENT_TIMESTAMP),
('DC', 'Đồng hồ thông minh', 'DC.png', FALSE, CURRENT_TIMESTAMP),
('TA', 'Tai nghe', 'TA.png', FALSE, CURRENT_TIMESTAMP),
('CH', 'Thiết bị mạng & sạc', 'CH.png', FALSE, CURRENT_TIMESTAMP),
('GM', 'Thiết bị chơi game', 'GM.png', FALSE, CURRENT_TIMESTAMP),
('SW', 'Phần mềm & ứng dụng', 'SW.png', FALSE, CURRENT_TIMESTAMP);

--NHỚ TEST KỸ LẠI CÁC METHOD DELETE SAU KHI CHUYỂN DB.

--ALTER TABLE product
--  ADD CONSTRAINT fk_product_category
--  FOREIGN KEY (category_id) REFERENCES category(id)
--  ON DELETE SET NULL;
--
--ALTER TABLE filter_option
--  ADD CONSTRAINT fk_filter_option_category
--  FOREIGN KEY (category_id) REFERENCES category(id)
--  ON DELETE SET NULL;
--
--ALTER TABLE product_filter
--  ADD CONSTRAINT fk_product_filter_category
--  FOREIGN KEY (attribute_id) REFERENCES attribute(id)
--  ON DELETE SET NULL;

--ALTER TABLE customer_order
--  ADD CONSTRAINT fk_customer_order_customer_info
--  FOREIGN KEY (customer_info_id) REFERENCES customer_info(id)
--  ON DELETE SET NULL;

--Xóa fk cũ r cấu hình lại nhớ test cẩn thận với các method delete sau khi chuyển sang db khác.
--ALTER TABLE product_category
--DROP CONSTRAINT fk_product_category_product,
--ADD CONSTRAINT fk_product_category_product
--FOREIGN KEY (product_id)
--REFERENCES product(id)
--ON DELETE CASCADE;

--ALTER TABLE cart
--DROP CONSTRAINT fk_user_cart,
--ADD CONSTRAINT fk_user_cart
--FOREIGN KEY (user_id)
--REFERENCES user(id)
--ON DELETE CASCADE;


--ALTER TABLE product_category
--DROP CONSTRAINT fk_product_category_category_option_value,
--ADD CONSTRAINT fk_product_category_category_option_value
--FOREIGN KEY (category_option_value_id)
--REFERENCES category_option_value(id)
--ON DELETE CASCADE;

-- 1. Xóa khóa ngoại cũ nếu tồn tại
--ALTER TABLE cart_item
--DROP FOREIGN KEY fk_cart_item_product_variant;
--
---- 2. Thêm lại khóa ngoại mới với ON DELETE CASCADE
--ALTER TABLE cart_item
--ADD CONSTRAINT fk_cart_item_product_variant
--FOREIGN KEY (product_variant_id) REFERENCES product_variant(id)
--ON DELETE CASCADE;

-- 1. Xóa khóa ngoại cũ nếu tồn tại
--ALTER TABLE instalment_order
--DROP FOREIGN KEY fk_instalment_order_product_variant;
--
---- 2. Thêm lại khóa ngoại mới với ON DELETE CASCADE
--ALTER TABLE instalment_order
--ADD CONSTRAINT fk_instalment_order_product_variant
--FOREIGN KEY (product_variant_id) REFERENCES product_variant(id)
--ON DELETE CASCADE;

-- 1. Xóa khóa ngoại cũ nếu tồn tại
--ALTER TABLE inventory
--DROP FOREIGN KEY fk_inventory_product_variant;
--
---- 2. Thêm lại khóa ngoại mới với ON DELETE CASCADE
--ALTER TABLE inventory
--ADD CONSTRAINT fk_inventory_product_variant
--FOREIGN KEY (product_variant_id) REFERENCES product_variant(id)
--ON DELETE CASCADE;

-- 1. Xóa khóa ngoại cũ nếu tồn tại
--ALTER TABLE order_variant
--DROP FOREIGN KEY fk_order_variant_product_variant;
--
---- 2. Thêm lại khóa ngoại mới với ON DELETE CASCADE
--ALTER TABLE order_variant
--ADD CONSTRAINT fk_order_variant_item_product_variant
--FOREIGN KEY (product_variant_id) REFERENCES product_variant(id)
--ON DELETE CASCADE;

-- 1. Xóa khóa ngoại cũ nếu tồn tại
--ALTER TABLE review
--DROP FOREIGN KEY fk_review_product_variant;
--
---- 2. Thêm lại khóa ngoại mới với ON DELETE CASCADE
--ALTER TABLE review
--ADD CONSTRAINT fk_review_product_variant
--FOREIGN KEY (product_variant_id) REFERENCES product_variant(id)
--ON DELETE CASCADE;

-- 1. Xóa khóa ngoại cũ nếu tồn tại
--ALTER TABLE stock_entry
--DROP FOREIGN KEY fk_stock_entry_product_variant;
--
---- 2. Thêm lại khóa ngoại mới với ON DELETE CASCADE
--ALTER TABLE stock_entry
--ADD CONSTRAINT fk_stock_entry_product_variant
--FOREIGN KEY (product_variant_id) REFERENCES product_variant(id)
--ON DELETE CASCADE;

-- 1. Xóa khóa ngoại cũ nếu tồn tại
--ALTER TABLE inventory
--DROP FOREIGN KEY fk_inventory_warehouse;
--
-- 2. Thêm lại khóa ngoại mới
--ALTER TABLE inventory
--  ADD CONSTRAINT fk_inventory_warehouse
--  FOREIGN KEY (warehouse_id) REFERENCES warehouse(id)
--  ON DELETE SET NULL;

-- 1. Xóa khóa ngoại cũ nếu tồn tại
--ALTER TABLE customer_info
--DROP FOREIGN KEY fk_user_customer_info;
--
-- 2. Thêm lại khóa ngoại mới
--ALTER TABLE customer_info
--  ADD CONSTRAINT fk_user_customer_info
--  FOREIGN KEY (user_id) REFERENCES user(id)
--  ON DELETE SET NULL;

-- 1. Xóa khóa ngoại cũ nếu tồn tại
--ALTER TABLE order
--DROP FOREIGN KEY fk_user_order;
--
-- 2. Thêm lại khóa ngoại mới
--ALTER TABLE order
--  ADD CONSTRAINT fk_user_order
--  FOREIGN KEY (user_id) REFERENCES user(id)
--  ON DELETE SET NULL;

-- 1. Xóa khóa ngoại cũ nếu tồn tại
--ALTER TABLE customer_info
--DROP FOREIGN KEY fk_user_customer_info;
--
-- 2. Thêm lại khóa ngoại mới
--ALTER TABLE customer_info
--  ADD CONSTRAINT fk_user_customer_info
--  FOREIGN KEY (user_id) REFERENCES user(id)
--  ON DELETE SET NULL;

-- 1. Xóa khóa ngoại cũ nếu tồn tại
--ALTER TABLE comment
--DROP FOREIGN KEY fk_user_comment;
--
-- 2. Thêm lại khóa ngoại mới
--ALTER TABLE comment
--  ADD CONSTRAINT fk_user_comment
--  FOREIGN KEY (user_id) REFERENCES user(id)
--  ON DELETE SET NULL;

-- 1. Xóa khóa ngoại cũ nếu tồn tại
--ALTER TABLE review
--DROP FOREIGN KEY fk_user_review;
--
-- 2. Thêm lại khóa ngoại mới
--ALTER TABLE review
--  ADD CONSTRAINT fk_user_review
--  FOREIGN KEY (user_id) REFERENCES user(id)
--  ON DELETE SET NULL;

-- 1. Xóa khóa ngoại cũ nếu tồn tại
--ALTER TABLE order_variant
--DROP FOREIGN KEY fk_order_variant_product_variant;
--
-- 2. Thêm lại khóa ngoại mới
--ALTER TABLE order_variant
--  ADD CONSTRAINT fk_user_review
--  FOREIGN KEY (product_variant_id) REFERENCES product_variant(id)
--  ON DELETE SET NULL;

-- 1. Xóa khóa ngoại cũ nếu tồn tại
--ALTER TABLE product_variant_gift
--DROP FOREIGN KEY fk_order_variant_product_variant;
--
-- 2. Thêm lại khóa ngoại mới
--ALTER TABLE product_variant_gift
--  ADD CONSTRAINT fk_user_review
--  FOREIGN KEY (gift_product_id) REFERENCES gift_product(id)
--  ON DELETE SET NULL;

INSERT INTO brand(name, brand_icon, created_at) VALUES ('Apple', 'frame_59.jpg', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('Google', 'sq-google-g-logo-update_dezeen_2364_col_0.jpg', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('Samsung', 'frame_60.jpg', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('OnePlus', 'frame_65.jpg', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('Xiaomi', 'frame_61.jpg', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('Oppo', 'frame_62.jpg', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('Vivo', 't_i_xu_ng_67_.jpg', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('Sony', 'brand-icon-sony_2.jpg', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('Asus', 'frame_67.jpg', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('Realme', 'frame_63.jpg', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('Huawei', 'huawei.png', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('Nothing', 'nothing-phone.jpg', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('Dell', 'Dell.jpg', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('HP', 'HP.jpg', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('Lenovo', 'Lenovo.jpg', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('MSI', 'MSI.jpg', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('Acer', 'acer.jpg', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('Razer', 'razer.png', CURRENT_TIMESTAMP);
INSERT INTO brand(name, brand_icon, created_at) VALUES ('Microsoft', 'microsoft.png', CURRENT_TIMESTAMP);


-- Điện thoại (category_id = 1)
INSERT INTO brand_category (brand_id, category_id) VALUES
(1, 1),  -- Apple
(2, 1),  -- Samsung
(3, 1),  -- Google
(4, 1),  -- OnePlus
(5, 1),  -- Xiaomi
(6, 1),  -- Oppof
(6, 1),  -- Oppo
(7, 1),  -- Vivo
(8, 1),  -- Sony
(10, 1), -- Realme
(11, 1), -- Huawei
(12, 1); -- Nothing

-- Tablet (category_id = 2)
INSERT INTO brand_category (brand_id, category_id) VALUES
(1, 2),  -- Apple (iPad)
(2, 2),  -- Samsung (Galaxy Tab)
(3, 2),  -- Google (Pixel Tablet)
(5, 2),  -- Xiaomi (Pad)
(6, 2),  -- Oppo Pad
(7, 2),  -- Vivo Pad
(11, 2); -- Huawei MatePad

-- Laptop (category_id = 3)
INSERT INTO brand_category (brand_id, category_id) VALUES
(1, 3),   -- Apple (MacBook)
(9, 3),   -- Asus
(13, 3),  -- Dell
(14, 3),  -- HP
(15, 3),  -- Lenovo
(16, 3),  -- MSI
(17, 3),  -- Acer
(18, 3),  -- Razer
(19, 3);  -- Microsoft Surface

INSERT INTO role (name, description, role_name, created_at)
VALUES
('Super Admin', 'Full access to the entire system', 'ADMIN', CURRENT_TIMESTAMP),
('Sales Manager', 'Manage orders and shipments', 'ADMIN', CURRENT_TIMESTAMP),
('Order Admin', 'Specialized in managing orders', 'ADMIN', CURRENT_TIMESTAMP),
('Shipment Admin', 'Specialized in managing shipments', 'ADMIN', CURRENT_TIMESTAMP),
('Customer', 'Regular customer with limited access', 'CUSTOMER', CURRENT_TIMESTAMP);

INSERT INTO app_user (full_name, email, password, date_of_birth, phone_number, gender, role_id, provider, created_at)
VALUES
('Nguyen Van A', 'a@example.com', '{noop}123456', '1985-03-15', '0901234567', 'MALE', 1, 'LOCAL', CURRENT_TIMESTAMP), -- Super Admin
('Tran Thi B', 'b@example.com', '{noop}123456', '1990-07-20', '0902345678', 'FEMALE', 2, 'LOCAL', CURRENT_TIMESTAMP), -- Sales Manager
('Le Van C', 'c@example.com', '{noop}123456', '1988-11-02', '0903456789', 'MALE', 3, 'LOCAL', CURRENT_TIMESTAMP), -- Order Admin
('Pham Thi D', 'd@example.com', '{noop}123456', '1992-05-12', '0904567890', 'FEMALE', 4, 'LOCAL', CURRENT_TIMESTAMP), -- Shipment Admin
('Hoang Van E', 'e@example.com', '{noop}123456', '1995-09-25', '0905678901', 'MALE', 5, 'GOOGLE', CURRENT_TIMESTAMP), -- Customer
('Vu Thi F', 'f@example.com', '{noop}123456', '1997-01-08', '0906789012', 'FEMALE', 5, 'LOCAL', CURRENT_TIMESTAMP), -- Customer
('Do Van G', 'g@example.com', '{noop}123456', '1989-12-30', '0907890123', 'MALE', 2, 'LOCAL', CURRENT_TIMESTAMP), -- Sales Manager
('Nguyen Thi H', 'h@example.com', '{noop}123456', '1993-04-18', '0908901234', 'FEMALE', 3, 'LOCAL', CURRENT_TIMESTAMP); -- Order Admin

INSERT INTO permission (name, code, created_at)
VALUES
('Dashboard', 'DASHBOARD', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code, created_at)
VALUES
('Create', 'SALES.ORDERS.CREATE', CURRENT_TIMESTAMP),
('Edit', 'SALES.ORDERS.EDIT', CURRENT_TIMESTAMP),
('View',   'SALES.ORDERS.VIEW', CURRENT_TIMESTAMP),
('Cancel', 'SALES.ORDERS.CANCEL',  CURRENT_TIMESTAMP);


INSERT INTO permission (name, code, created_at)
VALUES
('View',   'SALES.SHIPMENTS.VIEW', CURRENT_TIMESTAMP),
('Create', 'SALES.SHIPMENTS.CREATE', CURRENT_TIMESTAMP);


INSERT INTO permission (name, code,  created_at)
VALUES
('View', 'CATALOG.PRODUCTS.VIEW', CURRENT_TIMESTAMP),
('Create', 'CATALOG.PRODUCTS.CREATE', CURRENT_TIMESTAMP),
('Edit',   'CATALOG.PRODUCTS.EDIT', CURRENT_TIMESTAMP),
('Delete', 'CATALOG.PRODUCTS.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View', 'CATALOG.ATTRIBUTES.VIEW', CURRENT_TIMESTAMP),
('Create', 'CATALOG.ATTRIBUTES.CREATE', CURRENT_TIMESTAMP),
('Edit',   'CATALOG.ATTRIBUTES.EDIT', CURRENT_TIMESTAMP),
('Delete', 'CATALOG.ATTRIBUTES.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View', 'CATALOG.BRANDS.VIEW', CURRENT_TIMESTAMP),
('Create', 'CATALOG.BRANDS.CREATE', CURRENT_TIMESTAMP),
('Edit',   'CATALOG.BRANDS.EDIT', CURRENT_TIMESTAMP),
('Delete', 'CATALOG.BRANDS.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View', 'CATALOG.CATEGORIES.VIEW', CURRENT_TIMESTAMP),
('Create', 'CATALOG.CATEGORIES.CREATE', CURRENT_TIMESTAMP),
('Edit',   'CATALOG.CATEGORIES.EDIT', CURRENT_TIMESTAMP),
('Delete', 'CATALOG.CATEGORIES.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View', 'CATALOG.PRODUCT_FILTERS.VIEW', CURRENT_TIMESTAMP),
('Create', 'CATALOG.PRODUCT_FILTERS.CREATE', CURRENT_TIMESTAMP),
('Edit',   'CATALOG.PRODUCT_FILTERS.EDIT', CURRENT_TIMESTAMP),
('Delete', 'CATALOG.PRODUCT_FILTERS.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View', 'CATALOG.WARRANTIES.VIEW', CURRENT_TIMESTAMP),
('Create', 'CATALOG.WARRANTIES.CREATE', CURRENT_TIMESTAMP),
('Edit',   'CATALOG.WARRANTIES.EDIT', CURRENT_TIMESTAMP),
('Delete', 'CATALOG.WARRANTIES.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View', 'INVENTORY.INVENTORIES.VIEW', CURRENT_TIMESTAMP),
('Create', 'INVENTORY.INVENTORIES.CREATE', CURRENT_TIMESTAMP),
('Edit',   'INVENTORY.INVENTORIES.EDIT', CURRENT_TIMESTAMP),
('Delete', 'INVENTORY.INVENTORIES.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View', 'INVENTORY.SUPPLIERS.VIEW', CURRENT_TIMESTAMP),
('Create', 'INVENTORY.SUPPLIERS.CREATE', CURRENT_TIMESTAMP),
('Edit',   'INVENTORY.SUPPLIERS.EDIT', CURRENT_TIMESTAMP),
('Delete', 'INVENTORY.SUPPLIERS.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View', 'INVENTORY.STOCK_ENTRIES.VIEW', CURRENT_TIMESTAMP),
('Create', 'INVENTORY.STOCK_ENTRIES.CREATE', CURRENT_TIMESTAMP),
('Edit',   'INVENTORY.STOCK_ENTRIES.EDIT', CURRENT_TIMESTAMP),
('Delete', 'INVENTORY.STOCK_ENTRIES.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View', 'INVENTORY.WAREHOUSES.VIEW', CURRENT_TIMESTAMP),
('Create', 'INVENTORY.WAREHOUSES.CREATE', CURRENT_TIMESTAMP),
('Edit',   'INVENTORY.WAREHOUSES.EDIT', CURRENT_TIMESTAMP),
('Delete', 'INVENTORY.WAREHOUSES.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View', 'CUSTOMER.CUSTOMERS.VIEW', CURRENT_TIMESTAMP),
('Create', 'CUSTOMER.CUSTOMERS.CREATE', CURRENT_TIMESTAMP),
('Edit',   'CUSTOMER.CUSTOMERS.EDIT',   CURRENT_TIMESTAMP),
('Delete', 'CUSTOMER.CUSTOMERS.DELETE',CURRENT_TIMESTAMP);


INSERT INTO permission (name, code, created_at)
VALUES
('View', 'CUSTOMER.ADDRESSES.VIEW', CURRENT_TIMESTAMP),
('Create', 'CUSTOMER.ADDRESSES.CREATE', CURRENT_TIMESTAMP),
('Edit',   'CUSTOMER.ADDRESSES.EDIT',  CURRENT_TIMESTAMP),
('Delete', 'CUSTOMER.ADDRESSES.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View',   'CUSTOMER.REVIEWS.VIEW', CURRENT_TIMESTAMP),
('Edit',   'CUSTOMER.REVIEWS.EDIT', CURRENT_TIMESTAMP),
('Delete', 'CUSTOMER.REVIEWS.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View',   'CUSTOMER.COMMENTS.VIEW', CURRENT_TIMESTAMP),
('REPLY',   'CUSTOMER.COMMENTS.REPLY', CURRENT_TIMESTAMP),
('Edit',   'CUSTOMER.COMMENTS.EDIT', CURRENT_TIMESTAMP),
('Delete', 'CUSTOMER.COMMENTS.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View',   'PROMOTIONS.PRODUCT_PROMOTIONS.VIEW',   CURRENT_TIMESTAMP),
('Create', 'PROMOTIONS.PRODUCT_PROMOTIONS.CREATE', CURRENT_TIMESTAMP),
('Edit',   'PROMOTIONS.PRODUCT_PROMOTIONS.EDIT',  CURRENT_TIMESTAMP),
('Delete', 'PROMOTIONS.PRODUCT_PROMOTIONS.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View',   'PROMOTIONS.GIFT_PRODUCTS.VIEW',   CURRENT_TIMESTAMP),
('Create', 'PROMOTIONS.GIFT_PRODUCTS.CREATE', CURRENT_TIMESTAMP),
('Edit',   'PROMOTIONS.GIFT_PRODUCTS.EDIT',  CURRENT_TIMESTAMP),
('Delete', 'PROMOTIONS.GIFT_PRODUCTS.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View',   'PROMOTIONS.BANNERS.VIEW',   CURRENT_TIMESTAMP),
('Create', 'PROMOTIONS.BANNERS.CREATE', CURRENT_TIMESTAMP),
('Edit',   'PROMOTIONS.BANNERS.EDIT',  CURRENT_TIMESTAMP),
('Delete', 'PROMOTIONS.BANNERS.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code, created_at)
VALUES
('View', 'SETTINGS.ROLES.VIEW', CURRENT_TIMESTAMP),
('Create', 'SETTINGS.ROLES.CREATE', CURRENT_TIMESTAMP),
('Edit',   'SETTINGS.ROLES.EDIT', CURRENT_TIMESTAMP),
('Delete', 'SETTINGS.ROLES.DELETE',  CURRENT_TIMESTAMP);

INSERT INTO permission (name, code, created_at)
VALUES
('View', 'SETTINGS.USERS.VIEW', CURRENT_TIMESTAMP),
('Create', 'SETTINGS.USERS.CREATE', CURRENT_TIMESTAMP),
('Edit',   'SETTINGS.USERS.EDIT', CURRENT_TIMESTAMP),
('Delete', 'SETTINGS.USERS.DELETE',  CURRENT_TIMESTAMP);

--INSERT INTO permission (name, code, created_at)
--VALUES
--('View', 'SETTINGS.ROLES.VIEW', CURRENT_TIMESTAMP),
--('Create', 'SETTINGS.ROLES.CREATE', CURRENT_TIMESTAMP),
--('Edit',   'SETTINGS.ROLES.EDIT', CURRENT_TIMESTAMP),
--('Delete', 'SETTINGS.ROLES.DELETE',  CURRENT_TIMESTAMP);


-- ADMIN -> all permissions
INSERT INTO role_permission (role_id, permission_id)
SELECT 1, id FROM permission WHERE code like 'DASHBOARD%';
INSERT INTO role_permission (role_id, permission_id)
SELECT 1, id FROM permission WHERE code like 'SALES%';
INSERT INTO role_permission (role_id, permission_id)
SELECT 1, id FROM permission WHERE code like 'CATALOG%';
INSERT INTO role_permission (role_id, permission_id)
SELECT 1, id FROM permission WHERE code like 'CUSTOMER%';
INSERT INTO role_permission (role_id, permission_id)
SELECT 1, id FROM permission WHERE code like 'PROMOTIONS%';
INSERT INTO role_permission (role_id, permission_id)
SELECT 1, id FROM permission WHERE code like 'REPORTING%';
INSERT INTO role_permission (role_id, permission_id)
SELECT 1, id FROM permission WHERE code like 'SETTINGS%';
INSERT INTO role_permission (role_id, permission_id)
SELECT 1, id FROM permission WHERE code like 'INVENTORY%';

INSERT INTO role_permission (role_id, permission_id)
SELECT 4, id FROM permission WHERE code like '%SHIPMENTS%';



--INSERT INTO permission (name, code, parent_permission_id, created_at)
--VALUES ('Sales', 'SALES', NULL, CURRENT_TIMESTAMP);
--
---- Shipments
--INSERT INTO permission (name, code, parent_permission_id, created_at)
--VALUES ('Shipments', 'SALES.SHIPMENTS', 1, CURRENT_TIMESTAMP);
--
--INSERT INTO permission (name, code, parent_permission_id, created_at)
--VALUES
--('View',   'SALES.SHIPMENTS.VIEW',   9, CURRENT_TIMESTAMP),
--('Create', 'SALES.SHIPMENTS.CREATE', 9, CURRENT_TIMESTAMP);

--INSERT INTO role_permission (role_id, permission_id)
--VALUES
--(2,2),(2,3),(2,4),(2,5),(2,6),(2,7),(2,8);
--
--INSERT INTO role_permission (role_id, permission_id)
--VALUES
--(3,2),(3,3),(3,4),(3,5);



INSERT INTO address (street, ward, district, province, address_type)
VALUES
-- CUSTOMER
('123 Le Loi', 'Ben Nghe', 'Quan 1', 'Ho Chi Minh', 'CUSTOMER'),
('45 Tran Hung Dao', 'An Hai Bac', 'Son Tra', 'Da Nang', 'CUSTOMER'),
('67 Nguyen Trai', 'Thuong Dinh', 'Thanh Xuan', 'Ha Noi', 'CUSTOMER'),
('12 Tran Phu', 'Loc Tho', 'Nha Trang', 'Khanh Hoa', 'CUSTOMER'),
('78 Nguyen Hue', 'Ben Nghe', 'Quan 1', 'Ho Chi Minh', 'CUSTOMER'),
('21  Yen Xá', 'Tân Triều', 'Thanh Trì', 'Hà Nội', 'CUSTOMER'),
-- SUPPLIER
('89 Hung Vuong', 'Phu Nhuan', 'Hue', 'Thua Thien Hue', 'SUPPLIER'),
('34 Vo Van Kiet', 'My An', 'Ngu Hanh Son', 'Da Nang', 'SUPPLIER'),
('56 Ly Thuong Kiet', 'Tan Binh', 'Hai Ba Trung', 'Ha Noi', 'SUPPLIER'),

-- WAREHOUSE
('100 Nguyen Van Linh', 'Hoa Thuan Tay', 'Hai Chau', 'Da Nang', 'WAREHOUSE'),
('200 Pham Van Dong', 'An Hai Bac', 'Son Tra', 'Da Nang', 'WAREHOUSE'),
('150 Le Duan', 'Ben Thanh', 'Quan 1', 'Ho Chi Minh', 'WAREHOUSE'),
('250 Tran Phu', 'Dien Bien', 'Ba Dinh', 'Ha Noi', 'WAREHOUSE');

-- PICKUP
INSERT INTO address (street, ward, district, province, address_type)
VALUES
('15 Vo Thi Sau', 'Ben Nghe', 'Quan 1', 'Ho Chi Minh', 'PICKUP'),
('25 Nguyen Van Linh', 'Hoa Thuan Dong', 'Hai Chau', 'Da Nang', 'PICKUP'),
('88 Kim Ma', 'Ngoc Khanh', 'Ba Dinh', 'Ha Noi', 'PICKUP'),
('42 Tran Quang Khai', 'Tan Lap', 'Nha Trang', 'Khanh Hoa', 'PICKUP'),
('10 Nguyen Hue', 'Phu Hoi', 'Hue', 'Thua Thien Hue', 'PICKUP'),
('73 Le Loi', 'Phu Nhuan', 'Hue', 'Thua Thien Hue', 'PICKUP'),
('60 Hoang Dieu', 'Hai Chau 1', 'Hai Chau', 'Da Nang', 'PICKUP'),
('99 Cach Mang Thang 8', 'Ben Thanh', 'Quan 1', 'Ho Chi Minh', 'PICKUP');


INSERT INTO warehouse (name, address_id)
SELECT
    CASE
        WHEN province = 'Da Nang' THEN 'Kho Đà Nẵng'
        WHEN province = 'Ho Chi Minh' THEN 'Kho Hồ Chí Minh'
        WHEN province = 'Ha Noi' THEN 'Kho Hà Nội'
        ELSE CONCAT('Kho tại ', province)
    END AS name,
    id AS address_id
FROM address
WHERE address_type = 'WAREHOUSE';



INSERT INTO supplier (name, contact_name, phone_number, email, address_id, tax_code, supplier_status, created_at, updated_at)
VALUES
-- Nhà cung cấp ở Huế
('Hue Trading Co., Ltd', 'Nguyen Van A', '0912345678', 'contact@huetrading.vn', 4, '3301234567', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- Nhà cung cấp ở Đà Nẵng
('Da Nang Electronics', 'Tran Thi B', '0932123456', 'support@danangelec.vn', 6, '0407654321', 'INACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Nhà cung cấp ở Hà Nội
('Ha Noi Food Supply', 'Le Van C', '0987654321', 'info@hanoifood.vn', 7, '0109876543', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);



INSERT INTO customer_info (full_name, phone_number, address_id, cccd, date_of_birth, user_id)
VALUES
('Nguyen Van A', '0901000001', 1, '012345678901', '1995-01-15', 1), -- user_id = Nguyen Van A
('Tran Thi B', '0902000002', 2, '012345678902', '1992-05-20', 2), -- user_id = Tran Thi B
('Le Van C', '0903000003', 3, '012345678903', '1998-07-12', 3), -- user_id = Le Van C
('Pham Thi D', '0904000004', 4, NULL, '1990-03-05', 4), -- user_id = Pham Thi D
('Hoang Van E', '0905000005', 5, '012345678905', '1993-11-22', 5), -- user_id = Hoang Van E
('Hoang Van E', '0905000005', 6, '012345678906', '1993-11-22', 5), -- user_id = Hoang Van E
('Phan Van G', '0907000007', 7, '012345678907', '1999-12-30', 7), -- user_id = Do Van G (Sales Manager)
('Vu Thi H', '0908000008', 8, '012345678908', '1991-06-14', 8); -- user_id = Nguyen Thi H (Order Admin)




-- Giỏ hàng của User 1
INSERT INTO cart (id, user_id, created_at, updated_at)
VALUES (1, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

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

-- ======================
-- BẢNG PRODUCT
-- ======================
-- ======================
-- CATEGORY 1: ĐIỆN THOẠI
-- ======================
-- CATEGORY 1: ĐIỆN THOẠI
-- ======================
INSERT INTO product (name, thumbnail, description, brand_id, category_id, is_featured, is_new, status, variant_attribute_names) VALUES
('iPhone 15 Pro Max', 'iphone-15-pro-max_2__5_2_1_1.jpg', 'Siêu phẩm mới nhất từ Apple, chip A17 Pro cực mạnh', 1, 1, true, true, 'ACTIVE', 'RAM-ROM'),
('iPhone 15', 'iphone-15-plus_1__1.jpg', 'Màn hình OLED Super Retina, hiệu năng vượt trội', 1, 1, true, true, 'ACTIVE', 'RAM-ROM');

INSERT INTO product (name, thumbnail, description, brand_id, category_id, is_featured, is_new, status) VALUES
('Samsung Galaxy S24 Ultra', 'ss-s24-ultra-xam-222.jpg', 'Camera zoom 100x và chip Snapdragon 8 Gen 3', 3, 1, true, true, 'ACTIVE'),
('Samsung Galaxy S24+', 'galaxy-s24-plus-tim.jpg', 'Thiết kế sang trọng, pin lớn 5000mAh', 3, 1, true, true, 'ACTIVE'),

('Google Pixel 8 Pro', 'google-pixel-8-pro_7_.jpg', 'Camera AI và hệ điều hành Android gốc', 2, 1, true, true, 'ACTIVE'),

('OnePlus 12', 'oneplus-12.jpg', 'Điện thoại hiệu năng cao, sạc nhanh 100W', 4, 1, true, true, 'ACTIVE'),

('Xiaomi 14 Ultra', 'xiaomi-14-ultra_3_1_1_1.jpg', 'Camera Leica, cấu hình mạnh mẽ', 5, 1, true, true, 'ACTIVE'),

('Oppo Find X7 Pro', 'oppo-find-x7_1.jpg', 'Thiết kế cong viền đẹp mắt, camera Sony LYT', 6, 1, true, false, 'ACTIVE'),

('Vivo X100 Pro', 'dien-thoai-vivo-x100-pro_1__2.jpg', 'Cụm camera Zeiss đẳng cấp', 7, 1, true, false, 'ACTIVE'),

('Sony Xperia 1 VI', '10_1_.jpg', 'Màn hình 4K OLED, chống nước IP68', 8, 1, true, true, 'ACTIVE'),

('Asus ROG Phone 8', 'asus-rog-phone-8.jpg', 'Điện thoại gaming cực mạnh', 9, 1, true, true, 'ACTIVE'),

('Realme GT 6', 'realme-gt-neo-6_1_.jpg', 'Snapdragon 8s Gen 3, giá cực tốt', 10, 1, false, true, 'ACTIVE'),

('Huawei P70 Pro', '_ter3434_3_.jpg', 'Siêu camera và thiết kế sang trọng', 11, 1, true, true, 'ACTIVE'),
('Huawei Nova 12', 'huawei-nova-12-pro.jpg', 'Thiết kế mỏng nhẹ, camera selfie tốt', 11, 1, false, true, 'ACTIVE'),

('Nothing Phone 2', 'dien-thoai-nothing-phone-2a-plus_1_.jpg', 'Thiết kế trong suốt độc đáo', 12, 1, false, true, 'ACTIVE'),

('Nokia X30 5G', 'nokia_8.3_3.jpg', 'Thiết kế bền vững, hỗ trợ 5G', NULL, 1, false, true, 'ACTIVE');

-- ======================
-- CATEGORY 2: LAPTOP
-- ======================
INSERT INTO product (name, thumbnail, description, brand_id, category_id, is_featured, is_new, status) VALUES
('MacBook Pro 14 M3', 'macbook-pro-14-m3.jpg', 'Laptop cao cấp của Apple với chip M3 Pro', 1, 3, true, true, 'ACTIVE'),
('MacBook Air 13 M2', 'macbook-air-13-m2.jpg', 'Siêu mỏng nhẹ, pin lâu 18 tiếng', 1, 3, true, false, 'ACTIVE'),
('Dell XPS 13', 'dell-xps-13.jpg', 'Ultrabook đẳng cấp với viền màn hình siêu mỏng', 13, 3, true, true, 'ACTIVE'),
('Dell Inspiron 16', 'dell-inspiron-16.jpg', 'Laptop học tập và văn phòng', 13, 3, false, true, 'ACTIVE'),
('HP Spectre x360', 'hp-spectre-x360.jpg', 'Laptop 2-trong-1 sang trọng', 14, 3, true, true, 'ACTIVE'),
('HP Envy 16', 'hp-envy-16.jpg', 'Màn hình 16 inch, GPU RTX 4060', 14, 2, true, false, 'ACTIVE'),
('Lenovo ThinkPad X1 Carbon', 'thinkpad-x1-carbon.jpg', 'Laptop doanh nhân bền bỉ', 15, 3, true, true, 'ACTIVE'),
('Lenovo Yoga 9i', 'lenovo-yoga-9i.jpg', 'Laptop xoay gập cảm ứng', 15, 3, false, true, 'ACTIVE'),
('MSI Stealth 16 Studio', 'msi-stealth-16.jpg', 'Laptop gaming mỏng nhẹ', 16, 3, true, true, 'ACTIVE'),
('MSI Katana 15', 'msi-katana-15.jpg', 'Laptop gaming phổ thông hiệu năng cao', 16, 3, false, true, 'ACTIVE'),
('Acer Swift X', 'acer-swift-x.jpg', 'Mỏng nhẹ, GPU RTX 4050', 17, 3, false, true, 'ACTIVE'),
('Acer Nitro 17', 'acer-nitro-17.jpg', 'Laptop gaming giá tốt', 17, 3, true, true, 'ACTIVE'),
('Asus ROG Zephyrus G14', 'rog-zephyrus-g14.jpg', 'Laptop gaming nhỏ gọn mạnh mẽ', 9, 3, true, true, 'ACTIVE'),
('Asus TUF Gaming F15', 'asus-tuf-f15.jpg', 'Laptop gaming bền bỉ', 9, 3, false, true, 'ACTIVE'),
('Razer Blade 16', 'razer-blade-16.jpg', 'Laptop gaming cao cấp', 18, 3, true, true, 'ACTIVE'),
('Microsoft Surface Laptop 6', 'surface-laptop-6.jpg', 'Thiết kế tối giản, pin lâu', 19, 3, true, true, 'ACTIVE'),
('HP Pavilion 15', 'hp-pavilion-15.jpg', 'Giải pháp tốt cho học sinh sinh viên', 14, 3, false, true, 'ACTIVE'),
('Dell Latitude 7450', 'dell-latitude-7450.jpg', 'Laptop doanh nghiệp mỏng nhẹ', 13, 3, false, true, 'ACTIVE'),
('Lenovo Legion 7i', 'legion-7i.jpg', 'Laptop gaming cực mạnh', 15, 3, true, true, 'ACTIVE'),
('Asus Vivobook 15 OLED', 'vivobook-15-oled.jpg', 'Màn hình OLED, giá hợp lý', 9, 3, false, true, 'ACTIVE');

-- ======================
-- CATEGORY 3: TABLET
-- ======================
INSERT INTO product (name, thumbnail, description, brand_id, category_id, is_featured, is_new, status) VALUES
('iPad Pro M3', 'ipad-pro-m3.jpg', 'Máy tính bảng mạnh nhất của Apple', 1, 2, true, true, 'ACTIVE'),
('iPad Air M2', 'ipad-air-m2.jpg', 'Thiết kế mỏng nhẹ, hiệu năng cao', 1, 2, true, false, 'ACTIVE'),
('Samsung Galaxy Tab S9 Ultra', 'tab-s9-ultra.jpg', 'Màn hình AMOLED 14.6 inch, S Pen', 2, 2, true, true, 'ACTIVE'),
('Samsung Galaxy Tab S9 FE', 'tab-s9-fe.jpg', 'Giá mềm, pin khủng 10,000mAh', 2, 2, false, true, 'ACTIVE'),
('Xiaomi Pad 6 Pro', 'xiaomi-pad-6-pro.jpg', 'Hiệu năng cao, giá dễ tiếp cận', 5, 2, true, true, 'ACTIVE'),
('Huawei MatePad 11', 'matepad-11.jpg', 'Hỗ trợ bút M-Pencil, HarmonyOS', 11, 2, false, true, 'ACTIVE'),
('Lenovo Tab P12 Pro', 'lenovo-tab-p12-pro.jpg', 'Tablet Android cao cấp', 15, 2, true, true, 'ACTIVE'),
('Realme Pad 2', 'realme-pad-2.jpg', 'Giá rẻ, pin khỏe 8000mAh', 10, 2, false, true, 'ACTIVE'),
('Asus ROG Flow Z13', 'rog-flow-z13.jpg', 'Tablet gaming mạnh mẽ nhất', 9, 2, true, false, 'ACTIVE'),
('Microsoft Surface Pro 10', 'surface-pro-10.jpg', 'Thiết bị 2-trong-1 mạnh mẽ', 19, 2, true, true, 'ACTIVE'),
('Oppo Pad 2', 'oppo-pad-2.jpg', 'Màn hình 11.6 inch, sạc nhanh 67W', 6, 2, false, true, 'ACTIVE'),
('Vivo Pad 2', 'vivo-pad-2.jpg', 'Cấu hình mạnh, màn hình 2.8K', 7, 2, false, true, 'ACTIVE'),
('Sony Xperia Tablet Z6', 'xperia-tablet-z6.jpg', 'Chống nước, mỏng nhẹ', 8, 2, false, true, 'ACTIVE'),
('Huawei MatePad Pro 13.2', 'matepad-pro-13.2.jpg', 'Tablet màn lớn, pin cực trâu', 11, 2, true, true, 'ACTIVE'),
('Xiaomi Pad SE', 'xiaomi-pad-se.jpg', 'Máy tính bảng giá rẻ', 5, 2, false, true, 'ACTIVE'),
('Realme Pad X', 'realme-pad-x.jpg', 'Thiết kế đẹp, hiệu năng ổn', 10, 2, false, true, 'ACTIVE'),
('Lenovo Tab M10', 'lenovo-tab-m10.jpg', 'Tablet phổ thông dành cho học sinh', 15, 2, false, true, 'ACTIVE'),
('Samsung Galaxy Tab A9', 'tab-a9.jpg', 'Tablet giá rẻ, hỗ trợ học online', 2, 2, false, true, 'ACTIVE'),
('Apple iPad Mini 6', 'ipad-mini-6.jpg', 'Máy nhỏ gọn, hiệu năng mạnh', 1, 2, true, true, 'ACTIVE'),
('Nothing Tab 1', 'nothing-tab-1.jpg', 'Thiết kế trong suốt độc đáo', 12, 2, false, true, 'ACTIVE');

-- ======================
-- CATEGORY 4: PHỤ KIỆN
-- ======================
INSERT INTO product (name, thumbnail, description, brand_id, category_id, is_featured, is_new, status) VALUES
('Apple AirPods Pro 2', 'airpods-pro-2.jpg', 'Tai nghe chống ồn chủ động của Apple', 1, 4, true, true, 'ACTIVE'),
('Apple MagSafe Charger', 'magsafe-charger.jpg', 'Sạc nhanh không dây chính hãng', 1, 4, false, true, 'ACTIVE'),
('Samsung Galaxy Buds3 Pro', 'buds3-pro.jpg', 'Tai nghe chất lượng cao, pin trâu', 2, 4, true, true, 'ACTIVE'),
('Samsung 45W Super Charger', 'samsung-45w.jpg', 'Sạc nhanh 45W USB-C', 2, 4, false, true, 'ACTIVE'),
('Logitech MX Master 3S', 'mx-master-3s.jpg', 'Chuột không dây cao cấp', 17, 4, true, true, 'ACTIVE'),
('Logitech K380 Keyboard', 'k380-keyboard.jpg', 'Bàn phím Bluetooth mini tiện dụng', 17, 4, false, true, 'ACTIVE'),
('Anker PowerCore 20000', 'anker-powercore-20000.jpg', 'Sạc dự phòng 20,000mAh', 17, 4, true, true, 'ACTIVE'),
('Sony WH-1000XM5', 'wh-1000xm5.jpg', 'Tai nghe chống ồn đỉnh cao', 8, 4, true, true, 'ACTIVE'),
('Razer DeathAdder V3', 'deathadder-v3.jpg', 'Chuột gaming chính xác cao', 18, 4, true, true, 'ACTIVE'),
('MSI GH30 Headset', 'msi-gh30.jpg', 'Tai nghe gaming MSI', 16, 4, false, true, 'ACTIVE'),
('Dell USB-C Hub', 'dell-usb-hub.jpg', 'Bộ chia cổng kết nối Dell', 13, 4, false, true, 'ACTIVE'),
('HP Wireless Mouse 250', 'hp-wireless-250.jpg', 'Chuột không dây tiện lợi', 14, 4, false, true, 'ACTIVE'),
('Lenovo 65W Charger', 'lenovo-65w-charger.jpg', 'Sạc nhanh USB-C chính hãng', 15, 4, false, true, 'ACTIVE'),
('Apple Pencil 2', 'apple-pencil-2.jpg', 'Bút cảm ứng chính xác cho iPad', 1, 4, true, true, 'ACTIVE'),
('Samsung SmartTag 2', 'smarttag-2.jpg', 'Thiết bị định vị thông minh', 2, 4, false, true, 'ACTIVE'),
('Xiaomi Mi Band 8', 'mi-band-8.jpg', 'Vòng đeo tay thông minh đa tính năng', 5, 4, true, true, 'ACTIVE'),
('Huawei FreeBuds 5', 'freebuds-5.jpg', 'Tai nghe không dây thiết kế đẹp', 11, 4, false, true, 'ACTIVE'),
('Nothing Ear 2', 'nothing-ear-2.jpg', 'Tai nghe trong suốt độc đáo', 12, 4, false, true, 'ACTIVE'),
('Anker Soundcore Liberty 4', 'soundcore-liberty-4.jpg', 'Tai nghe âm thanh sống động', 17, 4, true, true, 'ACTIVE'),
('Sony SRS-XE300 Speaker', 'srs-xe300.jpg', 'Loa Bluetooth di động chống nước', 8, 4, true, true, 'ACTIVE');

-- ======================
-- CATEGORY 5: ĐỒNG HỒ THÔNG MINH
-- ======================
INSERT INTO product (name, thumbnail, description, brand_id, category_id, is_featured, is_new, status) VALUES
('Apple Watch Series 10', 'apple-watch-s10.jpg', 'Đồng hồ thông minh mới nhất từ Apple', 1, 5, true, true, 'ACTIVE'),
('Apple Watch SE 2', 'apple-watch-se-2.jpg', 'Phiên bản tiết kiệm, đầy đủ tính năng cơ bản', 1, 5, false, true, 'ACTIVE'),
('Samsung Galaxy Watch 7', 'galaxy-watch-7.jpg', 'Theo dõi sức khỏe toàn diện', 2, 5, true, true, 'ACTIVE'),
('Samsung Galaxy Fit 3', 'galaxy-fit-3.jpg', 'Vòng đeo tay nhỏ gọn, pin lâu', 2, 5, false, true, 'ACTIVE'),
('Huawei Watch GT 5', 'watch-gt-5.jpg', 'Pin trâu, hỗ trợ GPS chính xác', 11, 5, true, true, 'ACTIVE'),
('Xiaomi Watch 3 Pro', 'xiaomi-watch-3-pro.jpg', 'Thiết kế sang trọng, hỗ trợ eSIM', 5, 5, true, true, 'ACTIVE'),
('Amazfit GTR 5', 'amazfit-gtr-5.jpg', 'Đồng hồ thể thao thông minh', 5, 5, false, true, 'ACTIVE'),
('Garmin Venu 3', 'garmin-venu-3.jpg', 'Theo dõi thể thao và giấc ngủ chuyên sâu', 8, 5, true, true, 'ACTIVE'),
('Nothing Watch 1', 'nothing-watch-1.jpg', 'Thiết kế trong suốt ấn tượng', 12, 5, false, true, 'ACTIVE'),
('Oppo Watch X', 'oppo-watch-x.jpg', 'Hỗ trợ eSIM, sạc nhanh 80%', 6, 5, false, true, 'ACTIVE'),
('Vivo Watch 3', 'vivo-watch-3.jpg', 'Theo dõi sức khỏe và SpO2', 7, 5, false, true, 'ACTIVE'),
('Sony SmartWatch 6', 'sony-smartwatch-6.jpg', 'Chống nước IP68, NFC thanh toán', 8, 5, false, true, 'ACTIVE'),
('MSI Watch Gaming', 'msi-watch-gaming.jpg', 'Phong cách gaming, đèn RGB', 16, 5, true, true, 'ACTIVE'),
('Razer Nabu X2', 'razer-nabu-x2.jpg', 'Đồng hồ thông minh cho game thủ', 18, 5, false, true, 'ACTIVE'),
('Huawei Band 9', 'huawei-band-9.jpg', 'Giá rẻ, pin trâu', 11, 5, false, true, 'ACTIVE'),
('Xiaomi Smart Band 9', 'mi-band-9.jpg', 'Vòng tay thể thao thế hệ mới', 5, 5, true, true, 'ACTIVE'),
('Realme Watch 4', 'realme-watch-4.jpg', 'Đồng hồ trẻ trung, chống nước 5ATM', 10, 5, false, true, 'ACTIVE'),
('Asus VivoWatch 6', 'vivowatch-6.jpg', 'Đo nhịp tim, SpO2 chính xác', 9, 5, false, true, 'ACTIVE');
-- ======================
-- BẢNG PRODUCT_IMAGE (ảnh phụ cho từng sản phẩm)
-- ======================
INSERT INTO product_image (product_id, image) VALUES
(1, 'iphone-15-plus_1__1.jpg'),
(1, 'vn1b93_1_2.jpg'),
(1, 'vn_iphone_15_pink_pdp_image_position-2_design_2.jpg'),
(1, 'vn_iphone_15_pink_pdp_image_position-3_design_detail_2.jpg'),
(1, 'vn_iphone_15_pink_pdp_image_position-5_colors_2.jpg'),
(1, 'vn_iphone_15_pink_pdp_image_position-7_features_specs_2.jpg'),
(1, 'vn_iphone_15_pink_pdp_image_position-8_usb-c_charge_cable_2.jpg'),
(1, 'vn_iphone_15_pink_pdp_image_position-9_accessory_2.jpg');

-- ======================
-- BẢNG PRODUCT_VARIANT
-- ======================

-- Variants for iPhone 15 Pro Max
-- Variants for iPhone 15 Pro Max (product_id = 1)
INSERT INTO product_variant
(product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status, variant_attribute_values)
VALUES
-- 128GB
('iPhone 15 Pro Max - 6GB - 128GB - Black', 29990000, 28990000, 'IP15PM-6-128-BLK', 'iphone-15-128-gbden.jpg', 1, 50, 'ACTIVE', '6GB-128GB'),
-- 256GB
('iPhone 15 Pro Max - 6GB - 256GB - Black', 32990000, 31990000, 'IP15PM-6-256-BLK', 'iphone-15-256-gbden.jpg', 1, 40, 'ACTIVE', '6GB-256GB'),
-- 512GB
('iPhone 15 Pro Max - 8GB - 512GB - Black', 36990000, 35990000, 'IP15PM-8-512-BLK', 'iphone-15-512-gbden.jpg', 1, 30, 'ACTIVE', '8GB-512GB');

---

-- iPhone 15 (product_id = 2)
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES ('iPhone 15 - 128GB - Black', 24990000, 23990000, 'IP15-128-BLK', 'https://example.com/images/ip15-128-blk.jpg', 2, 50, 'ACTIVE');

INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES ('iPhone 15 - 256GB - White', 27990000, 26590000, 'IP15-256-WHT', 'https://example.com/images/ip15-256-wht.jpg', 2, 30, 'ACTIVE');

---

-- Variants for Samsung Galaxy S24 Ultra (product_id = 3)
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES
('Samsung Galaxy S24 Ultra - 256GB - Gray', 27990000, 26990000, 'SGS24U-256-GRY', 'https://example.com/images/sgs24u-256-gry.jpg', 3, 60, 'ACTIVE'),
('Samsung Galaxy S24 Ultra - 512GB - Gray', 30990000, 29990000, 'SGS24U-512-GRY', 'https://example.com/images/sgs24u-512-gry.jpg', 3, 50, 'ACTIVE'),
('Samsung Galaxy S24 Ultra - 1TB - Gray', 35990000, 34990000, 'SGS24U-1TB-GRY', 'https://example.com/images/sgs24u-1tb-gry.jpg', 3, 30, 'ACTIVE'),
('Samsung Galaxy S24 Ultra - 256GB - Titanium Blue', 27990000, 26990000, 'SGS24U-256-BLU', 'https://example.com/images/sgs24u-256-blu.jpg', 3, 55, 'ACTIVE'),
('Samsung Galaxy S24 Ultra - 512GB - Titanium Blue', 30990000, 29990000, 'SGS24U-512-BLU', 'https://example.com/images/sgs24u-512-blu.jpg', 3, 45, 'ACTIVE'),
('Samsung Galaxy S24 Ultra - 256GB - Violet', 27990000, 26990000, 'SGS24U-256-VIO', 'https://example.com/images/sgs24u-256-vio.jpg', 3, 50, 'ACTIVE'),
('Samsung Galaxy S24 Ultra - 512GB - Violet', 30990000, 29990000, 'SGS24U-512-VIO', 'https://example.com/images/sgs24u-512-vio.jpg', 3, 40, 'ACTIVE'),
('Samsung Galaxy S24 Ultra - 512GB - Black', 30990000, 29990000, 'SGS24U-512-BLK', 'https://example.com/images/sgs24u-512-blk.jpg', 3, 45, 'ACTIVE');

---

-- Variants for Samsung Galaxy S24+ (product_id = 4)
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES
('Samsung Galaxy S24+ - 256GB - Purple', 23990000, 22990000, 'SGS24P-256-PUR', 'https://example.com/images/sgs24p-256-pur.jpg', 4, 60, 'ACTIVE'),
('Samsung Galaxy S24+ - 512GB - Purple', 26990000, 25990000, 'SGS24P-512-PUR', 'https://example.com/images/sgs24p-512-pur.jpg', 4, 45, 'ACTIVE'),
('Samsung Galaxy S24+ - 256GB - Gray', 23990000, 22990000, 'SGS24P-256-GRY', 'https://example.com/images/sgs24p-256-gry.jpg', 4, 55, 'ACTIVE'),
('Samsung Galaxy S24+ - 512GB - Gray', 26990000, 25990000, 'SGS24P-512-GRY', 'https://example.com/images/sgs24p-512-gry.jpg', 4, 40, 'ACTIVE'),
('Samsung Galaxy S24+ - 256GB - Blue', 23990000, 22990000, 'SGS24P-256-BLU', 'https://example.com/images/sgs24p-256-blu.jpg', 4, 50, 'ACTIVE'),
('Samsung Galaxy S24+ - 512GB - Blue', 26990000, 25990000, 'SGS24P-512-BLU', 'https://example.com/images/sgs24p-512-blu.jpg', 4, 35, 'ACTIVE'),
('Samsung Galaxy S24+ - 256GB - Black', 23990000, 22990000, 'SGS24P-256-BLK', 'https://example.com/images/sgs24p-256-blk.jpg', 4, 60, 'ACTIVE'),
('Samsung Galaxy S24+ - 512GB - Black', 26990000, 25990000, 'SGS24P-512-BLK', 'https://example.com/images/sgs24p-512-blk.jpg', 4, 45, 'ACTIVE');

---

-- Variants for Google Pixel 8 Pro (product_id = 5)
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES
('Google Pixel 8 Pro - 128GB - Obsidian Black', 22990000, 21990000, 'GP8P-128-BLK', 'https://example.com/images/gp8p-128-blk.jpg', 5, 60, 'ACTIVE'),
('Google Pixel 8 Pro - 256GB - Obsidian Black', 24990000, 23990000, 'GP8P-256-BLK', 'https://example.com/images/gp8p-256-blk.jpg', 5, 50, 'ACTIVE'),
('Google Pixel 8 Pro - 512GB - Obsidian Black', 27990000, 26990000, 'GP8P-512-BLK', 'https://example.com/images/gp8p-512-blk.jpg', 5, 40, 'ACTIVE'),
('Google Pixel 8 Pro - 128GB - Bay Blue', 22990000, 21990000, 'GP8P-128-BLU', 'https://example.com/images/gp8p-128-blu.jpg', 5, 55, 'ACTIVE'),
('Google Pixel 8 Pro - 256GB - Bay Blue', 24990000, 23990000, 'GP8P-256-BLU', 'https://example.com/images/gp8p-256-blu.jpg', 5, 45, 'ACTIVE'),
('Google Pixel 8 Pro - 512GB - Bay Blue', 27990000, 26990000, 'GP8P-512-BLU', 'https://example.com/images/gp8p-512-blu.jpg', 5, 35, 'ACTIVE'),
('Google Pixel 8 Pro - 128GB - Porcelain', 22990000, 21990000, 'GP8P-128-POR', 'https://example.com/images/gp8p-128-por.jpg', 5, 50, 'ACTIVE'),
('Google Pixel 8 Pro - 256GB - Porcelain', 24990000, 23990000, 'GP8P-256-POR', 'https://example.com/images/gp8p-256-por.jpg', 5, 40, 'ACTIVE'),
('Google Pixel 8 Pro - 512GB - Porcelain', 27990000, 26990000, 'GP8P-512-POR', 'https://example.com/images/gp8p-512-por.jpg', 5, 30, 'ACTIVE');

---

-- Variants for OnePlus 12 (product_id = 6)
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES
('OnePlus 12 - 256GB - Flowy Emerald', 19990000, 18990000, 'OP12-256-GRN', 'https://example.com/images/op12-256-grn.jpg', 6, 60, 'ACTIVE'),
('OnePlus 12 - 512GB - Flowy Emerald', 21990000, 20990000, 'OP12-512-GRN', 'https://example.com/images/op12-512-grn.jpg', 6, 45, 'ACTIVE'),
('OnePlus 12 - 256GB - Silky Black', 19990000, 18990000, 'OP12-256-BLK', 'https://example.com/images/op12-256-blk.jpg', 6, 55, 'ACTIVE'),
('OnePlus 12 - 512GB - Silky Black', 21990000, 20990000, 'OP12-512-BLK', 'https://example.com/images/op12-512-blk.jpg', 6, 40, 'ACTIVE'),
('OnePlus 12 - 256GB - Glacier White', 19990000, 18990000, 'OP12-256-WHT', 'https://example.com/images/op12-256-wht.jpg', 6, 50, 'ACTIVE'),
('OnePlus 12 - 512GB - Glacier White', 21990000, 20990000, 'OP12-512-WHT', 'https://example.com/images/op12-512-wht.jpg', 6, 35, 'ACTIVE');

---

-- Variants for Xiaomi 14 Ultra (product_id = 7)
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES
('Xiaomi 14 Ultra - 256GB - Black', 24990000, 23990000, 'XM14U-256-BLK', 'https://example.com/images/xiaomi-14-ultra-256-blk.jpg', 7, 50, 'ACTIVE'),
('Xiaomi 14 Ultra - 512GB - White', 26990000, 25990000, 'XM14U-512-WHT', 'https://example.com/images/xiaomi-14-ultra-512-wht.jpg', 7, 40, 'ACTIVE'),
('Xiaomi 14 Ultra - 1TB - Blue', 28990000, 27990000, 'XM14U-1T-BLU', 'https://example.com/images/xiaomi-14-ultra-1t-blu.jpg', 7, 25, 'ACTIVE'),
('Xiaomi 14 Ultra - 512GB - Titanium Gray', 27490000, 26490000, 'XM14U-512-GRY', 'https://example.com/images/xiaomi-14-ultra-512-gry.jpg', 7, 30, 'ACTIVE');

---

-- Variants for Oppo Find X7 Pro (product_id = 8)
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES
('Oppo Find X7 Pro - 256GB - Black', 21990000, 20990000, 'OPFX7P-256-BLK', 'https://example.com/images/oppo-find-x7-pro-256-blk.jpg', 8, 60, 'ACTIVE'),
('Oppo Find X7 Pro - 512GB - White', 23990000, 22990000, 'OPFX7P-512-WHT', 'https://example.com/images/oppo-find-x7-pro-512-wht.jpg', 8, 45, 'ACTIVE'),
('Oppo Find X7 Pro - 1TB - Orange', 25990000, 24990000, 'OPFX7P-1T-ORG', 'https://example.com/images/oppo-find-x7-pro-1t-org.jpg', 8, 30, 'ACTIVE'),
('Oppo Find X7 Pro - 512GB - Blue', 23990000, 22990000, 'OPFX7P-512-BLU', 'https://example.com/images/oppo-find-x7-pro-512-blu.jpg', 8, 40, 'ACTIVE');

---

-- Variants for Vivo X100 Pro (product_id = 9)
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES
('Vivo X100 Pro - 256GB - Black', 23990000, 22990000, 'VX100P-256-BLK', 'https://example.com/images/vivo-x100-pro-256-blk.jpg', 9, 55, 'ACTIVE'),
('Vivo X100 Pro - 512GB - Blue', 25990000, 24990000, 'VX100P-512-BLU', 'https://example.com/images/vivo-x100-pro-512-blu.jpg', 9, 45, 'ACTIVE'),
('Vivo X100 Pro - 512GB - White', 25990000, 24990000, 'VX100P-512-WHT', 'https://example.com/images/vivo-x100-pro-512-wht.jpg', 9, 40, 'ACTIVE'),
('Vivo X100 Pro - 1TB - Orange', 27990000, 26990000, 'VX100P-1T-ORG', 'https://example.com/images/vivo-x100-pro-1t-org.jpg', 9, 25, 'ACTIVE');

---

-- Variants for Sony Xperia 1 VI (product_id = 10)
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES
('Sony Xperia 1 VI - 256GB - Black', 28990000, 27990000, 'SX1VI-256-BLK', 'https://example.com/images/sony-xperia-1vi-256-blk.jpg', 10, 40, 'ACTIVE'),
('Sony Xperia 1 VI - 512GB - Purple', 30990000, 29990000, 'SX1VI-512-PUR', 'https://example.com/images/sony-xperia-1vi-512-pur.jpg', 10, 35, 'ACTIVE'),
('Sony Xperia 1 VI - 512GB - White', 30990000, 29990000, 'SX1VI-512-WHT', 'https://example.com/images/sony-xperia-1vi-512-wht.jpg', 10, 30, 'ACTIVE'),
('Sony Xperia 1 VI - 1TB - Green', 32990000, 31990000, 'SX1VI-1T-GRN', 'https://example.com/images/sony-xperia-1vi-1t-grn.jpg', 10, 20, 'ACTIVE');

---

-- Variants for Asus ROG Phone 8 (product_id = 11)
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES
('Asus ROG Phone 8 - 256GB - Black', 23990000, 22990000, 'ROG8-256-BLK', 'https://example.com/images/rog8-256-blk.jpg', 11, 40, 'ACTIVE'),
('Asus ROG Phone 8 - 512GB - Black', 26990000, 25990000, 'ROG8-512-BLK', 'https://example.com/images/rog8-512-blk.jpg', 11, 30, 'ACTIVE'),
('Asus ROG Phone 8 - 512GB - Silver', 26990000, 25990000, 'ROG8-512-SLV', 'https://example.com/images/rog8-512-slv.jpg', 11, 25, 'ACTIVE'),
('Asus ROG Phone 8 - 1TB - Black', 30990000, 29990000, 'ROG8-1TB-BLK', 'https://example.com/images/rog8-1tb-blk.jpg', 11, 20, 'ACTIVE');

---

-- Variants for Realme GT 6 (product_id = 12)
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES
('Realme GT 6 - 256GB - Silver', 13990000, 12990000, 'RGT6-256-SLV', 'https://example.com/images/rgt6-256-slv.jpg', 12, 50, 'ACTIVE'),
('Realme GT 6 - 512GB - Silver', 15990000, 14990000, 'RGT6-512-SLV', 'https://example.com/images/rgt6-512-slv.jpg', 12, 40, 'ACTIVE'),
('Realme GT 6 - 512GB - Green', 15990000, 14990000, 'RGT6-512-GRN', 'https://example.com/images/rgt6-512-grn.jpg', 12, 35, 'ACTIVE'),
('Realme GT 6 - 1TB - Silver', 18990000, 17990000, 'RGT6-1TB-SLV', 'https://example.com/images/rgt6-1tb-slv.jpg', 12, 25, 'ACTIVE');

---

-- Variants for Huawei P70 Pro (product_id = 13)
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES
('Huawei P70 Pro - 512GB - Black', 28990000, 27990000, 'P70P-512-BLK', 'https://example.com/images/p70p-512-blk.jpg', 13, 35, 'ACTIVE'),
('Huawei P70 Pro - 256GB - Black', 25990000, 24990000, 'P70P-256-BLK', 'https://example.com/images/p70p-256-blk.jpg', 13, 45, 'ACTIVE'),
('Huawei P70 Pro - 512GB - White', 28990000, 27990000, 'P70P-512-WHT', 'https://example.com/images/p70p-512-wht.jpg', 13, 30, 'ACTIVE'),
('Huawei P70 Pro - 1TB - Black', 32990000, 31990000, 'P70P-1TB-BLK', 'https://example.com/images/p70p-1tb-blk.jpg', 13, 20, 'ACTIVE');

---

-- Variants for Huawei Nova 12 (product_id = 14)
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES
('Huawei Nova 12 - 128GB - Blue', 10990000, 9990000, 'NOVA12-128-BLU', 'https://example.com/images/nova12-128-blu.jpg', 14, 60, 'ACTIVE'),
('Huawei Nova 12 - 256GB - Blue', 11990000, 10990000, 'NOVA12-256-BLU', 'https://example.com/images/nova12-256-blu.jpg', 14, 50, 'ACTIVE'),
('Huawei Nova 12 - 256GB - Pink', 11990000, 10990000, 'NOVA12-256-PNK', 'https://example.com/images/nova12-256-pnk.jpg', 14, 40, 'ACTIVE'),
('Huawei Nova 12 - 512GB - Blue', 13990000, 12990000, 'NOVA12-512-BLU', 'https://example.com/images/nova12-512-blu.jpg', 14, 30, 'ACTIVE');

---

-- Variants for Nothing Phone 2 (product_id = 15)
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES
('Nothing Phone 2 - 128GB - White', 14990000, 13990000, 'NP2-128-WHT', 'https://example.com/images/np2-128-wht.jpg', 15, 60, 'ACTIVE'),
('Nothing Phone 2 - 256GB - White', 16990000, 15990000, 'NP2-256-WHT', 'https://example.com/images/np2-256-wht.jpg', 15, 50, 'ACTIVE'),
('Nothing Phone 2 - 256GB - Black', 16990000, 15990000, 'NP2-256-BLK', 'https://example.com/images/np2-256-blk.jpg', 15, 40, 'ACTIVE'),
('Nothing Phone 2 - 512GB - White', 19990000, 18990000, 'NP2-512-WHT', 'https://example.com/images/np2-512-wht.jpg', 15, 25, 'ACTIVE');

---

-- Variants for Nokia X30 5G (product_id = 16)
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES
('Nokia X30 5G - 128GB - Blue', 9990000, 9490000, 'NX30-128-BLU', 'https://example.com/images/nx30-128-blu.jpg', 16, 55, 'ACTIVE'),
('Nokia X30 5G - 256GB - Blue', 10990000, 10490000, 'NX30-256-BLU', 'https://example.com/images/nx30-256-blu.jpg', 16, 45, 'ACTIVE'),
('Nokia X30 5G - 256GB - White', 10990000, 10490000, 'NX30-256-WHT', 'https://example.com/images/nx30-256-wht.jpg', 16, 35, 'ACTIVE'),
('Nokia X30 5G - 256GB - Green', 10990000, 10490000, 'NX30-256-GRN', 'https://example.com/images/nx30-256-grn.jpg', 16, 25, 'ACTIVE');

---- MacBook Pro 14
--INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
--VALUES ('MacBook Pro 14" - M2 Pro - 16GB RAM - 512GB SSD', 49990000, 47990000, 'MBP14-M2P-16-512', 'https://example.com/images/mbp14-m2p-16-512.jpg', 6, 20, 'ACTIVE');
--
--INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
--VALUES ('MacBook Pro 14" - M2 Pro - 32GB RAM - 1TB SSD', 59990000, 56990000, 'MBP14-M2P-32-1TB', 'https://example.com/images/mbp14-m2p-32-1tb.jpg', 6, 10, 'ACTIVE');
--
---- Dell XPS 13
--INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
--VALUES ('Dell XPS 13 - Core i7 - 16GB RAM - 512GB SSD', 37990000, 35990000, 'DXPS13-I7-16-512', 'https://example.com/images/dxps13-i7-16-512.jpg', 7, 15, 'ACTIVE');
--
--INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
--VALUES ('Dell XPS 13 - Core i5 - 8GB RAM - 256GB SSD', 28990000, 27490000, 'DXPS13-I5-8-256', 'https://example.com/images/dxps13-i5-8-256.jpg', 7, 25, 'ACTIVE');
--


-- ======================
-- CẬP NHẬT thumbnail_product_id CHO PRODUCT (liên kết tới variant chính)
-- ======================
UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'IP15PM-6-128-BLK'
) WHERE id = 1;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'IP15-128-BLK'
) WHERE id = 2;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'SGS24U-256-GRY'
) WHERE id = 3;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'SGS24P-256-PUR'
) WHERE id = 4;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'GP8P-128-BLK'
) WHERE id = 5;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'OP12-256-GRN'
) WHERE id = 6;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'XM14U-256-BLK'
) WHERE id = 7;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'OPFX7P-256-BLK'
) WHERE id = 8;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'VX100P-256-BLK'
) WHERE id = 9;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'SX1VI-256-BLK'
) WHERE id = 10;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'ROG8-256-BLK'
) WHERE id = 11;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'RGT6-256-SLV'
) WHERE id = 12;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'P70P-512-BLK'
) WHERE id = 13;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'NOVA12-128-BLU'
) WHERE id = 14;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'NP2-128-WHT'
) WHERE id = 15;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'NX30-128-BLU'
) WHERE id = 16;

-- iPhone 15 128GB có 2 khuyến mãi
INSERT INTO product_promotion (name, description, promotion_type, config, promotion_condition, start_date, end_date)
VALUES
('Giảm 1 triệu iPhone 15 128GB', 'Giảm trực tiếp 1,000,000đ', 'DISCOUNT_AMOUNT',
 '{"amount":1000000}', '{"paymentMethods":["CASH","VNPAY"]}', '2025-09-01', '2025-09-30'),
('Voucher iPhone128-5%', 'Nhập mã IP128 giảm thêm 5%', 'DISCOUNT_PERCENT',
 '{"percent":5}', '{"paymentMethods":["CASH","VNPAY"]}', '2025-09-05', '2025-11-25');


-- iPhone 15 256GB có 3 khuyến mãi
INSERT INTO product_promotion (name, description, promotion_type, config, promotion_condition, start_date, end_date)
VALUES
('Giảm 10% iPhone 15 256GB', 'Giảm 10% trên giá niêm yết', 'DISCOUNT_PERCENT',
 '{"percent":10}', '{"paymentMethods":["CASH","VNPAY"]}', '2025-09-05', '2025-09-20'),
('Tặng bảo hành 12 tháng', 'Bảo hành thêm 12 tháng miễn phí', 'SERVICE',
 '{"service":"Extended Warranty","duration":"12 months"}', '{"paymentMethods":["CASH","VNPAY"]}', '2025-09-01', '2025-12-31'),
('Voucher IP256-7%', 'Nhập mã IP256 giảm thêm 7%', 'DISCOUNT_PERCENT',
 '{"percent":7}', '{"paymentMethods":["VNPAY"]}', '2025-09-10', '2025-09-25');


-- Galaxy S24 có 2 khuyến mãi
INSERT INTO product_promotion (name, description, promotion_type, config, promotion_condition, start_date, end_date)
VALUES
('Giảm giá trực tiếp 2 triệu', 'Giảm 2,000,000đ khi mua Galaxy S24', 'DISCOUNT_AMOUNT',
 '{"amount":2000000}', '{"paymentMethods":["CASH","VNPAY"]}', '2025-09-10', '2025-09-30'),
('Voucher Galaxy 10%', 'Nhập mã GS24 giảm thêm 10%', 'DISCOUNT_PERCENT',
 '{"percent":10}', '{"paymentMethods":["CASH","VNPAY"]}', '2025-09-15', '2025-09-30');


-- MacBook Air M3 có 3 khuyến mãi
INSERT INTO product_promotion (name, description, promotion_type, config, promotion_condition, start_date, end_date)
VALUES
('Tặng Office 365 1 năm', 'Miễn phí Microsoft Office 365 trong 12 tháng', 'SERVICE',
 '{"service":"Office 365","duration":"12 months"}', '{"paymentMethods":["CASH","VNPAY"]}', '2025-09-01', '2025-12-31'),
('Giảm 5% khi thanh toán qua VNPAY', 'Thanh toán qua VNPAY giảm thêm 5%', 'DISCOUNT_PERCENT',
 '{"percent":5}', '{"paymentMethods":["VNPAY"]}', '2025-09-01', '2025-09-30'),
('Voucher MBA-3%', 'Nhập mã MBA3 giảm thêm 3%', 'DISCOUNT_PERCENT',
 '{"percent":3}', '{"paymentMethods":["CASH","VNPAY"]}', '2025-09-10', '2025-09-30');

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

INSERT INTO inventory (product_variant_id, warehouse_id, quantity)
VALUES
-- Kho Đà Nẵng (warehouse_id = 1)
(1, 1, 50),
(2, 1, 250),
(3, 1, 180),
(4, 1, 300),
(5, 1, 95),

-- Kho Hồ Chí Minh (warehouse_id = 2)
(6, 2, 400),
(7, 2, 220),
(8, 2, 310),
(9, 2, 150),
(10, 2, 275),

-- Kho Hà Nội (warehouse_id = 3)
(1, 3, 180),
(2, 3, 260),
(3, 3, 190),
(4, 3, 280),
(5, 3, 330),

-- Kho Đà Nẵng 2 (warehouse_id = 4)
(6, 4, 500),
(7, 4, 440),
(8, 4, 150),
(9, 4, 210),
(10, 4, 360);

INSERT INTO stock_entry (inventory_id, quantity, purchase_price, import_date, supplier_id, created_at)
VALUES
-- Nhập hàng vào Kho Đà Nẵng
(1,  50,  150000, '2025-10-01', 1, CURRENT_TIMESTAMP),
(2,  75,  180000, '2025-10-02', 2, CURRENT_TIMESTAMP),

-- Nhập hàng vào Kho Hồ Chí Minh
(3, 100,  200000, '2025-10-03', 3, CURRENT_TIMESTAMP),
(4,  60,  175000, '2025-10-04', 1, CURRENT_TIMESTAMP),

-- Nhập hàng vào Kho Hà Nội
(5,  90,  220000, '2025-10-05', 2, CURRENT_TIMESTAMP),
(6,  40,  140000, '2025-10-06', 3, CURRENT_TIMESTAMP),

-- Nhập hàng vào Kho Đà Nẵng 2
(7, 120,  250000, '2025-10-07', 1, CURRENT_TIMESTAMP),
(8,  80,  210000, '2025-10-08', 2, CURRENT_TIMESTAMP),
(9,  55,  160000, '2025-10-09', 3, CURRENT_TIMESTAMP),
(10, 70,  190000, '2025-10-10', 1, CURRENT_TIMESTAMP);




INSERT INTO warranty (name, months, price, description)
VALUES
( 'Bảo hành 12 tháng chính hãng', 12, 0, 'Bảo hành phần cứng chính hãng trong 12 tháng'),
( 'Bảo hành mở rộng 24 tháng', 24, 600000, 'Mua thêm 24 tháng bảo hành mở rộng'),
( 'Bảo hành rơi vỡ, vào nước 12 tháng', 12, 900000, 'Bao gồm rơi vỡ, vào nước 1 lần/năm'),
( 'Bảo hành VIP 36 tháng', 36, 1800000, 'Bảo hành toàn diện 36 tháng, 1 đổi 1 trong 30 ngày'),
( 'Bảo hành pin 18 tháng', 18, 300000, 'Thay pin miễn phí 1 lần trong 18 tháng');


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
INSERT INTO gift_product (name, stock, description, thumbnail, price)
VALUES ('Ốp lưng silicon iPhone 15', 100, 'Ốp lưng silicon trong suốt, bảo vệ điện thoại tốt',
        'op-lung-iphone-15-pro-max-wiwu-zcc-108-silicon-1.jpg', 0);

-- Quà tặng 2: Tai nghe Bluetooth mini
INSERT INTO gift_product (name, stock, description, thumbnail, price)
VALUES ('Tai nghe Bluetooth mini', 50, 'Tai nghe không dây, pin 12h, dễ mang theo',
        'group_194_2_.jpg', 0);

-- Quà tặng 3: Bình giữ nhiệt
INSERT INTO gift_product (name, stock, description, thumbnail, price)
VALUES ('Bình giữ nhiệt 500ml', 200, 'Bình giữ nhiệt inox, giữ nóng/lạnh 8h',
        'https://example.com/thermos.jpg', 0);

-- iPhone 15 (id=1 trong bảng product) được tặng kèm ốp lưng và tai nghe
INSERT INTO product_variant_gift (gift_product_id, product_variant_id) VALUES (1, 1);
INSERT INTO product_variant_gift (gift_product_id, product_variant_id) VALUES (2, 1);

-- Samsung Galaxy S24 (id=2 trong bảng product) được tặng kèm bình giữ nhiệt
INSERT INTO product_variant_gift (gift_product_id, product_variant_id) VALUES (3, 2);



--UPDATE product p
--SET min_price = (
--    SELECT MIN(v.price)
--    FROM product_variant v
--    WHERE v.product_id = p.id
--)
--WHERE EXISTS (
--    SELECT 1 FROM product_variant v WHERE v.product_id = p.id
--);

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

INSERT INTO payment_method (id, name, description, payment_method_type)
VALUES (1, 'Cash Payment', 'Thanh toán tiền mặt tại cửa hàng hoặc khi nhận hàng', 'CASH');

INSERT INTO payment_method (id, name, description, payment_method_type)
VALUES (2, 'VNPay', 'Thanh toán trực tuyến thông qua cổng VNPay', 'VNPAY');

INSERT INTO customer_order (code, user_id, ordered_at, total_price, order_status, customer_info_id)
VALUES
('SPS1', 5, '2025-09-01 10:00:00', 1500000, 'DELIVERED', 1),
('SPS2', 5, '2025-09-02 11:30:00', 3200000, 'CONFIRMED',   2),
('SPS3', 5, '2025-09-03 14:15:00', 450000,  'SHIPPING',   3),
('SPS4', 5, '2025-09-04 09:45:00', 7800000, 'DELIVERED',  4),
('SPS5', 5, '2025-09-05 16:00:00', 2300000, 'CANCELED',   5),
('SPS6', 5, '2025-09-06 19:20:00', 990000,  'PENDING',    6),
('SPS7', 5, '2025-09-07 12:40:00', 11000000,'SHIPPING',   7),
('SPS8', 5, '2025-09-08 08:30:00', 560000,  'PENDING',  8);

INSERT INTO payment (order_id, status, payment_method_id, created_at)
VALUES
(1, 'PENDING', 2, '2025-09-01 10:00:00'),
(2, 'PENDING', 2, '2025-09-02 11:30:00'),
(3, 'PENDING', 2, '2025-09-03 14:15:00'),
(4, 'PENDING', 2, '2025-09-04 09:45:00'),
(5, 'PENDING', 2, '2025-09-05 16:00:00'),
(6, 'PENDING', 2, '2025-09-06 19:20:00'),
(7, 'PENDING', 2, '2025-09-07 12:40:00'),
(8, 'PENDING', 2, '2025-09-08 08:30:00');

INSERT INTO order_variant
(order_id, product_variant_id, quantity, added_at, total_price, warranty_id, discount_amount)
VALUES
(1, 1, 2, '2025-09-01 10:05:00', 1000000, 1, 50000),     -- giảm 5%
(1, 2, 1, '2025-09-01 10:07:00', 500000, 2, 25000),      -- giảm 5%
(2, 3, 3, '2025-09-02 11:35:00', 1200000, 3, 100000),    -- giảm 8.3%
(3, 4, 5, '2025-09-03 14:20:00', 450000, 1, 30000),      -- giảm 6.6%
(4, 5, 2, '2025-09-04 09:50:00', 7800000, 4, 700000),    -- giảm ~9%
(5, 6, 1, '2025-09-05 16:10:00', 2300000, 5, 200000),    -- giảm ~8.7%
(6, 7, 2, '2025-09-06 19:25:00', 990000, 2, 90000),      -- giảm 9%
(7, 8, 10, '2025-09-07 12:50:00', 11000000, 3, 1000000), -- giảm ~9%
(8, 9, 1, '2025-09-08 08:35:00', 560000, 4, 40000);      -- giảm ~7%


INSERT INTO order_variant_promotion
(name, description, promotion_type, config, promotion_condition, start_date, end_date, order_variant_id)
VALUES
('Giảm 10%', 'Giảm 10% cho sản phẩm', 'DISCOUNT_PERCENT', '{"value":10}', NULL, '2025-09-01', '2025-09-30', 1),
('Giảm 200k', 'Giảm 200,000 VND cho đơn hàng trên 1 triệu', 'DISCOUNT_AMOUNT', '{"value":200000}', 'totalPrice > 1000000', '2025-09-01', '2025-09-30', 2),
('Bảo hành thêm 6 tháng', 'Tặng thêm 6 tháng bảo hành', 'SERVICE', '{"months":6}', NULL, '2025-09-05', '2025-12-31', 3),
('Freeship', 'Miễn phí vận chuyển toàn quốc', 'SERVICE', '{"shipping":"free"}', NULL, '2025-09-01', '2025-09-30', 5),
('Giảm 5%', 'Giảm 5% cho khách hàng mới', 'DISCOUNT_PERCENT', '{"value":5}', 'isNewCustomer = true', '2025-09-01', '2025-10-15', 7);


-- Reviews for variant 1
INSERT INTO review (user_id, content, rating_score, status, product_variant_id, created_at)
VALUES
(1, 'Sản phẩm rất tốt, pin khỏe.', 5, 'APPROVED', 1, CURRENT_TIMESTAMP),
(2, 'Máy chạy mượt, đáng tiền.', 4, 'APPROVED', 1, CURRENT_TIMESTAMP),
(3, 'Hơi nóng khi chơi game.', 3, 'PENDING', 1, CURRENT_TIMESTAMP),
(4, 'Thiết kế đẹp, cầm chắc tay.', 5, 'APPROVED', 1, CURRENT_TIMESTAMP),
(5, 'Camera ổn nhưng pin hơi yếu.', 3, 'DISAPPROVED', 1, CURRENT_TIMESTAMP);


-- Reviews for variant 2
INSERT INTO review (user_id, content, rating_score, status, product_variant_id, created_at)
VALUES
(2, 'Màu sắc đẹp, giao hàng nhanh.', 4, 'APPROVED', 2, CURRENT_TIMESTAMP),
(3, 'Màn hình sáng, hiển thị tốt.', 5, 'APPROVED', 2, CURRENT_TIMESTAMP),
(6, 'Loa ngoài hơi nhỏ.', 3, 'PENDING', 2, CURRENT_TIMESTAMP),
(7, 'Pin trâu, sạc nhanh.', 5, 'APPROVED', 2, CURRENT_TIMESTAMP),
(8, 'Máy hơi nặng, không thoải mái.', 2, 'DISAPPROVED', 2, CURRENT_TIMESTAMP);


-- Reviews for variant 3
INSERT INTO review (user_id, content, rating_score, status, product_variant_id, created_at)
VALUES
(1, 'Giá hợp lý, cấu hình mạnh.', 4, 'APPROVED', 3, CURRENT_TIMESTAMP),
(4, 'Cảm ứng mượt, không bị lag.', 5, 'APPROVED', 3, CURRENT_TIMESTAMP),
(5, 'Pin xuống khá nhanh.', 3, 'PENDING', 3, CURRENT_TIMESTAMP),
(6, 'Thiết kế tinh tế, sang trọng.', 5, 'APPROVED', 3, CURRENT_TIMESTAMP);


-- Reviews for variant 4
INSERT INTO review (user_id, content, rating_score, status, product_variant_id, created_at)
VALUES
(2, 'Chụp ảnh đẹp, nhiều tính năng.', 5, 'APPROVED', 4, CURRENT_TIMESTAMP),
(7, 'Tốc độ xử lý tốt.', 4, 'APPROVED', 4, CURRENT_TIMESTAMP),
(8, 'Khá nóng khi chơi game nặng.', 3, 'PENDING', 4, CURRENT_TIMESTAMP),
(3, 'Màn hình lớn, dễ xem phim.', 5, 'APPROVED', 4, CURRENT_TIMESTAMP);

-- Reviews for Samsung Galaxy S24 Ultra - 256GB - Gray (variant_id = 5)
INSERT INTO review (user_id, content, rating_score, status, product_variant_id, created_at)
VALUES
(2, 'Camera zoom 100x thực sự ấn tượng, ảnh chụp rất nét.', 5, 'APPROVED', 5, CURRENT_TIMESTAMP),
(5, 'Hiệu năng cực mạnh, chơi game mượt mà.', 5, 'APPROVED', 5, CURRENT_TIMESTAMP),
(8, 'Pin khá tốt nhưng sạc hơi chậm.', 4, 'APPROVED', 5, CURRENT_TIMESTAMP),
(7, 'Màn hình sáng và hiển thị sống động, nhưng giá hơi cao.', 4, 'PENDING', 5, CURRENT_TIMESTAMP);

-- Reviews for Samsung Galaxy S24+ - 256GB - Purple (variant_id = 13)
INSERT INTO review (user_id, content, rating_score, status, product_variant_id, created_at)
VALUES
(2, 'Màu tím rất đẹp, máy cầm sang và chắc tay.', 5, 'APPROVED', 13, CURRENT_TIMESTAMP),
(4, 'Hiệu năng mạnh, chơi game mượt mà.', 5, 'APPROVED', 13, CURRENT_TIMESTAMP),
(7, 'Màn hình sáng, hiển thị tốt ngoài trời.', 4, 'APPROVED', 13, CURRENT_TIMESTAMP),
(5, 'Pin hơi yếu khi dùng 5G cả ngày.', 3, 'PENDING', 13, CURRENT_TIMESTAMP);

-- Reviews for Google Pixel 8 Pro - 128GB - Obsidian Black (variant_id = 21)
INSERT INTO review (user_id, content, rating_score, status, product_variant_id, created_at)
VALUES
(1, 'Ảnh chụp từ camera Pixel siêu chi tiết, màu sắc trung thực.', 5, 'APPROVED', 21, CURRENT_TIMESTAMP),
(3, 'Android gốc mượt, tối ưu rất tốt.', 5, 'APPROVED', 21, CURRENT_TIMESTAMP),
(6, 'Thiết kế cứng cáp, cầm nắm dễ chịu.', 4, 'APPROVED', 21, CURRENT_TIMESTAMP),
(8, 'Pin ổn nhưng sạc hơi chậm.', 3, 'PENDING', 21, CURRENT_TIMESTAMP);

-- Reviews for OnePlus 12 - 256GB - Flowy Emerald (variant_id = 30)
INSERT INTO review (user_id, content, rating_score, status, product_variant_id, created_at)
VALUES
(2, 'Hiệu năng cực mạnh, mở app siêu nhanh.', 5, 'APPROVED', 30, CURRENT_TIMESTAMP),
(5, 'Màn hình đẹp, tần số quét cao 120Hz nhìn rất mượt.', 5, 'APPROVED', 30, CURRENT_TIMESTAMP),
(7, 'Sạc nhanh 100W đúng nghĩa, pin đầy trong chưa tới 30 phút.', 5, 'APPROVED', 30, CURRENT_TIMESTAMP),
(4, 'Máy hơi nóng khi chơi game lâu nhưng tổng thể rất tốt.', 4, 'PENDING', 30, CURRENT_TIMESTAMP);

-- Reviews for Xiaomi 14 Ultra - 256GB - Black (variant_id = 36)
INSERT INTO review (user_id, content, rating_score, status, product_variant_id, created_at)
VALUES
(3, 'Camera Leica thực sự ấn tượng, ảnh chụp chi tiết và màu rất đẹp.', 5, 'APPROVED', 36, CURRENT_TIMESTAMP),
(6, 'Hiệu năng mạnh, chạy app mượt, không bị giật lag.', 5, 'APPROVED', 36, CURRENT_TIMESTAMP),
(2, 'Thiết kế sang, cảm giác cầm cao cấp.', 4, 'APPROVED', 36, CURRENT_TIMESTAMP),
(8, 'Máy hơi nặng, pin dùng ổn trong 1 ngày.', 4, 'PENDING', 36, CURRENT_TIMESTAMP);

-- Reviews for Oppo Find X7 Pro - 256GB - Black (variant_id = 40)
INSERT INTO review (user_id, content, rating_score, status, product_variant_id, created_at)
VALUES
(1, 'Thiết kế cong viền rất đẹp, cầm nắm dễ chịu.', 5, 'APPROVED', 40, CURRENT_TIMESTAMP),
(4, 'Camera chụp đêm tốt, màu sắc tự nhiên.', 4, 'APPROVED', 40, CURRENT_TIMESTAMP),
(6, 'Hiệu năng ổn định, giao diện ColorOS mượt mà.', 5, 'APPROVED', 40, CURRENT_TIMESTAMP),
(7, 'Pin dùng khá tốt nhưng sạc vẫn hơi nóng.', 4, 'PENDING', 40, CURRENT_TIMESTAMP);

-- Reviews for Vivo X100 Pro - 256GB - Black (variant_id = 44)
INSERT INTO review (user_id, content, rating_score, status, product_variant_id, created_at)
VALUES
(2, 'Camera ZEISS cực kỳ ấn tượng, ảnh sắc nét và chân thực.', 5, 'APPROVED', 44, CURRENT_TIMESTAMP),
(5, 'Màn hình sáng, hiển thị ngoài trời rất tốt.', 4, 'APPROVED', 44, CURRENT_TIMESTAMP),
(3, 'Hiệu năng mạnh mẽ, chơi game mượt, không bị nóng.', 5, 'APPROVED', 44, CURRENT_TIMESTAMP),
(8, 'Pin tốt nhưng sạc nhanh hơi nóng nhẹ.', 4, 'PENDING', 44, CURRENT_TIMESTAMP);

-- Reviews for Sony Xperia 1 VI - 256GB - Black (variant_id = 48)
INSERT INTO review (user_id, content, rating_score, status, product_variant_id, created_at)
VALUES
(1, 'Màn hình 4K OLED cực kỳ sắc nét, xem phim rất đã.', 5, 'APPROVED', 48, CURRENT_TIMESTAMP),
(3, 'Chất lượng âm thanh đỉnh cao, đúng chất Sony.', 5, 'APPROVED', 48, CURRENT_TIMESTAMP),
(6, 'Camera chụp tự nhiên, chi tiết tốt nhưng đôi khi lấy nét hơi chậm.', 4, 'APPROVED', 48, CURRENT_TIMESTAMP),
(7, 'Thiết kế vuông vức, hơi khó cầm khi dùng lâu.', 3, 'PENDING', 48, CURRENT_TIMESTAMP);



INSERT INTO review_image (review_id, image_name)
VALUES
(1, '8dcff819-55ab-43b9-a977-728ffc051d04.jpg'),
(1, '59f61c1c-351d-4290-97d4-64a503166e2f.jpg'),
(1, 'group_194_2_.jpg'),
(1, 'group_194_2_.jpg'),
(1, 'group_194_2_.jpg'),
(1, 'e7cd9751-81c3-4358-b0fe-06866535d467.jpg'),
(1, 'e7cd9751-81c3-4358-b0fe-06866535d467.jpg'),
(2, 'Screenshot 2025-09-11 193356.png'),
(3, 'https://example.com/review3-img1.jpg'),
(3, 'https://example.com/review3-img2.jpg');

--NHỚ TẠO TRIGGER
UPDATE product p
SET
    p.average_rating = (
        SELECT ROUND(AVG(r.rating_score), 1)
        FROM review r
        JOIN product_variant pv ON r.product_variant_id = pv.id
        WHERE pv.product_id = p.id
    ),
    p.total_reviews = (
        SELECT COUNT(r.id)
        FROM review r
        JOIN product_variant pv ON r.product_variant_id = pv.id
        WHERE pv.product_id = p.id
    );


--
--CREATE TRIGGER trg_after_insert_review
--AFTER INSERT ON review
--FOR EACH ROW
--CALL "
--    UPDATE product
--    SET total_reviews = (
--        SELECT COUNT(r.id)
--        FROM review r
--        JOIN product_variant pv ON r.product_variant_id = pv.id
--        WHERE pv.product_id = (
--            SELECT product_id FROM product_variant WHERE id = NEW.product_variant_id
--        )
--    ),
--    average_rating = (
--        SELECT ROUND(AVG(r.rating_score), 1)
--        FROM review r
--        JOIN product_variant pv ON r.product_variant_id = pv.id
--        WHERE pv.product_id = (
--            SELECT product_id FROM product_variant WHERE id = NEW.product_variant_id
--        )
--    )
--    WHERE id = (
--        SELECT product_id FROM product_variant WHERE id = NEW.product_variant_id
--    );
--";





--DELIMITER //
--
--CREATE TRIGGER trg_update_variant_product_rating_after_insert
--AFTER INSERT ON review
--FOR EACH ROW
--BEGIN
--    DECLARE v_product_id BIGINT;
--
--    -- Cập nhật trung bình rating của variant
--    UPDATE product_variant
--    SET rating_average = (
--        SELECT ROUND(AVG(r.rating_score), 2)
--        FROM review r
--        WHERE r.product_variant_id = NEW.product_variant_id
--    )
--    WHERE id = NEW.product_variant_id;
--
--    -- Lấy product_id của variant vừa được review
--    SELECT product_id INTO v_product_id
--    FROM product_variant
--    WHERE id = NEW.product_variant_id;
--
--    -- Cập nhật trung bình rating của product cha
--    UPDATE product
--    SET rating_average = (
--        SELECT ROUND(AVG(r.rating_score), 2)
--        FROM review r
--        JOIN product_variant pv ON pv.id = r.product_variant_id
--        WHERE pv.product_id = v_product_id
--    )
--    WHERE id = v_product_id;
--END;
--//
--
--CREATE TRIGGER trg_update_variant_product_rating_after_delete
--AFTER DELETE ON review
--FOR EACH ROW
--BEGIN
--    DECLARE v_product_id BIGINT;
--
--    -- Cập nhật trung bình rating của variant
--    UPDATE product_variant
--    SET rating_average = (
--        SELECT ROUND(AVG(r.rating_score), 2)
--        FROM review r
--        WHERE r.product_variant_id = OLD.product_variant_id
--    )
--    WHERE id = OLD.product_variant_id;
--
--    -- Lấy product_id của variant bị xóa review
--    SELECT product_id INTO v_product_id
--    FROM product_variant
--    WHERE id = OLD.product_variant_id;
--
--    -- Cập nhật trung bình rating của product cha
--    UPDATE product
--    SET rating_average = (
--        SELECT ROUND(AVG(r.rating_score), 2)
--        FROM review r
--        JOIN product_variant pv ON pv.id = r.product_variant_id
--        WHERE pv.product_id = v_product_id
--    )
--    WHERE id = v_product_id;
--END;
--//
--
--DELIMITER ;

--
--
--
---- THÊM MỚI các product_id CHƯA có trong product_rating_summary
--INSERT INTO product_rating_summary (product_id, ava, created_at)
--SELECT t.product_id, t.avg_rating, CURRENT_TIMESTAMP
--FROM (
--    SELECT pv.product_id, ROUND(AVG(r.rating_score), 1) AS avg_rating
--    FROM review r
--    JOIN product_variant pv ON r.product_variant_id = pv.id
--    GROUP BY pv.product_id
--) AS t
--WHERE t.product_id NOT IN (
--    SELECT product_id FROM product_rating_summary
--);




-- ====================================
-- 🧱 BÌNH LUẬN CHA (PARENT_COMMENT_ID = NULL)
-- ====================================
INSERT INTO comment (user_id, product_id, content, parent_comment_id, status, created_at)
VALUES
(1, 1, 'Sản phẩm này dùng khá ổn, chất lượng tốt.', NULL, 'APPROVED', CURRENT_TIMESTAMP),  -- id = 1
(2, 1, 'Mình thấy giá hơi cao so với mặt bằng chung.', NULL, 'APPROVED', CURRENT_TIMESTAMP),
(3, 1, 'Đóng gói cẩn thận, giao hàng nhanh.', NULL, 'APPROVED', CURRENT_TIMESTAMP),

-- ✅ Thêm mới bình luận cha cho product_id = 1
(4, 1, 'Thiết kế đẹp, cầm rất chắc tay.', NULL, 'APPROVED', CURRENT_TIMESTAMP),             -- id = 4
(5, 1, 'Mình thấy màn hình hơi ám vàng nhẹ.', NULL, 'APPROVED', CURRENT_TIMESTAMP),         -- id = 5
(6, 1, 'Hiệu năng ổn định, chơi game mượt.', NULL, 'APPROVED', CURRENT_TIMESTAMP);          -- id = 6


-- ====================================
-- 💬 BÌNH LUẬN CON (REPLY CẤP 2)
-- ====================================

-- Trả lời bình luận id = 1
INSERT INTO comment (user_id, product_id, content, parent_comment_id, status, created_at)
VALUES
(4, 1, 'Bạn dùng lâu chưa, pin có ổn không?', 1, 'APPROVED', CURRENT_TIMESTAMP),
(5, 1, 'Mình cũng thấy chất lượng ổn thật.', 1, 'APPROVED', CURRENT_TIMESTAMP),
(6, 1, 'Theo mình thì camera hơi kém, còn lại ổn.', 1, 'APPROVED', CURRENT_TIMESTAMP),
(7, 1, 'Đúng rồi, pin ổn mà sạc cũng nhanh nữa.', 1, 'APPROVED', CURRENT_TIMESTAMP),
(8, 1, 'Bạn mua ở đâu thế, giá tốt không?', 1, 'APPROVED', CURRENT_TIMESTAMP);

-- Trả lời bình luận id = 4 (cha)
INSERT INTO comment (user_id, product_id, content, parent_comment_id, status, created_at)
VALUES
(1, 1, 'Chuẩn, thiết kế sang mà lại nhẹ tay.', 4, 'APPROVED', CURRENT_TIMESTAMP),
(2, 1, 'Mình thích nhất phần viền mỏng, nhìn cao cấp.', 4, 'APPROVED', CURRENT_TIMESTAMP),
(3, 1, 'Cầm chắc thật nhưng hơi trơn tay.', 4, 'PENDING', CURRENT_TIMESTAMP);

-- Trả lời bình luận id = 5 (cha)
INSERT INTO comment (user_id, product_id, content, parent_comment_id, status, created_at)
VALUES
(4, 1, 'Mình cũng bị ám vàng nhẹ, nhưng không đáng kể.', 5, 'APPROVED', CURRENT_TIMESTAMP),
(5, 1, 'Bạn thử chỉnh lại True Tone xem, đỡ hơn nhiều.', 5, 'APPROVED', CURRENT_TIMESTAMP);

-- Trả lời bình luận id = 6 (cha)
INSERT INTO comment (user_id, product_id, content, parent_comment_id, status, created_at)
VALUES
(6, 1, 'Chuẩn, chơi Liên Quân mượt lắm.', 6, 'APPROVED', CURRENT_TIMESTAMP),
(7, 1, 'Có hơi nóng nhẹ khi chơi lâu, nhưng chấp nhận được.', 6, 'APPROVED', CURRENT_TIMESTAMP),
(8, 1, 'Mình test game nặng vẫn ổn, FPS ổn định.', 6, 'APPROVED', CURRENT_TIMESTAMP);



INSERT INTO attribute (name, created_at) VALUES ('RAM', CURRENT_TIMESTAMP);
INSERT INTO attribute (name, created_at) VALUES ('ROM', CURRENT_TIMESTAMP);
INSERT INTO attribute (name, created_at) VALUES ('Màn hình', CURRENT_TIMESTAMP);
INSERT INTO attribute (name, created_at) VALUES ('Pin', CURRENT_TIMESTAMP);
INSERT INTO attribute (name, created_at) VALUES ('CPU', CURRENT_TIMESTAMP);
INSERT INTO attribute (name, created_at) VALUES ('GPU', CURRENT_TIMESTAMP);


INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('6GB', 6, 1, CURRENT_TIMESTAMP); -- RAM

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('128GB', 128, 2, CURRENT_TIMESTAMP); -- ROM

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('256GB', 256, 2, CURRENT_TIMESTAMP);

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('8GB', 8, 1, CURRENT_TIMESTAMP);

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('12GB', 12, 1, CURRENT_TIMESTAMP);

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('128GB', 128, 2, CURRENT_TIMESTAMP);

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('16GB', 16, 1, CURRENT_TIMESTAMP);

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('512GB', 512, 2, CURRENT_TIMESTAMP);

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('32GB', 32, 1, CURRENT_TIMESTAMP);

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('1024GB', 1024, 2, CURRENT_TIMESTAMP); -- ROM 1TB đổi thành 1024GB

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('5000 mAh', 5000, 4, CURRENT_TIMESTAMP);
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('6.7 inch AMOLED', NULL, 3, CURRENT_TIMESTAMP); -- Màn hình

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('6.5 inch 4K OLED', NULL, 3, CURRENT_TIMESTAMP); -- Màn hình

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('Intel Core i7-1255U', NULL, 5, CURRENT_TIMESTAMP); -- CPU

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('Intel Iris Xe', NULL, 6, CURRENT_TIMESTAMP); -- GPU

--INSERT INTO product_variant_attribute (id, product_id, attribute_id, created_at) VALUES
--(1, 1, 1, '2025-10-27 17:18:25.586400'), -- RAM
--(2, 1, 2, '2025-10-27 17:18:25.586401'); -- ROM
----(3, 1, 3, '2025-10-27 17:18:25.586402'), -- Màn hình
----(4, 1, 4, '2025-10-27 17:18:25.586403'), -- Pin
----(5, 1, 5, '2025-10-27 17:18:25.586404'), -- CPU
----(6, 1, 6, '2025-10-27 17:18:25.586405'); -- GPU
--
--INSERT INTO product_attribute_value_option (id, attribute_value_id, product_variant_attribute_id, created_at) VALUES
--(1, 1, 1, '2025-10-27 17:18:25.577406'),  -- RAM 6GB
--(2, 2, 2, '2025-10-27 17:18:25.578406'),  -- ROM 128GB
--(3, 3, 2, '2025-10-27 17:18:25.578910'),  -- ROM 256GB
--(4, 4, 1, '2025-10-27 17:18:25.578911'), -- RAM 8GB
--(5, 8, 2, '2025-10-27 17:18:25.578911');
----(5, 5, 1, '2025-10-27 17:18:25.579010'),  -- RAM 12GB
----(6, 6, 2, '2025-10-27 17:18:25.579110'),  -- ROM 128GB (Pixel)
----(7, 7, 1, '2025-10-27 17:18:25.579210'),  -- RAM 16GB
----(8, 8, 2, '2025-10-27 17:18:25.579310'),  -- ROM 512GB
----(9, 9, 1, '2025-10-27 17:18:25.579410'),  -- RAM 32GB
----(10, 10, 2, '2025-10-27 17:18:25.579510'), -- ROM 1TB (1024GB)
----(11, 11, 4, '2025-10-27 17:18:25.579610'), -- Pin 5000mAh
----(12, 12, 3, '2025-10-27 17:18:25.579710'), -- Màn hình 6.7 inch AMOLED
----(13, 13, 3, '2025-10-27 17:18:25.579810'), -- Màn hình 6.5 inch 4K OLED
----(14, 14, 5, '2025-10-27 17:18:25.579910'), -- CPU Intel Core i7-1255U
----(15, 15, 6, '2025-10-27 17:18:25.580010'); -- GPU Intel Iris Xe
--
--
-- ✅ iPhone 15 Pro Max - 128GB - Black (variant_id = 1)
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (1, 1);  -- RAM 6GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (1, 2);  -- ROM 128GB

-- ✅ iPhone 15 Pro Max - 256GB - Black (variant_id = 2)
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (2, 1);  -- RAM 6GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (2, 3);  -- ROM 256GB

-- ✅ iPhone 15 Pro Max - 512GB - Black (variant_id = 3)
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (3, 4);  -- RAM 8GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (3, 8);  -- ROM 512GB

-- ✅ Samsung Galaxy S24 Ultra - 512GB - Gray
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (4, 4);  -- RAM 8GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (4, 8);  -- ROM 512GB

-- ✅ Google Pixel 8 Pro - 128GB - Obsidian Black
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (5, 5);  -- RAM 12GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (5, 6);  -- ROM 128GB

-- ✅ MacBook Pro 14" - 16GB / 512GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (6, 7);  -- RAM 16GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (6, 8);  -- ROM 512GB

-- ✅ MacBook Pro 14" - 32GB / 1TB (1024GB)
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (7, 9);  -- RAM 32GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (7, 10); -- ROM 1024GB

-- ✅ Dell XPS 13 - i7, 16GB / 512GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (8, 7);  -- RAM 16GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (8, 8);  -- ROM 512GB

-- ✅ Dell XPS 13 - i5, 8GB / 256GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (9, 4);  -- RAM 8GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (9, 3);  -- ROM 256GB

-- ✅ OnePlus 12 - 256GB - Flowy Emerald
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (10, 5); -- RAM 12GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (10, 3); -- ROM 256GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (10, 11); -- Pin 5000 mAh
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (10, 12); -- Màn hình 6.7 inch AMOLED

-- ✅ OnePlus 12 - 512GB - Flowy Emerald
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (11, 7);  -- RAM 16GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (11, 8);  -- ROM 512GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (11, 11); -- Pin 5000 mAh
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (11, 12); -- Màn hình 6.7 inch AMOLED

-- ✅ Sony Xperia 1 VI - 256GB - Black
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (12, 5);  -- RAM 12GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (12, 3);  -- ROM 256GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (12, 13); -- Màn hình 6.5 inch 4K OLED
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (12, 11); -- Pin 5000 mAh

-- ✅ Surface Laptop 5
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (13, 7);  -- RAM 16GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (13, 8);  -- ROM 512GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (13, 14); -- CPU Intel Core i7-1255U
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (13, 15); -- GPU Intel Iris Xe



INSERT INTO product_category (product_id, category_option_value_id) VALUES (1, 1);
INSERT INTO product_category (product_id, category_option_value_id) VALUES (1, 5);

INSERT INTO product_category (product_id, category_option_value_id) VALUES (2, 2);
INSERT INTO product_category (product_id, category_option_value_id) VALUES (2, 4);

INSERT INTO promotion_banner (name, image, target_url, banner_type, status) VALUES
('IPHONE 17 SERIES', '690x300_iPhone_17_Pro_Opensale_v3.jpg', 'https://shop.example.com/sale/back-to-school', 'SLIDER', 'ACTIVE'),
('GALAXY Z7 SERIES', 'Z7-Sliding-1025.jpg', 'https://shop.example.com/sale/summer', 'SLIDER', 'ACTIVE'),
('OPPO FIND X9 SERIES', 'DKNT_Sliding.2.jpg', 'https://shop.example.com/new', 'SLIDER', 'ACTIVE'),
('Flash Deal - 50% OFF', 'https://cdn.example.com/banners/flash-deal.jpg', 'https://shop.example.com/deals/flash', 'RIGHT', 'INACTIVE'),
('REDMI 15C', 'Sliding_Redmi_15C.jpg', 'https://shop.example.com/sale/christmas', 'SINGLE', 'ACTIVE');



-- Product Filters
-- ====== CATEGORY 1: Điện thoại (DT) ======
INSERT INTO product_filter (name, attribute_id, category_id, created_at) VALUES
('Dung lượng RAM', 1, 1, CURRENT_TIMESTAMP),
('Bộ nhớ trong (ROM)', 2, 1, CURRENT_TIMESTAMP),
('Kích thước màn hình', 3, 1, CURRENT_TIMESTAMP),
('Dung lượng pin', 4, 1, CURRENT_TIMESTAMP),
('Chip xử lý (CPU)', 5, 1, CURRENT_TIMESTAMP),
('Chip đồ họa (GPU)', 6, 1, CURRENT_TIMESTAMP);

-- ====== CATEGORY 2: Tablet (TB) ======
INSERT INTO product_filter (name, attribute_id, category_id, created_at) VALUES
('Dung lượng RAM', 1, 2, CURRENT_TIMESTAMP),
('Bộ nhớ trong (ROM)', 2, 2, CURRENT_TIMESTAMP),
('Kích thước màn hình', 3, 2, CURRENT_TIMESTAMP),
('Dung lượng pin', 4, 2, CURRENT_TIMESTAMP),
('Vi xử lý (CPU)', 5, 2, CURRENT_TIMESTAMP);

-- ====== CATEGORY 3: Laptop (LT) ======
INSERT INTO product_filter (name, attribute_id, category_id, created_at) VALUES
('Dung lượng RAM', 1, 3, CURRENT_TIMESTAMP),
('Bộ nhớ trong (ROM)', 2, 3, CURRENT_TIMESTAMP),
('Kích thước màn hình', 3, 3, CURRENT_TIMESTAMP),
('Dung lượng pin', 4, 3, CURRENT_TIMESTAMP),
('CPU', 5, 3, CURRENT_TIMESTAMP),
('GPU', 6, 3, CURRENT_TIMESTAMP);

-- ====== CATEGORY 4: Phụ kiện (PK) ======
INSERT INTO product_filter (name, attribute_id, category_id, created_at) VALUES
('Tương thích thiết bị (RAM)', 1, 4, CURRENT_TIMESTAMP),
('Dung lượng pin dự phòng', 4, 4, CURRENT_TIMESTAMP);

-- ====== CATEGORY 5: Màn hình (MH) ======
INSERT INTO product_filter (name, attribute_id, category_id, created_at) VALUES
('Kích thước màn hình', 3, 5, CURRENT_TIMESTAMP),
('Loại tấm nền (GPU)', 6, 5, CURRENT_TIMESTAMP);

-- ====== CATEGORY 6: Máy tính để bàn (PC) ======
INSERT INTO product_filter (name, attribute_id, category_id, created_at) VALUES
('RAM', 1, 6, CURRENT_TIMESTAMP),
('ROM / Ổ cứng', 2, 6, CURRENT_TIMESTAMP),
('CPU', 5, 6, CURRENT_TIMESTAMP),
('GPU', 6, 6, CURRENT_TIMESTAMP);

-- ====== CATEGORY 7: Đồng hồ thông minh (DC) ======
INSERT INTO product_filter (name, attribute_id, category_id, created_at) VALUES
('Dung lượng RAM', 1, 7, CURRENT_TIMESTAMP),
('Dung lượng pin', 4, 7, CURRENT_TIMESTAMP),
('Kích thước màn hình', 3, 7, CURRENT_TIMESTAMP);

-- ====== CATEGORY 8: Tai nghe (TA) ======
INSERT INTO product_filter (name, attribute_id, category_id, created_at) VALUES
('Dung lượng pin', 4, 8, CURRENT_TIMESTAMP);

-- ====== CATEGORY 9: Thiết bị mạng & sạc (CH) ======
INSERT INTO product_filter (name, attribute_id, category_id, created_at) VALUES
('Công suất sạc (Pin)', 4, 9, CURRENT_TIMESTAMP);

-- ====== CATEGORY 10: Thiết bị chơi game (GM) ======
INSERT INTO product_filter (name, attribute_id, category_id, created_at) VALUES
('RAM', 1, 10, CURRENT_TIMESTAMP),
('GPU', 6, 10, CURRENT_TIMESTAMP);

-- ====== CATEGORY 11: Phần mềm & ứng dụng (SW) ======
INSERT INTO product_filter (name, attribute_id, category_id, created_at) VALUES
('Yêu cầu RAM tối thiểu', 1, 11, CURRENT_TIMESTAMP),
('Yêu cầu CPU', 5, 11, CURRENT_TIMESTAMP);



---- Filter Options cho category = 'Điện thoại' (id = 1)
--INSERT INTO filter_option (name, filter_condition, product_filter_id, category_id, created_at)
--VALUES ('4 GB', 'bang-4', 1, 1, CURRENT_TIMESTAMP);
--
--INSERT INTO filter_option (name, filter_condition, product_filter_id, category_id, created_at)
--VALUES ('8 GB', 'bang-8', 1, 1, CURRENT_TIMESTAMP);
--
--INSERT INTO filter_option (name, filter_condition, product_filter_id, category_id, created_at)
--VALUES ('64 GB', 'bang-64', 2, 1, CURRENT_TIMESTAMP);
--
--INSERT INTO filter_option (name, filter_condition, product_filter_id, category_id, created_at)
--VALUES ('128 GB', 'bang-128', 2, 1, CURRENT_TIMESTAMP);
--
--INSERT INTO filter_option (name, filter_condition, product_filter_id, category_id, created_at)
--VALUES ('Samsung', 'chua-Samsung', 3, 1, CURRENT_TIMESTAMP);
--
--INSERT INTO filter_option (name, filter_condition, product_filter_id, category_id, created_at)
--VALUES ('Apple', 'chua-Apple', 3, 1, CURRENT_TIMESTAMP);
--
--INSERT INTO filter_option (name, filter_condition, product_filter_id, category_id, created_at)
--VALUES ('Dưới 5 triệu', 'duoi-5000000', 4, 1, CURRENT_TIMESTAMP);
--
--INSERT INTO filter_option (name, filter_condition, product_filter_id, category_id, created_at)
--VALUES ('5 - 10 triệu', '5000000-10000000', 4, 1, CURRENT_TIMESTAMP);
--
---- Filter Options cho category = 'Laptop' (id = 3)
--INSERT INTO filter_option (name, filter_condition, product_filter_id, category_id, created_at)
--VALUES ('8 GB', 'bang-8', 1, 3, CURRENT_TIMESTAMP);
--
--INSERT INTO filter_option (name, filter_condition, product_filter_id, category_id, created_at)
--VALUES ('16 GB', 'bang-16', 1, 3, CURRENT_TIMESTAMP);
--
--INSERT INTO filter_option (name, filter_condition, product_filter_id, category_id, created_at)
--VALUES ('256 GB SSD', 'bang-256', 2, 3, CURRENT_TIMESTAMP);
--
--INSERT INTO filter_option (name, filter_condition, product_filter_id, category_id, created_at)
--VALUES ('512 GB SSD', 'bang-512', 2, 3, CURRENT_TIMESTAMP);
--
--INSERT INTO filter_option (name, filter_condition, product_filter_id, category_id, created_at)
--VALUES ('Dell', 'chua-Dell', 3, 3, CURRENT_TIMESTAMP);
--
--INSERT INTO filter_option (name, filter_condition, product_filter_id, category_id, created_at)
--VALUES ('Asus', 'chua-Asus', 3, 3, CURRENT_TIMESTAMP);

--📱 Category: Điện thoại (category_id = 1, product_filter_id = 1–6)
-- RAM
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('4 GB', 'bang-4', 1, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('6 GB', 'bang-6', 1, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('8 GB', 'bang-8', 1, CURRENT_TIMESTAMP);

-- ROM
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('64 GB', 'bang-64', 2, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('128 GB', 'bang-128', 2, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('256 GB', 'bang-256', 2, CURRENT_TIMESTAMP);

-- Màn hình
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('6.1 inch', 'bang-6.1', 3, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('6.7 inch', 'bang-6.7', 3, CURRENT_TIMESTAMP);

-- Pin
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('< 4000 mAh', 'duoi-4000', 4, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('4000 - 5000 mAh', '4000-5000', 4, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('> 5000 mAh', 'tren-5000', 4, CURRENT_TIMESTAMP);

-- CPU
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('Snapdragon 8 Gen 2', 'chua-Snapdragon8Gen2', 5, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('Apple A17 Pro', 'chua-A17Pro', 5, CURRENT_TIMESTAMP);

-- GPU
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('Adreno 740', 'chua-Adreno740', 6, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('Apple GPU (6-core)', 'chua-AppleGPU6core', 6, CURRENT_TIMESTAMP);

--💊 Category: Tablet (category_id = 2)

-- RAM (product_filter_id = 7)
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('4 GB', 'bang-4', 7, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('6 GB', 'bang-6', 7, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('8 GB', 'bang-8', 7, CURRENT_TIMESTAMP);

-- ROM (product_filter_id = 8)
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('64 GB', 'bang-64', 8, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('128 GB', 'bang-128', 8, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('256 GB', 'bang-256', 8, CURRENT_TIMESTAMP);

-- Màn hình (product_filter_id = 9)
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('10.1 inch', 'bang-10.1', 9, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('11 inch', 'bang-11', 9, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('12.9 inch', 'bang-12.9', 9, CURRENT_TIMESTAMP);

-- Pin (product_filter_id = 10)
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('< 7000 mAh', 'duoi-7000', 10, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('7000 - 9000 mAh', '7000-9000', 10, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('> 9000 mAh', 'tren-9000', 10, CURRENT_TIMESTAMP);

-- CPU (product_filter_id = 11)
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('Apple M2', 'chua-M2', 11, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('Snapdragon 8 Gen 2', 'chua-Snapdragon8Gen2', 11, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('MediaTek Dimensity 9000', 'chua-Dimensity9000', 11, CURRENT_TIMESTAMP);


--💻 Category: Laptop (category_id = 3, product_filter_id = 12–17)
-- RAM
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('8 GB', 'bang-8', 12, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('16 GB', 'bang-16', 12, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('32 GB', 'bang-32', 12, CURRENT_TIMESTAMP);

-- ROM
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('256 GB SSD', 'bang-256', 13, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('512 GB SSD', 'bang-512', 13, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('1 TB SSD', 'bang-1024', 13, CURRENT_TIMESTAMP);

-- Màn hình
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('13 inch', 'bang-13', 14, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('15.6 inch', 'bang-15.6', 14, CURRENT_TIMESTAMP);

-- Pin
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('< 50 Wh', 'duoi-50', 15, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('50 - 70 Wh', '50-70', 15, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('> 70 Wh', 'tren-70', 15, CURRENT_TIMESTAMP);

-- CPU
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('Intel Core i5', 'chua-i5', 16, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('Intel Core i7', 'chua-i7', 16, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('Apple M3', 'chua-M3', 16, CURRENT_TIMESTAMP);

-- GPU
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('Intel Iris Xe', 'chua-IrisXe', 17, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('NVIDIA RTX 4060', 'chua-RTX4060', 17, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('Apple M3 GPU', 'chua-AppleM3GPU', 17, CURRENT_TIMESTAMP);


--🖥️ Category: PC (category_id = 6, product_filter_id = 28–31)
 -- RAM
 INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
 VALUES ('16 GB', 'bang-16', 28, CURRENT_TIMESTAMP);
 INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
 VALUES ('32 GB', 'bang-32', 28, CURRENT_TIMESTAMP);

 -- ROM
 INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
 VALUES ('512 GB SSD', 'bang-512', 29, CURRENT_TIMESTAMP);
 INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
 VALUES ('1 TB SSD', 'bang-1024', 29, CURRENT_TIMESTAMP);

 -- CPU
 INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
 VALUES ('Intel Core i7', 'chua-i7', 30, CURRENT_TIMESTAMP);
 INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
 VALUES ('AMD Ryzen 7', 'chua-Ryzen7', 30, CURRENT_TIMESTAMP);

 -- GPU
 INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
 VALUES ('NVIDIA RTX 4070', 'chua-RTX4070', 31, CURRENT_TIMESTAMP);
 INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
 VALUES ('AMD RX 7900', 'chua-RX7900', 31, CURRENT_TIMESTAMP);

--⌚ Category: Đồng hồ thông minh (category_id = 7, product_filter_id = 32–34)
-- RAM
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('512 MB', 'bang-0.5', 32, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('1 GB', 'bang-1', 32, CURRENT_TIMESTAMP);

-- Pin
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('< 300 mAh', 'duoi-300', 33, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('300 - 500 mAh', '300-500', 33, CURRENT_TIMESTAMP);

-- Màn hình
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('1.3 inch', 'bang-1.3', 34, CURRENT_TIMESTAMP);
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('1.6 inch', 'bang-1.6', 34, CURRENT_TIMESTAMP);







