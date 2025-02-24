const ReviewModel = require("../Models/review");

const getReviews = async (req, res) => {
    try {
        const [data] = await ReviewModel.get();
        res.json({ message: "GET all reviews success", data });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const [data] = await ReviewModel.get1(id);
        if (data.length === 0) return res.status(404).json({ message: "Review not found" });
        res.json({ message: "GET review by ID success", data: data[0] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const createReview = async (req, res) => {
    const { book_id, user_id, rating, comment } = req.body;
    if (!book_id || !user_id || !rating) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        await ReviewModel.post(req.body);
        res.status(201).json({ message: "Review created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const updateReview = async (req, res) => {
    const { id } = req.params;
    try {
        await ReviewModel.put(req.body, id);
        res.json({ message: "Review updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        await ReviewModel.deleteReview(id);
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { getReviews, getReviewById, createReview, updateReview, deleteReview };
