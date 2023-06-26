const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const JWD_secret = "ainisagoodboy"; 


// Create a user using POST "api/auth/createuser".No login required
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
   
      // if there are errors, return bad request with errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      
      // check if email already exists
      try{
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ error: 'Sorry, a user already exists with the same email id' });
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

      const data = {
        user:{
            id: user.id
        }
      }
      var authToken = jwt.sign({data}, JWD_secret);

                res.json({authToken});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("some error occured")
    }
    }  );  
  

module.exports = router;
