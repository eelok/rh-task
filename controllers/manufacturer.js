const {Manufacturer} = require("../models");
const {INTERNAL_SERVER_ERROR} = require("../http-status-codes");

exports.listAll = async (req, res) => {
    try {
        const manufacturers = await Manufacturer.findAll();
        res.send(manufacturers);
    } catch (err) {
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
}