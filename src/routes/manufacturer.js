const express = require("express");
const router = express.Router();
const {withAuth} = require("../passport/auth");
const {
    listAll,
    getById,
    createManufacturer,
    deleteById,
    update,
    findAllPhonesByManufacturerId
} = require("../controllers/manufacturer");
const { manufacturerSchema } = require("../validation/manufacturer.schema");

module.exports = router
    .get("/", listAll)
    .get("/:id/phones", findAllPhonesByManufacturerId)
    .get("/:id", withAuth, getById)
    .post("/create", withAuth, (req, res, next) => {
        const validationResult = manufacturerSchema.validate(req.body);
        if (validationResult.error) {
            res.status(BAD_REQUEST).send(validationResult.error.message);
        }
        next();
    }, createManufacturer)
    .delete("/:id", withAuth, deleteById)
    .put("/:id", withAuth, update);

