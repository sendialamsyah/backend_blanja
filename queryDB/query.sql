//category
CREATE TABLE category(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(64) NOT NULL);

INSERT INTO category(name) VALUES ('kaos'),('celana pendek'),('jaket'),('celana'),('sepatu');

//product
CREATE TABLE product(id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(64) NOT NULL, description VARCHAR(128), price INT DEFAULT 0, stock INT DEFAULT 0, photo VARCHAR(225), category_id INT NOT NULL);

INSERT INTO product(name, description, price, stock, category_id) VALUES ('kaos polos','bahan katun', 25000, 5,1),('kaos casual','bahan katun',35000,10,1),('celana boxer','bahan katun',30000, 8, 2),('jaket varsity','bahan fleece',150000, 15, 3),('jaket coach','bahan taslan',200000, 8, 3),('celana cargo','bahan cotton american',125000, 15, 4),('sepatu sneakers','bahan kanvas',300000, 5, 5),('sepatu vantela','bahan kanvas',350000, 8,5); 

//cart
CREATE TABLE carts(
    id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    user_id VARCHAR(255) NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

//checkout
CREATE TABLE checkout(
    id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    cart_id INT NOT NULL,
    id_user VARCHAR(255) NOT NULL,
    product_id INT NOT NULL,
    total INT NOT NULL,
    quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

//transaction
CREATE TABLE transaction(
    id INT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    checkout_id INT NOT NULL,
    userId VARCHAR(255) NOT NULL,
    product_id INT NOT NULL,
    total INT,
    quantity INT,
    address VARCHAR(255),
    status INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);