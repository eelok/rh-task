const request = require("supertest");
const app = require("../../../app");

exports.login = async () => {
    const response = await request(app)
        .post("/user/login")
        .send({
            "email": "ben2@gmail.com",
            "password": "test55testww"
        });
    return response.body.authToken;
}

exports.registerNewUser = async () => {
    await request(app)
        .post("/user/register")
        .send({
            "email": "ben2@gmail.com",
            "name": "Olga",
            "password": "test55testww"
        });
}