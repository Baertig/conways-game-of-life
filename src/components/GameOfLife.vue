<script setup lang="ts">
import { ref } from "vue";
import { createGameBoardArrayFromSize, xAndYPositionFromTotalIndexAndSize, useGameOfLife } from "../composables/gameOfLife"

const props = defineProps<{
  size: number
}>()
// const gameBoard = ref(createGameBoardArrayFromSize(10));
const { gameBoard, calculateNextBoard, reset } = useGameOfLife(props.size);
const cssGridRows = {
  "grid-template-columns": "repeat(" + gameBoard.value.length + ",min-content)"
}
//TODO
// make square red if is clicked
const toggleElement = (_: MouseEvent, index: number) => {
  const { x, y } = xAndYPositionFromTotalIndexAndSize(index, props.size);
  const oldValue = gameBoard.value[y][x]
  //can't set element in nested array like gameBoard.value[y][x] = 1:
  const row = [...gameBoard.value[y]]
  row[x] = oldValue === 1 ? 0 : 1
  gameBoard.value[y] = row;
}
</script>

<template>
  <div class="m-2">
    <button @click="calculateNextBoard" class="bg-gray-300 border-black m-2">next step</button>
    <button @click="() => reset()" class="bg-gray-300 border-black m-2">reset</button>
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