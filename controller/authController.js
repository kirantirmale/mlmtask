const user = require('../models/user');
var jwt = require('jsonwebtoken');

const rendom = () => {
    var coupon = '';
    var possible = 'abcdefghijklmnopqrstuvwxyz0123456789@#$ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < 6; i++) {
        coupon += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return coupon
}

exports.signup = async (req, res) => {
    try { 
    let code = ''
    code = rendom()
        const data = await user.create(req.body)
        console.log("data",data)
        return res.status(200).json({data:data})
    } catch (error) {
        return res.status(400).json("user not found")
    }
}

exports.login = async (req, res) => {
    try {
        const data = await user.findOne({ password: req.body.password, email: req.body.email })
        if (data?.username) {
            if (data.password == req.body.password) {
                const token = jwt.sign({ email: data.email, role: data.role }, 'rohan#125', { expiresIn: '10h' });
                return res.status(200).json({ data: data, token: token })
            } else {
                return res.status(200).json({ message: "Invalid email id or password" })
            }
        } else {
            return res.status(200).json({ message: "user not found" })
        }

    } catch (error) {
        return res.status(400).json("user not found")
    }
}


