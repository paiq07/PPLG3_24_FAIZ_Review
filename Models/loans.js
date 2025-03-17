const db = require("../Config/db");

class Loan {
    // Mengambil semua data peminjaman dengan informasi buku terkait
    static async getAll() {
        const [results] = await db.execute(`
            SELECT loans.*, book.title AS book_title, book.writer AS book_writer
            FROM loans
            JOIN book ON loans.book_id = book.id
        `);
        return results;
    }

    // Cek apakah buku masih bisa dipinjam
    static async isBookAvailable(book_id) {
        const [results] = await db.execute(
            "SELECT COUNT(*) AS count FROM loans WHERE book_id = ? AND status = 'borrowed'",
            [book_id]
        );
        return results[0].count === 0; // True jika buku tersedia, False jika sudah dipinjam
    }

    // Mengambil data peminjaman berdasarkan ID
    static async getById(id) {
        const [results] = await db.execute("SELECT * FROM loans WHERE id = ?", [id]);
        return results.length > 0 ? results[0] : null;
    }

    // Menambahkan data peminjaman baru (user_id tetap ada tetapi tidak memiliki relasi)
    static async create(book_id, user_id, loan_date, return_date) {
        // Cek apakah buku masih tersedia
        const isAvailable = await this.isBookAvailable(book_id);
        if (!isAvailable) {
            throw new Error("Buku sedang dipinjam oleh user lain.");
        }

        // Insert data peminjaman dengan status 'borrowed'
        const [result] = await db.execute(
            "INSERT INTO loans (book_id, user_id, loan_date, return_date, status) VALUES (?, ?, ?, ?, 'borrowed')",
            [book_id, user_id, loan_date, return_date]
        );
        return result.insertId;
    }

    // Mengupdate data peminjaman
    static async update(id, book_id, user_id, loan_date, return_date) {
        // Cek apakah buku yang baru dipilih sedang dipinjam oleh user lain
        const isAvailable = await this.isBookAvailable(book_id);
        if (!isAvailable) {
            throw new Error("Buku sedang dipinjam oleh user lain.");
        }

        const [result] = await db.execute(
            "UPDATE loans SET book_id = ?, user_id = ?, loan_date = ?, return_date = ? WHERE id = ?",
            [book_id, user_id, loan_date, return_date, id]
        );
        return result.affectedRows;
    }

    // Menghapus data peminjaman (hanya bisa menghapus jika status bukan 'borrowed')
    static async delete(id) {
        const loan = await this.getById(id);
        if (!loan) {
            throw new Error("Loan not found.");
        }
        if (loan.status === 'borrowed') {
            throw new Error("Cannot delete a loan that is still active (borrowed).");
        }

        const [result] = await db.execute("DELETE FROM loans WHERE id = ?", [id]);
        return result.affectedRows;
    }
}

module.exports = Loan;