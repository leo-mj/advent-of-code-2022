import { calculateMonkeyBusinessLevel } from "./day11";
import { testMonkeys } from "./day11-data";

test("test for caculateMonkeyBusinessLevel", () => {
  expect(calculateMonkeyBusinessLevel(testMonkeys, 3, 20)).toBe(10605);
  expect(calculateMonkeyBusinessLevel(testMonkeys, 1, 10000)).toBe(2713310158);
});
