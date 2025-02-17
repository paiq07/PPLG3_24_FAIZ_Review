const db = require("../Config/db"); // Import koneksi database dari config/db.js
const dayjs = require("dayjs"); // Import dayjs untuk menangani format tanggal

module.exports = {
    // Fungsi untuk mengambil semua ulasan dari tabel reviews
    get: (req, res) => {
        db.query("SELECT * FROM reviews", (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message }); // Jika terjadi error, kirim respons 500
            }
            res.json(results); // Kirim hasil query sebagai JSON ke client
        });
    },

    // Fungsi untuk mengambil satu ulasan berdasarkan ID
    get1: (req, res) => {
        const reviewId = req.params.id;
        db.query("SELECT * FROM reviews WHERE id = ?", [reviewId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message }); // Tangani error database
            }
            if (results.length === 0) {
                return res.status(404).json({ error: "Ulasan tidak ditemukan." }); // Jika tidak ada data, kirim respons 404
            }
            res.json(results[0]); // Kirim ulasan yang ditemukan
        });
    },

    // Fungsi untuk menambahkan ulasan baru ke dalam database
    post: (req, res) => {
        const { book_id, user_id, rating, comment } = req.body;
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating harus antara 1 dan 5." }); // Validasi rating
        }

        const created_at = dayjs().format("YYYY-MM-DD HH:mm:ss"); // Format tanggal saat ini
        db.query(
            "INSERT INTO reviews (book_id, user_id, rating, comment, created_at) VALUES (?, ?, ?, ?, ?)",
            [book_id, user_id, rating, comment, created_at],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message }); // Tangani error database
                }
                res.status(201).json({ message: "Ulasan berhasil ditambahkan.", id: result.insertId }); // Kirim respons sukses dengan ID ulasan
            }
        );
    },

    // Fungsi untuk memperbarui ulasan berdasarkan ID
    put: (req, res) => {
        const reviewId = req.params.id;
        const { book_id, user_id, rating, comment } = req.body;
        const updated_at = dayjs().format("YYYY-MM-DD HH:mm:ss"); // Format tanggal saat ini

        if (rating !== undefined && (rating < 1 || rating > 5)) {
            return res.status(400).json({ error: "Rating harus antara 1 dan 5." }); // Validasi rating jika ada
        }

        db.query(
            "UPDATE reviews SET book_id = ?, user_id = ?, rating = ?, comment = ?, created_at = ? WHERE id = ?",
            [book_id, user_id, rating, comment, updated_at, reviewId],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message }); // Tangani error database
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: "Ulasan tidak ditemukan." }); // Jika tidak ada data yang diperbarui, kirim 404
                }
                res.json({ message: "Ulasan berhasil diperbarui." }); // Kirim respons sukses
            }
        );
    },

    // Fungsi untuk menghapus ulasan berdasarkan ID
    delete: (req, res) => {
        const reviewId = req.params.id;
        db.query("DELETE FROM reviews WHERE id = ?", [reviewId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message }); // Tangani error database
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Ulasan tidak ditemukan." }); // Jika tidak ada data yang dihapus, kirim 404
            }
            res.json({ message: "Ulasan berhasil dihapus." }); // Kirim respons sukses
        });
    }
};