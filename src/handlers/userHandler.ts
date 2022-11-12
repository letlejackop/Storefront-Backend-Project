import express, { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken";
import { User, UserMethods } from '../models/user'

const methods = new UserMethods()

const index = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization as unknown as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    const user = await methods.index()
    res.json(user)
}

const show = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization as unknown as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)
    } catch (err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    const user = await methods.show(req.params.id)
    res.json(user)
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            id: 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        }

        const newUser = await methods.create(user)
        let token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as unknown as string);
        res.json(token)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}


const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
}

export default userRoutes