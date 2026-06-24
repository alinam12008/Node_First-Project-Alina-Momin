const user = require('../models/user');
const bcrypt = require('bcryptjs');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, mobileNumber, role } = req.body;

        const hpass = await bcrypt.hash(password, 10);

        const newUser = await user.create({
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
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({   
            message: "Server error",
        });
    }
};

// Get all users
exports.getAllUsers = async (req,res) => {
    try{
        const users = await user.find().select('-password');

        return res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
    }catch(error){
        console.error(error.message);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

// Get user by ID
exports.getUserById = async (req,res) => {
    try{
        const userId = await user.findById(req.params.id).select('-password');

        if(!userId){
            return res.status(404).json({
                message: "User not found",
            });
        }
        return res.status(200).json({
            message: "User fetched successfully",
            data: userId,
        }); 
    } catch(error){
        return res.status(500).json({
            message: "Server error",
        }); 
    }
}

// Update user by ID
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await user.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Server error",
        });
    }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await user.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            message: "Server error",
        });
    }
};