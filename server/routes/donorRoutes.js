const express = require("express");

const router = express.Router();

const {
    getAllDonors,
    createDonor,
    getSingleDonor,
    updateDonor,
    deleteDonor,
} = require("../controllers/donorControllers");

// Get all donors
router.get("/", getAllDonors);

// Get single donor
router.get("/:id", getSingleDonor);

// Create donor
router.post("/", createDonor);

// Update donor
router.put("/:id", updateDonor);

// Delete donor
router.delete("/:id", deleteDonor);

module.exports = router;
