import { Product, ProductMethods } from '../models/product';
import supertest from "supertest";
import app from "../server";

const request = supertest(app);

const methods = new ProductMethods()
let token = "";
beforeAll(async () => {
    const response = await request.post(
        "/users",
    ).send({
        "firstName": "faisal",
        "lastName": "nasser",
        "password": "password123",
    }).set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
    token = response.body
})


describe("Product Model", () => {
    it('create method should add a product', async () => {
        const result = await methods.create({
            id: 1,
            name: 'apple',
            price: 10,
            category: "fruits"
        });

        expect(result).toBeDefined()
    });


    it('index method should return a list of products', async () => {
        const result = await methods.index();
        expect(result).toBeDefined()
    });

    it('show method should return the correct product', async () => {
        const result = await methods.show(1);

        expect(result.id).toEqual(1);
    });
});

describe("Product Endpoint Testing", () => {

    it('tests the create endpoint', async () => {
        const response = await request.post(
            "/products",
        ).send({
            "name": "orange",
            "price": 20,
            "category": "fruits",
        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .auth(token, { type: 'bearer' })


        expect(response.status).toBe(200);
    });

    it('tests the show endpoint', async () => {
        const response = await request.get(
            "/products/1",
        )

        expect(response.status).toBe(200);
    });

    it('tests the index endpoint', async () => {
        const response = await request.get(
            "/products",
        )
        expect(response.status).toBe(200);
    });

});