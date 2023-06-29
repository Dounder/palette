<script setup lang="ts">
import type { Shape } from '@/interfaces'

const convertToRem = (px: number, base = 16) => `${px / base}rem`

defineProps<Shape>()
</script>

<template>
  <article
    class="shape"
    :style="{
      width: convertToRem(width),
      height: convertToRem(height),
      backgroundColor: color,
      left: convertToRem(left),
      top: convertToRem(top)
    }"
  ></article>
</template>

<style scoped>
.shape {
  /* width: v-bind(width);
  height: v-bind(height);
  background-color: v-bind(color);
  left: v-bind(left);
  top: v-bind(top); */
  position: absolute;
  border-radius: 1rem;
  transition: all 0.2s ease-in-out;
}

.shape:hover {
  transform: scale(1.02);
  transition: all 0.2s ease-in-out;
}
</style>
