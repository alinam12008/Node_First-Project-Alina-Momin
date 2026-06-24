const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const taskController = require('../controller/task');


router.get('/:id', taskController.getTaskById);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

router.post('/create', authMiddleware, taskController.createTask);
router.get('/', authMiddleware, taskController.getTasks);

module.exports = router;