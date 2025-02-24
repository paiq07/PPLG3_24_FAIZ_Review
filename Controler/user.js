const User = require('../models/userModel');

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create User
const createUser = async (req, res) => {
    try {
        const { username, password, name , email , phone } = req.body;
        const newUser = await User.create({ username, password, name , email , phone });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllUsers, createUser };