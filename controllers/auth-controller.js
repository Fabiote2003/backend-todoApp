const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({
            msg: "All fields are required."
        })
    }

    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            name, 
            email, 
            password: hashedPassword});
        
        await newUser.save();
        return res.json({
            msg: "New user created."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Server Error."
        })
    }

}

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            msg: "All fields are required."
        })
    }

    try {
        const user = await User.findOne({email}).select(" name email password ");
        if(!user) {
            return res.status(404).json({
                msg: "Email or password are incorrect."
            })
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword) {
            return res.status(404).json({
                msg: "Email or password are incorrect."
            })
        }

        const payload = {
            id: user._id,
            name: user.name,
        }

        const token = jwt.sign(payload, "fabio3ackend", {
            expiresIn: '1d',
        })

        return res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json({
            msg: "¡Login success!"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Server Error."
        })
    }
}


const logout = (req, res) => {
    res.clearCookie('access_token');
    return res.status(200).json({
        msg: "Logout success."
    })
}

const isLoggedIn = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) {
        return res.json(false);
    }

    return jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            return res.json(false)
        }else {
            return res.json(true);
        }
    })
}

module.exports = {
    register,
    login,
    logout,
    isLoggedIn
}