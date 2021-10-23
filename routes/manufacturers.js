const express = require("express");
const router = express.Router();

const {INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST, CREATED} = require("../http-status-codes");
const passport = require("passport");
const { Phone, Manufacturer } = require('../models');
const manufacturerController = require('../controllers/manufacturer');

router.get("/", manufacturerController.listAll);

router.get("/:id", passport.authenticate("basic", {session: false}), manufacturerController.getById);

router.post("/create", passport.authenticate("basic", {session: false}), manufacturerController.createManufacturer);

router.delete("/:id", passport.authenticate("basic", {session: false}), manufacturerController.deleteById);

router.put("/:id", passport.authenticate("basic", {session: false}), manufacturerController.update);

router.get("/:id/phones", manufacturerController.findAllPhonesByManufacturerId);

module.exports = router;
