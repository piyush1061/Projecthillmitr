const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const jwtSecret = "HaHa";

router.post(
  "/",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // console.log(req.body)
    // let user = await User.findOne({email:req.body.email})
    const salt = await bcrypt.genSalt(10);
    let securePass = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        // password: req.body.password,  first write this and then use bcryptjs
        password: securePass,
        email: req.body.email,
      })
        .then((user) => {
          const data = {
            user: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(data, jwtSecret);
          success = true;
          res.json({ success, authToken });
        })
        .catch((err) => {
          console.log(err);
          success=false;
          res.json({ success,error: "Please enter a unique value." });
        });
    } catch (error) {
      console.error(error.message);
      success=false;
      res.json({success,error:"An error occured"})
    }
  }
);
module.exports = router;
