const BookModel = require("../Models/book");

const getindex = async (req, res) => {
    try {
        const [data] = await BookModel.getindex();
        res.json({ message: "GET all books success", data });
    } catch (error) {
        res.status(500).json({ message: "Server Error", serverMessage: error.message });
    }
};

const getByid = async (req, res) => {
    const { id } = req.params;
    try {
        const [data] = await BookModel.getByid(id);
        if (data.length === 0) return res.status(404).json({ message: "Book not found" });
        res.json({ message: "GET book by ID success", data: data[0] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", serverMessage: error.message });
    }
};

const createNew = async (req, res) => {
    try {
        await BookModel.createnew(req.body);
        res.status(201).json({ message: "Book created successfully", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", serverMessage: error.message });
    }
};

const updateBook = async (req, res) => {
    const { id } = req.params;
    try {
        await BookModel.updateUser(req.body, id);
        res.json({ message: "Book updated successfully", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", serverMessage: error.message });
    }
};

const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        await BookModel.deleteUser(id);
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", serverMessage: error.message });
    }
};

module.exports = { getindex, getByid, createNew, updateBook, deleteBook };
