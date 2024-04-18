const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Project = require("../models/Project");
const User = require("../models/User");
// const Prof = require("../models/Prof");
const { body, validationResult } = require("express-validator");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});


router.get('/pendingProjects', fetchuser, async(req,res) => {
  try {
    const projects = await Project.find({user:req.user.id, status: "pending"})
    if(!projects) {
      return res.status(404).send("Not Found");
    }

    res.json(projects);
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error");
  }
})

router.get('/approvedProjects', fetchuser, async(req,res) => {
  try {
    const projects = await Project.find({user:req.user.id, status: "approved"})
    if(!projects) {
      return res.status(404).send("Not Found");
    }

    res.json(projects);
  }
  catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error");
  }
})

module.exports = router;
