const {Router} =  require('express');
const bcrypt = require('bcryptjs')
const User = require('../db/user.model');
const router = Router()
require('dotenv').config();
const {check , validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')

// /api/auth/signup
router.post(
  '/signup', 
  [
    check('username')
      .isLength({min: 4})
      .withMessage('Minimal length for username is 4 character')
      .custom(username => !/\s/.test(username))
      .withMessage('No spaces are allowed in the username field')
      .toLowerCase(),
    check('password', 'Minimal length for password is 6 character').isLength({min:6})
  ],
  async (req, res) => { 
  try {
    const errors = validationResult(req)
     
    if(!errors.isEmpty()){
      return res.status(400).json({
        errors: errors.array(),
        msg: "you have sent incorrect sign up data"
      })
    }

    const {username, password, passwordRpt} = req.body
    const candidate = await User.findOne({username});
    if(candidate) {
      return res.status(400).json({msg: "This Username is already taken"})
    } 
    if (password != passwordRpt) {
      return res.status(400).json({msg: "Password fields do not match"})
    }

    const hashedPassword =  await bcrypt.hash(password, 12)

    await new User({username, password: hashedPassword}).save()
    //sending back user data for logging in right after signing up
    const user = await User.findOne({username})
    const token = jwt.sign(
      { userId: user._id, username:user.username },
      process.env.JWT_SECRET,
      {expiresIn: '1w' }
    )
    res.status(201).json({ token, userId: user._id, username:user.username })
    console.log('success signup');
  } catch (e) {
    res.status(500).json({msg: e.message})
  }
 } )



// /api/auth/login
router.post(
  '/login',
  [
    check('username', 'enter correct username')
      .exists()
      .toLowerCase(),
    check('password')
      .exists()
      .withMessage('enter your password')
  ],
  async (req, res) => { 
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          msg: 'incorrect login data'
        })
      }

      const {username, password} = req.body;
      const candidate = await User.findOne({username})
  
      if(!candidate ){
        return res.status(400).json({msg: "Wrong username or password"})
      }
      const isMatch = await bcrypt.compare(password, candidate.password)
      if( !isMatch){
        return res.status(400).json({msg: "Wrong username or password"})
      }

      const token = jwt.sign(
        { userId: candidate._id, username:candidate.username },
        process.env.JWT_SECRET,
        {expiresIn: '1w' }
      )
      res.json({ token, userId: candidate._id, username:candidate.username })
      console.log('success login');
    } catch (e) {
      res.status(500).json({msg: e.message})
      console.log(e.message);
    }

  })
module.exports = router