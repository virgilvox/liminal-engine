# LIMINAL_ENGINE Vue 3 - Handoff Document

## Overview

This project is a complete rewrite of the original `starter.html` single-file 2D game engine into a modular Vue 3 application. It maintains the same pixel art aesthetic, lo-fi audio, and gameplay mechanics while providing a clean, expandable architecture.

## Tech Stack

- **Vue 3** - Composition API with `<script setup>`
- **TypeScript** - Strict type checking
- **Pinia** - State management
- **Vite** - Build tool and dev server
- **Canvas 2D API** - Pixel art rendering
- **Web Audio API** - Procedural lo-fi music and SFX

## Project Structure

```
vue-app/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── main.css          # Global styles
│   │       ├── variables.css     # CSS custom properties (colors, fonts)
│   │       └── animations.css    # Keyframe animations
│   │
│   ├── components/
│   │   ├── effects/
│   │   │   ├── CRTOverlay.vue    # Scanline effect
│   │   │   ├── Vignette.vue      # Corner darkening
│   │   │   └── TransitionOverlay.vue  # Fade transitions
│   │   │
│   │   ├── game/
│   │   │   └── GameCanvas.vue    # Main game loop and rendering
│   │   │
│   │   ├── screens/
│   │   │   └── TitleScreen.vue   # Start screen
│   │   │
│   │   └── ui/
│   │       ├── LocationBar.vue   # Current zone display
│   │       ├── StatsPanel.vue    # Gold/HP display
│   │       ├── InventoryBar.vue  # Item slots (hidden on mobile)
│   │       ├── InteractionPrompt.vue  # "[E] NPC_NAME" prompt
│   │       ├── DialogueBox.vue   # NPC dialogue with choices
│   │       ├── PauseMenu.vue     # ESC menu
│   │       └── MobileControls.vue # Touch joystick + action button
│   │
│   ├── composables/
│   │   ├── useGameLoop.ts        # requestAnimationFrame loop
│   │   ├── useInput.ts           # Keyboard + touch input (singleton)
│   │   └── useCollision.ts       # AABB collision detection
│   │
│   ├── config/
│   │   ├── defaults.ts           # Game config, stats, inventory defaults
│   │   ├── theme.ts              # Color themes
│   │   └── index.ts              # Exports
│   │
│   ├── data/
│   │   ├── environments/
│   │   │   ├── hub.ts            # Central hub area
│   │   │   ├── forest.ts         # Dark forest
│   │   │   ├── cave.ts           # Crystal cave
│   │   │   ├── shop.ts           # Item shop
│   │   │   └── index.ts          # Environment registry
│   │   │
│   │   └── npcs/
│   │       ├── templates.ts      # NPC definitions (ghost_girl, merchant, etc.)
│   │       └── index.ts          # Exports
│   │
│   ├── stores/
│   │   ├── gameStore.ts          # Core game state, warps, camera
│   │   ├── playerStore.ts        # Player position, animation, appearance
│   │   ├── dialogueStore.ts      # Dialogue state, typewriter effect
│   │   ├── inventoryStore.ts     # Items, slots
│   │   ├── npcStore.ts           # Active NPCs, memory
│   │   ├── uiStore.ts            # UI visibility, notifications
│   │   └── index.ts              # Exports all stores
│   │
│   ├── systems/
│   │   ├── audio/
│   │   │   ├── AudioEngine.ts    # Main audio controller
│   │   │   ├── MusicGenerator.ts # Procedural lo-fi music
│   │   │   ├── SFXGenerator.ts   # Sound effects
│   │   │   └── index.ts          # Singleton export
│   │   │
│   │   └── renderer/
│   │       ├── CanvasRenderer.ts # Main renderer
│   │       ├── CharacterRenderer.ts # Player/NPC sprites
│   │       ├── FurnitureRenderer.ts # Environment objects
│   │       ├── FloorRenderer.ts  # Floor patterns
│   │       └── index.ts          # Exports
│   │
│   ├── types/
│   │   ├── game.ts               # Core game types
│   │   ├── environment.ts        # Environment, zones, warps
│   │   ├── entities.ts           # Player, NPC types
│   │   ├── ui.ts                 # UI types
│   │   ├── rendering.ts          # Renderer types
│   │   └── index.ts              # Exports all types
│   │
│   ├── App.vue                   # Root component
│   └── main.ts                   # Entry point
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── HANDOFF.md                    # This file
```

## Key Systems

### Game Loop (GameCanvas.vue)

The main game loop runs at 60fps via `useGameLoop`:
1. Update game time
2. Handle movement input
3. Handle interactions (E key)
4. Handle inventory selection (1-5 keys)
5. Check warp zones
6. Update zone display
7. Update NPC animations
8. Check for nearby NPCs
9. Update player animation
10. Update camera
11. Render frame

### Input System (useInput.ts)

Singleton pattern ensures shared state between components:
- **Keyboard**: WASD/Arrows for movement, E/Space for interact, 1-5 for inventory, ESC for pause
- **Touch**: Joystick for movement, ACT button for interact

### Dialogue System

1. Player approaches NPC → `InteractionPrompt` shows "[E] NPC_NAME"
2. Player presses E → `dialogueStore.startDialogue()` called
3. `DialogueBox` shows with typewriter effect
4. Choices appear when line has `choices` array
5. Effects (memory updates, NPC leaving) processed on advance
6. Dialogue ends → NPC memory persisted in `npcStore`

### Warp System

1. Player enters warp zone → `triggerWarp()` called
2. `TransitionOverlay` fades to black
3. `gameStore.completeWarp()` loads new environment
4. Player position set to target coordinates
5. Fade in completes

### Rendering Pipeline

1. Clear canvas
2. Draw floor pattern (wood, grass, stone, cave)
3. Draw walls
4. Draw furniture (sorted by Y for depth)
5. Draw NPCs (sorted by Y)
6. Draw player
7. Apply camera offset

## Adding New Content

### New Environment

1. Create `src/data/environments/myenv.ts`:
```typescript
import type { Environment } from '@/types'

export const myenv: Environment = {
  id: 'myenv',
  name: 'MY ENVIRONMENT',
  width: 500,
  height: 400,
  floor: { type: 'stone', color: '#2a2a2a' },
  walls: [...],
  colliders: [...],
  zones: [...],
  furniture: [...],
  interactables: [...],
  warps: [...],
  npcSpawns: [...],
}
```

2. Add to `src/data/environments/index.ts`:
```typescript
import { myenv } from './myenv'
export const environments: Record<string, Environment> = {
  // ...existing
  myenv,
}
```

### New NPC Template

Add to `src/data/npcs/templates.ts`:
```typescript
export const npcTemplates: Record<string, NPCTemplate> = {
  // ...existing
  my_npc: {
    id: 'my_npc',
    name: 'NPC NAME',
    portrait: '🎭',
    pitch: 1.0,
    appearance: {
      skin: '#e5c0b0',
      shirt: '#446655',
      hair: '#332211',
    },
    getDialogue(mem: NPCMemory): DialogueTree {
      return {
        start: [
          { text: "Hello there!" },
          { text: "*waves*", leave: true },
        ],
      }
    },
  },
}
```

### New Furniture Type

Add to `src/systems/renderer/FurnitureRenderer.ts` in the `draw()` method switch statement.

## Controls

| Input | Desktop | Mobile |
|-------|---------|--------|
| Move | WASD / Arrows | Joystick |
| Interact | E / Space | ACT button |
| Inventory | 1-5 keys | Hidden |
| Pause | ESC | - |
| Dialogue advance | E / Space / Enter | ACT button |
| Dialogue choices | W/S / Arrows | - |

## Known Limitations

- No save/load system (yet)
- No quest system (yet)
- Inventory is hidden on mobile (no touch selection)
- No settings menu (volume, etc.)

## Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Type check
npm run type-check

# Preview production build
npm run preview
```

## Architecture Decisions

1. **Pinia over Vuex** - Simpler API, better TypeScript support
2. **Composition API** - Better code organization and reusability
3. **Canvas over DOM** - Better performance for pixel art, easier sprite manipulation
4. **Singleton input** - Ensures joystick and keyboard share state
5. **Procedural audio** - No external audio files needed, consistent lo-fi aesthetic

## Files Changed in Latest Session

- `DialogueBox.vue` - Fixed dialogue not ending with E/Space
- `useInput.ts` - Refactored to singleton for mobile support
- `InventoryBar.vue` - Hidden on mobile devices
- `MobileControls.vue` - Created touch controls
- `InteractionPrompt.vue` - Created NPC interaction prompt
- `PauseMenu.vue` - Created pause menu

---

*Generated for LIMINAL_ENGINE Vue 3 port*
