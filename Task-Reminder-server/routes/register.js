const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Register = require("../models/register.model");
require("dotenv").config();

router.get("/all", (req, res) => {
  Register.find()
    // .populate("tasks")
    .then((register) => res.json(register))
    .catch((err) => res.status(400).json("Erro: " + err));
});

router.get("/:id",  async (req, res) => {
  const user = await Register.findById(req.params.id).select("tasks");
  res.send(user);
});

router.post("/", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const pass = req.body.pass;
  const phone = req.body.phone;
  const tasks = req.body.tasks;

  let user = await Register.findOne({ email });
  if (user) return res.status(400).send("User already registered");

  user = new Register({ name, email, pass, phone, tasks });
  const salt = await bcrypt.genSalt(10);
  user.pass = await bcrypt.hash(pass, salt);

  user.save();

  const token = user.generateAuthToken();

  const x = _.pick(user, ["_id", "name", "email", "tasks"]);
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(user);
});

module.exports = router;
