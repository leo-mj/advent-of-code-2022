import { bigForest } from "./day8-data";

/**
 * Day 8, Part 1 of Advent of Code 2022
 * @param forest string of tree heighs - string
 * @returns number of visible trees - number
 */
export function countVisibleTrees(forest: string): number {
  const forestGrid: number[][] = forest
    .split("\n")
    .map((forestRow) =>
      forestRow.split("").map((treeString) => parseInt(treeString)),
    );
  const visibilities: Visibilities = {};
  countFromSides(forestGrid, visibilities);
  countFromTopBottom(forestGrid, visibilities);
  return countVisibilities(visibilities);
}

function countFromSides(grid: number[][], visibilities: Visibilities): void {
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    updateVisibilitiesSide(row, i, visibilities);
  }
  return;
}

function countFromTopBottom(
  grid: number[][],
  visibilities: Visibilities,
): void {
  for (let i = 0; i < grid[0].length; i++) {
    const currentTreeString: number[] = [];
    for (const row of grid) {
      currentTreeString.push(row[i]);
    }
    updateVisibilitiesTopBottom(currentTreeString, i, visibilities);
  }
  return;
}

function updateVisibilitiesSide(
  trees: number[],
  row: number,
  visibilities: Visibilities,
): void {
  let currentMaxFromStart: number = -1;
  visibilities[row] = {};
  for (let i = 0; i < trees.length; i++) {
    const tree: number = trees[i];
    if (tree > currentMaxFromStart) {
      currentMaxFromStart = tree;
      visibilities[row][i] = true;
    }
  }
  let currentMaxFromEnd: number = -1;
  for (let i = trees.length - 1; i >= 0; i--) {
    const tree: number = trees[i];
    if (tree > currentMaxFromEnd) {
      currentMaxFromEnd = tree;
      visibilities[row][i] = true;
    }
  }
  return;
}

function updateVisibilitiesTopBottom(
  trees: number[],
  col: number,
  visibilities: Visibilities,
): void {
  let currentMaxFromStart: number = -1;
  for (let i = 0; i < trees.length; i++) {
    const tree: number = trees[i];
    if (tree > currentMaxFromStart) {
      currentMaxFromStart = tree;
      if (visibilities[i]) {
        visibilities[i][col] = true;
      } else {
        visibilities[i] = { [col]: true };
      }
    }
  }
  let currentMaxFromEnd: number = -1;
  for (let i = trees.length - 1; i >= 0; i--) {
    const tree: number = trees[i];
    if (tree > currentMaxFromEnd) {
      currentMaxFromEnd = tree;
      if (visibilities[i]) {
        visibilities[i][col] = true;
      } else {
        visibilities[i] = { [col]: true };
      }
    }
  }
  return;
}

function countVisibilities(visibilities: Visibilities): number {
  let visibleCount: number = 0;
  for (const row in visibilities) {
    visibleCount += Object.keys(visibilities[row]).length;
  }
  return visibleCount;
}

interface Visibilities {
  [row: number]: { [column: number]: boolean };
}

const day8Part1Result: number = countVisibleTrees(bigForest);
console.log("Day 8, Part 1: The number of visible trees is: ", day8Part1Result);

/**
 Day 8, Part 2 of Advent of Code 2022
 * @param forest string of tree heighs - string
 * @returns highest scenic score - number
 */
export function findHighestScenicScore(forest: string): number {
  const forestGrid: number[][] = forest
    .split("\n")
    .map((forestRow) =>
      forestRow.split("").map((treeString) => parseInt(treeString)),
    );
  let highScore: number = 0;
  for (let i = 1; i < forestGrid.length - 1; i++) {
    for (let j = 1; j < forestGrid[1].length - 1; j++) {
      const currentScore: number = calculateScore(forestGrid, i, j);
      highScore = Math.max(currentScore, highScore);
    }
  }
  return highScore;
}

function calculateScore(grid: number[][], row: number, col: number): number {
  const tree: number = grid[row][col];
  let [left, right, top, down]: number[] = [0, 0, 0, 0];
  for (let i = col - 1; i >= 0; i--) {
    const currentTree: number = grid[row][i];
    if (currentTree >= tree) {
      left++;
      break;
    }
    left++;
  }
  for (let i = col + 1; i < grid[0].length; i++) {
    const currentTree: number = grid[row][i];
    if (currentTree >= tree) {
      right++;
      break;
    }
    right++;
  }
  for (let i = row - 1; i >= 0; i--) {
    const currentTree: number = grid[i][col];
    if (currentTree >= tree) {
      top++;
      break;
    }
    top++;
  }
  for (let i = row + 1; i < grid.length; i++) {
    const currentTree: number = grid[i][col];
    if (currentTree >= tree) {
      down++;
      break;
    }
    down++;
  }
  return left * right * top * down;
}

const day8Part2Result: number = findHighestScenicScore(bigForest);
console.log("Day 8, Part 2: The highest scenic score is: ", day8Part2Result);
