const {
    manufacturerList, 
    getManufacturerById, 
    findAllPhonesByManufacturerId,
    fetchNestedManufacturer
} = require("./resolvers/manufacturer.resolver");
const {getPhoneById, fetchNestedPhones} = require("./resolvers/phone.resolver");
const {loginUser} = require("./resolvers/user.resolver");

const Query = {
    manufacturerList,
    getManufacturerById,
    getPhoneById,
    loginUser,
    findAllPhonesByManufacturerId  
};

const Phone = {
    manufacturer: fetchNestedManufacturer
};

const Manufacturer = {
    phones: fetchNestedPhones
};

module.exports = { Query, Phone, Manufacturer }