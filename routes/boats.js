/* jshint esversion: 8 */
var express = require('express');
var router = express.Router();
var { schema: Boat, status: BoatStatus } = require('../models/boat');

// Getting all
router.get('/', async (req, res) => {
  try {
      const boats = await Boat.find()
      res.json(boats)
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
});

// Getting one
router.get('/:id', getBoat, (req, res) => {
  res.send(res.boat)
}); 

// Creating one
router.post('/', async (req, res) => {
  const {id, callsign, alias, status, swimlane, guide } = req.body;
  const boat = new Boat({
      id, callsign, alias, status, swimlane, guide
  })

  try {
      const newBoat = await boat.save()
      res.status(201).json(newBoat) 
  } catch (err) {
      res.status(400).json({ message: err.message })
  }
});

// Updating one
router.patch('/:id', getBoat, async (req, res) => {
  const {id, callsign, alias, status, swimlane, guide } = req.body;
  if (id != null) {
      res.boat.id = id
  }
  if (callsign != null) {
      res.boat.callsign = callsign
  }
  if (alias != null) {
      res.boat.alias = alias
  }
  if (status != null) {
      res.boat.status = status
  }
  if (swimlane != null) {
      res.boat.swimlane = swimlane
  }
  if (guide != null) {
    res.boat.guide = guide
  }
  try {
      const updateBoat = await res.boat.save()
      res.json(updateBoat)
  } catch (err) {
      res.status(400).json({ message: err.message })
  }
});

// Removing one
router.delete('/:id', getBoat, async (req, res) => {
  try {
      await res.boat.remove()
      res.json({ message: 'Removed Boat' })
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
});

// middleware to access mongoose
async function getBoat(req, res, next) {
  let boat;
  try {
      boat = await Boat.findById(req.params.id)
      if (boat == null) {
          return res.status(404).json({ message: 'Cannot find boat' })
      }
  } catch (err) {
      return res.status(500).json({ message: err.message })
  }

  res.boat = boat
  next()
}

module.exports = router;
