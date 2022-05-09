//category
CREATE TABLE category(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(64) NOT NULL);

INSERT INTO category(name) VALUES ('kaos'),('celana pendek'),('jaket'),('celana'),('sepatu');

//product
CREATE TABLE product(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(64) NOT NULL, description VARCHAR(128), price INT DEFAULT 0, stock INT DEFAULT 0, categoryId INT NOT NULL,sellerId INT NOT NULL, createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP);

INSERT INTO product(name, description, categoryId, sellerId) VALUES ('kaos polos','bahan katun',1,1),('kaos casual','bahan katun',1,2),('celana boxer','bahan katun',2,2),('jaket varsity','bahan fleece',3,1),('jaket coach','bahan taslan',3,1),('celana cargo','bahan cotton american',4,2),('sepatu sneakers','bahan kanvas',5,2),('sepatu vantela','bahan kanvas',5,2);

SELECT product.*, category.name, seller.storeName FROM product INNER JOIN category ON product.categoryId = category.id INNER JOIN seller ON product.sellerId = seller.id;

//order_item
CREATE TABLE order_item(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, color VARCHAR(32) NOT NULL, size VARCHAR(32) NOT NULL, quantity INT DEFAULT 1, productId INT NOT NULL);

INSERT INTO order_item(color, size, quantity, productId)VALUES('biru', 'M', 2, 1),('merah',27,5,3);

SELECT order_item.*, product.name FROM order_item INNER JOIN product ON order_item.productId = product.id;

//seller
CREATE TABLE seller(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(64) NOT NULL, storeName VARCHAR(64) NOT NULL, email VARCHAR(64) NOT NULL, password VARCHAR(64) NOT NULL);

INSERT INTO seller(name, storeName, email, password)VALUES('budi', 'toko budi','budi543@gmail.com','budi123'),('dian','toko dian','dian213@gmail.com','123dian');

//customer
CREATE TABLE customer(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(64) NOT NULL, address VARCHAR (128) NOT NULL, email VARCHAR(64) NOT NULL, password VARCHAR(64) NOT NULL);

INSERT INTO customer(name, address, email, password) VALUES ('asep','jakarta','asep865@gmail.com','asep123'),('rian','bandung','rian234@gmail.com','123rian');



//checkout
CREATE TABLE checkout(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, orderId INT NOT NULL, customerId INT NOT NULL, totalPrice INT NOT NULL, delivery INT NOT NULL, payment VARCHAR(128) NOT NULL);

INSERT INTO checkout(orderId, customerId, totalPrice, delivery, payment)VALUES(1,2, 50000, 10000, 'gopay');

SELECT checkout.*, order_item.id, customer.address FROM checkout INNER JOIN order_item ON checkout.orderId = order_item.id INNER JOIN customer ON checkout.customerId = customer.id;

