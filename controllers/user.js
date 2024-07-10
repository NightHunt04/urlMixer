const userModel = require('../models/user')
const { setUser } = require('../service/session')

// code - 1 { success }
// code - 2 { username already found }
// code - 3 { no username or password was sent }

async function handleSignupUser(req, res) {
    if(req.body?.username && req.body?.password) {
        const username = req.body.username
        const user = await userModel.findOne({ username })

        if(user)
           return res.json({ code: 2, msg: 'Username already exists' })
        
        await userModel.create({
            username: req.body.username,
            password: req.body.password
        })

        return res.json({ code: 1, msg: 'success' })
    }
    return res.status(400).json({ code: 3, msg: 'No username or password was sent' })   
}

async function handleLoginUser(req, res) {
    if(req.body?.username && req.body?.password) {
        const username = req.body.username
        const password = req.body.password

        const user = await userModel.findOne({ username, password })

        if(user) {
            const jwtToken = setUser(user)
            // res.cookie('session_id', sessionId, {
            //     domain: '.url-changer.vercel.app',
            // })
            return res.json({ code: 1, msg: 'success', sessionId: jwtToken })
        }
        return res.json({ code: 2, msg: 'Invalid username or password'})
    }
    return res.status(400).json({ code: 3, msg: 'No username or password was sent'})
}

module.exports = {
    handleSignupUser,
    handleLoginUser
}