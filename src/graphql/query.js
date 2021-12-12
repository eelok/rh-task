const {
    manufacturerList, 
    getManufacturerById, 
    findAllPhonesByManufacturerId,
    fetchNestedManufacturer
} = require("./manufacturer/manufacturer.resolver");
const {getPhoneById, fetchNestedPhones} = require("./phone/phone.resolver");
const {loginUser} = require("./user/user.resolver");

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