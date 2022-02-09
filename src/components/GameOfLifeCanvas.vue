<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { drawGrid } from "../composables/canvasDrawing";

//TODO draw Game Of Life on Canvas -> Merge Cells dynamically (SVG Path Morphing)
const props = defineProps<{
    size: number,
}>()
const canvas: Ref<null | HTMLCanvasElement> = ref(null)
const startTime = new Date();
const drawGameOfLife = () => {
    if (canvas.value === null) {
        console.warn("canvas was null");
        return
    }
    const ctx = canvas.value.getContext("2d");
    if (ctx === null) {
        console.warn("context was null ＞︿＜")
        return
    }

    const canvasWidth = canvas.value.width;
    const canvasHeight = canvas.value.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    drawGrid(canvas.value, canvasWidth / 20, canvasHeight / 20);
}

onMounted(() => window.requestAnimationFrame(drawGameOfLife))


</script>

<template>
    <div class="flex flex-row justify-center">
        <canvas ref="canvas" width="800" height="800" class="border border-black"></canvas>
    </div>
</template>

