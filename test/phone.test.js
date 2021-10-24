const {Phone, Manufacturer, User} = require("../models");
const request = require("supertest");
const app = require("../app");
const {OK, CREATED, BAD_REQUEST, NOT_FOUND} = require("../http-status-codes");


describe("Phone API", () => {
    let token;
    beforeEach(async () => {
        await Phone.sync({force: true});
        await User.sync({force: true});
        await Manufacturer.sync({force: true});
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
    test("should get phone by id", async () => {
        await Phone.create({
            "name": "ApplePhone",
            "quantity": 15,
            "releaseDate": "2019-01-27"
        });
        const response = await request(app)
            .get("/phone/1");

        expect(response.body.name).toBe("ApplePhone");
        expect(response.body.quantity).toBe(15);
        expect(response.statusCode).toBe(OK);
    });
    test("should send status code NOT_FOUND when no phone with such id get_method", async () => {
        const response = await request(app)
            .get("/phone/1");

        expect(response.statusCode).toBe(NOT_FOUND);
    });
    test("should delete phone", async () => {
        await Phone.create({
            "name": "ApplePhone",
            "quantity": 15,
            "releaseDate": "2019-01-27"
        });

        const response = await request(app)
            .delete("/phone/1")
            .set({Authorization: `Basic ${token}`});

        expect(response.statusCode).toBe(OK);
    });
    test("should send status code NOT_FOUND when no phone with such id delete_method", async () => {
        const response = await request(app)
            .delete("/phone/1")
            .set({Authorization: `Basic ${token}`});

        expect(response.statusCode).toBe(NOT_FOUND);
    });
    test("should update phone", async () => {
        await Phone.create({
            "name": "ApplePhone",
            "quantity": 15,
            "releaseDate": "2019-01-27"
        });

        const response = await request(app)
            .put("/phone/1")
            .set({Authorization: `Basic ${token}`})
            .send({
                "name": "ApplePhoneUpdated",
            });

        expect(response.statusCode).toBe(OK);
        expect(response.body.name).toBe("ApplePhoneUpdated");
        expect(response.body.quantity).toBe(15);
    });
    test("should create phone by manufacturer's id", async () => {
        await Manufacturer.create({name: "Siemens", location: "world"});

        const response = await request(app)
            .post("/phone/create/1")
            .set({Authorization: `Basic ${token}`})
            .send({
                "name": "iphone15",
                "quantity": 7,
                "releaseDate": "2022-01-27"
            });

        expect(response.statusCode).toBe(CREATED);
        expect(response.body.name).toBe("iphone15");
        expect(response.body.quantity).toBe(7);
    });
    test("should sent BAD_REQUEST when create phone without a name", async () => {
        await Manufacturer.create({name: "Siemens", location: "world"});

        const response = await request(app)
            .post("/phone/create/1")
            .set({Authorization: `Basic ${token}`})
            .send({
                "quantity": 7,
                "releaseDate": "2022-01-27"
            });

        expect(response.statusCode).toBe(BAD_REQUEST);
    });
});