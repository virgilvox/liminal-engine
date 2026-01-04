# Handoff Notes - LIMINAL_ENGINE Vue 3 Migration

## Project Status: ~80% Complete

The core engine has been successfully migrated from a single HTML file to a modular Vue 3 application. The game can be started, renders correctly, and responds to keyboard input for player movement.

## What's Working

### Core Systems
- **Rendering Engine**: Full canvas rendering with all floor types, 40+ furniture types, and character sprites
- **Audio Engine**: Web Audio API with procedural lo-fi music generator and sound effects
- **Game Loop**: requestAnimationFrame-based loop with proper start/stop/pause
- **Input System**: Keyboard controls (WASD/Arrows for movement, Space/E for interact)
- **Collision System**: AABB collision detection for walls and furniture
- **Camera System**: Smooth camera follow for player movement
- **State Management**: Pinia stores for game, player, dialogue, inventory, and UI state

### Visual Effects
- CRT scanline overlay
- Vignette effect
- Neon glow effects (CSS + canvas)

### Environments
All 7 environments from starter.html are now available:
- Hub (central area)
- Diner (retro diner with booths)
- Forest (dark forest with trees and campfire)
- Alley (narrow dark alley)
- Cave (crystal cave with glowing crystals)
- Shop (item shop with bookshelves)
- Showcase (sprite showcase for all furniture)

## What's Not Yet Implemented

### High Priority
1. **Warp Transitions**: Player can walk into warp zones but transitions don't trigger yet
2. **NPC System**: NPC templates exist in types but no actual NPCs spawn or interact
3. **Dialogue System**: Store is ready but no dialogue UI components
4. **Interaction System**: Objects can't be interacted with yet

### Medium Priority
1. **Mobile Controls**: Joystick input handlers exist but no visual joystick component
2. **Inventory UI**: Store is ready but no visual inventory panel
3. **Pause Menu**: Pause state exists but no pause menu UI
4. **Notifications**: System exists but needs visual component

### Low Priority
1. **Save/Load**: Not implemented
2. **Settings Panel**: Not implemented
3. **Quest System**: Type definitions exist but not implemented

## How to Continue

### Running the Project
```bash
cd vue-app
npm install  # if not already done
npm run dev  # Development server
npm run build  # Production build
```

### Next Steps (in order)

1. **Implement Warp Transitions**
   - Modify `GameCanvas.vue` to check for warp collisions
   - Use `gameStore.loadEnvironment()` to switch environments
   - Add transition animation (fade out/in)

2. **Add NPC Templates**
   - Create `/data/npcs/templates.ts` with NPC definitions
   - Add NPC spawning logic to environment loading
   - Implement NPC rendering (already supported in CharacterRenderer)

3. **Create Dialogue UI**
   - Create `DialogueBox.vue` component
   - Wire up to `dialogueStore`
   - Add typewriter effect using existing store logic

4. **Add Interaction System**
   - Check for nearby interactables in game loop
   - Show interaction prompt in UI
   - Handle E/Space to trigger interactions

## Architecture Overview

```
src/
├── types/           # TypeScript type definitions
├── config/          # Game configuration and theme
├── stores/          # Pinia state management
│   ├── gameStore    # Game state, environments, camera
│   ├── playerStore  # Player position, stats, appearance
│   ├── dialogueStore # Dialogue state machine
│   ├── inventoryStore # Item management
│   └── uiStore      # UI state, notifications
├── composables/     # Vue composition functions
│   ├── useGameLoop  # requestAnimationFrame loop
│   ├── useInput     # Keyboard/touch handling
│   └── useCollision # Collision detection
├── systems/         # Core game systems
│   ├── renderer/    # Canvas rendering
│   └── audio/       # Web Audio
├── data/            # Game data
│   └── environments/ # All 7 environment definitions
└── components/      # Vue components
    ├── screens/     # Full-screen views (TitleScreen)
    ├── game/        # Game canvas
    ├── ui/          # UI overlay components
    └── effects/     # Visual effects (CRT, Vignette)
```

## Key Files to Understand

1. `GameCanvas.vue` - Main game loop and rendering
2. `CanvasRenderer.ts` - Coordinates all rendering
3. `gameStore.ts` - Core game state
4. `useInput.ts` - All input handling
5. `types/environment.ts` - Environment structure

## Notes on Original Engine

The original `starter.html` is a ~1800 line single-file game engine. All functionality has been preserved in the migration except for:
- NPC spawning and AI
- Dialogue triggers
- Warp transitions
- Some custom render effects in environments

The original file is still available for reference at `/starter.html`.
