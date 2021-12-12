const {Phone, Manufacturer} = require("../../model");
const { notAuthenticatedUser } = require("../../passport/validate");

const createPhone = async (root, { manufacturerId, phone }, context) => {
    notAuthenticatedUser(context.user);
    const { name, quantity, releaseDate } = phone;
    const manufacturer = await Manufacturer.findByPk(manufacturerId);
    if (!manufacturer) {
        throw Error(`Manufacturer with id ${manufacturerId} doesn't exists`);
    }    
    if (!name || !name.trim()) {
        throw Error("name is required")
    }
    if (!releaseDate || !releaseDate.trim()) {
        throw Error("released date can't be empty")
    }
    if (await Phone.findOne({ where: { name: name } })) {
        throw Error(`Phone with name ${name} already exists`);
    }
    return await manufacturer.createPhone({ name, quantity, releaseDate, manufacturerId });
};

const updatePhone = async (root, { id, phone }, context) => {
    notAuthenticatedUser(context.user);
    const phoneDB = await Phone.findByPk(id);
    const { name, quantity, releaseDate } = phone;
    return await phoneDB.update({ name, quantity, releaseDate });
};

const deletePhone = async (root, { id }, context) => {
    notAuthenticatedUser(context.user);
    const phone = await Phone.findByPk(id);
    if (!phone) {
        throw new Error(`Phone with ${id} was not found`)
    }
    if (await phone.destroy()) {
        return true;
    }
    return false;
};

const getPhoneById = async (root, { id }) => {
    const phone = await Phone.findByPk(id);
    if (!phone) {
        throw new Error(`Phone with ${id} was not found`);
    }
    return phone;
};

const fetchNestedPhones = async (manufacturer) => {
    return await Phone.findAll({where: {manufacturerId: manufacturer.id}});
};

module.exports = {createPhone, updatePhone, deletePhone, getPhoneById, fetchNestedPhones}