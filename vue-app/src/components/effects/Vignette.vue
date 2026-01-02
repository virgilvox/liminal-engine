<script setup lang="ts">
// Vignette effect overlay
</script>

<template>
  <div class="vignette" />
</template>

<style scoped>
.vignette {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
  background: radial-gradient(
    ellipse at center,
    transparent 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
}
</style>
