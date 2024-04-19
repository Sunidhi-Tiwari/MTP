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
        const user = await User.findById(req.user.id)
        const { title, desc, prof, domain, imageUrl, image, urls } = req.body;
        console.log("Image -> ", image);
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        console.log("Student -> ", user.name);
        const project = await Project.create({
          user: req.user.id,
          title,
          desc,
          student: user.name,
          prof,
          domain,
          urls,
          imageUrl
          // urlDesc,
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


        // const user = await User.findById( req.user.id );
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

  router.delete('/deleteproject/:id', fetchuser, async (req, res) => {
    try {
      let project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).send("Not found");
      }
      // Allow deletion only if user owns this project
      if (project.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
  
      project = await Project.findByIdAndDelete(req.params.id);
      res.json({ Success: "Project has been deleted", project: project });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  })

  router.put("/updateproject/:id", fetchuser, async (req, res) => {
    try {
      const { title, desc } = req.body;
      // Create a new project object
      const newProject = {};
      if (title) newProject.title = title;
      if (desc) newProject.desc = desc;
  
      // FInd the project to be updated and update it
      let project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).send("Not found");
      }
  
      if (project.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
  
      project = await Project.findByIdAndUpdate(
        req.params.id,
        { $set: newProject },
        { new: true }
      );
      res.json({ project });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  });


  router.put("/approveProject/:id", fetchuser, async (req, res) => {
    try {
      let user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).send("User Not found");
      }
      // FInd the project to be approved
      let project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).send("Not found");
      }

      if(user.name !== project.prof){
        return res.status(404).send("You can not approve this project");
      }


      const newProject = {};
        newProject.status = "approved";
  
  
      // if (project.user.toString() !== req.user.id) {
      //   return res.status(401).send("Not Allowed");
      // }
  
      project = await Project.findByIdAndUpdate(
        req.params.id,
        { $set: newProject },
        { new: true }
      );
      res.json({ project });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  });

  module.exports = router;