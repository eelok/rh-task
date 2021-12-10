const { Manufacturer, Phone, User } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//todo 1 
function notAuthenticatedUser(user) {
    if (!user) {
        throw new Error(`user is not authenticated`);
    }
}

const Query = {
    manufacturerList: async () => {
        const manufacturersList = await Manufacturer.findAll();
        if (!manufacturersList) {
            throw new Error("not found");
        }
        return manufacturersList;
    },
    getManufacturerById: async (root, args, context) => {
        notAuthenticatedUser(context.user);
        const manufacturerDB = await Manufacturer.findByPk(args.id);
        if (!manufacturerDB) {
            throw new Error(`manufacturer with id: ${args.id} is not found`);
        }
        return manufacturerDB;
    },
    getPhoneById: async (root, { id }) => {
        const phone = await Phone.findByPk(id);
        if (!phone) {
            throw new Error(`Phone with ${id} was not found`);
        }
        return phone;
    },
    loginUser: async (root, {email, password}) => {
        const unauthorizedMessage = "username or password are incorrect";
        if (!email || !password) {
            throw new Error("email and password are required")
        }
        const user = await User.findOne({where: {email}})
        if (!user) {
            throw new Error(unauthorizedMessage);
        }
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            throw new Error(unauthorizedMessage);
        }
        return {authToken: Buffer.from(`${user.email}:${password}`).toString("base64")};
    }        
};

const Mutation = {
    createManufacturer: async (root, { manufacturer }, context) => {
        notAuthenticatedUser(context.user);
        const { name, location } = manufacturer;
        console.log(name, location);
        if (!name || !name.trim()) {
            throw new Error("manufacturer name is required");
        }
        if (await Manufacturer.findOne({ where: { name: name } })) {
            throw new Error(`Manufacturer with name ${name} already exists`);
        }
        return await Manufacturer.create(manufacturer);
    },
    updateManufacturer: async (root, { id, manufacturer }, context) => {
        notAuthenticatedUser(context.user);
        const { name, location } = manufacturer;
        const manufacturerDB = await Manufacturer.findByPk(id);
        const updatedManufacturer = await manufacturerDB.update({ name, location });
        return updatedManufacturer;
    },
    deleteManufacturer: async (root, { id }, {user}) => {
        notAuthenticatedUser({user});
        const manufacturerDB = await Manufacturer.findByPk(id);
        if (!manufacturerDB) {
            throw new Error(`manufacturer with id: ${id} is not found`);
        } if (await manufacturerDB.destroy()) {
            return true;
        }
        return false;
    },
    createPhone: async (root, { manufacturerId, phone }, context) => {
        notAuthenticatedUser(context.user);
        const { name, quantity, releaseDate } = phone;
        const manufacturer = await Manufacturer.findByPk(manufacturerId);
        if (!manufacturer) {
            throw Error(`Manufacturer with id ${manufacturerId} doesn't exists`);
        }
        if (!name || !name.trim()) {
            throw Error("name is required")
        }
        if (!releaseDate || !releaseDate.trim()) {
            throw Error("released date can't be empty")
        }
        if (await Phone.findOne({ where: { name: name } })) {
            throw Error(`Phone with name ${name} already exists`);
        }
        return await manufacturer.createPhone({ name, quantity, releaseDate, manufacturerId });
    },
    updatePhone: async (root, { id, phone }, context) => {
        notAuthenticatedUser(context.user);
        const phoneDB = await Phone.findByPk(id);
        const { name, quantity, releaseDate } = phone;
        return await phoneDB.update({ name, quantity, releaseDate });
    },
    deletePhone: async (root, { id }, context) => {
        notAuthenticatedUser(context.user);
        const phone = await Phone.findByPk(id);
        if (!phone) {
            throw new Error(`Phone with ${id} was not found`)
        }
        if (await phone.destroy()) {
            return true;
        }
        return false;
    },
    createUser: async (root, {user}) => {
        const {email, name, password} = user;
        if (!email || !name || !password) {
            throw new Error("email, name, password can't be empty");
        }
        if (await User.findOne({where: {email}})) {
            throw new Error("User is already registered");
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return await User.create({ email, name, password: hashedPassword });
    }
};

module.exports = { Mutation, Query }