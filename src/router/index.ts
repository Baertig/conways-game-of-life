import { createRouter, createWebHashHistory } from "vue-router";
import GameOfLife from "../components/GameOfLife.vue";
import GameOfLifeCanvas from "../components/GameOfLifeCanvas.vue";
import GameOfLifeSVG from "../components/GameOfLifeSVG.vue";

const routes = [
  { path: "/", component: GameOfLife },
  { path: "/canvas", component: GameOfLifeCanvas },
  { path: "/svg", component: GameOfLifeSVG },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
