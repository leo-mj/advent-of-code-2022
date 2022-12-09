import { headMovements } from "./day9-data";

/**
 * Day 9, Part 1 of Advent of Code 2022
 * @param movements movement instructions - string
 * @returns number of positions visited by the tail - number
 */
export function countTailPositions(movements: string): number {
  const movementArr: string[] = movements.split("\n");
  const head: Position = { x: 0, y: 0 };
  const tail: Position = { x: 0, y: 0 };
  const tailPositions: PositionLog = { 0: { 0: true } };
  for (const movement of movementArr) {
    move(movement, head, tail, tailPositions);
  }
  const visitedPositionsCount: number = count(tailPositions);
  return visitedPositionsCount;
}

function count(tailPositions: PositionLog): number {
  let positionCount: number = 0;
  for (const xPos in tailPositions) {
    const positionsInCurrentX: string[] = Object.keys(tailPositions[xPos]);
    positionCount += positionsInCurrentX.length;
  }
  return positionCount;
}

function move(
  movement: string,
  head: Position,
  tail: Position,
  tailPositions: PositionLog,
): void {
  const [direction, stepNum]: [string, number] = parseMovement(movement);
  for (let i = 0; i < stepNum; i++) {
    moveHead(direction, head);
    moveTail(head, tail, tailPositions);
    // console.log(movement, head, tail, tailPositions);
  }
  return;
}

function moveTail(
  head: Position,
  tail: Position,
  tailPositions: PositionLog,
): void {
  const xDifference: number = head.x - tail.x;
  const yDifference: number = head.y - tail.y;
  if (Math.abs(xDifference) <= 1 && Math.abs(yDifference) <= 1) {
    return;
  }
  if (xDifference === 0) {
    yDifference > 0 ? tail.y++ : tail.y--;
  } else if (yDifference === 0) {
    xDifference > 0 ? tail.x++ : tail.x--;
  } else {
    xDifference > 0 ? tail.x++ : tail.x--;
    yDifference > 0 ? tail.y++ : tail.y--;
  }
  addToLog(tail, tailPositions);
  return;
}

function addToLog({ x, y }: Position, tailPositions: PositionLog): void {
  if (tailPositions[x] === undefined) {
    tailPositions[x] = { [y]: true };
    return;
  }
  tailPositions[x][y] = true;
  return;
}

function moveHead(direction: string, head: Position): void {
  switch (direction) {
    case "R":
      head.x++;
      break;
    case "L":
      head.x--;
      break;
    case "U":
      head.y++;
      break;
    case "D":
      head.y--;
      break;
    default:
      console.log("Not a direction");
  }
  return;
}

function parseMovement(movement: string): [string, number] {
  const [direction, stepStr]: string[] = movement.split(" ");
  const stepNum: number = parseInt(stepStr);
  return [direction, stepNum];
}

interface Position {
  x: number;
  y: number;
}

interface PositionLog {
  [x: number]: { [y: number]: boolean };
}

const day9Part1Result: number = countTailPositions(headMovements);
console.log(
  "Day 9 , Part 1: The number of positions visited by the tail is: ",
  day9Part1Result,
);

export function countLongTailPositions(movements: string): number {
  const movementArr: string[] = movements.split("\n");
  const head: Position = { x: 0, y: 0 };
  const tails: Position[] = [];
  const allTailPositions: PositionLog[] = [];
  for (let i = 0; i < 9; i++) {
    tails.push({ x: 0, y: 0 });
    allTailPositions.push({ 0: { 0: true } });
  }
  for (const movement of movementArr) {
    moveLongRope(movement, head, tails, allTailPositions);
  }
  const visitedPositionsCount: number = count(allTailPositions[8]);
  //console.log(allTailPositions)
  return visitedPositionsCount;
}

function moveLongRope(
  movement: string,
  head: Position,
  tails: Position[],
  allTailPositions: PositionLog[],
): void {
  const [direction, stepNum]: [string, number] = parseMovement(movement);
  for (let i = 0; i < stepNum; i++) {
    moveHead(direction, head);
    let currentHead: Position = head;
    for (let i = 0; i < 9; i++) {
      const currentTail = tails[i];
      const currentTailPositions: PositionLog = allTailPositions[i];
      moveTail(currentHead, currentTail, currentTailPositions);
      currentHead = currentTail;
    }
    // console.log(movement, head, tail, tailPositions);
  }
  return;
}
