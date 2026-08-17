package com.example.ui.screens

import android.widget.Toast
import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.VagmarRepository
import com.example.model.ActiveProject
import com.example.ui.components.AppHeader
import com.example.ui.theme.*

@Composable
fun ProjectPlannerScreen() {
  val context = LocalContext.current
  var projectsList by remember { mutableStateOf(VagmarRepository.initialProjects) }
  var showAddProjectDialog by remember { mutableStateOf(false) }

  LazyColumn(
    modifier = Modifier
      .fillMaxSize()
      .background(MaterialTheme.colorScheme.background),
    contentPadding = PaddingValues(bottom = 100.dp),
    verticalArrangement = Arrangement.spacedBy(12.dp)
  ) {
    item {
      AppHeader(
        title = "Active Wool Projects",
        subtitle = "विणकाम प्रगती आणि पंक्ती मोजणी",
        badgeText = "${projectsList.size} in progress"
      ) {
        IconButton(onClick = { showAddProjectDialog = true }) {
          Icon(
            imageVector = Icons.Default.AddCircleOutline,
            contentDescription = "New Project",
            tint = MaterialTheme.colorScheme.primary
          )
        }
      }
    }

    if (projectsList.isEmpty()) {
      item {
        Box(
          modifier = Modifier
            .fillMaxWidth()
            .padding(40.dp),
          contentAlignment = Alignment.Center
        ) {
          Text("No active projects. Tap + to begin a craft project.")
        }
      }
    } else {
      items(projectsList, key = { it.id }) { project ->
        ProjectProgressCard(
          project = project,
          onIncrementRow = {
            projectsList = projectsList.map {
              if (it.id == project.id) {
                val newRows = it.currentRows + 1
                val progress = if (it.targetRows > 0) (newRows.toFloat() / it.targetRows).coerceIn(0f, 1f) else 0f
                it.copy(currentRows = newRows, progressPercent = progress, isCompleted = newRows >= it.targetRows)
              } else it
            }
          },
          onDecrementRow = {
            projectsList = projectsList.map {
              if (it.id == project.id && it.currentRows > 0) {
                val newRows = it.currentRows - 1
                val progress = if (it.targetRows > 0) (newRows.toFloat() / it.targetRows).coerceIn(0f, 1f) else 0f
                it.copy(currentRows = newRows, progressPercent = progress, isCompleted = false)
              } else it
            }
          },
          onDelete = {
            projectsList = projectsList.filter { it.id != project.id }
            Toast.makeText(context, "Project removed", Toast.LENGTH_SHORT).show()
          }
        )
      }
    }
  }

  if (showAddProjectDialog) {
    AddProjectDialog(
      onDismiss = { showAddProjectDialog = false },
      onSave = { newProj ->
        projectsList = listOf(newProj) + projectsList
        showAddProjectDialog = false
        Toast.makeText(context, "Project created", Toast.LENGTH_SHORT).show()
      }
    )
  }
}

@Composable
fun ProjectProgressCard(
  project: ActiveProject,
  onIncrementRow: () -> Unit,
  onDecrementRow: () -> Unit,
  onDelete: () -> Unit
) {
  Card(
    modifier = Modifier
      .fillMaxWidth()
      .padding(horizontal = 16.dp),
    shape = RoundedCornerShape(16.dp),
    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
    border = CardDefaults.outlinedCardBorder()
  ) {
    Column(modifier = Modifier.padding(16.dp)) {
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Column(modifier = Modifier.weight(1f)) {
          Text(
            text = project.title,
            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
            color = MaterialTheme.colorScheme.onSurface
          )
          Text(
            text = "${project.craftType} • ${project.needleHook}",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.primary
          )
        }

        IconButton(onClick = onDelete, modifier = Modifier.size(32.dp)) {
          Icon(Icons.Default.Close, contentDescription = "Delete", tint = MaterialTheme.colorScheme.outline)
        }
      }

      Spacer(modifier = Modifier.height(10.dp))

      // Row Counter Controls
      Surface(
        modifier = Modifier.fillMaxWidth(),
        color = MaterialTheme.colorScheme.surfaceVariant,
        shape = RoundedCornerShape(12.dp)
      ) {
        Row(
          modifier = Modifier
            .fillMaxWidth()
            .padding(12.dp),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Column {
            Text(
              text = "Row Counter (ओळ मोजणी)",
              style = MaterialTheme.typography.labelSmall,
              color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Text(
              text = "Row ${project.currentRows} of ${project.targetRows}",
              style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold),
              color = MaterialTheme.colorScheme.onSurface
            )
          }

          Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilledTonalIconButton(
              onClick = onDecrementRow,
              modifier = Modifier.size(40.dp)
            ) {
              Icon(Icons.Default.Remove, contentDescription = "Minus 1 row")
            }

            Button(
              onClick = onIncrementRow,
              modifier = Modifier.height(40.dp),
              shape = RoundedCornerShape(10.dp)
            ) {
              Icon(Icons.Default.Add, contentDescription = null, modifier = Modifier.size(18.dp))
              Spacer(modifier = Modifier.width(4.dp))
              Text("+1 Row")
            }
          }
        }
      }

      Spacer(modifier = Modifier.height(12.dp))

      // Progress Bar
      LinearProgressIndicator(
        progress = { project.progressPercent },
        modifier = Modifier
          .fillMaxWidth()
          .height(8.dp)
          .clip(RoundedCornerShape(4.dp)),
        color = if (project.isCompleted) WoolSage else WoolTerracotta,
        trackColor = MaterialTheme.colorScheme.surfaceVariant
      )

      Spacer(modifier = Modifier.height(6.dp))

      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween
      ) {
        Text(
          text = if (project.isCompleted) "Completed!" else "${(project.progressPercent * 100).toInt()}% Finished",
          style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
          color = if (project.isCompleted) WoolSage else MaterialTheme.colorScheme.onSurfaceVariant
        )
        Text(
          text = project.yarnUsed,
          style = MaterialTheme.typography.labelSmall,
          color = MaterialTheme.colorScheme.primary
        )
      }

      if (project.notes.isNotBlank()) {
        Spacer(modifier = Modifier.height(8.dp))
        Text(
          text = "Note: ${project.notes}",
          style = MaterialTheme.typography.bodySmall,
          color = MaterialTheme.colorScheme.onSurfaceVariant
        )
      }
    }
  }
}

@Composable
fun AddProjectDialog(
  onDismiss: () -> Unit,
  onSave: (ActiveProject) -> Unit
) {
  var title by remember { mutableStateOf("") }
  var craftType by remember { mutableStateOf("Knitting") }
  var targetRows by remember { mutableStateOf("120") }
  var yarnUsed by remember { mutableStateOf("100% Deccani Wool DK") }
  var needleHook by remember { mutableStateOf("4.5 mm Needles") }
  var notes by remember { mutableStateOf("") }

  val craftTypes = listOf("Knitting", "Crochet", "Pit Loom / Weaving")

  AlertDialog(
    onDismissRequest = onDismiss,
    title = { Text("Start New Woolcraft Project", fontWeight = FontWeight.Bold) },
    text = {
      LazyColumn(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(10.dp)
      ) {
        item {
          OutlinedTextField(
            value = title,
            onValueChange = { title = it },
            label = { Text("Project Title") },
            placeholder = { Text("e.g. Traditional Ghongadi Shawl") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            shape = RoundedCornerShape(10.dp)
          )
        }

        item {
          Text("Craft Modality:", style = MaterialTheme.typography.labelMedium)
          Spacer(modifier = Modifier.height(4.dp))
          Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            craftTypes.forEach { type ->
              FilterChip(
                selected = craftType == type,
                onClick = { craftType = type },
                label = { Text(type) }
              )
            }
          }
        }

        item {
          OutlinedTextField(
            value = targetRows,
            onValueChange = { targetRows = it },
            label = { Text("Target Rows / Repeats") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            shape = RoundedCornerShape(10.dp)
          )
        }

        item {
          OutlinedTextField(
            value = yarnUsed,
            onValueChange = { yarnUsed = it },
            label = { Text("Yarn / Fiber Details") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            shape = RoundedCornerShape(10.dp)
          )
        }

        item {
          OutlinedTextField(
            value = needleHook,
            onValueChange = { needleHook = it },
            label = { Text("Needle / Hook Size") },
            modifier = Modifier.fillMaxWidth(),
            singleLine = true,
            shape = RoundedCornerShape(10.dp)
          )
        }

        item {
          OutlinedTextField(
            value = notes,
            onValueChange = { notes = it },
            label = { Text("Pattern Notes / Key Milestone") },
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(10.dp)
          )
        }
      }
    },
    confirmButton = {
      Button(
        onClick = {
          if (title.isNotBlank()) {
            val totalRows = targetRows.toIntOrNull() ?: 100
            val proj = ActiveProject(
              id = "proj_${System.currentTimeMillis()}",
              title = title,
              craftType = craftType,
              targetRows = totalRows,
              currentRows = 0,
              yarnUsed = yarnUsed.ifBlank { "Unspecified Wool" },
              needleHook = needleHook.ifBlank { "Standard Needles" },
              notes = notes,
              progressPercent = 0f
            )
            onSave(proj)
          }
        }
      ) {
        Text("Create Project")
      }
    },
    dismissButton = {
      TextButton(onClick = onDismiss) {
        Text("Cancel")
      }
    }
  )
}
