const { User } = require("../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const errorName = {
    USER_ALREADY_EXISTS: "User is already registered",
    USER_FIELDS_CANT_BE_EMPTY: "email, name, password can't be empty",
    INTERNAL_SERVER_ERROR: "internal server error"
};

const createUser = async ({ user }) => {
    const { email, name, password } = user;
    if (!email || !name || !password) {
        throw new Error(errorName.USER_FIELDS_CANT_BE_EMPTY);
        // return res.status(BAD_REQUEST).send("email, name, password can't be empty");
    }
    if (await User.findOne({ where: { email } })) {
        throw new Error(errorName.USER_ALREADY_EXISTS);
        // return res.status(BAD_REQUEST).send("User is already registered");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return await User.create({ email, name, password: hashedPassword });
    // res.sendStatus(CREATED);
};

module.exports = { createUser };