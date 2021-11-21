const { User, Manufacturer } = require("../models");
const { createUser } = require("./resolvers/user.resolver");
const { getManufacturerById, listAll, createManufacturer, deleteById, updateManufacturer } = require("./resolvers/manufacturer.resolver");


const rootResolver = { // Query
    user: ({ email, password }) => User.findOne({ where: { email } }),
    users: () => User.findAll(),
    createUser: createUser,
    manufacturers: listAll,
    manufacturer: getManufacturerById,
    createManufacturer: createManufacturer,
    deleteManufacturer: deleteById,
    updateManufacturer: updateManufacturer
};

module.exports = { rootResolver };