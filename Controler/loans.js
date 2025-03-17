const Loan = require("../models/loans");

const getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.getAll();
        res.status(200).json(loans);
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

const createLoan = async (req, res) => {
    const { book_id, user_id, loan_date, return_date } = req.body;

    // Validasi input
    if (!book_id || !user_id || !loan_date) {
        return res.status(400).json({ error: "book_id, user_id, and loan_date are required" });
    }
    if (return_date && new Date(return_date) < new Date(loan_date)) {
        return res.status(400).json({ error: "return_date must be after loan_date" });
    }

    try {
        // Cek apakah buku masih tersedia
        const isAvailable = await Loan.isBookAvailable(book_id);
        if (!isAvailable) {
            return res.status(400).json({ error: "Buku sedang dipinjam oleh user lain" });
        }

        // Buat peminjaman
        const id = await Loan.create(book_id, user_id, loan_date, return_date);
        res.status(201).json({ message: "Loan Created", id, book_id, user_id, loan_date, return_date });
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

const updateLoan = async (req, res) => {
    const { book_id, user_id, loan_date, return_date } = req.body;
    const { id } = req.params;

    // Validasi input
    if (!book_id || !user_id || !loan_date) {
        return res.status(400).json({ error: "book_id, user_id, and loan_date are required" });
    }
    if (return_date && new Date(return_date) < new Date(loan_date)) {
        return res.status(400).json({ error: "return_date must be after loan_date" });
    }

    try {
        // Cek apakah buku baru yang dipilih masih tersedia
        const isAvailable = await Loan.isBookAvailable(book_id);
        if (!isAvailable) {
            return res.status(400).json({ error: "Buku sedang dipinjam oleh user lain" });
        }

        // Update peminjaman
        const affectedRows = await Loan.update(id, book_id, user_id, loan_date, return_date);
        if (affectedRows === 0) {
            return res.status(404).json({ error: "Loan not found" });
        }

        res.status(200).json({ message: "Loan Updated", id, book_id, user_id, loan_date, return_date });
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

const deleteLoan = async (req, res) => {
    const { id } = req.params;

    try {
        // Cek status loan sebelum dihapus
        const loan = await Loan.getById(id);
        if (!loan) {
            return res.status(404).json({ error: "Loan not found" });
        }
        if (loan.status === 'borrowed') {
            return res.status(400).json({ error: "Cannot delete a loan that is still active (borrowed)" });
        }

        // Hapus peminjaman
        const affectedRows = await Loan.delete(id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: "Loan not found" });
        }

        res.status(200).json({ message: "Loan Deleted", id });
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllLoans, createLoan, updateLoan, deleteLoan };