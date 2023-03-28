const express = require('express');
const createUser = require('../handlers/User/NewUser')
const getAllUsers = require('../handlers/User/GetAllUsers');
const deleteUser = require('../handlers/User/DeleteUser');
const getUserById = require('../handlers/User/GetUserById');
const login = require('../handlers/User/Login')
const signup = require('../handlers/User/Auth');

const router = express.Router();

router.post('/',createUser);
router.get('/getAllUsers',getAllUsers);
router.get('/getUserById/:userId',getUserById);
router.delete('/deleteUser',deleteUser);
router.post('/signup',signup);
router.post('/login',login);
module.exports = router;