DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ring", "jewelry", 12.50, 20), ("earrings", "jewelry", 14.50, 12), ("bracelets", "jewelry", 15.85, 3), ("dress", "clothes", 32.25, 8), ("pants", "clothes", 26.50, 14), ("stilettos", "shoes", 36.99, 7), ("flats", "shoes", 25.99, 9), ("lipstick", "makeup", 18.50, 17), ("mascara", "jewelry", 16.50, 22), ("eyeliner", "makeup", 16.50, 20);



