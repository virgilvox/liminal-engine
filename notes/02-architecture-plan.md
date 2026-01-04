# LIMINAL_ENGINE Vue 3 Architecture Plan

## Date: 2026-01-02
## Status: Planning Phase

---

## Executive Summary

Converting the single-file LIMINAL_ENGINE into a modular, extensible Vue 3 application. The architecture prioritizes:

1. **Separation of Concerns** - Clear boundaries between rendering, game logic, data, and UI
2. **Extensibility** - Easy to add new environments, NPCs, furniture, dialogue
3. **Type Safety** - Full TypeScript coverage
4. **Performance** - Efficient canvas rendering with Vue reactivity where appropriate
5. **Developer Experience** - Hot module replacement, clear file structure

---

## Directory Structure

```
liminal-engine/
├── notes/                          # Project documentation
│   ├── 01-initial-analysis.md
│   ├── 02-architecture-plan.md
│   ├── 03-implementation-log.md
│   └── 04-handoff-notes.md
├── src/
│   ├── main.ts                     # App entry point
│   ├── App.vue                     # Root component
│   │
│   ├── types/                      # TypeScript definitions
│   │   ├── index.ts                # Barrel export
│   │   ├── game.ts                 # Core game types
│   │   ├── entities.ts             # Player, NPC types
│   │   ├── environment.ts          # Environment, Zone, Warp types
│   │   ├── dialogue.ts             # Dialogue, Choice types
│   │   ├── rendering.ts            # Renderer types
│   │   ├── audio.ts                # Audio system types
│   │   └── ui.ts                   # UI state types
│   │
│   ├── config/                     # Game configuration
│   │   ├── index.ts                # Main config export
│   │   ├── defaults.ts             # Default game settings
│   │   └── theme.ts                # Color palette, CSS vars
│   │
│   ├── stores/                     # Pinia stores
│   │   ├── index.ts                # Store exports
│   │   ├── gameStore.ts            # Core game state
│   │   ├── playerStore.ts          # Player state
│   │   ├── npcStore.ts             # NPC state & memory
│   │   ├── dialogueStore.ts        # Dialogue state machine
│   │   ├── inventoryStore.ts       # Inventory management
│   │   ├── questStore.ts           # Quest tracking
│   │   ├── audioStore.ts           # Audio preferences
│   │   └── uiStore.ts              # UI visibility states
│   │
│   ├── composables/                # Vue composition utilities
│   │   ├── useGameLoop.ts          # requestAnimationFrame loop
│   │   ├── useInput.ts             # Keyboard + touch handling
│   │   ├── useCamera.ts            # Camera following logic
│   │   ├── useCollision.ts         # AABB collision detection
│   │   ├── useInteraction.ts       # Proximity-based interactions
│   │   ├── useTypewriter.ts        # Text typewriter effect
│   │   └── useNotification.ts      # Toast notification helper
│   │
│   ├── systems/                    # Core game systems
│   │   ├── audio/
│   │   │   ├── index.ts            # Audio system export
│   │   │   ├── AudioEngine.ts      # Web Audio context manager
│   │   │   ├── MusicGenerator.ts   # Procedural beat/music
│   │   │   └── SoundEffects.ts     # SFX library
│   │   │
│   │   ├── renderer/
│   │   │   ├── index.ts            # Renderer exports
│   │   │   ├── CanvasRenderer.ts   # Main canvas manager
│   │   │   ├── CharacterRenderer.ts # Player/NPC drawing
│   │   │   ├── FurnitureRenderer.ts # Furniture drawing
│   │   │   ├── FloorRenderer.ts    # Floor patterns
│   │   │   ├── WallRenderer.ts     # Wall rendering
│   │   │   ├── EffectsRenderer.ts  # Warp points, glows
│   │   │   └── utils.ts            # Color/drawing utilities
│   │   │
│   │   └── physics/
│   │       ├── index.ts
│   │       └── CollisionSystem.ts  # AABB collision
│   │
│   ├── entities/                   # Entity definitions
│   │   ├── Player.ts               # Player class
│   │   ├── NPC.ts                  # Base NPC class
│   │   └── Entity.ts               # Base entity class
│   │
│   ├── data/                       # Game data definitions
│   │   ├── environments/           # Environment configs
│   │   │   ├── index.ts            # Environment registry
│   │   │   ├── hub.ts
│   │   │   ├── diner.ts
│   │   │   ├── forest.ts
│   │   │   ├── alley.ts
│   │   │   ├── cave.ts
│   │   │   ├── shop.ts
│   │   │   └── showcase.ts
│   │   │
│   │   ├── npcs/                   # NPC templates
│   │   │   ├── index.ts            # NPC registry
│   │   │   ├── ghostGirl.ts
│   │   │   ├── merchant.ts
│   │   │   ├── demon.ts
│   │   │   └── robot.ts
│   │   │
│   │   ├── furniture/              # Furniture definitions
│   │   │   ├── index.ts            # Furniture registry
│   │   │   ├── seating.ts          # Chairs, stools, benches
│   │   │   ├── tables.ts           # Tables, counters
│   │   │   ├── storage.ts          # Chests, barrels, shelves
│   │   │   ├── decorative.ts       # Plants, statues, rugs
│   │   │   ├── lighting.ts         # Lamps, torches
│   │   │   ├── tech.ts             # Computers, TVs, jukeboxes
│   │   │   └── nature.ts           # Trees, rocks, bushes
│   │   │
│   │   ├── floors.ts               # Floor type definitions
│   │   ├── quests.ts               # Quest definitions
│   │   └── items.ts                # Inventory items
│   │
│   ├── components/
│   │   ├── game/                   # Game-specific components
│   │   │   ├── GameContainer.vue   # Main game wrapper
│   │   │   ├── GameCanvas.vue      # Canvas element + renderer
│   │   │   └── GameWorld.vue       # Active game area
│   │   │
│   │   ├── screens/                # Full-screen overlays
│   │   │   ├── TitleScreen.vue     # Start screen
│   │   │   └── TransitionOverlay.vue
│   │   │
│   │   ├── ui/                     # HUD components
│   │   │   ├── LocationBar.vue
│   │   │   ├── EnvironmentBar.vue
│   │   │   ├── QuestTracker.vue
│   │   │   ├── StatsPanel.vue
│   │   │   ├── InventoryBar.vue
│   │   │   ├── InteractPrompt.vue
│   │   │   ├── DialogueBox.vue
│   │   │   ├── NotificationToast.vue
│   │   │   └── AudioToggle.vue
│   │   │
│   │   ├── controls/               # Input components
│   │   │   ├── MobileControls.vue
│   │   │   ├── Joystick.vue
│   │   │   └── ActionButton.vue
│   │   │
│   │   └── effects/                # Visual effects
│   │       ├── CRTOverlay.vue
│   │       └── Vignette.vue
│   │
│   ├── assets/
│   │   └── styles/
│   │       ├── main.css            # Global styles
│   │       ├── variables.css       # CSS custom properties
│   │       ├── animations.css      # Keyframe animations
│   │       ├── typography.css      # Font imports
│   │       └── effects.css         # CRT, neon effects
│   │
│   └── utils/
│       ├── colors.ts               # Color manipulation
│       ├── math.ts                 # Math helpers
│       └── helpers.ts              # General utilities
│
├── public/
│   └── fonts/                      # Self-hosted fonts (optional)
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Key Technical Decisions

### 1. State Management: Pinia

**Why Pinia over Vuex:**
- Native TypeScript support
- Simpler API, less boilerplate
- Better DevTools integration
- Modular by design

**Store Responsibilities:**

| Store | Responsibility |
|-------|---------------|
| `gameStore` | Game loop state, current environment, time |
| `playerStore` | Position, movement, appearance |
| `npcStore` | NPC instances, memory, dialogue state |
| `dialogueStore` | Active dialogue, choices, typewriter state |
| `inventoryStore` | Items, selected slot |
| `questStore` | Active/completed quests |
| `audioStore` | Mute state, volume levels |
| `uiStore` | Visibility of UI elements |

### 2. Rendering: Canvas API (not PixiJS)

**Why keep Canvas API:**
- Original code is well-optimized
- No external dependency needed
- Pixel-perfect control for retro aesthetic
- Smaller bundle size

**Renderer Architecture:**
```typescript
class CanvasRenderer {
  private ctx: CanvasRenderingContext2D
  private characterRenderer: CharacterRenderer
  private furnitureRenderer: FurnitureRenderer
  private floorRenderer: FloorRenderer

  render(state: GameState, time: number) {
    this.clear()
    this.floorRenderer.draw(state.environment)
    this.renderWalls(state.environment.walls)
    this.renderFurniture(state.environment.furniture, time)
    this.renderEntities(state.entities, time)
    this.renderEffects(state.environment.warps, time)
  }
}
```

### 3. Audio: Custom Web Audio (Tone.js optional)

**Keep custom implementation because:**
- Original procedural music system works well
- No additional dependency
- Full control over sound design
- Smaller bundle

**Structure:**
```typescript
class AudioEngine {
  private ctx: AudioContext
  private masterGain: GainNode
  private musicGain: GainNode
  private sfxGain: GainNode
  private musicGenerator: MusicGenerator

  playStep(): void
  playBlip(): void
  playGood(): void
  // ... etc
}
```

### 4. Game Loop: requestAnimationFrame + Composition API

```typescript
// composables/useGameLoop.ts
export function useGameLoop(onUpdate: (dt: number) => void) {
  const running = ref(false)
  let lastTime = 0

  function loop(time: number) {
    if (!running.value) return
    const dt = time - lastTime
    lastTime = time
    onUpdate(dt)
    requestAnimationFrame(loop)
  }

  function start() {
    running.value = true
    lastTime = performance.now()
    requestAnimationFrame(loop)
  }

  function stop() {
    running.value = false
  }

  return { running, start, stop }
}
```

### 5. Input Handling: Unified Keyboard + Touch

```typescript
// composables/useInput.ts
export function useInput() {
  const direction = ref({ x: 0, y: 0 })
  const actions = reactive({
    interact: false,
    inventory: [false, false, false, false, false]
  })

  // Keyboard handlers
  // Touch/joystick handlers
  // Unified direction output

  return { direction, actions }
}
```

---

## Component Architecture

### GameContainer.vue (Root Game Component)

```vue
<template>
  <div class="game-container">
    <TitleScreen v-if="!gameStore.started" @start="startGame" />

    <template v-else>
      <GameCanvas />

      <div class="ui-overlay">
        <LocationBar />
        <EnvironmentBar />
        <QuestTracker />
        <StatsPanel />
        <InventoryBar />
        <InteractPrompt />
        <DialogueBox />
        <MobileControls />
        <AudioToggle />
        <NotificationToast />
      </div>

      <TransitionOverlay />
    </template>

    <CRTOverlay />
    <Vignette />
  </div>
</template>
```

### GameCanvas.vue

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useGameLoop } from '@/composables/useGameLoop'
import { CanvasRenderer } from '@/systems/renderer'
import { useGameStore } from '@/stores/gameStore'

const canvas = ref<HTMLCanvasElement>()
const renderer = ref<CanvasRenderer>()
const gameStore = useGameStore()

const { start, stop } = useGameLoop((dt) => {
  gameStore.update(dt)
  renderer.value?.render(gameStore.state, gameStore.time)
})

onMounted(() => {
  if (canvas.value) {
    renderer.value = new CanvasRenderer(canvas.value)
    start()
  }
})

onUnmounted(() => {
  stop()
})
</script>

<template>
  <canvas ref="canvas" class="game-canvas" />
</template>
```

---

## Data Layer Design

### Environment Definition

```typescript
// types/environment.ts
export interface Environment {
  id: string
  name: string
  width: number
  height: number
  floor: FloorConfig
  walls: Wall[]
  colliders: Collider[]
  zones: Zone[]
  furniture: FurniturePlacement[]
  interactables: Interactable[]
  warps: Warp[]
  customRender?: (ctx: CanvasRenderingContext2D, time: number) => void
  onEnter?: () => void
  onExit?: () => void
}

// data/environments/hub.ts
export const hub: Environment = {
  id: 'hub',
  name: 'THE HUB',
  width: 600,
  height: 500,
  floor: { type: 'checker', color1: '#252020', color2: '#201a1a', tileSize: 16 },
  walls: [
    { x: 0, y: 0, w: 270, h: 30, color: '#1a1418' },
    // ...
  ],
  // ...
}
```

### NPC Template

```typescript
// types/entities.ts
export interface NPCTemplate {
  id: string
  name: string
  portrait: string
  pitch: number
  appearance: CharacterAppearance
  getDialogue: (memory: NPCMemory, quests: QuestState, items: string[]) => DialogueTree
}

// data/npcs/ghostGirl.ts
export const ghostGirl: NPCTemplate = {
  id: 'ghost_girl',
  name: 'MAYA',
  portrait: '👻',
  pitch: 1.4,
  appearance: {
    skin: '#d0d0e0',
    shirt: '#446688',
    hair: '#1a1a2a',
    translucent: true
  },
  getDialogue(mem, quests, items) {
    if (!mem.visited) {
      return {
        start: [
          { text: "*looks up* ...You can see me?" },
          // ...
        ]
      }
    }
    return { start: [{ text: "*nods* Thank you for seeing me." }] }
  }
}
```

---

## CSS Architecture

### variables.css

```css
:root {
  /* Paper/Ink */
  --color-paper: #f0e6d3;
  --color-ink: #1a1a1a;

  /* Neon palette */
  --neon-primary: #ff2a6d;
  --neon-secondary: #05d9e8;
  --neon-tertiary: #f9f002;
  --neon-accent: #d300c5;

  /* UI backgrounds */
  --ui-bg: rgba(10, 10, 15, 0.9);
  --ui-bg-light: rgba(10, 10, 15, 0.7);

  /* Typography */
  --font-terminal: 'VT323', monospace;
  --font-pixel: 'Press Start 2P', monospace;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;

  /* Transitions */
  --transition-fast: 0.15s;
  --transition-normal: 0.3s;
}
```

---

## Extension Points

### Adding a New Environment

1. Create `src/data/environments/myEnv.ts`
2. Define Environment object with all required properties
3. Add to registry in `src/data/environments/index.ts`
4. Add NPC spawning logic to gameStore

### Adding a New NPC Type

1. Create `src/data/npcs/myNpc.ts`
2. Define NPCTemplate with getDialogue function
3. Add to registry in `src/data/npcs/index.ts`
4. Add spawn location in environment

### Adding New Furniture

1. Add type to `FurnitureType` enum
2. Add render function in appropriate furniture file
3. Add collider bounds if needed

### Adding New Character Features

1. Add property to `CharacterAppearance` type
2. Handle in `CharacterRenderer.drawCharacter()`

---

## Build & Development

### package.json (key dependencies)

```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "pinia": "^2.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "@vueuse/core": "^10.7.0"
  }
}
```

---

## Implementation Phases

### Phase 1: Foundation (Priority: Critical)
- [ ] Vite + Vue 3 + TypeScript + Pinia setup
- [ ] CSS architecture (variables, animations, effects)
- [ ] Type definitions
- [ ] Base component structure

### Phase 2: Rendering System
- [ ] CanvasRenderer class
- [ ] FloorRenderer (all floor types)
- [ ] WallRenderer
- [ ] FurnitureRenderer (all 40+ types)
- [ ] CharacterRenderer (all variants)
- [ ] EffectsRenderer (warps, glows)

### Phase 3: Game Engine
- [ ] Game loop composable
- [ ] Input handling (keyboard + touch)
- [ ] Collision system
- [ ] Camera following
- [ ] Player movement

### Phase 4: Entity Systems
- [ ] Player entity
- [ ] NPC entity
- [ ] Environment loading
- [ ] Zone detection
- [ ] Warp system

### Phase 5: Interaction Systems
- [ ] Proximity detection
- [ ] Interact prompt
- [ ] Dialogue state machine
- [ ] Typewriter effect
- [ ] Choice handling
- [ ] Effect application

### Phase 6: UI Components
- [ ] TitleScreen
- [ ] LocationBar
- [ ] EnvironmentBar
- [ ] QuestTracker
- [ ] StatsPanel
- [ ] InventoryBar
- [ ] DialogueBox
- [ ] MobileControls
- [ ] NotificationToast

### Phase 7: Audio System
- [ ] AudioEngine class
- [ ] MusicGenerator (procedural)
- [ ] SoundEffects library
- [ ] Audio store integration

### Phase 8: Data Migration
- [ ] All environments
- [ ] All NPCs
- [ ] All furniture definitions
- [ ] Quest data

### Phase 9: Polish
- [ ] CRT overlay effect
- [ ] Vignette effect
- [ ] Transition animations
- [ ] Mobile responsiveness
- [ ] Performance optimization

---

## Notes for Future Development

1. **Extensibility**: The furniture/NPC/environment systems are designed as registries that can be dynamically extended
2. **Theming**: CSS variables allow easy theme switching
3. **Save/Load**: Store architecture supports serialization for save games
4. **Multiplayer Ready**: Entity/state separation allows for network sync potential
5. **Plugin System**: Could add hook points for modding

---

## Open Questions

1. Should we add a scene graph for z-ordering optimization?
2. Consider WebGL renderer as optional upgrade path?
3. Add debug overlay for development?
4. Implement save/load system now or later?
