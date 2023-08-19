const product = require("../models/product");
const user = require("../models/user");
const jwt = require('jsonwebtoken');
const wallet = require("../models/wallet");

exports.buyproduct = async (req, res) => {
    try {
        let body = JSON.parse(req.body.body)
        let user = jwt.verify(body.token, 'rohan#125');
        const productdata = await product.findOne({ _id: body.productId })
        const walletdata = await wallet.findOne({ userId: user.userid })
        let newwallet = {
            ammount: walletdata.ammount - productdata.price
        }
        const walletupdate = await wallet.updateOne({ userId: walletdata.userId }, { $set: newwallet })

        // if (walletdata.sponsorCode !== "") {
        //     let code = await user.findOne({ userId: newwallet.sponsorCode })
        //     let newsubperson = {
        //         ammount: walletdata.ammount + (productdata.price * 2) / 100

        //     }
        //     let userdata = await user.updateOne({ userId: walletdata.userId }, { $set: newsubperson })
        //     console.log("userdata", userdata);
        // }

    }

    catch (error) {
        console.log(error);
        return res.status(400).json(error.message)
    }
}


