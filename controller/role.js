const UserRole = require("../models/role");

exports.createRole = async (req, res) => {
    try {

        console.log(req.body);  

        const { roleName, permissions } = req.body;

        const role = await UserRole.create({
            roleName,
            permissions
        });

        return res.status(201).json({
            success: true,
            data: role
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getAllRoles = async (req,res) => {
    try{
        const roles = await UserRole.find().populate("permissions");
        return res.status(200).json({
            success: true,
            data: roles
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getRoleById = async (req,res) => {
    try{
        const role = await UserRole.findById(req.params.id).populate("permissions");
        return res.status(200).json({
            success: true,
            data: role
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.updateRole = async (req,res) => {
    try{
        const role = await UserRole.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({
            success: true,
            data: role
        });
    } catch (err) {
        return res.status(500).json({
            success: false,        
            message: err.message
        });
    }   
};

exports.deleteRole = async (req,res) => {
    try{
        await UserRole.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Role deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};  