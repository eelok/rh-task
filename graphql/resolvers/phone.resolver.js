const { Phone } = require('../../models');

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
    if(await phone.destroy()){
        return true;
    }
    return false;
};

module.exports = { getPhoneById, deletePhoneById };