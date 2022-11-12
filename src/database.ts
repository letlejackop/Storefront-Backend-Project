import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    ENV,
} = process.env


let Client: Pool = new Pool();

if (ENV === 'test') {
    console.log(ENV);

    Client = new Pool({
        host: POSTGRES_HOST,
        port: POSTGRES_PORT as unknown as number,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}

if (ENV === 'dev') {


    Client = new Pool({
        host: POSTGRES_HOST,
        port: POSTGRES_PORT as unknown as number,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}

export default Client;