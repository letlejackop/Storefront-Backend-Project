# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index '/products' [get]
- Show '/products/:id' [get]
- Create [token required] '/products' [post]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] '/users' [get]
- Show [token required] '/users/:id' [get]
- Create N[token required] '/users' [post]

#### Orders
- create [token required] '/orders' [post]
- Current Order by user (args: user id)[token required] '/orders/:id' [GET]
- add product to order '/orders/:id/products' [post]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## DataBase Tables
- Table: users (id number, firstName varchar, lastName varchar, password varchar)
- Table: products (id number, name varchar, price number, category varchar)
- Table: orders (id number, status varchar, user_id number [foreign key to users table])
- Table: orders (id number, order_id number [foreign key to order table], product_id number [foreign key to product table], quantity number)


## Data Shapes
#### Product
-  id
- name
- price
- category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)