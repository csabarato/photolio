const express = require('express')
const router = new express.Router()
const Admin = require('../model/admin')

router.post('/admin/login',async (req, res) => {

    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)

        const token = await admin.generateAuthToken()
        res.send({admin, token})

    } catch (e) {
       res.status(401).send({error: e.message})
    }

})


module.exports = router

