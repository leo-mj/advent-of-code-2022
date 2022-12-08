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
