const jwt = require('jsonwebtoken')

const JWT_secret = process.env.JWT_secret

const createtoken = (user)=>{

    return jwt.sign(user,JWT_secret,{expiresIn:'10m'})
}

module.exports = {createtoken}