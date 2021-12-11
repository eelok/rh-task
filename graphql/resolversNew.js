const {
    manufacturerList, 
    getManufacturerById, 
    createManufacturer,
    updateManufacturer,
    deleteManufacturer,
    findAllPhonesByManufacturerId,
    fetchNestedManufacturer
} = require("./resolvers/manufacturer.resolver");
const {createUser, loginUser} = require("./resolvers/user.resolver");
const {
    getPhoneById, 
    createPhone, 
    updatePhone, 
    deletePhone, 
    fetchNestedPhones
} = require("./resolvers/phone.resolver");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Query = {
    manufacturerList: manufacturerList,
    getManufacturerById: getManufacturerById,
    getPhoneById: getPhoneById,
    loginUser: loginUser,
    findAllPhonesByManufacturerId  
};

const Mutation = {
    createManufacturer: createManufacturer,
    updateManufacturer: updateManufacturer,
    deleteManufacturer: deleteManufacturer,
    createPhone: createPhone,
    updatePhone: updatePhone,
    deletePhone: deletePhone,
    createUser: createUser
};

const Phone = {
    manufacturer: fetchNestedManufacturer
};

const Manufacturer = {
    phones: fetchNestedPhones
}

module.exports = { Mutation, Query, Phone, Manufacturer }