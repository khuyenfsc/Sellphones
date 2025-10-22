-- CATEGORY
INSERT INTO category (code, name, icon, created_at) VALUES ('DT', 'Điện thoại', 'DT.png',CURRENT_TIMESTAMP);
INSERT INTO category (code, name, icon, created_at) VALUES ('TB', 'Tablet', 'TB.png', CURRENT_TIMESTAMP);
INSERT INTO category (code, name, icon, created_at) VALUES ('LT', 'Laptop', 'LT.png', CURRENT_TIMESTAMP);

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
--ALTER TABLE customer_info
--  ADD CONSTRAINT fk_user_review
--  FOREIGN KEY (user_id) REFERENCES user(id)
--  ON DELETE SET NULL;



INSERT INTO brand(name, brand_icon) VALUES ('Apple', 'apple.png');
INSERT INTO brand(name, brand_icon) VALUES ('Samsung', 'samsung.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'Google', 'google.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'OnePlus', 'oneplus.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'Xiaomi', 'xiaomi.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'Oppo', 'oppo.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'Vivo', 'vivo.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'Sony', 'sony.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'Asus', 'asus.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'Realme', 'realme.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'Huawei', 'huawei.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'Nothing', 'nothing.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'Dell', 'dell.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'HP', 'hp.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'Lenovo', 'lenovo.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'MSI', 'msi.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'Acer', 'acer.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'Razer', 'razer.png');
INSERT INTO brand(name, brand_icon) VALUES ( 'Microsoft', 'microsoft.png');

-- Điện thoại (category_id = 1)
INSERT INTO brand_category (brand_id, category_id) VALUES
(1, 1),  -- Apple
(2, 1),  -- Samsung
(3, 1),  -- Google
(4, 1),  -- OnePlus
(5, 1),  -- Xiaomi
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

INSERT INTO app_user (full_name, avatar, email, password, date_of_birth, phone_number, gender, role_id, created_at)
VALUES
('Nguyen Van A', NULL, 'a@example.com', '{noop}123456', NULL, NULL, 'MALE', 1, CURRENT_TIMESTAMP), -- Super Admin
('Tran Thi B', NULL, 'b@example.com', '{noop}123456', NULL, NULL, 'FEMALE', 2, CURRENT_TIMESTAMP), -- Sales Manager
('Le Van C', NULL, 'c@example.com', '{noop}123456', NULL, NULL, 'MALE', 3, CURRENT_TIMESTAMP), -- Order Admin
('Pham Thi D', NULL, 'd@example.com', '{noop}123456', NULL, NULL, 'FEMALE', 4, CURRENT_TIMESTAMP), -- Shipment Admin
('Hoang Van E', NULL, 'e@example.com', '{noop}123456', NULL, NULL, 'MALE', 5, CURRENT_TIMESTAMP), -- Customer
('Vu Thi F', NULL, 'f@example.com', '{noop}123456', NULL, NULL, 'FEMALE', 5, CURRENT_TIMESTAMP), -- Customer
('Do Van G', NULL, 'g@example.com', '{noop}123456', NULL, NULL, 'MALE', 2, CURRENT_TIMESTAMP), -- Sales Manager
('Nguyen Thi H', NULL, 'h@example.com', '{noop}123456', NULL, NULL, 'FEMALE', 3, CURRENT_TIMESTAMP); -- Order Admin

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
('Create', 'ỊNVENTORY.SUPPLIERS.CREATE', CURRENT_TIMESTAMP),
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
('View',   'MARKETING.PROMOTIONS.PRODUCT_PROMOTIONS.VIEW',   CURRENT_TIMESTAMP),
('Create', 'MARKETING.PROMOTIONS.PRODUCT_PROMOTIONS.CREATE', CURRENT_TIMESTAMP),
('Edit',   'MARKETING.PROMOTIONS.PRODUCT_PROMOTIONS.EDIT',  CURRENT_TIMESTAMP),
('Delete', 'MARKETING.PROMOTIONS.PRODUCT_PROMOTIONS.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View',   'MARKETING.PROMOTIONS.GIFT_PRODUCTS.VIEW',   CURRENT_TIMESTAMP),
('Create', 'MARKETING.PROMOTIONS.GIFT_PRODUCTS.CREATE', CURRENT_TIMESTAMP),
('Edit',   'MARKETING.PROMOTIONS.GIFT_PRODUCTS.EDIT',  CURRENT_TIMESTAMP),
('Delete', 'MARKETING.PROMOTIONS.GIFT_PRODUCTS.DELETE', CURRENT_TIMESTAMP);

INSERT INTO permission (name, code,  created_at)
VALUES
('View',   'MARKETING.PROMOTIONS.BANNERS.VIEW',   CURRENT_TIMESTAMP),
('Create', 'MARKETING.PROMOTIONS.BANNERS.CREATE', CURRENT_TIMESTAMP),
('Edit',   'MARKETING.PROMOTIONS.BANNERS.EDIT',  CURRENT_TIMESTAMP),
('Delete', 'MARKETING.PROMOTIONS.BANNERS.DELETE', CURRENT_TIMESTAMP);

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
SELECT 1, id FROM permission WHERE code like 'SALES%';
INSERT INTO role_permission (role_id, permission_id)
SELECT 1, id FROM permission WHERE code like 'CATALOG%';
INSERT INTO role_permission (role_id, permission_id)
SELECT 1, id FROM permission WHERE code like 'CUSTOMER%';
INSERT INTO role_permission (role_id, permission_id)
SELECT 1, id FROM permission WHERE code like 'MARKETING%';
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
('Do Thi F', '0906000006', 6, NULL, '1997-09-10', 6), -- user_id = Vu Thi F (FEMALE, Customer)
('Phan Van G', '0907000007', 7, '012345678907', '1999-12-30', 7), -- user_id = Do Van G (Sales Manager)
('Vu Thi H', '0908000008', 8, '012345678908', '1991-06-14', 8); -- user_id = Nguyen Thi H (Order Admin)




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

-- ======================
-- BẢNG PRODUCT
-- ======================
INSERT INTO product (name, thumbnail, description, brand_id, category_id, is_featured, is_new)
VALUES ('iPhone 15', 'https://example.com/iphone15.jpg', 'Latest iPhone model', 1, 1, true, true);

INSERT INTO product (name, thumbnail, description, brand_id, category_id, is_featured, is_new)
VALUES ('Samsung Galaxy S24', 'https://example.com/galaxyS24.jpg', 'Latest Samsung Galaxy', 2, 1, true, true);

INSERT INTO product (name, thumbnail, description, brand_id, category_id, is_featured, is_new)
VALUES ('Google Pixel 8 Pro', 'https://example.com/pixel8pro.jpg', 'Flagship mới nhất của Google', 3, 1, true, true);

INSERT INTO product (name, thumbnail, description, brand_id, category_id, is_featured, is_new)
VALUES ('OnePlus 12', 'https://example.com/oneplus12.jpg', 'Điện thoại hiệu năng cao của OnePlus', 4, 1, false, true);

INSERT INTO product (name, thumbnail, description, brand_id, category_id, is_featured, is_new)
VALUES ('Xiaomi 14 Ultra', 'https://example.com/xiaomi14ultra.jpg', 'Camera đỉnh cao, cấu hình mạnh mẽ', 5, 1, true, true);

INSERT INTO product (name, thumbnail, description, brand_id, category_id, is_featured, is_new)
VALUES ('MacBook Pro 14"', 'https://example.com/macbookpro14.jpg', 'Apple MacBook Pro 14-inch with M2 Pro chip', 1, 2, true, true);

INSERT INTO product (name, thumbnail, description, brand_id, category_id, is_featured, is_new)
VALUES ('Dell XPS 13', 'https://example.com/dellxps13.jpg', 'Dell XPS 13 ultrabook with InfinityEdge display', 13, 2, true, true);

-- ======================
-- BẢNG PRODUCT_IMAGE (ảnh phụ cho từng sản phẩm)
-- ======================
INSERT INTO product_image (product_id, image) VALUES
(1, 'https://example.com/images/iphone15-1.jpg'),
(1, 'https://example.com/images/iphone15-2.jpg'),
(2, 'https://example.com/images/galaxyS24-1.jpg'),
(2, 'https://example.com/images/galaxyS24-2.jpg'),
(3, 'https://example.com/images/pixel8pro-1.jpg'),
(4, 'https://example.com/images/oneplus12-1.jpg'),
(6, 'https://example.com/images/macbookpro14-1.jpg'),
(7, 'https://example.com/images/dellxps13-1.jpg');

-- ======================
-- BẢNG PRODUCT_VARIANT
-- ======================
-- iPhone 15
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES ('iPhone 15 - 128GB - Black', 24990000, 23990000, 'IP15-128-BLK', 'https://example.com/images/ip15-128-blk.jpg', 1, 50, 'ACTIVE');

INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES ('iPhone 15 - 256GB - White', 27990000, 26590000, 'IP15-256-WHT', 'https://example.com/images/ip15-256-wht.jpg', 1, 30, 'ACTIVE');

-- Samsung Galaxy S24
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES ('Galaxy S24 - 128GB - Phantom Black', 21990000, 20990000, 'SGS24-128-BLK', 'https://example.com/images/sgs24-128-blk.jpg', 2, 40, 'ACTIVE');

INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES ('Galaxy S24 - 256GB - Cream', 24990000, 23690000, 'SGS24-256-CRM', 'https://example.com/images/sgs24-256-crm.jpg', 2, 25, 'ACTIVE');

-- Google Pixel 8 Pro
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES ('Pixel 8 Pro - 128GB - Obsidian', 20990000, 19990000, 'PIX8P-128-OBS', 'https://example.com/images/pix8p-128-obs.jpg', 3, 35, 'ACTIVE');

-- OnePlus 12
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES ('OnePlus 12 - 12GB RAM - 256GB', 18990000, 17990000, 'OP12-12-256', 'https://example.com/images/op12-12-256.jpg', 4, 40, 'ACTIVE');

INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES ('OnePlus 12 - 16GB RAM - 512GB', 22990000, 21990000, 'OP12-16-512', 'https://example.com/images/op12-16-512.jpg', 4, 20, 'ACTIVE');

-- MacBook Pro 14
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES ('MacBook Pro 14" - M2 Pro - 16GB RAM - 512GB SSD', 49990000, 47990000, 'MBP14-M2P-16-512', 'https://example.com/images/mbp14-m2p-16-512.jpg', 6, 20, 'ACTIVE');

INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES ('MacBook Pro 14" - M2 Pro - 32GB RAM - 1TB SSD', 59990000, 56990000, 'MBP14-M2P-32-1TB', 'https://example.com/images/mbp14-m2p-32-1tb.jpg', 6, 10, 'ACTIVE');

-- Dell XPS 13
INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES ('Dell XPS 13 - Core i7 - 16GB RAM - 512GB SSD', 37990000, 35990000, 'DXPS13-I7-16-512', 'https://example.com/images/dxps13-i7-16-512.jpg', 7, 15, 'ACTIVE');

INSERT INTO product_variant (product_variant_name, root_price, current_price, sku, variant_image, product_id, stock, status)
VALUES ('Dell XPS 13 - Core i5 - 8GB RAM - 256GB SSD', 28990000, 27490000, 'DXPS13-I5-8-256', 'https://example.com/images/dxps13-i5-8-256.jpg', 7, 25, 'ACTIVE');

-- ======================
-- CẬP NHẬT thumbnail_product_id CHO PRODUCT (liên kết tới variant chính)
-- ======================
UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'IP15-128-BLK'
) WHERE id = 1;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'SGS24-128-BLK'
) WHERE id = 2;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'PIX8P-128-OBS'
) WHERE id = 3;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'OP12-12-256'
) WHERE id = 4;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'MBP14-M2P-16-512'
) WHERE id = 6;

UPDATE product SET thumbnail_product_id = (
    SELECT id FROM product_variant WHERE sku = 'DXPS13-I7-16-512'
) WHERE id = 7;

-- iPhone 15 128GB có 2 khuyến mãi
INSERT INTO product_promotion (name, description, promotion_type, config, promotion_condition, start_date, end_date)
VALUES
('Giảm 1 triệu iPhone 15 128GB', 'Giảm trực tiếp 1,000,000đ', 'DISCOUNT_AMOUNT',
 '{"amount":1000000}', '{"paymentMethods":["CASH","VNPAY"]}', '2025-09-01', '2025-09-30'),
('Voucher iPhone128-5%', 'Nhập mã IP128 giảm thêm 5%', 'DISCOUNT_PERCENT',
 '{"percent":5}', '{"paymentMethods":["CASH","VNPAY"]}', '2025-09-05', '2025-09-25');


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
        'https://example.com/iphone15-case.jpg', 0);

-- Quà tặng 2: Tai nghe Bluetooth mini
INSERT INTO gift_product (name, stock, description, thumbnail, price)
VALUES ('Tai nghe Bluetooth mini', 50, 'Tai nghe không dây, pin 12h, dễ mang theo',
        'https://example.com/bluetooth-earbuds.jpg', 0);

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

INSERT INTO customer_order (code, user_id, ordered_at, total_price, order_status, payment_method_id, payment_status, customer_info_id)
VALUES
('SPS1', 1, '2025-09-01 10:00:00', 1500000, 'PENDING',   1, 'PENDING',   1),
('SPS2', 1, '2025-09-02 11:30:00', 3200000, 'CONFIRMED',  2, 'COMPLETED', 2),
('SPS3', 1, '2025-09-03 14:15:00', 450000,  'SHIPPING',  1, 'COMPLETED', 3),
('SPS4', 1, '2025-09-04 09:45:00', 7800000, 'DELIVERED', 2, 'COMPLETED', 4),
('SPS5', 1, '2025-09-05 16:00:00', 2300000, 'CANCELED',  1, 'FAILED',    5),
('SPS6', 1, '2025-09-06 19:20:00', 990000,  'PENDING',   2, 'PENDING',   6),
('SPS7', 1, '2025-09-07 12:40:00', 11000000,'SHIPPING',  1, 'COMPLETED', 7),
('SPS8', 1, '2025-09-08 08:30:00', 560000,  'DELIVERED', 2, 'REFUNDED',  8);

INSERT INTO order_variant (order_id, product_variant_id, quantity, added_at, total_price, warranty_id)
VALUES
(1, 1, 2, '2025-09-01 10:05:00', 1000000, 1),
(1, 2, 1, '2025-09-01 10:07:00', 500000, 2),
(2, 3, 3, '2025-09-02 11:35:00', 1200000, 3),
(3, 4, 5, '2025-09-03 14:20:00', 450000, 1),
(4, 5, 2, '2025-09-04 09:50:00', 7800000, 4),
(5, 6, 1, '2025-09-05 16:10:00', 2300000, 5),
(6, 7, 2, '2025-09-06 19:25:00', 990000, 2),
(7, 8, 10, '2025-09-07 12:50:00', 11000000, 3),
(8, 9, 1, '2025-09-08 08:35:00', 560000, 4);

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


-- Reviews for variant 5
INSERT INTO review (user_id, content, rating_score, status, product_variant_id, created_at)
VALUES
(1, 'Sản phẩm mới, đóng gói cẩn thận.', 5, 'APPROVED', 5, CURRENT_TIMESTAMP),
(4, 'Dung lượng pin chưa như kỳ vọng.', 3, 'PENDING', 5, CURRENT_TIMESTAMP),
(5, 'Hỗ trợ 5G, tốc độ mạng nhanh.', 4, 'APPROVED', 5, CURRENT_TIMESTAMP),
(6, 'Thiết kế đẹp, nhẹ.', 5, 'APPROVED', 5, CURRENT_TIMESTAMP);


INSERT INTO review_image (review_id, image_name)
VALUES
(1, 'https://example.com/review1-img1.jpg'),
(1, 'https://example.com/review1-img2.jpg'),
(2, 'https://example.com/review2-img1.jpg'),
(3, 'https://example.com/review3-img1.jpg'),
(3, 'https://example.com/review3-img2.jpg');

-- Bình luận gốc (parent_comment_id = NULL)
INSERT INTO comment (user_id, product_id, content, parent_comment_id, status, created_at)
VALUES
(1, 1, 'Sản phẩm này dùng khá ổn, chất lượng tốt.', NULL, 'APPROVED', CURRENT_TIMESTAMP),
(2, 2, 'Mình thấy giá hơi cao so với mặt bằng chung.', NULL, 'PENDING', CURRENT_TIMESTAMP),
(3, 3, 'Đóng gói cẩn thận, giao hàng nhanh.', NULL, 'APPROVED', CURRENT_TIMESTAMP);

-- Bình luận trả lời (child comment cho id = 1)
INSERT INTO comment (user_id, product_id, content, parent_comment_id, status, created_at)
VALUES
(4, 1, 'Bạn dùng lâu chưa, pin có ổn không?', 1, 'PENDING', CURRENT_TIMESTAMP),
(5, 1, 'Mình cũng thấy chất lượng ổn thật.', 1, 'APPROVED', CURRENT_TIMESTAMP);

-- Trả lời vào comment id = 4 (reply lồng 2 cấp)
INSERT INTO comment (user_id, product_id, content, parent_comment_id, status, created_at)
VALUES
(1, 1, 'Mình dùng được 3 tháng rồi, pin vẫn ngon nhé.', 4, 'APPROVED', CURRENT_TIMESTAMP);

-- Trả lời vào comment id = 2
INSERT INTO comment (user_id, product_id, content, parent_comment_id, status, created_at)
VALUES
(6, 2, 'Theo mình thì so với tính năng thì giá hợp lý.', 2, 'APPROVED', CURRENT_TIMESTAMP),
(7, 2, 'Có shop nào bán rẻ hơn không?', 2, 'PENDING', CURRENT_TIMESTAMP);

-- Trả lời vào comment id = 7
INSERT INTO comment (user_id, product_id, content, parent_comment_id, status, created_at)
VALUES
(2, 2, 'Mình thấy trên web chính hãng thì cũng bằng giá thôi.', 7, 'APPROVED', CURRENT_TIMESTAMP);

-- Trả lời vào comment id = 3
INSERT INTO comment (user_id, product_id, content, parent_comment_id, status, created_at)
VALUES
(8, 3, 'Chuẩn, shipper cũng thân thiện nữa.', 3, 'APPROVED', CURRENT_TIMESTAMP);



INSERT INTO attribute (name, created_at) VALUES ('RAM', CURRENT_TIMESTAMP);
INSERT INTO attribute (name, created_at) VALUES ('ROM', CURRENT_TIMESTAMP);
INSERT INTO attribute (name, created_at) VALUES ('Màn hình', CURRENT_TIMESTAMP);
INSERT INTO attribute (name, created_at) VALUES ('Pin', CURRENT_TIMESTAMP);
INSERT INTO attribute (name, created_at) VALUES ('CPU', CURRENT_TIMESTAMP);
INSERT INTO attribute (name, created_at) VALUES ('GPU', CURRENT_TIMESTAMP);


-- ✅ iPhone 15 (variant 1: 128GB Black)
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('6GB', 6, 1, CURRENT_TIMESTAMP); -- RAM

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('128GB', 128, 2, CURRENT_TIMESTAMP); -- ROM

-- ✅ iPhone 15 (variant 2: 256GB White)
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('6GB', 6, 1, CURRENT_TIMESTAMP);

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('256GB', 256, 2, CURRENT_TIMESTAMP);

-- ✅ Samsung Galaxy S24 (variant 3: 128GB Black)
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('8GB', 8, 1, CURRENT_TIMESTAMP);

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('128GB', 128, 2, CURRENT_TIMESTAMP);

-- ✅ Samsung Galaxy S24 (variant 4: 256GB Cream)
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('8GB', 8, 1, CURRENT_TIMESTAMP);

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('256GB', 256, 2, CURRENT_TIMESTAMP);

-- ✅ Google Pixel 8 Pro (variant 5)
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('12GB', 12, 1, CURRENT_TIMESTAMP);

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('128GB', 128, 2, CURRENT_TIMESTAMP);

-- ✅ MacBook Pro 14" (variant 6: 16GB RAM / 512GB)
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('16GB', 16, 1, CURRENT_TIMESTAMP);

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('512GB', 512, 2, CURRENT_TIMESTAMP);

-- ✅ MacBook Pro 14" (variant 7: 32GB RAM / 1TB)
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('32GB', 32, 1, CURRENT_TIMESTAMP);

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('1024GB', 1024, 2, CURRENT_TIMESTAMP); -- ROM 1TB đổi thành 1024GB

-- ✅ Dell XPS 13 (variant 8: i7, 16GB / 512GB)
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('16GB', 16, 1, CURRENT_TIMESTAMP);

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('512GB', 512, 2, CURRENT_TIMESTAMP);

-- ✅ Dell XPS 13 (variant 9: i5, 8GB / 256GB)
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('8GB', 8, 1, CURRENT_TIMESTAMP);

INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('256GB', 256, 2, CURRENT_TIMESTAMP);

-- ✅ OnePlus 12 - Common
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('5000 mAh', 5000, 4, CURRENT_TIMESTAMP);
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('6.7 inch AMOLED', NULL, 3, CURRENT_TIMESTAMP); -- Màn hình

-- ✅ OnePlus 12 - Variant 10
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('12GB', 12, 1, CURRENT_TIMESTAMP); -- RAM
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('256GB', 256, 2, CURRENT_TIMESTAMP); -- ROM

-- ✅ OnePlus 12 - Variant 11
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('16GB', 16, 1, CURRENT_TIMESTAMP);
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('512GB', 512, 2, CURRENT_TIMESTAMP);

-- ✅ Sony Xperia 1 V
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('12GB', 12, 1, CURRENT_TIMESTAMP); -- RAM
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('256GB', 256, 2, CURRENT_TIMESTAMP); -- ROM
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('6.5 inch 4K OLED', NULL, 3, CURRENT_TIMESTAMP); -- Màn hình
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('5000 mAh', 5000, 4, CURRENT_TIMESTAMP); -- Pin

-- ✅ Surface Laptop 5
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('16GB', 16, 1, CURRENT_TIMESTAMP); -- RAM
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('512GB', 512, 2, CURRENT_TIMESTAMP); -- ROM
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('Intel Core i7-1255U', NULL, 5, CURRENT_TIMESTAMP); -- CPU
INSERT INTO attribute_value (str_val, numeric_val, attribute_id, created_at)
VALUES ('Intel Iris Xe', NULL, 6, CURRENT_TIMESTAMP); -- GPU


-- ✅ iPhone 15 (variant 1: 128GB Black)
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (1, 1); -- 6GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (1, 2); -- 128GB

-- ✅ iPhone 15 (variant 2: 256GB White)
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (2, 3); -- 6GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (2, 4); -- 256GB

-- ✅ Samsung Galaxy S24 (variant 3: 128GB Black)
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (3, 5); -- 8GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (3, 6); -- 128GB

-- ✅ Samsung Galaxy S24 (variant 4: 256GB Cream)
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (4, 7); -- 8GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (4, 8); -- 256GB

-- ✅ Google Pixel 8 Pro (variant 5)
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (5, 9); -- 12GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (5, 10); -- 128GB

-- ✅ MacBook Pro 14" (variant 6: 16GB / 512GB)
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (6, 11); -- 16GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (6, 12); -- 512GB

-- ✅ MacBook Pro 14" (variant 7: 32GB / 1TB)
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (7, 13); -- 32GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (7, 14); -- 1024GB

-- ✅ Dell XPS 13 (variant 8: i7, 16GB / 512GB)
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (8, 15); -- 16GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (8, 16); -- 512GB

-- ✅ Dell XPS 13 (variant 9: i5, 8GB / 256GB)
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (9, 17); -- 8GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (9, 18); -- 256GB

-- ✅ OnePlus 12 (variant 10)
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (10, 21); -- 12GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (10, 22); -- 256GB

-- ✅ OnePlus 12 (variant 11)
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (11, 23); -- 16GB
INSERT INTO product_variant_attribute_value (product_variant_id, attribute_value_id) VALUES (11, 24); -- 512GB





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
INSERT INTO product_filter (name, attribute_id, created_at) VALUES ('Dung lượng RAM', 1, CURRENT_TIMESTAMP);
INSERT INTO product_filter (name, attribute_id, created_at) VALUES ('Bộ nhớ trong', 2, CURRENT_TIMESTAMP);
INSERT INTO product_filter (name, attribute_id, created_at) VALUES ('Chọn hãng', 3, CURRENT_TIMESTAMP);
INSERT INTO product_filter (name, attribute_id, created_at) VALUES ('Giá', 4, CURRENT_TIMESTAMP);

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

-- Filter Options cho category = 'Điện thoại' (id = 1)
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('4 GB', 'bang-4', 1, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('8 GB', 'bang-8', 1, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('64 GB', 'bang-64', 2, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('128 GB', 'bang-128', 2, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('Samsung', 'chua-Samsung', 3, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('Apple', 'chua-Apple', 3, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('Dưới 5 triệu', 'duoi-5000000', 4, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('5 - 10 triệu', '5000000-10000000', 4, CURRENT_TIMESTAMP);

-- Filter Options cho category = 'Laptop' (id = 3)
INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('8 GB', 'bang-8', 1, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('16 GB', 'bang-16', 1, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('256 GB SSD', 'bang-256', 2, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('512 GB SSD', 'bang-512', 2, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('Dell', 'chua-Dell', 3, CURRENT_TIMESTAMP);

INSERT INTO filter_option (name, filter_condition, product_filter_id, created_at)
VALUES ('Asus', 'chua-Asus', 3, CURRENT_TIMESTAMP);







