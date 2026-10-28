// Pure cart math, shared by the browser and the unit tests.
(function (root) {
  function lineTotal(line) {
    return line.priceCents * line.qty;
  }

  function cartTotals(lines, percentOff) {
    const subtotal = lines.reduce((sum, l) => sum + lineTotal(l), 0);
    const discount = Math.round((subtotal * (percentOff || 0)) / 100);
    return { subtotal, discount, total: subtotal - discount };
  }

  function setQty(lines, sku, qty) {
    return lines
      .map((l) => (l.sku === sku ? { ...l, qty } : l))
      .filter((l) => l.qty > 0);
  }

  function addItem(lines, product) {
    const existing = lines.find((l) => l.sku === product.sku);
    if (existing) return setQty(lines, product.sku, existing.qty + 1);
    return [...lines, { sku: product.sku, name: product.name, priceCents: product.priceCents, qty: 1 }];
  }

  function money(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

  const api = { lineTotal, cartTotals, setQty, addItem, money };
  if (typeof module !== 'undefined') module.exports = api;
  else root.Cart = api;
})(this);
