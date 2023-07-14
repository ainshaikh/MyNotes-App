const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require ("../middleware/fetchuser.js")
const JWT_secret = "ainisagoodboy"; 


// Route 1: Create a user using POST "api/auth/createuser".No login required
router.post(
  "/createuser",
  [
    // Validation of email, name and password
    body("name").isLength({ min: 3 }).withMessage("Enter a name"),
    body("email").isEmail().withMessage("Enter an email address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters"),
  ],
  async (req, res) => {
    let success = false;
   
      // if there are errors, return bad request with errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
      }

      
      // check if email already exists
      try{
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({success, error: 'Sorry, a user already exists with the same email id' });
      }

        // creating password hash
      const salt = await bcrypt.genSalt(10);
      const secretPassword = await bcrypt.hash(req.body.password, salt);
      // create a new user
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secretPassword,
      });
      // Token authentication with JWT
      const data = {
        user:{
            id: user.id
        }
      }
      var authtoken = jwt.sign({data}, JWT_secret);

      success = true; 

                res.json({success, authtoken});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("some error occured")
    }
    }  );  


    //Route 2:  Authenticate  a user using POST "api/auth/Nologin".
    router.post(
        "/login",
        [
          // Validation of email, name and password
          
          body("email").isEmail().withMessage("Enter an email address"),
          body("password")
            .isLength({ min: 5 })
            .withMessage("Password cannot be empty"),
        ],
        async (req, res) => {
          let success = false;
         
            // if there are errors, return bad request with errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            const {email, password} = req.body;
            try{
                let user = await User.findOne({email});
                if(!user){
                    return res.status(400).json({error: "please write correct credentials"})
                }
                const passwordCompare = await bcrypt.compare(password, user.password);
                if(!passwordCompare){
                  success = false;
                    return res.status(400).json({success, error: "please write correct credentials"})
                }
                const data = {
                    user:{
                        id: user.id
                    }
                  }
                  var authToken = jwt.sign({data}, JWT_secret);
                  success = true;
                            res.json({success, authToken});
            }
            catch(err){
                console.log(err.message);
                res.status(500).send("Internal server Error")
            }
        })

         //Route 3:  Get loggedin user data  details using POST "api/auth/getuser". login required.

         router.post(
          "/getuser", fetchuser, async (req, res) => {  // fetchuser is a middleware
            try {
              
             const userId  = req.user.id;
              const user = await User.findById(userId).select("-password")
              if (!user) {
                return res.status(404).send("User not found");
              }
           
              res.send(userId);
            } catch (error) {
              console.log(error.message);
              res.status(500).send("Internal server error")
            }
          })


    

module.exports = router;
