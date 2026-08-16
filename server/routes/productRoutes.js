const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protectAdmin = require("../middleware/adminAuthMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// ==============================
// PUBLIC ROUTES
// ==============================

router.get("/", getProducts);

router.get("/:id", getProductById);

// ==============================
// ADMIN ROUTES
// ==============================

// ADD
router.post(
  "/",
  protectAdmin,
  upload.single("image"),
  createProduct
);

// UPDATE
router.put(
  "/:id",
  protectAdmin,
  upload.single("image"),
  updateProduct
);

// DELETE
router.delete(
  "/:id",
  protectAdmin,
  deleteProduct
);

module.exports = router;