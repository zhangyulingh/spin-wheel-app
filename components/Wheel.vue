<template>
  <div class="wheel-container1">
    <canvas ref="wheelCanvas"></canvas>
    <el-button type="primary" @click="spin">开始旋转</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import pjImage from '/images/pj.png'
const audio = new Audio('/sounds/spin.mp3') // 直接加载音频

const wheelCanvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let angle = ref(0)
const canvasSize = ref(0)
const arrowImage = new Image()
const textSize = ref(0.09) // 适当缩小文字大小

// 新的奖项数据
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

// 可调整的箭头图片宽高
const arrowWidthRatio = 0.2
const arrowHeightRatio = 0.7

// 更新画布尺寸
const updateCanvasSize = () => {
  if (!wheelCanvas.value) return
  const size = Math.min(window.innerWidth, window.innerHeight) * 0.93
  canvasSize.value = size
  wheelCanvas.value.width = size
  wheelCanvas.value.height = size
  drawWheel()
}

// 计算当前指向的扇形索引
const getPointedIndex = () => {
  const arc = (Math.PI * 2) / prizes.length
  let adjustedAngle =
    ((angle.value % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) // 确保是正数
  return Math.floor(adjustedAngle / arc) % prizes.length // 直接用 `Math.floor`
}

// 绘制转盘
const drawWheel = () => {
  if (!ctx || !wheelCanvas.value) return
  const canvasCtx = ctx as CanvasRenderingContext2D
  const arc = (Math.PI * 2) / prizes.length
  const center = canvasSize.value / 2
  const radius = canvasSize.value * 0.3

  canvasCtx.clearRect(0, 0, canvasSize.value, canvasSize.value)

  const pointedIndex = getPointedIndex()
  const correctedIndex = (pointedIndex + prizes.length / 2) % prizes.length

  prizes.forEach((prize, i) => {
    canvasCtx.beginPath()
    canvasCtx.moveTo(center, center)
    canvasCtx.arc(center, center, radius, arc * i, arc * (i + 1))
    // 创建渐变色（从扇形中心到外圈）
    const gradient = canvasCtx.createLinearGradient(
      center + Math.cos(arc * i + arc / 2) * radius,
      center + Math.sin(arc * i + arc / 2) * radius,
      center - Math.cos(arc * i + arc / 2) * radius,
      center - Math.sin(arc * i + arc / 2) * radius,
    )
    gradient.addColorStop(0, i === correctedIndex ? '#ffcc00' : prize.color) // 起点亮一点
    gradient.addColorStop(
      1,
      i === correctedIndex ? '#ffff99' : prize.highlightColor,
    ) // 终点暗一点

    canvasCtx.fillStyle = gradient
    canvasCtx.fill()
    canvasCtx.closePath()
    // 添加边框线
    canvasCtx.strokeStyle = '#d2a800' // 白色边框
    canvasCtx.lineWidth = 2
    canvasCtx.stroke()
  })

  // 确保文字绘制在最上层
  prizes.forEach((prize, i) => {
    canvasCtx.save()
    canvasCtx.translate(center, center)
    canvasCtx.rotate(arc * i + arc / 2 - Math.PI / 2)
    canvasCtx.fillStyle = '#000' // 黑色文字
    canvasCtx.font = `${radius * textSize.value}px sans-serif`
    canvasCtx.textAlign = 'center'
    canvasCtx.textBaseline = 'middle'
    const textOffset = radius * 0.8
    canvasCtx.translate(0, -textOffset)
    canvasCtx.fillText(prize.name, 0, 0)
    canvasCtx.restore()
  })

  // 绘制箭头
  if (arrowImage.complete) {
    const arrowWidth = radius * arrowWidthRatio
    const arrowHeight = radius * arrowHeightRatio
    canvasCtx.save()
    canvasCtx.translate(center, center)
    canvasCtx.rotate(angle.value - Math.PI / 0.295) // 让箭头朝上
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
  const arc = (Math.PI * 2) / prizes.length

  // 随机目标扇形
  const targetIndex = Math.floor(Math.random() * prizes.length)
  const targetAngle = arc * targetIndex // 目标扇形角度
  const totalRounds = Math.floor(Math.random() * 5) + 15 // 3-5圈随机

  let totalRotation = totalRounds * Math.PI * 2 + targetAngle - angle.value // 总角度
  let currentRotation = 0
  let speed = 1.5 // 初始速度
  let lastPlayedIndex = -1 // 记录上次播放音效的扇形索引

  const spinInterval = setInterval(() => {
    const progress = currentRotation / totalRotation // 旋转进度 0 - 1
    speed = Math.max(0.02, 1.5 * (1 - progress)) // 速度逐渐减小，最低 0.2 防止停得太快
    currentRotation += speed
    angle.value += speed

    drawWheel()

    // 计算当前指向的扇形索引
    const currentIndex = getPointedIndex()

    // 播放音效
    if (currentIndex !== lastPlayedIndex) {
      audio.currentTime = 0
      audio.play().catch(err => console.warn('音频播放失败:', err))
      lastPlayedIndex = currentIndex
    }

    // 停止判断
    if (currentRotation >= totalRotation) {
      clearInterval(spinInterval)
      angle.value = targetAngle // **确保最终角度精准**
      drawWheel()
      setTimeout(() => showResult(targetIndex), 300)
    }
  }, 16) // 每 16ms 更新一次
}

// 显示结果
const showResult = (index: number) => {
  alert(`恭喜你获得：${prizes[index].name}`)
}

onMounted(() => {
  if (wheelCanvas.value) {
    ctx = wheelCanvas.value.getContext('2d')
    arrowImage.src = pjImage
    arrowImage.onload = () => {
      updateCanvasSize()
    }
    window.addEventListener('resize', updateCanvasSize)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateCanvasSize)
})
</script>

<style scoped>
.wheel-container1 {
  background: url('/images/zp.png') no-repeat center/contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

button {
  width: 500px;
  height: 60px;
  background: linear-gradient(90deg, #5e00ca, #4ecdc4);
  font-size: 36px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  color: white;
}
button:hover {
  opacity: 0.9;
}
</style>
