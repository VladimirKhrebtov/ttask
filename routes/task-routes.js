const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

router.get('/tasks', taskController.getTasks);

router.get('/add-task', taskController.getAddTask);

router.get('/tasks/:id', taskController.getSingleTask);

router.get('/add-task/:id', taskController.getEditTask);

router.post('/add-task', taskController.postAddTask);

router.post('/edit-task/:id', taskController.postEditTask);

router.post('/delete-task/:id', taskController.deleteTask);

exports.router = router;
