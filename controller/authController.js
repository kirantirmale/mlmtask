const user = require('../models/user');
const wallet = require('../models/wallet');
var jwt = require('jsonwebtoken');   
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kirantirmale2362001@gmail.com',
      pass: 'lpeoxqpvvgwavblf'
    }
  });
  const mailOptions = {
    
    from: 'kirantirmale2362001@gmail.com',
    to: "kirant@gmail.com",
    subject: 'Sending Email using Node.js',
    path: './form',
    attachments: [{ 
        filename: 'form.html',
        path: './form.html',
    }
    ]
  };




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
        const data = await user.findOne({ email: req.body.email })
        if (!data) {
            if (req.body.referperson) {
                let referdata = await user.findOne({coupon:req.body.referperson})
                if (referdata.email) {     
                    let alldata = await user.find()
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                    let finalobj = {
                        ...req.body,
                        coupon: coupon,
                        userid: `A${alldata.length + 1}`,
                        sponsorCode: referdata.userid
                    }
                    const data = await user.create(finalobj)
                    const wallets = await wallet.create({
                        userId:finalobj.userid,
                        ammount:100
                    })
                    console.log("data", data)
                    return res.status(200).json({ data:data ,status:true})
                } else {
                return res.status(200).json("sponsor user not found") 
                }
            } else {
                return res.status(200).json("please enter sopnsor code") 
            }
        } else {
            return res.status(200).json("alredy user exist") 
        }
    } catch (error) {
        console.log("error",error)
        return res.status(400).json("something went wrong")
    }
}

exports.login = async (req, res) => {
    try {
        // console.log("req.body",req.body)
        const data = await user.findOne({ password: req.body.password, email: req.body.email })
        if (data?.username) {
            if (data.password == req.body.password) {
                const token = jwt.sign({userid:data.userid, email: data.email, role: data.role }, 'rohan#125', { expiresIn: '10h' });
                return res.status(200).json({ data: data, token: token, message:"successfully login",status:true ,role :data.role })
            } else {
                return res.status(200).json({ message: "Invalid email id or password",status:false   })
            }
        } else {
            return res.status(200).json({ message: "Invalid email id or password    ",status:false  })
        }

    } catch (error) {
        return res.status(400).json({ message: "user not found",status:false  })
    }
}

// exports.login = async (req, res) => {
//     try {
//       const data = await user.findOne({
//         password: req.body.password,
//         email: req.body.email,
//       });
//       if (data?.name) {
//         if (data.password == req.body.password) {
//           const token = jwt.sign(
//             { email: data.email, role: data.role },
//             "rohan#125",
//             { expiresIn: "10h" }
//           );
//           return res.status(200).json({status: true, token: token });
//         } else {
//           return res
//             .status(200)
//             .json({ message: "Invalid email id or password" });
//         }
//       } else {
//         return res.status(200).json({ message: "user not found" });
//       }
//     } catch (error) {
//         console.log("error",error)
//         return res.status(400).json("user not found");
//     }
//   };

