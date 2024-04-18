const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Project = require("../models/Project");
const User = require("../models/User");
// const Prof = require("../models/Prof");
const { body, validationResult } = require("express-validator");


router.post(
    "/addproject", fetchuser,
    [
      body("title", "Enter a valid title").isLength({ min: 3 }),
      body("desc", "Description must be atleast 5 characters").isLength({
        min: 5,
      }),
    ],
    async (req, res) => {
      try {
        console.log("User -> ", req.user.id)
        const { title, desc, prof, domain, url, urlDesc } = req.body;
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const project = await Project.create({
          user: req.user.id,
          title,
          desc,
          prof,
          domain,
          url,
          urlDesc,
          // status:"Pending"
        });

        const professor = await User.findOne({ type: "prof", name: prof });
        if (!professor)
            return res.status(401).send({ message: "Invalid Professor" });
        const pId = professor._id;
        const profUpdated = await User.findOneAndUpdate(
          { _id:  pId},
          { $push: { pending: project._id } },
          { new: true }
        );


        const user = await User.findById( req.user.id );
        if (!user)
            return res.status(401).send({ message: "Invalid User" });

        const userUpdated = await User.findOneAndUpdate(
          { _id: req.user.id },
          { $push: { pending: project._id } },
          { new: true }
        );
        console.log(userUpdated);

        res.json(project);
      } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
      }
    }
  );

  router.get('/get-all-projects', (req, res) => {
    // res.send('All Files');
    try {
      Project.find({}).then((data) => {
        res.send({ status: "Ok", data: data })
      })
    } catch (error) {
      res.send({ error: error })
    }
  })

  router.get('/getproject/:id', fetchuser, async (req, res) => {
    try {
      Project.findById(req.params.id).then((data) => {
        console.log("Project -> ", data)
        res.send({ status: "Ok", data: data })
      })
    } catch (error) {
      res.send({ error: error })
    }
  })

  module.exports = router;