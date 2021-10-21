const express = require("express");
const {BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, UNAUTHORIZED} = require("../http-status-codes");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const e = require("express");
const saltRounds = 10;

router.post("/register", async (req, res) => {
    try {
        const {email, name, password} = req.body;
        if (!email || !name || !password) {
            return res.status(BAD_REQUEST).send("email, name, password can't be empty");
        }
        if (await User.findOne({where: {email}})) {
            return res.status(BAD_REQUEST).send("User is already registered");
        }
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            await User.create({email, name, password: hash});
            res.sendStatus(CREATED);
        });
    } catch (err) {
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const unauthorizedMessage = "username or password are incorrect";
        if (!email || !password) {
            return res.status(BAD_REQUEST).send("email and password are required");
        }
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.status(UNAUTHORIZED).send(unauthorizedMessage);
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (!result) {
                return res.status(UNAUTHORIZED).send(unauthorizedMessage);
            }
            res.send({authToken: Buffer.from(`${user.name}:${password}`).toString("base64")});
        });
    } catch (err) {
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
});


module.exports = router;
