<script setup lang="ts">
import { computed, onMounted, Ref, ref, watch, watchEffect } from 'vue';
import { useGameOfLife } from "../store/gameOfLifeStore"
import { drawGameOfLifeOnCanvas, calculateGameBoardToCanvasFaktor, clearCanvas } from '../composables/canvasDrawing';
import { useMousePositionOnCanvas } from '../composables/MouseUtil';



const canvas: Ref<null | HTMLCanvasElement> = ref(null)

const gameOfLifeStore = useGameOfLife();
const MousePosCanvas = useMousePositionOnCanvas(canvas);
const gameBoardToCanvasFaktor = computed(() => calculateGameBoardToCanvasFaktor(canvas.value, gameOfLifeStore.gameBoard))

const drawGameBoard = () => {
    clearCanvas(canvas.value);
    drawMousePos();
    drawGameOfLifeOnCanvas(canvas.value, gameOfLifeStore.gameBoard);
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

    gameOfLifeStore.toggleElement({ x: arrayX, y: arrayY })
    window.requestAnimationFrame(drawGameBoard);
}

gameOfLifeStore.$onAction(({ name, after }) => {
    if (name == 'calculateNextBoard' || name == 'resetGameBoard' || name == 'resizeGameBoard' || name == 'toggleElement') {
        after(() => window.requestAnimationFrame(drawGameBoard))
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

