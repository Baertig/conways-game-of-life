import { isModelListener } from "@vue/shared";
import { defineStore } from "pinia";
import {
  calculateNextBoard as calculateNextBoardState,
  createEmptyGameBoardArrayFromSize,
} from "../composables/gameOfLife";
const INIT_GAME_BOARD_SIZE = 20;

export const useGameOfLife = defineStore("Game of Life", {
  state: () => ({
    gameBoard: createEmptyGameBoardArrayFromSize(INIT_GAME_BOARD_SIZE),
    isGameOfLifeRunning: false,
    gameOfLifeRunningIntervalId: null as null | ReturnType<typeof setInterval>,
  }),
  getters: {
    gameBoardSize: (state) => state.gameBoard.length,
  },
  actions: {
    calculateNextBoard() {
      this.gameBoard = calculateNextBoardState(this.gameBoard);
    },
    //TODO change so that the current Borad State is not mutated
    resizeGameBoard(size: number) {
      this.gameBoard = createEmptyGameBoardArrayFromSize(size);
    },

    resetGameBoard() {
      this.gameBoard = createEmptyGameBoardArrayFromSize(this.gameBoardSize);
    },

    toggleElement({ x, y }: { x: number; y: number }) {
      const oldValue = this.gameBoard[y][x];
      const rowCopy = [...this.gameBoard[y]];
      rowCopy[x] = oldValue === 1 ? 0 : 1;
      this.gameBoard[y] = rowCopy;
    },

    toggleGameOfLifeRunning() {
      this.isGameOfLifeRunning = !this.isGameOfLifeRunning;

      if (this.isGameOfLifeRunning) {
        this.gameOfLifeRunningIntervalId = setInterval(this.calculateNextBoard, 500);
      } else if (this.gameOfLifeRunningIntervalId != null) {
        clearInterval(this.gameOfLifeRunningIntervalId);
      }
    },
  },
});
