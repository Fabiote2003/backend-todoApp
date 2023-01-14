const User = require('../models/User')

const getUserInfo = async (req, res) => {

    try {
        const data = await User.findById(req.user.id).select(' name email ');
        return res.status(200).json(data)
    } catch (error) {  
        return res.status(400).json({
            msg: "No se encontro un usuario con ese ID."
        })
    }
}

const updateUser = async (req, res) => {
    const {name, email} = req.body;
    console.log("Hola ")
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            name, 
            email
        }, {
            new: true
        }).select('name email');

        return res.status(200).json(updatedUser)

    } catch (error) {
        return res.status(400).json({
            msg: "No se pudo actualizar el usuario."
        })
    }
}

module.exports = {
    getUserInfo,
    updateUser
}