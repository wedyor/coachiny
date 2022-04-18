const { response } = require("express");
const express = require("express");
const trainer = require("../models/trainer.model");

const router = express.Router();


exports.getAllTrainer = (req, res) => {
   
  
  // {status: 'Activate'}
    trainer.find({status: 'Activated'})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving trainers."
      });
    });
  }