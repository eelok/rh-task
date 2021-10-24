const {BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, UNAUTHORIZED} = require("../http-status-codes");
const {User} = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.createUser = async (req, res) => {
    try {
        const {email, name, password} = req.body;
        if (!email || !name || !password) {
            return res.status(BAD_REQUEST).send("email, name, password can't be empty");
        }
        if (await User.findOne({where: {email}})) {
            return res.status(BAD_REQUEST).send("User is already registered");
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.create({email, name, password: hashedPassword});
        res.sendStatus(CREATED);
    } catch (err) {
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
};

exports.loginUser = async (req, res) => {
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
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(UNAUTHORIZED).send(unauthorizedMessage);
        }
        res.send({authToken: Buffer.from(`${user.email}:${password}`).toString("base64")});
    } catch (err) {
        console.error(err);
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
};