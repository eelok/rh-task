const app = require("../app");
const request = require("supertest");
const {User} = require("../models");
const {CREATED, OK, UNAUTHORIZED} = require("../http-status-codes");

describe("User register", () => {
    beforeEach(async () => {
        await User.sync({force: true});
    });
    test("should register a new user", async () => {
        const response = await request(app)
            .post("/user/register")
            .send({
                "email": "ben2@gmail.com",
                "name": "Olga",
                "password": "test55testww"
            });

        expect(response.statusCode).toBe(CREATED);
    });
});
describe("User login", () => {
    beforeEach(async () => {
        await User.sync({force: true});
        await request(app)
            .post("/user/register")
            .send({
                "email": "ben2@gmail.com",
                "name": "Olga",
                "password": "test55testww"
            });
    });
    test("should login user", async () => {
        const response = await request(app)
            .post("/user/login")
            .send({
                "email": "ben2@gmail.com",
                "password": "test55testww"
            });

        expect(response.statusCode).toBe(OK);
    });
    test("should send UNAUTHORIZED when email is wrong", async () => {
        const response = await request(app)
            .post("/user/login")
            .send({
                "email": "ben@gmail.com",
                "password": "test55testww"
            });

        expect(response.statusCode).toBe(UNAUTHORIZED);
    });
    test("should send UNAUTHORIZED when password is wrong", async () => {
        const response = await request(app)
            .post("/user/login")
            .send({
                "email": "ben2@gmail.com",
                "password": "testtestww"
            });

        expect(response.statusCode).toBe(UNAUTHORIZED);
    });
});