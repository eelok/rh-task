const {Manufacturer} = require('../../../models');
//todo refactore
function notAuthenticatedUser(user) {
    if (!user) {
        throw new Error(`user is not authenticated`);
    }
}

const manufacturerList = async () => {
    const manufacturersList = await Manufacturer.findAll();
    if (!manufacturersList) {
        throw new Error("not found");
    }
    return manufacturersList;
};

const getManufacturerById = async (root, args, context) => {
    notAuthenticatedUser(context.user);
    const manufacturerDB = await Manufacturer.findByPk(args.id);
    if (!manufacturerDB) {
        throw new Error(`manufacturer with id: ${args.id} is not found`);
    }
    return manufacturerDB;
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
}

module.exports = {
    manufacturerList,  
    getManufacturerById, 
    createManufacturer, 
    updateManufacturer, 
    deleteManufacturer
}