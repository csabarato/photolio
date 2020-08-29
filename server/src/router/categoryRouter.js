const express = require('express')
const router = new express.Router()
const Category = require('../model/category')
const adminAuth = require('../middleware/adminAuth')

router.post('/category/add', adminAuth,async (req,res) => {

    try {
        const category = new Category(req.body)
        await category.save()
        res.send(category)
    } catch (e) {
        res.status(500).send(e.message)
    }

})

router.get('/category/list', async (req, res) => {

    try {
        res.send(await Category.find({}))
    } catch (e) {
        res.status(500).send({error: e.message})
    }

})

module.exports = router
