package com.example.ui.screens

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.VagmarRepository
import com.example.model.StitchType
import com.example.ui.components.AppHeader
import com.example.ui.theme.*

@Composable
fun StudioScreen() {
  var selectedTab by remember { mutableIntStateOf(0) }
  val tabTitles = listOf("Stitch Designer", "Yarn Calculator", "Needle Guide")

  Column(
    modifier = Modifier
      .fillMaxSize()
      .background(MaterialTheme.colorScheme.background)
  ) {
    AppHeader(
      title = "Woolcraft Studio",
      subtitle = "विणकाम आरेखन आणि प्रमाण साधन",
      badgeText = "डिझाईन स्टुडिओ"
    )

    // Tab Navigation
    TabRow(
      selectedTabIndex = selectedTab,
      containerColor = MaterialTheme.colorScheme.surface,
      contentColor = MaterialTheme.colorScheme.primary,
      modifier = Modifier.padding(horizontal = 16.dp)
    ) {
      tabTitles.forEachIndexed { index, title ->
        Tab(
          selected = selectedTab == index,
          onClick = { selectedTab = index },
          text = {
            Text(
              text = title,
              style = MaterialTheme.typography.labelMedium.copy(
                fontWeight = if (selectedTab == index) FontWeight.Bold else FontWeight.Normal
              )
            )
          }
        )
      }
    }

    Spacer(modifier = Modifier.height(8.dp))

    when (selectedTab) {
      0 -> StitchDesignerSection()
      1 -> YarnCalculatorSection()
      2 -> NeedleGuideSection()
    }
  }
}

@Composable
fun StitchDesignerSection() {
  val gridSize = 8
  // State for 8x8 grid of StitchType
  var gridState by remember {
    mutableStateOf(List(gridSize) { List(gridSize) { StitchType.KNIT } })
  }
  var selectedStitch by remember { mutableStateOf(StitchType.PURL) }
  var showGeneratedPattern by remember { mutableStateOf(false) }

  val stitchColors = mapOf(
    StitchType.KNIT to WoolWarmCream,
    StitchType.PURL to WoolTerracottaLight.copy(alpha = 0.35f),
    StitchType.YARN_OVER to WoolGold.copy(alpha = 0.35f),
    StitchType.CABLE_LEFT to WoolIndigo.copy(alpha = 0.35f),
    StitchType.CABLE_RIGHT to WoolIndigo.copy(alpha = 0.35f),
    StitchType.SLIP to WoolSage.copy(alpha = 0.35f),
    StitchType.TOGETHER to WoolTerracotta.copy(alpha = 0.35f),
    StitchType.SSK to WoolTerracotta.copy(alpha = 0.35f)
  )

  LazyColumn(
    modifier = Modifier
      .fillMaxSize()
      .padding(horizontal = 16.dp),
    contentPadding = PaddingValues(bottom = 100.dp),
    verticalArrangement = Arrangement.spacedBy(14.dp)
  ) {
    // Toolbar: Stitch Selectors
    item {
      Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
      ) {
        Column(modifier = Modifier.padding(12.dp)) {
          Text(
            text = "Active Stitch Tool",
            style = MaterialTheme.typography.labelLarge.copy(fontWeight = FontWeight.Bold),
            color = MaterialTheme.colorScheme.onSurface
          )
          Spacer(modifier = Modifier.height(8.dp))
          LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            items(StitchType.values()) { stitch ->
              val isSelected = selectedStitch == stitch
              Surface(
                modifier = Modifier
                  .clip(RoundedCornerShape(8.dp))
                  .clickable { selectedStitch = stitch }
                  .border(
                    width = if (isSelected) 2.dp else 1.dp,
                    color = if (isSelected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.outline.copy(alpha = 0.4f),
                    shape = RoundedCornerShape(8.dp)
                  ),
                color = if (isSelected) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surface
              ) {
                Row(
                  modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                  verticalAlignment = Alignment.CenterVertically
                ) {
                  Text(
                    text = stitch.symbol,
                    style = MaterialTheme.typography.bodyLarge.copy(fontWeight = FontWeight.Bold),
                    color = if (isSelected) MaterialTheme.colorScheme.onPrimaryContainer else MaterialTheme.colorScheme.onSurface
                  )
                  Spacer(modifier = Modifier.width(6.dp))
                  Text(
                    text = stitch.label,
                    style = MaterialTheme.typography.labelMedium,
                    color = if (isSelected) MaterialTheme.colorScheme.onPrimaryContainer else MaterialTheme.colorScheme.onSurface
                  )
                }
              }
            }
          }
        }
      }
    }

    // Grid Presets & Action Buttons
    item {
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Text(
          text = "8×8 Motif Canvas",
          style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
        )

        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
          // Preset: Seed Stitch
          TextButton(
            onClick = {
              gridState = List(gridSize) { r ->
                List(gridSize) { c ->
                  if ((r + c) % 2 == 0) StitchType.KNIT else StitchType.PURL
                }
              }
            },
            contentPadding = PaddingValues(horizontal = 8.dp, vertical = 4.dp)
          ) {
            Text("Seed Pattern", style = MaterialTheme.typography.labelSmall)
          }

          // Preset: Diamond Cable
          TextButton(
            onClick = {
              gridState = List(gridSize) { r ->
                List(gridSize) { c ->
                  when {
                    (r == 1 || r == 5) && (c == 2 || c == 5) -> StitchType.CABLE_LEFT
                    (r == 2 || r == 6) && (c == 3 || c == 4) -> StitchType.CABLE_RIGHT
                    (r == 3 || r == 7) && (c == 1 || c == 6) -> StitchType.YARN_OVER
                    else -> StitchType.KNIT
                  }
                }
              }
            },
            contentPadding = PaddingValues(horizontal = 8.dp, vertical = 4.dp)
          ) {
            Text("Diamond", style = MaterialTheme.typography.labelSmall)
          }

          // Reset
          IconButton(onClick = {
            gridState = List(gridSize) { List(gridSize) { StitchType.KNIT } }
          }) {
            Icon(Icons.Default.Refresh, contentDescription = "Clear Canvas", tint = WoolTerracotta)
          }
        }
      }
    }

    // The Interactive Stitch Canvas Matrix
    item {
      Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        border = CardDefaults.outlinedCardBorder()
      ) {
        Column(
          modifier = Modifier
            .fillMaxWidth()
            .padding(12.dp),
          horizontalAlignment = Alignment.CenterHorizontally
        ) {
          for (rowIndex in 0 until gridSize) {
            Row(
              modifier = Modifier.fillMaxWidth(),
              horizontalArrangement = Arrangement.Center
            ) {
              // Row index label (from 8 down to 1 in traditional charts)
              Text(
                text = "${gridSize - rowIndex}",
                modifier = Modifier
                  .width(20.dp)
                  .align(Alignment.CenterVertically),
                style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                color = MaterialTheme.colorScheme.onSurfaceVariant
              )

              for (colIndex in 0 until gridSize) {
                val stitch = gridState[rowIndex][colIndex]
                val bg = stitchColors[stitch] ?: WoolWarmCream

                Box(
                  modifier = Modifier
                    .size(36.dp)
                    .padding(2.dp)
                    .clip(RoundedCornerShape(6.dp))
                    .background(bg)
                    .border(
                      width = 1.dp,
                      color = MaterialTheme.colorScheme.outline.copy(alpha = 0.5f),
                      shape = RoundedCornerShape(6.dp)
                    )
                    .clickable {
                      val newGrid = gridState.mapIndexed { r, row ->
                        row.mapIndexed { c, current ->
                          if (r == rowIndex && c == colIndex) {
                            if (current == selectedStitch) StitchType.KNIT else selectedStitch
                          } else {
                            current
                          }
                        }
                      }
                      gridState = newGrid
                    },
                  contentAlignment = Alignment.Center
                ) {
                  Text(
                    text = stitch.symbol,
                    style = MaterialTheme.typography.bodyMedium.copy(
                      fontWeight = FontWeight.Bold,
                      fontFamily = FontFamily.Monospace
                    ),
                    color = MaterialTheme.colorScheme.onSurface
                  )
                }
              }
            }
          }

          // Column bottom labels
          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.Center
          ) {
            Spacer(modifier = Modifier.width(20.dp))
            for (colIndex in 0 until gridSize) {
              Text(
                text = "${colIndex + 1}",
                modifier = Modifier.width(36.dp),
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = androidx.compose.ui.text.style.TextAlign.Center
              )
            }
          }
        }
      }
    }

    // Generate Written Pattern Instructions Button
    item {
      Button(
        onClick = { showGeneratedPattern = !showGeneratedPattern },
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp)
      ) {
        Icon(Icons.Default.MenuBook, contentDescription = null)
        Spacer(modifier = Modifier.width(8.dp))
        Text(if (showGeneratedPattern) "Hide Written Pattern" else "Compile Written Instructions")
      }
    }

    if (showGeneratedPattern) {
      item {
        Card(
          shape = RoundedCornerShape(14.dp),
          colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
          Column(modifier = Modifier.padding(14.dp)) {
            Text(
              text = "Written Row-by-Row Chart",
              style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
              color = MaterialTheme.colorScheme.primary
            )
            Spacer(modifier = Modifier.height(8.dp))
            gridState.forEachIndexed { index, row ->
              val rowNum = gridSize - index
              val isRightSide = rowNum % 2 != 0
              val rowText = row.joinToString(separator = ", ") { it.label }
              Text(
                text = "Row $rowNum (${if (isRightSide) "RS" else "WS"}): $rowText",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurface,
                modifier = Modifier.padding(vertical = 2.dp)
              )
            }
          }
        }
      }
    }
  }
}

@Composable
fun YarnCalculatorSection() {
  val projectTypes = listOf("Throw Blanket (Ghongadi)", "Winter Sweater", "Lace Shawl", "Beanie Hat", "Warm Scarf")
  var selectedProject by remember { mutableStateOf(projectTypes[0]) }

  var widthCm by remember { mutableStateOf("120") }
  var lengthCm by remember { mutableStateOf("180") }
  var stitchesPer10cm by remember { mutableStateOf("18") }
  var yarnWeightIndex by remember { mutableIntStateOf(4) } // Worsted default

  val yarnCategory = VagmarRepository.yarnWeightCategories[yarnWeightIndex]

  // Calculated estimates
  val widthVal = widthCm.toDoubleOrNull() ?: 120.0
  val lengthVal = lengthCm.toDoubleOrNull() ?: 180.0
  val areaSqMeters = (widthVal * lengthVal) / 10000.0

  val approxGramsPerSqMeter = when (yarnWeightIndex) {
    0 -> 140.0 // Lace
    1 -> 220.0 // Fingering
    2 -> 300.0 // Sport
    3 -> 380.0 // DK
    4 -> 460.0 // Worsted / Ghongadi
    5 -> 580.0 // Bulky
    else -> 720.0 // Super Bulky
  }

  val totalEstimatedGrams = (areaSqMeters * approxGramsPerSqMeter).toInt()
  val skeinsNeeded = ((totalEstimatedGrams + 99) / 100) // 100g skeins
  val estimatedMeters = (totalEstimatedGrams * (when (yarnWeightIndex) {
    0 -> 8.0
    1 -> 4.0
    2 -> 3.0
    3 -> 2.5
    4 -> 2.0
    5 -> 1.4
    else -> 0.9
  })).toInt()

  LazyColumn(
    modifier = Modifier
      .fillMaxSize()
      .padding(horizontal = 16.dp),
    contentPadding = PaddingValues(bottom = 100.dp),
    verticalArrangement = Arrangement.spacedBy(14.dp)
  ) {
    item {
      Text(
        text = "Project Dimension & Skein Estimator",
        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
      )
    }

    // Project Type Selector
    item {
      Column {
        Text("Select Project Prototype:", style = MaterialTheme.typography.labelMedium)
        Spacer(modifier = Modifier.height(6.dp))
        LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
          items(projectTypes) { proj ->
            val isSelected = selectedProject == proj
            FilterChip(
              selected = isSelected,
              onClick = {
                selectedProject = proj
                when (proj) {
                  "Throw Blanket (Ghongadi)" -> { widthCm = "120"; lengthCm = "180" }
                  "Winter Sweater" -> { widthCm = "55"; lengthCm = "65" }
                  "Lace Shawl" -> { widthCm = "60"; lengthCm = "160" }
                  "Beanie Hat" -> { widthCm = "24"; lengthCm = "26" }
                  "Warm Scarf" -> { widthCm = "28"; lengthCm = "170" }
                }
              },
              label = { Text(proj) },
              colors = FilterChipDefaults.filterChipColors(
                selectedContainerColor = MaterialTheme.colorScheme.primary,
                selectedLabelColor = MaterialTheme.colorScheme.onPrimary
              )
            )
          }
        }
      }
    }

    // Dimension Inputs
    item {
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(12.dp)
      ) {
        OutlinedTextField(
          value = widthCm,
          onValueChange = { widthCm = it },
          label = { Text("Width (cm)") },
          keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
          modifier = Modifier.weight(1f),
          shape = RoundedCornerShape(12.dp)
        )

        OutlinedTextField(
          value = lengthCm,
          onValueChange = { lengthCm = it },
          label = { Text("Length (cm)") },
          keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
          modifier = Modifier.weight(1f),
          shape = RoundedCornerShape(12.dp)
        )
      }
    }

    // Yarn Weight Selection Slider
    item {
      Card(
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
      ) {
        Column(modifier = Modifier.padding(16.dp)) {
          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
          ) {
            Text("Yarn Weight Classification", style = MaterialTheme.typography.labelLarge.copy(fontWeight = FontWeight.Bold))
            Text(yarnCategory.name, style = MaterialTheme.typography.labelMedium.copy(fontWeight = FontWeight.Bold), color = WoolTerracotta)
          }
          Spacer(modifier = Modifier.height(6.dp))
          Slider(
            value = yarnWeightIndex.toFloat(),
            onValueChange = { yarnWeightIndex = it.toInt() },
            valueRange = 0f..6f,
            steps = 5
          )
          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
          ) {
            Text("Gauge: ${yarnCategory.gaugePer4Inches}", style = MaterialTheme.typography.bodySmall)
            Text("Needles: ${yarnCategory.metricNeedles}", style = MaterialTheme.typography.bodySmall)
          }
        }
      }
    }

    // Results Card
    item {
      Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = WoolIndigo.copy(alpha = 0.08f)),
        border = CardDefaults.outlinedCardBorder().copy(
          brush = androidx.compose.ui.graphics.SolidColor(WoolIndigo.copy(alpha = 0.3f))
        )
      ) {
        Column(modifier = Modifier.padding(16.dp)) {
          Text(
            text = "Calculation Output Summary",
            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
            color = WoolIndigo
          )
          Spacer(modifier = Modifier.height(12.dp))

          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
          ) {
            CalculationMetricBox(
              label = "Estimated Skeins",
              value = "$skeinsNeeded skeins",
              sub = "(100g each)",
              modifier = Modifier.weight(1f)
            )
            CalculationMetricBox(
              label = "Total Yardage",
              value = "$estimatedMeters m",
              sub = "≈ ${(estimatedMeters * 1.094).toInt()} yds",
              modifier = Modifier.weight(1f)
            )
          }

          Spacer(modifier = Modifier.height(8.dp))

          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
          ) {
            CalculationMetricBox(
              label = "Total Weight",
              value = "$totalEstimatedGrams g",
              sub = "≈ ${(totalEstimatedGrams * 0.00220462).let { String.format("%.2f", it) }} lbs",
              modifier = Modifier.weight(1f)
            )
            CalculationMetricBox(
              label = "Recommended Hook",
              value = yarnCategory.metricNeedles.take(8),
              sub = yarnCategory.usNeedles,
              modifier = Modifier.weight(1f)
            )
          }
        }
      }
    }
  }
}

@Composable
fun CalculationMetricBox(
  label: String,
  value: String,
  sub: String,
  modifier: Modifier = Modifier
) {
  Surface(
    modifier = modifier,
    color = MaterialTheme.colorScheme.surface,
    shape = RoundedCornerShape(12.dp),
    border = CardDefaults.outlinedCardBorder()
  ) {
    Column(
      modifier = Modifier.padding(12.dp),
      horizontalAlignment = Alignment.CenterHorizontally
    ) {
      Text(label, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
      Spacer(modifier = Modifier.height(4.dp))
      Text(value, style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold), color = MaterialTheme.colorScheme.onSurface)
      Text(sub, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.primary)
    }
  }
}

@Composable
fun NeedleGuideSection() {
  LazyColumn(
    modifier = Modifier
      .fillMaxSize()
      .padding(horizontal = 16.dp),
    contentPadding = PaddingValues(bottom = 100.dp),
    verticalArrangement = Arrangement.spacedBy(10.dp)
  ) {
    item {
      Text(
        text = "Standard International Needle & Gauge Chart",
        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
      )
    }

    items(VagmarRepository.yarnWeightCategories) { cat ->
      Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        border = CardDefaults.outlinedCardBorder()
      ) {
        Column(modifier = Modifier.padding(14.dp)) {
          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
          ) {
            Text(
              text = cat.name,
              style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
              color = MaterialTheme.colorScheme.primary
            )
            Surface(
              color = MaterialTheme.colorScheme.surfaceVariant,
              shape = RoundedCornerShape(6.dp)
            ) {
              Text(
                text = cat.wpi,
                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold)
              )
            }
          }

          Spacer(modifier = Modifier.height(6.dp))

          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
          ) {
            Column {
              Text("Metric (mm)", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
              Text(cat.metricNeedles, style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.SemiBold))
            }
            Column {
              Text("US Equivalent", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
              Text(cat.usNeedles, style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.SemiBold))
            }
            Column {
              Text("Typical Gauge", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
              Text(cat.gaugePer4Inches, style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.SemiBold))
            }
          }

          Spacer(modifier = Modifier.height(6.dp))
          Text(
            text = "Ideal for: ${cat.idealProjects}",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
          )
        }
      }
    }
  }
}
