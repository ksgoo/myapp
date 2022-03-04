/* jshint esversion: 8 */
var express = require('express');
var router = express.Router();
var { schema: Guide } = require('../models/guide');

// Getting all
router.get('/', async (req, res) => {
  try {
      const guides = await Guide.find()
      res.json(guides)
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
});

// Getting one
router.get('/:id', getGuide, (req, res) => {
  res.send(res.guide)
}); 

// Creating one
router.post('/', async (req, res) => {
  const {id, firstname, lastname, phone } = req.body;
  const guide = new Guide({
      id, firstname, lastname, phone
  })

  try {
      const newGuide = await guide.save()
      res.status(201).json(newGuide) 
  } catch (err) {
      res.status(400).json({ message: err.message })
  }
});

// Updating one
router.patch('/:id', getGuide, async (req, res) => {
  const {id, firstname, lastname, phone } = req.body;
  if (id != null) {
      res.guide.id = id
  }
  if (firstname != null) {
      res.guide.firstname = firstname
  }
  if (lastname != null) {
      res.guide.lastname = lastname
  }
  if (phone != null) {
      res.guide.phone = phone
  }
  try {
      const updateGuide = await res.guide.save()
      res.json(updateGuide)
  } catch (err) {
      res.status(400).json({ message: err.message })
  }
});

// Removing one
router.delete('/:id', getGuide, async (req, res) => {
  try {
      await res.guide.remove()
      res.json({ message: 'Removed Guide' })
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
});

// middleware to access mongoose
async function getGuide(req, res, next) {
  let guide;
  try {
      guide = await Guide.findById(req.params.id)
      if (guide == null) {
          return res.status(404).json({ message: 'Cannot find guide' })
      }
  } catch (err) {
      return res.status(500).json({ message: err.message })
  }

  res.guide = guide
  next()
}

module.exports = router;
