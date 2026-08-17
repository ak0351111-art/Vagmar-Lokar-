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
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.VagmarRepository
import com.example.model.FiberOrigin
import com.example.model.WoolFiber
import com.example.ui.components.AppHeader
import com.example.ui.components.RatingBar
import com.example.ui.theme.*

@Composable
fun HeritageScreen(
  onNavigateToStudio: () -> Unit,
  onNavigateToLocker: () -> Unit
) {
  var selectedFilter by remember { mutableStateOf("All") }
  var searchQuery by remember { mutableStateOf("") }
  var selectedFiberForDetails by remember { mutableStateOf<WoolFiber?>(null) }
  var showComparisonDialog by remember { mutableStateOf(false) }
  var compareFiberA by remember { mutableStateOf(VagmarRepository.woolFibers[0]) }
  var compareFiberB by remember { mutableStateOf(VagmarRepository.woolFibers[1]) }

  val filters = listOf("All", "Indigenous Indian", "Luxury Down", "High Resilience")

  val filteredFibers = remember(selectedFilter, searchQuery) {
    VagmarRepository.woolFibers.filter { fiber ->
      val matchesSearch = fiber.name.contains(searchQuery, ignoreCase = true) ||
          fiber.nativeName.contains(searchQuery, ignoreCase = true) ||
          fiber.description.contains(searchQuery, ignoreCase = true) ||
          fiber.traditionalUses.any { it.contains(searchQuery, ignoreCase = true) }

      val matchesFilter = when (selectedFilter) {
        "Indigenous Indian" -> fiber.origin in listOf(FiberOrigin.DECCANI_INDIA, FiberOrigin.HIMALAYAN_KASHMIR, FiberOrigin.RAJASTHANI_DESI)
        "Luxury Down" -> fiber.softnessRating >= 4
        "High Resilience" -> fiber.durabilityRating >= 5
        else -> true
      }
      matchesSearch && matchesFilter
    }
  }

  LazyColumn(
    modifier = Modifier
      .fillMaxSize()
      .background(MaterialTheme.colorScheme.background),
    contentPadding = PaddingValues(bottom = 96.dp)
  ) {
    item {
      AppHeader(
        title = "Vagmar Lokar Heritage",
        subtitle = "लोकर शिल्प आणि वस्त्र ज्ञान",
        badgeText = "दख्खनी परंपरा"
      ) {
        IconButton(onClick = { showComparisonDialog = true }) {
          Icon(
            imageVector = Icons.Default.CompareArrows,
            contentDescription = "Compare Fibers",
            tint = MaterialTheme.colorScheme.primary
          )
        }
      }
    }

    // Heritage Hero Card: Dhangar Ghongadi Story
    item {
      Card(
        modifier = Modifier
          .fillMaxWidth()
          .padding(horizontal = 16.dp, vertical = 6.dp),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
          containerColor = WoolTerracotta.copy(alpha = 0.08f)
        ),
        border = CardDefaults.outlinedCardBorder().copy(
          brush = androidx.compose.ui.graphics.SolidColor(WoolTerracotta.copy(alpha = 0.3f))
        )
      ) {
        Column(modifier = Modifier.padding(16.dp)) {
          Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = Modifier.fillMaxWidth()
          ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
              Icon(
                imageVector = Icons.Filled.Shield,
                contentDescription = null,
                tint = WoolTerracotta,
                modifier = Modifier.size(20.dp)
              )
              Spacer(modifier = Modifier.width(8.dp))
              Text(
                text = "Ghongadi & Pastoral Legacy",
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                color = WoolTerracotta
              )
            }
            Surface(
              color = WoolTerracotta.copy(alpha = 0.15f),
              shape = RoundedCornerShape(6.dp)
            ) {
              Text(
                text = "Natural Rain Shield",
                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                style = MaterialTheme.typography.labelSmall,
                color = WoolTerracotta
              )
            }
          }
          Spacer(modifier = Modifier.height(8.dp))
          Text(
            text = "The black Deccani wool (घोंगडी) woven by shepherd communities is a miracle of pastoral engineering. Treated with tamarind-seed paste and rich in natural lanolin, it repels water, stays warm when wet, and provides therapeutic acupressure.",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurface
          )
        }
      }
    }

    // Search and Filter Row
    item {
      Column(modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)) {
        OutlinedTextField(
          value = searchQuery,
          onValueChange = { searchQuery = it },
          placeholder = { Text("Search fibers, origins, or techniques...") },
          leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
          trailingIcon = {
            if (searchQuery.isNotEmpty()) {
              IconButton(onClick = { searchQuery = "" }) {
                Icon(Icons.Default.Clear, contentDescription = "Clear")
              }
            }
          },
          modifier = Modifier.fillMaxWidth(),
          shape = RoundedCornerShape(12.dp),
          singleLine = true
        )

        Spacer(modifier = Modifier.height(10.dp))

        LazyRow(
          horizontalArrangement = Arrangement.spacedBy(8.dp),
          modifier = Modifier.fillMaxWidth()
        ) {
          items(filters) { filter ->
            val isSelected = selectedFilter == filter
            FilterChip(
              selected = isSelected,
              onClick = { selectedFilter = filter },
              label = { Text(filter) },
              colors = FilterChipDefaults.filterChipColors(
                selectedContainerColor = MaterialTheme.colorScheme.primary,
                selectedLabelColor = MaterialTheme.colorScheme.onPrimary
              ),
              shape = RoundedCornerShape(20.dp)
            )
          }
        }
      }
    }

    // Fiber Encyclopedia List
    item {
      Row(
        modifier = Modifier
          .fillMaxWidth()
          .padding(horizontal = 16.dp, vertical = 4.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Text(
          text = "Curated Wool & Fiber Compendium",
          style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
          color = MaterialTheme.colorScheme.onSurface
        )
        Text(
          text = "${filteredFibers.size} varieties",
          style = MaterialTheme.typography.labelMedium,
          color = MaterialTheme.colorScheme.onSurfaceVariant
        )
      }
    }

    items(filteredFibers, key = { it.id }) { fiber ->
      FiberCard(
        fiber = fiber,
        onDetailsClick = { selectedFiberForDetails = fiber }
      )
    }

    // Wool Care Tips Section
    item {
      CareGuideCard()
    }
  }

  // Fiber Detail Modal Dialog
  selectedFiberForDetails?.let { fiber ->
    FiberDetailDialog(
      fiber = fiber,
      onDismiss = { selectedFiberForDetails = null }
    )
  }

  // Fiber Comparison Dialog
  if (showComparisonDialog) {
    FiberComparisonDialog(
      fiberA = compareFiberA,
      fiberB = compareFiberB,
      onSelectA = { compareFiberA = it },
      onSelectB = { compareFiberB = it },
      onDismiss = { showComparisonDialog = false }
    )
  }
}

@Composable
fun FiberCard(
  fiber: WoolFiber,
  onDetailsClick: () -> Unit
) {
  Card(
    modifier = Modifier
      .fillMaxWidth()
      .padding(horizontal = 16.dp, vertical = 6.dp)
      .clickable(onClick = onDetailsClick),
    shape = RoundedCornerShape(14.dp),
    colors = CardDefaults.cardColors(
      containerColor = MaterialTheme.colorScheme.surface
    ),
    border = CardDefaults.outlinedCardBorder()
  ) {
    Column(modifier = Modifier.padding(16.dp)) {
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.Top
      ) {
        Column(modifier = Modifier.weight(1f)) {
          Text(
            text = fiber.name,
            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
            color = MaterialTheme.colorScheme.onSurface
          )
          Text(
            text = fiber.nativeName,
            style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Medium),
            color = MaterialTheme.colorScheme.primary
          )
        }

        Surface(
          color = MaterialTheme.colorScheme.surfaceVariant,
          shape = RoundedCornerShape(8.dp)
        ) {
          Text(
            text = fiber.micronCount,
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
            style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
            color = MaterialTheme.colorScheme.onSurfaceVariant
          )
        }
      }

      Spacer(modifier = Modifier.height(6.dp))

      Text(
        text = fiber.description,
        style = MaterialTheme.typography.bodyMedium,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
        maxLines = 2,
        overflow = TextOverflow.Ellipsis
      )

      Spacer(modifier = Modifier.height(10.dp))

      // Metric Indicators
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(16.dp)
      ) {
        Column(modifier = Modifier.weight(1f)) {
          RatingBar(label = "Warmth", value = fiber.warmthRating, color = WoolTerracotta)
          RatingBar(label = "Durability", value = fiber.durabilityRating, color = WoolSage)
        }
        Column(modifier = Modifier.weight(1f)) {
          RatingBar(label = "Softness", value = fiber.softnessRating, color = WoolIndigo)
          Row(
            modifier = Modifier
              .fillMaxWidth()
              .padding(vertical = 3.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
          ) {
            Text(
              text = "Lanolin",
              style = MaterialTheme.typography.bodySmall,
              color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Text(
              text = fiber.lanolinLevel.take(6),
              style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
              color = WoolGold
            )
          }
        }
      }

      Spacer(modifier = Modifier.height(10.dp))

      // Traditional Uses Tags
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(6.dp)
      ) {
        fiber.traditionalUses.take(2).forEach { use ->
          Surface(
            color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.6f),
            shape = RoundedCornerShape(6.dp)
          ) {
            Text(
              text = use,
              modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
              style = MaterialTheme.typography.labelSmall,
              color = MaterialTheme.colorScheme.onSurfaceVariant
            )
          }
        }
        if (fiber.traditionalUses.size > 2) {
          Text(
            text = "+${fiber.traditionalUses.size - 2} more",
            style = MaterialTheme.typography.labelSmall,
            color = MaterialTheme.colorScheme.primary,
            modifier = Modifier.align(Alignment.CenterVertically)
          )
        }
      }
    }
  }
}

@Composable
fun FiberDetailDialog(
  fiber: WoolFiber,
  onDismiss: () -> Unit
) {
  AlertDialog(
    onDismissRequest = onDismiss,
    confirmButton = {
      Button(onClick = onDismiss) {
        Text("Close")
      }
    },
    title = {
      Column {
        Text(
          text = fiber.name,
          style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold)
        )
        Text(
          text = "${fiber.nativeName} • ${fiber.origin.displayName}",
          style = MaterialTheme.typography.bodySmall,
          color = MaterialTheme.colorScheme.primary
        )
      }
    },
    text = {
      LazyColumn(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(12.dp)
      ) {
        item {
          Text(
            text = "Fiber Overview",
            style = MaterialTheme.typography.labelLarge.copy(fontWeight = FontWeight.Bold),
            color = MaterialTheme.colorScheme.primary
          )
          Spacer(modifier = Modifier.height(4.dp))
          Text(
            text = fiber.description,
            style = MaterialTheme.typography.bodyMedium
          )
        }

        item {
          Card(
            shape = RoundedCornerShape(10.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
          ) {
            Column(modifier = Modifier.padding(12.dp)) {
              Text(
                text = "Heritage & Provenance",
                style = MaterialTheme.typography.labelLarge.copy(fontWeight = FontWeight.Bold),
                color = WoolTerracotta
              )
              Spacer(modifier = Modifier.height(4.dp))
              Text(
                text = fiber.heritageStory,
                style = MaterialTheme.typography.bodyMedium
              )
            }
          }
        }

        item {
          Text(
            text = "Fiber Specifications",
            style = MaterialTheme.typography.labelLarge.copy(fontWeight = FontWeight.Bold),
            color = MaterialTheme.colorScheme.primary
          )
          Spacer(modifier = Modifier.height(6.dp))
          RatingBar(label = "Thermal Insulation", value = fiber.warmthRating, color = WoolTerracotta)
          RatingBar(label = "Tensile Durability", value = fiber.durabilityRating, color = WoolSage)
          RatingBar(label = "Tactile Softness", value = fiber.softnessRating, color = WoolIndigo)
          Spacer(modifier = Modifier.height(4.dp))
          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
          ) {
            Text("Micron Fineness:", style = MaterialTheme.typography.bodySmall)
            Text(fiber.micronCount, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold))
          }
          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
          ) {
            Text("Lanolin Barrier:", style = MaterialTheme.typography.bodySmall)
            Text(fiber.lanolinLevel, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold))
          }
        }

        item {
          Text(
            text = "Master Artisan Applications",
            style = MaterialTheme.typography.labelLarge.copy(fontWeight = FontWeight.Bold),
            color = MaterialTheme.colorScheme.primary
          )
          Spacer(modifier = Modifier.height(4.dp))
          fiber.traditionalUses.forEach { use ->
            Row(
              modifier = Modifier.padding(vertical = 2.dp),
              verticalAlignment = Alignment.CenterVertically
            ) {
              Icon(
                imageVector = Icons.Default.Check,
                contentDescription = null,
                tint = WoolSage,
                modifier = Modifier.size(16.dp)
              )
              Spacer(modifier = Modifier.width(6.dp))
              Text(use, style = MaterialTheme.typography.bodyMedium)
            }
          }
        }
      }
    }
  )
}

@Composable
fun FiberComparisonDialog(
  fiberA: WoolFiber,
  fiberB: WoolFiber,
  onSelectA: (WoolFiber) -> Unit,
  onSelectB: (WoolFiber) -> Unit,
  onDismiss: () -> Unit
) {
  var showSelectAMenu by remember { mutableStateOf(false) }
  var showSelectBMenu by remember { mutableStateOf(false) }

  AlertDialog(
    onDismissRequest = onDismiss,
    confirmButton = {
      Button(onClick = onDismiss) {
        Text("Done")
      }
    },
    title = {
      Text(
        text = "Fiber Comparison Matrix",
        style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold)
      )
    },
    text = {
      Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(12.dp)
      ) {
        // Selectors
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
          Box(modifier = Modifier.weight(1f)) {
            OutlinedButton(
              onClick = { showSelectAMenu = true },
              modifier = Modifier.fillMaxWidth(),
              contentPadding = PaddingValues(horizontal = 8.dp, vertical = 6.dp)
            ) {
              Text(
                text = fiberA.name.take(16) + "...",
                maxLines = 1,
                style = MaterialTheme.typography.labelSmall
              )
            }
            DropdownMenu(
              expanded = showSelectAMenu,
              onDismissRequest = { showSelectAMenu = false }
            ) {
              VagmarRepository.woolFibers.forEach { fiber ->
                DropdownMenuItem(
                  text = { Text(fiber.name) },
                  onClick = {
                    onSelectA(fiber)
                    showSelectAMenu = false
                  }
                )
              }
            }
          }

          Box(modifier = Modifier.weight(1f)) {
            OutlinedButton(
              onClick = { showSelectBMenu = true },
              modifier = Modifier.fillMaxWidth(),
              contentPadding = PaddingValues(horizontal = 8.dp, vertical = 6.dp)
            ) {
              Text(
                text = fiberB.name.take(16) + "...",
                maxLines = 1,
                style = MaterialTheme.typography.labelSmall
              )
            }
            DropdownMenu(
              expanded = showSelectBMenu,
              onDismissRequest = { showSelectBMenu = false }
            ) {
              VagmarRepository.woolFibers.forEach { fiber ->
                DropdownMenuItem(
                  text = { Text(fiber.name) },
                  onClick = {
                    onSelectB(fiber)
                    showSelectBMenu = false
                  }
                )
              }
            }
          }
        }

        Divider()

        ComparisonRow(label = "Microns", valA = fiberA.micronCount, valB = fiberB.micronCount)
        ComparisonRow(label = "Warmth", valA = "${fiberA.warmthRating}/5", valB = "${fiberB.warmthRating}/5")
        ComparisonRow(label = "Durability", valA = "${fiberA.durabilityRating}/5", valB = "${fiberB.durabilityRating}/5")
        ComparisonRow(label = "Softness", valA = "${fiberA.softnessRating}/5", valB = "${fiberB.softnessRating}/5")
        ComparisonRow(label = "Lanolin", valA = fiberA.lanolinLevel, valB = fiberB.lanolinLevel)
        ComparisonRow(label = "Texture", valA = fiberA.textureRating, valB = fiberB.textureRating)
      }
    }
  )
}

@Composable
fun ComparisonRow(label: String, valA: String, valB: String) {
  Column(modifier = Modifier.fillMaxWidth()) {
    Text(
      text = label,
      style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
      color = MaterialTheme.colorScheme.primary
    )
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.SpaceBetween
    ) {
      Text(valA, modifier = Modifier.weight(1f), style = MaterialTheme.typography.bodySmall)
      Spacer(modifier = Modifier.width(8.dp))
      Text(valB, modifier = Modifier.weight(1f), style = MaterialTheme.typography.bodySmall)
    }
    Spacer(modifier = Modifier.height(4.dp))
  }
}

@Composable
fun CareGuideCard() {
  Card(
    modifier = Modifier
      .fillMaxWidth()
      .padding(16.dp),
    shape = RoundedCornerShape(16.dp),
    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
  ) {
    Column(modifier = Modifier.padding(16.dp)) {
      Row(verticalAlignment = Alignment.CenterVertically) {
        Icon(
          imageVector = Icons.Default.Eco,
          contentDescription = null,
          tint = WoolSage
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text(
          text = "Traditional Wool Care & Longevity",
          style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
          color = MaterialTheme.colorScheme.onSurface
        )
      }
      Spacer(modifier = Modifier.height(8.dp))
      Text(
        text = "• Never agitate hot water with wool (causes shock felting).\n• Ghongadi items benefit from sunlight airing rather than frequent soap wash.\n• For fine Pashmina and Merino, use reetha (soapnuts) in lukewarm water.\n• Store with dried neem leaves and Himalayan cedar wood chips to prevent moths without chemicals.",
        style = MaterialTheme.typography.bodySmall,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
        lineHeight = 20.sp
      )
    }
  }
}
