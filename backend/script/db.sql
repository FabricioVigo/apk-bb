CREATE DATABASE productsdb;

USE productsdb;

CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMBER,
    PRIMARY KEY (id)
);

INSERT INTO products(title, description, price) VALUES
('lavandina', '1 Litro', 400),
('lavandina', '5 Litro', 2000);
