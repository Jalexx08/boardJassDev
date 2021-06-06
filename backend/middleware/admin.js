const Role = require("../models/role");

const admin = async (req, res, next ) => {
    const role = await Role.findById(req.user.role_id);
    if(!role) return res.status(401).send("Process failed: The role doesn't exist");

    if(role.name === "admin") next();
    else return res.status(401).send("Process failed: Unauthorized user");
};

module.exports = admin;