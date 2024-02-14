const User = require('../models/userModel')

// Login a user
const loginUser = async (req, res) => {
  res.json({mssg: 'login user'})
}

// Signup a user
const signupUser = async (req, res) => {
  const {email, username, password} = req.body

  try {
    const user = await User.signup(email, username, password)

    res.status(200).json({email, username, user})
  }
  catch (error) { 
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }