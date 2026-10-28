const express = require('express');
const path = require('path');
const catalog = require('./catalog');

const PROMOS = { FALL10: 10, WELCOME15: 15 };

function createApp() {
  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.get('/api/products', (req, res) => res.json(catalog));

  app.get('/api/promos/:code', (req, res) => {
    const pct = PROMOS[req.params.code];
    if (!pct) return res.status(404).json({ error: 'Promo code not found' });
    res.json({ code: req.params.code, percentOff: pct });
  });

  app.post('/api/orders', (req, res) => {
    const { items } = req.body || {};
    if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: 'cart is empty' });
    res.status(201).json({ id: 'ord_' + Date.now(), items });
  });

  return app;
}

module.exports = { createApp, PROMOS };
