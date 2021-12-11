const {
    manufacturerList, 
    getManufacturerById, 
    findAllPhonesByManufacturerId,
    fetchNestedManufacturer
} = require("./manufacturer.resolver");
const {getPhoneById, fetchNestedPhones} = require("./phone.resolver");
const {loginUser} = require("./user.resolver");

const Query = {
    manufacturerList: manufacturerList,
    getManufacturerById: getManufacturerById,
    getPhoneById: getPhoneById,
    loginUser: loginUser,
    findAllPhonesByManufacturerId  
};

const Phone = {
    manufacturer: fetchNestedManufacturer
};

const Manufacturer = {
    phones: fetchNestedPhones
};

module.exports = { Query, Phone, Manufacturer }