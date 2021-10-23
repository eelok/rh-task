const {Manufacturer} = require("../models");
const {INTERNAL_SERVER_ERROR, NOT_FOUND} = require("../http-status-codes");

exports.listAll = async (req, res) => {
    try {
        const manufacturers = await Manufacturer.findAll();
        res.send(manufacturers);
    } catch (err) {
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
};

exports.getById = async (req, res) => {
    try {
        const manufacturer = await Manufacturer.findByPk(req.params.id);
        if (!manufacturer) {
            return res.sendStatus(NOT_FOUND);
        }
        res.send(manufacturer);
    } catch (err) {
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
};