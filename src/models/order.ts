import Client from '../database'

export type Order = {
    id: number;
    status: string;
    user_id: number;
}

export type order_products = {
    id: number;
    quantity: number;
    order_id: number;
    product_id: number;
}
export class OrderMethods {

    async create(O: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
            const conn = await Client.connect()

            const result = await conn
                .query(sql, [O.status, O.user_id])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add new Order for user id: ${O.user_id}. Error: ${err}`)
        }
    }

    async currentActiveOrder(userid: number): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)'
            const conn = await Client.connect()

            const result = await conn.query(sql, [userid, "active"])

            conn.release()


            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find active order for user of id ${userid}. Error: ${err}`)
        }
    }

    async addProduct(quantity: number, orderId: number, productId: number): Promise<order_products> {
        // get order to see if it is open
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            //@ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(ordersql, [orderId])

            const order = result.rows[0]

            if (order.status !== "active") {
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
            }

            conn.release()
        } catch (err) {
            throw new Error(`${err}`)
        }

        try {
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            //@ts-ignore
            const conn = await Client.connect()

            const result = await conn
                .query(sql, [quantity, orderId, productId])


            const orderp = result.rows[0]

            conn.release()


            return orderp
        } catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
    }
}