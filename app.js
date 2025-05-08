const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/database');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to Pet Paradise!');
});

// Sample route to get products
app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows); // Or render EJS template
  });
});

// Add product
app.post('/products/add', (req, res) => {
  const { title, description, price, image, category } = req.body;
  const sql = `INSERT INTO products (title, description, price, image, category)
               VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [title, description, price, image, category], function(err) {
    if (err) return res.status(500).send(err.message);
    res.send(`Product added with ID ${this.lastID}`);
  });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
