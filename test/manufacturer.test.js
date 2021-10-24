const {Manufacturer, User, Phone} = require("../models");
const request = require("supertest");
const app = require("../app");
const {OK, CREATED} = require("../http-status-codes");
const {login} = require("./login");

describe("Manufacturer API", () => {
    let token;
    beforeEach(async () => {
        await Manufacturer.sync({force: true});
        await Phone.sync({force: true});
        await User.sync({force: true});
        await request(app)
            .post("/user/register")
            .send({
                "email": "ben2@gmail.com",
                "name": "Olga",
                "password": "test55testww"
            });
    });
    test("should get all manufacturers", async () => {
        await Manufacturer.create({name: "apple", location: "world"});

        const response = await request(app).get("/manufacturer");

        expect(response.statusCode).toBe(OK);
        expect(response.body[0].name).toBe("apple");
        expect(response.body[0].location).toBe("world");
    });
    test("should get manufacturer by id", async () => {
        const token = await login();
        await Manufacturer.create({name: "apple", location: "world"});

        const response = await request(app).get("/manufacturer/1").set({Authorization: `Basic ${token}`});

        expect(response.statusCode).toBe(OK);
        expect(response.body.name).toBe("apple");
        expect(response.body.location).toBe("world");
    });
    test("should create a new manufacturer", async () => {
        const token = await login();
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
    test("should delete manufacturer", async () => {
        const token = await login();
        await Manufacturer.create({name: "apple", location: "world"});

        const response = await request(app)
            .delete("/manufacturer/1")
            .set({Authorization: `Basic ${token}`});

        expect(response.statusCode).toBe(OK);
    });
    test("should update manufacturer", async () => {
        const token = await login();
        await Manufacturer.create({name: "apple", location: "earth"});

        const response = await request(app)
            .put("/manufacturer/1")
            .set({Authorization: `Basic ${token}`})
            .send({
                "id": "1",
                "name": "apple001",
            });

        expect(response.body.name).toBe("apple001");
        expect(response.body.location).toBe("earth");
        expect(response.statusCode).toBe(OK);
    });
    test("should find all phones by manufacturer's id", async () => {
        await Manufacturer.create({name: "apple", location: "earth"});
        await Phone.create({
            "manufacturerId": 1,
            "name": "ApplePhone",
            "quantity": 15,
            "releaseDate": "2019-01-27"
        });

        const response = await request(app).get("/manufacturer/1/phones");

        expect(response.body[0].name).toBe("ApplePhone");
        expect(response.body[0].quantity).toBe(15);
        expect(response.statusCode).toBe(OK);
    });
});