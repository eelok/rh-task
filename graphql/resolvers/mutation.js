const {
    createManufacturer,
    updateManufacturer,
    deleteManufacturer,
} = require("./manufacturer.resolver");
const {createUser} = require("./user.resolver");
const {
    createPhone, 
    updatePhone, 
    deletePhone
} = require("./phone.resolver");

const Mutation = {
    createManufacturer: createManufacturer,
    updateManufacturer: updateManufacturer,
    deleteManufacturer: deleteManufacturer,
    createPhone: createPhone,
    updatePhone: updatePhone,
    deletePhone: deletePhone,
    createUser: createUser
};

module.exports = { Mutation }