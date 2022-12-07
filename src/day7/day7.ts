import { commandData } from "./day7-data";

/**
 * Day 7, Part 1 of Advent of Code 2022
 * @param commands string of command lines
 * @returns total size of directories under 100k - number
 */
export function findTotalDirectorySizes(commands: string): number {
  const commandsArr: string[] = commands.split(`\n`);
  const sizes: Sizes = {};
  let currentDirectory: string = "";
  let outerDirectories: string[] = [];
  for (const line of commandsArr) {
    currentDirectory = interpretLine(
      line,
      sizes,
      currentDirectory,
      outerDirectories,
    );
  }
  const totalSizesUnder100k: number = findTotalSizesUnder100k(sizes);
  return totalSizesUnder100k;
}

interface Sizes {
  [directory: string]: number;
}

function interpretLine(
  line: string,
  sizes: Sizes,
  currentDirectory: string,
  outerDirectories: string[],
): string {
  const isCommand: boolean = line[0] === `$`;
  const isFile: boolean = line[0].toUpperCase() === line[0].toLowerCase();
  if (isCommand) {
    currentDirectory = executeCommand(line, currentDirectory, outerDirectories);
  } else if (isFile) {
    addFileSizes(line, sizes, currentDirectory, outerDirectories);
  }
  return currentDirectory;
}

function executeCommand(
  line: string,
  currentDirectory: string,
  outerDirectories: string[],
): string {
  const [command, directory]: string[] = line.split(" ").slice(1);
  if (command === "ls") {
    return currentDirectory;
  }
  if (directory === "..") {
    const directoryToMoveTo: string | undefined = outerDirectories.pop();
    if (directoryToMoveTo) {
      return directoryToMoveTo;
    }
  }
  if (directory === "/") {
    outerDirectories = [];
    return "/";
  }
  outerDirectories.push(currentDirectory);
  return directory + currentDirectory;
}

function addFileSizes(
  line: string,
  sizes: Sizes,
  currentDirectory: string,
  outerDirectories: string[],
): void {
  const sizeStr: string = line.split(" ")[0];
  const sizeNum: number = parseInt(sizeStr);
  if (sizes[currentDirectory]) {
    sizes[currentDirectory] += sizeNum;
  } else {
    sizes[currentDirectory] = sizeNum;
  }
  for (const directory of outerDirectories) {
    if (sizes[directory]) {
      sizes[directory] += sizeNum;
    } else {
      sizes[directory] = sizeNum;
    }
  }
}

function findTotalSizesUnder100k(sizes: Sizes): number {
  let totalSizes: number = 0;
  for (const directory in sizes) {
    const currentSize: number = sizes[directory];
    if (currentSize <= 100000) {
      totalSizes += currentSize;
    }
  }
  return totalSizes;
}

const day7Part1Result: number = findTotalDirectorySizes(commandData);
console.log(
  "Day 7, Part 1: The total of directory sizes under 100k is: ",
  day7Part1Result,
);

/**
 Day 7, Part 2 of Advent of Code 2022
 * @param commands string of command lines
 * @returns size of smallest directory that if deleted makes the size of / smaller than 3m
 */
export function findSmallestSufficientDirectory(commands: string): number {
  const commandsArr: string[] = commands.split(`\n`);
  const sizes: Sizes = {};
  let currentDirectory: string = "";
  let outerDirectories: string[] = [];
  for (const line of commandsArr) {
    currentDirectory = interpretLine(
      line,
      sizes,
      currentDirectory,
      outerDirectories,
    );
  }
  const minSufficient: number = findMinSufficient(sizes);
  return minSufficient;
}

function findMinSufficient(sizes: Sizes): number {
  const sufficientSize: number = 30000000 - (70000000 - sizes["/"]);
  let minSufficient: number = sizes["/"];
  for (const directory in sizes) {
    const currentSize: number = sizes[directory];
    if (currentSize < minSufficient && currentSize >= sufficientSize) {
      minSufficient = currentSize;
    }
  }
  return minSufficient;
}

const day7Part2Result: number = findSmallestSufficientDirectory(commandData);
console.log(
  "Day 7, Part 2: The smallest sufficient directory size is: ",
  day7Part2Result,
);
