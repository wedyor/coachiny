const router = require("express").Router();
const express = require("express");
const AdminController = require("../controllers/AdminController");
const middleware = require("../middleware/middleware");


router.get("/home/", AdminController.getAllTrainer);


module.exports = router;
