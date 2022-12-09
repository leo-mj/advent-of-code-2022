import { countLongTailPositions, countTailPositions } from "./day9";

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

const longTest: string = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;
test("test for countLongTailPositions", () => {
  expect(countLongTailPositions(testInput)).toBe(1);
  expect(countLongTailPositions(longTest)).toBe(36);
});
