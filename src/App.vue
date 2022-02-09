<script setup lang="ts">
import { computed, ref, WritableComputedRef } from "vue";

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
  <div class="flex flex-row justify-center bg-blue-300 p-2">
    <h1 class="text-3xl mr-2">Conway Game of Life</h1>
    <router-link class="mr-2 self-end" to="/">Normal Game</router-link>
    <router-link class="self-end" to="/canvas">Canvas Game</router-link>
  </div>
  <div class="flex flex-row justify-center">
    <span class="mr-2">Board Size: {{ gameBoardSize }}x{{ gameBoardSize }}</span>
    <input type="range" min="5" max="100" v-model="gameBoardSizeInputHandle" />
  </div>
  <router-view :size="gameBoardSize"></router-view>
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
