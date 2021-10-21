const express = require("express");
const router = express.Router();

const {INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST, CREATED} = require("../http-status-codes");
const passport = require("passport");

module.exports = (Manufacturers, Phone) => {
    router.get("/", async (req, res) => {
        try {
            const manufacturers = await Manufacturers.findAll();
            res.send(manufacturers);
        } catch (err) {
            res.sendStatus(INTERNAL_SERVER_ERROR);
        }
    });

    router.get("/:id", async (req, res) => {
        try {
            const manufacturer = await Manufacturers.findByPk(req.params.id);
            if (!manufacturer) {
                return res.sendStatus(NOT_FOUND);
            }
            res.send(manufacturer);
        } catch (err) {
            res.sendStatus(INTERNAL_SERVER_ERROR);
        }
    });

    router.post("/create", passport.authenticate('basic', { session: false }), async (req, res) => {
        const {name} = req.body;
        if (!name || !name.trim()) {
            return res
                .status(BAD_REQUEST)
                .send("manufacturer name is required");
        }
        try {
            if (await Manufacturers.findOne({where: {name: name}})) {
                return res.status(BAD_REQUEST).send(`Manufacturer with name ${name} already exists`);
            }
            const manufacturer = await Manufacturers.create(req.body);
            res
                .status(CREATED)
                .header({Location: `/manufacturer/${manufacturer.manufacturer_id}`})
                .send(manufacturer);
        } catch (err) {
            res.sendStatus(INTERNAL_SERVER_ERROR);
        }
    });

    router.delete("/:id", async (req, res) => {
        try {
            const manufacturer = await Manufacturers.findByPk(req.params.id);
            if (!manufacturer) {
                return res.sendStatus(NOT_FOUND);
            }
            await manufacturer.destroy();
            res.sendStatus(200);
        } catch (err) {
            res.sendStatus(INTERNAL_SERVER_ERROR);
        }
    });

    router.put("/:id", async (req, res) => {
        try {
            const {name, location} = req.body;
            const manufacturer = await Manufacturers.findByPk(req.params.id);
            const updatedManufacturer = await manufacturer.update({name, location});
            res.send(updatedManufacturer);
        } catch (err) {
            res.sendStatus(INTERNAL_SERVER_ERROR);
        }
    });

    router.get("/:manufacturer_id/phones", async (req, res) => {
        try {
            const manufacturer = await Manufacturers.findByPk(req.params.manufacturer_id);
            if (!manufacturer) {
                return res.sendStatus(NOT_FOUND);
            }
            const phones = await Phone.findAll({where: {manufacturer_id: req.params.manufacturer_id}});
            if (!phones) {
                return res.sendStatus(NOT_FOUND);
            }
            res.send(phones);
        } catch (err) {
            res.sendStatus(INTERNAL_SERVER_ERROR);
        }
    });

    return router;
}
