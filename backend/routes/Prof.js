const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Project = require("../models/Project");
const User = require("../models/User");
// const Prof = require("../models/Prof");
const { body, validationResult } = require("express-validator");


router.put(
    "/approve/:id", fetchuser, async (req, res) => {
      try {
        console.log("User -> ", req.user.id)
        const projectId = req.params.id;
        const project = await Project.findById(projectId);

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        let arr = []
        let user1 = await User.findById( req.user.id );
        console.log("Prof -> ", user1)
        user1.pending.map(pId => {
          if(pId != projectId)
            arr.push(pId);
        })
        user1.pending = arr;
        let user1Updated = await User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: user1 },
          // { $push: { approved: projectId } },
          { new: true }
        );
        user1Updated = await User.findOneAndUpdate(
          { _id: req.user.id },
          // { $set: user1 },
          { $push: { approved: projectId } },
          { new: true }
        );
        console.log("Prof Updated -> ", user1Updated);

        arr = [];
        let user2 = await User.findOne({_id: project.user});
        console.log("Student -> ", user2)
        user2.pending.map(pId => {
          if(pId != projectId)
            arr.push(pId)
        })
        console.log("Student Id -> ", project.user)
        user2.pending = arr;
        let user2Updated = await User.findOneAndUpdate(
          { _id: project.user },
          { $set: user2 },
          // { $push: { approved: projectId } },
          { new: true }
        );
        user2Updated = await User.findOneAndUpdate(
          { _id: project.user },
          // { $set: user2 },
          { $push: { approved: projectId } },
          { new: true }
        );
        console.log("Student Updated -> ", user2Updated);

        project.status = "approved"
        const projectUpdated = await Project.findOneAndUpdate(
            { _id: projectId },
            { $set: project },
            { new: true }
          );
        console.log("Project Updated -> ", projectUpdated);


        res.json(project);
      } 
      catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
      }
    }
  );

  router.get('/pendingProjects', fetchuser, async(req,res) => {
    try {
      const user = await User.findById(req.user.id);
      if(!user) {
        return res.status(404).send("Not Found");
      }

      res.json(user.pending);
    }
    catch (error) {
      console.error(error.message)
      res.status(500).send("Internal server error");
    }
  })

  router.get('/approvedProjects', fetchuser, async(req,res) => {
    try {
      const user = await User.findById(req.user.id);
      if(!user) {
        return res.status(404).send("Not Found");
      }

      res.json(user.approved);
    }
    catch (error) {
      console.error(error.message)
      res.status(500).send("Internal server error");
    }
  })

  module.exports = router;