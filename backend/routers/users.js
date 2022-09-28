const express = require('express');
const router = express.Router();
const {User} = require('../models/user');

router.post(`/`, (req, res)=>{
  const user = new User({
  });

  user.save().then(createdUser => {
    res.status(201).json(createdUser);
  }).catch(err => {
    res.status(500).json({error: err, success: false});
  })
});

router.get(`/`, async (req, res)=>{
  const userList = await User.find();

  if(!userList) {
    res.status(500).json({success: false})
  }

  res.send(userList);
});

module.exports = router;