const { Manufacturer, Phone } = require("../models");
//должно ли это называться как в chema.????
const Query = {
    manufacturerList: async () => {
        const manufacturersList = await Manufacturer.findAll();
        console.log(manufacturersList);
        if (!manufacturersList) {
            throw new Error("not found");
        }
        return manufacturersList;
    },
    getManufacturerById: async (root, args) => {
        const manufacturerDB = await Manufacturer.findByPk(args.id);
        if (!manufacturerDB) {
            throw new Error(`manufacturer with id: ${args.id} is not found`);
        }
        return manufacturerDB;
    },
    getPhoneById: async (root, { id }) => {
        const phone = await Phone.findByPk(id);
        if (!phone) {
            throw new Error(`Phone with ${id} was not found`);
        }
        return phone;
    }
};

const Mutation = {
    createManufacturer: async (root, { manufacturer }) => {
        const { name, location } = manufacturer;
        console.log(name, location);
        if (!name || !name.trim()) {
            throw new Error("manufacturer name is required");
        }
        if (await Manufacturer.findOne({ where: { name: name } })) {
            throw new Error(`Manufacturer with name ${name} already exists`);
        }
        return await Manufacturer.create(manufacturer);
    },
    updateManufacturer: async (root, { id, manufacturer }) => {
        const { name, location } = manufacturer;
        const manufacturerDB = await Manufacturer.findByPk(id);
        const updatedManufacturer = await manufacturerDB.update({ name, location });
        return updatedManufacturer;
    },
    deleteManufacturer: async (root, { id }) => {
        const manufacturerDB = await Manufacturer.findByPk(id);
        if (!manufacturerDB) {
            throw new Error(`manufacturer with id: ${id} is not found`);
        } if (await manufacturerDB.destroy()) {
            return true;
        }
        return false;
    },
    createPhone: async (root, { manufacturerId, phone }) => {
        const { name, quantity, releaseDate } = phone;
        const manufacturer = await Manufacturer.findByPk(manufacturerId);
        if (!manufacturer) {
            throw Error(`Manufacturer with id ${manufacturerId} doesn't exists`);
        }
        if (!name || !name.trim()) {
            throw Error("name is required")
        }
        if (!releaseDate || !releaseDate.trim()) {
            throw Error("released date can't be empty")
        }
        if (await Phone.findOne({ where: { name: name } })) {
            throw Error(`Phone with name ${name} already exists`);
        }
        return await manufacturer.createPhone({ name, quantity, releaseDate, manufacturerId });
    },
    updatePhone: async (root, { id, phone }) => {
        const phoneDB = await Phone.findByPk(id);
        const { name, quantity, releaseDate } = phone;
        return await phoneDB.update({ name, quantity, releaseDate });
    }
};

module.exports = { Mutation, Query }