const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const { createUserValidator } = require('../validators/user');
const authMiddleware = require('../middleware/authMiddleware');
const { requireAdmin, allowSelfOrAdmin } = require('../middleware/roleMiddleware');
const { hasPermission } = require('../middleware/permissionMiddleware');
const validateInput = require('../validators/validateInput');

router.post(
  '/create',
  authMiddleware,
  requireAdmin,
  createUserValidator,
  validateInput,
  userController.createUser
);

router.get('/me', authMiddleware, hasPermission('view_own_user'), userController.getMe);

router.get('/:id', authMiddleware, allowSelfOrAdmin, userController.getUserById);

router.put('/:id', authMiddleware, allowSelfOrAdmin, userController.updateUser);

module.exports = router;