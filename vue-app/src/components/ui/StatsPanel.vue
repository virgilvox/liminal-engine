<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores'

const playerStore = usePlayerStore()

const statEntries = computed(() => Object.entries(playerStore.stats))
</script>

<template>
  <div class="stats-panel">
    <template v-for="[key, stat] in statEntries" :key="key">
      <div class="stat-row">
        <span class="stat-label">{{ stat.label }}</span>
        <span class="stat-value" :style="{ color: stat.color || 'var(--neon-secondary)' }">
          {{ stat.icon || '' }}{{ stat.value }}
        </span>
      </div>
      <div v-if="stat.bar && stat.max" class="stat-bar">
        <div
          class="stat-bar-fill"
          :class="stat.barClass || 'primary'"
          :style="{ width: `${(stat.value / stat.max) * 100}%` }"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.stats-panel {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: var(--ui-bg);
  border: 2px solid var(--neon-accent);
  padding: 0.5rem 0.7rem;
  font-size: clamp(0.7rem, 1.8vw, 0.85rem);
  min-width: 100px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 0.15rem 0;
}

.stat-label {
  color: var(--neon-accent);
}

.stat-value {
  color: var(--neon-secondary);
}

.stat-bar {
  width: 100%;
  height: 6px;
  background: #222;
  margin-top: 3px;
  border: 1px solid #333;
}

.stat-bar-fill {
  height: 100%;
  transition: width 0.3s;
}

.stat-bar-fill.primary {
  background: linear-gradient(90deg, var(--neon-accent), var(--neon-primary));
}

.stat-bar-fill.secondary {
  background: linear-gradient(90deg, var(--neon-secondary), var(--neon-tertiary));
}
</style>
