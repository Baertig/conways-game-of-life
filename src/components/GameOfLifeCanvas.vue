<script setup lang="ts">
import { computed, onMounted, Ref, ref, watch, watchEffect } from 'vue';
import { useGameOfLife } from "../composables/gameOfLife"
import { drawGameOfLifeOnCanvas, calculateGameBoardToCanvasFaktor } from '../composables/canvasDrawing';
import { useMousePositionOnCanvas } from '../composables/MouseUtil';

const props = defineProps<{
    size: number,
}>()

const canvas: Ref<null | HTMLCanvasElement> = ref(null)

const { gameBoard, calculateNextBoard, reset } = useGameOfLife(props.size);
const MousePosCanvas = useMousePositionOnCanvas(canvas);
const gameBoardToCanvasFaktor = computed(() => calculateGameBoardToCanvasFaktor(canvas.value, gameBoard.value))

const drawGameOfLife = () => {
    drawGameOfLifeOnCanvas(canvas.value, gameBoard.value);
}

watchEffect(() => {
    reset(props.size)
})

const drawMousePos = () => {
    if (MousePosCanvas.x.value < 0 || MousePosCanvas.y.value < 0) {
        return
    }
    if (canvas.value == null) {
        return;
    }
    const ctx = canvas.value.getContext("2d");
    if (ctx == null) {
        return;
    }
    drawGameOfLife();
    ctx.fillStyle = "rgba(255,0,0,0.5)";
    ctx.beginPath()
    const xpos = MousePosCanvas.x.value - (MousePosCanvas.x.value % gameBoardToCanvasFaktor.value.horizontal);
    const ypos = MousePosCanvas.y.value - (MousePosCanvas.y.value % gameBoardToCanvasFaktor.value.vertical);
    ctx.fillRect(xpos, ypos, gameBoardToCanvasFaktor.value.horizontal, gameBoardToCanvasFaktor.value.vertical);
    ctx.stroke()

}

const toggleCell = (event: MouseEvent) => {
    if (MousePosCanvas.x.value < 0 || MousePosCanvas.y.value < 0) {
        return;
    }

    const arrayX = Math.floor(MousePosCanvas.x.value / gameBoardToCanvasFaktor.value.horizontal);
    const arrayY = Math.floor(MousePosCanvas.y.value / gameBoardToCanvasFaktor.value.vertical);
    console.log("Mouse Click on ", MousePosCanvas.x.value, MousePosCanvas.y.value);

    const oldValue = gameBoard.value[arrayY][arrayX];
    console.log("old Value", oldValue);
    const row = [...gameBoard.value[arrayY]]
    row[arrayX] = oldValue === 1 ? 0 : 1;
    gameBoard.value[arrayY] = row

    window.requestAnimationFrame(drawGameOfLife);
}

const nextStepAndDraw = () => {
    calculateNextBoard();
    window.requestAnimationFrame(drawGameOfLife);
}

const resetAndDraw = () => {
    reset();
    window.requestAnimationFrame(drawGameOfLife);
}

const gameOfLifeIsRunning = ref(false);
let gameOfLifeRunningIntervalId: ReturnType<typeof setInterval>;
watch(gameOfLifeIsRunning, (newGameOfLifeIsRunning, oldvalue) => {
    if (newGameOfLifeIsRunning) {
        gameOfLifeRunningIntervalId = setInterval(nextStepAndDraw, 500);
    } else {
        clearInterval(gameOfLifeRunningIntervalId)
    }
})

onMounted(() => window.requestAnimationFrame(drawGameOfLife))
</script>

<template>
    <div class="flex flex-row justify-center">
        <button @click="nextStepAndDraw" class="btn">next Step</button>
        <button @click="resetAndDraw" class="btn">reset</button>
        <button @click="gameOfLifeIsRunning = !gameOfLifeIsRunning" class="btn">
            {{
                gameOfLifeIsRunning ? "Stop" : "Play"
            }}
        </button>
    </div>
    <div class="flex flex-row justify-center">
        <canvas
            @click="toggleCell"
            @pointermove="drawMousePos"
            ref="canvas"
            width="800"
            height="800"
            class="border border-black"
        ></canvas>
    </div>
</template>

