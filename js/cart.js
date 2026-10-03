/**
 * Kanha Ji Oils - Lightweight Vanilla JS Shopping Cart & WhatsApp Order Engine
 * Zero external libraries, localStorage persistent, mobile & desktop optimized.
 * Formats clean, numbered, list-wise WhatsApp order messages.
 */

const KANHAJI_PHONE = "918989124547";
const CART_STORAGE_KEY = "kanhaji_cart_v2";
const CUSTOMER_STORAGE_KEY = "kanhaji_customer_v2";

class KanhaJiCart {
  constructor() {
    this.items = this.loadCart();
    this.customer = this.loadCustomer();
    this.drawerEl = null;
    this.overlayEl = null;
    this.badgeEls = [];
    this.init();
  }

  loadCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Could not load cart from localStorage", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.warn("Could not save cart to localStorage", e);
    }
    this.updateBadges();
    this.renderDrawer();
  }

  loadCustomer() {
    try {
      const data = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      return data ? JSON.parse(data) : { name: "", address: "", note: "" };
    } catch (e) {
      return { name: "", address: "", note: "" };
    }
  }

  saveCustomer(customerData) {
    this.customer = { ...this.customer, ...customerData };
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(this.customer));
    } catch (e) {}
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.badgeEls = document.querySelectorAll(".cart-count-badge");
      this.drawerEl = document.getElementById("cartDrawer");
      this.overlayEl = document.getElementById("cartOverlay");

      // Bind open drawer triggers
      document.querySelectorAll("[data-open-cart]").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          this.openDrawer();
        });
      });

      // Bind close triggers
      if (this.drawerEl) {
        this.drawerEl.querySelectorAll("[data-close-cart]").forEach(btn => {
          btn.addEventListener("click", () => this.closeDrawer());
        });
      }
      if (this.overlayEl) {
        this.overlayEl.addEventListener("click", () => this.closeDrawer());
      }

      // Close on Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isDrawerOpen()) {
          this.closeDrawer();
        }
      });

      this.updateBadges();
      this.renderDrawer();
    });
  }

  isDrawerOpen() {
    return this.drawerEl && this.drawerEl.classList.contains("is-open");
  }

  openDrawer() {
    if (!this.drawerEl) return;
    this.drawerEl.classList.add("is-open");
    if (this.overlayEl) this.overlayEl.classList.add("is-visible");
    document.body.classList.add("cart-open");
    this.renderDrawer();
  }

  closeDrawer() {
    if (!this.drawerEl) return;
    this.drawerEl.classList.remove("is-open");
    if (this.overlayEl) this.overlayEl.classList.remove("is-visible");
    document.body.classList.remove("cart-open");
  }

  /**
   * Add product to cart with selected size
   * @param {string} productId 
   * @param {string} selectedSize 
   * @param {number} quantity 
   */
  addItem(productId, selectedSize = null, quantity = 1) {
    let product = null;
    if (typeof findProductById === "function") {
      product = findProductById(productId);
    } else if (typeof PRODUCTS !== "undefined") {
      product = PRODUCTS.find(p => p.id === productId);
    }

    if (!product) return;

    // Resolve size and price
    let sizeObj = null;
    if (product.sizes && product.sizes.length > 0) {
      if (selectedSize) {
        sizeObj = product.sizes.find(s => s.size === selectedSize);
      }
      if (!sizeObj) {
        sizeObj = product.sizes.find(s => s.default) || product.sizes[0];
      }
    }

    const resolvedSize = sizeObj ? sizeObj.size : (product.packSize || "Standard");
    const resolvedPrice = sizeObj ? sizeObj.price : (product.price || 0);
    const cartKey = `${product.id}__${resolvedSize.replace(/\s+/g, '_')}`;

    const existingIndex = this.items.findIndex(item => item.cartKey === cartKey);
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        cartKey: cartKey,
        id: product.id,
        name: product.name,
        hindiName: product.hindiName || "",
        size: resolvedSize,
        price: resolvedPrice,
        image: product.image,
        quantity: quantity
      });
    }

    this.saveCart();
    this.showToast(`✓ Added "${product.name} (${resolvedSize})" to cart`);
  }

  updateQuantity(cartKey, delta) {
    const item = this.items.find(i => i.cartKey === cartKey);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(cartKey);
    } else {
      this.saveCart();
    }
  }

  removeItem(cartKey) {
    const item = this.items.find(i => i.cartKey === cartKey);
    const itemName = item ? `${item.name} (${item.size})` : "Item";
    this.items = this.items.filter(i => i.cartKey !== cartKey);
    this.saveCart();
    this.showToast(`Removed "${itemName}" from cart`);
  }

  clearCart() {
    if (this.items.length === 0) return;
    if (confirm("Are you sure you want to clear your cart?")) {
      this.items = [];
      this.saveCart();
      this.showToast("Your cart has been cleared");
    }
  }

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getEstimatedTotal() {
    return this.items.reduce((sum, item) => {
      const priceNum = typeof item.price === "number" ? item.price : parseFloat(item.price);
      return sum + (isNaN(priceNum) ? 0 : priceNum * item.quantity);
    }, 0);
  }

  updateBadges() {
    const total = this.getTotalCount();
    this.badgeEls.forEach(badge => {
      badge.textContent = total;
      badge.style.display = total > 0 ? "inline-flex" : "none";
    });
  }

  renderDrawer() {
    const container = document.getElementById("cartDrawerItems");
    const footer = document.getElementById("cartDrawerFooter");
    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </div>
          <h4>Your Cart is Empty</h4>
          <p>Explore our pure cold-pressed oils & traditional products directly from our Sapna Sangeeta store in Indore.</p>
          <a href="shop.html" class="btn btn-primary btn-sm" onclick="cart.closeDrawer()">
            Browse Oils Catalog
          </a>
        </div>
      `;
      if (footer) footer.style.display = "none";
      return;
    }

    if (footer) footer.style.display = "block";

    let html = `<ul class="cart-items-list" role="list">`;
    this.items.forEach(item => {
      const lineTotal = (item.price && !isNaN(item.price)) ? `₹${item.price * item.quantity}` : "Price on req.";
      const unitPrice = (item.price && !isNaN(item.price)) ? `₹${item.price}` : "On request";

      html += `
        <li class="cart-item" data-cart-key="${item.cartKey}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" loading="lazy" onerror="this.onerror=null;this.src='assets/icons/oil-placeholder.svg';">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-meta">
              <span class="cart-item-size-pill">${item.size}</span>
              <span class="cart-item-rate">${unitPrice} / pack</span>
            </div>
            <div class="cart-item-actions">
              <div class="qty-control" aria-label="Quantity control">
                <button type="button" class="qty-btn" onclick="cart.updateQuantity('${item.cartKey}', -1)" aria-label="Decrease quantity for ${item.name}">−</button>
                <span class="qty-value">${item.quantity}</span>
                <button type="button" class="qty-btn" onclick="cart.updateQuantity('${item.cartKey}', 1)" aria-label="Increase quantity for ${item.name}">+</button>
              </div>
              <span class="cart-item-subtotal">${lineTotal}</span>
              <button type="button" class="btn-remove-item" onclick="cart.removeItem('${item.cartKey}')" aria-label="Remove ${item.name}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </li>
      `;
    });
    html += `</ul>`;

    // Customer details form inside drawer for immediate WhatsApp checkout
    html += `
      <div class="cart-checkout-details">
        <h5 class="cart-checkout-heading">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          Delivery Details (For WhatsApp Order)
        </h5>
        <div class="form-group-compact">
          <label for="cartCustName" class="form-label-compact">Your Full Name <span class="req">*</span></label>
          <input type="text" id="cartCustName" class="input-compact" placeholder="e.g. Rajesh Sharma" value="${this.customer.name || ''}" oninput="cart.saveCustomer({ name: this.value })" required>
        </div>
        <div class="form-group-compact">
          <label for="cartCustAddress" class="form-label-compact">Delivery Address in Indore <span class="req">*</span></label>
          <textarea id="cartCustAddress" class="textarea-compact" rows="2" placeholder="e.g. 204 Anand Regency, Sapna Sangeeta Rd, Indore" oninput="cart.saveCustomer({ address: this.value })" required>${this.customer.address || ''}</textarea>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Render footer totals & checkout button
    const totalCount = this.getTotalCount();
    const estTotal = this.getEstimatedTotal();
    
    footer.innerHTML = `
      <div class="cart-footer-summary">
        <div class="cart-summary-row">
          <span>Selected Products:</span>
          <strong>${this.items.length} ${this.items.length === 1 ? 'item' : 'items'}</strong>
        </div>
        <div class="cart-summary-row">
          <span>Total Quantity:</span>
          <strong>${totalCount} packs</strong>
        </div>
        <div class="cart-summary-row highlight">
          <span>Estimated Total:</span>
          <strong class="cart-grand-total">₹${estTotal}</strong>
        </div>
        <p class="cart-price-note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          Direct store rates from daily price board. Instant confirmation on WhatsApp. Pay on delivery or store pickup.
        </p>
      </div>
      <div class="cart-footer-btns">
        <button type="button" class="btn btn-whatsapp btn-block" onclick="cart.sendWhatsAppOrder()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Send Order on WhatsApp
        </button>
        <button type="button" class="btn btn-outline-danger btn-sm" onclick="cart.clearCart()">
          Clear Cart
        </button>
      </div>
    `;
  }

  /**
   * Generates clean, properly arranged list-wise WhatsApp order message with numbers and dividers
   */
  sendWhatsAppOrder() {
    if (this.items.length === 0) {
      alert("Your cart is empty. Please select products first.");
      return;
    }

    const nameInput = document.getElementById("cartCustName");
    const addressInput = document.getElementById("cartCustAddress");

    const name = (nameInput ? nameInput.value.trim() : "") || this.customer.name || "";
    const address = (addressInput ? addressInput.value.trim() : "") || this.customer.address || "";

    if (!name) {
      alert("Please enter your name for the order confirmation.");
      if (nameInput) nameInput.focus();
      return;
    }

    if (!address) {
      alert("Please enter your delivery address or area in Indore.");
      if (addressInput) addressInput.focus();
      return;
    }

    this.saveCustomer({ name, address });

    const totalUnits = this.getTotalCount();
    const estTotal = this.getEstimatedTotal();

    // Formatted numbered list message strictly arranged
    let msg = `🛒 *KANHA JI OILS (INDORE) - NEW ORDER*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    msg += `📦 *ORDERED PRODUCTS:*\n\n`;

    this.items.forEach((item, index) => {
      const lineSubtotal = (typeof item.price === "number") ? `₹${item.price * item.quantity}` : "Price on req.";
      const unitRate = (typeof item.price === "number") ? `₹${item.price}` : "On request";

      msg += `${index + 1}. *${item.name}*\n`;
      msg += `   • Pack Size: ${item.size}\n`;
      msg += `   • Quantity: ${item.quantity}\n`;
      msg += `   • Rate: ${unitRate} each\n`;
      msg += `   • Subtotal: ${lineSubtotal}\n\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📊 *ORDER SUMMARY:*\n`;
    msg += `• Total Product Varieties: ${this.items.length}\n`;
    msg += `• Total Packs / Bottles: ${totalUnits}\n`;
    if (estTotal > 0) {
      msg += `• *Total Estimated Amount: ₹${estTotal}*\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;

    msg += `👤 *CUSTOMER DETAILS:*\n`;
    msg += `• Name: ${name}\n`;
    msg += `• Address / Area: ${address}\n\n`;

    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🙏 *Please confirm availability and dispatch time from your Sapna Sangeeta store.*`;

    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${KANHAJI_PHONE}?text=${encodedMsg}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  showToast(message) {
    let toast = document.getElementById("kanhajiToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "kanhajiToast";
      toast.className = "kanhaji-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }
}

/**
 * Quick Single-Product Order via WhatsApp ("Shop Now" button)
 * Formatted clearly with numbers, size, and rate
 */
function quickOrderWhatsApp(productId, selectedSize = null, quantity = 1) {
  let product = null;
  if (typeof findProductById === "function") {
    product = findProductById(productId);
  } else if (typeof PRODUCTS !== "undefined") {
    product = PRODUCTS.find(p => p.id === productId);
  }

  if (!product) return;

  // Resolve size
  let sizeObj = null;
  if (product.sizes && product.sizes.length > 0) {
    if (selectedSize) {
      sizeObj = product.sizes.find(s => s.size === selectedSize);
    }
    if (!sizeObj) {
      sizeObj = product.sizes.find(s => s.default) || product.sizes[0];
    }
  }

  const packSize = sizeObj ? sizeObj.size : (product.packSize || "Standard Pack");
  const priceStr = sizeObj ? `₹${sizeObj.price}` : "Direct Store Rate";
  const totalStr = (sizeObj && typeof sizeObj.price === "number") ? `₹${sizeObj.price * quantity}` : "On request";

  let msg = `🛒 *KANHA JI OILS (INDORE) - QUICK INQUIRY*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  msg += `Hello Kanha Ji Oils,\nI would like to order the following product:\n\n`;
  msg += `1. *${product.name}*\n`;
  msg += `   • Selected Size: ${packSize}\n`;
  msg += `   • Quantity: ${quantity}\n`;
  msg += `   • Rate: ${priceStr}\n`;
  msg += `   • Total: ${totalStr}\n\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📍 *Delivery Area:* Indore / Nearby\n\n`;
  msg += `🙏 *Please confirm stock availability and pickup / delivery details.*`;

  const encodedMsg = encodeURIComponent(msg);
  const waUrl = `https://wa.me/${KANHAJI_PHONE}?text=${encodedMsg}`;
  window.open(waUrl, "_blank", "noopener,noreferrer");
}

// Global quick inquiry
function inquireProductWhatsApp(productName) {
  let msg = `🛒 *KANHA JI OILS (INDORE) - INQUIRY*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  msg += `Hello Kanha Ji Oils,\nI would like information regarding:\n\n`;
  msg += `• Product: *${productName}*\n\n`;
  msg += `Please share current available pack sizes, rates, and delivery options in Indore.\n\n`;
  msg += `Thank you!`;

  const encodedMsg = encodeURIComponent(msg);
  const waUrl = `https://wa.me/${KANHAJI_PHONE}?text=${encodedMsg}`;
  window.open(waUrl, "_blank", "noopener,noreferrer");
}

// Instantiate global cart
const cart = new KanhaJiCart();
