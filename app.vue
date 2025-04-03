<template>
  <div class="wheel-container" @mousemove="handleMouseMove">
    <div
      class="w-3/5 parallax-img"
      :style="{
        transform: `translate(${offsetX}px, ${offsetY}px)`,
      }"
    >
      <img
        src="/images/pjtest.png"
        alt="Project Test"
        class="w-240 h-full object-cover md:w-480px xl:w-720px 2xl:w-1200px"
      />
    </div>

    <!-- 右侧转盘 -->
    <div class="w-2/5"><Wheel /></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Wheel from './components/Wheel.vue'

const offsetX = ref(0)
const offsetY = ref(0)

const handleMouseMove = (event: MouseEvent) => {
  const { clientX, clientY } = event
  const { innerWidth, innerHeight } = window // Get window dimensions here

  const x = (clientX / innerWidth) * 2 - 1 // -1 到 1
  const y = (clientY / innerHeight) * 2 - 1

  offsetX.value = x * 40 // 控制前景偏移
  offsetY.value = y * 40
}
</script>

<style scoped>
.wheel-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url('/images/wheel_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  transition: background-position 0.2s ease-out;
}

/* 让背景微微偏移，形成远景效果 */
.wheel-container:hover {
  background-position: calc(50% + v-bind(offsetX / 15 + 'px'))
    calc(50% + v-bind(offsetY / 15 + 'px'));
}

/* 让前景图片移动更快 */
.parallax-img {
  transition: transform 0.15s ease-out;
}
</style>
