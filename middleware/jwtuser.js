const jwt = require('jsonwebtoken')

exports.authorize = (authority) => (req,res,next) =>{
    const enctoken = req.get('Authorization')
    if (!enctoken) {
        return res.status(401).json("Authorization not found")
    }
    let token = enctoken.split(" ")[1]
    let data
    try {
        data = jwt.verify(token, 'rohan#125');
    } catch (error) {
        return res.status(200).json(error)
    }
    console.log("data",data)
    if (!authority.includes(data.role)) {
        return res.status(200).json("Not authorize")
    }
    next()
}