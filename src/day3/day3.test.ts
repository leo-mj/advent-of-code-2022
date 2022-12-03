import {
  findMisplacedItem,
  findMisplacedItemAndPriority,
  findPrioritiesOfMisplacedItems,
  findPriority,
} from "./day3";

test("test for findPriority", () => {
  expect(findPriority("A")).toBe(27);
  expect(findPriority("a")).toBe(1);
  expect(findPriority("Z")).toBe(52);
  expect(findPriority("z")).toBe(26);
});

test("test for findMisplacedItem", () => {
  expect(findMisplacedItem("vJrwpWtwJgWrhcsFMMfFFhFp")).toBe("p");
  expect(findMisplacedItem("PmmdzqPrVvPwwTWBwg")).toBe("P");
});

test("test for findMisplacedItemAndPriority", () => {
  expect(findMisplacedItemAndPriority("vJrwpWtwJgWrhcsFMMfFFhFp")).toBe(16);
  expect(findMisplacedItemAndPriority("jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL")).toBe(
    38,
  );
  expect(findMisplacedItemAndPriority("PmmdzqPrVvPwwTWBwg")).toBe(42);
  expect(findMisplacedItemAndPriority("wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn")).toBe(
    22,
  );
  expect(findMisplacedItemAndPriority("ttgJtRGJQctTZtZT")).toBe(20);
  expect(findMisplacedItemAndPriority("CrZsJsPPZsGzwwsLwLmpwMDw")).toBe(19);
});
const testInput: string = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
test("test for findPrioritiesOfMisplacedItems", () => {
  expect(findPrioritiesOfMisplacedItems(testInput)).toBe(157);
});
