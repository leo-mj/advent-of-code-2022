import { calculateScore } from "./day2";

test("calculateScore returns the correct score", () => {
  expect(calculateScore("A Y")).toBe(8);
});
