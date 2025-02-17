const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");


const reviewcontroller = require('../Controler/review')

// GET: Ambil semua ulasan
router.get("/reviews", reviewcontroller.get);

// GET: Ambil ulasan berdasarkan ID
router.get("/review/:id", reviewcontroller.get1);

// POST: Tambahkan ulasan baru
router.post("/review", reviewcontroller.post);

// PUT: Update ulasan berdasarkan ID
router.put("/review/:id", reviewcontroller.put);

// DELETE: Hapus ulasan berdasarkan ID
router.delete("/review/:id", reviewcontroller.delete);

module.exports = router;