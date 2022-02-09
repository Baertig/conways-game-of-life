import { createRouter, createWebHashHistory } from "vue-router";
import GameOfLife from "../components/GameOfLife.vue";
import GameOfLifeCanvas from "../components/GameOfLifeCanvas.vue";

const routes = [
  { path: "/", component: GameOfLife },
  { path: "/canvas", component: GameOfLifeCanvas },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
