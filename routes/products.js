const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows); // Or res.render('products', { products: rows });
  });
});

router.post('/add', (req, res) => {
  const { title, description, price, image, category } = req.body;
  const sql = `INSERT INTO products (title, description, price, image, category) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [title, description, price, image, category], function (err) {
    if (err) return res.status(500).send(err.message);
    res.send(`Product added with ID ${this.lastID}`);
  });
});

module.exports = router;
