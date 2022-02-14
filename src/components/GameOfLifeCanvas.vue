<script setup lang="ts">
import { computed, onMounted, Ref, ref, watch, watchEffect } from 'vue';
import { useGameOfLife } from "../composables/gameOfLife"
import { drawGameOfLifeOnCanvas, calculateGameBoardToCanvasFaktor, clearCanvas } from '../composables/canvasDrawing';
import { useMousePositionOnCanvas } from '../composables/MouseUtil';

const props = defineProps<{
    size: number,
    isGameOfLifeRunning: boolean
    resetFlag: boolean,
    nextStepFlag: boolean
}>()


const canvas: Ref<null | HTMLCanvasElement> = ref(null)

const { gameBoard, calculateNextBoard, reset } = useGameOfLife(props.size);
const MousePosCanvas = useMousePositionOnCanvas(canvas);
const gameBoardToCanvasFaktor = computed(() => calculateGameBoardToCanvasFaktor(canvas.value, gameBoard.value))

const drawGameBoard = () => {
    clearCanvas(canvas.value);
    drawMousePos();
    drawGameOfLifeOnCanvas(canvas.value, gameBoard.value);
}



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

    window.requestAnimationFrame(drawGameBoard);
}

const nextStepAndDraw = () => {
    calculateNextBoard();
    window.requestAnimationFrame(drawGameBoard);
}

const resetAndDraw = () => {
    reset(props.size);
    window.requestAnimationFrame(drawGameBoard);
}

watchEffect(() => {
    props.size;
    props.resetFlag;
    resetAndDraw()
})
watch(() => props.nextStepFlag, (_, __) => {
    nextStepAndDraw();
})
let gameOfLifeRunningIntervalId: ReturnType<typeof setInterval>;
watch(() => props.isGameOfLifeRunning, (newisGameOfLifeRunning, _) => {
    if (newisGameOfLifeRunning) {
        gameOfLifeRunningIntervalId = setInterval(nextStepAndDraw, 500);
    } else {
        clearInterval(gameOfLifeRunningIntervalId)
    }
})

onMounted(() => window.requestAnimationFrame(drawGameBoard))
</script>

<template>
    <div class="flex flex-row justify-center">
        <canvas
            @click="toggleCell"
            @pointermove="drawGameBoard"
            ref="canvas"
            width="800"
            height="800"
            class="border border-black"
        ></canvas>
    </div>
</template>

