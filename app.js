const express = require("express");
const app = express();

const db = require("./config/database");
const Manufacturer = require("./models/manufacturer");
const Phone = require("./models/phone");
const User = require("./models/user");

const manufacturersRouter = require("./routes/manufacturers");
const {keepalives} = require("pg/lib/defaults");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

Manufacturer.hasMany(Phone, {
    foreignKey: 'manufacturer_id'
});

let manufacturerId = 0;
db.sync({force: true})
    .then((result => {
        return Manufacturer.create({name: "Apple", location: "California"})
        // console.log(result);
    }))
    .then(manufacturer => {
        manufacturerId = manufacturer.manufacturer_id;
        // console.log("First Manufacturer Created: ", manufacturer);
        return manufacturer.createPhone({name: "iPhone13", quantity: 10, releaseDate: "2021-009-01" })
    })
    .then(phone => {
        // console.log("Phone is :", phone);
        return Phone.findAll({where: manufacturerId})
    })
    .then(phones =>{
        // console.log("All the phones are: ", phones);
    })
    .catch((err) => {
        console.log(err);
    })
//
// db.authenticate()
//     .then(() => console.log('Connection has been established successfully.'))
//     .catch(err => console.log('Unable to connect to the database:', err));

app.use("/manufacturer", manufacturersRouter);


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;