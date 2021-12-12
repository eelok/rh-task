const { User } = require("../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUser = async (root, { user }) => {
    const { email, name, password } = user;
    if (!email || !name || !password) {
        throw new Error("email, name, password can't be empty");
    }
    if (await User.findOne({ where: { email } })) {
        throw new Error("User is already registered");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return await User.create({ email, name, password: hashedPassword });
};

const loginUser = async (root, { email, password }) => {
    const unauthorizedMessage = "username or password are incorrect";
    if (!email || !password) {
        throw new Error("email and password are required");
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error(unauthorizedMessage);
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
        throw new Error(unauthorizedMessage);
    }
    return {
        authToken: Buffer.from(`${user.email}:${password}`).toString("base64"),
    };
};

module.exports = { createUser, loginUser };
