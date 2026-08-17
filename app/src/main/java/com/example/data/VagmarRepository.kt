package com.example.data

import com.example.model.*

object VagmarRepository {

  val woolFibers = listOf(
    WoolFiber(
      id = "ghongadi",
      name = "Deccani Black Fleece (Ghongadi)",
      nativeName = "दख्खनी लोकर (घोंगडी)",
      origin = FiberOrigin.DECCANI_INDIA,
      micronCount = "38 - 52 µm",
      textureRating = "Coarse, Rugged & Rainproof",
      traditionalUses = listOf("Dhangar Shepherd Ghongadi", "Thermal Rain Cape", "Acupressure Bedding", "Herbal Floor Rug"),
      description = "The coarse, thick natural black & charcoal wool sheared from native Deccani sheep by the nomadic Dhangar pastoralists of Maharashtra and Karnataka. Hand-spun on wooden drop spindles and hand-woven on pit looms.",
      heritageStory = "For centuries, the Ghongadi has been the warrior-shepherd's shield against monsoon torrents and biting Deccan winter nights. Infused with natural unstripped lanolin and Tamarind seed starch paste during weaving, it is naturally water-repelling and prized for curing backaches and joint stiffness.",
      lanolinLevel = "Very High (Natural Water-Shield)",
      warmthRating = 5,
      durabilityRating = 5,
      softnessRating = 2
    ),
    WoolFiber(
      id = "pashmina",
      name = "Changthangi Pashmina",
      nativeName = "लडाखी पश्मीना (कश्मीरी)",
      origin = FiberOrigin.HIMALAYAN_KASHMIR,
      micronCount = "12 - 15 µm",
      textureRating = "Ultralight Cloud & Ethereal Softness",
      traditionalUses = listOf("Royal Kani Shawls", "Ring Shawls", "Featherweight Mufflers", "Embroidery Tapestries"),
      description = "Harvested from the fine underbelly down of the Capra Hircus goat grazing at 14,000 feet in Changthang, Ladakh. Eight times warmer than sheep wool yet extraordinarily lightweight.",
      heritageStory = "Woven on the legendary handlooms of Kashmir using traditional Kani wooden spools. An authentic pure Pashmina shawl is so fine it can pass seamlessly through a royal signet ring.",
      lanolinLevel = "Low",
      warmthRating = 5,
      durabilityRating = 3,
      softnessRating = 5
    ),
    WoolFiber(
      id = "marwari",
      name = "Marwari Desert Wool",
      nativeName = "मारवाडी देसी लोकर",
      origin = FiberOrigin.RAJASTHANI_DESI,
      micronCount = "32 - 40 µm",
      textureRating = "Crisp, Resilient & High Crimp",
      traditionalUses = listOf("Hand-Knotted Dhurries", "Camel Girth Straps", "Nomadic Saddle Carpets", "Brocade Rugs"),
      description = "Sourced from the hardy Marwari sheep breeds roaming the Thar Desert. Its high resilience and natural spring make it the premier choice for heritage hand-knotted carpets and sturdy winter blankets.",
      heritageStory = "Dyed with desert botanicals such as Manjistha (Indian Madder), Haldi (Turmeric), and Pomegranate rind, the carpets woven with Marwari wool have endured centuries in royal Rajput palaces.",
      lanolinLevel = "Medium",
      warmthRating = 4,
      durabilityRating = 5,
      softnessRating = 3
    ),
    WoolFiber(
      id = "merino",
      name = "Highland Merino",
      nativeName = "फाईन मेरिनो लोकर",
      origin = FiberOrigin.AUSTRALASIAN,
      micronCount = "17.5 - 21.5 µm",
      textureRating = "Velvety, Elastic & Next-to-Skin Comfort",
      traditionalUses = listOf("Fine Sweaters", "Baselayers", "Baby Blankets", "Cardigans & Scarves"),
      description = "Renowned globally for microscopic crimp and buttery softness. Non-scratchy, naturally odor-resistant, and actively regulates body temperature in both cold and warm seasons.",
      heritageStory = "Originating in ancient Spain where herds were closely guarded royal assets, Merino transformed modern knitting and athletic textiles with its exceptional next-to-skin drape.",
      lanolinLevel = "Medium",
      warmthRating = 4,
      durabilityRating = 4,
      softnessRating = 5
    ),
    WoolFiber(
      id = "yak",
      name = "Tibetan Yak Down",
      nativeName = "याक लोकर (खुलू)",
      origin = FiberOrigin.CENTRAL_ASIAN,
      micronCount = "18 - 20 µm",
      textureRating = "Dense, Earthy & Luxuriously Warm",
      traditionalUses = listOf("Nomadic Overcoats", "High-Altitude Beanies", "Heavy Mittens", "Trekking Socks"),
      description = "Comb-harvested from the soft insulating underfleece (Khullu) of Himalayan Yaks during spring shedding. Possesses breathability superior to cashmere with remarkable tensile strength.",
      heritageStory = "Himalayan nomads spin Khullu beside mountain hearths to survive blizzards below -40°C. Naturally rich in espresso and charcoal tones without chemical bleaching.",
      lanolinLevel = "Low",
      warmthRating = 5,
      durabilityRating = 5,
      softnessRating = 4
    )
  )

  val initialLockerItems = listOf(
    LockerItem(
      id = "loc_1",
      title = "Dhangar Ghongadi Traditional Loom Starch Formula",
      category = LockerCategory.PRIVATE_NOTES,
      content = "Boil crushed Tamarind seeds (चिंचोके) in water for 4 hours until thick viscous paste forms. Filter through coarse cloth. Brush onto Deccani wool warp before weaving on pit loom to reinforce tensile strength and impart waterproof qualities.",
      tags = listOf("Weaving", "Ghongadi", "Traditional", "Recipe"),
      isLockedWithPin = true,
      isFavorite = true,
      dateAdded = "2026-08-10"
    ),
    LockerItem(
      id = "loc_2",
      title = "Vintage Indigo & Manjistha Dye Vat Ratios",
      category = LockerCategory.CERTIFICATES,
      content = "For 1kg pure wool yarn: 80g Natural Indigo extract, 120g Slaked lime, 160g Jaggery/Fructose. Maintain fermentation at 32°C for 3 days until green luster appears. For terracotta rust: 200g powdered Rubia cordifolia (Manjistha) with alum mordant at 15% WOF.",
      tags = listOf("Natural Dye", "Indigo", "Manjistha", "Formulas"),
      isLockedWithPin = true,
      isFavorite = true,
      dateAdded = "2026-08-12"
    ),
    LockerItem(
      id = "loc_3",
      title = "Deccani Charcoal Raw Fleece Stash (Lot #402)",
      category = LockerCategory.STASH,
      content = "Acquired from Sangli pastoral collective. Hand-sorted grade A neck and back fleece. Washed in river water with reetha (soapnuts), sun-dried on jute mats.",
      tags = listOf("Stash", "Raw Fleece", "Deccani", "Lot402"),
      yarnBrand = "Sangli Pastoral Guild",
      colorway = "Natural Charcoal Black & Brown",
      quantitySkeins = 8,
      needleSize = "5.5 mm (US 9)",
      isLockedWithPin = false,
      isFavorite = true,
      dateAdded = "2026-08-15"
    ),
    LockerItem(
      id = "loc_4",
      title = "Vagmar Hexagon Honeycomb Cable Pattern",
      category = LockerCategory.PATTERNS,
      content = "Cast on multiple of 12 + 2 sts. Row 1 (RS): *C6F, C6B* repeat to end. Row 2 & 4 (WS): Purl all stitches. Row 3: Knit all. Row 5: *C6B, C6F*. Forms a structural embossed wool shield pattern inspired by fortress brickwork.",
      tags = listOf("Cables", "Knitting", "Honeycombs", "Chart"),
      needleSize = "4.5 mm (US 7)",
      isLockedWithPin = false,
      isFavorite = false,
      dateAdded = "2026-08-16"
    )
  )

  val yarnWeightCategories = listOf(
    YarnWeightCategory(0, "Lace (0)", "30-40+ WPI", "1.5 - 2.25 mm", "US 000 - 1", "32-40 sts", "Doilies, Fine Shawls, Openwork Lace"),
    YarnWeightCategory(1, "Fingering / Sock (1)", "19-22 WPI", "2.25 - 3.25 mm", "US 1 - 3", "27-32 sts", "Socks, Light Shawls, Baby garments"),
    YarnWeightCategory(2, "Sport / Baby (2)", "15-18 WPI", "3.25 - 3.75 mm", "US 3 - 5", "23-26 sts", "Light Sweaters, Cardigans, Blankets"),
    YarnWeightCategory(3, "DK / Light Worsted (3)", "12-14 WPI", "3.75 - 4.5 mm", "US 5 - 7", "21-24 sts", "Sweaters, Hats, Scarves, Mittens"),
    YarnWeightCategory(4, "Worsted / Aran (4)", "9-11 WPI", "4.5 - 5.5 mm", "US 7 - 9", "16-20 sts", "Afghans, Winter Sweaters, Ghongadi accents"),
    YarnWeightCategory(5, "Bulky / Chunky (5)", "7-8 WPI", "5.5 - 8.0 mm", "US 9 - 11", "12-15 sts", "Heavy Cardigans, Cowls, Quick Rugs"),
    YarnWeightCategory(6, "Super Bulky / Roving (6)", "5-6 WPI", "8.0 - 12.0 mm", "US 11 - 17", "7-11 sts", "Arm Knitting, Chunky Throws, Rugs")
  )

  val initialProjects = listOf(
    ActiveProject(
      id = "proj_1",
      title = "Dhangar Heritage Motif Throw",
      craftType = "Knitting",
      targetRows = 180,
      currentRows = 94,
      yarnUsed = "Deccani Raw Wool & Indigo DK",
      needleHook = "5.0 mm Circulars",
      notes = "Row 90: Switch from geometric border to central chevron cable pattern.",
      progressPercent = 0.52f
    ),
    ActiveProject(
      id = "proj_2",
      title = "Pashmina Cloud Lace Scarf",
      craftType = "Handloom / Crochet",
      targetRows = 120,
      currentRows = 45,
      yarnUsed = "100% Ladakhi Pashmina Lace",
      needleHook = "3.25 mm Bamboo Hook",
      notes = "Delicate blocking required with cedar pins after finishing.",
      progressPercent = 0.38f
    )
  )
}
