<script setup lang="ts">
import { computed, ref, WritableComputedRef } from "vue";


const gameBoardSize = ref(20);
const isGameOfLifeRunning = ref(false);
const resetFlag = ref(false);
const nextStepFlag = ref(false);
const gameBoardSizeInputHandle: WritableComputedRef<string> = computed({
  get() {
    return gameBoardSize.value.toString()
  },
  set(sizeInput: string) {
    return gameBoardSize.value = parseInt(sizeInput)
  }
})
</script>

<template>
  <div class="grid grid-cols-3 bg-blue-300 p-2">
    <div>
      <h1 class="text-3xl mr-2">Conway Game of Life</h1>
    </div>
    <div class="flex flex-row items-end justify-center">
      <router-link class="mr-2 self-end" to="/">Normal Game</router-link>
      <router-link class="self-end" to="/canvas">Canvas Game</router-link>
    </div>
  </div>
  <div class="flex flex-row justify-center">
    <span class="mr-2">Board Size: {{ gameBoardSize }}x{{ gameBoardSize }}</span>
    <input type="range" min="5" max="100" v-model="gameBoardSizeInputHandle" />
  </div>
  <div class="flex flex row justify-center">
    <button @click="nextStepFlag = !nextStepFlag" class="btn">next step</button>
    <button @click="resetFlag = !resetFlag" class="btn">reset</button>
    <button @click="isGameOfLifeRunning = !isGameOfLifeRunning" class="btn">
      <svg height="20" width="20" viewBox="0 0 10 10">
        <polygon v-if="isGameOfLifeRunning" points="0,0 0,10 4,10 4,0" style="fill:gray" />
        <polygon v-if="isGameOfLifeRunning" points="6,0 6,10 10,10 10,0" style="fill:gray" />
        <polygon v-else points="0,0 0,10 10,5" style="fill:gray" />
      </svg>
    </button>
  </div>
  <router-view
    :size="gameBoardSize"
    :isGameOfLifeRunning="isGameOfLifeRunning"
    :nextStepFlag="nextStepFlag"
    :resetFlag="resetFlag"
    ref="gameOfLifeComponent"
  ></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.router-link-active {
  text-decoration: underline;
}
</style>
