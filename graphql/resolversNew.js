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
    updateManufacturer: async(root, {id, manufacturer }) => {
        const {name, location} = manufacturer;
        const manufacturerDB = await Manufacturer.findByPk(id);
        const updatedManufacturer = await manufacturerDB.update({ name, location });
        return updatedManufacturer;
    }
};



// exports.update = async (req, res) => {
//     try {
//         const {name, location} = req.body;
//         const manufacturer = await Manufacturer.findByPk(req.params.id);
//         const updatedManufacturer = await manufacturer.update({name, location});
//         res.send(updatedManufacturer);
//     } catch (err) {
//         res.sendStatus(INTERNAL_SERVER_ERROR);
//     }
// };
module.exports = { Mutation, Query }