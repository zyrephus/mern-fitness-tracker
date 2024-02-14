const User = require('../models/userModel')

// Login a user
const loginUser = async (req, res) => {
  res.json({mssg: 'login user'})
}

// Signup a user
const signupUser = async (req, res) => {
  res.json({mssg: 'signup user'})
}

module.exports = { signupUser, loginUser }