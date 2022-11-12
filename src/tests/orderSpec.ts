import { Order, OrderMethods } from '../models/order';
import supertest from "supertest";
import app from "../server";

const request = supertest(app);

const methods = new OrderMethods()
let token = "";

beforeAll(async () => {
    let response = await request.post(
        "/users",
    ).send({
        "firstName": "faisal",
        "lastName": "nasser",
        "password": "password123",
    }).set('Content-Type', 'application/json')
        .set('Accept', 'application/json')

    await request.post(
        "/users",
    ).send({
        "firstName": "faisal",
        "lastName": "nasser",
        "password": "password123",
    }).set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
    token = response.body
    //=====================================

    await request.post(
        "/products",
    ).send({
        "name": "orange",
        "price": 20,
        "category": "fruits",
    }).set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .auth(token, { type: 'bearer' })

    await request.post(
        "/products",
    ).send({
        "name": "apple",
        "price": 10,
        "category": "fruits",
    }).set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .auth(token, { type: 'bearer' })
})

describe("Order Model", () => {

    it('should have a show method', () => {
        expect(methods.currentActiveOrder).toBeDefined();
    });

    it('create method should add an order', async () => {
        const result = await methods.create({
            id: 1,
            status: 'active',
            user_id: 1,
        });
        expect(result).toBeDefined();
    });

    it('add a product to an order method', async () => {
        const result = await methods.addProduct(1, 1, 1);


        expect(result).toBeDefined();
    });

});

describe("testing Order endpoints", () => {
    beforeAll(async () => {
        await request.post(
            '/orders',
        ).send({
            "status": "active",
            "user_id": "3",
        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .auth(token, { type: 'bearer' })
    })



    it('posts to the create endpoint', async () => {
        const response = await request.post(
            '/orders',
        ).send({
            "status": "active",
            "user_id": "2",
        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .auth(token, { type: 'bearer' })

        expect(response.status).toBe(200);
    });
    it('tests the add product to order endpoint', async () => {
        const response = await request.post(
            "/orders/2/products",
        ).send({
            "quantity": "1",
            "product_id": "2"
        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .auth(token, { type: 'bearer' })


        expect(response.status).toBe(200);
    });

    it('tests the current active order for user id 1 endpoint', async () => {
        const response = await request.get(
            "/orders/1",
        ).auth(token, { type: 'bearer' })

        expect(response.status).toBe(200);
    });

});