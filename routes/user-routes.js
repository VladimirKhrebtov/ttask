const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/add-user', userController.addUserController);
router.post('/add-user', userController.postUserController);
router.get('/all-users', userController.getAllUsersController);

exports.router = router;
