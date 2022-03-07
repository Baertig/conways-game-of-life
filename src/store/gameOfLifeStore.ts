import { isModelListener } from "@vue/shared";
import { chain, range } from "lodash";
import { defineStore } from "pinia";
import {
  addColToGameBoard,
  addRowToGameBoard,
  calculateNextBoard as calculateNextBoardState,
  createEmptyGameBoardArrayFromSize,
  growGameboard,
  shrinkGameBoard,
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
      const sizeDifference = this.gameBoard.length - size;
      const boardIsTooSmall = sizeDifference < 0;
      const boardIsTooBig = sizeDifference > 0;
      if (boardIsTooSmall) {
        this.gameBoard = growGameboard(this.gameBoard, size);
      } else if (boardIsTooBig) {
        this.gameBoard = shrinkGameBoard(this.gameBoard, size);
      }
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
