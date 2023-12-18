const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const rowCount = matrix.length;
  const clmCount = matrix[0].length;

  const result = Array.from(Array(rowCount), () => Array(clmCount).fill(0));

  for (let row = 0; row < rowCount; row++) {
    for (let clm = 0; clm < clmCount; clm++) {
      calcNeighbours(row, clm);
    }
  }

  function calcNeighbours(row, clm) {
    const firstRow = row - 1 < 0 ? row : row - 1;
    const lastRow = row + 1 >= rowCount ? row : row + 1;
    const firstClm = clm - 1 < 0 ? clm : clm - 1;
    const lastClm = clm + 1 >= clmCount ? clm : clm + 1;

    if (matrix[row][clm]) {
      for (let i = firstRow; i <= lastRow; i++) {
        for (let j = firstClm; j <= lastClm; j++) {
          if (!(i === row && j === clm)) {
            result[i][j] += 1;
          }
        }
      }
    }
  }

  return result;
}

module.exports = {
  minesweeper,
};
