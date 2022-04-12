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








  exports.updateStatus1 = (req, res) => {

    trainer
     .updateOne({ _id: req.params.id }, { status: "activated" })

    .then((result) => {
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Update successful !" });
      } else {
        res.status(401).json({ message: "errorr" });
      }
    });
  };










  exports.updateStatus =(req,res) => {
    console.log("req.params.id",req.params.id);
      var NewStatus = "Activate"
    console.log(NewStatus);
   
    trainer.updateOne({ _id: req.params.id }, {status: NewStatus })
    .then((result) => {
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Update successful !" });
      } else {
        res.status(401).json({ message: "not authorized" });
      }
    });
  }