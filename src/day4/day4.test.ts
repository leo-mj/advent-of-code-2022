import { countFullyContainedPairs, countOverlappingPairs } from "./day4";

const test1: string = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

test("test for countFullyContainedPairs", () => {
  expect(countFullyContainedPairs(test1)).toBe(2);
});

test("test for countOverlappingPairs", () => {
  expect(countOverlappingPairs(test1)).toBe(4);
});
