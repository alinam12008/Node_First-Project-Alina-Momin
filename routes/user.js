const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const { createUserValidator } = require('../validators/user');
const authMiddleware = require('../middleware/authMiddleware');
const validateInput = require('../validators/validateInput');

router.post(
  '/create',
  createUserValidator,
  validateInput,
  userController.createUser
);

router.get('/', authMiddleware, userController.getAllUsers);

router.get('/:id', userController.getUserById); 

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;