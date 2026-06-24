const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne
        ({ 
            email 
        });

        if (!existingUser) {
            return res.status(400).json
            ({ 
                message: 'Invalid email or password' 
            });
        }
        console.log(existingUser.password, password);
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(400).json
            ({ 
                message: 'Invalid email or password' 
            });
        }

        const token = jwt.sign({ 
            id: existingUser._id, 
            version: existingUser.version 
        }, 'Abcd@1234', { expiresIn: '1h' });
        
        res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Server error' 
        });
    }
};