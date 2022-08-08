CREATE TABLE users(
    id VARCHAR(64) NOT NULL,
    fullname VARCHAR(32),
    email VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    role VARCHAR(16),
    photo VARCHAR (255),
    phone_number VARCHAR(64),
    gender VARCHAR(16),
    birth VARCHAR(64),
    address VARCHAR(64),
    store_name VARCHAR(64),
    store_description VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);