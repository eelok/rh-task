const { Manufacturer } = require("../../models");

const getManufacturerById = async ({ id }) => {
    const manufacturer = await Manufacturer.findByPk(id);
    if (!manufacturer) {
        throw new Error(`manufacturer with id: ${id} is not found`);
    }
    return manufacturer;
};

const listAll = async () => {
    const manufacturers = await Manufacturer.findAll();
    if (!manufacturers) {
        throw new Error("not found");
    }
    return manufacturers;
};

const createManufacturer = async ({ manufacturer }) => {
    const { name } = manufacturer;
    if (!name || !name.trim()) {
        throw new Error("manufacturer name is required");
    }
    if (await Manufacturer.findOne({ where: { name: name } })) {
        throw new Error(`Manufacturer with name ${name} already exists`);
    }
    return await Manufacturer.create(manufacturer);
};

const deleteById = async ({ id }) => {
    const manufacturer = await Manufacturer.findByPk(id);
    if (!manufacturer) {
        throw new Error(`manufacturer with id: ${id} is not found`)
    }
    if (await manufacturer.destroy()) {
        return true;
    }
    return false;
};

const updateManufacturer = async ({id, manufacturer}) => {    
    const manufacturerDB = await Manufacturer.findByPk(id);
    return await manufacturerDB.update(manufacturer);
};

module.exports = { getManufacturerById, listAll, createManufacturer, deleteById, updateManufacturer: updateManufacturer };