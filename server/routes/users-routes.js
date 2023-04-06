const express = require("express");
const createUser = require("../handlers/User/NewUser");
const updateUser = require("../handlers/User/UpdateUser");
const getAllUsers = require("../handlers/User/GetAllUsers");
const deleteUser = require("../handlers/User/DeleteUser");
const getUserById = require("../handlers/User/GetUserById");
const getAllFlatsByUserId = require("../handlers/User/UserFlatBind");
const { login, currentUser } = require("../handlers/Auth/Login");
const signup = require("../handlers/Auth/Signup");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/", createUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:userId", getUserById);
router.delete("/deleteUser/:userId", deleteUser);
router.patch("/updateUser/:userId", updateUser);
router.post("/signup", signup);
router.post("/login", login);
router.get("/current", validateToken, currentUser);
router.get("/flats/:userId", getAllFlatsByUserId);

module.exports = router;
