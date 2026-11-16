/* 蜡笔文具店 · 交互逻辑 */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var KEY_CART = 'crayon_cart_v1';
  var KEY_ACCENT = 'crayon_accent_v1';
  var KEY_READ = 'crayon_read_v1';

  var cart = [];
  var filter = 'all';
  var sortMode = 'default';
  var accentIndex = 0;
  var printed = false;

  function money(n) { return '¥ ' + n.toFixed(2); }
  function fmtDate() {
    var d = new Date();
    var p = function (v) { return String(v).padStart(2, '0'); };
    return d.getFullYear() + '.' + p(d.getMonth() + 1) + '.' + p(d.getDate());
  }
  function catLabel(id) {
    var c = CATS.filter(function (x) { return x.id === id; })[0];
    return c ? c.label : '';
  }
  function productById(id) {
    return PRODUCTS.filter(function (p) { return p.id === id; })[0];
  }

  /* ---------------- 图形 ---------------- */

  function artCrayon(color) {
    return '<svg viewBox="0 0 64 96" aria-hidden="true">' +
      '<path d="M20 24 L32 3 L44 24 Z" fill="' + color + '"/>' +
      '<path d="M28 13 L32 3 L36 13 Z" fill="#fff" opacity=".45"/>' +
      '<rect x="19" y="22" width="26" height="66" rx="5" fill="' + color + '"/>' +
      '<rect x="19" y="22" width="7" height="66" rx="3" fill="#fff" opacity=".26"/>' +
      '<rect x="19" y="40" width="26" height="28" fill="#fdf8e9"/>' +
      '<line x1="22" y1="48" x2="42" y2="48" stroke="' + color + '" stroke-width="1" opacity=".55"/>' +
      '<line x1="22" y1="59" x2="42" y2="59" stroke="' + color + '" stroke-width="1" opacity=".55"/>' +
      '<rect x="19" y="22" width="26" height="66" rx="5" fill="none" stroke="rgba(0,0,0,.12)"/>' +
      '</svg>';
  }

  function artBox(color) {
    var cols = ['#ef9bb4', '#f2c94c', color, '#69b87e', '#f0914b', '#7fc7c3'];
    var tips = cols.map(function (c, i) {
      var off = (i % 2) * 4;
      var x = 12 + i * 7;
      return '<g transform="translate(' + x + ',0)">' +
        '<rect x="0" y="' + (26 + off) + '" width="5.4" height="28" rx="1.6" fill="' + c + '"/>' +
        '<path d="M0 ' + (26 + off) + ' L2.7 ' + (17 + off) + ' L5.4 ' + (26 + off) + ' Z" fill="' + c + '"/>' +
        '<rect x="0" y="' + (33 + off) + '" width="5.4" height="6" fill="#fdf8e9"/>' +
        '</g>';
    }).join('');
    return '<svg viewBox="0 0 64 96" aria-hidden="true">' + tips +
      '<rect x="9" y="46" width="46" height="40" rx="4" fill="#e8f3fc" stroke="#c9dcea"/>' +
      '<rect x="9" y="46" width="46" height="9" fill="' + color + '" opacity=".8"/>' +
      '<rect x="14" y="61" width="26" height="3" rx="1.5" fill="' + color + '" opacity=".55"/>' +
      '<rect x="14" y="69" width="16" height="2" rx="1" fill="' + color + '" opacity=".35"/>' +
      '</svg>';
  }

  function artBook(color) {
    var rings = '';
    for (var i = 0; i < 7; i++) {
      rings += '<circle cx="15" cy="' + (18 + i * 10) + '" r="2.3" fill="#b9cee0"/>';
    }
    return '<svg viewBox="0 0 64 96" aria-hidden="true">' +
      '<rect x="13" y="9" width="42" height="79" rx="4" fill="' + color + '"/>' +
      '<rect x="19" y="14" width="32" height="69" rx="2" fill="#fdfbf3"/>' +
      '<line x1="24" y1="26" x2="46" y2="26" stroke="#c6dcee"/>' +
      '<line x1="24" y1="34" x2="46" y2="34" stroke="#c6dcee"/>' +
      '<line x1="24" y1="42" x2="46" y2="42" stroke="#c6dcee"/>' +
      '<line x1="24" y1="50" x2="40" y2="50" stroke="#c6dcee"/>' +
      '<line x1="24" y1="58" x2="44" y2="58" stroke="#c6dcee"/>' +
      rings + '</svg>';
  }

  function artSticker(color) {
    var STAR = 'M0 -1 L0.2245 -0.309 L0.9511 -0.309 L0.3633 0.118 L0.5878 0.809 L0 0.382 L-0.5878 0.809 L-0.3633 0.118 L-0.9511 -0.309 L-0.2245 -0.309 Z';
    var items = [
      [24, 24, 10, color], [44, 22, 7, '#f2c94c'], [22, 50, 8, '#ef9bb4'],
      [43, 48, 11, '#7fc7c3'], [24, 74, 7, '#f0914b'], [44, 72, 9, color]
    ];
    var shapes = items.map(function (it) {
      return '<path d="' + STAR + '" transform="translate(' + it[0] + ' ' + it[1] + ') scale(' + it[2] + ')" fill="' + it[3] + '"/>';
    }).join('');
    return '<svg viewBox="0 0 64 96" aria-hidden="true">' +
      '<rect x="8" y="5" width="48" height="86" rx="3" fill="#fffdf6" stroke="#dbe6f0"/>' +
      '<line x1="8" y1="10" x2="56" y2="10" stroke="#e7eefa"/>' +
      shapes + '</svg>';
  }

  function artEraser(color) {
    return '<svg viewBox="0 0 64 96" aria-hidden="true">' +
      '<ellipse cx="32" cy="84" rx="20" ry="4" fill="#cfdfec" opacity=".55"/>' +
      '<rect x="13" y="40" width="38" height="32" rx="15" fill="' + color + '"/>' +
      '<circle cx="22" cy="50" r="7" fill="#fff" opacity=".35"/>' +
      '<circle cx="42" cy="58" r="5" fill="#fff" opacity=".2"/>' +
      '<rect x="13" y="40" width="38" height="32" rx="15" fill="none" stroke="rgba(0,0,0,.1)"/>' +
      '<text x="32" y="61" font-size="7" fill="#4f7d9c" text-anchor="middle" font-family="serif" letter-spacing="1">C</text>' +
      '</svg>';
  }

  function artPen(color) {
    return '<svg viewBox="0 0 64 96" aria-hidden="true">' +
      '<rect x="26" y="10" width="12" height="74" rx="6" fill="#f7fbff" stroke="#cfdfec"/>' +
      '<rect x="26" y="10" width="12" height="26" rx="6" fill="' + color + '"/>' +
      '<rect x="26" y="52" width="12" height="16" fill="' + color + '" opacity=".14"/>' +
      '<line x1="38" y1="36" x2="38" y2="80" stroke="' + color + '" opacity=".25"/>' +
      '<path d="M26 83 L32 92 L38 83 Z" fill="' + color + '"/>' +
      '<path d="M29 87 L32 92 L35 87 Z" fill="#fff" opacity=".55"/>' +
      '</svg>';
  }

  function artPouch(color) {
    return '<svg viewBox="0 0 64 96" aria-hidden="true">' +
      '<path d="M10 36 q0-7 7-7 h30 q7 0 7 7 v38 q0 9-9 9 h-26 q-9 0-9-9 z" fill="' + color + '"/>' +
      '<path d="M10 36 q0-7 7-7 h30 q7 0 7 7 v3 h-44 z" fill="#fff" opacity=".18"/>' +
      '<line x1="11" y1="40" x2="53" y2="40" stroke="#1f4a6b" stroke-width="1" stroke-dasharray="3 2" opacity=".5"/>' +
      '<circle cx="32" cy="40" r="3" fill="#fdf8e9"/>' +
      '<rect x="26" y="40" width="12" height="6" rx="2" fill="#fdf8e9" opacity=".9"/>' +
      '<rect x="20" y="58" width="24" height="3" rx="1.5" fill="#fff" opacity=".35"/>' +
      '</svg>';
  }

  function artSVG(p) {
    switch (p.art) {
      case 'box': return artBox(p.color);
      case 'book': return artBook(p.color);
      case 'sticker': return artSticker(p.color);
      case 'eraser': return artEraser(p.color);
      case 'pen': return artPen(p.color);
      case 'pouch': return artPouch(p.color);
      default: return artCrayon(p.color);
    }
  }

  /* ---------------- 回忆插画 ---------------- */

  function starPath(x, y, s, color, opacity) {
    var STAR = 'M0 -1 L0.2245 -0.309 L0.9511 -0.309 L0.3633 0.118 L0.5878 0.809 L0 0.382 L-0.5878 0.809 L-0.3633 0.118 L-0.9511 -0.309 L-0.2245 -0.309 Z';
    return '<path d="' + STAR + '" transform="translate(' + x + ' ' + y + ') scale(' + s + ')" fill="' + color + '" opacity="' + (opacity || 1) + '"/>';
  }

  function memArt(kind, c) {
    var wrap = '<svg viewBox="0 0 200 200" aria-hidden="true">';
    var dots = starPath(38, 44, 10, '#ffffff', .8) + starPath(168, 40, 7, '#ffffff', .7) +
      starPath(158, 166, 9, '#ffffff', .55) + starPath(34, 160, 6, '#ffffff', .5);

    if (kind === 'moon') {
      return wrap + dots +
        '<circle cx="106" cy="96" r="46" fill="#fffdf3"/>' +
        '<circle cx="124" cy="86" r="41" fill="#d9ebf8"/>' +
        '<circle cx="106" cy="96" r="46" fill="none" stroke="' + c + '" stroke-width="1.5" opacity=".35"/>' +
        '<path d="M20 150 q18-12 36 0 t36 0" fill="none" stroke="' + c + '" stroke-width="1.6" opacity=".35"/>' +
        '<path d="M110 150 q18-12 36 0 t36 0" fill="none" stroke="' + c + '" stroke-width="1.6" opacity=".22"/>' +
        '</svg>';
    }
    if (kind === 'mic') {
      return wrap + dots +
        '<rect x="84" y="40" width="34" height="66" rx="17" fill="#fffdf3" stroke="' + c + '" stroke-width="1.6"/>' +
        '<line x1="92" y1="58" x2="110" y2="58" stroke="' + c + '" stroke-width="1.2" opacity=".5"/>' +
        '<line x1="92" y1="70" x2="110" y2="70" stroke="' + c + '" stroke-width="1.2" opacity=".5"/>' +
        '<path d="M70 92 a32 32 0 0 0 62 0" fill="none" stroke="' + c + '" stroke-width="1.6"/>' +
        '<line x1="101" y1="124" x2="101" y2="146" stroke="' + c + '" stroke-width="1.6"/>' +
        '<line x1="78" y1="152" x2="124" y2="152" stroke="' + c + '" stroke-width="1.6"/>' +
        '<path d="M62 70 q-8 8 0 18" fill="none" stroke="' + c + '" stroke-width="1.2" opacity=".4"/>' +
        '<path d="M140 70 q8 8 0 18" fill="none" stroke="' + c + '" stroke-width="1.2" opacity=".4"/>' +
        '</svg>';
    }
    if (kind === 'star') {
      return wrap +
        starPath(100, 86, 44, '#fffdf3') + starPath(100, 86, 34, c, .25) +
        starPath(46, 60, 12, '#fffdf3', .9) + starPath(152, 62, 10, '#fffdf3', .85) +
        starPath(48, 140, 9, '#fffdf3', .7) + starPath(154, 146, 13, '#fffdf3', .75) +
        '<circle cx="100" cy="86" r="6" fill="#fffdf3"/>' +
        '<path d="M76 160 q24-12 48 0" fill="none" stroke="#fffdf3" stroke-width="1.4" opacity=".5"/>' +
        '</svg>';
    }
    if (kind === 'pad') {
      return wrap + dots +
        '<path d="M44 96 q0-18 20-18 q10 0 14 8 q4-8 14-8 q20 0 20 18 v22 q0 16-16 16 q-10 0-16-8 q-6 8-16 8 q-16 0-16-16 z" fill="#fffdf3" stroke="' + c + '" stroke-width="1.6"/>' +
        '<circle cx="72" cy="104" r="7" fill="' + c + '" opacity=".22"/>' +
        '<path d="M100 96 v16 M92 104 h16" stroke="' + c + '" stroke-width="1.8" opacity=".7"/>' +
        '<circle cx="134" cy="102" r="4" fill="' + c + '" opacity=".5"/>' +
        '<circle cx="144" cy="112" r="4" fill="' + c + '" opacity=".35"/>' +
        '</svg>';
    }
    if (kind === 'cup') {
      return wrap + dots +
        '<path d="M62 82 h60 v42 q0 26-30 26 q-30 0-30-26 z" fill="#fffdf3" stroke="' + c + '" stroke-width="1.6"/>' +
        '<path d="M122 92 q24-2 22 16 q-2 14-22 10" fill="none" stroke="' + c + '" stroke-width="1.6"/>' +
        '<path d="M80 62 q6-10 0-20" fill="none" stroke="#fffdf3" stroke-width="1.5" opacity=".7"/>' +
        '<path d="M96 60 q6-12 0-24" fill="none" stroke="#fffdf3" stroke-width="1.5" opacity=".55"/>' +
        '<path d="M62 96 h60" stroke="' + c + '" stroke-width="1.2" opacity=".35"/>' +
        '</svg>';
    }
    // crayon
    return wrap + dots +
      '<g transform="rotate(-16 100 100)">' +
      '<path d="M84 60 L100 22 L116 60 Z" fill="' + c + '"/>' +
      '<path d="M96 44 L100 22 L104 44 Z" fill="#fff" opacity=".5"/>' +
      '<rect x="82" y="58" width="36" height="88" rx="7" fill="#fffdf3" stroke="' + c + '" stroke-width="1.4"/>' +
      '<rect x="82" y="80" width="36" height="24" fill="' + c + '" opacity=".35"/>' +
      '<line x1="88" y1="70" x2="112" y2="70" stroke="' + c + '" stroke-width="1" opacity=".5"/>' +
      '</g>' +
      '<path d="M34 158 q30-14 58 2" fill="none" stroke="' + c + '" stroke-width="1.2" opacity=".35"/>' +
      '</svg>';
  }

  /* ---------------- 声音 ---------------- */

  var ac = null;
  function audio() {
    try {
      if (!ac) {
        var C = window.AudioContext || window.webkitAudioContext;
        if (!C) return null;
        ac = new C();
      }
      if (ac.state === 'suspended') ac.resume();
      return ac;
    } catch (e) { return null; }
  }

  function tone(freq, dur, vol, type, delay) {
    var c = audio();
    if (!c) return;
    try {
      var t0 = c.currentTime + (delay || 0);
      var o = c.createOscillator();
      var g = c.createGain();
      o.type = type || 'sine';
      o.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(vol || .04, t0 + .012);
      g.gain.exponentialRampToValueAtTime(.0001, t0 + dur);
      o.connect(g); g.connect(c.destination);
      o.start(t0); o.stop(t0 + dur + .03);
    } catch (e) {}
  }

  function bell() {
    tone(880, .22, .05, 'sine', 0);
    tone(1318, .3, .035, 'sine', .18);
  }
  function ding() { tone(1046, .12, .04, 'triangle'); tone(1568, .1, .02, 'sine', .05); }
  function clickSound() { tone(320, .06, .025, 'square', 0); tone(420, .05, .02, 'square', .07); }

  /* ---------------- 提示 ---------------- */

  var toastTimer = null;
  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2000);
  }

  /* ---------------- 推门 ---------------- */

  function enterShop() {
    var cover = $('#cover');
    if (cover.classList.contains('gone')) return;
    $('#doorSign').textContent = 'OPEN';
    cover.classList.add('opening');
    bell();
    setTimeout(function () {
      cover.classList.add('gone');
      $('#site').setAttribute('aria-hidden', 'false');
      document.body.classList.remove('locked');
      window.scrollTo(0, 0);
    }, 700);
  }

  /* ---------------- 主题色 ---------------- */

  function applyPalette(i, silent) {
    accentIndex = Math.max(0, Math.min(PALETTES.length - 1, i));
    var p = PALETTES[accentIndex];
    var root = document.documentElement;
    root.style.setProperty('--accent', p.hex);
    root.style.setProperty('--accent-deep', p.deep);
    root.style.setProperty('--accent-soft', p.soft);
    $('#paletteName').textContent = p.name;
    $$('.swatch').forEach(function (b, idx) {
      b.classList.toggle('on', idx === accentIndex);
      b.setAttribute('aria-pressed', idx === accentIndex ? 'true' : 'false');
    });
    try { localStorage.setItem(KEY_ACCENT, String(accentIndex)); } catch (e) {}
  }

  function renderPalette() {
    var box = $('#paletteSwatches');
    box.innerHTML = PALETTES.map(function (p, i) {
      return '<button class="swatch" data-pi="' + i + '" style="--c:' + p.hex + '" aria-label="' + p.name + '">' +
        '<span class="sw-tip"></span><span class="sw-body"></span></button>';
    }).join('');
    var saved = 0;
    try { saved = parseInt(localStorage.getItem(KEY_ACCENT) || '0', 10) || 0; } catch (e) {}
    applyPalette(saved, true);
    box.addEventListener('click', function (e) {
      var b = e.target.closest('.swatch');
      if (!b) return;
      applyPalette(parseInt(b.dataset.pi, 10));
      clickSound();
    });
  }

  /* ---------------- 商品 ---------------- */

  function qtyOf(id) {
    var it = cart.filter(function (x) { return x.id === id; })[0];
    return it ? it.qty : 0;
  }

  function sortedProducts() {
    var list = PRODUCTS.filter(function (p) { return filter === 'all' || p.cat === filter; });
    if (sortMode === 'asc') list = list.slice().sort(function (a, b) { return a.price - b.price; });
    if (sortMode === 'desc') list = list.slice().sort(function (a, b) { return b.price - a.price; });
    return list;
  }

  function renderProducts() {
    var grid = $('#productGrid');
    var list = sortedProducts();
    grid.innerHTML = list.map(function (p) {
      var q = qtyOf(p.id);
      return '<article class="p-card" data-id="' + p.id + '">' +
        (p.tag ? '<span class="p-tag">' + p.tag + '</span>' : '') +
        '<button class="p-art" data-open="' + p.id + '" aria-label="' + p.name + ' 详情">' +
        artSVG(p) + (q ? '<span class="p-qty">' + q + '</span>' : '') +
        '</button>' +
        '<div class="p-info">' +
        '<span class="p-cat">' + catLabel(p.cat) + '</span>' +
        '<h3 class="p-name">' + p.name + '</h3>' +
        '<p class="p-en">' + p.en + '</p>' +
        '<p class="p-desc">' + p.desc + '</p>' +
        '<div class="p-row"><span class="p-price"><i>¥</i>' + p.price + '</span>' +
        '<button class="add-btn" data-add="' + p.id + '"' + (q ? ' data-in="1"' : '') + '>' + (q ? '再来一件' : '加入') + '</button>' +
        '</div></div></article>';
    }).join('');
    $('#shopCount').textContent = list.length + ' 件';
  }

  function renderChips() {
    var box = $('#catChips');
    box.innerHTML = CATS.map(function (c) {
      var n = c.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(function (p) { return p.cat === c.id; }).length;
      return '<button class="chip' + (filter === c.id ? ' active' : '') + '" data-cat="' + c.id + '">' +
        c.label + '<small>' + n + '</small></button>';
    }).join('');
  }

  function flyDot(fromEl) {
    var cartBtn = $('#cartBtn');
    if (!fromEl || !cartBtn) return;
    var s = fromEl.getBoundingClientRect();
    var t = cartBtn.getBoundingClientRect();
    var dot = document.createElement('div');
    dot.className = 'fly-dot';
    dot.style.left = (s.left + s.width / 2) + 'px';
    dot.style.top = (s.top + s.height / 2) + 'px';
    document.body.appendChild(dot);
    requestAnimationFrame(function () {
      dot.style.transform = 'translate(' + (t.left + t.width / 2 - (s.left + s.width / 2) - 6) + 'px,' +
        (t.top + t.height / 2 - (s.top + s.height / 2) - 6) + 'px) scale(.35)';
      dot.style.opacity = '0';
    });
    setTimeout(function () { dot.remove(); }, 720);
  }

  function bumpBadge() {
    var b = $('#cartBadge');
    b.classList.add('bump');
    setTimeout(function () { b.classList.remove('bump'); }, 260);
  }

  function saveCart() {
    try { localStorage.setItem(KEY_CART, JSON.stringify(cart)); } catch (e) {}
  }

  function addToCart(id, triggerEl) {
    var p = productById(id);
    if (!p) return;
    var it = cart.filter(function (x) { return x.id === id; })[0];
    if (it) it.qty += 1; else cart.push({ id: id, qty: 1 });
    saveCart();
    renderCart();
    renderProducts();
    bumpBadge();
    if (triggerEl) flyDot(triggerEl);
    ding();
    toast('「' + p.name + '」放进购物车了');
  }

  function changeQty(id, delta) {
    var it = cart.filter(function (x) { return x.id === id; })[0];
    if (!it) return;
    it.qty += delta;
    if (it.qty <= 0) cart = cart.filter(function (x) { return x.id !== id; });
    saveCart();
    renderCart();
    renderProducts();
    clickSound();
  }

  function removeItem(id) {
    cart = cart.filter(function (x) { return x.id !== id; });
    saveCart();
    renderCart();
    renderProducts();
    toast('已经放回去了');
  }

  function cartCount() {
    return cart.reduce(function (n, i) { return n + i.qty; }, 0);
  }
  function cartTotal() {
    return cart.reduce(function (n, i) {
      var p = productById(i.id);
      return n + (p ? p.price * i.qty : 0);
    }, 0);
  }

  function renderCart() {
    var badge = $('#cartBadge');
    var n = cartCount();
    badge.textContent = n > 99 ? '99+' : String(n);
    badge.classList.toggle('zero', n === 0);
    $('#drawerCount').textContent = n;
    $('#drawerTotal').textContent = money(cartTotal());

    var body = $('#drawerBody');
    if (!cart.length) {
      body.innerHTML = '<div class="drawer-empty">' +
        '<div class="de-icon">' + artCrayon('#b9d3e8') + '</div>' +
        '<p>购物车是空的。<br>没关系，先看看也行。</p>' +
        '<button class="ghost-btn" data-goshop="1">去 挑 东 西</button></div>';
    } else {
      body.innerHTML = cart.map(function (i) {
        var p = productById(i.id);
        if (!p) return '';
        return '<div class="cart-item">' +
          '<div class="ci-art">' + artSVG(p) + '</div>' +
          '<div class="ci-main">' +
          '<div class="ci-name">' + p.name + '</div>' +
          '<div class="ci-price">¥' + p.price + ' / 件</div>' +
          '<div class="ci-ctrl">' +
          '<button class="qty-btn" data-minus="' + p.id + '" aria-label="减少">−</button>' +
          '<span class="qty-num">' + i.qty + '</span>' +
          '<button class="qty-btn" data-plus="' + p.id + '" aria-label="增加">＋</button>' +
          '<button class="ci-remove" data-remove="' + p.id + '">移除</button>' +
          '</div></div>' +
          '<div class="ci-sub">¥' + (p.price * i.qty) + '</div>' +
          '</div>';
      }).join('');
    }
    updateCheckout();
  }

  function updateCheckout() {
    var btn = $('#printBtn');
    var tip = $('#checkoutTip');
    btn.disabled = cart.length === 0;
    if (!cart.length) {
      tip.textContent = '购物车是空的，先去挑几支。';
    } else if (!printed) {
      tip.textContent = '共 ' + cartCount() + ' 件 · ' + money(cartTotal()) + '，可以打小票了。';
    }
  }

  /* ---------------- 购物车抽屉 ---------------- */

  function openDrawer() {
    $('#drawer').classList.add('open');
    $('#drawerMask').classList.add('show');
    $('#drawer').setAttribute('aria-hidden', 'false');
    document.body.classList.add('locked');
  }
  function closeDrawer() {
    $('#drawer').classList.remove('open');
    $('#drawerMask').classList.remove('show');
    $('#drawer').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('locked');
  }

  /* ---------------- 商品详情 ---------------- */

  var modalId = null;
  function openModal(id) {
    var p = productById(id);
    if (!p) return;
    modalId = id;
    $('#modalArt').innerHTML = artSVG(p);
    $('#modalName').textContent = p.name;
    $('#modalDesc').textContent = p.desc;
    $('#modalMeta').innerHTML = p.meta.map(function (m) { return '<span>' + m + '</span>'; }).join('');
    $('#modalPrice').textContent = '¥ ' + p.price;
    $('#modal').classList.add('show');
    $('#modal').setAttribute('aria-hidden', 'false');
    document.body.classList.add('locked');
  }
  function closeModal() {
    $('#modal').classList.remove('show');
    $('#modal').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('locked');
    modalId = null;
  }

  /* ---------------- 须知 ---------------- */

  var ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

  function renderNoticeList(el, arr) {
    el.innerHTML = arr.map(function (t, i) {
      return '<li><em>' + (ROMAN[i] || String(i + 1)) + '</em><span>' + t + '</span></li>';
    }).join('');
  }

  function renderNotice() {
    $('#ruleList').innerHTML = NOTICE.rules.map(function (t, i) {
      return '<li><em>' + ROMAN[i] + '</em><span>' + t + '</span></li>';
    }).join('');
    renderNoticeList($('#likeList'), NOTICE.likes);
    renderNoticeList($('#hateList'), NOTICE.hates);

    var checked = false;
    try { checked = localStorage.getItem(KEY_READ) === '1'; } catch (e) {}
    setRead(checked, true);
  }

  function setRead(on, silent) {
    var btn = $('#checkBtn');
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    $('#checkStamp').classList.toggle('show', on);
    try { localStorage.setItem(KEY_READ, on ? '1' : '0'); } catch (e) {}
    if (!silent && on) {
      ding();
      toast('记住了就好，别踩。');
    }
  }

  /* ---------------- 回忆 ---------------- */

  var ROTS = ['-1.4deg', '1.1deg', '0.6deg', '-0.9deg', '1.5deg', '-0.5deg'];

  function emptyCard(index) {
    var STAR = 'M0 -1 L0.2245 -0.309 L0.9511 -0.309 L0.3633 0.118 L0.5878 0.809 L0 0.382 L-0.5878 0.809 L-0.3633 0.118 L-0.9511 -0.309 L-0.2245 -0.309 Z';
    var n = String(index + 1);
    if (n.length < 2) n = '0' + n;
    return '<button class="polaroid empty" data-empty="' + n + '" style="--rot:' + ROTS[index % ROTS.length] + '">' +
      '<span class="ptape" aria-hidden="true"></span>' +
      '<span class="ph">' +
      '<svg viewBox="0 0 120 120" aria-hidden="true">' +
      '<rect x="34" y="46" width="52" height="38" rx="6" fill="none" stroke="#b7d2e6" stroke-width="2"/>' +
      '<path d="M48 46 l4-8 h16 l4 8" fill="none" stroke="#b7d2e6" stroke-width="2"/>' +
      '<circle cx="60" cy="65" r="11" fill="none" stroke="#b7d2e6" stroke-width="2"/>' +
      '<path d="' + STAR + '" transform="translate(92 40) scale(7)" fill="#d9e8f4"/>' +
      '</svg></span>' +
      '<span class="cap"><b>空位 ' + n + '</b>还没有照片<br><span>等你放一张进来</span></span>' +
      '</button>';
  }

  function renderMemories() {
    var wall = $('#memoryWall');
    var out = '';
    for (var i = 0; i < ALBUM_SLOTS; i++) {
      var m = MEMORIES[i];
      if (m) {
        out += '<button class="polaroid" data-mem="' + m.id + '" style="--rot:' + ROTS[i % ROTS.length] + '">' +
          '<span class="ptape" aria-hidden="true"></span>' +
          '<span class="ph' + (m.img ? ' has-img' : '') + '">' + (m.img ? '<img src="' + m.img + '" alt="照片 ' + (i + 1) + '">' : memArt(m.art, m.color)) + '</span>' +
          '<span class="cap"><b>' + m.title + '</b>' + m.front +
          (m.date ? '<br><span>' + m.date + '</span>' : '') + '</span>' +
          '</button>';
      } else {
        out += emptyCard(i);
      }
    }
    wall.innerHTML = out;
    wall.addEventListener('click', function (e) {
      var b = e.target.closest('.polaroid');
      if (!b) return;
      if (b.dataset.mem) openLightbox(b.dataset.mem);
      else toast('空位 ' + b.dataset.empty + '：还空着，等一张照片');
    });
  }

  function openLightbox(id) {
    var m = MEMORIES.filter(function (x) { return x.id === id; })[0];
    if (!m) return;
    $('#lbPhoto').className = 'lb-photo' + (m.img ? '' : ' no-img');
    $('#lbPhoto').innerHTML = m.img ? '<img src="' + m.img + '" alt="照片">' : memArt(m.art, m.color);
    $('#lbTitle').textContent = m.title;
    $('#lbText').innerHTML = (m.front || m.back)
      ? '<span class="lb-front">' + m.front + '</span><br><br>' + m.back
      : '<span class="lb-front">这张的背面还没写，等你补一句。</span>';
    $('#lbMeta').textContent = (m.date ? m.date + ' · ' : '') + 'NO. ' + id.toUpperCase();
    $('#lightbox').classList.add('show');
    $('#lightbox').setAttribute('aria-hidden', 'false');
    document.body.classList.add('locked');
  }
  function closeLightbox() {
    $('#lightbox').classList.remove('show');
    $('#lightbox').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('locked');
  }

  /* ---------------- 小票 ---------------- */

  function buildReceipt() {
    $('#rcDate').textContent = fmtDate();
    var no = 'CRA-' + Math.floor(100000 + Math.random() * 899999);
    $('#rcNo').textContent = no;
    $('#rcNum').textContent = no;

    var items = $('#rcItems');
    if (!cart.length) {
      items.innerHTML = '<div class="rc-empty">（空的小票）</div>';
      $('#rcTotal').textContent = money(0);
    } else {
      items.innerHTML = cart.map(function (i) {
        var p = productById(i.id);
        if (!p) return '';
        return '<div class="rc-item"><span>' + p.name + '</span><span>x' + i.qty + '</span><span>¥' + (p.price * i.qty) + '.00</span></div>';
      }).join('');
      $('#rcTotal').textContent = money(cartTotal());
    }
    var note = RECEIPT_NOTES[Math.floor(Math.random() * RECEIPT_NOTES.length)];
    $('#rcNote').textContent = note;
    $('#rcPay').textContent = cart.length ? '已记在账本' : '未结';
  }

  function printReceipt() {
    if (!cart.length) { toast('购物车是空的，打不出东西。'); return; }
    var receipt = $('#receipt');
    receipt.classList.remove('torn');
    buildReceipt();
    $('#receiptRoll').classList.add('printed');
    printed = true;
    $('#afterPrint').classList.add('show');
    $('#printBtn').textContent = '再 打 一 张';
    $('#checkoutTip').textContent = '小票已经打出来了，可以撕下来了。';
    clickSound();
    setTimeout(function () { tone(520, .08, .02, 'square', .2); }, 60);
    toast('小票打好了');
    setTimeout(function () {
      $('#receiptRoll').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }

  function tearReceipt() {
    $('#receipt').classList.add('torn');
    clickSound();
    setTimeout(function () {
      $('#receiptRoll').classList.remove('printed');
      $('#afterPrint').classList.remove('show');
      $('#printBtn').textContent = '打 印 小 票';
      printed = false;
      updateCheckout();
      toast('小票已经收进兜里了');
    }, 620);
  }

  /* ---------------- 试写区 ---------------- */

  function initDoodle() {
    var cv = $('#doodle');
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext('2d');
    var hint = $('#doodleHint');
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var drawing = false;
    var last = null;

    function accent() {
      return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#4f9fe0';
    }

    function resize() {
      var r = cv.getBoundingClientRect();
      if (!r.width) return;
      cv.width = Math.round(r.width * dpr);
      cv.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
    resize();

    var rt = null;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(resize, 200);
    });

    function pos(e) {
      var r = cv.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    cv.addEventListener('pointerdown', function (e) {
      drawing = true;
      last = pos(e);
      hint.classList.add('hide');
      try { cv.setPointerCapture(e.pointerId); } catch (err) {}
    });

    cv.addEventListener('pointermove', function (e) {
      if (!drawing || !last) return;
      var p = pos(e);
      ctx.strokeStyle = accent();
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last = p;
    });

    function end() { drawing = false; last = null; }
    cv.addEventListener('pointerup', end);
    cv.addEventListener('pointercancel', end);
    cv.addEventListener('pointerleave', function () { if (drawing) end(); });

    $('#doodleClear').addEventListener('click', function () {
      ctx.clearRect(0, 0, cv.width, cv.height);
      hint.classList.remove('hide');
      clickSound();
    });
  }

  /* ---------------- 导航 ---------------- */

  function initNav() {
    var links = $$('.nav-link');
    var sections = ['shop', 'notice', 'memory', 'checkout'].map(function (id) { return document.getElementById(id); });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      sections.forEach(function (s) { if (s) io.observe(s); });
    }
    links.forEach(function (l) {
      l.addEventListener('click', function () { clickSound(); });
    });
  }

  /* ---------------- 事件绑定 ---------------- */

  function bind() {
    $('#enterBtn').addEventListener('click', enterShop);
    $('#doorSign').addEventListener('click', function (e) { e.stopPropagation(); });
    $('#doorPanel').addEventListener('click', enterShop);

    $('#cartBtn').addEventListener('click', function () { openDrawer(); clickSound(); });
    $('#drawerClose').addEventListener('click', closeDrawer);
    $('#drawerMask').addEventListener('click', closeDrawer);

    $('#drawerBody').addEventListener('click', function (e) {
      var t = e.target;
      if (t.closest('[data-goshop]')) {
        closeDrawer();
        document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
        return;
      }
      var plus = t.closest('[data-plus]');
      var minus = t.closest('[data-minus]');
      var rm = t.closest('[data-remove]');
      if (plus) changeQty(plus.dataset.plus, 1);
      if (minus) changeQty(minus.dataset.minus, -1);
      if (rm) removeItem(rm.dataset.remove);
    });

    $('#toCheckout').addEventListener('click', function () {
      if (!cart.length) { toast('购物车还是空的。'); return; }
      closeDrawer();
      setTimeout(function () {
        document.getElementById('checkout').scrollIntoView({ behavior: 'smooth' });
      }, 120);
    });

    $('#productGrid').addEventListener('click', function (e) {
      var add = e.target.closest('[data-add]');
      var open = e.target.closest('[data-open]');
      if (add) { addToCart(add.dataset.add, add); return; }
      if (open) openModal(open.dataset.open);
    });

    $('#catChips').addEventListener('click', function (e) {
      var c = e.target.closest('[data-cat]');
      if (!c) return;
      filter = c.dataset.cat;
      renderChips();
      renderProducts();
      clickSound();
    });

    $('#sortBtn').addEventListener('click', function () {
      var btn = this;
      sortMode = sortMode === 'default' ? 'asc' : (sortMode === 'asc' ? 'desc' : 'default');
      btn.dataset.sort = sortMode;
      btn.textContent = sortMode === 'default' ? '默认排序' : (sortMode === 'asc' ? '便宜先看 ↑' : '贵的先看 ↓');
      renderProducts();
      clickSound();
    });

    $('#modalClose').addEventListener('click', closeModal);
    $('#modal').addEventListener('click', function (e) { if (e.target === this) closeModal(); });
    $('#modalAdd').addEventListener('click', function () {
      if (!modalId) return;
      addToCart(modalId, this);
      closeModal();
    });

    $('#lbClose').addEventListener('click', closeLightbox);
    $('#lightbox').addEventListener('click', function (e) { if (e.target === this) closeLightbox(); });

    $('#checkBtn').addEventListener('click', function () {
      var on = this.getAttribute('aria-pressed') !== 'true';
      setRead(on);
      if (!on) toast('那就再读一遍吧。');
    });

    $('#printBtn').addEventListener('click', printReceipt);
    $('#tearBtn').addEventListener('click', tearReceipt);

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if ($('#drawer').classList.contains('open')) closeDrawer();
      else if ($('#modal').classList.contains('show')) closeModal();
      else if ($('#lightbox').classList.contains('show')) closeLightbox();
    });
  }

  /* ---------------- 初始化 ---------------- */

  function init() {
    document.body.classList.add('locked');

    try {
      var saved = JSON.parse(localStorage.getItem(KEY_CART) || '[]');
      if (Array.isArray(saved)) {
        cart = saved.filter(function (i) { return i && productById(i.id) && i.qty > 0; })
          .map(function (i) { return { id: i.id, qty: Math.min(99, parseInt(i.qty, 10) || 1) }; });
      }
    } catch (e) { cart = []; }

    renderPalette();
    renderChips();
    renderProducts();
    renderNotice();
    renderMemories();
    renderCart();
    initNav();
    initDoodle();
    bind();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
