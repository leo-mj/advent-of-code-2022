import { countTailPositions } from "./day9";

const testInput: string = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

test("test for countTailPositions", () => {
  expect(countTailPositions(testInput)).toBe(13);
});
