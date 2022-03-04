<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from "vue";
import { xAndYPositionFromTotalIndexAndSize } from "../composables/gameOfLife"
import { useGameOfLife } from "../store/gameOfLifeStore"

const gameOfLifeStore = useGameOfLife();


const cssGridRows = computed(() => ({
  "grid-template-columns": "repeat(" + gameOfLifeStore.gameBoard.length + ",min-content)"
}));

const toggleElement = (_: MouseEvent, index: number) => {
  const { x, y } = xAndYPositionFromTotalIndexAndSize(index, gameOfLifeStore.gameBoard.length);
  gameOfLifeStore.toggleElement({ x, y })
}


const grid_container = ref(null as HTMLElement | null);

//function to caluculate gap : so that the gap is inverse proportional to the number of grid Elements
//            1
//  --------------------- * 100
//  gameBoard.length + 15
const gridGap = computed(() => Math.floor((1 / (gameOfLifeStore.gameBoard.length + 15)) * 100))

const gridElementWidthAndHeight = computed(() => {
  if (grid_container.value == null) {
    console.log("grid_container is null")
    return {
      width: 0,
      height: 0
    }
  }
  const containerWidth = grid_container.value.offsetWidth
  const containerHeight = grid_container.value.offsetHeight
  const elementWidth = Math.floor(containerWidth / gameOfLifeStore.gameBoard[0].length) - gridGap.value
  const elementHeight = Math.floor(containerHeight / gameOfLifeStore.gameBoard.length) - gridGap.value
  const size = Math.min(elementHeight, elementWidth);

  return {
    width: size + "px",
    height: size + "px"
  }
})
</script>

<template>
  <div
    class="grid justify-center gap-4px auto-rows-fr w-full h-full"
    :style="{ ...cssGridRows, columnGap: gridGap + 'px', rowGap: gridGap + 'px' }"
    ref="grid_container"
  >
    <div
      v-for="(value, index) in gameOfLifeStore.gameBoard.flat()"
      key="index"
      :class="value === 1 ? 'bg-red-700' : 'bg-blue-700'"
      @click="toggleElement($event, index)"
      :style="gridElementWidthAndHeight"
    ></div>
  </div>
  <!-- so the windiCSS classes are already present -->
  <div class="bg-red-700"></div>
  <div class="bg-blue-700"></div>

  <!-- class="w-10 h-10 rounded-sm" -->
</template>