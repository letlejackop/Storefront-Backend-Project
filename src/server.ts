import express, { Request, Response } from 'express'
import cors from "cors"
import bodyParser from 'body-parser'
import userRoutes from "./handlers/userHandler";
import productRoutes from "./handlers/productHandler";
import orderRoutes from "./handlers/orderHandler";

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(cors())
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})
userRoutes(app);
productRoutes(app);
orderRoutes(app);


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
export default app
