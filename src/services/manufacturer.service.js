const { Manufacturer } = require("../model");

const getAllManufacturers = () => Manufacturer.findAll();

const getManufacturerById = (id) => Manufacturer.findByPk(id);

// const createManufacturer = async (manufacturer) => {
//     const { name, location } = manufacturer;
//     //TODO: Validation with Joi
//     if (!name || !name.trim()) {
//         throw new Error("manufacturer name is required");
//     }
//     if (await Manufacturer.findOne({ where: { name: name } })) {
//         throw new Error(`Manufacturer with name ${name} already exists`);
//     }
//     return await Manufacturer.create(manufacturer);
// };

module.exports = {
    getAllManufacturers,
    getManufacturerById,
    // createManufacturer,
};
