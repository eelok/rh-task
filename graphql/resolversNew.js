const { Manufacturer, Phone, User } = require("../models");
const {
    manufacturerList, 
    getManufacturerById, 
    createManufacturer,
    updateManufacturer,
    deleteManufacturer
} = require("./resolvers/new/manufacturer.resolver");
const {createUser, loginUser} = require("./resolvers/new/user.resolver");
const {getPhoneById, createPhone, updatePhone, deletePhone} = require("./resolvers/new/phone.resolver");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//todo 1 
function notAuthenticatedUser(user) {
    if (!user) {
        throw new Error(`user is not authenticated`);
    }
}

const Query = {
    manufacturerList: manufacturerList,
    getManufacturerById: getManufacturerById,
    getPhoneById: getPhoneById,
    loginUser: loginUser       
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

module.exports = { Mutation, Query }