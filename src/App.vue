<script setup lang="ts">
import {ref} from "vue"
import GameOfLifeVue from "./components/GameOfLife.vue";
const count = ref(0)
</script>

<template>
  <div>Hey</div>
  <GameOfLifeVue :size="10"/>
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
