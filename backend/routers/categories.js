const express = require('express');
const router = express.Router();
const {Category} = require('../models/category');

router.post(`/`, (req, res)=>{
  const category = new Category({
  });

  category.save().then(createdCategory => {
    res.status(201).json(createdCategory);
  }).catch(err => {
    res.status(500).json({error: err, success: false});
  })
});

router.get(`/`, async (req, res)=>{
  const categoryList = await Category.find();

  if(!categoryList) {
    res.status(500).json({success: false})
  }

  res.send(categoryList);
});

module.exports = router;