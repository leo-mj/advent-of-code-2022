const testInput: string = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
import { findTopCrates, findTopCratesMovingMultiple } from "./day5";

test("test for findTopCrates", () => {
  expect(findTopCrates(testInput)).toBe("CMZ");
});

test("test for findTopCratesMovingMultiple", () => {
  expect(findTopCratesMovingMultiple(testInput)).toBe("MCD");
});
