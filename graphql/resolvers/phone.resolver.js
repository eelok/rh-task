const { Phone, Manufacturer } = require('../../models');

const createPhoneByManufacturerId = async ({manufacturerId, phone}) => {
        const {name, quantity, releaseDate} = phone;
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
        if (await Phone.findOne({where: {name: name}})) {
            throw Error(`Phone with name ${name} already exists`);
        }
        return await manufacturer.createPhone({name, quantity, releaseDate, manufacturerId});
};

const getPhoneById = async ({ id }) => {
    const phone = await Phone.findByPk(id);
    if (!phone) {
        throw new Error(`Phone with ${id} was not found`);
    }
    return phone;
};

const deletePhoneById = async ({ id }) => {
    const phone = await Phone.findByPk(id);
    if (!phone) {
        throw new Error(`Phone with ${id} was not found`)
    }
    if (await phone.destroy()) {
        return true;
    }
    return false;
};

// const updatePhone = async({id, phone}) => {
//     const { name, quantity, releaseDate } = phone;
//     const phone = await Phone.findByPk(id);
//     const updatedPhone = await phone.update({ name, quantity, releaseDate });
//     res.send(updatedPhone);
// };

module.exports = { getPhoneById, deletePhoneById, createPhoneByManufacturerId};