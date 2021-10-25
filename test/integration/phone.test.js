const {Phone, Manufacturer} = require("../../models");
const request = require("supertest");
const app = require("../../app");
const {OK, CREATED, BAD_REQUEST, NOT_FOUND} = require("../../http-status-codes");
const {login, registerNewUser} = require("./util/login");
const {cleanDB} = require("./util/db");

describe("Phone API", () => {
    beforeEach(async () => {
        await cleanDB();
        await registerNewUser();
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
    test("should send NOT_FOUND when no phone found", async () => {
        const response = await request(app).get("/phone/1");

        expect(response.statusCode).toBe(NOT_FOUND);
    });
    test("should delete phone", async () => {
        await Phone.create({
            "name": "ApplePhone",
            "quantity": 15,
            "releaseDate": "2019-01-27"
        });
        const token = await login();
        
        const response = await request(app)
            .delete("/phone/1")
            .set({Authorization: `Basic ${token}`});

        expect(response.statusCode).toBe(OK);
    });
    test("should send NOT_FOUND when deleting not existing phone", async () => {
        const token = await login();
        
        const response = await request(app)
            .delete("/phone/1")
            .set({Authorization: `Basic ${token}`});

        expect(response.statusCode).toBe(NOT_FOUND);
    });
    test("should update a phone", async () => {
        await Phone.create({
            "name": "ApplePhone",
            "quantity": 15,
            "releaseDate": "2019-01-27"
        });
        const token = await login();

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
});
describe("Create Phone for manufacturer API", () => {
    beforeEach(async () => {
        await cleanDB();
        await registerNewUser();
    });
    test("should create a phone by manufacturerId", async () => {
        const token = await login();
        await Manufacturer.create({name: "Siemens", location: "world"});
        const manufacturerId = 1;

        const response = await request(app)
            .post(`/phone/create/${manufacturerId}`)
            .set({Authorization: `Basic ${token}`})
            .send({
                "name": "iphone15",
                "quantity": 7,
                "releaseDate": "2022-01-27"
            });

        expect(response.statusCode).toBe(CREATED);
        expect(response.body.name).toBe("iphone15");
        expect(response.body.manufacturerId).toBe(manufacturerId);
        expect(response.body.quantity).toBe(7);
    });
    test("should send BAD_REQUEST when phone has no name", async () => {
        const token = await login();
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
    test("should send BAD_REQUEST when phone already exists", async () => {
        const token = await login();
        await Manufacturer.create({name: "Siemens", location: "world"});
        await Phone.create({
            "name": "ApplePhone",
            "quantity": 15,
            "releaseDate": "2019-01-27"
        });

        const response = await request(app)
            .post("/phone/create/1")
            .set({Authorization: `Basic ${token}`})
            .send({
                "name": "ApplePhone",
                "quantity": 7,
                "releaseDate": "2022-01-27"
            });

        expect(response.statusCode).toBe(BAD_REQUEST);
    });
    test("should send NOT_FOUND when no such manufacturer", async () => {
        const token = await login();

        const response = await request(app)
            .post("/phone/create/222")
            .set({Authorization: `Basic ${token}`})
            .send({
                "name": "ApplePhone",
                "quantity": 7,
                "releaseDate": "2022-01-27"
            });

        expect(response.statusCode).toBe(NOT_FOUND);
        expect(response.text).toBe("Manufacturer with id 222 doesn't exists");
    });
});