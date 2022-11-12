import express, { NextFunction, Request, Response } from 'express'
import jwt from "jsonwebtoken";
import { Order, OrderMethods } from '../models/order'

const methods = new OrderMethods()
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization as unknown as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)
        next()
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
    }
}


const currentActiveOrder = async (req: Request, res: Response) => {
    try {
        const ord = await methods.currentActiveOrder(parseInt(req.params.id as unknown as string))

        res.json(ord)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const create = async (req: Request, res: Response) => {

    try {
        const prod: Order = {
            id: 1,
            status: req.body.status as unknown as string,
            user_id: parseInt(req.body.user_id as unknown as string),
        }

        const newOrd = await methods.create(prod)
        res.json(newOrd)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const addProduct = async (_req: Request, res: Response) => {

    try {
        const orderId: number = parseInt(_req.params.id)
        const productId: number = parseInt(_req.body.product_id as unknown as string)
        const quantity: number = parseInt(_req.body.quantity)

        const addedProduct = await methods.addProduct(quantity, orderId, productId)

        res.json(addedProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders/:id', verifyAuthToken, currentActiveOrder)
    app.post('/orders', verifyAuthToken, create)

    app.post('/orders/:id/products', verifyAuthToken, addProduct)

}

export default orderRoutes