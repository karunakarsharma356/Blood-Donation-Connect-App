const express = require("express");
const router = express.Router();

const {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
} = require("../controllers/donorControllers");

const { protect } = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getAllDonors);
router.get("/:id", getDonorById);

// Protected Routes
router.post("/", protect, createDonor);
router.put("/:id", protect, updateDonor);
router.delete("/:id", protect, deleteDonor);

module.exports = router;