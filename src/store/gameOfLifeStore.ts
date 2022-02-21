import { defineStore } from "pinia";
import {
  calculateNextBoard as calculateNextBoardState,
  createGameBoardArrayFromSize,
} from "../composables/gameOfLife";

export const useGameOfLife = defineStore("Game of Life", () => {
  let gameBoardSize = 20;
  let gameBoard: number[][] = createGameBoardArrayFromSize(gameBoardSize);
  let isGameOfLifeRunnig = false;
  const calculateNextBoard = () => {
    gameBoard = calculateNextBoardState(gameBoard);
  };
  //TODO change so that the current State is not mutated
  const resizeGameBoard = (size: number) => {
    gameBoardSize = size;
    gameBoard = createGameBoardArrayFromSize(gameBoardSize);
  };

  return {
    gameBoard,
    isGameOfLifeRunnig,
    calculateNextBoard,
    resizeGameBoard,
  };
});
