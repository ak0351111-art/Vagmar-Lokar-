package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import com.example.ui.screens.HeritageScreen
import com.example.ui.screens.LockerScreen
import com.example.ui.screens.ProjectPlannerScreen
import com.example.ui.screens.StudioScreen
import com.example.ui.theme.MyApplicationTheme

enum class AppDestination(
  val label: String,
  val selectedIcon: ImageVector,
  val unselectedIcon: ImageVector
) {
  HERITAGE("Heritage", Icons.Filled.Spa, Icons.Outlined.Spa),
  STUDIO("Studio", Icons.Filled.GridView, Icons.Outlined.GridView),
  LOCKER("Locker", Icons.Filled.Lock, Icons.Outlined.Lock),
  PROJECTS("Tracker", Icons.Filled.Checklist, Icons.Outlined.Checklist)
}

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      MyApplicationTheme {
        VagmarLokarApp()
      }
    }
  }
}

@Composable
fun VagmarLokarApp() {
  var currentDestination by remember { mutableStateOf(AppDestination.HERITAGE) }

  Scaffold(
    modifier = Modifier.fillMaxSize(),
    bottomBar = {
      NavigationBar(
        containerColor = MaterialTheme.colorScheme.surface,
        contentColor = MaterialTheme.colorScheme.primary
      ) {
        AppDestination.values().forEach { destination ->
          val isSelected = currentDestination == destination
          NavigationBarItem(
            selected = isSelected,
            onClick = { currentDestination = destination },
            icon = {
              Icon(
                imageVector = if (isSelected) destination.selectedIcon else destination.unselectedIcon,
                contentDescription = destination.label
              )
            },
            label = {
              Text(
                text = destination.label,
                style = MaterialTheme.typography.labelSmall
              )
            }
          )
        }
      }
    }
  ) { innerPadding ->
    Box(
      modifier = Modifier
        .fillMaxSize()
        .padding(innerPadding)
    ) {
      when (currentDestination) {
        AppDestination.HERITAGE -> HeritageScreen(
          onNavigateToStudio = { currentDestination = AppDestination.STUDIO },
          onNavigateToLocker = { currentDestination = AppDestination.LOCKER }
        )
        AppDestination.STUDIO -> StudioScreen()
        AppDestination.LOCKER -> LockerScreen()
        AppDestination.PROJECTS -> ProjectPlannerScreen()
      }
    }
  }
}

@androidx.compose.ui.tooling.preview.Preview(showBackground = true)
@Composable
fun AppPreview() {
  MyApplicationTheme {
    VagmarLokarApp()
  }
}

