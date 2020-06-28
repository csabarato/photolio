const jwt = require('jsonwebtoken')
const Admin = require('../model/admin')

const adminAuth = async function (req, res, next) {

    try {
        const token = req.header('Authorization').replace('Bearer ','')

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findOne({id: decoded._id, 'tokens.token' : token })

        if (!admin) {
            throw new Error("Admin not authorized")
        }

        req.token = token
        req.admin = admin
        next()
    } catch (e) {
        res.status(401).send({error: 'Authentication failed'})
    }

}

module.exports = adminAuth
