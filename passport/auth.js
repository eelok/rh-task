const passport = require("passport");
const {BasicStrategy} = require("passport-http");
const {User} = require("../models");
const bcrypt = require("bcrypt");

passport.use(new BasicStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({where: {email: username}});
        if (!user) {
            return done(null, false);
        }
        if (!await bcrypt.compare(password, user.password)) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

exports.withAuth = passport.authenticate("basic", {session: false});

