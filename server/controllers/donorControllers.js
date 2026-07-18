const Donor = require("../models/Donor");

// ==============================
// GET ALL DONORS
// ==============================
const getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.find();

        res.status(200).json({
            success: true,
            totalDonors: donors.length,
            donors,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==============================
// CREATE DONOR
// ==============================
const createDonor = async (req, res) => {
    try {
        const donor = await Donor.create(req.body);

        res.status(201).json({
            success: true,
            message: "Donor Added Successfully",
            donor,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==============================
// GET SINGLE DONOR
// ==============================
const getSingleDonor = async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id);

        if (!donor) {
            return res.status(404).json({
                success: false,
                message: "Donor not found",
            });
        }

        res.status(200).json({
            success: true,
            donor,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==============================
// UPDATE DONOR
// ==============================
const updateDonor = async (req, res) => {
    try {
        const donor = await Donor.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!donor) {
            return res.status(404).json({
                success: false,
                message: "Donor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Donor Updated Successfully",
            donor,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==============================
// DELETE DONOR
// ==============================
const deleteDonor = async (req, res) => {
    try {
        const donor = await Donor.findByIdAndDelete(req.params.id);

        if (!donor) {
            return res.status(404).json({
                success: false,
                message: "Donor not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Donor Deleted Successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getAllDonors,
    createDonor,
    getSingleDonor,
    updateDonor,
    deleteDonor,
};