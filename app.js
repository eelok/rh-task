const express = require("express");
const app = express();

const db = require("./config/database");
const Manufacturer = require("./models/manufacturer");
const Phone = require("./models/phone");
// const User = require("./models/user");

Manufacturer.hasMany(Phone, {
    foreignKey: 'manufacturer_id'
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const manufacturersRouter = require("./routes/manufacturers")(Manufacturer, Phone);
const phonesRouter = require("./routes/phones")(Manufacturer, Phone);
app.use("/manufacturer", manufacturersRouter);
app.use("/phone", phonesRouter);


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