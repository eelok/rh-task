const { Manufacturer } = require("../models");

const getAllManufacturers = () => Manufacturer.findAll();

const getManufacturerById = (id) => Manufacturer.findByPk(id);

module.exports = {
    getAllManufacturers,
    getManufacturerById,
};
