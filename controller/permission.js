const Permission = require("../models/permission");

exports.createPermission = async (req, res) => {

    try {

        const permission = await Permission.create(req.body);

        res.status(201).json({
            success: true,
            data: permission
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};