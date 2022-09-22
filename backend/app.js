const express = require('express');
const app = express();
require('dotenv/config');
const morgan = require('morgan');

const api = process.env.API_URL;

app.use(express.json());
app.use(morgan('tiny'));

app.post(`${api}/products`, (req, res)=>{
  const newProduct = req.body;
  res.send(newProduct);
})

app.listen(3000, 
()=>{
    console.log('server running http://localhost:3000');
})
