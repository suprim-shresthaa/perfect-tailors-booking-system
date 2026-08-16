const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");

// =====================================================
// HELPER - UPLOAD IMAGE TO CLOUDINARY
// =====================================================
const uploadImageToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "perfect-tailors/products",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(buffer);
  });
};

// =====================================================
// ADD PRODUCT
// =====================================================
const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      availableColors,
      sizes,
      measurements,
      isAvailable,
      isFeatured,
    } = req.body;

    // Check image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    // Upload image
    const uploadResult = await uploadImageToCloudinary(req.file.buffer);

    // Parse colors if sent as JSON/string
    let parsedColors = availableColors;

    if (typeof availableColors === "string") {
      try {
        parsedColors = JSON.parse(availableColors);
      } catch {
        parsedColors = availableColors
          .split(",")
          .map((color) => color.trim())
          .filter(Boolean);
      }
    }

    // Parse sizes
    let parsedSizes = sizes;

    if (typeof sizes === "string") {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch {
        parsedSizes = sizes
          .split(",")
          .map((size) => size.trim())
          .filter(Boolean);
      }
    }

    // Parse measurements
    let parsedMeasurements = measurements;

    if (typeof measurements === "string") {
      try {
        parsedMeasurements = JSON.parse(measurements);
      } catch {
        parsedMeasurements = {};
      }
    }

    // Create product
    const product = await Product.create({
      name,
      category,
      description,
      price,
      image: uploadResult.secure_url,
      availableColors: parsedColors || [],
      sizes: parsedSizes || [],
      measurements: parsedMeasurements || {},
      isAvailable:
        isAvailable === undefined
          ? true
          : isAvailable === "true" || isAvailable === true,
      isFeatured:
        isFeatured === undefined
          ? false
          : isFeatured === "true" || isFeatured === true,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL PRODUCTS
// =====================================================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ONE PRODUCT
// =====================================================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get product error:", error);

    res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }
};

// =====================================================
// UPDATE PRODUCT
// =====================================================
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      availableColors,
      sizes,
      measurements,
      isAvailable,
      isFeatured,
    } = req.body;

    // Find existing product
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Parse colors
    let parsedColors = availableColors;

    if (typeof availableColors === "string") {
      try {
        parsedColors = JSON.parse(availableColors);
      } catch {
        parsedColors = availableColors
          .split(",")
          .map((color) => color.trim())
          .filter(Boolean);
      }
    }

    // Parse sizes
    let parsedSizes = sizes;

    if (typeof sizes === "string") {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch {
        parsedSizes = sizes
          .split(",")
          .map((size) => size.trim())
          .filter(Boolean);
      }
    }

    // Parse measurements
    let parsedMeasurements = measurements;

    if (typeof measurements === "string") {
      try {
        parsedMeasurements = JSON.parse(measurements);
      } catch {
        parsedMeasurements = {};
      }
    }

    // Update fields
    product.name = name;
    product.category = category;
    product.description = description;
    product.price = price;
    product.availableColors = parsedColors || [];
    product.sizes = parsedSizes || [];
    product.measurements = parsedMeasurements || {};

    product.isAvailable =
      isAvailable === undefined
        ? product.isAvailable
        : isAvailable === "true" || isAvailable === true;

    product.isFeatured =
      isFeatured === undefined
        ? product.isFeatured
        : isFeatured === "true" || isFeatured === true;

    // =================================================
    // NEW IMAGE
    // =================================================
    if (req.file) {
      const uploadResult = await uploadImageToCloudinary(
        req.file.buffer
      );

      product.image = uploadResult.secure_url;
    }

    // Save
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// DELETE PRODUCT
// =====================================================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);

    res.status(400).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

// =====================================================
// EXPORT
// =====================================================
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};