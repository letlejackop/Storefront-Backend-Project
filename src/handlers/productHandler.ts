import express, { NextFunction, Request, Response } from 'express'
import jwt from "jsonwebtoken";
import { Product, ProductMethods } from '../models/product'

const methods = new ProductMethods()

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

const index = async (_req: Request, res: Response) => {
    const prod = await methods.index()
    res.json(prod)
}

const show = async (req: Request, res: Response) => {
    const prod = await methods.show(parseInt(req.params.id as unknown as string))
    res.json(prod)
}

const create = async (req: Request, res: Response) => {


    try {
        const prod: Product = {
            id: 1,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        }

        const newProd = await methods.create(prod)
        res.json(newProd)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}




const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)


}

export default productRoutes