const Role = require('../models/role');

// Checks whether the authenticated user's role contains a permission with the given actionName
const hasPermission = (actionName) => {
  return async (req, res, next) => {
    try {
      if (!req.user) return res.status(401).json({ message: 'Authentication required.' });

      // admins bypass permission checks
      if (req.user.role === 'admin') return next();

      const roleName = req.user.role;
      if (!roleName) return res.status(403).json({ message: 'No role assigned.' });

      const role = await Role.findOne({ roleName }).populate('permissions');
      if (!role) return res.status(403).json({ message: 'Role not found.' });

      const allowed = (role.permissions || []).some(p => p.actionName === actionName);
      if (!allowed) return res.status(403).json({ message: 'Access denied. Permission missing.' });

      next();
    } catch (err) {
      return res.status(500).json({ message: 'Server error' });
    }
  };
};

module.exports = {
  hasPermission,
};
