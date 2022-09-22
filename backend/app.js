const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

const api = process.env.API_URL;

app.use(express.json());
app.use(morgan('tiny'));

app.post(`${api}/products`, (req, res)=>{
  const newProduct = req.body;
  res.send(newProduct);
})

mongoose.connect('mongodb://127.0.0.1:27017/eshop').then(()=> {
  console.log('Database Connection is ready...')
}).catch((e)=>{
  console.log(e)
})

app.listen(3000, 
()=>{
    console.log('server running http://localhost:3000');
})
