const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, mobileNumber, role } = req.body;

        // Prevent duplicate email
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const hpass = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hpass,
            mobileNumber,
            role,
        });

        return res.status(201).json({
            message: "User created",
            data: newUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        return res.status(200).json({
            message: 'Users fetched successfully',
            data: users,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userData = await User.findById(req.params.id).select('-password');
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User fetched successfully', data: userData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updates = { ...req.body };
        if (updates.password) {
            const bcrypt = require('bcryptjs');
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
