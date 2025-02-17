const mysql = require("mysql"); // Import modul MySQL untuk Node.js

// Membuat koneksi ke database MySQL
const db = mysql.createConnection({
    host: "127.0.0.1",  // Alamat host database (sesuaikan jika menggunakan server lain)
    user: "root",       // Nama pengguna MySQL (gantilah jika menggunakan user lain)
    password: "",       // Password MySQL (kosong jika tidak ada password)
    database: "book"    // Nama database yang digunakan
});

// Menghubungkan ke database
db.connect((err) => {
    if (err) {
        console.error("Koneksi ke database gagal: " + err.message); // Menampilkan pesan error jika koneksi gagal
        return;
    }
    console.log("Terhubung ke database MySQL"); // Pesan sukses jika koneksi berhasil
});

module.exports = db; // Mengekspor koneksi database agar bisa digunakan di file lain