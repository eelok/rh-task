const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
    listAll,
    getById,
    createManufacturer,
    deleteById,
    update,
    findAllPhonesByManufacturerId
} = require('../controllers/manufacturer');

const withAuth = passport.authenticate("basic", {session: false});

module.exports = router
    .get("/", listAll)
    .get("/:id/phones", findAllPhonesByManufacturerId)
    .get("/:id", withAuth, getById)
    .post("/create", withAuth, createManufacturer)
    .delete("/:id", withAuth, deleteById)
    .put("/:id", withAuth, update);

