const express = require('express');
const router = express.Router();
const db = require('../Config/db');

// Get all categories
router.get('/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});

// Add a new category
router.post('/categories', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: results.insertId, name });
    }
  });
});

router.put('/categories/:id', (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({  message : 'Category Updated',id, name});
    }
  });
});

router.delete('/categories/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM categories WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({  message : 'Category Deleted',id});
    }
  });
});

module.exports = router;