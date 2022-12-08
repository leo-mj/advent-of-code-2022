import { countVisibleTrees } from "./day8";

test("test for countVisibleTrees", () => {
  const testInput: string = `30373
25512
65332
33549
35390`;
  expect(countVisibleTrees(testInput)).toBe(21);
});
