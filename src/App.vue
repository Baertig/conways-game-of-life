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
  <h1>Conway Game of Life</h1>
  <div>
    <span class="mr-2">Size</span>
    <input type="range" min="5" max="100" v-model="gameBoardSizeInputHandle" />
    <span class="ml-2">{{ gameBoardSize }}</span>
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
  margin-top: 60px;
}
</style>
