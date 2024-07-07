const { getUser } = require('../service/session')

async function checkSessionsIds(req, res, next) {
    if(req.path !== '/user/login' && req.path !== '/user/signup' && (req.path === '/' && !req.params?.id)) {
        // const userSessionId = req.cookies.session_id
        const userSessionId = req.headers?.session_id
        console.log(req.headers)

        if(!userSessionId) return res.json({ msg: 'session id not found' })
        
        const user = getUser(userSessionId)

        if(!user) return res.json({ msg: 'no user found' })
        
        req.user = user
        return next()

        // if(userSessionId) {
        //     const user = getUser(userSessionId)

        //     if(user) {
        //         console.log(user)
        //         return next()
        //     } 
        //     else
        //         return res.json({ msg: 'no user found' })
        // }
        // else 
        //     return res.json({ msg: 'session id not found' }) 
    }
    else return next()
}

module.exports = {
    checkSessionsIds,
}