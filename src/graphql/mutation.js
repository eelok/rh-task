const {
    createManufacturer,
    updateManufacturer,
    deleteManufacturer,
} = require("./manufacturer/manufacturer.resolver");
const {createUser} = require("./user/user.resolver");
const {
    createPhone, 
    updatePhone, 
    deletePhone
} = require("./phone/phone.resolver");

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