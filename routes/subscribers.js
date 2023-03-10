const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// Get all subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch(err) {
        res.status(500).json({ message: err.message} )
    }
})

// Get one
router.get('/:id', async (req, res) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id)
        res.json(subscriber)
    } catch(err) {
        res.status(500).json({ message: err.message} )
    }
})

// Add one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedTo: req.body.subscribedTo
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch(err) {
        res.status(400).json(newSubscriber)
    }
})

// Update one
router.patch('/:id', async (req, res) => {
    const subscriber = await Subscriber.findById(req.params.id)
    if (req.body.name != null) {
        subscriber.name = req.body.name
    }
    if (req.body.subscribedTo != null) {
        subscriber.subscribedTo = req.body.subscribedTo
    }
    try {
        const updatedSubscriber = await subscriber.save()
        res.json(updatedSubscriber)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete one
router.delete('/:id', async (req, res) => {
    const subscriber = await Subscriber.findById(req.params.id)
    try {
        await subscriber.deleteOne()
        res.json({ message: "Deleted Subscriber" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router