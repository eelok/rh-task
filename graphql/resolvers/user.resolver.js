const { User } = require("../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUser = async ({ user }) => {
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

const findAllUser = () =>{
    return User.findAll();
}

module.exports = { createUser , findAllUser };