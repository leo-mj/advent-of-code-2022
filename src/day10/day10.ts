import { mainProgram } from "./day10-data";

/**
 * Day 10, Parts 1 and 2 of Advent of Code 2022
 * @param program program - string
 * @returns object containing sum of signals at specified cycle numbers of executing the program - number, and an image - string
 */
export function findSignalSum(program: string): {
  signalSum: number;
  image: string;
} {
  const instructions: string[] = program.split("\n");
  const executionContext: ExecutionContext = {
    registers: { X: 1 },
    cycleNumber: 0,
    signalSum: 0,
    image: "",
  };
  for (const line of instructions) {
    executeLine(line, executionContext);
  }
  return {
    signalSum: executionContext.signalSum,
    image: executionContext.image,
  };
}

function executeLine(line: string, executionContext: ExecutionContext): void {
  if (line === "noop") {
    executeNoop(executionContext);
    return;
  }
  executeAddX(line, executionContext);
  return;
}

function draw(executionContext: ExecutionContext): void {
  const currentDrawPosition: number = (executionContext.cycleNumber - 1) % 40;
  if (
    currentDrawPosition >= executionContext.registers.X - 1 &&
    currentDrawPosition <= executionContext.registers.X + 1
  ) {
    executionContext.image += "#";
  } else {
    executionContext.image += ".";
  }
  if (executionContext.cycleNumber % 40 === 0) {
    executionContext.image += "\n";
  }
}

function executeAddX(line: string, executionContext: ExecutionContext): void {
  const value: number = parseInt(line.split(" ")[1]);
  for (let i = 0; i < 2; i++) {
    executionContext.cycleNumber++;
    if ([20, 60, 100, 140, 180, 220].includes(executionContext.cycleNumber)) {
      executionContext.signalSum +=
        executionContext.registers.X * executionContext.cycleNumber;
    }
    draw(executionContext);
  }
  executionContext.registers.X += value;
  return;
}

function executeNoop(executionContext: ExecutionContext): void {
  executionContext.cycleNumber++;
  if ([20, 60, 100, 140, 180, 220].includes(executionContext.cycleNumber)) {
    executionContext.signalSum +=
      executionContext.registers.X * executionContext.cycleNumber;
  }
  draw(executionContext);
  return;
}

interface ExecutionContext {
  registers: Register;
  cycleNumber: number;
  signalSum: number;
  image: string;
}

interface Register {
  [register: string]: number;
}

const day10Part1Result: number = findSignalSum(mainProgram).signalSum;
console.log("Day 10, Part 1: The signal sum is: ", day10Part1Result);

const day10Part2Result: string = findSignalSum(mainProgram).image;
console.log(
  "Day 10, Part 2: The resulting image on your CRT is: ",
  "\n",
  day10Part2Result,
);
