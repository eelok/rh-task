const request = require("supertest");
const app = require("../../app");
const {login, registerNewUser} = require("./util/login");
const {Manufacturer, Phone} = require("../../models");
const {OK, CREATED} = require("../../http-status-codes");
const {cleanDB} = require("./util/db");

describe("Manufacturer API", () => {
    beforeEach(async () => {
        await cleanDB();
        await registerNewUser();
    });
    test("should get all manufacturers", async () => {
        await Manufacturer.create({name: "apple", location: "world"});

        const response = await request(app).get("/manufacturer");

        expect(response.statusCode).toBe(OK);
        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe("apple");
        expect(response.body[0].location).toBe("world");
    });
    test("should get manufacturer by id", async () => {
        const token = await login();
        const manufacturer = await Manufacturer.create({name: "apple", location: "world"});

        const response = await request(app)
            .get(`/manufacturer/${manufacturer.id}`)
            .set({Authorization: `Basic ${token}`});

        expect(response.statusCode).toBe(OK);
        expect(response.body.name).toBe("apple");
        expect(response.body.location).toBe("world");
        expect(response.body.id).toBe(manufacturer.id);
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
        const manufacturer = await Manufacturer.create({name: "apple", location: "world"});

        const response = await request(app)
            .delete(`/manufacturer/${manufacturer.id}`)
            .set({Authorization: `Basic ${token}`});

        expect(response.statusCode).toBe(OK);
    });
    test("should update manufacturer", async () => {
        const token = await login();
        const manufacturer = await Manufacturer.create({name: "apple", location: "earth"});

        const response = await request(app)
            .put(`/manufacturer/${manufacturer.id}`)
            .set({Authorization: `Basic ${token}`})
            .send({
                "id": "1",
                "name": "apple001",
            });

        expect(response.body.name).toBe("apple001");
        expect(response.body.location).toBe("earth");
        expect(response.statusCode).toBe(OK);
    });
    test("should find all phones by manufacturerId", async () => {
        const manufacturer = await Manufacturer.create({name: "apple", location: "world"});
        await Phone.create({
            "manufacturerId": manufacturer.id,
            "name": "ApplePhone",
            "quantity": 15,
            "releaseDate": "2019-01-27"
        });

        const response = await request(app).get(`/manufacturer/${manufacturer.id}/phones`);

        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe("ApplePhone");
        expect(response.body[0].quantity).toBe(15);
        expect(response.body[0].manufacturerId).toBe(manufacturer.id);
        expect(response.statusCode).toBe(OK);
    });
});