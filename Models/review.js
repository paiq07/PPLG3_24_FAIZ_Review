const dbPool = require("../Config/db");

const get = () => {
    const SQLQuery = `SELECT reviews.*, book.title AS book_title FROM reviews JOIN book ON reviews.book_id = book.id`;
    return dbPool.execute(SQLQuery);
};

const get1 = (id) => {
    const SQLQuery = `SELECT reviews.*, book.title AS book_title FROM reviews JOIN book ON reviews.book_id = book.id WHERE reviews.id = ?`;
    return dbPool.execute(SQLQuery, [id]);
};

const post = (body) => {
    const SQLQuery = `INSERT INTO reviews (book_id, user_id, rating, comment) VALUES (?, ?, ?, ?)`;
    return dbPool.execute(SQLQuery, [body.book_id, body.user_id, body.rating, body.comment]);
};

const put = (body, id) => {
    const SQLQuery = `UPDATE reviews SET book_id = ?, user_id = ?, rating = ?, comment = ? WHERE id = ?`;
    return dbPool.execute(SQLQuery, [body.book_id, body.user_id, body.rating, body.comment, id]);
};

const deleteReview = (id) => {
    const SQLQuery = `DELETE FROM reviews WHERE id = ?`;
    return dbPool.execute(SQLQuery, [id]);
};

module.exports = { get, get1, post, put, deleteReview };
