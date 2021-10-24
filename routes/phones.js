const express = require("express");
const router = express.Router();
const passport = require("passport");
const {getPhoneById, deletePhoneById, updatePhone, createPhoneByManufacturerId} = require("../controllers/phone");

const withAuth = passport.authenticate("basic", {session: false});

module.exports = router
    .get("/:id", getPhoneById)
    .post("/create/:manufacturer_id", withAuth, createPhoneByManufacturerId)
    .delete("/:id", withAuth, deletePhoneById)
    .put("/:id", withAuth, updatePhone);
