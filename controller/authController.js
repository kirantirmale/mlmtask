const user = require('../models/user');
var jwt = require('jsonwebtoken');   

// const rendom = () => {
//     var coupon = '';
//     var possible = 'abcdefghijklmnopqrstuvwxyz0123456789@#$ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     for (var i = 0; i < 6; i++) {
//         coupon += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return coupon
// }

// exports.signup = async (req, res) => {
//     try { 
//     let code = ''
//     code = rendom()
//     let finalobj = {
//         ...req.body,
//         coupon : code
//     }
//         const data = await user.create(finalobj)
//         console.log("data",data)
//         return res.status(200).json({data:data})
//     } catch (error) {
//         return res.status(400).json("user not found")
//     }
// }
exports.signup = async (req, res) => {
    async function rendom() {
        var coupon = '';
        var possible = 'abcdefghijklmnopqrstuvwxyz0123456789@#$ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = 0; i < 6; i++) {
            coupon += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        const userobj = await user.findOne({coupon: coupon})
        if (userobj?.email) {
            return rendom()
        } else {
            return coupon
        }
    }
    try {
        let coupon = await rendom()

        if (req.body.referperson) {
            let referdata = await user.findOne({coupon:req.body.referperson})
            if (referdata.email) {     
                let alldata = await user.find()
                let finalobj = {
                    ...req.body,
                    coupon: coupon,
                    userid: `A${alldata.length + 1}`,
                    sponsorCode: referdata.userid
                }
                const data = await user.create(finalobj)
                return res.status(200).json({ data: data })
            } else {
            return res.status(200).json("sponsor user not found") 
            }
        } else {
            return res.status(200).json("please enter sopnsor code") 
        }
    } catch (error) {
        return res.status(400).json("something went wrong")
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


