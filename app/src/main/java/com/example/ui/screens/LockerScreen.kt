package com.example.ui.screens

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.widget.Toast
import androidx.compose.animation.*
import androidx.compose.foundation.background
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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.VagmarRepository
import com.example.model.LockerCategory
import com.example.model.LockerItem
import com.example.ui.components.AppHeader
import com.example.ui.theme.*

@Composable
fun LockerScreen() {
  val context = LocalContext.current
  var itemsList by remember { mutableStateOf(VagmarRepository.initialLockerItems) }
  var isVaultUnlocked by remember { mutableStateOf(false) }
  var currentPin by remember { mutableStateOf("1234") }
  var showPinDialog by remember { mutableStateOf(false) }
  var showAddItemDialog by remember { mutableStateOf(false) }
  var selectedCategoryFilter by remember { mutableStateOf<LockerCategory?>(null) }
  var searchQuery by remember { mutableStateOf("") }
  var itemToUnlockId by remember { mutableStateOf<String?>(null) }

  val filteredItems = remember(itemsList, selectedCategoryFilter, searchQuery, isVaultUnlocked) {
    itemsList.filter { item ->
      val matchesCategory = selectedCategoryFilter == null || item.category == selectedCategoryFilter
      val matchesSearch = item.title.contains(searchQuery, ignoreCase = true) ||
          item.content.contains(searchQuery, ignoreCase = true) ||
          item.tags.any { it.contains(searchQuery, ignoreCase = true) } ||
          (item.yarnBrand?.contains(searchQuery, ignoreCase = true) == true)
      matchesCategory && matchesSearch
    }
  }

  val totalSkeins = remember(itemsList) {
    itemsList.sumOf { it.quantitySkeins ?: 0 }
  }

  LazyColumn(
    modifier = Modifier
      .fillMaxSize()
      .background(MaterialTheme.colorScheme.background),
    contentPadding = PaddingValues(bottom = 100.dp)
  ) {
    item {
      AppHeader(
        title = "Vagmar Digital Locker",
        subtitle = "सुरक्षित लोकर आणि फॉर्म्युला तिजोरी",
        badgeText = if (isVaultUnlocked) "Unlocked" else "Vault Protected"
      ) {
        IconButton(
          onClick = {
            if (isVaultUnlocked) {
              isVaultUnlocked = false
              Toast.makeText(context, "Locker Locked Securely", Toast.LENGTH_SHORT).show()
            } else {
              showPinDialog = true
            }
          }
        ) {
          Icon(
            imageVector = if (isVaultUnlocked) Icons.Filled.LockOpen else Icons.Filled.Lock,
            contentDescription = "Lock Status",
            tint = if (isVaultUnlocked) WoolSage else WoolTerracotta
          )
        }
      }
    }

    // Quick Stats Overview Card
    item {
      Card(
        modifier = Modifier
          .fillMaxWidth()
          .padding(horizontal = 16.dp, vertical = 6.dp),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
      ) {
        Row(
          modifier = Modifier
            .fillMaxWidth()
            .padding(14.dp),
          horizontalArrangement = Arrangement.SpaceBetween
        ) {
          LockerStatCol(label = "Vault Entries", value = "${itemsList.size}")
          LockerStatCol(label = "Stash Skeins", value = "$totalSkeins")
          LockerStatCol(label = "Protected Notes", value = "${itemsList.count { it.isLockedWithPin }}")
          LockerStatCol(label = "Favorites", value = "${itemsList.count { it.isFavorite }}")
        }
      }
    }

    // Action Row & Category Filters
    item {
      Column(modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)) {
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.spacedBy(8.dp),
          verticalAlignment = Alignment.CenterVertically
        ) {
          OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            placeholder = { Text("Search stash, formulas...") },
            leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
            trailingIcon = {
              if (searchQuery.isNotEmpty()) {
                IconButton(onClick = { searchQuery = "" }) {
                  Icon(Icons.Default.Clear, contentDescription = "Clear")
                }
              }
            },
            modifier = Modifier.weight(1f),
            shape = RoundedCornerShape(12.dp),
            singleLine = true
          )

          Button(
            onClick = { showAddItemDialog = true },
            shape = RoundedCornerShape(12.dp)
          ) {
            Icon(Icons.Default.Add, contentDescription = "Add Item")
            Spacer(modifier = Modifier.width(4.dp))
            Text("Add")
          }
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Categories Chips
        LazyRow(
          horizontalArrangement = Arrangement.spacedBy(8.dp),
          modifier = Modifier.fillMaxWidth()
        ) {
          item {
            FilterChip(
              selected = selectedCategoryFilter == null,
              onClick = { selectedCategoryFilter = null },
              label = { Text("All Vault") },
              colors = FilterChipDefaults.filterChipColors(
                selectedContainerColor = MaterialTheme.colorScheme.primary,
                selectedLabelColor = MaterialTheme.colorScheme.onPrimary
              )
            )
          }

          items(LockerCategory.values()) { cat ->
            val isSelected = selectedCategoryFilter == cat
            FilterChip(
              selected = isSelected,
              onClick = { selectedCategoryFilter = if (isSelected) null else cat },
              label = { Text(cat.label) },
              colors = FilterChipDefaults.filterChipColors(
                selectedContainerColor = MaterialTheme.colorScheme.primary,
                selectedLabelColor = MaterialTheme.colorScheme.onPrimary
              )
            )
          }
        }
      }
    }

    // Items List
    if (filteredItems.isEmpty()) {
      item {
        Box(
          modifier = Modifier
            .fillMaxWidth()
            .padding(40.dp),
          contentAlignment = Alignment.Center
        ) {
          Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Icon(
              imageVector = Icons.Default.FolderOpen,
              contentDescription = null,
              modifier = Modifier.size(48.dp),
              tint = MaterialTheme.colorScheme.outline
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
              text = "No locker items found",
              style = MaterialTheme.typography.bodyMedium,
              color = MaterialTheme.colorScheme.onSurfaceVariant
            )
          }
        }
      }
    } else {
      items(filteredItems, key = { it.id }) { item ->
        LockerItemCard(
          item = item,
          isVaultUnlocked = isVaultUnlocked,
          onRequestUnlock = { showPinDialog = true },
          onToggleFavorite = {
            itemsList = itemsList.map {
              if (it.id == item.id) it.copy(isFavorite = !it.isFavorite) else it
            }
          },
          onDelete = {
            itemsList = itemsList.filter { it.id != item.id }
            Toast.makeText(context, "Item deleted", Toast.LENGTH_SHORT).show()
          },
          onCopy = {
            val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
            val clip = ClipData.newPlainText(item.title, item.content)
            clipboard.setPrimaryClip(clip)
            Toast.makeText(context, "Copied content to clipboard", Toast.LENGTH_SHORT).show()
          }
        )
      }
    }
  }

  // PIN Unlock Dialog
  if (showPinDialog) {
    PinEntryDialog(
      expectedPin = currentPin,
      onSuccess = {
        isVaultUnlocked = true
        showPinDialog = false
        Toast.makeText(context, "Locker Vault Unlocked!", Toast.LENGTH_SHORT).show()
      },
      onDismiss = { showPinDialog = false }
    )
  }

  // Add Item Dialog
  if (showAddItemDialog) {
    AddItemDialog(
      onDismiss = { showAddItemDialog = false },
      onSave = { newItem ->
        itemsList = listOf(newItem) + itemsList
        showAddItemDialog = false
        Toast.makeText(context, "Added to Vagmar Locker", Toast.LENGTH_SHORT).show()
      }
    )
  }
}

@Composable
fun LockerStatCol(label: String, value: String) {
  Column(horizontalAlignment = Alignment.CenterHorizontally) {
    Text(
      text = value,
      style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
      color = MaterialTheme.colorScheme.primary
    )
    Text(
      text = label,
      style = MaterialTheme.typography.labelSmall,
      color = MaterialTheme.colorScheme.onSurfaceVariant
    )
  }
}

@Composable
fun LockerItemCard(
  item: LockerItem,
  isVaultUnlocked: Boolean,
  onRequestUnlock: () -> Unit,
  onToggleFavorite: () -> Unit,
  onDelete: () -> Unit,
  onCopy: () -> Unit
) {
  val isMasked = item.isLockedWithPin && !isVaultUnlocked

  Card(
    modifier = Modifier
      .fillMaxWidth()
      .padding(horizontal = 16.dp, vertical = 6.dp),
    shape = RoundedCornerShape(14.dp),
    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
    border = CardDefaults.outlinedCardBorder()
  ) {
    Column(modifier = Modifier.padding(16.dp)) {
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Row(
          modifier = Modifier.weight(1f),
          verticalAlignment = Alignment.CenterVertically
        ) {
          Surface(
            color = when (item.category) {
              LockerCategory.PATTERNS -> WoolIndigo.copy(alpha = 0.15f)
              LockerCategory.STASH -> WoolGold.copy(alpha = 0.15f)
              LockerCategory.PRIVATE_NOTES -> WoolTerracotta.copy(alpha = 0.15f)
              LockerCategory.CERTIFICATES -> WoolSage.copy(alpha = 0.15f)
              LockerCategory.PROJECT_LOGS -> MaterialTheme.colorScheme.surfaceVariant
            },
            shape = RoundedCornerShape(8.dp)
          ) {
            Text(
              text = item.category.label.take(18),
              modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp),
              style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
              color = MaterialTheme.colorScheme.onSurface
            )
          }

          if (item.isLockedWithPin) {
            Spacer(modifier = Modifier.width(6.dp))
            Icon(
              imageVector = if (isVaultUnlocked) Icons.Default.LockOpen else Icons.Default.Lock,
              contentDescription = "PIN Protected",
              modifier = Modifier.size(16.dp),
              tint = if (isVaultUnlocked) WoolSage else WoolTerracotta
            )
          }
        }

        Row(verticalAlignment = Alignment.CenterVertically) {
          IconButton(onClick = onToggleFavorite, modifier = Modifier.size(32.dp)) {
            Icon(
              imageVector = if (item.isFavorite) Icons.Filled.Star else Icons.Outlined.StarBorder,
              contentDescription = "Favorite",
              tint = if (item.isFavorite) WoolGold else MaterialTheme.colorScheme.outline
            )
          }
          IconButton(onClick = onDelete, modifier = Modifier.size(32.dp)) {
            Icon(
              imageVector = Icons.Default.DeleteOutline,
              contentDescription = "Delete",
              tint = MaterialTheme.colorScheme.outline
            )
          }
        }
      }

      Spacer(modifier = Modifier.height(8.dp))

      Text(
        text = item.title,
        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
        color = MaterialTheme.colorScheme.onSurface
      )

      Spacer(modifier = Modifier.height(6.dp))

      if (isMasked) {
        Surface(
          modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onRequestUnlock),
          color = MaterialTheme.colorScheme.surfaceVariant,
          shape = RoundedCornerShape(8.dp)
        ) {
          Row(
            modifier = Modifier.padding(12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
          ) {
            Icon(
              imageVector = Icons.Filled.Lock,
              contentDescription = null,
              tint = WoolTerracotta,
              modifier = Modifier.size(18.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
              text = "Confidential Item. Tap to enter PIN & decrypt.",
              style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Medium),
              color = WoolTerracotta
            )
          }
        }
      } else {
        Text(
          text = item.content,
          style = MaterialTheme.typography.bodyMedium,
          color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        // Stash/Pattern specific parameters
        if (item.yarnBrand != null || item.quantitySkeins != null || item.needleSize != null) {
          Spacer(modifier = Modifier.height(8.dp))
          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
          ) {
            item.yarnBrand?.let {
              Text("Brand: $it", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.primary)
            }
            item.quantitySkeins?.let {
              Text("• $it Skeins", style = MaterialTheme.typography.labelSmall, color = WoolGold)
            }
            item.needleSize?.let {
              Text("• Needles: $it", style = MaterialTheme.typography.labelSmall, color = WoolSage)
            }
          }
        }

        Spacer(modifier = Modifier.height(10.dp))

        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          // Tags
          LazyRow(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
            items(item.tags) { tag ->
              Surface(
                color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f),
                shape = RoundedCornerShape(4.dp)
              ) {
                Text(
                  text = "#$tag",
                  modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                  style = MaterialTheme.typography.labelSmall,
                  color = MaterialTheme.colorScheme.onSurfaceVariant
                )
              }
            }
          }

          TextButton(
            onClick = onCopy,
            contentPadding = PaddingValues(horizontal = 8.dp, vertical = 4.dp)
          ) {
            Icon(Icons.Default.ContentCopy, contentDescription = null, modifier = Modifier.size(16.dp))
            Spacer(modifier = Modifier.width(4.dp))
            Text("Copy", style = MaterialTheme.typography.labelSmall)
          }
        }
      }
    }
  }
}

@Composable
fun PinEntryDialog(
  expectedPin: String,
  onSuccess: () -> Unit,
  onDismiss: () -> Unit
) {
  var inputPin by remember { mutableStateOf("") }
  var isError by remember { mutableStateOf(false) }

  AlertDialog(
    onDismissRequest = onDismiss,
    title = {
      Row(verticalAlignment = Alignment.CenterVertically) {
        Icon(Icons.Default.Security, contentDescription = null, tint = WoolTerracotta)
        Spacer(modifier = Modifier.width(8.dp))
        Text("Vagmar Locker PIN")
      }
    },
    text = {
      Column(
        modifier = Modifier.fillMaxWidth(),
        horizontalAlignment = Alignment.CenterHorizontally
      ) {
        Text(
          text = "Enter 4-digit PIN to access confidential notes & formulas (Default: 1234)",
          style = MaterialTheme.typography.bodySmall,
          color = MaterialTheme.colorScheme.onSurfaceVariant
        )
        Spacer(modifier = Modifier.height(14.dp))
        OutlinedTextField(
          value = inputPin,
          onValueChange = {
            if (it.length <= 4) {
              inputPin = it
              isError = false
            }
          },
          label = { Text("4-Digit PIN") },
          visualTransformation = PasswordVisualTransformation(),
          keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.NumberPassword),
          singleLine = true,
          isError = isError,
          modifier = Modifier.width(180.dp),
          shape = RoundedCornerShape(12.dp)
        )
        if (isError) {
          Spacer(modifier = Modifier.height(4.dp))
          Text("Incorrect PIN. Please try again.", color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.labelSmall)
        }
      }
    },
    confirmButton = {
      Button(
        onClick = {
          if (inputPin == expectedPin) {
            onSuccess()
          } else {
            isError = true
          }
        }
      ) {
        Text("Unlock Vault")
      }
    },
    dismissButton = {
      TextButton(onClick = onDismiss) {
        Text("Cancel")
      }
    }
  )
}

@Composable
fun AddItemDialog(
  onDismiss: () -> Unit,
  onSave: (LockerItem) -> Unit
) {
  var title by remember { mutableStateOf("") }
  var content by remember { mutableStateOf("") }
  var selectedCat by remember { mutableStateOf(LockerCategory.STASH) }
  var tagsText by remember { mutableStateOf("") }
  var yarnBrand by remember { mutableStateOf("") }
  var skeinsCount by remember { mutableStateOf("") }
  var needleSize by remember { mutableStateOf("") }
  var isPinProtected by remember { mutableStateOf(false) }

  AlertDialog(
    onDismissRequest = onDismiss,
    title = { Text("Add to Vagmar Locker", fontWeight = FontWeight.Bold) },
    text = {
      LazyColumn(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(10.dp)
      ) {
        item {
          OutlinedTextField(
            value = title,
            onValueChange = { title = it },
            label = { Text("Entry Title") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            shape = RoundedCornerShape(10.dp)
          )
        }

        item {
          Text("Category:", style = MaterialTheme.typography.labelMedium)
          Spacer(modifier = Modifier.height(4.dp))
          LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            items(LockerCategory.values()) { cat ->
              FilterChip(
                selected = selectedCat == cat,
                onClick = { selectedCat = cat },
                label = { Text(cat.label.take(16)) }
              )
            }
          }
        }

        item {
          OutlinedTextField(
            value = content,
            onValueChange = { content = it },
            label = { Text("Details / Formula / Pattern") },
            modifier = Modifier
              .fillMaxWidth()
              .height(100.dp),
            maxLines = 4,
            shape = RoundedCornerShape(10.dp)
          )
        }

        if (selectedCat == LockerCategory.STASH) {
          item {
            Row(
              modifier = Modifier.fillMaxWidth(),
              horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
              OutlinedTextField(
                value = yarnBrand,
                onValueChange = { yarnBrand = it },
                label = { Text("Yarn Brand") },
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(10.dp)
              )
              OutlinedTextField(
                value = skeinsCount,
                onValueChange = { skeinsCount = it },
                label = { Text("Skeins") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(10.dp)
              )
            }
          }
        }

        item {
          OutlinedTextField(
            value = tagsText,
            onValueChange = { tagsText = it },
            label = { Text("Tags (comma separated)") },
            placeholder = { Text("Wool, Indigo, Recipe") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            shape = RoundedCornerShape(10.dp)
          )
        }

        item {
          Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
          ) {
            Text("PIN Protection", style = MaterialTheme.typography.bodyMedium)
            Switch(
              checked = isPinProtected,
              onCheckedChange = { isPinProtected = it }
            )
          }
        }
      }
    },
    confirmButton = {
      Button(
        onClick = {
          if (title.isNotBlank()) {
            val tags = tagsText.split(",").map { it.trim() }.filter { it.isNotEmpty() }
            val item = LockerItem(
              id = "item_${System.currentTimeMillis()}",
              title = title,
              category = selectedCat,
              content = content.ifBlank { "No content specified." },
              tags = if (tags.isEmpty()) listOf("Locker") else tags,
              yarnBrand = yarnBrand.ifBlank { null },
              quantitySkeins = skeinsCount.toIntOrNull(),
              needleSize = needleSize.ifBlank { null },
              isLockedWithPin = isPinProtected,
              isFavorite = false
            )
            onSave(item)
          }
        }
      ) {
        Text("Save Entry")
      }
    },
    dismissButton = {
      TextButton(onClick = onDismiss) {
        Text("Cancel")
      }
    }
  )
}
