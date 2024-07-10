const jwt = require('jsonwebtoken') 
const secret = process.env.SECRET_JWT_KEY

function setUser(user) {
    return jwt.sign({...user}, secret)
}

function getUser(id) {
    try {
        return jwt.verify(id, secret)
    } catch(err) {
        return { msg: 'err' }
    }
}

module.exports = {
    setUser,
    getUser
}