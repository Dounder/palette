<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useShape from './composables/useShape'
import { ShapeComponent } from './components'

const { shapes, changePosition } = useShape()

const title = ref<HTMLElement>()
const container = ref<HTMLElement>()
const loading = ref(false)

const loadShapes = () => {
  if (!title.value || !container.value) return

  loading.value = true

  changePosition(container.value, title.value, 15)

  loading.value = false
}

onMounted(() => {
  loadShapes()

  window.addEventListener('keyup', (e: KeyboardEvent) => {
    if (e.key === 'Enter') loadShapes()
  })
})
</script>

<template v-if="!loading">
  <h1 class="title" ref="title">Palette</h1>
  <main class="container" ref="container">
    <ShapeComponent
      v-for="({ left, top, width, height, color }, index) in shapes"
      :key="index"
      :left="left"
      :top="top"
      :width="width"
      :height="height"
      :color="color"
    />
  </main>
</template>

<style scoped>
.title {
  color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  font-size: 5rem;
}
.container {
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.btn {
  width: 100px;
  height: 50px;
  position: fixed;
  top: 1rem;
  right: 1rem;
}
</style>
