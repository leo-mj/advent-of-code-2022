import { day5Input } from "./day5-data";

/**
 * Day 5, part 1 of Advent of Code 2022
 * @param rawInput string of crate order and rearrangement instructions
 * @returns string of crates on top of each stack
 */
export function findTopCrates(rawInput: string): string {
  const [crates, instructionArr]: [Crates, string[]] = turnIntoArrs(rawInput);
  const rearrangedCrates: Crates = rearrangeCrates(crates, instructionArr);
  const topCrates: string = checkTop(rearrangedCrates);
  return topCrates;
}

function turnIntoArrs(rawInput: string): [Crates, string[]] {
  const [allCratesStr, instructionStr]: string[] = rawInput.split(`\n\n`);
  const instructionArr: string[] = instructionStr.split(`\n`);
  const cratesArr: string[] = allCratesStr.split(`\n`);
  const crates: Crates = arrangeCrates(cratesArr);
  return [crates, instructionArr];
}

interface Crates {
  [stack: string]: string[];
}

function arrangeCrates(cratesArr: string[]): Crates {
  const crates: Crates = {};
  const crateIndices: number[] = [];
  const stackNumRow: string = cratesArr[cratesArr.length - 1];
  for (let i = 0; i < stackNumRow.length; i++) {
    const char: string = stackNumRow[i];
    if (char !== " ") {
      crates[char] = [];
      crateIndices.push(i);
    }
  }
  for (let i = cratesArr.length - 2; i >= 0; i--) {
    const currentRow: string = cratesArr[i];
    for (let j = 0; j < crateIndices.length; j++) {
      const index: number = crateIndices[j];
      const currentCrate: string = currentRow[index];
      const currentCrateStack: string = (j + 1).toString();
      if (currentCrate.toUpperCase() !== currentCrate.toLowerCase()) {
        crates[currentCrateStack].push(currentCrate);
      }
    }
  }
  return crates;
}

function rearrangeCrates(crates: Crates, instructionArr: string[]): Crates {
  for (const instruction of instructionArr) {
    //console.log(crates);
    const { numberOfCrates, takeFrom, putOn }: Instruction =
      parseInstruction(instruction);
    //console.log(numberOfCrates, takeFrom, putOn);
    for (let i = 0; i < numberOfCrates; i++) {
      const crateToMove: string | undefined = crates[takeFrom].pop();
      if (crateToMove) {
        crates[putOn].push(crateToMove);
      }
    }
  }
  //console.log(crates);

  return crates;
}

interface Instruction {
  numberOfCrates: number;
  takeFrom: string;
  putOn: string;
}

function parseInstruction(instruction: string): Instruction {
  const instructionParts: string[] = instruction.split(" ");
  const [numberOfCratesStr, takeFrom, putOn]: string[] =
    instructionParts.filter(
      (part) => part.toUpperCase() === part.toLowerCase() && part !== "",
    );
  return {
    numberOfCrates: parseInt(numberOfCratesStr),
    takeFrom,
    putOn,
  };
}

function checkTop(crates: Crates): string {
  let topCrates: string = "";
  for (let i = 1; i <= Object.keys(crates).length; i++) {
    const currentStackIndex: string = i.toString();
    const currentStack: string[] = crates[currentStackIndex];
    const currentTopCrate: string = currentStack[currentStack.length - 1];
    topCrates += currentTopCrate;
  }
  return topCrates;
}

const day5Part1Result: string = findTopCrates(day5Input);
console.log("Day 5, Part 1: The top crates are: ", day5Part1Result);

export function findTopCratesMovingMultiple(rawInput: string): string {
  const [crates, instructionArr]: [Crates, string[]] = turnIntoArrs(rawInput);
  const rearrangedCrates: Crates = rearrangeCratesWithMultipleAtOnce(
    crates,
    instructionArr,
  );
  const topCrates: string = checkTop(rearrangedCrates);
  return topCrates;
}

function rearrangeCratesWithMultipleAtOnce(
  crates: Crates,
  instructionArr: string[],
): Crates {
  for (const instruction of instructionArr) {
    // console.log(crates);
    const { numberOfCrates, takeFrom, putOn }: Instruction =
      parseInstruction(instruction);
    // console.log(numberOfCrates, takeFrom, putOn);
    const cratesToMove: string[] = [];
    for (let i = 0; i < numberOfCrates; i++) {
      const crateToMove: string | undefined = crates[takeFrom].pop();
      if (crateToMove) {
        cratesToMove.push(crateToMove);
      }
    }
    // console.log(cratesToMove)
    for (let i = cratesToMove.length - 1; i >= 0; i--) {
      const crate: string = cratesToMove[i];
      crates[putOn].push(crate);
    }
  }
  //console.log(crates);

  return crates;
}

const day5Part2Result: string = findTopCratesMovingMultiple(day5Input);
console.log("Day 5, Part 2: The top crates are: ", day5Part2Result);
