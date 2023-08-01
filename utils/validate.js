const validators = require('./validation')

module.exports = function(validate){
    if (!validators.hasOwnProperty(validate)) {
        throw new Error("validation not found")
    }

    return async function(req,res,next) {
        try {
            let user = await validators[validate].validateAsync(req.body);
            req.body = user
            next()
        } catch (error) {
            if (error) {
                next(error)
            }
        }
    }
}