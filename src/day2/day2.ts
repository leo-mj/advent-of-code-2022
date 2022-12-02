import { gameStrategy } from "./day2-data";

// A for Rock, B for Paper, and C for Scissors. The second column--" Suddenly, the Elf is called away to help with someone's tent.
//The second column, you reason, must be what you should play in response: X for Rock, Y for Paper, and Z for Scissors.

// The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors)
// plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).
/**
 * Day 2, part 1 of Advent of Code 2022
 * @param strategy a string with two columns, each specifying a rock-paper-scissors action
 * @returns the total score of following the strategy
 */
export function calculateScore(strategy: string): number {
  const transformedStrategy: string[][] = strategy
    .split(`\n`)
    .map((row) => row.split(` `));
  let score: number = 0;
  for (const round of transformedStrategy) {
    score += scoreRound(round);
  }
  return score;
}

export function scoreRound([opponent, response]: string[]): number {
  const yourShapeScore: number = "XYZ".indexOf(response) + 1;
  const opponentMoveIfYouWin: number = "CAB".indexOf(opponent) + 1;
  const winComparison: number = opponentMoveIfYouWin - yourShapeScore;
  if (winComparison === 0) {
    return yourShapeScore + 6;
  }
  const opponentMoveIfYouDraw: number = "ABC".indexOf(opponent) + 1;
  const drawComparison: number = opponentMoveIfYouDraw - yourShapeScore;
  if (drawComparison === 0) {
    return yourShapeScore + 3;
  }
  return yourShapeScore;
}

const day2Part1Result: number = calculateScore(gameStrategy);
console.log("Day2, Part1: Your total score would be: ", day2Part1Result);

// The second column says how the round needs to end:
// X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win
/**
 * Day 2, part 2 of Advent of Code 2022
 * @param strategy a string with two columns, each specifying a rock-paper-scissors action
 * @returns the total score of following the strategy
 */
export function calculateScoreGivenResult(strategy: string): number {
  const transformedStrategy: string[][] = strategy
    .split(`\n`)
    .map((row) => row.split(` `));
  let score: number = 0;
  for (const round of transformedStrategy) {
    score += scoreRoundGivenResult(round);
  }
  return score;
}

export function scoreRoundGivenResult([opponent, result]: string[]): number {
  const resultScore: number = "XYZ".indexOf(result) * 3;
  const opponentShapeIndex = "ABC".indexOf(opponent);
  let yourResponse: string = "";
  if (result === "X") {
    yourResponse = "CAB"[opponentShapeIndex];
  } else if (result === "Y") {
    yourResponse = "ABC"[opponentShapeIndex];
  } else {
    yourResponse = "BCA"[opponentShapeIndex];
  }
  const yourShapeScore: number = "ABC".indexOf(yourResponse) + 1;
  return resultScore + yourShapeScore;
}

const day2Part2Result: number = calculateScoreGivenResult(gameStrategy);
console.log("Day2, Part2: Your total score would be: ", day2Part2Result);
