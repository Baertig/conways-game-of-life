import { isModelListener } from "@vue/shared";
import { chain, concat, map, range } from "lodash";
import { defineStore } from "pinia";
import {
  calculateNextBoard as calculateNextBoardState,
  countActiveCells,
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
    cellCountHistory: [] as number[],
  }),
  getters: {
    gameBoardSize: (state) => state.gameBoard.length,
    activeCells: (state) => countActiveCells(state.gameBoard),
  },
  actions: {
    calculateNextBoard() {
      const nonReactiveGameBoard = map(this.gameBoard, (row) => Uint8Array.of(...row));
      this.gameBoard = calculateNextBoardState(nonReactiveGameBoard);
      this.cellCountHistory = concat(this.cellCountHistory, countActiveCells(this.gameBoard));
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
      this.cellCountHistory = [];
    },

    toggleElement({ x, y }: { x: number; y: number }) {
      const oldValue = this.gameBoard[y][x];
      const rowCopy = Uint8Array.from(this.gameBoard[y]);
      rowCopy[x] = oldValue === 1 ? 0 : 1;
      this.gameBoard[y] = rowCopy;
    },

    toggleGameOfLifeRunning() {
      this.isGameOfLifeRunning = !this.isGameOfLifeRunning;

      if (this.isGameOfLifeRunning) {
        this.gameOfLifeRunningIntervalId = setInterval(this.calculateNextBoard, 200);
      } else if (this.gameOfLifeRunningIntervalId != null) {
        clearInterval(this.gameOfLifeRunningIntervalId);
      }
    },
  },
});
