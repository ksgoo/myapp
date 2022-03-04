/*jshint esversion:6*/
var mongoose = require('mongoose')
// var default_lane = require('./swimlane').default

var status = Object.freeze({
    MAINT: "MAINT",
    DOCK: "DOCK",
    IN: "IN",
    OUT: "OUT",

    default: "DOCK",
});

// Schema
var boatSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  callsign: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    default: status.default,
  },
  swimlane: {
    type: Number,
    required: true,
    default: 21, // default_lane,
  },
  guide: {
    type: String,
    required: false,
    default: "",
  },
  phone: {
    type: String,
    required: false,
    default: "",
  }
})

module.exports = {
    schema: mongoose.model('Boat', boatSchema),
    status,
}