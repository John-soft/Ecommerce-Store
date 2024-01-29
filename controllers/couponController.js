const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const validateMongoId = require("../utils/validateMongoId");

const createCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.json(coupon);
});

const getAllCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find();
  res.json(coupons);
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(updatedCoupon);
});

const getCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const coupon = await Coupon.findById(id);
  res.json(coupon);
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedCoupon = await Coupon.findByIdAndDelete(id);
  res.json(deletedCoupon);
});

module.exports = {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  getCoupon,
  deleteCoupon,
};
