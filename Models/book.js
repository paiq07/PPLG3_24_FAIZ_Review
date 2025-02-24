const dbPool = require("../Config/db");

const getindex = () => {
    const SQLQuery = "SELECT * FROM book";
    return dbPool.execute(SQLQuery);
};

const getByid = (id) => {
    const SQLQuery = "SELECT * FROM book WHERE id = ?";
    return dbPool.execute(SQLQuery, [id]);
};

const createnew = (body) => {
    const SQLQuery = `INSERT INTO book (title, writer, publisher, year, user_id, category_id) VALUES (?, ?, ?, ?, ?, ?)`;
    return dbPool.execute(SQLQuery, [
        body.title,
        body.writer,
        body.publisher,
        body.year,
        body.user_id,
        body.category_id
    ]);
};

const updateUser = (body, id) => {
    const SQLQuery = `UPDATE book SET title = ?, writer = ?, publisher = ?, year = ?, user_id = ?, category_id = ? WHERE id = ?`;
    return dbPool.execute(SQLQuery, [
        body.title,
        body.writer,
        body.publisher,
        body.year,
        body.user_id,
        body.category_id,
        id
    ]);
};

const deleteUser = (id) => {
    const SQLQuery = `DELETE FROM book WHERE id = ?`;
    return dbPool.execute(SQLQuery, [id]);
};

module.exports = { getindex, getByid, createnew, updateUser, deleteUser };
