<script setup lang="ts">
import { computed, ref, WritableComputedRef } from "vue";
import GameOfLifeVue from "./components/GameOfLife.vue";

const gameBoardSize = ref(20);
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
  <h1 class="text-3xl">Conway Game of Life</h1>
  <div class="flex flex-row justify-center">
    <span class="mr-2">Board Size: {{ gameBoardSize }}x{{ gameBoardSize }}</span>
    <input type="range" min="5" max="100" v-model="gameBoardSizeInputHandle" />
  </div>
  <GameOfLifeVue :size="gameBoardSize" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
