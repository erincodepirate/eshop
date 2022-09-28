const express = require('express');
const router = express.Router();
const {Order} = require('../models/order');

router.post(`/`, (req, res)=>{
  const order = new Order({
  });

  order.save().then(createdOrder => {
    res.status(201).json(createdOrder);
  }).catch(err => {
    res.status(500).json({error: err, success: false});
  })
});

router.get(`/`, async (req, res)=>{
  const orderList = await Order.find();

  if(!orderList) {
    res.status(500).json({success: false})
  }

  res.send(orderList);
});

module.exports = router;