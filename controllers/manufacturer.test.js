const manufacturerController = require("./manufacturer");
jest.mock("../models");
const {Manufacturer} = require("../models");

describe("Manufacturer Unit Tests", () => {
    test("Should call res.send with all manufacturers", async () => {
        const req = {};
        const res = jest.fn();
        res.send = jest.fn();
        let manufacturers = [{name: "Apple"}];
        Manufacturer.findAll.mockResolvedValue(manufacturers);

        await manufacturerController.listAll(req, res);

        expect(res.send.mock.calls[0][0]).toBe(manufacturers);
    });
});