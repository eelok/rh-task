const { Manufacturer, Phone, User } = require("../models");
const {
    manufacturerList, 
    getManufacturerById, 
    createManufacturer,
    updateManufacturer,
    deleteManufacturer
} = require("./resolvers/new/manufacturer.resolver");
const {createUser, loginUser} = require("./resolvers/new/user.resolver");
const {createPhone} = require("./resolvers/new/phone.resolver");
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
    getPhoneById: async (root, { id }) => {
        const phone = await Phone.findByPk(id);
        if (!phone) {
            throw new Error(`Phone with ${id} was not found`);
        }
        return phone;
    },
    loginUser: loginUser       
};

const Mutation = {
    createManufacturer: createManufacturer,
    updateManufacturer: updateManufacturer,
    deleteManufacturer: deleteManufacturer,
    createPhone: createPhone,
    updatePhone: async (root, { id, phone }, context) => {
        notAuthenticatedUser(context.user);
        const phoneDB = await Phone.findByPk(id);
        const { name, quantity, releaseDate } = phone;
        return await phoneDB.update({ name, quantity, releaseDate });
    },
    deletePhone: async (root, { id }, context) => {
        notAuthenticatedUser(context.user);
        const phone = await Phone.findByPk(id);
        if (!phone) {
            throw new Error(`Phone with ${id} was not found`)
        }
        if (await phone.destroy()) {
            return true;
        }
        return false;
    },
    createUser: createUser
};

module.exports = { Mutation, Query }