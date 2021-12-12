const { Manufacturer, Phone } = require('../../models');
const { notAuthenticatedUser } = require('./../../passport/validate');

const manufacturerList = () => Manufacturer.findAll();

const getManufacturerById = (root, args, context) => {
    notAuthenticatedUser(context.user);
    return Manufacturer.findByPk(args.id);
};

const createManufacturer = async (root, { manufacturer }, context) => {
    notAuthenticatedUser(context.user);
    const { name, location } = manufacturer;
    console.log(name, location);
    if (!name || !name.trim()) {
        throw new Error("manufacturer name is required");
    }
    if (await Manufacturer.findOne({ where: { name: name } })) {
        throw new Error(`Manufacturer with name ${name} already exists`);
    }
    return await Manufacturer.create(manufacturer);
};

const updateManufacturer = async (root, { id, manufacturer }, context) => {
    notAuthenticatedUser(context.user);
    const { name, location } = manufacturer;
    const manufacturerDB = await Manufacturer.findByPk(id);
    const updatedManufacturer = await manufacturerDB.update({ name, location });
    return updatedManufacturer;
};

const deleteManufacturer = async (root, { id }, context) => {
    notAuthenticatedUser(context.user);
    const manufacturerDB = await Manufacturer.findByPk(id);
    if (!manufacturerDB) {
        throw new Error(`manufacturer with id: ${id} is not found`);
    } if (await manufacturerDB.destroy()) {
        return true;
    }
    return false;
};

const findAllPhonesByManufacturerId = async (root, {manufacturerId}) => {
    const phones = await Phone.findAll({where: {manufacturerId: manufacturerId}});
    return phones;
};

const fetchNestedManufacturer = async (phone) => {
    return await Manufacturer.findByPk(phone.manufacturerId);
};

module.exports = {
    manufacturerList,  
    getManufacturerById, 
    createManufacturer, 
    updateManufacturer, 
    deleteManufacturer,
    findAllPhonesByManufacturerId,
    fetchNestedManufacturer
}