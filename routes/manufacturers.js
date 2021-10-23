const express = require("express");
const router = express.Router();

const {INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST, CREATED} = require("../http-status-codes");
const passport = require("passport");
const { Phone, Manufacturer } = require('../models');
const manufacturerController = require('../controllers/manufacturer');

router.get("/", manufacturerController.listAll);

router.get("/:id", passport.authenticate("basic", {session: false}), manufacturerController.getById);

router.post("/create", passport.authenticate("basic", {session: false}), manufacturerController.createManufacturer);

router.delete("/:id", passport.authenticate("basic", {session: false}), async (req, res) => {
    try {
        const manufacturer = await Manufacturer.findByPk(req.params.id);
        if (!manufacturer) {
            return res.sendStatus(NOT_FOUND);
        }
        const phones = await Phone.findAll({where: {manufacturerId: manufacturer.id}});
        console.log("PHONES: >>>>>>>", phones);
        if (phones.length > 0) {
            await Phone.destroy({where: {manufacturerId: manufacturer.id}});
        }
        await manufacturer.destroy();
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
});

router.put("/:id", passport.authenticate("basic", {session: false}), async (req, res) => {
    try {
        const {name, location} = req.body;
        const manufacturer = await Manufacturer.findByPk(req.params.id);
        const updatedManufacturer = await manufacturer.update({name, location});
        res.send(updatedManufacturer);
    } catch (err) {
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
});

router.get("/:manufacturer_id/phones", async (req, res) => {
    try {
        const manufacturer = await Manufacturer.findByPk(req.params.manufacturer_id);
        if (!manufacturer) {
            return res.sendStatus(NOT_FOUND);
        }
        const phones = await Phone.findAll({where: {manufacturerId: req.params.manufacturer_id}});
        if (!phones) {
            return res.sendStatus(NOT_FOUND);
        }
        res.send(phones);
    } catch (err) {
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
});

module.exports = router;
