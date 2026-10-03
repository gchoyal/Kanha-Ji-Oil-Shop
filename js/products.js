// Kanha Ji Oils - Authentic Verified Product Catalog
// Real product photography & items directly from https://www.rkoilproducts.com/ and Indore Shop
// Rates & pack sizes verified with Indore Store Whiteboard & R.K. Oil Products inventory
// All prices in INR (₹). Each product represented once with dynamic multi-size selector.

const PRODUCTS = [
  // 1. MUSTARD OIL (सरसों तेल - 100% Pure Kachi Ghani)
  {
    id: "mustard-oil",
    name: "Mustard Oil (Kachi Ghani / Cold-Pressed)",
    hindiName: "कच्ची घानी शुद्ध सरसों तेल",
    category: "mustard",
    categoryName: "Mustard Oil",
    defaultSize: "1 Litre",
    image: "assets/images/real_products/kanhaji_mustard_oil_1L.jpg",
    description: "100% pure cold-pressed (Kachi Ghani) mustard oil extracted from premium mustard seeds. Rich in natural pungent aroma, authentic flavor, and essential Omega-3 fatty acids. Zero chemicals, zero palm oil. Perfect for traditional Indian cooking and authentic pickles.",
    specs: ["Cold-Pressed (Kachi Ghani)", "100% Pure & Unrefined", "Zero Palm Oil / Zero Mineral Oil", "Natural Pungent Aroma"],
    sizes: [
      { size: "500ml", price: 100, unit: "bottle" },
      { size: "1 Litre", price: 190, unit: "bottle", default: true },
      { size: "5 Litre", price: 950, unit: "can" },
      { size: "15 Litre", price: 2850, unit: "tin" }
    ],
    isFeatured: true
  },

  // 2. GROUNDNUT OIL (मूंगफली तेल)
  {
    id: "groundnut-oil",
    name: "Groundnut Oil (Cold-Pressed / Filtered)",
    hindiName: "शुद्ध मूंगफली तेल (सौराष्‍ट्र स्पेशल)",
    category: "groundnut",
    categoryName: "Groundnut Oil",
    defaultSize: "1 Litre",
    image: "assets/images/real_products/groundnut_oil_1L.jpg",
    description: "Authentic cold-pressed groundnut (peanut) oil extracted from hand-selected peanuts. Naturally micro-filtered without chemical solvents. Brings rich authentic nutty aroma, high smoke point, and heart-friendly unsaturated fats to your everyday meals.",
    specs: ["Single-Press Cold Pressed", "Unadulterated Saurashtra Seeds", "Zero Palm Oil", "High Smoke Point"],
    sizes: [
      { size: "500ml", price: 110, unit: "bottle" },
      { size: "1 Litre", price: 210, unit: "bottle", default: true },
      { size: "5 Litre", price: 1050, unit: "can" },
      { size: "15 Litre", price: 3150, unit: "tin" }
    ],
    isFeatured: true
  },

  // 3. SESAME OIL (तिल्ली तेल - Til Oil)
  {
    id: "sesame-oil",
    name: "Sesame Oil (Cold-Pressed Til Oil)",
    hindiName: "शुद्ध तिल्ली तेल (कच्ची घानी)",
    category: "sesame",
    categoryName: "Sesame Oil",
    defaultSize: "1 Litre",
    image: "assets/images/real_products/sesame_oil_1L.jpg",
    description: "Revered in Indian culinary and Ayurvedic traditions for centuries. Extracted from premium sesame seeds using gentle mechanical cold pressing to preserve natural sesamol antioxidants, delicate golden hue, and warm nutty flavor.",
    specs: ["Pure Cold-Pressed Til", "Natural Sesamol Antioxidants", "Nutrient-Dense", "Culinary & Body Care"],
    sizes: [
      { size: "500ml", price: 145, unit: "bottle" },
      { size: "1 Litre", price: 280, unit: "bottle", default: true },
      { size: "5 Litre", price: 1400, unit: "can" }
    ],
    isFeatured: true
  },

  // 4. SOYBEAN OIL (सोयाबीन तेल - Kanha Ji Special)
  {
    id: "soybean-oil",
    name: "Soybean Oil (Kanha Ji Filtered Cooking Oil)",
    hindiName: "शुद्ध सोयाबीन तेल (मालवा स्पेशल)",
    category: "cooking",
    categoryName: "Daily Cooking Oils",
    defaultSize: "1 Litre",
    image: "assets/images/real_products/kanhaji_soybean_oil_1L.jpg",
    description: "Unadulterated filtered soybean oil sourced from fertile Malwa farms. Free from palm oil blending and artificial bleaching. A reliable, heart-friendly, and economical daily cooking staple.",
    specs: ["100% Malwa Soybean", "Zero Palm Blends", "Naturally Filtered", "Economical Everyday Staple"],
    sizes: [
      { size: "1 Litre", price: 145, unit: "bottle", default: true },
      { size: "5 Litre", price: 725, unit: "can" },
      { size: "15 Litre", price: 2175, unit: "tin" }
    ],
    isFeatured: true
  },

  // 5. SUNFLOWER OIL (सनफ्लावर तेल)
  {
    id: "sunflower-oil",
    name: "Sunflower Oil (Pure Filtered)",
    hindiName: "शुद्ध सनफ्लावर (सूरजमुखी) तेल",
    category: "cooking",
    categoryName: "Daily Cooking Oils",
    defaultSize: "1 Litre",
    image: "assets/images/sunflower_oil_bottle.jpg",
    description: "Light, healthy, and 100% pure filtered sunflower oil. Naturally rich in Vitamin E with a neutral flavor profile that keeps food light and easily digestible. Zero chemical bleaching or harmful trans fats.",
    specs: ["Naturally Filtered", "Rich in Natural Vitamin E", "Zero Palm Oil", "Light & Non-Greasy"],
    sizes: [
      { size: "1 Litre", price: 170, unit: "bottle", default: true },
      { size: "5 Litre", price: 850, unit: "can" },
      { size: "15 Litre", price: 2550, unit: "tin" }
    ],
    isFeatured: true
  },

  // 6. COCONUT OIL (नारियल तेल)
  {
    id: "coconut-oil",
    name: "Coconut Oil (Virgin Cold-Pressed)",
    hindiName: "शुद्ध नारियल तेल (वर्जिन कोल्ड-प्रेस्ड)",
    category: "wellness",
    categoryName: "Wellness & Specialty Oils",
    defaultSize: "1 Litre",
    image: "assets/images/real_products/coconut_oil_real.jpg",
    description: "100% edible food-grade pure coconut oil cold-pressed from fresh, sulfur-free mature copra. Heavenly natural coconut fragrance and medium-chain fatty acids (Lauric Acid). Multi-purpose for healthy cooking, hair strengthening, and baby skin massage.",
    specs: ["100% Edible Food-Grade", "Sulfur-Free Copra", "No Mineral Oils", "Deep Hair & Skin Conditioning"],
    sizes: [
      { size: "250ml", price: 130, unit: "bottle" },
      { size: "500ml", price: 255, unit: "bottle" },
      { size: "1 Litre", price: 500, unit: "bottle", default: true }
    ],
    isFeatured: true
  },

  // 7. PAIN RELIEF HERBAL OIL (दर्द निवारक आयुर्वेदिक तेल)
  {
    id: "pain-relief-oil",
    name: "Ayurvedic Pain Relief Oil (Dard Ka Tel)",
    hindiName: "दर्द निवारक आयुर्वेदिक तेल (दर्द का तेल)",
    category: "wellness",
    categoryName: "Wellness & Specialty Oils",
    defaultSize: "100ml",
    image: "assets/images/real_products/ayurvedic_pain_oil_real.jpg",
    description: "Potent traditional herbal concoction brewed with time-tested medicinal herbs, camphor (Kapoor), wintergreen, and natural sesame base. Provides soothing relief from joint stiffness, knee pain, lower back discomfort, and muscular fatigue.",
    specs: ["Authentic Herbal Formulation", "Fast-Absorbing & Warming", "Zero Artificial Pain Killers", "Effective For Joints & Muscles"],
    sizes: [
      { size: "100ml", price: 50, unit: "bottle", default: true },
      { size: "200ml", price: 95, unit: "bottle" }
    ],
    isFeatured: true
  },

  // 8. NEEM OIL (शुद्ध नीम तेल)
  {
    id: "neem-oil",
    name: "Neem Oil (100% Pure Cold-Pressed)",
    hindiName: "१००% शुद्ध नीम तेल (जैविक कीटनाशक)",
    category: "wellness",
    categoryName: "Wellness & Specialty Oils",
    defaultSize: "1 Litre",
    image: "assets/images/real_products/neem_oil_real.jpg",
    description: "Extracted from premium wild-harvested neem kernels with high natural Azadirachtin concentration. Highly effective bio-rational protector for garden plants and terrace farming, as well as therapeutic skin cleanser.",
    specs: ["High Azadirachtin Content", "100% Organic Plant Protector", "Cold-Pressed Seed Kernel", "Natural Pest Repellent"],
    sizes: [
      { size: "100ml", price: 30, unit: "bottle" },
      { size: "250ml", price: 65, unit: "bottle" },
      { size: "1 Litre", price: 230, unit: "bottle", default: true }
    ],
    isFeatured: false
  },

  // 9. MAHUA OIL (शुद्ध महुआ तेल)
  {
    id: "mahua-oil",
    name: "Mahua Oil (Pure Cold-Pressed)",
    hindiName: "शुद्ध महुआ तेल (पारंपरिक कोल्ड-प्रेस्ड)",
    category: "wellness",
    categoryName: "Wellness & Specialty Oils",
    defaultSize: "1 Litre",
    image: "assets/images/real_products/mahua_oil_real.jpg",
    description: "Pure natural Mahua oil extracted from dried Mahua (Madhuca Longifolia) seeds. Cherished in tribal and rural traditions for joint massage, traditional soap making, lighting sacred lamps, and skincare.",
    specs: ["Wild Mahua Seeds", "100% Pure Cold Extracted", "Traditional Ayurvedic Base", "Skin & Joint Soothing"],
    sizes: [
      { size: "500ml", price: 120, unit: "bottle" },
      { size: "1 Litre", price: 230, unit: "bottle", default: true },
      { size: "5 Litre", price: 1100, unit: "can" }
    ],
    isFeatured: false
  },

  // 10. KARANJA OIL (शुद्ध करंज तेल)
  {
    id: "karanja-oil",
    name: "Karanja Oil (Pure Cold-Pressed Pongamia Oil)",
    hindiName: "शुद्ध करंज तेल (जैविक संरक्षण)",
    category: "wellness",
    categoryName: "Wellness & Specialty Oils",
    defaultSize: "250ml",
    image: "assets/images/real_products/karanja_oil_real.jpg",
    description: "Pure cold-pressed Pongamia Pinnata oil known for its strong antimicrobial and insect-repellent properties. Synergizes effectively with Neem oil for botanical farming sprays and veterinary care.",
    specs: ["Pongamia Pinnata Extraction", "Natural Insecticidal Properties", "Rich in Flavonoids & Karanjin", "Eco-Friendly Organic Spray"],
    sizes: [
      { size: "250ml", price: 75, unit: "bottle", default: true },
      { size: "500ml", price: 140, unit: "bottle" },
      { size: "1 Litre", price: 260, unit: "bottle" }
    ],
    isFeatured: false
  },

  // 11. POOJA TIL OIL (पूजा तिल्ली तेल)
  {
    id: "pooja-til-oil",
    name: "Pooja Til Oil (Sacred Diya Sesame Oil)",
    hindiName: "पूजा तिल्ली तेल (अखंड ज्योत स्पेशल)",
    category: "pooja",
    categoryName: "Pooja & Ritual Oils",
    defaultSize: "1 Litre",
    image: "assets/images/real_products/pooja_til_oil.png",
    description: "Dedicated pure sesame oil prepared specifically for temple rituals, daily diya lighting, and auspicious ceremonies. Known to burn with a serene, bright, and smokeless holy flame according to Vedic tradition.",
    specs: ["Sattvic Grade Purity", "Smokeless & Steady Flame", "Auspicious Temple Grade", "Long-Burning Diya Oil"],
    sizes: [
      { size: "500ml", price: 90, unit: "bottle" },
      { size: "1 Litre", price: 170, unit: "bottle", default: true },
      { size: "5 Litre", price: 850, unit: "can" }
    ],
    isFeatured: false
  },

  // 12. POOJA SARSO OIL (पूजा सरसों तेल)
  {
    id: "pooja-sarso-oil",
    name: "Pooja Sarso Oil (Diya & Ritual Oil)",
    hindiName: "पूजा सरसों तेल (शनि देव पूजा एवं दीपक)",
    category: "pooja",
    categoryName: "Pooja & Ritual Oils",
    defaultSize: "1 Litre",
    image: "assets/images/real_products/pooja_sarso_oil.png",
    description: "Pure mustard oil formulated for religious ceremonies, Shani dev pooja, temple havan, and holy deepak lighting. Provides a warm, steady, and long-lasting flame.",
    specs: ["Pure Mustard Extraction", "Ideal for Shani Dev Pooja", "Steady Long Flame", "Vedic Ceremony Ready"],
    sizes: [
      { size: "500ml", price: 80, unit: "bottle" },
      { size: "1 Litre", price: 150, unit: "bottle", default: true },
      { size: "5 Litre", price: 750, unit: "can" }
    ],
    isFeatured: false
  },

  // 13. ALMOND OIL (बादाम रोगन)
  {
    id: "almond-oil",
    name: "Almond Oil (100% Pure Badam Rogan)",
    hindiName: "१००% शुद्ध बादाम रोगन तेल",
    category: "wellness",
    categoryName: "Wellness & Specialty Oils",
    defaultSize: "100ml",
    image: "assets/images/almond_oil_bottle.jpg",
    description: "Pure cold-pressed sweet almond oil extracted slowly without thermal heat to preserve natural Vitamin E, magnesium, and proteins. Revered in traditional homes for memory enhancement, glowing radiant skin, and hair vitality.",
    specs: ["100% Sweet Almond Extraction", "Zero Additives / No Silicones", "Food-Grade & Topical Safe", "Rich in Natural Vitamin E"],
    sizes: [
      { size: "100ml", price: 330, unit: "bottle", default: true },
      { size: "250ml", price: 820, unit: "bottle" },
      { size: "1 Litre", price: 3250, unit: "bottle" }
    ],
    isFeatured: true
  },

  // 14. KALONJI OIL (कलोंजी तेल / Black Seed Oil)
  {
    id: "kalonji-oil",
    name: "Kalonji Oil (Pure Black Seed Oil)",
    hindiName: "शुद्ध कलोंजी तेल (ब्लैक सीड ऑयल)",
    category: "wellness",
    categoryName: "Wellness & Specialty Oils",
    defaultSize: "100ml",
    image: "assets/images/kalonji_oil_bottle.jpg",
    description: "100% pure cold-pressed Nigella Sativa (black cumin) seed oil. Packed with Thymoquinone and vital bioactive antioxidants known to support immune vitality, respiratory clarity, digestive balance, and lustrous hair.",
    specs: ["Pure Nigella Sativa Seeds", "High Thymoquinone Content", "Cold-Pressed / Chemical Free", "Immunity & Hair Tonic"],
    sizes: [
      { size: "100ml", price: 200, unit: "bottle", default: true },
      { size: "250ml", price: 490, unit: "bottle" }
    ],
    isFeatured: false
  },

  // 15. HAIR FALL CARE HERBAL OIL (हेयर फॉल कंट्रोल तेल)
  {
    id: "hairfall-oil",
    name: "Hair Fall Control Herbal Oil",
    hindiName: "हेयर फॉल कंट्रोल हर्बल तेल",
    category: "wellness",
    categoryName: "Wellness & Specialty Oils",
    defaultSize: "100ml",
    image: "assets/images/ayurvedic_herbal_oil.jpg",
    description: "Specialized restorative herbal hair oil infused with Bhringraj, Amla, Brahmi, Methi, and cold-pressed sesame base. Feeds the hair roots, reduces seasonal hair fall, fights dandruff, and restores natural hair texture.",
    specs: ["Bhringraj & Amla Infused", "Cold-Pressed Seed Base", "No Mineral Oil / No Synthetic Scent", "Deep Scalp Nourishment"],
    sizes: [
      { size: "100ml", price: 130, unit: "bottle", default: true },
      { size: "200ml", price: 250, unit: "bottle" }
    ],
    isFeatured: false
  },

  // 16. FLAXSEED OIL (अलसी तेल - Alsi Oil)
  {
    id: "flaxseed-oil",
    name: "Flaxseed Oil (Cold-Pressed Alsi Oil)",
    hindiName: "शुद्ध अलसी तेल (ओमेगा-3 भरपूर)",
    category: "wellness",
    categoryName: "Wellness & Specialty Oils",
    defaultSize: "1 Litre",
    image: "assets/images/flaxseed_oil_bottle.jpg",
    description: "Rich plant-based source of Alpha-Linolenic Acid (ALA Omega-3) cold pressed from whole golden-brown flaxseeds. Unrefined and nutrient-dense, supporting cardiovascular health, joint flexibility, and skin moisture.",
    specs: ["Rich in Vegan Omega-3 (ALA)", "Cold-Pressed Raw Seeds", "Unrefined & Natural", "Heart & Joint Wellness"],
    sizes: [
      { size: "500ml", price: 105, unit: "bottle" },
      { size: "1 Litre", price: 200, unit: "bottle", default: true }
    ],
    isFeatured: false
  },

  // 17. CASTOR OIL (अरण्डी तेल - Arandi Oil)
  {
    id: "castor-oil",
    name: "Castor Oil (Pure Cold-Pressed)",
    hindiName: "शुद्ध अरण्डी तेल (एरंड तेल)",
    category: "wellness",
    categoryName: "Wellness & Specialty Oils",
    defaultSize: "1 Litre",
    image: "assets/images/castor_oil_bottle.jpg",
    description: "Hexane-free, virgin cold-pressed Ricinus communis oil. Renowned for its rich ricinoleic acid content, providing deep conditioning for thinning eyebrows, eyelashes, brittle hair ends, and traditional detox routines.",
    specs: ["Hexane-Free Cold Press", "Extra Thick & Pure", "Traditional Detox Grade", "Intense Hair & Brow Care"],
    sizes: [
      { size: "250ml", price: 65, unit: "bottle" },
      { size: "500ml", price: 130, unit: "bottle" },
      { size: "1 Litre", price: 250, unit: "bottle", default: true }
    ],
    isFeatured: false
  }
];

// Dedicated KHALI (Oil Cakes / Organic Bio-Fertilizers) Catalog
// Verified real photos from https://www.rkoilproducts.com/
const KHALI_PRODUCTS = [
  {
    id: "neem-khali",
    name: "Neem Khali Cake (Organic Neem Fertilizer)",
    hindiName: "शुद्ध नीम खली केक (ऑर्गेनिक बायो-फर्टिलाइजर)",
    category: "khali",
    categoryName: "Organic Khali & Fertilizer",
    defaultSize: "5 kg",
    image: "assets/images/real_products/neem_khali_cake_real.png",
    description: "Pure residual cake obtained after cold-pressing organic neem kernels. A potent natural bio-fertilizer and soil pest nematicide. Enriches home gardens, terrace plants, lawns, and agricultural fields with natural N-P-K, sulfur, and Azadirachtin.",
    specs: ["100% Organic Soil Conditioner", "Protects Plant Roots from Termites & Nematodes", "Enriches Nitrogen & Micro-Nutrients", "Terrace Garden & Farm Ready"],
    sizes: [
      { size: "1 kg", price: 40, unit: "pack" },
      { size: "5 kg", price: 190, unit: "pack", default: true },
      { size: "25 kg", price: 950, unit: "sack" },
      { size: "50 kg", price: 1850, unit: "bag" }
    ]
  },
  {
    id: "mustard-khali",
    name: "Mustard Khali (Pure Sarso Khali Cake)",
    hindiName: "सरसों खली (शुद्ध जैविक खाद एवं पशु आहार)",
    category: "khali",
    categoryName: "Organic Khali & Fertilizer",
    defaultSize: "5 kg",
    image: "assets/images/real_products/mustard_oil_cake_real.png",
    description: "Nutrient-dense natural oil cake from cold-pressed mustard seeds. Highly recommended as an organic fertilizer for flowering plants, rose gardens, and fruit trees, as well as an authentic protein supplement for cattle feed.",
    specs: ["High Natural Nitrogen & Potassium", "Boosts Abundant Flowering & Greener Leaves", "Dual Purpose: Organic Manure & Cattle Feed", "Zero Synthetic Additives"],
    sizes: [
      { size: "1 kg", price: 50, unit: "pack" },
      { size: "5 kg", price: 240, unit: "pack", default: true },
      { size: "25 kg", price: 1200, unit: "sack" },
      { size: "50 kg", price: 2300, unit: "bag" }
    ]
  },
  {
    id: "karanja-cake",
    name: "Karanja Cake (Bio-Fertilizer & Soil Conditioner)",
    hindiName: "करंज खली (जैविक कीट नियंत्रण एवं भूमि सुधारक)",
    category: "khali",
    categoryName: "Organic Khali & Fertilizer",
    defaultSize: "5 kg",
    image: "assets/images/real_products/karanja_cake_real.jpg",
    description: "100% organic residual cake from cold-pressed Karanja seeds. Suppresses harmful soil-borne pathogens, enhances organic carbon, and acts as a slow-release natural nitrogen retainer.",
    specs: ["Soil Pathogen Suppressant", "Slow-Release Nitrogen Retainer", "Improves Root Health", "Safe for Organic Kitchen Gardens"],
    sizes: [
      { size: "5 kg", price: 210, unit: "pack", default: true },
      { size: "25 kg", price: 1000, unit: "sack" },
      { size: "50 kg", price: 1950, unit: "bag" }
    ]
  },
  {
    id: "mahua-cake",
    name: "Mahua Oil Cake (Organic Soil Manure)",
    hindiName: "महुआ खली (प्राकृतिक जैविक खाद)",
    category: "khali",
    categoryName: "Organic Khali & Fertilizer",
    defaultSize: "5 kg",
    image: "assets/images/real_products/mahua_oil_cake_real.jpeg",
    description: "Traditional Mahua seed oil cake. Naturally acidic, excellent for balancing alkaline soils and revitalizing exhausted farmland with bio-active micronutrients.",
    specs: ["Alkaline Soil Neutralizer", "Earthworm Friendly Organic Matter", "Slow-Decomposing Plant Food", "Traditional Malwa Manure"],
    sizes: [
      { size: "5 kg", price: 190, unit: "pack", default: true },
      { size: "25 kg", price: 900, unit: "sack" },
      { size: "50 kg", price: 1750, unit: "bag" }
    ]
  },
  {
    id: "neem-cake-powder",
    name: "Neem Cake Powder (Terrace & Lawn Fertilizer)",
    hindiName: "नीम खली पाउडर (गमलों एवं लॉन हेतु जैविक खाद)",
    category: "khali",
    categoryName: "Organic Khali & Fertilizer",
    defaultSize: "1 kg",
    image: "assets/images/real_products/neem_cake_powder_real.jpg",
    description: "Micro-pulverized pure neem cake powder designed for immediate soil mixing in potted houseplants, ornamental flowering beds, and rooftop terrace kitchen gardens.",
    specs: ["Fine Powder for Quick Absorption", "Instant Potted Plant Dressing", "Protects Potted Roots from Grubs", "Ready to Mix with Potting Soil"],
    sizes: [
      { size: "1 kg", price: 45, unit: "pack", default: true },
      { size: "5 kg", price: 210, unit: "pack" },
      { size: "25 kg", price: 990, unit: "sack" }
    ]
  },
  {
    id: "neem-fertilizer",
    name: "Neem Cake Fertilizer (Bio-Enriched Manure)",
    hindiName: "नीम खाद फर्टिलाइजर (समृद्ध जैविक पोषण)",
    category: "khali",
    categoryName: "Organic Khali & Fertilizer",
    defaultSize: "5 kg",
    image: "assets/images/real_products/neem_cake_fertilizer_real.png",
    description: "Bio-enriched organic neem manure formulated with optimal nitrogen-phosphorus-potassium balance. Enhances agricultural yield and protects plants from subterranean insects.",
    specs: ["Enriched N-P-K Organic Formula", "Broad-Spectrum Biological Shield", "Improves Water Retention", "Certified Non-Toxic"],
    sizes: [
      { size: "5 kg", price: 220, unit: "pack", default: true },
      { size: "25 kg", price: 1050, unit: "sack" },
      { size: "50 kg", price: 2000, unit: "bag" }
    ]
  }
];

// Dedicated SEEDS & AGRICULTURAL PRODUCE Catalog
// Verified real photos from https://www.rkoilproducts.com/
const SEEDS_PRODUCTS = [
  {
    id: "mahua-seeds",
    name: "Mahua Seeds (Dried Natural Mahua)",
    hindiName: "शुद्ध महुआ बीज (आयुर्वेदिक एवं तेल निष्कर्षण)",
    category: "seeds",
    categoryName: "Seeds & Agricultural Produce",
    defaultSize: "1 kg",
    image: "assets/images/real_products/mahua_seeds_real.png",
    description: "Sundried, unpolished wild Mahua (Madhuca Longifolia) seeds directly sourced for traditional extraction and Ayurvedic remedies.",
    specs: ["Hand-Harvested Wild Seeds", "Rich Natural Oil Content", "Zero Chemical Preservatives", "Bulk & Retail Packs"],
    sizes: [
      { size: "1 kg", price: 90, unit: "pack", default: true },
      { size: "10 kg", price: 850, unit: "bag" },
      { size: "50 kg", price: 4000, unit: "sack" }
    ]
  },
  {
    id: "karanja-seeds",
    name: "Karanja Seeds (Natural Pongamia Seeds)",
    hindiName: "करंज बीज (प्राकृतिक पोंगामिया बीज)",
    category: "seeds",
    categoryName: "Seeds & Agricultural Produce",
    defaultSize: "1 kg",
    image: "assets/images/real_products/karanja_seeds_real.png",
    description: "High-grade Pongamia Pinnata seeds for bio-pesticide oil extraction and organic farm protection.",
    specs: ["High Bitter Alkaloid Content", "Ideal for Bio-Pesticide Oil", "Sun-Dried & Cleaned", "Natural Insect Deterrent"],
    sizes: [
      { size: "1 kg", price: 80, unit: "pack", default: true },
      { size: "10 kg", price: 750, unit: "bag" },
      { size: "50 kg", price: 3500, unit: "sack" }
    ]
  },
  {
    id: "neem-seeds",
    name: "Dry Neem Seeds (High Azadirachtin Kernels)",
    hindiName: "सूखे नीम बीज (उच्च एज़ाडिरेक्टिन ग्रेड)",
    category: "seeds",
    categoryName: "Seeds & Agricultural Produce",
    defaultSize: "1 kg",
    image: "assets/images/real_products/neem_seeds_real.jpg",
    description: "Ripe, sorted and carefully dried whole neem fruit seeds with intact kernels. Widely utilized for organic farming sprays and pest repulsion.",
    specs: ["Premium Azadirachtin Grade", "Natural Garden Pest Shield", "Air-Dried Whole Fruit", "Farm & Terrace Gardening"],
    sizes: [
      { size: "1 kg", price: 70, unit: "pack", default: true },
      { size: "10 kg", price: 650, unit: "bag" },
      { size: "50 kg", price: 3000, unit: "sack" }
    ]
  }
];

// Helper to look up any item (Oil, Khali, or Seeds)
function findProductById(id) {
  const oil = PRODUCTS.find(p => p.id === id);
  if (oil) return oil;
  const khali = KHALI_PRODUCTS.find(k => k.id === id);
  if (khali) return khali;
  return (typeof SEEDS_PRODUCTS !== "undefined" ? SEEDS_PRODUCTS.find(s => s.id === id) : null);
}
