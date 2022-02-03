<script setup lang="ts">
import GameOfLifeVue from "./components/GameOfLife.vue";
</script>

<template>
  <h1>Conway Game of Life</h1>
  <GameOfLifeVue :size="20" />
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
