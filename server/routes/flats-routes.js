const express = require("express");
const createFlat = require("../handlers/Flat/NewFlat");
const getAllFlats = require("../handlers/Flat/GetAllFlats");
const deleteFlat = require("../handlers/Flat/DeleteFlat");
const updateFlat = require("../handlers/Flat/UpdateFlat");
const getFlatById = require("../handlers/Flat/GetFlatById");
const getAllAppliancesByFlatId = require("../handlers/Flat/FlatApplianceBind");
const router = express.Router();

router.post("/newFlat", createFlat);
router.get("/getAllFlats", getAllFlats);
router.get("/getFlatById/:flatId", getFlatById);
router.delete("/deleteFlat/:flatId", deleteFlat);
router.patch("/updateFlat/:flatId", updateFlat);
router.get("/appliances/:flatId", getAllAppliancesByFlatId);

module.exports = router;
