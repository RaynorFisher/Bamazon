-- CREATE DATABASE apothecary_DB


USE apothecary_DB;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
item_id INT NOT NULL auto_increment,
product_name VARCHAR(75) NOT NULL,
department_name VARCHAR (40) NOT NULL,
price INTEGER (250) NOT NULL,
stock_quantity INTEGER (100) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Eye of Newt", "Ingredients", "5", "12"),  ("Foot of Hare", "Ingredients", "12", "58"), ("Leg of Frog", "Ingredients", "25", "79"), ("Dog Fur", "Ingredients", "1", "99"), ("Rat Tail", "Ingredients", "4", "54"), ("Cauldron", "Hardware", "99", "2"), ("Broomstick", "Hardware", "20", "15");

