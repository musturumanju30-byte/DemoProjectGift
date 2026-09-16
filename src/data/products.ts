import { Product } from "@/types";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Personalised 3D Illusion LED Night Lamp",
    slug: "personalised-3d-illusion-led-night-lamp",
    description: "Turn your most cherished memory into a glowing piece of art. Featuring precision laser-engraved acrylic mounted on a warm natural beechwood base with multi-color warm LED lighting and a custom touch switch.",
    shortDescription: "Laser-engraved acrylic with warm wooden base and custom message.",
    price: 699,
    originalPrice: 1299,
    discountPercent: 46,
    category: "personalised-gifts",
    categoryName: "Personalised Gifts",
    subcategory: "LED Lamps",
    occasions: ["anniversary", "birthday", "love-romance"],
    recipients: ["couple", "her", "him", "friend"],
    feelings: ["love-romance", "thank-you"],
    tags: ["Personalised", "Best Seller", "LED Art", "Same-Day"],
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 184,
    inStock: true,
    stockCount: 25,
    isBestseller: true,
    isSameDay: true,
    isPersonalised: true,
    personalisationConfig: {
      requireEngravingText: true,
      engravingPlaceholder: "Enter couple names or quote (e.g., Rohit & Priya • Forever)",
      engravingMaxChars: 40,
      requirePhotoUpload: true,
      photoUploadLabel: "Upload couple or portrait photo (HD recommended)",
      requireMessageNote: true,
      variants: [
        {
          name: "Base Style",
          options: [
            { label: "Warm White Wood Base", priceDelta: 0 },
            { label: "RGB 7-Color Remote Base", priceDelta: 149 }
          ]
        }
      ]
    },
    features: [
      "High-grade scratch resistant optical acrylic",
      "Warm soothing ambient glow suitable for bedside",
      "Laser cut with precision 0.1mm micro-engraving",
      "Includes USB cable and safety adapter"
    ],
    dimensions: "18 cm (H) x 14 cm (W) x 4 cm (Base)",
    careInstructions: "Wipe clean gently with a soft micro-fiber cloth. Avoid abrasive liquids."
  },
  {
    id: "prod-2",
    title: "Royal Crimson 50 Red Roses Luxury Round Box",
    slug: "royal-crimson-50-red-roses-luxury-round-box",
    description: "An unforgettable gesture of timeless romance. 50 hand-picked, velvety Dutch red roses arranged elegantly in a bespoke matte black or blush pink cylindrical box accented with gold foil lettering.",
    shortDescription: "50 premium Dutch red roses in signature luxury hatbox.",
    price: 1899,
    originalPrice: 2499,
    discountPercent: 24,
    category: "flowers",
    categoryName: "Fresh Flowers",
    subcategory: "Box Arrangements",
    occasions: ["anniversary", "love-romance", "birthday", "wedding"],
    recipients: ["her", "couple"],
    feelings: ["love-romance", "congratulations"],
    tags: ["Fresh Blooms", "Luxury Box", "Same-Day Repalle"],
    images: [
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 215,
    inStock: true,
    stockCount: 18,
    isBestseller: true,
    isSameDay: true,
    isPersonalised: true,
    personalisationConfig: {
      requireEngravingText: false,
      requirePhotoUpload: false,
      requireMessageNote: true,
      variants: [
        {
          name: "Box Color",
          options: [
            { label: "Signature Matte Black & Gold", priceDelta: 0 },
            { label: "Blush Pink Romance", priceDelta: 0 },
            { label: "Imperial Royal Navy", priceDelta: 0 }
          ]
        }
      ]
    },
    features: [
      "Farm-fresh A-grade long stem Dutch roses",
      "Oasis floral foam base retains hydration for 3-5 days",
      "Includes complimentary handwritten calligraphy card"
    ],
    dimensions: "30 cm height x 25 cm diameter",
    careInstructions: "Add 100ml water gently into the center every 24 hours. Keep away from direct sunlight."
  },
  {
    id: "prod-3",
    title: "Dutch Truffle Chocolate Floral Delight Cake",
    slug: "dutch-truffle-chocolate-floral-delight-cake",
    description: "Rich, decadent layers of Belgian dark chocolate ganache infused with moist cocoa sponge, adorned with fresh edible rose petals and golden chocolate spheres. Freshly baked for same-day delivery in Repalle.",
    shortDescription: "Belgian chocolate ganache with edible floral garnish.",
    price: 649,
    originalPrice: 899,
    discountPercent: 28,
    category: "cakes",
    categoryName: "Handcrafted Cakes",
    subcategory: "Chocolate Cakes",
    occasions: ["birthday", "anniversary", "congratulations"],
    recipients: ["her", "him", "kids", "friend", "parents"],
    feelings: ["congratulations", "thank-you", "love-romance"],
    tags: ["Eggless Available", "Fresh Baked", "Same-Day", "Bestseller"],
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 312,
    inStock: true,
    stockCount: 30,
    isBestseller: true,
    isSameDay: true,
    isPersonalised: true,
    personalisationConfig: {
      requireEngravingText: true,
      engravingPlaceholder: "Cake Message (e.g., Happy Birthday Harika!)",
      engravingMaxChars: 30,
      requirePhotoUpload: false,
      requireMessageNote: true,
      variants: [
        {
          name: "Weight",
          options: [
            { label: "0.5 Kg (Serves 4-6)", priceDelta: 0 },
            { label: "1.0 Kg (Serves 8-10)", priceDelta: 450 },
            { label: "1.5 Kg (Serves 12-15)", priceDelta: 900 }
          ]
        },
        {
          name: "Egg Preference",
          options: [
            { label: "100% Pure Eggless", priceDelta: 0 },
            { label: "With Egg", priceDelta: 0 }
          ]
        }
      ]
    },
    features: [
      "Pure 54% dark Belgian chocolate couverture",
      "Baked fresh to order within 2 hours of delivery",
      "Includes complimentary candles and cutting knife"
    ],
    careInstructions: "Store in refrigerator upon delivery. Best consumed within 24 hours at room temperature."
  },
  {
    id: "prod-4",
    title: "Golden Sunshine Sunflower & Daisy Glass Vase",
    slug: "golden-sunshine-sunflower-daisy-glass-vase",
    description: "Brighten any room with positive energy! Radiant imported sunflowers paired with snowy daisy chrysanthemums, gypsophila and eucalyptus stems in an embossed European glass vase.",
    shortDescription: "Vibrant sunflowers and daisies in reusable designer vase.",
    price: 1199,
    originalPrice: 1599,
    discountPercent: 25,
    category: "flowers",
    categoryName: "Fresh Flowers",
    subcategory: "Vase Arrangements",
    occasions: ["birthday", "congratulations", "festival"],
    recipients: ["friend", "parents", "her", "him"],
    feelings: ["thank-you", "congratulations", "miss-you"],
    tags: ["Sunflowers", "Vase Included", "Same-Day"],
    images: [
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567696911980-2eed69a46042?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 94,
    inStock: true,
    stockCount: 14,
    isBestseller: true,
    isSameDay: true,
    isPersonalised: true,
    personalisationConfig: {
      requireEngravingText: false,
      requirePhotoUpload: false,
      requireMessageNote: true
    },
    features: [
      "Bright golden blossoms selected for maximum vase longevity",
      "Comes complete with luxury ribbed glass vase",
      "Delivered with flower food sachet"
    ]
  },
  {
    id: "prod-5",
    title: "Royal Celebration Grand Gourmet Hamper",
    slug: "royal-celebration-grand-gourmet-hamper",
    description: "The ultimate gifting experience. Beautifully presented in a handcrafted pinewood crate: Ferrero Rocher chocolates, premium roasted almond jar, aromatic French vanilla candle, custom wooden photo frame, and a mini rose bouquet.",
    shortDescription: "Luxury wooden crate with chocolates, candle, photo frame & nuts.",
    price: 2199,
    originalPrice: 2999,
    discountPercent: 27,
    category: "hampers",
    categoryName: "Hampers & Combos",
    subcategory: "Luxury Hampers",
    occasions: ["wedding", "anniversary", "birthday", "festival"],
    recipients: ["couple", "parents", "friend", "him", "her"],
    feelings: ["congratulations", "love-romance", "thank-you"],
    tags: ["Luxury Box", "Gourmet", "Best Seller"],
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 5.0,
    reviewCount: 167,
    inStock: true,
    stockCount: 12,
    isBestseller: true,
    isSameDay: true,
    isPersonalised: true,
    personalisationConfig: {
      requireEngravingText: true,
      engravingPlaceholder: "Name/Message on Hamper Plaque",
      engravingMaxChars: 30,
      requirePhotoUpload: true,
      photoUploadLabel: "Photo for 4x6 Hamper Frame",
      requireMessageNote: true
    },
    features: [
      "Handmade reusable pine crate with golden metal latch",
      "Imported treats and soy scented candle",
      "Includes personalised 4x6 tabletop frame"
    ]
  },
  {
    id: "prod-6",
    title: "Laser-Engraved Natural Birch Wooden Portrait",
    slug: "laser-engraved-natural-birch-wooden-portrait",
    description: "Your photograph forever preserved in natural grain birch wood. Detailed laser etching creates realistic shadows and depth. Finished with organic wood oil and accompanied by an easel stand.",
    shortDescription: "Fine laser-engraved birchwood portrait with stand.",
    price: 849,
    originalPrice: 1499,
    discountPercent: 43,
    category: "personalised-gifts",
    categoryName: "Personalised Gifts",
    subcategory: "Wood Art",
    occasions: ["anniversary", "birthday", "wedding"],
    recipients: ["parents", "couple", "him", "her"],
    feelings: ["love-romance", "thank-you"],
    tags: ["Wood Engraving", "Eco Friendly", "Handcrafted in Repalle"],
    images: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    stockCount: 20,
    isBestseller: true,
    isSameDay: true,
    isPersonalised: true,
    personalisationConfig: {
      requireEngravingText: true,
      engravingPlaceholder: "Bottom date/quote (e.g. Happy 25th Silver Jubilee)",
      engravingMaxChars: 45,
      requirePhotoUpload: true,
      photoUploadLabel: "High-resolution portrait photo"
    },
    features: [
      "Natural 10mm Russian Birch ply",
      "Lifelong permanence, won't fade or peel",
      "Tabletop wooden stand included"
    ],
    dimensions: "8 x 6 inches (Standard) or 10 x 8 inches (Large)"
  },
  {
    id: "prod-7",
    title: "Romantic Red Velvet Heart Symphony Cake",
    slug: "romantic-red-velvet-heart-symphony-cake",
    description: "A show-stopping heart-shaped cake featuring velvety crimson crumb, smooth Philadelphia cream cheese frosting, and edible white chocolate drizzle. Perfect for anniversaries and romantic milestones.",
    shortDescription: "Heart-shaped crimson cake with cream cheese frosting.",
    price: 749,
    originalPrice: 999,
    discountPercent: 25,
    category: "cakes",
    categoryName: "Handcrafted Cakes",
    subcategory: "Red Velvet",
    occasions: ["anniversary", "love-romance", "birthday"],
    recipients: ["her", "him", "couple"],
    feelings: ["love-romance"],
    tags: ["Heart Shaped", "Eggless Available", "Same-Day"],
    images: [
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 198,
    inStock: true,
    stockCount: 22,
    isBestseller: true,
    isSameDay: true,
    isPersonalised: true,
    personalisationConfig: {
      requireEngravingText: true,
      engravingPlaceholder: "Piped Cake Text (e.g., Happy Anniversary Jaan)",
      engravingMaxChars: 25,
      variants: [
        {
          name: "Size",
          options: [
            { label: "0.5 Kg Heart", priceDelta: 0 },
            { label: "1.0 Kg Heart", priceDelta: 500 }
          ]
        },
        {
          name: "Dietary",
          options: [
            { label: "100% Eggless", priceDelta: 0 },
            { label: "Regular with Egg", priceDelta: 0 }
          ]
        }
      ]
    }
  },
  {
    id: "prod-8",
    title: "Air-Purifying Bonsai Jade Plant in Golden Ceramic Pot",
    slug: "air-purifying-bonsai-jade-plant-in-golden-ceramic-pot",
    description: "Symbolizing luck, prosperity, and eternal growth. A healthy, dense Crassula Ovata Jade plant nestled in rich soil and presented in a handcrafted golden metallic finish ceramic pot with drainage tray.",
    shortDescription: "Good luck succulent bonsai in metallic ceramic planter.",
    price: 499,
    originalPrice: 799,
    discountPercent: 38,
    category: "plants",
    categoryName: "Plants & Planters",
    subcategory: "Indoor Succulents",
    occasions: ["congratulations", "birthday", "festival"],
    recipients: ["parents", "friend", "him", "her"],
    feelings: ["thank-you", "congratulations"],
    tags: ["Air Purifying", "Low Maintenance", "Lucky Plant"],
    images: [
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 88,
    inStock: true,
    stockCount: 35,
    isBestseller: false,
    isSameDay: true,
    isPersonalised: true,
    personalisationConfig: {
      requireEngravingText: true,
      engravingPlaceholder: "Custom Plant Tag message (e.g., Grow with Love)",
      engravingMaxChars: 25
    },
    features: [
      "Resilient succulent requiring minimal watering (once every 5 days)",
      "High quality ceramic pot with glossy golden glaze",
      "Purifies indoor air and invites positive feng shui"
    ]
  },
  {
    id: "prod-9",
    title: "Customized Spotify Acrylic Plaque with Wooden Stand",
    slug: "customized-spotify-acrylic-plaque-with-wooden-stand",
    description: "Scan the scannable Spotify code with your phone to instantly play 'Your Song'! High definition direct UV print with your favorite photo, song title, artist, and timestamp on unbreakable optical acrylic.",
    shortDescription: "Scannable music plaque with your photo and wooden stand.",
    price: 549,
    originalPrice: 999,
    discountPercent: 45,
    category: "personalised-gifts",
    categoryName: "Personalised Gifts",
    subcategory: "Music Plaques",
    occasions: ["anniversary", "birthday", "love-romance"],
    recipients: ["couple", "her", "him", "friend"],
    feelings: ["love-romance", "miss-you"],
    tags: ["Spotify Plaque", "Music Gift", "Trending on Instagram"],
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 260,
    inStock: true,
    stockCount: 40,
    isBestseller: true,
    isSameDay: true,
    isPersonalised: true,
    personalisationConfig: {
      requireEngravingText: true,
      engravingPlaceholder: "Song Title & Artist (e.g. Kesariya - Arijit Singh)",
      engravingMaxChars: 40,
      requirePhotoUpload: true,
      photoUploadLabel: "Upload photo for album cover art"
    }
  },
  {
    id: "prod-10",
    title: "Handcrafted Ocean Breeze Resin Wall Clock",
    slug: "handcrafted-ocean-breeze-resin-wall-clock",
    description: "Bring the tranquil waves of the Andhra coastline into your home. Hand-poured epoxy resin with multi-shade turquoise ocean waves, genuine sea sand texture, gold leaf accents, and silent sweep quartz movement.",
    shortDescription: "12-inch resin wall clock with coastal wave art and gold accents.",
    price: 1499,
    originalPrice: 2299,
    discountPercent: 35,
    category: "home-decor",
    categoryName: "Home Decor",
    subcategory: "Resin Art",
    occasions: ["wedding", "congratulations", "anniversary"],
    recipients: ["couple", "parents", "friend"],
    feelings: ["congratulations", "thank-you"],
    tags: ["Resin Art", "Repalle Studio Original", "Wall Decor"],
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 76,
    inStock: true,
    stockCount: 8,
    isBestseller: false,
    isSameDay: false,
    isPersonalised: true,
    personalisationConfig: {
      requireEngravingText: true,
      engravingPlaceholder: "Family Name / House Name (e.g. The Manjunath Villa)",
      engravingMaxChars: 30
    },
    dimensions: "12 Inches Diameter (30 cm)"
  },
  {
    id: "prod-11",
    title: "Personalised Men's Leather Wallet & Keychain Combo",
    slug: "personalised-mens-leather-wallet-keychain-combo",
    description: "A timeless gift of sophistication. Top-grain vegan leather bifold wallet with custom name foil embossing and metal charm, paired with a matching heavy-duty leather keychain in a velvet gift box.",
    shortDescription: "Name-embossed leather wallet with custom metal charm and keychain.",
    price: 599,
    originalPrice: 999,
    discountPercent: 40,
    category: "personalised-gifts",
    categoryName: "Personalised Gifts",
    subcategory: "Men's Accessories",
    occasions: ["birthday", "anniversary", "festival"],
    recipients: ["him", "parents", "friend"],
    feelings: ["thank-you", "love-romance"],
    tags: ["For Him", "Executive Gift", "Bestseller"],
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 153,
    inStock: true,
    stockCount: 28,
    isBestseller: true,
    isSameDay: true,
    isPersonalised: true,
    personalisationConfig: {
      requireEngravingText: true,
      engravingPlaceholder: "Name to emboss (e.g. Vikramaditya)",
      engravingMaxChars: 15,
      variants: [
        {
          name: "Leather Color",
          options: [
            { label: "Executive Charcoal Tan", priceDelta: 0 },
            { label: "Classic Matte Black", priceDelta: 0 },
            { label: "Deep Vintage Navy", priceDelta: 0 }
          ]
        },
        {
          name: "Charm Choice",
          options: [
            { label: "Royal Crown Charm", priceDelta: 0 },
            { label: "Gentleman Moustache Charm", priceDelta: 0 },
            { label: "Vintage Compass Charm", priceDelta: 0 }
          ]
        }
      ]
    }
  },
  {
    id: "prod-12",
    title: "Custom Neon Glow Sign - Name & Heart",
    slug: "custom-neon-glow-sign-name-heart",
    description: "Electrify your bedroom, studio, or event backdrop! Vibrant silicone LED flexible neon tubing mounted on clear transparent acrylic with dimmer control, power supply, and wall mounting screws.",
    shortDescription: "Custom glowing LED neon text sign with transparent acrylic back.",
    price: 1899,
    originalPrice: 2899,
    discountPercent: 34,
    category: "home-decor",
    categoryName: "Home Decor",
    subcategory: "Neon Lights",
    occasions: ["birthday", "anniversary", "wedding"],
    recipients: ["her", "couple", "friend"],
    feelings: ["love-romance", "congratulations"],
    tags: ["Neon Sign", "Instagram Aesthetic", "Custom Design"],
    images: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    stockCount: 15,
    isBestseller: true,
    isSameDay: false,
    isPersonalised: true,
    personalisationConfig: {
      requireEngravingText: true,
      engravingPlaceholder: "Custom Name / Word (e.g. Better Together, Harika)",
      engravingMaxChars: 18,
      variants: [
        {
          name: "Neon Glow Color",
          options: [
            { label: "Warm Romantic Pink", priceDelta: 0 },
            { label: "Cosmic Ice Blue", priceDelta: 0 },
            { label: "Warm Golden Sunlight", priceDelta: 0 }
          ]
        }
      ]
    },
    dimensions: "16 x 8 inches"
  },
  {
    id: "prod-13",
    title: "Cute Teddy & Ferrero Rocher Romance Hamper",
    slug: "cute-teddy-ferrero-rocher-romance-hamper",
    description: "An adorable combination that melts hearts. An ultra-soft 12-inch plush teddy bear holding a heart pillow, paired with a 16-piece luxury gold box of Ferrero Rocher hazelnut chocolates and red silk ribbons.",
    shortDescription: "12-inch soft plush teddy with Ferrero Rocher 16-piece gold box.",
    price: 899,
    originalPrice: 1299,
    discountPercent: 30,
    category: "combos",
    categoryName: "Hampers & Combos",
    subcategory: "Teddy & Chocolates",
    occasions: ["birthday", "love-romance", "anniversary"],
    recipients: ["her", "kids", "friend"],
    feelings: ["love-romance", "miss-you", "sorry"],
    tags: ["Cute Combos", "Chocolates", "Same-Day"],
    images: [
      "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    stockCount: 25,
    isBestseller: true,
    isSameDay: true,
    isPersonalised: true,
    personalisationConfig: {
      requireEngravingText: false,
      requireMessageNote: true
    }
  },
  {
    id: "prod-14",
    title: "Personalised Photo Magic Rotating Cube",
    slug: "personalised-photo-magic-rotating-cube",
    description: "Showcase 6 of your favorite moments in one dynamic display. Smooth motorized battery-operated base rotates automatically on its corner, revealing each photo seamlessly as it spins.",
    shortDescription: "6-photo motorized rotating crystal photo cube.",
    price: 649,
    originalPrice: 1099,
    discountPercent: 41,
    category: "personalised-gifts",
    categoryName: "Personalised Gifts",
    subcategory: "Photo Frames",
    occasions: ["birthday", "anniversary", "wedding"],
    recipients: ["friend", "couple", "parents", "her", "him"],
    feelings: ["love-romance", "thank-you"],
    tags: ["Rotating Cube", "6 Photos", "Same-Day"],
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 97,
    inStock: true,
    stockCount: 22,
    isBestseller: false,
    isSameDay: true,
    isPersonalised: true,
    personalisationConfig: {
      requireEngravingText: false,
      requirePhotoUpload: true,
      photoUploadLabel: "Upload 6 photos for each side"
    }
  },
  {
    id: "prod-15",
    title: "Peace Lily Air Purifier in Hand-Painted Ceramic Pot",
    slug: "peace-lily-air-purifier-ceramic-pot",
    description: "Known for its elegant glossy dark green foliage and pristine white blooms. NASA-certified natural indoor air purifier that filters toxins and thrives effortlessly indoors with low light.",
    shortDescription: "Natural white flowering Peace Lily in artisan ceramic pot.",
    price: 549,
    originalPrice: 799,
    discountPercent: 31,
    category: "plants",
    categoryName: "Plants & Planters",
    subcategory: "Flowering Plants",
    occasions: ["congratulations", "festival"],
    recipients: ["parents", "friend", "her", "him"],
    feelings: ["thank-you", "sorry", "congratulations"],
    tags: ["Flowering Plant", "Air Purifier", "Eco Gift"],
    images: [
      "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 65,
    inStock: true,
    stockCount: 16,
    isBestseller: false,
    isSameDay: true,
    isPersonalised: true,
    personalisationConfig: {
      requireMessageNote: true
    }
  },
  {
    id: "prod-16",
    title: "3-Layer Surprise Explosion Box with Memories",
    slug: "3-layer-surprise-explosion-box-with-memories",
    description: "When opened, all four sides cascade open to reveal layer after layer of secret messages, photo fold-outs, pockets, and a center compartment holding chocolates or a ring box.",
    shortDescription: "Handmade explosion box with 24 photo slots and center gift box.",
    price: 799,
    originalPrice: 1399,
    discountPercent: 43,
    category: "personalised-gifts",
    categoryName: "Personalised Gifts",
    subcategory: "Explosion Boxes",
    occasions: ["birthday", "anniversary", "love-romance"],
    recipients: ["her", "him", "friend", "couple"],
    feelings: ["love-romance", "thank-you"],
    tags: ["Explosion Box", "Handmade", "24 Photos"],
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 178,
    inStock: true,
    stockCount: 14,
    isBestseller: true,
    isSameDay: true,
    isPersonalised: true,
    personalisationConfig: {
      requireEngravingText: true,
      engravingPlaceholder: "Special date or message on lid",
      engravingMaxChars: 30,
      requirePhotoUpload: true,
      photoUploadLabel: "Upload ZIP or select photos (up to 20 images)"
    }
  }
];

export const CATEGORIES_LIST = [
  { slug: "same-day", name: "Same Day Delivery", icon: "Zap", badge: "2-Hr Fast", color: "from-amber-400 to-rose-400" },
  { slug: "personalised-gifts", name: "Personalised Gifts", icon: "Sparkles", badge: "Trending", color: "from-pink-500 to-rose-500" },
  { slug: "cakes", name: "Handcrafted Cakes", icon: "Cake", badge: "Eggless", color: "from-orange-400 to-amber-500" },
  { slug: "flowers", name: "Fresh Flowers", icon: "Flower2", badge: "Fresh Blooms", color: "from-rose-400 to-pink-600" },
  { slug: "hampers", name: "Luxury Hampers", icon: "Gift", badge: "Premium", color: "from-purple-500 to-indigo-600" },
  { slug: "plants", name: "Plants & Planters", icon: "Leaf", badge: "Eco Green", color: "from-emerald-400 to-teal-600" },
  { slug: "home-decor", name: "Home Decor & Art", icon: "Palette", badge: "Resin & Neon", color: "from-blue-400 to-cyan-500" },
  { slug: "combos", name: "Combos & Specials", icon: "Flame", badge: "Save 30%", color: "from-fuchsia-500 to-pink-500" },
];

export const OCCASIONS_LIST = [
  { slug: "birthday", title: "Birthday Gifts", subtitle: "Cakes, Bouquets & Custom Keepsakes", bgGradient: "from-amber-50 via-orange-50 to-amber-100", border: "border-amber-200", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop" },
  { slug: "anniversary", title: "Anniversary Romance", subtitle: "50-Roses, Heart Cakes & 3D Lamps", bgGradient: "from-rose-50 via-pink-50 to-rose-100", border: "border-rose-200", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop" },
  { slug: "wedding", title: "Wedding & Couple", subtitle: "Royal Hampers, Caricatures & Clocks", bgGradient: "from-purple-50 via-fuchsia-50 to-indigo-50", border: "border-purple-200", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop" },
  { slug: "festival", title: "Festival Specials", subtitle: "Traditional Sweets, Plants & Hampers", bgGradient: "from-yellow-50 via-amber-50 to-yellow-100", border: "border-yellow-200", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop" },
  { slug: "congratulations", title: "Congratulations", subtitle: "Bonsai, Sunflowers & Executive Gifts", bgGradient: "from-emerald-50 via-teal-50 to-emerald-100", border: "border-emerald-200", image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=600&auto=format&fit=crop" },
];

export const RECIPIENTS_LIST = [
  { slug: "him", name: "For Him", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop" },
  { slug: "her", name: "For Her", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop" },
  { slug: "kids", name: "For Kids", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=300&auto=format&fit=crop" },
  { slug: "friend", name: "For Best Friend", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop" },
  { slug: "couple", name: "For Couples", image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=300&auto=format&fit=crop" },
  { slug: "parents", name: "For Parents", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" },
];

export const FEELINGS_LIST = [
  { slug: "love-romance", label: "Love & Romance", subtitle: "Express your heart", icon: "Heart", color: "from-pink-500/10 to-rose-500/20", border: "border-pink-200" },
  { slug: "thank-you", label: "Thank You", subtitle: "Show heartfelt gratitude", icon: "Sparkles", color: "from-amber-500/10 to-yellow-500/20", border: "border-amber-200" },
  { slug: "miss-you", label: "Miss You", subtitle: "Bridge the distance", icon: "Send", color: "from-blue-500/10 to-indigo-500/20", border: "border-blue-200" },
  { slug: "sorry", label: "I Am Sorry", subtitle: "Mend every feeling", icon: "HeartHandshake", color: "from-purple-500/10 to-violet-500/20", border: "border-purple-200" },
  { slug: "congratulations", label: "Congratulations", subtitle: "Celebrate their wins", icon: "Trophy", color: "from-emerald-500/10 to-teal-500/20", border: "border-emerald-200" },
];

export const THEMED_COLLECTIONS = [
  { id: "col-1", title: "The Classic Grace", count: "12 Designs", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=400&auto=format&fit=crop" },
  { id: "col-2", title: "Pastel Elegance", count: "18 Designs", image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=400&auto=format&fit=crop" },
  { id: "col-3", title: "Sunshine Glow", count: "10 Designs", image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=400&auto=format&fit=crop" },
  { id: "col-4", title: "Royal Velvet", count: "14 Designs", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop" },
  { id: "col-5", title: "Grand Romance", count: "16 Designs", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400&auto=format&fit=crop" },
];

export const CUSTOMER_STORIES = [
  {
    id: "story-1",
    customerName: "Sai Teja & Harika",
    location: "Repalle Town",
    occasion: "1st Anniversary Surprise",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=500&auto=format&fit=crop",
    quote: "Ordered the 3D LED lamp with our wedding photo and a midnight heart cake. Delivered at 11:55 PM sharp in Repalle! Creative Paradise made our first anniversary unforgettable.",
    handle: "@repalle_gifts",
    rating: 5,
    verified: true
  },
  {
    id: "story-2",
    customerName: "Bhavana V.",
    location: "Nizampatnam",
    occasion: "Mom's 50th Birthday",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=500&auto=format&fit=crop",
    quote: "The laser wooden engraved portrait had such incredible clarity! My mom had tears of joy. Outstanding quality right here in our Coastal AP region.",
    handle: "@repalle_gifts",
    rating: 5,
    verified: true
  },
  {
    id: "story-3",
    customerName: "Kalyan Chakravarthy",
    location: "Bapatla",
    occasion: "Friend's Promotion",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop",
    quote: "Same day delivery in 2 hours! The Dutch truffle cake was freshly baked and the executive leather combo had his name neatly embossed. 10/10 service.",
    handle: "@repalle_gifts",
    rating: 5,
    verified: true
  },
  {
    id: "story-4",
    customerName: "Swapna & Ramesh",
    location: "Tenali",
    occasion: "House Warming Ceremony",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop",
    quote: "The Ocean resin wall clock is the highlight of our living room now. Everyone who visits asks where we got it. Thank you Creative Paradise!",
    handle: "@repalle_gifts",
    rating: 5,
    verified: true
  },
  {
    id: "story-5",
    customerName: "Ananya & Karthik",
    location: "Guntur",
    occasion: "Valentine's Day Surprise",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=500&auto=format&fit=crop",
    quote: "The 50 red roses bouquet arrived so fresh with velvet dew drops and the personalized acrylic plaque with our favorite Spotify song. Absolutely romantic!",
    handle: "@repalle_gifts",
    rating: 5,
    verified: true
  }
];

