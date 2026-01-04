# LIMINAL_ENGINE Initial Analysis

## Date: 2026-01-02
## Status: Analysis Phase

---

## Overview

The starter.html is a complete single-file 2D game engine (~1800 lines) with the following core systems:

### 1. Core Systems Identified

#### Configuration System
- Centralized CONFIG object for game settings
- Player customization (speed, skin, shirt, hair colors)
- Stats system (gold, HP with bars)
- Inventory with 5 slots
- Audio settings (BPM, volume levels)

#### Audio System
- Web Audio API based
- Procedural music generation (drums, bass, pads, bells)
- Sound effects (step, blip, good, bad, warp, door, talk, quest)
- Beat-synced music system
- Mute toggle support

#### Renderer System
- Canvas-based 2D rendering
- Pixel art character drawing with variants:
  - Normal, small, short, translucent, mechanical
  - Horns, halo, ears, beard, tusks, crown, wings, tail
  - Blob, rocky, bones, glowing states
- 40+ furniture types with animations
- Floor types: checker, grass, stone, wood, sand, cave
- Wall and collision rendering
- Warp point visualization

#### Environment System
- Multiple environments (hub, diner, forest, alley, cave, shop, showcase)
- Each environment has:
  - Dimensions, floor type, walls, colliders
  - Zones (for location display)
  - Furniture placements
  - Interactables
  - Warp points
  - Custom render functions

#### NPC System
- Template-based NPC definitions
- Dynamic dialogue with branching
- Memory system per NPC
- Visual variants per character type
- Portrait and pitch for dialogue

#### Dialogue System
- Typewriter text effect
- Choice-based branching
- Effects system (stat changes, memory updates)
- Leave/fade mechanics for NPCs

#### Game Engine Core
- Game loop with update/render
- Player movement (WASD + Arrow keys)
- Collision detection (AABB)
- Camera following
- Zone detection
- Interaction checking
- Warp system with transitions

#### UI System
- Title screen
- Location bar
- Environment bar
- Quest tracker
- Stats panel
- Inventory bar
- Interact prompt
- Dialogue box with choices
- Mobile joystick controls
- Action button
- Audio toggle
- Notifications
- CRT overlay + vignette effects

---

## Art Style Characteristics

### Colors (CSS Variables)
- `--paper`: #f0e6d3 (light cream)
- `--ink`: #1a1a1a (near black)
- `--neon-primary`: #ff2a6d (hot pink)
- `--neon-secondary`: #05d9e8 (cyan)
- `--neon-tertiary`: #f9f002 (yellow)
- `--neon-accent`: #d300c5 (magenta)
- `--ui-bg`: rgba(10,10,15,0.9) (dark semi-transparent)

### Visual Effects
- CRT scanlines overlay
- Vignette effect
- Neon glow animations
- Blink animation
- Float animation
- Flicker animation

### Typography
- VT323 (monospace terminal font)
- Press Start 2P (pixel art font)

---

## Vue 3 Migration Strategy

### Proposed Architecture

```
src/
├── assets/
│   ├── styles/
│   │   ├── variables.css      # CSS custom properties
│   │   ├── animations.css     # Keyframe animations
│   │   ├── typography.css     # Font imports & styles
│   │   └── effects.css        # CRT, vignette, neon
│   └── fonts/
├── composables/
│   ├── useAudio.ts           # Audio system
│   ├── useGame.ts            # Core game loop
│   ├── useInput.ts           # Keyboard/touch input
│   ├── usePlayer.ts          # Player state & movement
│   ├── useCamera.ts          # Camera following
│   ├── useCollision.ts       # Collision detection
│   ├── useDialogue.ts        # Dialogue state machine
│   ├── useInventory.ts       # Inventory management
│   ├── useStats.ts           # Stats/resources
│   ├── useQuests.ts          # Quest tracking
│   ├── useNotifications.ts   # Toast notifications
│   └── useEnvironment.ts     # Environment loading
├── stores/                    # Pinia stores
│   ├── game.ts               # Global game state
│   ├── player.ts             # Player state
│   ├── npcs.ts               # NPC state & memory
│   └── ui.ts                 # UI state
├── systems/
│   ├── audio/
│   │   ├── AudioEngine.ts    # Web Audio wrapper
│   │   ├── MusicGenerator.ts # Procedural music
│   │   └── SoundEffects.ts   # SFX library
│   ├── renderer/
│   │   ├── CanvasRenderer.ts # Main renderer
│   │   ├── CharacterRenderer.ts
│   │   ├── FurnitureRenderer.ts
│   │   ├── FloorRenderer.ts
│   │   └── EffectsRenderer.ts
│   ├── entities/
│   │   ├── Entity.ts         # Base entity
│   │   ├── Player.ts
│   │   └── NPC.ts
│   └── physics/
│       └── CollisionSystem.ts
├── data/
│   ├── environments/          # Environment definitions
│   │   ├── hub.ts
│   │   ├── diner.ts
│   │   └── ...
│   ├── npcs/                  # NPC templates
│   │   ├── ghostGirl.ts
│   │   ├── merchant.ts
│   │   └── ...
│   ├── furniture.ts          # Furniture registry
│   └── config.ts             # Game configuration
├── components/
│   ├── game/
│   │   ├── GameCanvas.vue    # Canvas wrapper
│   │   └── GameWorld.vue     # Game container
│   ├── ui/
│   │   ├── TitleScreen.vue
│   │   ├── LocationBar.vue
│   │   ├── EnvironmentBar.vue
│   │   ├── QuestTracker.vue
│   │   ├── StatsPanel.vue
│   │   ├── InventoryBar.vue
│   │   ├── InteractPrompt.vue
│   │   ├── DialogueBox.vue
│   │   ├── MobileControls.vue
│   │   ├── AudioToggle.vue
│   │   └── NotificationToast.vue
│   └── effects/
│       ├── CRTOverlay.vue
│       ├── Vignette.vue
│       └── TransitionOverlay.vue
├── types/
│   ├── game.ts
│   ├── entities.ts
│   ├── environments.ts
│   ├── dialogue.ts
│   └── ui.ts
├── utils/
│   ├── colors.ts             # Color utilities
│   ├── math.ts               # Math helpers
│   └── rendering.ts          # Canvas utilities
├── App.vue
└── main.ts
```

---

## Key Libraries to Consider

### Core
- Vue 3 with Composition API
- TypeScript
- Pinia (state management)
- Vite (build tool)

### Canvas/Rendering
- Consider: Custom canvas system (current approach is solid)
- Or: PixiJS for more advanced needs

### Audio
- Tone.js (optional - for more sophisticated audio)
- Or: Keep custom Web Audio implementation

### Animation
- @vueuse/motion (for UI animations)
- GSAP (if more complex animations needed)

### Utilities
- @vueuse/core (composition utilities)
- lodash-es (if needed)

---

## Migration Priority

1. **Phase 1**: Core structure setup
   - Vite + Vue 3 + TypeScript + Pinia
   - CSS/styling system
   - Type definitions

2. **Phase 2**: Rendering system
   - Canvas renderer
   - Character/furniture rendering
   - Floor/wall rendering

3. **Phase 3**: Game engine core
   - Game loop
   - Input handling
   - Collision detection
   - Camera system

4. **Phase 4**: Entity systems
   - Player
   - NPCs
   - Environment loading

5. **Phase 5**: UI components
   - All overlay UI
   - Dialogue system
   - Mobile controls

6. **Phase 6**: Audio system
   - Music generator
   - Sound effects

7. **Phase 7**: Polish
   - Effects (CRT, vignette)
   - Transitions
   - Testing

---

## Notes

- The original engine is well-structured for a single file
- Good separation between rendering, game logic, and data
- Modular furniture and character systems
- Environment-based zone system is clean

## Awaiting

- Additional sample files from user for comparison
