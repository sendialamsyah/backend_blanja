//category
CREATE TABLE category(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(64) NOT NULL);

INSERT INTO category(name) VALUES ('kaos'),('celana pendek'),('jaket'),('celana'),('sepatu');

//product
CREATE TABLE product(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(64) NOT NULL, description VARCHAR(128), price INT DEFAULT 0, stock INT DEFAULT 0, photo VARCHAR(128), category_id INT NOT NULL);

INSERT INTO product(name, description, price, stock, category_id) VALUES ('kaos polos','bahan katun', 25000, 5,1),('kaos casual','bahan katun',35000,10,1),('celana boxer','bahan katun',30000, 8, 2),('jaket varsity','bahan fleece',150000, 15, 3),('jaket coach','bahan taslan',200000, 8, 3),('celana cargo','bahan cotton american',125000, 15, 4),('sepatu sneakers','bahan kanvas',300000, 5, 5),('sepatu vantela','bahan kanvas',350000, 8,5); 

//order_item
CREATE TABLE order_item(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, color VARCHAR(32) NOT NULL, size VARCHAR(32) NOT NULL, quantity INT DEFAULT 1, product_id INT NOT NULL);

INSERT INTO order_item(color, size, quantity, product_id)VALUES('biru', 'M', 2, 1),('merah',27,5,3);

SELECT order_item.*, product.name FROM order_item INNER JOIN product ON order_item.product_id = product.id;
