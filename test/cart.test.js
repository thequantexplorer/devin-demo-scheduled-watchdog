const test = require('node:test');
const assert = require('node:assert');
const Cart = require('../public/cart');

const mug = { sku: 'SKU-MUG', name: 'Camp Mug', priceCents: 1800 };

test('adding the same item twice bumps quantity', () => {
  const lines = Cart.addItem(Cart.addItem([], mug), mug);
  assert.strictEqual(lines.length, 1);
  assert.strictEqual(lines[0].qty, 2);
});

test('totals apply percent discounts', () => {
  const lines = [{ ...mug, qty: 2 }];
  assert.deepStrictEqual(Cart.cartTotals(lines, 10), { subtotal: 3600, discount: 360, total: 3240 });
});

test('money formats cents', () => {
  assert.strictEqual(Cart.money(34900), '$349.00');
});
