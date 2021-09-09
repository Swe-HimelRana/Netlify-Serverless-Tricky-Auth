
const middy = require('middy')
const authMiddleware = require('./auth-middleware')

const profile = async(event, context, callback) =>{
    let data = {
        msg: "Login Success",
        auth: "Thank you for logging in",
    }

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}

exports.handler = middy(profile).use(authMiddleware())