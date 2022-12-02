import { calculateScore, calculateScoreGivenResult } from "./day2";

test("calculateScore returns the correct score", () => {
  expect(calculateScore("A Y")).toBe(8);
});

test("calculateScoreGivenResult returns the correct score", () => {
  expect(calculateScoreGivenResult("A Y")).toBe(4);
  expect(calculateScoreGivenResult("A Z")).toBe(8);
  expect(calculateScoreGivenResult("A X")).toBe(3);
});
