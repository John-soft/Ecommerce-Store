const express = require("express");
const router = express.Router();
const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  getCoupon,
  deleteCoupon,
} = require("../controllers/couponController");
const { authProtect, isAdmin } = require("../middlewares/authMiddleware");

router
  .route("/")
  .post(authProtect, isAdmin, createCoupon)
  .get(authProtect, isAdmin, getAllCoupons);

router
  .route("/:id")
  .patch(authProtect, isAdmin, updateCoupon)
  .get(authProtect, isAdmin, getCoupon)
  .delete(authProtect, isAdmin, deleteCoupon);

module.exports = router;
