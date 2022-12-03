import { findPriority } from "./day3";

test("test for findPriority", () => {
  expect(findPriority("A")).toBe(27);
  expect(findPriority("a")).toBe(1);
  expect(findPriority("Z")).toBe(52);
  expect(findPriority("z")).toBe(26);
});
