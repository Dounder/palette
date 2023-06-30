<script setup lang="ts">
import { images } from '../helpers/images'

defineProps<{ index: number }>()
</script>

<template>
  <article class="card">
    <img :src="images[index - 1]" alt="Image" />
  </article>
</template>

<style src="../assets/shape.css" scoped></style>
