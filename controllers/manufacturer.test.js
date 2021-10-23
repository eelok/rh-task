const manufacturerController = require("./manufacturer");
jest.mock("../models");
const {Manufacturer, Phone} = require("../models");
const {NOT_FOUND, CREATED, BAD_REQUEST, OK} = require("../http-status-codes");

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
    test("Should call res.sendStatus with NOT_FOUND when empty manufacturer", async () => {
        const req = {params: {id: 2}};
        const res = jest.fn();
        res.sendStatus = jest.fn();
        Manufacturer.findByPk.mockResolvedValue(undefined);

        await manufacturerController.getById(req, res);

        expect(res.sendStatus.mock.calls[0][0]).toBe(NOT_FOUND);
    });
    test("Should call res.send with new manufacturer", async () => {
        const newManufacturer = {name: "testName", id: 42};
        const req = {body: newManufacturer};
        const res = jest.fn();
        res.status = jest.fn().mockImplementation(status => res);
        res.header = jest.fn().mockImplementation(header => res);
        res.send = jest.fn();
        Manufacturer.findOne.mockResolvedValue(undefined);
        Manufacturer.create.mockResolvedValue(newManufacturer);

        await manufacturerController.createManufacturer(req, res);

        expect(res.status.mock.calls[0][0]).toBe(CREATED);
        expect(res.header.mock.calls[0][0]).toMatchObject({"Location": "/manufacturer/42"});
        expect(res.send.mock.calls[0][0]).toBe(newManufacturer);
    });
    test("Should send BAD_REQUEST when no name", async () => {
        const newManufacturer = {name: "", id: 42};
        const req = {body: newManufacturer};
        const res = jest.fn();
        res.status = jest.fn().mockImplementation(status => res);
        res.send = jest.fn();

        await manufacturerController.createManufacturer(req, res);

        expect(res.status.mock.calls[0][0]).toBe(BAD_REQUEST);
        expect(res.send.mock.calls[0][0]).toStrictEqual("manufacturer name is required");
    });
    test("Should send BAD_REQUEST when the manufacturer already exists", async () => {
        const newManufacturer = {name: "testName", id: 42};
        const req = {body: newManufacturer};
        const res = jest.fn();
        res.status = jest.fn().mockImplementation(status => res);
        res.send = jest.fn();
        Manufacturer.findOne.mockResolvedValue(newManufacturer);

        await manufacturerController.createManufacturer(req, res);

        expect(res.status.mock.calls[0][0]).toBe(BAD_REQUEST);
        expect(res.send.mock.calls[0][0]).toStrictEqual(`Manufacturer with name ${newManufacturer.name} already exists`);
    });
    test("Should send OK when manufacturer was deleted", async () => {
        const manufacturer = {name: "testName", id: 2, destroy: jest.fn()};
        const req = {params: {id: manufacturer.id}};
        const res = jest.fn();
        res.sendStatus = jest.fn().mockImplementation(sendStatus => res);
        Manufacturer.findByPk.mockResolvedValue(manufacturer);
        manufacturer.destroy.mockResolvedValue();

        await manufacturerController.deleteById(req, res);

        expect(res.sendStatus.mock.calls[0][0]).toBe(OK);
        expect(Manufacturer.findByPk.mock.calls[0][0]).toBe(manufacturer.id);
    });
    test("Should send NOT_FOUND when no such manufacturer", async () => {
        const manufacturer = {name: "test", id: 22};
        const req = {params: {id: manufacturer.id}};
        const res = jest.fn();
        res.sendStatus = jest.fn().mockImplementation(sendStatus => res);
        Manufacturer.findByPk.mockResolvedValue(undefined);

        await manufacturerController.deleteById(req, res);

        expect(res.sendStatus.mock.calls[0][0]).toBe(NOT_FOUND);
        expect(Manufacturer.findByPk.mock.calls[0][0]).toBe(manufacturer.id);
    });
});