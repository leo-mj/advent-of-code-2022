import {
  findBadgeItem,
  findBadgeItemAndPriority,
  findMisplacedItem,
  findMisplacedItemAndPriority,
  findPrioritiesOfBadgeItems,
  findPrioritiesOfMisplacedItems,
  findPriority,
} from "./day3";

// Part 1
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

// Part 2
test("test for findBadgeItem", () => {
  expect(
    findBadgeItem([
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
    ]),
  ).toBe("r");
  expect(
    findBadgeItem([
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ]),
  ).toBe("Z");
});

test("test for findPrioritiesOfBadgeItems", () => {
  const testPart2: string = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
  expect(findPrioritiesOfBadgeItems(testPart2)).toBe(70);
});
