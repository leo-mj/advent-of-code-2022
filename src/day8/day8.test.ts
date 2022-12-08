import { countVisibleTrees, findHighestScenicScore } from "./day8";

test("test for countVisibleTrees", () => {
  const testInput: string = `30373
25512
65332
33549
35390`;
  expect(countVisibleTrees(testInput)).toBe(21);
});

test("test for findHighestScenicScore", () => {
  const testInput: string = `30373
25512
65332
33549
35390`;
  expect(findHighestScenicScore(testInput)).toBe(8);
});
