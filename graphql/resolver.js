const { User, Manufacturer } = require("../models");
const { createUser } = require("./resolvers/user.resolver");

const rootResolver = { // Query
    user: ({ email, password }) => User.findOne({ where: { email } }),
    users: () => User.findAll(),
    manufacturers: () => Manufacturer.findAll(),
    manufacturer: function ({ id }) { return Manufacturer.findByPk(id) },
    createUser: createUser
};

module.exports = { rootResolver };