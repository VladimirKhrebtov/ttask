const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

router.get('/tasks', taskController.getTasks);

router.get('/add-task', taskController.getAddTask);

router.get('/tasks/:id', taskController.getSingleTask);

router.post('/add-task', taskController.postAddTask);

exports.router = router;
