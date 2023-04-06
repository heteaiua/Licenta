const express = require("express");
const createAppliance = require("../handlers/Appliance/NewAppliance");
const getAllAppliances = require("../handlers/Appliance/GetAllAppliances");
const getApplianceById = require("../handlers/Appliance/GetApplianceById");
const updateAppliance = require("../handlers/Appliance/UpdateAppliance");
const deleteAppliance = require("../handlers/Appliance/DeleteAppliance");
const router = express.Router();

router.post("/newAppliance", createAppliance);
router.get("/getAllAppliances", getAllAppliances);
router.get("/getApplianceById/:applianceId", getApplianceById);
router.patch("/updateAppliance/:applianceId", updateAppliance);
router.delete("/deleteAppliance/:applianceId", deleteAppliance);

module.exports = router;
