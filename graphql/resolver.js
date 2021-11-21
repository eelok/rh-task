const { User, Manufacturer } = require("../models");
const { createUser } = require("./resolvers/user.resolver");
const { getManufacturerById, listAll, createManufacturer } = require("./resolvers/manufacturer.resolver");


const rootResolver = { // Query
    user: ({ email, password }) => User.findOne({ where: { email } }),
    users: () => User.findAll(),
    manufacturers: listAll,
    manufacturer: getManufacturerById,
    createManufacturer: createManufacturer,
    createUser: createUser
};

module.exports = { rootResolver };