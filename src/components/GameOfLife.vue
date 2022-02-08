<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from "vue";
import { xAndYPositionFromTotalIndexAndSize, useGameOfLife } from "../composables/gameOfLife"

const props = defineProps<{
  size: number,
}>()

const { gameBoard, calculateNextBoard, reset } = useGameOfLife(props.size);

watchEffect(() => {
  reset(props.size);
})

const cssGridRows = computed(() => ({
  "grid-template-columns": "repeat(" + gameBoard.value.length + ",min-content)"
}));

const toggleElement = (_: MouseEvent, index: number) => {
  const { x, y } = xAndYPositionFromTotalIndexAndSize(index, props.size);
  const oldValue = gameBoard.value[y][x]
  //can't set element in nested array like gameBoard.value[y][x] = 1:
  const row = [...gameBoard.value[y]]
  row[x] = oldValue === 1 ? 0 : 1
  gameBoard.value[y] = row;
}

const gameOfLifeIsRunning = ref(false);
let gameOfLifeRunningIntervalId: ReturnType<typeof setInterval>;
watch(gameOfLifeIsRunning, (newGameOfLifeIsRunning, oldvalue) => {
  if (newGameOfLifeIsRunning) {
    gameOfLifeRunningIntervalId = setInterval(calculateNextBoard, 500);
  } else {
    clearInterval(gameOfLifeRunningIntervalId)
  }
})
</script>

<template>
  <div class="m-2 flex flex-row justify-center">
    <button @click="calculateNextBoard" class="btn">next step</button>
    <button @click="() => reset(props.size)" class="btn">reset</button>
    <button @click="gameOfLifeIsRunning = !gameOfLifeIsRunning" class="btn">
      <svg height="20" width="20" viewBox="0 0 10 10">
        <polygon v-if="gameOfLifeIsRunning" points="0,0 0,10 4,10 4,0" style="fill:gray" />
        <polygon v-if="gameOfLifeIsRunning" points="6,0 6,10 10,10 10,0" style="fill:gray" />

        <polygon v-else points="0,0 0,10 10,5" style="fill:gray" />
      </svg>
    </button>
  </div>
  <div class="grid justify-center gap-1 auto-rows-fr" :style="cssGridRows">
    <div
      v-for="(value, index) in gameBoard.flat()"
      key="index"
      class="w-10 h-10 rounded-sm"
      :class="value === 1 ? 'bg-red-700' : 'bg-blue-700'"
      @click="toggleElement($event, index)"
    ></div>
  </div>
  <!-- so the windiCSS classes are already present -->
  <div class="bg-red-700"></div>
  <div class="bg-blue-700"></div>
</template>