const auth = require("../middlewares/auth");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Register = require("../models/register.model");
const Addtask = require("../models/task.model");

router.get("/all", (req, res) => {
  Addtask.find()
    .then((addtask) => res.json(addtask))
    .catch((err) => res.status(400).json("Erro: " + err));
});

router.post("/:id/addtask", auth, async (req, res) => {
  const user = await Register.findOne({ _id: req.params.id });

  const name = req.body.name;
  const dueDate = req.body.dueDate;
  const about = req.body.about;

  const newtask = new Addtask({ name, dueDate, about });

  user.tasks.push(newtask);

  user.save();
  res.send(user);
});

router.post ("/:id/:taskid", auth, async (req, res) => {

  var id = req.params.id;
  var taskid = req.params.taskid;
  var name = req.body.name;
  var about = req.body.about;
  const user = await Register.findOne({_id : id});

  const x = user.tasks;
  for(var i=0;i<(user.tasks.length);i++){
    if(x[i].name === name && x[i].about === about){
      x.splice(i,1);
    }
  }
  user.save();
  res.send("Task Deleted")

});




module.exports = router;
