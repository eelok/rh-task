const {Manufacturer, Phone} = require("../model");
const {INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST, CREATED, OK} = require("../http-status-codes");

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

exports.createManufacturer =  async (req, res) => {
    const {name} = req.body;
    if (!name || !name.trim()) {
        return res
            .status(BAD_REQUEST)
            .send("manufacturer name is required");
    }
    try {
        if (await Manufacturer.findOne({where: {name: name}})) {
            return res.status(BAD_REQUEST).send(`Manufacturer with name ${name} already exists`);
        }
        const manufacturer = await Manufacturer.create(req.body);
        res
            .status(CREATED)
            .header({Location: `/manufacturer/${manufacturer.id}`})
            .send(manufacturer);
    } catch (err) {
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
};

exports.deleteById = async (req, res) => {
    try {
        const manufacturer = await Manufacturer.findByPk(req.params.id);
        if (!manufacturer) {
            return res.sendStatus(NOT_FOUND);
        }
        await manufacturer.destroy();
        res.sendStatus(OK);
    } catch (err) {
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
};

exports.update = async (req, res) => {
    try {
        const {name, location} = req.body;
        const manufacturer = await Manufacturer.findByPk(req.params.id);
        const updatedManufacturer = await manufacturer.update({name, location});
        res.send(updatedManufacturer);
    } catch (err) {
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
};

exports.findAllPhonesByManufacturerId = async (req, res) => {
    try {
        const phones = await Phone.findAll({where: {manufacturerId: req.params.id}});
        if (!phones) {
            return res.sendStatus(NOT_FOUND);
        }
        res.send(phones);
    } catch (err) {
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
};