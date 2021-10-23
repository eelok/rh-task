const express = require("express");
const app = express();
const passport = require('passport');
const { User } = require('./models');
const BasicStrategy = require('passport-http').BasicStrategy;
const manufacturersRouter = require("./routes/manufacturers");
const phonesRouter = require("./routes/phones");
const userRouter = require("./routes/users");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use("/manufacturer", manufacturersRouter);
app.use("/phone", phonesRouter);
app.use("/user", userRouter);

passport.use(new BasicStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({where: {name: username}});
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

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;