const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const {Product} = require('../models/product');
const mongoose = require('mongoose');
const multer = require('multer');

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const uploadFolder = 'public/uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('invalid image type');

    if(isValid){
      uploadError = null;
    }

    cb(uploadError, uploadFolder);
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replace(' ', '-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  }
})

const uploadOptions = multer({ storage: storage })


router.post(`/`, uploadOptions.single('image'), async (req, res)=>{
  const category = await Category.findById(req.body.category);
  if(!category)
  return res.status(400).send('Invalid category');

  const file = req.file;
  if(!file)
  return res.status(400).send('No image in request');

  const fileName = file.filename;
  const basePath = `${req.protocol}://${req.get('host')}/${uploadFolder}`

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}/${fileName}`,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured
  });

  product = await product.save();
  if(!product)
  return res.status(500).send('The product cannot be created');

  res.send(product);
});

router.get(`/`, async (req, res)=>{
  let filter = {};
  if(req.query.categories){
    filter = {category: req.query.categories.split(',')};
  }

  const productList = await Product.find(filter).populate('category'); //.select('name image -_id');

  if(!productList) {
    res.status(500).json({success: false})
  }

  res.send(productList);
});

router.get(`/:id`, async (req, res)=>{
  const product = await Product.findById(req.params.id).populate('category');

  if(!product) {
    res.status(500).json({success: false})
  }

  res.send(product);
});

router.put(`/:id`, uploadOptions.single('image'), async (req, res)=>{
  if(!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send('Invalid product id');
  }
  const category = await Category.findById(req.body.category);
  if(!category)
  return res.status(400).send('Invalid category');

  const product = await Product.findById(req.params.id);
  if(!product)
  return res.status(400).send('Invalid product')

  const file = req.file;
  let imagepath;

  if(file){
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/${uploadFolder}`
    imagepath = `${basePath}/${fileName}`;
  } else {
    imagepath = product.image;
  }
  
  const updatedproduct = Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: imagepath,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured
    }, {new: true});

  if(!updatedproduct)
  return res.status(500).send('The product cannot be updated');

  res.send(product);
});

router.delete(`/:id`, (req, res)=>{
  Product.findByIdAndRemove(req.params.id).then(product => {
    if (product) {
      return res.status(200).json({success:true, message:'The product is deleted.'})
    } else {
      return res.status(404).json({success:false, message:'Product not found.'});
    }
  }).catch(err=>{
    return res.status(400).json({success:false, error: err});
  });
});

router.get(`/get/count`, async (req, res)=> {
  const productCount = await Product.countDocuments();

  if(!productCount){
    res.status(500).json({success: false})
  }
  res.send({productCount: productCount})

});

router.get(`/get/featured/:count`, async (req, res)=> {
  const count = parseInt(req.params.count) ? req.params.count : 0;
  const products = await Product.find({isFeatured: true}).limit(count);

  if(!products){
    res.status(500).json({success: false})
  }
  res.send(products)

});

router.put(`/gallery-images/:id`,
  uploadOptions.array('images', 10),
  async (req, res)=>{
  if(!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send('Invalid product id');
  }
  const files = req.files;
  let imagePaths = [];

  if(files) {
    files.map(file => {
      imagePaths.push(file.filename);
    });
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      images: imagePaths,
    }, {new: true});

  if(!product)
  return res.status(500).send('The product cannot be updated');

  res.send(product);
});

module.exports = router;