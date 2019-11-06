const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/add-user', userController.addUserController);
router.post('/add-user', userController.postUserController);
router.get('/all-users', userController.getAllUsersController);
router.get('/users/:id', userController.getSingleUser);

exports.router = router;
