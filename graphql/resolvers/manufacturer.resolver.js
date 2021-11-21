const { Manufacturer } = require("../../models");
const errorName = {
    NOT_FOUND: "not found",
    NAME: "manufacturer name is required",
    EXISTS: "Manufacturer with name already exists"
};

const getManufacturerById = async ({ id }) => {
    const manufacturer = await Manufacturer.findByPk(id);
    if (!manufacturer) {
        throw new Error(errorName.NOT_FOUND);
        // return res.sendStatus(NOT_FOUND);
    }
    // res.send(manufacturer);
    //todo можно ли возвращать просто объект или нет???
    return manufacturer;
};

const listAll = async () => {
    const manufacturers = await Manufacturer.findAll();
    if (!manufacturers) {
        throw new Error(errorName.NOT_FOUND);
    }
    return manufacturers;
    // res.send(manufacturers);
    // return User.findAll()
};

const createManufacturer = async ({ manufacturer }) => {
    const { name } = manufacturer;
    if (!name || !name.trim()) {
        throw new Error(errorName.NAME);
        // return res
        //     .status(BAD_REQUEST)
        //     .send("manufacturer name is required");
    }
    if (await Manufacturer.findOne({ where: { name: name } })) {
        throw new Error(`Manufacturer with name ${name} already exists`);
        // return res.status(BAD_REQUEST).send(`Manufacturer with name ${name} already exists`);
    }
    return await Manufacturer.create(manufacturer);
    // res
    //     .status(CREATED)
    //     .header({ Location: `/manufacturer/${manufacturer.id}` })
    //     .send(manufacturer);
};
module.exports = { getManufacturerById, listAll, createManufacturer };