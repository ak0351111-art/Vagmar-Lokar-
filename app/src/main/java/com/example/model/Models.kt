package com.example.model

enum class FiberOrigin(val displayName: String) {
  DECCANI_INDIA("Deccan & Maharashtra, India"),
  HIMALAYAN_KASHMIR("Ladakh & Kashmir, India"),
  RAJASTHANI_DESI("Marwar, Rajasthan"),
  AUSTRALASIAN("Australia & New Zealand"),
  SOUTH_AMERICAN("Andes, South America"),
  MEDITERRANEAN("Southern Europe"),
  CENTRAL_ASIAN("Tibetan Plateau & Mongolia")
}

data class WoolFiber(
  val id: String,
  val name: String,
  val nativeName: String,
  val origin: FiberOrigin,
  val micronCount: String, // e.g. "35-50 µm" or "14-16 µm"
  val textureRating: String, // e.g. "Rugged & Weather-Resistant", "Silky Cloud", "Dense Springy"
  val traditionalUses: List<String>,
  val description: String,
  val heritageStory: String,
  val lanolinLevel: String, // High, Medium, Low
  val warmthRating: Int, // 1 to 5
  val durabilityRating: Int, // 1 to 5
  val softnessRating: Int // 1 to 5
)

enum class LockerCategory(val label: String, val iconName: String) {
  PATTERNS("Knitting & Weave Patterns", "grid"),
  STASH("Yarn Stash & Skeins", "inventory"),
  PRIVATE_NOTES("Secret Formulas & Notes", "lock"),
  CERTIFICATES("Fiber Dyes & Recipes", "palette"),
  PROJECT_LOGS("Archived Projects", "book")
}

data class LockerItem(
  val id: String,
  val title: String,
  val category: LockerCategory,
  val content: String,
  val tags: List<String>,
  val yarnBrand: String? = null,
  val colorway: String? = null,
  val quantitySkeins: Int? = null,
  val needleSize: String? = null,
  val isLockedWithPin: Boolean = false,
  val isFavorite: Boolean = false,
  val dateAdded: String = "2026-08-17"
)

data class ActiveProject(
  val id: String,
  val title: String,
  val craftType: String, // "Knitting", "Crochet", "Handloom"
  val targetRows: Int,
  val currentRows: Int = 0,
  val yarnUsed: String,
  val needleHook: String,
  val notes: String,
  val progressPercent: Float = 0f,
  val isCompleted: Boolean = false
)

data class YarnWeightCategory(
  val number: Int,
  val name: String,
  val wpi: String, // Wraps per inch
  val metricNeedles: String,
  val usNeedles: String,
  val gaugePer4Inches: String,
  val idealProjects: String
)

enum class StitchType(val symbol: String, val label: String, val description: String) {
  KNIT("K", "Knit", "Standard knit stitch"),
  PURL("P", "Purl", "Reverse purl bump"),
  YARN_OVER("O", "Yarn Over", "Increases one stitch, creates lace eyelet"),
  CABLE_LEFT("↰", "Cable Left", "Cross 2 stitches to front"),
  CABLE_RIGHT("↱", "Cable Right", "Cross 2 stitches to back"),
  SLIP("V", "Slip Stitch", "Pass stitch without knitting"),
  TOGETHER("▲", "Knit 2 Together", "Right-leaning decrease"),
  SSK("▼", "Slip Slip Knit", "Left-leaning decrease")
}
