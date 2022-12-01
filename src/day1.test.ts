import { findElfWithMostCalories, sumCalories } from "./day1";

test("findElfWithHighestCalories identifies the correct max calories carried by any elf", () => {
  const noSum: string = `1\n\n2\n\n3`;
  expect(findElfWithMostCalories(noSum)).toBe(3);

  const withSum: string = `1\n2\n\n3\n4\n\n5`;
  expect(findElfWithMostCalories(withSum)).toBe(7);
});

test("sumCalories returns the correct sum of calories", () => {
  const inputCals1: string = `1\n2`;
  expect(sumCalories(inputCals1)).toBe(3);

  const inputCals2: string = `\n `;
  expect(sumCalories(inputCals2)).toBe(0);

  const inputCals3: string = `123239\n234243\n5902\n3424`;
  expect(sumCalories(inputCals3)).toBe(366808);
});
