const {
    createManufacturer,
    updateManufacturer,
    deleteManufacturer,
} = require("./resolvers/manufacturer.resolver");
const {createUser} = require("./resolvers/user.resolver");
const {
    createPhone, 
    updatePhone, 
    deletePhone
} = require("./resolvers/phone.resolver");

const Mutation = {
    createManufacturer,
    updateManufacturer,
    deleteManufacturer,
    createPhone,
    updatePhone,
    deletePhone,
    createUser
};

module.exports = { Mutation }