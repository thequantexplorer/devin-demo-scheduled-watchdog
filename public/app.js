const state = { products: [], lines: [], percentOff: 0 };
const $ = (id) => document.getElementById(id);

function render() {
  $('products').innerHTML = state.products
    .map((p) => `<div class="card"><div class="img">${p.img}</div><strong>${p.name}</strong><span class="price">${Cart.money(p.priceCents)}</span><button data-add="${p.sku}">Add to cart</button></div>`)
    .join('');
  $('cart-lines').innerHTML = state.lines
    .map((l) => `<li><span>${l.name}</span><input type="number" min="0" value="${l.qty}" data-qty="${l.sku}" aria-label="Quantity for ${l.name}" /><span>${Cart.money(Cart.lineTotal(l))}</span></li>`)
    .join('');
  const t = Cart.cartTotals(state.lines, state.percentOff);
  $('subtotal').textContent = Cart.money(t.subtotal);
  $('discount').textContent = '-' + Cart.money(t.discount);
  $('total').textContent = Cart.money(t.total);
  const count = state.lines.reduce((n, l) => n + l.qty, 0);
  $('cart-count').textContent = `Cart (${count})`;
  $('place-order').disabled = state.lines.length === 0;
}

document.addEventListener('click', (e) => {
  const sku = e.target.dataset.add;
  if (!sku) return;
  state.lines = Cart.addItem(state.lines, state.products.find((p) => p.sku === sku));
  render();
});

document.addEventListener('change', (e) => {
  const sku = e.target.dataset.qty;
  if (!sku) return;
  state.lines = Cart.setQty(state.lines, sku, e.target.value);
  render();
});

$('promo-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const code = $('promo').value.trim();
  const res = await fetch('/api/promos/' + encodeURIComponent(code));
  if (!res.ok) {
    state.percentOff = 0;
    $('promo-msg').textContent = 'That code is not valid.';
  } else {
    const promo = await res.json();
    state.percentOff = promo.percentOff;
    $('promo-msg').textContent = `${promo.code} applied: ${promo.percentOff}% off`;
  }
  render();
});

$('place-order').addEventListener('click', async () => {
  const res = await fetch('/api/orders', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ items: state.lines }) });
  const body = await res.json();
  $('order-msg').textContent = res.ok ? `Order ${body.id} placed!` : body.error;
});

fetch('/api/products').then((r) => r.json()).then((p) => { state.products = p; render(); });
