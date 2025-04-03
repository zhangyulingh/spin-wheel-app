<template>
  <div class="wheel-container1">
    <canvas ref="wheelCanvas" class="wheel-canvas"></canvas>
    <el-button type="primary" @click="spin" class="spin-button"
      >开始旋转</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const audio = new Audio('/sounds/spin.mp3')
const wheelCanvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let angle = ref(0)
const canvasSize = ref(0)
const arrowImage = new Image()
const textSize = ref(0.09)

const prizes = [
  { name: '标题1', color: 'white', highlightColor: '#fff' },
  { name: '标题2', color: 'white', highlightColor: '#fff' },
  { name: '标题3', color: 'white', highlightColor: '#fff' },
  { name: '标题4', color: 'white', highlightColor: '#fff' },
  { name: '标题5', color: 'white', highlightColor: '#fff' },
  { name: '标题6', color: 'white', highlightColor: '#fff' },
  { name: '标题7', color: 'white', highlightColor: '#fff' },
  { name: '标题8', color: 'white', highlightColor: '#fff' },
  { name: '标题9', color: 'white', highlightColor: '#fff' },
  { name: '标题10', color: 'white', highlightColor: '#fff' },
]

const arrowWidthRatio = 0.2
const arrowHeightRatio = 0.7

const updateCanvasSize = () => {
  if (!wheelCanvas.value || !wheelCanvas.value.parentElement) return

  const container = wheelCanvas.value.parentElement
  const bgImg = new Image()
  bgImg.src = '/images/zp.png'

  bgImg.onload = () => {
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight
    const bgRatio = bgImg.width / bgImg.height
    const containerRatio = containerWidth / containerHeight

    let bgRenderWidth, bgRenderHeight

    if (containerRatio > bgRatio) {
      bgRenderHeight = containerHeight
      bgRenderWidth = bgRenderHeight * bgRatio
    } else {
      bgRenderWidth = containerWidth
      bgRenderHeight = bgRenderWidth / bgRatio
    }

    wheelCanvas.value!.width = bgRenderWidth
    wheelCanvas.value!.height = bgRenderHeight
    canvasSize.value = Math.min(bgRenderWidth, bgRenderHeight)

    drawWheel()
  }
}

const getPointedIndex = () => {
  const arc = (Math.PI * 2) / prizes.length
  let adjustedAngle =
    ((angle.value % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
  return Math.floor(adjustedAngle / arc) % prizes.length
}

const drawWheel = () => {
  if (!ctx || !wheelCanvas.value) return

  const canvasCtx = ctx
  const arc = (Math.PI * 2) / prizes.length
  const centerX = wheelCanvas.value.width / 2.03
  const centerY = wheelCanvas.value.height / 2.11
  const radius = canvasSize.value * 0.32

  canvasCtx.clearRect(0, 0, wheelCanvas.value.width, wheelCanvas.value.height)

  const pointedIndex = getPointedIndex()
  const correctedIndex = (pointedIndex + prizes.length / 2) % prizes.length

  prizes.forEach((prize, i) => {
    canvasCtx.beginPath()
    canvasCtx.moveTo(centerX, centerY)
    canvasCtx.arc(centerX, centerY, radius, arc * i, arc * (i + 1))

    const gradient = canvasCtx.createLinearGradient(
      centerX + Math.cos(arc * i + arc / 2) * radius,
      centerY + Math.sin(arc * i + arc / 2) * radius,
      centerX - Math.cos(arc * i + arc / 2) * radius,
      centerY - Math.sin(arc * i + arc / 2) * radius,
    )
    gradient.addColorStop(0, i === correctedIndex ? '#ffcc00' : prize.color)
    gradient.addColorStop(
      1,
      i === correctedIndex ? '#ffff99' : prize.highlightColor,
    )

    canvasCtx.fillStyle = gradient
    canvasCtx.fill()
    canvasCtx.closePath()

    canvasCtx.strokeStyle = '#d2a800'
    canvasCtx.lineWidth = 2
    canvasCtx.stroke()
  })

  prizes.forEach((prize, i) => {
    canvasCtx.save()
    canvasCtx.translate(centerX, centerY)
    canvasCtx.rotate(arc * i + arc / 2 - Math.PI / 2)
    canvasCtx.fillStyle = '#000'
    canvasCtx.font = `${radius * textSize.value}px sans-serif`
    canvasCtx.textAlign = 'center'
    canvasCtx.textBaseline = 'middle'
    const textOffset = radius * 0.8
    canvasCtx.translate(0, -textOffset)
    canvasCtx.fillText(prize.name, 0, 0)
    canvasCtx.restore()
  })

  if (arrowImage.complete) {
    const arrowWidth = radius * arrowWidthRatio
    const arrowHeight = radius * arrowHeightRatio
    canvasCtx.save()
    canvasCtx.translate(centerX, centerY)
    canvasCtx.rotate(angle.value - Math.PI / 0.295)
    canvasCtx.drawImage(
      arrowImage,
      -arrowWidth / 2,
      -arrowHeight / 2,
      arrowWidth,
      arrowHeight,
    )
    canvasCtx.restore()
  }
}

const spin = () => {
  if (!wheelCanvas.value) return

  const arc = (Math.PI * 2) / prizes.length
  const targetIndex = Math.floor(Math.random() * prizes.length)
  const targetAngle = arc * targetIndex
  const totalRounds = Math.floor(Math.random() * 5) + 15

  let totalRotation = totalRounds * Math.PI * 2 + targetAngle - angle.value
  let currentRotation = 0
  let speed = 1.5
  let lastPlayedIndex = -1

  const spinInterval = setInterval(() => {
    const progress = currentRotation / totalRotation
    speed = Math.max(0.02, 1.5 * (1 - progress))
    currentRotation += speed
    angle.value += speed

    drawWheel()

    const currentIndex = getPointedIndex()
    if (currentIndex !== lastPlayedIndex) {
      audio.currentTime = 0
      audio.play().catch(err => console.warn('音频播放失败:', err))
      lastPlayedIndex = currentIndex
    }

    if (currentRotation >= totalRotation) {
      clearInterval(spinInterval)
      angle.value = targetAngle
      drawWheel()
      setTimeout(() => showResult(targetIndex), 300)
    }
  }, 16)
}

const showResult = (index: number) => {
  alert(`恭喜你获得：${prizes[index].name}`)
}

onMounted(() => {
  if (wheelCanvas.value) {
    ctx = wheelCanvas.value.getContext('2d')
    arrowImage.src = '/images/pj.png'
    arrowImage.onload = () => updateCanvasSize()

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize()
    })

    if (wheelCanvas.value.parentElement) {
      resizeObserver.observe(wheelCanvas.value.parentElement)
    }

    onUnmounted(() => {
      resizeObserver.disconnect()
    })
  }
})
</script>

<style scoped>
.wheel-container1 {
  background: url('/images/zp.png') no-repeat center/contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.wheel-canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.spin-button {
  width: 100px;
  height: 100px;
  background: linear-gradient(90deg, #5e00ca, #4ecdc4);
  font-size: 18px;
  font-weight: 700;
  border-radius: 100px;
  margin: 50px 0;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 10;
}

.spin-button:hover {
  opacity: 0.9;
}
</style>
