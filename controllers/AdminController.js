const trainer = require("../models/trainer.model")

exports.getAllTrainer = (req, res) => {
   
  

    trainer.find({ status: "NA"})
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