<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ShapeComponent } from './components'

const gallery = ref<HTMLElement | null>(null)

const onMouseMove = (e: MouseEvent) => {
  if (!gallery.value) return

  // Get mouse position
  const mouseX = e.clientX
  const mouseY = e.clientY

  // Get percentage of mouse position
  const xDecimal = mouseX / window.innerWidth
  const yDecimal = mouseY / window.innerHeight

  // Get max scroll amount
  const maxX = gallery.value!.offsetWidth - window.innerWidth
  const maxY = gallery.value!.offsetHeight - window.innerHeight + 200

  // Get scroll amount
  const panX = maxX * xDecimal * -1
  const panY = maxY * yDecimal * -1

  gallery.value!.animate(
    { transform: `translate(${panX}px, ${panY}px)` },
    { duration: 4000, fill: 'forwards', easing: 'ease' }
  )
}

onMounted(() => window.addEventListener('mousemove', onMouseMove))
onUnmounted(() => window.removeEventListener('mousemove', onMouseMove))
</script>

<template>
  <main class="container">
    <h1 class="title">Palette</h1>
    <section class="gallery" ref="gallery">
      <ShapeComponent v-for="index in 15" :key="index" :index="index" />
    </section>
    <span class="credits">All images from <a href="https://www.pexels.com/" target="_blank">Pexels</a></span>
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
  user-select: none;
}
.gallery {
  min-width: 140vmax;
  min-height: 150vmax;
  position: absolute;
}

.container {
  height: 100vh;
  margin: 0px;
  overflow: hidden;
}

.btn {
  width: 100px;
  height: 50px;
  position: fixed;
  top: 1rem;
  right: 1rem;
}

.credits {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.5);
  user-select: none;
}
</style>
