const {Phone, User, Manufacturer} = require("../../../models");

exports.cleanDB = async () => {
    await Phone.sync({force: true});
    await User.sync({force: true});
    await Manufacturer.sync({force: true});
}