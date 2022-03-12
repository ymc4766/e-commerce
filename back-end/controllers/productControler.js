import asyncHandler from "express-async-handler";
import products from "../data/products.js";
import Product from "../models/productModel.js";

// here is  get /api/products  fetching all products
// from DB  ACESS public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          //this regex is for not for full sentence like iph = iphone
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//here fetching product by ther id
//we are are in api/products/:id
//hhh everything changer just review couple times
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

//delete product byId
//route  delete api/products/:id
//private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "product removed succesfully" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

//create product post
//route  post   /api/products
//private/admin

const createProduct = asyncHandler(async (req, res) => {
  const product = await new Product({
    name: "sample product",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample",
    countInStock: 0,
    numReviews: 0,
    description: "great product  i love it again buying it...",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//update  product put
//route  put   /api/products
//private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body;

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.numReviews = numReviews;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("product not found!");
  }
});

// CREATE NEW REVIEW
//route  pOST    /api/products/:ID/REVIEWS
//private

const createProductReviews = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  const alreadyReview = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReview) {
    res.status(400);
    throw new Error("already review");
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json({ message: "Review added" });
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReviews,
  getTopProducts,
};
