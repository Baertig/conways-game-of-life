<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from "vue";
import { xAndYPositionFromTotalIndexAndSize, useGameOfLife } from "../composables/gameOfLife"

const props = defineProps<{
  size: number,
  isGameOfLifeRunning: boolean,
  resetFlag: boolean,
  nextStepFlag: boolean
}>()

const { gameBoard, calculateNextBoard, reset } = useGameOfLife(props.size);

watchEffect(() => {
  console.log("reset Standard")
  props.resetFlag
  reset(props.size);
})

watch(() => props.nextStepFlag, (_, __) => {
  console.log("next Step Standard")
  props.nextStepFlag
  calculateNextBoard()
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

let gameOfLifeRunningIntervalId: ReturnType<typeof setInterval>;
watchEffect(() => {
  if (props.isGameOfLifeRunning) {
    gameOfLifeRunningIntervalId = setInterval(calculateNextBoard, 500);
  } else {
    clearInterval(gameOfLifeRunningIntervalId)
  }

})
</script>

<template>
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