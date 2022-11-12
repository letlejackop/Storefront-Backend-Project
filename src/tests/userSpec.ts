import { User, UserMethods } from '../models/user';
import bcrypt from "bcrypt"
import dotenv from 'dotenv'
import supertest from "supertest";
import app from "../server";

const request = supertest(app);

dotenv.config()

const pepper = process.env.BCRYPT_PASSWORD as unknown as string

const methods = new UserMethods()

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
describe("User Model", () => {
    it('create method should add a user', async () => {
        const result = await methods.create({
            id: 1,
            firstName: 'faisal',
            lastName: "nasser",
            password: 'password123'
        });

        expect(result.firstName as unknown as string).toBe("faisal")

    });

    it('create method should add a user with hashed password', async () => {
        const result = await methods.create({
            id: 1,
            firstName: 'faisal',
            lastName: "nasser",
            password: 'password123'
        });

        expect(bcrypt.compareSync('password123' + pepper, result.password)).toBe(true);

    });

    it('index method should return a list of users', async () => {
        const result = await methods.index();

        expect(result[0].id).toBe(1)
    });

    it('show method should return the correct user', async () => {
        const result = await methods.show("1");
        const user = {
            id: result.id,
        }
        expect(user).toEqual({
            id: 1,
        });
    });
});

describe("User Endpoint Testing", () => {

    it('tests the create endpoint', async () => {
        const response = await request.post(
            "/users",
        ).send({
            "firstName": "faisal",
            "lastName": "nasser",
            "password": "password123",
        }).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(response.status).toBe(200);
        expect(response.body as unknown as string).toBeInstanceOf(String);

    });

    it('tests the show endpoint', async () => {
        const response = await request.get(
            "/users/1",
        ).auth(token, { type: 'bearer' })

        expect(response.status).toBe(200);
        expect(parseInt(response.body.id)).toBe(1);
    });

    it('tests the index endpoint', async () => {
        const response = await request.get(
            "/users",
        ).auth(token, { type: 'bearer' })

        expect(response.status).toBe(200);
        expect(parseInt(response.body[0].id)).toBe(1);
    });

});