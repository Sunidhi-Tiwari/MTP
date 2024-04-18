// const router = require("express").Router();
// const { User } = require("../models/User");
// const bcrypt = require("bcrypt");
// const Joi = require("joi");
// const fetchuser = require('../middleware/fetchuser')

// router.post("/", async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error)
//       return res.status(400).send({ message: error.details[0].message });

//     const user = await User.findOne({ email: req.body.email });
//     if (!user)
//       return res.status(401).send({ message: "Invalid Email or Password" });

//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!validPassword)
//       return res.status(401).send({ message: "Invalid Email or Password" });

//     const token = user.generateAuthToken();
//     res.status(200).send({ data: token, message: "logged in successfully" });
//   } catch (error) {
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

// const validate = (data) => {
//   const schema = Joi.object({
//     email: Joi.string().email().required().label("Email"),
//     password: Joi.string().required().label("Password"),
//   });
//   return schema.validate(data);
// };

// module.exports = router;


const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'ItsSaturdayToday'

// Route 1: create a user using :POST "api/auth/createuser". No Loginn required 
router.post('/createuser', 
    // [   
    //     body('name').isLength({min:3}),
    //     body('email').isEmail(),
    //     body('password').isLength({min:5}),
    // ],
    async (req,res)=>{
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    const {name, rollNumber, phone, email, password} = req.body;
    console.log(name);
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors : errors.array()});
    }
    // check whether the user with same email already exists
    console.log("1");
    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.statue(400).json({success, error: "Sorry a user with this email already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        console.log("2");
        console.log(req.body.name);
        user = await User.create({
            name: req.body.name,
            type: "prof",
            rollNumber: req.body.rollNumber,
            phone: req.body.phone,
            email: req.body.email,
            password: secPass,
        })
        console.log("3");
        // .then(user => res.json(user))
        // .catch(err => {console.log(err)
        // res.json({error: "Please enter a uniqe email", message: err.message})})
        const data = {
            user:{
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        res.json({success, authToken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some errror occured");
    }

})


// Route 2: Authenticate a user using :POST "api/auth/login". No Login required 
router.post('/login', 
    [   
        body('email','Enter a valid Email').isEmail(),
        body('password','Please enter password').exists()
    ],
    async (req,res)=>{
        let success = false;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success, errors : errors.array()});
        }

        const {email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
               return res.status(400).json({success, error: "Sorry, user doesn't exists"})
            }

            const passwordCompare = await bcrypt.compare(password, user.password);

            if(!passwordCompare){
                return res.status(400).json({success, error: "Sorry, password didn't match"})
            }

            const data = {
                user:{
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        success = true;
        res.json({success, authToken});
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send({error:"Internal Server error"});
        }
});

// Route 3: Get loggedin user details :POST "api/auth/getuser". N Login required 

router.get('/getuser', fetchuser,
    
    async (req,res)=>{
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select('-password');
            console.log(user);
            res.send(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error");
        }
    });

module.exports = router;