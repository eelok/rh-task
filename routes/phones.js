const express = require("express");
const router = express.Router();
const {NOT_FOUND, INTERNAL_SERVER_ERROR, CREATED, BAD_REQUEST} = require("../http-status-codes");

module.exports = (Manufacturers, Phone) => {
    router.get("/:id", async (req, res) => {
        try {
            const phone = await Phone.findByPk(req.params.id);
            if (!phone) {
                return res.sendStatus(NOT_FOUND);
            }
            res.send(phone);
        } catch (err) {
            res.sendStatus(INTERNAL_SERVER_ERROR);
        }
    });

    //todo releaseDate fix
    router.post("/create/:manufacturer_id", async (req, res) => {
        try {
            const manufacturer = await Manufacturers.findByPk(req.params.manufacturer_id);
            if(!manufacturer) {
                return res.status(NOT_FOUND).send(`Manufacturer with id ${req.params.manufacturer_id} doesn't exists`);
            }
            const {name, quantity, releaseDate} = req.body;
            if (!name || !name.trim()) {
                return res
                    .status(BAD_REQUEST)
                    .send("manufacturer name is required");
            }
            if(!releaseDate || !releaseDate.trim()){
                return res
                    .status(BAD_REQUEST)
                    .send("released date can't be empty");
            }
            if(await Phone.findOne({where: {name: name}})){
                return res.status(BAD_REQUEST).send(`Phone with name ${name} already exists`);
            }
            const newPhone = await manufacturer.createPhone({name, quantity});
            res
                .status(CREATED)
                .header({Location: `phone/create/${newPhone.manufacturer_id}`})
                .send(newPhone);
        } catch (err) {
            res.sendStatus(INTERNAL_SERVER_ERROR);
        }
    });

    router.delete("/:id", async (req, res) => {
        try {
            const phone = await Phone.findByPk(req.params.id);
            if (!phone) {
                return res.sendStatus(NOT_FOUND);
            }
            await phone.destroy();
            res.sendStatus(200);
        } catch (err) {
            res.sendStatus(INTERNAL_SERVER_ERROR);
        }
    });

    //todo check new input data
    router.put("/:id", async (req, res) => {
        try {
            const {name, quantity, releaseDate} = req.body;
            const phone = await Phone.findByPk(req.params.id);
            const updatedPhone = await phone.update({name, quantity, releaseDate});
            res.send(updatedPhone);
        } catch (err) {
            res.sendStatus(INTERNAL_SERVER_ERROR);
        }
    });

    return router;
};