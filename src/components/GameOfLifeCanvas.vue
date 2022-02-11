<script setup lang="ts">
import { onMounted, Ref, ref, watch } from 'vue';
import { useGameOfLife } from "../composables/gameOfLife"

const props = defineProps<{
    size: number,
}>()

const canvas: Ref<null | HTMLCanvasElement> = ref(null)

const gameBoardToCanvasFaktor = 4;
const ArraySize = 200
const { gameBoard, calculateNextBoard, reset } = useGameOfLife(ArraySize);

const drawGameOfLife = () => {
    if (canvas.value === null) {
        console.warn("canvas was null");
        return
    }
    const ctx = canvas.value.getContext("2d");
    if (ctx === null) {
        console.warn("context was null >︿<")
        return
    }


    const canvasWidth = canvas.value.width;
    const canvasHeight = canvas.value.height;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    ctx.fillStyle = "black";
    ctx.beginPath();
    for (let y = 0; y < gameBoard.value.length; y++) {
        for (let x = 0; x < gameBoard.value[y].length; x++)
            if (gameBoard.value[y][x] === 1) {
                const canvasX = x * gameBoardToCanvasFaktor;
                const canvasY = y * gameBoardToCanvasFaktor;
                ctx.fillRect(canvasX, canvasY, gameBoardToCanvasFaktor, gameBoardToCanvasFaktor);
            }
    }
    ctx.stroke();
}


const toggleCell = (event: MouseEvent) => {
    const canvasPosition = {
        x: canvas.value?.getBoundingClientRect().x,
        y: canvas.value?.getBoundingClientRect().y
    }

    if (canvasPosition.x === undefined || canvasPosition.y === undefined) {
        console.warn("canvas Position was undefined");
        return
    }
    const MouseClickOnCanvas = {
        x: Math.round(event.clientX - canvasPosition.x),
        y: Math.round(event.clientY - canvasPosition.y)
    }
    if (MouseClickOnCanvas.x > ArraySize * gameBoardToCanvasFaktor || MouseClickOnCanvas.y > ArraySize * gameBoardToCanvasFaktor) {
        console.warn("MouseClick out of Canvas Coordinates");
        return
    }

    const arrayX = Math.floor(MouseClickOnCanvas.x / gameBoardToCanvasFaktor);
    const arrayY = Math.floor(MouseClickOnCanvas.y / gameBoardToCanvasFaktor);
    console.log("Mouse Click on ", MouseClickOnCanvas.x, MouseClickOnCanvas.y);

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
            ref="canvas"
            width="800"
            height="800"
            class="border border-black"
        ></canvas>
    </div>
</template>

