const { Manufacturer } = require("../models");
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
    manufacturer: async (root, args) => {
        const manufacturerDB = await Manufacturer.findByPk(args.id);
        if (!manufacturerDB) {
            throw new Error(`manufacturer with id: ${args.id} is not found`);
        }
        return manufacturerDB;
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
    }
};

module.exports = { Mutation, Query }