const {body} = require('express-validator');

const loginValidator = [
    body('email').isEmail().withMessage('Please provide a valid email address').notEmpty().withMessage('Email is required'),

    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').notEmpty().withMessage('Password is required')
];

module.exports = {
    loginValidator
};

