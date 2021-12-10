const {Phone, Manufacturer} = require("../../../models");

function notAuthenticatedUser(user) {
    if (!user) {
        throw new Error(`user is not authenticated`);
    }
}

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


module.exports = {createPhone}