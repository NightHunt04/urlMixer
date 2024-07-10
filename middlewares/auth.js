const { getUser } = require('../service/session')

async function checkSessionsIds(req, res, next) {
    if(req.path !== '/user/login' && req.path !== '/user/signup' && (req.path === '/' && !req.params?.id)) {
        // const userSessionId = req.headers?.session_id
        let userSessionId = req.headers['authorization']

        if(!userSessionId) return res.json({ msg: 'session id not found' })

        userSessionId = userSessionId.split('Bearer ')[1]
        
        const user = getUser(userSessionId)

        if(!user || user.msg === 'err') return res.json({ msg: 'no user found' })
        
        req.user = user
        return next()
    }
    else return next()
}

module.exports = {
    checkSessionsIds,
}