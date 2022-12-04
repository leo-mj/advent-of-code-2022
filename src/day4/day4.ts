import { cleanUpAssignments } from "./day4-data";

/**
 * Day4, part 1 of Advent of Code 2022
 * @param assignmentsAsStr string of pairs of assignments
 * @returns the number of assignment pairs in which one assignment fully contains the other
 */
export function countFullyContainedPairs(assignmentsAsStr: string): number {
  const assignmentsAsNestedArrs: string[][] =
    transformAssignmentsToNestedArrs(assignmentsAsStr);
  const containedPairs: string[][] =
    assignmentsAsNestedArrs.filter(areFullyContained);
  return containedPairs.length;
}

function transformAssignmentsToNestedArrs(
  assignmentsAsStr: string,
): string[][] {
  return assignmentsAsStr
    .split(`\n`)
    .map((assignment) => assignment.split(","));
}

function intervalLengths([first, second]: string[]): [number, number, number] {
  const [firstStart, firstEnd]: number[] = first
    .split("-")
    .map((num) => parseInt(num));
  const [secondStart, secondEnd]: number[] = second
    .split("-")
    .map((num) => parseInt(num));
  const firstLength: number = firstEnd - firstStart;
  const secondLength: number = secondEnd - secondStart;
  const totalLength: number =
    Math.max(firstEnd, secondEnd) - Math.min(firstStart, secondStart);
  return [firstLength, secondLength, totalLength];
}

export function areFullyContained([first, second]: string[]): boolean {
  const [firstLength, secondLength, totalLength]: [number, number, number] =
    intervalLengths([first, second]);
  if (firstLength === totalLength || secondLength === totalLength) {
    return true;
  }
  return false;
}

const day4Part1Result: number = countFullyContainedPairs(cleanUpAssignments);
console.log(
  "Day 4, Part 1: The number of fully contained assignments is: ",
  day4Part1Result,
);

/**
 * Day 4, part 2
 * @param assignmentsAsStr string of pairs of assignments
 * @returns the number of assignment pairs in which the assignments overlap
 */
export function countOverlappingPairs(assignmentsAsStr: string): number {
  const assignmentsAsNestedArrs: string[][] =
    transformAssignmentsToNestedArrs(assignmentsAsStr);
  const overlappingPairs: string[][] =
    assignmentsAsNestedArrs.filter(isOverlapping);
  return overlappingPairs.length;
}

function isOverlapping([first, second]: string[]): boolean {
  const [firstLength, secondLength, totalLength]: [number, number, number] =
    intervalLengths([first, second]);
  if (firstLength + secondLength >= totalLength) {
    return true;
  }
  return false;
}

const day4Part2Result: number = countOverlappingPairs(cleanUpAssignments);
console.log(
  "Day 4, Part 2: The number of overlapping assignments is: ",
  day4Part2Result,
);
