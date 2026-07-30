const express = require("express");
const router = express.Router();

const {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
} = require("../controllers/requestControllers");

const { protect } = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getAllRequests);
router.get("/:id", getRequestById);

// Protected Routes
router.post("/", protect, createRequest);
router.put("/:id", protect, updateRequest);
router.delete("/:id", protect, deleteRequest);

module.exports = router;