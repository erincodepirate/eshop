const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const bcrypt = require('bcryptjs');

router.post(`/`, async (req, res)=>{
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    color: req.body.color,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country
  });

  user = await user.save();

  if(!user) {
    res.status(400).json('the user could not be created or registered')
  }

  res.send(user)
});

router.get(`/`, async (req, res)=>{
  const userList = await User.find();

  if(!userList) {
    res.status(500).json({success: false})
  }

  res.send(userList);
});

module.exports = router;