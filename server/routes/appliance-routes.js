const express = require("express");
const createAppliance = require("../handlers/Appliance/NewAppliance");
const getAllApliances = require("../handlers/Appliance/GetAllAppliances");
const getApplianceById = require("../handlers/Appliance/GetApplianceById");
const updateAppliance = require("../handlers/Appliance/UpdateAppliance");
const deleteAppliance = require("../handlers/Appliance/DeleteAppliance");
const router = express.Router();

router.post("/newAppliance", createAppliance);
router.get("/getAllApliances", getAllApliances);
router.post("/getApplianceById", getApplianceById);
router.post("/updateAppliance", updateAppliance);
router.post("/deleteAppliance", deleteAppliance);

module.exports = router;
