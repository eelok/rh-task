const manufacturerController = require("./manufacturer");
jest.mock("../models");
const {Manufacturer} = require("../models");
const {NOT_FOUND} = require("../http-status-codes");

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
    test("Should call res.send with a manufacturer", async () => {
        const req = {params: {id: 2}};
        const res = jest.fn();
        res.send = jest.fn();
        let manufacturer = {name: "Apple"};
        Manufacturer.findByPk.mockResolvedValue(manufacturer);

        await manufacturerController.getById(req, res);

        expect(res.send.mock.calls[0][0]).toBe(manufacturer);
    });
    test("Should call res.sendStatus with not found", async () => {
        const req = {params: {id: 2}};
        const res = jest.fn();
        res.sendStatus = jest.fn();
        Manufacturer.findByPk.mockResolvedValue(undefined);

        await manufacturerController.getById(req, res);

        expect(res.sendStatus.mock.calls[0][0]).toBe(NOT_FOUND);
    });
});