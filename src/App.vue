<script setup lang="ts">
import { computed, ref, WritableComputedRef } from "vue";
import { useGameOfLife } from "./store/gameOfLifeStore";
import ActiveCellsChart from "./components/ActiveCellsChart.vue";

const showChart = ref(false);
const gameOfLifeStore = useGameOfLife();
const gameBoardSizeInputHandle: WritableComputedRef<string> = computed({
  get() {
    return gameOfLifeStore.gameBoard.length.toString();
  },
  set(sizeInput: string) {
    return gameOfLifeStore.resizeGameBoard(parseInt(sizeInput));
  }
})
</script>

<template>
  <div v-if="showChart" class="fixed top-14 right-8">
    <ActiveCellsChart />
  </div>
  <div class="grid grid-cols-3 bg-blue-300 p-2">
    <div>
      <h1 class="text-3xl mr-2">Conway Game of Life</h1>
    </div>
    <div class="flex flex-row items-end justify-center">
      <router-link class="mr-2 self-end" to="/">Normal Game</router-link>
      <router-link class="self-end" to="/canvas">Canvas Game</router-link>
    </div>
    <div class="flex flex-row items-baseline justify-end">
      <span>active Cells {{ gameOfLifeStore.activeCells }}</span>
      <button
        class="p-1 m-1 bg-gray-300 rounded-md shadow-black"
        :class="showChart ? 'shadow-inner' : 'shadow'"
        @click="showChart = !showChart"
      >Chart</button>
    </div>
  </div>
  <div class="grid grid-rows-[min-content,min-content,1fr] h-9/10">
    <div class="flex flex-row justify-center items-baseline">
      <span
        class="mr-2"
      >Board Size: {{ gameOfLifeStore.gameBoardSize }}x{{ gameOfLifeStore.gameBoardSize }}</span>
      <div>
        <button
          class="m-1 w-5 h-5 text-lg rounded-full bg-red-400 shadow-md active:shadow-none align-middle"
          @click="gameOfLifeStore.resizeGameBoard(gameOfLifeStore.gameBoardSize - 1)"
        >
          <div class="relative bottom-1.4">-</div>
        </button>
      </div>
      <div>
        <input
          class="align-middle"
          type="range"
          min="5"
          max="100"
          v-model="gameBoardSizeInputHandle"
        />
      </div>
      <div>
        <button
          class="m-1 w-5 h-5 text-lg rounded-full bg-green-400 shadow-md active:shadow-none align-middle"
          @click="gameOfLifeStore.resizeGameBoard(gameOfLifeStore.gameBoardSize + 1)"
        >
          <div class="relative bottom-0.9 right-0.1">+</div>
        </button>
      </div>
    </div>
    <div class="flex flex-row justify-center">
      <button @click="gameOfLifeStore.calculateNextBoard" class="btn">next step</button>
      <button @click="gameOfLifeStore.resetGameBoard" class="btn">reset</button>
      <button @click="gameOfLifeStore.toggleGameOfLifeRunning" class="btn">
        <svg height="20" width="20" viewBox="0 0 10 10">
          <polygon
            v-if="gameOfLifeStore.isGameOfLifeRunning"
            points="0,0 0,10 4,10 4,0"
            style="fill:gray"
          />
          <polygon
            v-if="gameOfLifeStore.isGameOfLifeRunning"
            points="6,0 6,10 10,10 10,0"
            style="fill:gray"
          />
          <polygon v-else points="0,0 0,10 10,5" style="fill:gray" />
        </svg>
      </button>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.router-link-active {
  text-decoration: underline;
}
html,
body {
  height: 100%;
}
</style>
