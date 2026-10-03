/**
 * Kanha Ji Oils - Main JavaScript
 * High performance, zero external libraries, accessible.
 * Multi-pack size switching, dynamic whiteboard pricing, lightbox gallery, lazy loading.
 */

// Track selected size per product card: { [productId]: { size: string, price: number } }
const selectedSizesMap = {};

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initHeaderScroll();
  initFaqAccordions();
  initYouTubeFacade();
  initGoogleMapLazyLoad();
  initLightboxGallery();
  initHomepageFeaturedOils();
  initHomepageKhaliSection();
  initShopFeatures();
  initHeroReelVideo();
  initYouTubeGrid();
});

/* ----------------------------------------------------
   Mobile Navigation & Drawer
----------------------------------------------------- */
function initMobileMenu() {
  const menuToggle = document.getElementById("mobileMenuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const navOverlay = document.getElementById("navOverlay");
  const closeBtn = document.getElementById("mobileNavClose");

  if (!menuToggle || !mobileNav) return;

  function openMenu() {
    mobileNav.classList.add("is-active");
    if (navOverlay) navOverlay.classList.add("is-visible");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    mobileNav.classList.remove("is-active");
    if (navOverlay) navOverlay.classList.remove("is-visible");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.contains("is-active");
    isOpen ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (navOverlay) navOverlay.addEventListener("click", closeMenu);

  mobileNav.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("is-active")) {
      closeMenu();
    }
  });
}

/* ----------------------------------------------------
   Header Scroll Elevation
----------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }, { passive: true });
}

/* ----------------------------------------------------
   Image Popup / Lightbox Modal for "Inside Our Store"
----------------------------------------------------- */
function initLightboxGallery() {
  const modal = document.getElementById("lightboxModal");
  const backdrop = document.getElementById("lightboxBackdrop");
  const closeBtn = document.getElementById("lightboxClose");
  const imgEl = document.getElementById("lightboxImg");
  const titleEl = document.getElementById("lightboxTitle");
  const descEl = document.getElementById("lightboxDesc");
  const tagEl = document.getElementById("lightboxTag");

  if (!modal) return;

  function openLightbox(src, alt, title, desc, tag) {
    if (imgEl) {
      imgEl.src = src;
      imgEl.alt = alt || title || "Kanha Ji Oils Indore";
    }
    if (titleEl) titleEl.textContent = title || "";
    if (descEl) descEl.textContent = desc || "";
    if (tagEl) tagEl.textContent = tag || "Store Gallery";

    modal.style.display = "flex";
    // Trigger transition
    requestAnimationFrame(() => {
      modal.classList.add("is-active");
      document.body.classList.add("modal-open");
    });
  }

  function closeLightbox() {
    modal.classList.remove("is-active");
    document.body.classList.remove("modal-open");
    setTimeout(() => {
      modal.style.display = "none";
      if (imgEl) imgEl.src = "";
    }, 250);
  }

  // Bind to all lightbox trigger elements
  document.querySelectorAll("[data-lightbox]").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const src = item.getAttribute("data-lightbox-src") || item.querySelector("img")?.src;
      const alt = item.querySelector("img")?.alt || "";
      const title = item.getAttribute("data-lightbox-title") || item.querySelector("h3")?.textContent || "";
      const desc = item.getAttribute("data-lightbox-desc") || item.querySelector("p")?.textContent || "";
      const tag = item.getAttribute("data-lightbox-tag") || item.querySelector(".gallery-badge")?.textContent || "Gallery";
      
      if (src) {
        openLightbox(src, alt, title, desc, tag);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (backdrop) backdrop.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-active")) {
      closeLightbox();
    }
  });
}

/* ----------------------------------------------------
   Pack Size Selector & Price Switcher
----------------------------------------------------- */
function selectProductSize(productId, size, price, btnEl) {
  // Update selected state map
  selectedSizesMap[productId] = { size, price };

  // Update pills active status within this card
  const card = document.getElementById(`prod-${productId}`) || btnEl.closest(".product-card");
  if (card) {
    card.querySelectorAll(".size-pill").forEach(pill => {
      pill.classList.remove("is-active");
      pill.setAttribute("aria-checked", "false");
    });
    btnEl.classList.add("is-active");
    btnEl.setAttribute("aria-checked", "true");

    // Update displayed price in box
    const priceDisplay = card.querySelector(".product-current-price");
    if (priceDisplay) {
      priceDisplay.textContent = price;
    }
    const unitDisplay = card.querySelector(".price-unit-tag");
    if (unitDisplay) {
      unitDisplay.textContent = `per ${size}`;
    }
  }
}

function getSelectedSizeForProduct(productId) {
  if (selectedSizesMap[productId]) {
    return selectedSizesMap[productId];
  }
  // Lookup default size from catalog
  let product = null;
  if (typeof findProductById === "function") {
    product = findProductById(productId);
  } else if (typeof PRODUCTS !== "undefined") {
    product = PRODUCTS.find(p => p.id === productId);
  }

  if (product && product.sizes && product.sizes.length > 0) {
    const def = product.sizes.find(s => s.default) || product.sizes[0];
    selectedSizesMap[productId] = { size: def.size, price: def.price };
    return selectedSizesMap[productId];
  }
  return { size: "Standard", price: 0 };
}

function addProductCardToCart(productId) {
  const selected = getSelectedSizeForProduct(productId);
  if (typeof cart !== "undefined") {
    cart.addItem(productId, selected.size, 1);
  }
}

function shopProductCardNow(productId) {
  const selected = getSelectedSizeForProduct(productId);
  if (typeof quickOrderWhatsApp === "function") {
    quickOrderWhatsApp(productId, selected.size, 1);
  }
}

/**
 * Generate standard HTML for a single product card
 * Displays each oil type only ONCE with size selector pills and dynamic whiteboard prices
 */
function createProductCardHTML(product) {
  const defaultSizeObj = (product.sizes && product.sizes.find(s => s.default)) || (product.sizes && product.sizes[0]) || { size: "1 Litre", price: 0 };
  const currentPrice = defaultSizeObj.price;
  const currentSize = defaultSizeObj.size;

  // Initialize selectedSizesMap
  if (!selectedSizesMap[product.id]) {
    selectedSizesMap[product.id] = { size: currentSize, price: currentPrice };
  }

  const sizesHTML = (product.sizes || []).map(s => {
    const isActive = s.size === currentSize ? "is-active" : "";
    const isChecked = s.size === currentSize ? "true" : "false";
    return `
      <button 
        type="button" 
        class="size-pill ${isActive}" 
        data-size="${s.size}" 
        data-price="${s.price}"
        onclick="selectProductSize('${product.id}', '${s.size}', ${s.price}, this)"
        aria-checked="${isChecked}"
        role="radio"
      >
        ${s.size}
      </button>
    `;
  }).join("");

  return `
    <article class="product-card" id="prod-${product.id}" data-category="${product.category}">
      <div class="product-card-image-wrap">
        <img 
          src="${product.image}" 
          alt="${product.name} - Kanha Ji Oils Indore" 
          class="product-card-img" 
          loading="lazy" 
          decoding="async" 
          width="280" 
          height="280"
          onerror="this.onerror=null;this.src='assets/icons/oil-placeholder.svg';"
        >
      </div>
      <div class="product-card-body">
        <span class="product-category-tag">${product.categoryName}</span>
        <h3 class="product-title">${product.name}</h3>
        ${product.hindiName ? `<p class="product-hindi-name">${product.hindiName}</p>` : ''}
        <p class="product-desc">${product.description}</p>
        
        <!-- Multi-size picker -->
        <div class="product-size-section">
          <span class="size-label">Select Pack Size:</span>
          <div class="size-pills-row" role="radiogroup" aria-label="Select size for ${product.name}">
            ${sizesHTML}
          </div>
        </div>

        <!-- Dynamic Whiteboard Rate Display -->
        <div class="product-price-box">
          <div class="price-val-wrap">
            <span class="price-currency">₹</span>
            <span class="product-current-price">${currentPrice}</span>
          </div>
          <span class="price-unit-tag">per ${currentSize}</span>
          <span class="price-verified-badge" title="Direct verified rate from store whiteboard">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            Daily Store Rate
          </span>
        </div>

        <!-- Card Actions -->
        <div class="product-card-actions">
          <button 
            type="button" 
            class="btn btn-cart-add" 
            onclick="addProductCardToCart('${product.id}')"
            aria-label="Add ${product.name} to Cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span>Add to Cart</span>
          </button>
          <button 
            type="button" 
            class="btn btn-shop-now" 
            onclick="shopProductCardNow('${product.id}')"
            aria-label="Shop ${product.name} Now via WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>Shop Now</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

/* ----------------------------------------------------
   Homepage Featured Oils Render
----------------------------------------------------- */
function initHomepageFeaturedOils() {
  const container = document.getElementById("homepageFeaturedGrid");
  if (!container || typeof PRODUCTS === "undefined") return;

  // Render top featured oil types (Mustard, Groundnut, Sesame, Sunflower, Soybean, Coconut, Almond, Pain Relief)
  const featured = PRODUCTS.filter(p => p.isFeatured);
  container.innerHTML = featured.map(p => createProductCardHTML(p)).join("");
}

/* ----------------------------------------------------
   Homepage Dedicated Khali Section Render
----------------------------------------------------- */
function initHomepageKhaliSection() {
  const container = document.getElementById("homepageKhaliGrid");
  if (!container || typeof KHALI_PRODUCTS === "undefined") return;

  container.innerHTML = KHALI_PRODUCTS.map(k => createProductCardHTML(k)).join("");
}

/* ----------------------------------------------------
   Shop Page Dynamic Render, Filter & Instant Search
----------------------------------------------------- */
function initShopFeatures() {
  const productsGrid = document.getElementById("productsGrid");
  if (!productsGrid || typeof PRODUCTS === "undefined") return;

  const searchInput = document.getElementById("productSearchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const categoryFilters = document.querySelectorAll("[data-category-filter]");
  const countDisplay = document.getElementById("activeProductsCount");

  let activeCategory = "all";
  let searchQuery = "";

  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get("cat");
  if (catParam) {
    activeCategory = catParam;
  }

  // Combined master catalog: all oils + khali products + agricultural seeds
  const allCatalog = [
    ...PRODUCTS, 
    ...(typeof KHALI_PRODUCTS !== "undefined" ? KHALI_PRODUCTS : []),
    ...(typeof SEEDS_PRODUCTS !== "undefined" ? SEEDS_PRODUCTS : [])
  ];

  function filterAndRender() {
    const filtered = allCatalog.filter(p => {
      const matchCategory = activeCategory === "all" || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        (p.hindiName && p.hindiName.toLowerCase().includes(q)) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="products-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3>No matching oils or khali products found</h3>
          <p>Try searching for "mustard", "sesame", "groundnut", "coconut", "neem", or "khali".</p>
          <button type="button" class="btn btn-secondary btn-sm" onclick="resetFilters()">Reset All Filters</button>
        </div>
      `;
    } else {
      productsGrid.innerHTML = filtered.map(p => createProductCardHTML(p)).join("");
    }

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} of ${allCatalog.length} products`;
    }

    categoryFilters.forEach(btn => {
      const cat = btn.getAttribute("data-category-filter");
      if (cat === activeCategory) {
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.classList.remove("is-active");
        btn.setAttribute("aria-pressed", "false");
      }
    });

    if (clearSearchBtn) {
      clearSearchBtn.style.display = searchQuery ? "inline-flex" : "none";
    }
  }

  categoryFilters.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      activeCategory = btn.getAttribute("data-category-filter");
      filterAndRender();

      if (window.innerWidth < 768) {
        productsGrid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      filterAndRender();
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchQuery = "";
      filterAndRender();
      searchInput.focus();
    });
  }

  filterAndRender();
}

function resetFilters() {
  const searchInput = document.getElementById("productSearchInput");
  if (searchInput) searchInput.value = "";
  const allBtn = document.querySelector("[data-category-filter='all']");
  if (allBtn) allBtn.click();
}

/* ----------------------------------------------------
   FAQ Accordions
----------------------------------------------------- */
function initFaqAccordions() {
  const accordions = document.querySelectorAll(".faq-item");
  if (!accordions.length) return;

  accordions.forEach(item => {
    const trigger = item.querySelector(".faq-question");
    const content = item.querySelector(".faq-answer");
    if (!trigger || !content) return;

    trigger.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", !isExpanded);
      item.classList.toggle("is-open", !isExpanded);
    });
  });
}

/* ----------------------------------------------------
   Video Player / YouTube Facade
   Uses HTML5 native playback to eliminate YouTube Error 153
   (which occurs on local file:// or when referrer headers are blocked).
   Also provides direct YouTube links to watch on YouTube or subscribe.
----------------------------------------------------- */
function initYouTubeFacade() {
  const facades = document.querySelectorAll(".yt-facade");
  facades.forEach(facade => {
    const videoSrc = facade.getAttribute("data-video-src") || "assets/videos/kanhaji_extraction_web.mp4";
    const videoId = facade.getAttribute("data-video-id") || "L66RqlbbY_A";
    const playBtn = facade.querySelector(".yt-play-btn");

    function loadVideo(e) {
      if (e) e.preventDefault();
      if (facade.classList.contains("is-loaded")) return;
      facade.classList.add("is-loaded");

      // Prefer native HTML5 video player:
      // 1. Eliminates YouTube Error 153 (file:// protocol lacks HTTP Referer/Origin headers)
      // 2. Plays instantly offline or online without ads, tracking, or network delays
      if (videoSrc) {
        const video = document.createElement("video");
        video.src = videoSrc;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.className = "yt-iframe";
        video.poster = "assets/videos/kanhaji_extraction_poster.jpg";
        video.setAttribute("title", "Kanha Ji Oil Extraction Official Video");

        facade.innerHTML = "";
        facade.appendChild(video);
        video.play().catch(() => {});
        return;
      }

      // Fallback for YouTube embed with strict referrer policy
      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`);
      iframe.setAttribute("title", "Kanha Ji Oils YouTube Video");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      iframe.className = "yt-iframe";

      facade.innerHTML = "";
      facade.appendChild(iframe);
    }

    if (playBtn) {
      playBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        loadVideo(e);
      });
    }
    facade.addEventListener("click", loadVideo);
  });
}

/* ----------------------------------------------------
   Dedicated YouTube Channel Video Grid (@kanhajioils)
   Ultra-fast lazy-loaded iframe embeds on click or viewport.
   Zero network overhead on initial page load.
   Gracefully handles local file:// protocol to avoid Error 153.
----------------------------------------------------- */
function initYouTubeGrid() {
  const cards = document.querySelectorAll(".yt-video-card");
  if (!cards.length) return;

  cards.forEach(card => {
    const media = card.querySelector(".yt-video-media");
    if (!media) return;

    const videoId = media.getAttribute("data-yt-id");
    const videoTitle = media.getAttribute("data-yt-title") || "Kanha Ji Oils Video";
    const playBtn = media.querySelector(".yt-video-play-btn");

    function embedIframe(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (media.classList.contains("is-playing")) return;
      media.classList.add("is-playing");

      // Check if running on local file:// protocol.
      // YouTube blocks iframe playback on file:// with Error 153 due to missing HTTP referrer headers.
      // Opening on YouTube ensures 100% reliable, pristine playback.
      if (window.location.protocol === "file:") {
        const isShorts = media.querySelector(".yt-video-duration")?.textContent.trim() === "Shorts";
        const ytUrl = isShorts 
          ? `https://www.youtube.com/shorts/${videoId}` 
          : `https://www.youtube.com/watch?v=${videoId}`;
        window.open(ytUrl, "_blank", "noopener,noreferrer");
        return;
      }

      // On HTTP / HTTPS (live site / GitHub Pages / localhost): Load interactive iframe embed
      const iframe = document.createElement("iframe");
      iframe.className = "yt-lazy-iframe";
      iframe.setAttribute("src", `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1`);
      iframe.setAttribute("title", videoTitle);
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");

      media.innerHTML = "";
      media.appendChild(iframe);
    }

    if (playBtn) playBtn.addEventListener("click", embedIframe);
    media.addEventListener("click", embedIframe);
  });

  // Interactive tab filtering for YouTube section
  const tabItems = document.querySelectorAll(".yt-tab-item");
  tabItems.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabItems.forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      cards.forEach(card => {
        const tag = card.querySelector(".yt-video-tag")?.textContent.toLowerCase() || "";
        const duration = card.querySelector(".yt-video-duration")?.textContent.toLowerCase() || "";
        if (index === 0) {
          // All Official Videos
          card.style.display = "flex";
        } else if (index === 1) {
          // Extraction process (non-shorts or extraction tags)
          if (duration !== "shorts" || tag.includes("extraction") || tag.includes("ghani")) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        } else if (index === 2) {
          // Live Ghani Shorts
          if (duration === "shorts") {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        }
      });
    });
  });
}

/* ----------------------------------------------------
   Google Map Lazy Load
----------------------------------------------------- */
function initGoogleMapLazyLoad() {
  const mapContainer = document.getElementById("googleMapContainer");
  if (!mapContainer) return;

  const mapSrc = mapContainer.getAttribute("data-map-src");
  if (!mapSrc) return;

  let loaded = false;
  function loadMap() {
    if (loaded) return;
    loaded = true;

    const iframe = document.createElement("iframe");
    iframe.src = mapSrc;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.style.border = "0";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.title = "Kanha Ji Oils Google Map Location in Indore";

    mapContainer.innerHTML = "";
    mapContainer.appendChild(iframe);
    mapContainer.classList.add("map-rendered");
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadMap();
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "300px 0px" });

    observer.observe(mapContainer);
  } else {
    setTimeout(loadMap, 3000);
  }
}

/* ----------------------------------------------------
   Hero Reel Video Sound Toggle
----------------------------------------------------- */
function initHeroReelVideo() {
  const video = document.getElementById("heroReelVideo");
  const soundBtn = document.getElementById("videoSoundBtn");
  if (!video || !soundBtn) return;

  const iconMuted = soundBtn.querySelector(".sound-icon-muted");
  const iconUnmuted = soundBtn.querySelector(".sound-icon-unmuted");
  const btnText = soundBtn.querySelector(".sound-btn-text");

  soundBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    if (video.muted) {
      if (iconMuted) iconMuted.style.display = "inline-block";
      if (iconUnmuted) iconUnmuted.style.display = "none";
      if (btnText) btnText.textContent = "Unmute";
      soundBtn.setAttribute("aria-label", "Unmute Video");
    } else {
      if (iconMuted) iconMuted.style.display = "none";
      if (iconUnmuted) iconUnmuted.style.display = "inline-block";
      if (btnText) btnText.textContent = "Mute";
      soundBtn.setAttribute("aria-label", "Mute Video");
      video.play().catch(() => {});
    }
  });
}
