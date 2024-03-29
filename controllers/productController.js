const Product = require("../models/productModel");
const asyncWrapper = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/userModel");

const createProduct = asyncWrapper(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
});

const getAllProducts = asyncWrapper(async (req, res) => {
  //filtering
  const queryObj = { ...req.query };
  const excludeFields = ["page", "limit", "sort", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);
  console.log(queryObj);
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = Product.find(JSON.parse(queryStr));

  //sorting
  if (req.query.sort) {
    let sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //limiting fields
  if (req.query.fields) {
    let fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  //pagiation
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);
  if (req.query.page) {
    const productsCount = await Product.countDocuments();
    if (skip >= productsCount) {
      throw new Error("This page is not found");
    }
  }

  let product = await query;
  res.json({ product });
});

const getProduct = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) throw new Error("User with the provided ID does not exist");
  res.status(200).json({
    product,
  });
});

const updateProduct = asyncWrapper(async (req, res) => {
  const id = req.body._id;
  const updatedProduct = await Product.findOneAndUpdate({ id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedProduct) throw new Error("Can't update product, try again");
  res.status(201).json({ updatedProduct });
});

const deleteProduct = asyncWrapper(async (req, res) => {
  const id = req.body._id;
  const deletedProduct = await Product.findOneAndDelete({ id });
  if (!deletedProduct) throw new Error("Can't delete product, try again");
  res.status(201).json({
    message: "Product deleted",
  });
});

const addToWishlist = asyncWrapper(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  const user = await User.findById(_id);
  const alreadyAdded = user?.wishlist.find((id) => id.toString() === prodId);
  if (alreadyAdded) {
    let user = await User.findByIdAndUpdate(
      _id,
      {
        $pull: { wishlist: prodId },
      },
      {
        new: true,
      }
    );
    res.json(user);
  } else {
    let user = await User.findByIdAndUpdate(
      _id,
      {
        $push: { wishlist: prodId },
      },
      {
        new: true,
      }
    );
    res.json(user);
  }
});

///explain more ------- try to understand
const rating = asyncWrapper(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;

  const product = await Product.findById(prodId);
  const alreadyRated = product.ratings.find(
    (userId) => userId.postedBy.toString() === _id.toString()
  );
  if (alreadyRated) {
    const updateRating = await Product.findOneAndUpdate(
      {
        ratings: { $elemMatch: alreadyRated },
      },
      {
        $set: { "ratings.$.star": star, "ratings.$.comment": comment },
      },
      {
        new: true,
      }
    );
  } else {
    const rateProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        $push: {
          ratings: {
            star: star,
            comment: comment,
            postedBy: _id,
          },
        },
      },
      {
        new: true,
      }
    );
  }

  const getAllRatings = await Product.findById(prodId);
  let totalRatings = getAllRatings.ratings.length;
  let ratingSum = getAllRatings.ratings
    .map((item) => item.star)
    .reduce((a, b) => a + b, 0);
  let actualRating = Math.round(ratingSum / totalRatings);
  let finalProductRating = await Product.findByIdAndUpdate(
    prodId,
    {
      totalRatings: actualRating,
    },
    { new: true }
  );
  res.json(finalProductRating);
});

const uploadImages = asyncWrapper(async (req, res) => {
  console.log(req.files);
});

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
};
