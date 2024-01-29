const express = require("express");
const router = express.Router();
const { isAdmin, authProtect } = require("../middlewares/authMiddleware");
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
} = require("../controllers/productController");
const {
  uploadPhoto,
  productImageResize,
} = require("../middlewares/uploadImages");

router.route("/").post(authProtect, isAdmin, createProduct).get(getAllProducts);
router.route("/wishlist").patch(authProtect, addToWishlist);
router.route("/rating").patch(authProtect, rating);
router
  .route("/upload/:id")
  .patch(
    authProtect,
    isAdmin,
    uploadPhoto.array("images", 10),
    productImageResize,
    uploadImages
  );
router
  .route("/:id")
  .get(getProduct)
  .patch(authProtect, isAdmin, updateProduct)
  .delete(authProtect, isAdmin, deleteProduct);

module.exports = router;
