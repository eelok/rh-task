const express = require("express");
const app = express();
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const db = require("./config/database");
const Manufacturer = require("./models/manufacturer");
const Phone = require("./models/phone");
const User = require("./models/user");

Manufacturer.hasMany(Phone, {
    foreignKey: 'manufacturer_id'
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

const manufacturersRouter = require("./routes/manufacturers")(Manufacturer, Phone);
const phonesRouter = require("./routes/phones")(Manufacturer, Phone);
const userRouter = require("./routes/users");
const bcrypt = require("bcrypt");

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

db.sync({force: true})
    .then((result => {
        return Manufacturer.create({name: "Apple", location: "California"});
    }))
    .then(manufacturer => {
        return manufacturer.createPhone({name: "iPhone13", quantity: 10, releaseDate: "2021-009-01"});
    });


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;