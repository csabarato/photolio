const express = require('express')
const router = new express.Router()
const Photo = require('../model/photo')
const adminAuth = require('../middleware/adminAuth')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

router.post('/photo/upload',adminAuth, async (req, res) => {

  const photo = new Photo({
      title: req.body.title,
      description: req.body.description,
      categories: req.body.categories.map(cat => {
          return new ObjectId(cat.categoryId)
      }),

      author: req.admin._id
  })

  try {
      await photo.save()
      res.send(photo)
  } catch (e) {
      res.status(500).send({error: e.message})
  }
})

router.patch('/photo/update/:id',adminAuth,async (req, res) => {

    try {
        const photo = await Photo.findById(req.params.id)

        photo.title = req.body.title
        photo.description = req.body.description
        photo.categories = photo.categories.concat(
            req.body.categories.map(cat => {
                return new ObjectId(cat.categoryId)
            }).filter(cat => {
                   return !photo.categories.includes(cat)
            })
        )

        await photo.save()
        res.send(photo)
    } catch (e) {
        res.status(500).send({error: e.message})
    }

})

router.get('/photo/list', adminAuth,async (req, res) => {

    try {
        const photos = await Photo.find({author: req.admin._id.toString()})
        res.send(photos)
    } catch (e) {
        res.status(500).send({error: e.message})
    }

})

module.exports = router
