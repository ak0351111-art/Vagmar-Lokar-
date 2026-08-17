import { WoolFiber, LockerItem, ActiveProject, NeedleGaugeSpec, StitchType, StitchInfo } from '../types';

export const WOOL_FIBERS: WoolFiber[] = [
  {
    id: 'ghongadi-deccani',
    name: 'Deccani Black & Cream Fleece',
    marathiName: 'दख्खनी घोंगडी लोकर',
    origin: 'Maharashtra & Northern Karnataka (Deccan Plateau)',
    micronCount: '38 – 52 µm',
    micronNumeric: 45,
    grade: 'Coarse Pastoral Heritage Fleece',
    stapleLength: '65 – 90 mm',
    crimpHarvest: 'Twice yearly (Ashwin & Chaitra shears)',
    lanolinContent: 'High raw wax (Water-resistant)',
    waterRepellency: 5,
    thermalWarmth: 5,
    softnessScore: 2,
    durabilityScore: 5,
    pastoralCommunity: 'Dhangar Shepherds & Sangar Weavers',
    regionDescription: 'Native hardy sheep grazing the semi-arid Deccan tracts. The fleece is naturally rich in lanolin oils, spun on traditional drop spindles (Charkha/Peti) and woven into dense, waterproof Ghongadi rugs that last over 50 years without washing.',
    traditionalUses: [
      'Ghongadi Pastoral Blankets (घोंगडी)',
      'Weather-resistant Shepherd Capes',
      'Structural Floor Rugs & Saddle Blankets',
      'Felted Insoles & Heavy Outerwear'
    ],
    bestNeedleSizes: '6.5 mm – 9.0 mm (US 10.5 – 13)',
    primaryDyeAffinities: ['Natural Indigo vat', 'Tamarind Seed extract', 'Acacia (Babul) Bark', 'Undyed Natural Black/Brown'],
    careInstructions: 'Avoid harsh industrial detergents. Spot clean with lukewarm water and natural soapnuts (Reetha). Sun-air regularly on grass or stone.',
    imageAccentColor: '#7A513E',
    badge: 'Maharashtra GI Heritage'
  },
  {
    id: 'changthangi-pashmina',
    name: 'Himalayan Changthangi Pashmina',
    marathiName: 'चांगथांगी पश्मीना (काश्मीरी)',
    origin: 'Ladakh & Kashmir (Altitude > 4,200m)',
    micronCount: '12 – 15 µm',
    micronNumeric: 13.5,
    grade: 'Ultra-Fine Luxury Down (Diamond Fiber)',
    stapleLength: '40 – 60 mm',
    crimpHarvest: 'Spring combing during natural molt',
    lanolinContent: 'Low wax, high microscopic scales',
    waterRepellency: 2,
    thermalWarmth: 5,
    softnessScore: 5,
    durabilityScore: 3,
    pastoralCommunity: 'Changpa Nomads of the High Plateau',
    regionDescription: 'Harvested from the sub-zero undercoat of the Capra Hircus goat. Known worldwide for unmatched microscopic softness, light weight, and intense heat trapping that breathes effortlessly against bare skin.',
    traditionalUses: [
      'Kani & Sozni Hand-Embroidered Shawls',
      'Heirloom Featherweight Ring Wraps',
      'Fine Gauge Lace Knitting'
    ],
    bestNeedleSizes: '2.0 mm – 3.25 mm (US 0 – 3)',
    primaryDyeAffinities: ['Saffron threads', 'Madder root (Manjistha)', 'Walnut hulls', 'Lac insect dye'],
    careInstructions: 'Professional dry clean or hand soak in cold water with pH-neutral cashmere shampoo. Dry flat away from direct sunlight.',
    imageAccentColor: '#9C6F84',
    badge: 'Ladakh High Altitude'
  },
  {
    id: 'marwari-desi',
    name: 'Marwari & Magra Carpet Wool',
    marathiName: 'मारवाडी आणि मगरा देशी लोकर',
    origin: 'Thar Desert, Rajasthan & North Gujarat',
    micronCount: '30 – 36 µm',
    micronNumeric: 33,
    grade: 'Medium Resilient Carpet & Craft Fiber',
    stapleLength: '70 – 110 mm',
    crimpHarvest: 'Spring & Autumn shearing',
    lanolinContent: 'Moderate lanolin',
    waterRepellency: 4,
    thermalWarmth: 4,
    softnessScore: 3,
    durabilityScore: 5,
    pastoralCommunity: 'Raika & Rabari Pastoralists',
    regionDescription: 'Renowned for high elasticity, springy resilience, and natural luster. Thrives in arid desert climates and provides exceptional structural drape for outerwear and dhurries.',
    traditionalUses: [
      'Hand-knotted Artisan Dhurries',
      'Winter Lohi Blankets & Jackets',
      'Tapestries, Bags & Structured Knitwear'
    ],
    bestNeedleSizes: '4.5 mm – 6.0 mm (US 7 – 10)',
    primaryDyeAffinities: ['Pomegranate rind', 'Turmeric & Marigold', 'Iron Mordant Rusts', 'Henna leaves'],
    careInstructions: 'Hand wash with mild wool liquid. Roll in dry towel to express moisture. Store with neem leaves or cedar balls.',
    imageAccentColor: '#B66E41',
    badge: 'Thar Desert Heritage'
  },
  {
    id: 'nilgiri-merino',
    name: 'Nilgiri Southern Highland Wool',
    marathiName: 'निलगिरी हायलँड लोकर',
    origin: 'Nilgiri Hills & Kodaikanal (Western Ghats)',
    micronCount: '20 – 24 µm',
    micronNumeric: 22,
    grade: 'Fine Apparel Wool',
    stapleLength: '65 – 85 mm',
    crimpHarvest: 'Annual summer clip',
    lanolinContent: 'Medium-high lanolin',
    waterRepellency: 3,
    thermalWarmth: 4,
    softnessScore: 4,
    durabilityScore: 4,
    pastoralCommunity: 'Toda & Local Hill Cooperatives',
    regionDescription: 'Acclimatized fine wool from mist-laden shola forests. Soft enough for next-to-skin sweaters, cardigans, socks, and infant beanies.',
    traditionalUses: [
      'Hand-knitted Aran Sweaters',
      'Everyday Shawls & Cowls',
      'Fine Weaving Wefts'
    ],
    bestNeedleSizes: '3.75 mm – 4.5 mm (US 5 – 7)',
    primaryDyeAffinities: ['Eucalyptus bark & leaves', 'Tea tannin dye', 'Indigo', 'Onion skins'],
    careInstructions: 'Gently hand wash at 30°C. Never agitate or wring. Lay flat over blocking pins.',
    imageAccentColor: '#4E7358',
    badge: 'Western Ghats Shola'
  },
  {
    id: 'tibetan-yak-down',
    name: 'Trans-Himalayan Yak Down',
    marathiName: 'याक डाऊन लोकर (उंच पर्वत)',
    origin: 'Spiti Valley, Sikkim & Tibetan Plateau',
    micronCount: '16 – 19 µm',
    micronNumeric: 17.5,
    grade: 'Premium Thermal Under-down',
    stapleLength: '35 – 50 mm',
    crimpHarvest: 'Annual spring grooming',
    lanolinContent: 'Low wax, rich hollow-core fiber',
    waterRepellency: 3,
    thermalWarmth: 5,
    softnessScore: 4,
    durabilityScore: 4,
    pastoralCommunity: 'Bhotia & Dokpa High-altitude Herders',
    regionDescription: 'Naturally dark chocolate and charcoal under-fleece of free-roaming mountain yaks. Highly breathable with hollow core fibers that store immense body heat without heaviness.',
    traditionalUses: [
      'Alpine Trekking Socks & Balaclavas',
      'Mountain Blankets & Vests',
      'Luxury Textured Scarves'
    ],
    bestNeedleSizes: '3.5 mm – 5.0 mm (US 4 – 8)',
    primaryDyeAffinities: ['Best enjoyed in natural rich espresso/taupe', 'Madder', 'Indigo overlay'],
    careInstructions: 'Hand wash in cold water with wool wash. Steam block gently. Never tumble dry.',
    imageAccentColor: '#3D312A',
    badge: 'Alpine High-Thermal'
  }
];

export const STITCH_DEFINITIONS: Record<StitchType, StitchInfo> = {
  K: {
    code: 'K',
    name: 'Knit (सुई वर सरळ)',
    symbol: '—',
    description: 'Classic knit stitch forming the smooth V-wale on the right side.',
    colorClass: 'bg-[#F2E8DF] text-[#5A3825] border-[#D9C4B5]'
  },
  P: {
    code: 'P',
    name: 'Purl (उलट टाका)',
    symbol: '•',
    description: 'Purl stitch forming textured horizontal bumps across the row.',
    colorClass: 'bg-[#DDE7DF] text-[#2C4A34] border-[#BDD3C2]'
  },
  YO: {
    code: 'YO',
    name: 'Yarn Over (वेढा - जाळी)',
    symbol: 'O',
    description: 'Increases one stitch while creating an open decorative lace eyelet.',
    colorClass: 'bg-[#F9EBD7] text-[#7A4E1B] border-[#E8D1B0]'
  },
  CL: {
    code: 'CL',
    name: 'Cable Left (डावीकडे केबल)',
    symbol: '⮌',
    description: 'Front cross 2-stitch cable twisting stitches toward the left.',
    colorClass: 'bg-[#E3EAF4] text-[#2B466D] border-[#C3D2E7]'
  },
  CR: {
    code: 'CR',
    name: 'Cable Right (उजवीकडे केबल)',
    symbol: '⮎',
    description: 'Back cross 2-stitch cable twisting stitches toward the right.',
    colorClass: 'bg-[#ECE0EC] text-[#5C2E5D] border-[#D5BFD6]'
  },
  SL: {
    code: 'SL',
    name: 'Slip Stitch (टाका न विणता घेणे)',
    symbol: 'V',
    description: 'Pass stitch to right needle without working it for elongation or mosaic.',
    colorClass: 'bg-[#F5DECE] text-[#7B3920] border-[#E6BC9F]'
  }
};

export const STITCH_PRESETS: { name: string; description: string; grid: StitchType[][] }[] = [
  {
    name: 'Seed / Moss Stitch (मोहरी टाका)',
    description: 'Alternating knits and purls creating a balanced non-curling pebble texture.',
    grid: [
      ['K', 'P', 'K', 'P', 'K', 'P', 'K', 'P'],
      ['P', 'K', 'P', 'K', 'P', 'K', 'P', 'K'],
      ['K', 'P', 'K', 'P', 'K', 'P', 'K', 'P'],
      ['P', 'K', 'P', 'K', 'P', 'K', 'P', 'K'],
      ['K', 'P', 'K', 'P', 'K', 'P', 'K', 'P'],
      ['P', 'K', 'P', 'K', 'P', 'K', 'P', 'K'],
      ['K', 'P', 'K', 'P', 'K', 'P', 'K', 'P'],
      ['P', 'K', 'P', 'K', 'P', 'K', 'P', 'K']
    ]
  },
  {
    name: 'Diamond Cable Plait (हिरा केबल)',
    description: 'Interlocking left and right cables creating a central diamond medallion.',
    grid: [
      ['P', 'P', 'CL', 'K', 'K', 'CR', 'P', 'P'],
      ['P', 'K', 'P', 'P', 'P', 'P', 'K', 'P'],
      ['CL', 'P', 'P', 'P', 'P', 'P', 'P', 'CR'],
      ['K', 'P', 'P', 'YO', 'YO', 'P', 'P', 'K'],
      ['CR', 'P', 'P', 'P', 'P', 'P', 'P', 'CL'],
      ['P', 'K', 'P', 'P', 'P', 'P', 'K', 'P'],
      ['P', 'P', 'CR', 'K', 'K', 'CL', 'P', 'P'],
      ['P', 'P', 'P', 'K', 'K', 'P', 'P', 'P']
    ]
  },
  {
    name: 'Eyelet Lace Trellis (जाळीदार नक्षी)',
    description: 'Delicate openwork lace with balanced yarn-overs and knit columns.',
    grid: [
      ['K', 'YO', 'SL', 'K', 'K', 'YO', 'SL', 'K'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['K', 'K', 'YO', 'SL', 'K', 'K', 'YO', 'SL'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['YO', 'SL', 'K', 'K', 'YO', 'SL', 'K', 'K'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['K', 'YO', 'SL', 'K', 'K', 'YO', 'SL', 'K'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P']
    ]
  },
  {
    name: '2x2 Traditional Ribbing (उभ्या पट्ट्या)',
    description: 'Highly elastic ribbed structure ideal for cuffs, neckbands, and Ghongadi borders.',
    grid: [
      ['K', 'K', 'P', 'P', 'K', 'K', 'P', 'P'],
      ['K', 'K', 'P', 'P', 'K', 'K', 'P', 'P'],
      ['K', 'K', 'P', 'P', 'K', 'K', 'P', 'P'],
      ['K', 'K', 'P', 'P', 'K', 'K', 'P', 'P'],
      ['K', 'K', 'P', 'P', 'K', 'K', 'P', 'P'],
      ['K', 'K', 'P', 'P', 'K', 'K', 'P', 'P'],
      ['K', 'K', 'P', 'P', 'K', 'K', 'P', 'P'],
      ['K', 'K', 'P', 'P', 'K', 'K', 'P', 'P']
    ]
  }
];

export const NEEDLE_GAUGE_TABLE: NeedleGaugeSpec[] = [
  { metricMm: '2.25 mm', usSize: 'US 1', ukSize: 'UK 13', recommendedYarnWeight: 'Lace / Cobweb', stitchesPer10Cm: '32 – 36 sts' },
  { metricMm: '2.75 mm', usSize: 'US 2', ukSize: 'UK 12', recommendedYarnWeight: 'Sock / Fingering', stitchesPer10Cm: '28 – 32 sts' },
  { metricMm: '3.25 mm', usSize: 'US 3', ukSize: 'UK 10', recommendedYarnWeight: 'Sport / 5-Ply', stitchesPer10Cm: '24 – 26 sts' },
  { metricMm: '3.75 mm', usSize: 'US 5', ukSize: 'UK 9', recommendedYarnWeight: 'DK / Light Worsted', stitchesPer10Cm: '21 – 24 sts' },
  { metricMm: '4.50 mm', usSize: 'US 7', ukSize: 'UK 7', recommendedYarnWeight: 'Worsted / Afghan', stitchesPer10Cm: '18 – 20 sts' },
  { metricMm: '5.50 mm', usSize: 'US 9', ukSize: 'UK 5', recommendedYarnWeight: 'Chunky / Bulky', stitchesPer10Cm: '14 – 15 sts' },
  { metricMm: '6.50 mm', usSize: 'US 10.5', ukSize: 'UK 3', recommendedYarnWeight: 'Super Bulky / Ghongadi', stitchesPer10Cm: '11 – 12 sts' },
  { metricMm: '9.00 mm', usSize: 'US 13', ukSize: 'UK 00', recommendedYarnWeight: 'Jumbo Pastoral Roving', stitchesPer10Cm: '7 – 9 sts' }
];

export const INITIAL_LOCKER_ITEMS: LockerItem[] = [
  {
    id: 'item-1',
    title: 'Deccani Fermented Tamarind & Acacia Vat Recipe',
    category: 'formulas',
    content: '1. Boil 500g crushed Babul (Acacia arabica) bark in 10L rain water for 3 hours until deep amber.\n2. Add 150g soaked tamarind paste to lower pH to ~4.5.\n3. Enter wetted Deccani raw wool skeins at 80°C.\n4. Simmer for 60 min, cool overnight in liquor for deep saddle brown with high wash-fastness.',
    tags: ['Natural Dye', 'Deccan', 'Babul Bark', 'Formula'],
    yarnBrand: 'Vagmar Reserve',
    isLockedWithPin: true,
    isFavorite: true,
    createdAt: '2026-03-12'
  },
  {
    id: 'item-2',
    title: 'Heritage Deccani Black Wool Stash (Kolhapur Shearing)',
    category: 'stash',
    content: 'Hand-sorted natural midnight black fleece from Radhanagari Dhangar co-op. 2-ply handspun Z-twist with rich natural lanolin intact.',
    tags: ['Raw Stash', 'Handspun', 'Black Fleece'],
    yarnBrand: 'Radhanagari Pastoral Co-op',
    colorway: 'Natural Midnight Charcoal (Undyed)',
    quantitySkeins: 14,
    needleSize: '5.5 mm Needles',
    isLockedWithPin: false,
    isFavorite: true,
    createdAt: '2026-04-01'
  },
  {
    id: 'item-3',
    title: 'Kashmir Saffron & Madder Crimson Bath Notes',
    category: 'formulas',
    content: 'Premordant fine Pashmina with 8% Potassium Alum at 60°C. In separate vessel, extract Himalayan Manjistha (Rubia cordifolia) at 70°C. Steep 0.5g Kashmiri saffron in warm water and combine. Yields royal crimson vermilion with soft luster.',
    tags: ['Pashmina', 'Saffron', 'Madder', 'Secret Formula'],
    yarnBrand: 'Ladakh Artisan Collective',
    isLockedWithPin: true,
    isFavorite: false,
    createdAt: '2026-04-20'
  },
  {
    id: 'item-4',
    title: 'Highland Merino Sport Skeins in Nilgiri Moss',
    category: 'stash',
    content: 'Superwash-free botanical dyed 100% fine wool with eucalyptus leaf & iron water tint. Perfect for stranded colorwork cardigan yoke.',
    tags: ['Yarn Stash', 'Botanical', 'Sport Weight'],
    yarnBrand: 'Nilgiri Shola Yarns',
    colorway: 'Moss Green #412',
    quantitySkeins: 8,
    needleSize: '3.75 mm Circulars',
    isLockedWithPin: false,
    isFavorite: false,
    createdAt: '2026-05-10'
  },
  {
    id: 'item-5',
    title: 'Traditional 18-End Ghongadi Warp Sizing Pattern',
    category: 'patterns',
    content: 'Warp Setup: 18 ends/inch on pit loom. Reed #9 double sleyed. Sizing: Fermented tamarind seed starch bath applied with coir brush in direct morning sunlight.',
    tags: ['Weaving Pattern', 'Loom', 'Ghongadi'],
    yarnBrand: 'Dhangar Master Guild',
    isLockedWithPin: true,
    isFavorite: true,
    createdAt: '2026-06-02'
  }
];

export const INITIAL_PROJECTS: ActiveProject[] = [
  {
    id: 'proj-1',
    title: 'Dhangar Heritage Chevron Ghongadi Wrap',
    craftType: 'Knitting',
    targetRows: 240,
    currentRows: 168,
    yarnUsed: '100% Deccani Handspun Black & Cream (2-Ply)',
    needleHook: '6.0 mm Wooden Circular Needles',
    notes: 'Row 160 completed: Transitioning to border herringbone stitch with double-twisted edge.',
    progressPercent: 0.70,
    isCompleted: false
  },
  {
    id: 'proj-2',
    title: 'Ladakh Pashmina Featherweight Lace Scarf',
    craftType: 'Knitting',
    targetRows: 320,
    currentRows: 96,
    yarnUsed: '14-Micron Changthangi Pashmina in Natural Saffron',
    needleHook: '2.75 mm Rosewood Needles',
    notes: 'Pattern: 8-stitch Diamond Lace repeats. Blocking wires prepared for final set.',
    progressPercent: 0.30,
    isCompleted: false
  },
  {
    id: 'proj-3',
    title: 'Thar Desert Wool Felted Saddle Bag',
    craftType: 'Pit Loom / Handloom',
    targetRows: 120,
    currentRows: 120,
    yarnUsed: 'Marwari Desi Wool with Henna Dye',
    needleHook: 'Rigid Heddle Loom (10 DPI)',
    notes: 'Completed weaving! Fulled in hot water with reetha soap for tight weatherproofing.',
    progressPercent: 1.0,
    isCompleted: true
  }
];
