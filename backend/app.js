const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

const api = process.env.API_URL;

// routes
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');

app.use(express.json());
app.use(morgan('tiny'));

app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);

mongoose.connect('mongodb://127.0.0.1:27017/eshop').then(()=> {
  console.log('Database Connection is ready...')
}).catch((e)=>{
  console.log(e)
})

app.listen(3000, 
()=>{
    console.log('server running http://localhost:3000');
})
