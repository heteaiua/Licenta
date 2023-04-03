const express = require("express");
const createFlat = require("../handlers/Flat/NewFlat");
const getAllFlats = require("../handlers/Flat/GetAllFlats");
const deleteFlat = require("../handlers/Flat/DeleteFlat");
const updateFlat = require("../handlers/Flat/UpdateFlat");
const router = express.Router();

router.post("/newFlat", createFlat);
router.get("/getAllFlats", getAllFlats);
router.delete("/deleteFlat/:flatId", deleteFlat);
router.patch("/updateFlat/:flatId", updateFlat);

module.exports = router;
