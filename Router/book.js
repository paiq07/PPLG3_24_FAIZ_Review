const express = require("express");
const router = express.Router();
const bookController = require("../Controler/book");

router.get("/books", bookController.getindex);
router.get("/books/:id", bookController.getByid);
router.post("/books", bookController.createNew);
router.put("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);

module.exports = router;
