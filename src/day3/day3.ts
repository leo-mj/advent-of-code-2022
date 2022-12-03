import { backpacks } from "./day3-data";

/**
 * Day 3, part 1 of Advent of Code 2022
 * @param backpacksAsStr string with backpack items in each row
 * @returns the sum of priority values of the items that appear in both halves of each row
 */
export function findPrioritiesOfMisplacedItems(backpacksAsStr: string): number {
  const backpacksAsArr: string[] = backpacksAsStr.split(`\n`);
  const prioritiesOfMisplacedItems: number[] = backpacksAsArr.map(
    findMisplacedItemAndPriority,
  );
  const sumOfPriorities: number = prioritiesOfMisplacedItems.reduce(
    (sumSoFar, nextPriority) => sumSoFar + nextPriority,
    0,
  );
  return sumOfPriorities;
}

export function findMisplacedItemAndPriority(backpack: string): number {
  const misplacedItem: string = findMisplacedItem(backpack);
  const priority: number = findPriority(misplacedItem);
  return priority;
}

export function findMisplacedItem(backpack: string): string {
  const itemsInFirstCompartment: { [item: string]: boolean } = {};
  for (let i = 0; i < backpack.length / 2; i++) {
    const item: string = backpack[i];
    itemsInFirstCompartment[item] = true;
  }
  for (let i = backpack.length / 2; i < backpack.length; i++) {
    const item: string = backpack[i];
    if (itemsInFirstCompartment[item]) {
      return item;
    }
  }
  return "";
}

export function findPriority(item: string): number {
  const codepoint: number = item.charCodeAt(0);
  if (codepoint <= 90) {
    return codepoint - 38;
  }
  return codepoint - 96;
}

const day3Part1Result: number = findPrioritiesOfMisplacedItems(backpacks);
console.log("Day3, Part1: The sum of priorities is: ", day3Part1Result);

/**
 * Day 3, part 2 of Advent of Code 2022
 * @param backpacksAsStr string with backpack items in each row
 * @returns the sum of priority values of the items that appear in each row of groups of three rows
 */
export function findPrioritiesOfBadgeItems(backpacksAsStr: string): number {
  const backpacksAsArr: string[] = backpacksAsStr.split(`\n`);
  const elfGroups: string[][] = [];
  let currentElfGroup: string[] = [];
  for (const backpack of backpacksAsArr) {
    if (currentElfGroup.length === 3) {
      elfGroups.push(currentElfGroup);
      currentElfGroup = [];
    }
    currentElfGroup.push(backpack);
  }
  elfGroups.push(currentElfGroup);
  const groupPriorities: number[] = elfGroups.map(findBadgeItemAndPriority);
  const sumOfPriorities: number = groupPriorities.reduce(
    (sumSoFar, nextPriority) => sumSoFar + nextPriority,
    0,
  );
  return sumOfPriorities;
}

export function findBadgeItemAndPriority(elfGroup: string[]): number {
  const badgeItem: string = findBadgeItem(elfGroup);
  const priority: number = findPriority(badgeItem);
  return priority;
}

export function findBadgeItem([first, second, third]: string[]): string {
  const inFirst: { [item: string]: boolean } = {};
  for (let i = 0; i < first.length; i++) {
    const currentItem: string = first[i];
    inFirst[currentItem] = true;
  }
  const inFirstAndSecond: { [item: string]: boolean } = {};
  for (let i = 0; i < second.length; i++) {
    const currentItem: string = second[i];
    if (inFirst[currentItem]) {
      inFirstAndSecond[currentItem] = true;
    }
  }
  for (let i = 0; i < third.length; i++) {
    const currentItem: string = third[i];
    if (inFirstAndSecond[currentItem]) {
      return currentItem;
    }
  }
  return "";
}
