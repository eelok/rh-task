const { Manufacturer } = require("../models");
//должно ли это называться как в chema.????
const Query = {
    manufacturers: async () => {
        const manufacturersList = await Manufacturer.findAll();
        console.log(manufacturersList);
        if (!manufacturersList) {
            throw new Error("not found");
        }
        return manufacturersList;
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
    }
};



module.exports = { Mutation, Query }