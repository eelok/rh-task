const express = require("express");
const router = express.Router();
const {withAuth} = require("../passport/auth");
const {
    getPhoneById,
    deletePhoneById,
    updatePhone,
    createPhoneByManufacturerId
} = require("../controllers/phone");

module.exports = router
    .get("/:id", getPhoneById)
    .post("/create/:manufacturer_id", withAuth, createPhoneByManufacturerId)
    .delete("/:id", withAuth, deletePhoneById)
    .put("/:id", withAuth, updatePhone);
