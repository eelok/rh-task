const { User} = require("../models");
const { createUser } = require("./resolvers/user.resolver");
const { getManufacturerById, listAll, createManufacturer, deleteById, updateManufacturer } = require("./resolvers/manufacturer.resolver");
const { getPhoneById, deletePhoneById } = require("./resolvers/phone.resolver");


const rootResolver = { // Query
    user: ({ email, password }) => User.findOne({ where: { email } }),
    users: () => User.findAll(),
    createUser: createUser,
    manufacturers: listAll,
    manufacturer: getManufacturerById,
    createManufacturer: createManufacturer,
    deleteManufacturer: deleteById,
    updateManufacturer: updateManufacturer,
    phone: getPhoneById,
    deletePhone: deletePhoneById
};

module.exports = { rootResolver };