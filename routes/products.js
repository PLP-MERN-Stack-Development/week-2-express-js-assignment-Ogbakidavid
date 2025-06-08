const express = require('express');
const { v4: uuidv4} = require('uuid');
// const authenticate = require('../middleware/authenticate');
const validateProduct = require('../middleware/validateProduct');
const NotFoundError = require('../middleware/notFoundError');
const productsData = require('../models/productData');

const router = express.Router();

let products = productsData.products;

// router.use();

// GET /api/products - List products, with optional category filter & pagination
router.get('/', (req, res) => {
  let filtered = [...products];

  // Filtering by Category
  if (req.query.category) {
    filtered = filtered.filter( p => p.category == req.query.category);
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page -1) * limit;
  const paginated = filtered.slice(start, start + limit);
  res.json({
    page,
    limit,
    total: filtered.length,
    products: paginated
  });

});


// TODO: Implement the following routes:

// GET /api/products/:id - Get a specific product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" })
  }
  res.json(product);
})

// POST /api/products - Create a new product
router.post('/', validateProduct, (req, res) => {
  const { name, description, price, category, inStock} = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct)
});

// PUT /api/products/:id - Update a product
router.put('/:id', validateProduct, (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found"});
  }

  const { name, description, price, category, inStock} = req.body;
  if ( name !== undefined ) product.name = name;
  if ( description !== undefined ) product.description = description;
  if ( price !== undefined ) product.price = price;
  if ( category !== undefined ) product.category = category;
  if ( inStock !== undefined ) product.inStock = inStock;

  res.json(product);
});

// DELETE /api/products/:id - Delete a product
router.delete('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found"});
  }
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).send();
});

// Search endpoint
router.get('/search', (req, res) => {
  const name = req.query.name ? req.query.name.toLowerCase() : '';
  const results = products.filter(p => p.name.toLowerCase().includes(name));
  res.json(results);
});

// Product statistics endpoint
router.get('/stats', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

module.exports = router;