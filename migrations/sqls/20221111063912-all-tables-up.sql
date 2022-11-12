CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    firstName VARCHAR(150) NOT NULL,
    lastName VARCHAR(150) NOT NULL,
    password VARCHAR
);
CREATE TABLE products (
 id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL,
    category VARCHAR(150)
    );

CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    status VARCHAR(20),
    user_id bigint REFERENCES users(id)
);

CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);
