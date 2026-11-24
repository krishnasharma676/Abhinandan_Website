// Data for the Interactive Hamper Builder
// Modelled after real Abhinandan Gifting hampers & dry fruit curations

export const BUILDER_BOXES = [
  {
    id: "box-wicker-pearl",
    name: "Handwoven Cane Wicker Basket",
    subtitle: "Includes draped pearl strands & floral brooch",
    price: 1299,
    capacity: 6,
    dimensions: "34 x 24 x 16 cm",
    popular: true,
    image: "/assets/brand/diwali-corporate-basket.png",
    colors: ["Natural Cane", "Golden Willow", "Bleached White"],
    description: "Our signature artisanal woven boat-shaped basket adorned with twin pearl bead garlands and floral brooch."
  },
  {
    id: "box-royal-whispers",
    name: "Royal Whispers Pleated Silk Tray",
    subtitle: "Pleated fabric wrap with pearl rosette brooch",
    price: 1899,
    capacity: 7,
    dimensions: "38 x 26 x 14 cm",
    luxury: true,
    image: "/assets/brand/royal-whispers-trousseau.png",
    colors: ["Royal Plum", "Peacock Blue", "Emerald Velvet"],
    description: "Opulent elevated trousseau tray featuring hand-pleated satin fabric and center pearl brooch."
  },
  {
    id: "box-golden-thal",
    name: "Royal Festive Golden Thal",
    subtitle: "Partitioned circular brass-toned thali platter",
    price: 999,
    capacity: 4,
    dimensions: "30 cm diameter x 8 cm",
    image: "/assets/brand/diwali-dryfruit-thal.png",
    colors: ["Gilded Gold", "Antique Brass", "Rose Gold"],
    description: "Embossed traditional metal thali with 4 airtight compartments and central floral medallion."
  },
  {
    id: "box-rope-weave",
    name: "Artisan Cotton Rope Boat Basket",
    subtitle: "Eco-rope weave with striped handles",
    price: 1199,
    capacity: 6,
    dimensions: "32 x 22 x 15 cm",
    image: "/assets/brand/royal-whispers-trousseau.png",
    colors: ["White & Navy", "Ivory & Gold", "Natural Beige"],
    description: "Modern boat-shaped rope basket with canvas handles and natural aspen wood shred."
  }
];

export const BUILDER_ITEM_CATEGORIES = [
  "All",
  "Golden Potlis & Nuts",
  "Festive Diyas & Embellishments",
  "Gourmet Sweets & Jars",
  "Floral Brooches & Keepsakes"
];

export const BUILDER_PRODUCTS = [
  // Golden Potlis & Nuts
  {
    id: "item-potli-almonds",
    category: "Golden Potlis & Nuts",
    name: "Golden Satin Potli - California Almonds (250g)",
    price: 490,
    image: "/assets/brand/diwali-corporate-basket.png",
    weight: "250g",
    description: "Shimmering golden satin potli pouch tied with golden drawstring cord and tassels."
  },
  {
    id: "item-potli-cashews",
    category: "Golden Potlis & Nuts",
    name: "Golden Satin Potli - Jumbo Cashews (250g)",
    price: 540,
    image: "/assets/brand/diwali-corporate-basket.png",
    weight: "250g",
    description: "Grade W180 slow-roasted crunchy cashews packed in golden drawstring pouch."
  },
  {
    id: "item-jar-pistachios",
    category: "Golden Potlis & Nuts",
    name: "Airtight Golden Cap Jar - Iranian Pistachios",
    price: 580,
    image: "/assets/brand/royal-whispers-trousseau.png",
    weight: "200g jar",
    description: "Crystal clear glass jar with metallic gold lid filled with roasted salted pistachios."
  },

  // Festive Diyas & Embellishments
  {
    id: "item-kundan-diya",
    category: "Festive Diyas & Embellishments",
    name: "Handcrafted Kundan & Pearl Diya Brooch",
    price: 390,
    image: "/assets/brand/diwali-corporate-basket.png",
    weight: "Brass & Kundan",
    description: "Ornate traditional diya embellished with white pearls, kundan stones, and golden filigree."
  },
  {
    id: "item-pearl-garlands",
    category: "Festive Diyas & Embellishments",
    name: "Twin Draped Pearl Garlands for Rim",
    price: 250,
    image: "/assets/brand/diwali-corporate-basket.png",
    weight: "Acrylic Pearls",
    description: "Luminous string of pearls custom looped along the front rim of the basket."
  },

  // Gourmet Sweets & Jars
  {
    id: "item-diamond-sweet-box",
    category: "Gourmet Sweets & Jars",
    name: "Red Diamond Rigid Sweet Box (Kaju Katli)",
    price: 650,
    image: "/assets/brand/diwali-corporate-basket.png",
    weight: "350g",
    description: "Geometric red & white patterned rigid box filled with silver-foiled pure kaju katli."
  },
  {
    id: "item-kashmir-saffron-honey",
    category: "Gourmet Sweets & Jars",
    name: "Raw Wild Honey with Saffron Strands",
    price: 480,
    image: "/assets/brand/royal-whispers-trousseau.png",
    weight: "200g",
    description: "Pure unprocessed Kashmir honey infused with organic saffron."
  },

  // Floral Brooches & Keepsakes
  {
    id: "item-hotpink-flower",
    category: "Floral Brooches & Keepsakes",
    name: "Silk Magenta Gerbera & Foliage Brooch",
    price: 220,
    image: "/assets/brand/diwali-corporate-basket.png",
    weight: "Silk & Pearl",
    description: "Vibrant hot pink silk flower with pearl center and golden wheat accents."
  },
  {
    id: "item-purple-rosette",
    category: "Floral Brooches & Keepsakes",
    name: "Hand-Pleated Purple Silk Rosette with Brooch",
    price: 350,
    image: "/assets/brand/royal-whispers-trousseau.png",
    weight: "Silk Fabric",
    description: "Radial pleated silk blossom with pearl and rhinestone center brooch."
  }
];

export const BUILDER_PACKAGING_OPTIONS = [
  {
    id: "pack-pearl-strings",
    name: "Twin Pearl Strands & Satin Ribbon",
    price: 0,
    image: "/assets/brand/diwali-corporate-basket.png",
    description: "Signature Abhinandan styling: lustrous pearl garlands draped along the rim."
  },
  {
    id: "pack-pleated-brooch",
    name: "Pleated Silk Wrap & Kundan Brooch",
    price: 350,
    image: "/assets/brand/royal-whispers-trousseau.png",
    description: "Pleated fabric wrap fastened with a jeweled kundan and pearl brooch."
  },
  {
    id: "pack-floral-garland",
    name: "Fresh Touch Floral Posy & Bells",
    price: 250,
    image: "/assets/brand/diwali-dryfruit-thal.png",
    description: "Hand-tied silk flowers, gold foil leaf sprigs, and delicate hanging brass bells."
  }
];
