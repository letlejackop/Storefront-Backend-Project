import Client from '../database'
import bcrypt from "bcrypt"
import dotenv from 'dotenv'

dotenv.config()

const pepper = process.env.BCRYPT_PASSWORD as unknown as string
const saltRounds = process.env.SALT_ROUNDS as unknown as string

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
}

export class UserMethods {

    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *'
            const conn = await Client.connect()

            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            );

            const result = await conn
                .query(sql, [u.firstName, u.lastName, hash])

            const user: User = {
                id: result.rows[0].id,
                firstName: result.rows[0].firstname,
                lastName: result.rows[0].lastname,
                password: result.rows[0].password
            }

            conn.release()

            return user
        } catch (err) {
            throw new Error(`Could not add new user ${u.firstName}.Error: ${err} `)
        }
    }

    // async authenticate(username: string, password: string): Promise<User | null> {
    //     const conn = await Client.connect()
    //     const sql = 'SELECT password FROM users WHERE username=($1)'

    //     const result = await conn.query(sql, [username])

    //     console.log(password + pepper)

    //     if (result.rows.length) {

    //         const user = result.rows[0]

    //         console.log(user)

    //         if (bcrypt.compareSync(password + pepper, user.password_digest)) {
    //             return user
    //         }
    //     }

    //     return null
    // }
}