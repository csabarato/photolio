const express = require('express')
const router = new express.Router()
const Admin = require('../model/admin')
const adminAuth = require('../middleware/adminAuth')

router.post('/admin/login',async (req, res) => {

    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)

        const token = await admin.generateAuthToken()
        res.send({admin, token})

    } catch (e) {
       res.status(401).send({error: e.message})
    }
})

router.get('/admin/logout', adminAuth, async (req, res) => {

    try {
        req.admin.tokens = req.admin.tokens.filter(token => token.token !== req.token)
        await req.admin.save()

        res.send({msg: "Admin logged out"})
    } catch (e) {
        res.status(500).send({error: e.message})
    }
})

router.get('/admin/profile', adminAuth, async (req, res) => {
    res.send(req.admin)
})


module.exports = router

