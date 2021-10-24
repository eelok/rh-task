const {Manufacturer, User} = require("../models");
const request = require("supertest");
const app = require("../app");
const {OK, CREATED} = require("../http-status-codes");

describe("Manufacturer API", () => {
    let token;
    beforeEach(async () => {
        await Manufacturer.sync({force: true});
        await User.sync({force: true});
        await request(app)
            .post("/user/register")
            .send({
                "email": "ben2@gmail.com",
                "name": "Olga",
                "password": "test55testww"
            });
        const response = await request(app)
            .post("/user/login")
            .send({
                "email": "ben2@gmail.com",
                "password": "test55testww"
            });
        token = response.body.authToken;
    });
    test("should get all manufacturers", async () => {
        await Manufacturer.create({name: "apple", location: "world"});

        const response = await request(app).get("/manufacturer");

        expect(response.statusCode).toBe(OK);
        expect(response.body[0].name).toBe("apple");
        expect(response.body[0].location).toBe("world");
    });
    test("should get manufacturer by id", async () => {
        await Manufacturer.create({name: "apple", location: "world"});

        const response = await request(app).get("/manufacturer/1").set({Authorization: `Basic ${token}`});

        expect(response.statusCode).toBe(OK);
        expect(response.body.name).toBe("apple");
        expect(response.body.location).toBe("world");
    });
    test("should create a new manufacturer", async () => {
        const response = await request(app).post("/manufacturer/create")
            .set({Authorization: `Basic ${token}`})
            .send({
                "name": "LG",
                "location": "world"
            });

        expect(response.statusCode).toBe(CREATED);
        expect(response.body.name).toBe("LG");
        expect(response.body.location).toBe("world");
        expect(response.header.location).toBe("/manufacturer/1");
    });
});