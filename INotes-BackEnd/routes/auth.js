const express = require('express');
const User = require('../models/User');
const router = express.Router();
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');

//Create a user using : Post "/api/auth". It Doesn't require Auth
router.post('/',[
    body('name','Enter a valid name').isLength({ min: 2 }),
      // email must be an email
  body('email','Enter a valid email').isEmail(),
  // password must be at least 5 chars long
  body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
], (req,res)=>{
     // Finds the validation errors in this request and wraps them in an object with handy functions
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err=> { console.log(err)
        res.json({error:'Please enter a unique email',message: err.message})})
    // res.send(req.body)
})
module.exports = router