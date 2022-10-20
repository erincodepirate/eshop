const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const salt = 10;
const secret = process.env.secret;

router.post(`/`, async (req, res)=>{
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    color: req.body.color,
    passwordHash: bcrypt.hashSync(req.body.password, salt),
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

router.post(`/register`, async (req, res)=>{
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    color: req.body.color,
    passwordHash: bcrypt.hashSync(req.body.password, salt),
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
  const userList = await User.find().select('-passwordHash');

  if(!userList) {
    res.status(500).json({success: false})
  }

  res.send(userList);
});

router.get(`/:id`, async (req, res)=>{
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) {
    res.status(500).json({success: false, message: 'The user with the given id was not found'})
  }

  res.status(200).send(user);
});

router.put(`/:id`, async (req, res)=>{
  const userExist = await User.findById(req.params.id);
  if (!userExist) {
    res.status(500).json({success: false, message: 'The user with the given id was not found'})
  }
  let newPassword = userExist.passwordHash;
  if (req.body.password) { // if new password
    newPassword = bcrypt.hashSync(req.body.password, salt);
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      color: req.body.color,
      passwordHash: newPassword,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country
    },
    { new: true } // return the new updated data
  );
  if (!user) {
    return res.status(400).send('The user cannot be updated!')
  }
  return res.send(user);
});

router.post('/login', async(req,res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    res.status(400).json({success: false, message: 'User not found'})
  }
  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {userId: user.id, isAdmin: user.isAdmin},
      secret,
      {expiresIn: '1d'}
      );
    return res.status(200).send({user: user.email, token: token});
  }
  return res.status(400).send('password is wrong');
});

router.get(`/get/count`, async (req, res)=> {
  const userCount = await User.countDocuments();

  if(!userCount){
    res.status(500).json({success: false})
  }
  res.send({userCount: userCount})

});

router.delete(`/:id`, (req, res)=>{
  User.findByIdAndRemove(req.params.id).then(user => {
    if (user) {
      return res.status(200).json({success:true, message:'The user is deleted.'})
    } else {
      return res.status(404).json({success:false, message:'User not found.'});
    }
  }).catch(err=>{
    return res.status(400).json({success:false, error: err});
  });
});

module.exports = router;