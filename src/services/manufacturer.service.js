const { Manufacturer } = require("../model");

const getAllManufacturers = () => Manufacturer.findAll();

const getManufacturerById = (id) => Manufacturer.findByPk(id);

module.exports = {
    getAllManufacturers,
    getManufacturerById,
};
