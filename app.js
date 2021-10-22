const express = require("express");
const app = express();
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

// const db = require("./configMY/database");
const { sequelize } = require('./models');

// Manufacturer.associations(Phone, {
//     foreignKey: 'manufacturer_id'
// });

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

const manufacturersRouter = require("./routes/manufacturers")(sequelize.models.Manufacturer, sequelize.models.Phone);
const phonesRouter = require("./routes/phones")(sequelize.models.Manufacturer, sequelize.models.Phone);
const userRouter = require("./routes/users");
const bcrypt = require("bcrypt");

app.use("/manufacturer", manufacturersRouter);
app.use("/phone", phonesRouter);
app.use("/user", userRouter);

passport.use(new BasicStrategy(async (username, password, done) => {
    try {
        const user = await sequelize.models.User.findOne({where: {name: username}});
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

// db.sync({force: true})
//     .then((result => {
//         return Manufacturer.bulkCreate([
//             {name: "Apple", location: "California"},
//             {name: "Siemens", location: "Germany"},
//             ]
//         );
//     }))
//     .then(manufacturers=> {
//         manufacturers.map(m => {
//             return m.createPhone({name: `${m.name}Phone`, quantity: 10, releaseDate: "2021-009-01"});
//         })
//     });


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;