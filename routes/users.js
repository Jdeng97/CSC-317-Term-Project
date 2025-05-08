const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Register User
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  db.run(sql, [name, email, password], function (err) {
    if (err) return res.status(500).send(err.message);
    res.send(`User registered with ID ${this.lastID}`);
  });
});

// Login (basic, without hashing)
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
    if (err) return res.status(500).send(err.message);
    if (!row) return res.status(401).send('Invalid credentials');
    res.send(`Welcome back, ${row.name}`);
  });
});

module.exports = router;
