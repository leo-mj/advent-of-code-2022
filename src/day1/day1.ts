import { day1Data } from "./day1-data";

/**
 * Day 1, part 1 of Advent of Code 2022
 * @param allFood A list of the calories of each food item carried by each elf, with each elf's inventory separated by an empty line
 * @returns The highest number of total calories carried by any elf
 */
export function findElfWithMostCalories(allFood: string): number {
  const foodItemsByElf: string[] = allFood.split("\n\n");
  const caloriesByElf: number[] = foodItemsByElf.map(sumCalories);
  const highestCalories: number = Math.max(...caloriesByElf);
  return highestCalories;
}

export function sumCalories(foodItemsOfOneElf: string): number {
  const caloriesByFoodItem: number[] = foodItemsOfOneElf
    .split("\n")
    .map((item) => parseInt(item));
  let caloriesOfOneElf: number = 0;
  for (const calories of caloriesByFoodItem) {
    if (calories > 0) {
      caloriesOfOneElf += calories;
    }
  }
  return caloriesOfOneElf;
}

const day1Part1Result: number = findElfWithMostCalories(day1Data);
console.log(
  "Day1, Part1: The elf carrying the most calories and the solution to day 1, part 1, is carrying: ",
  day1Part1Result,
  " calories",
);

/**
 * Day 1, part 2 of Advent of Code 2022
 * @param allFood A list of the calories of each food item carried by each elf, with each elf's inventory separated by an empty line
 * @returns The number of total calories carried by the three elves carrying the most calories
 */
export function findTopThreeElvesWithMostCalories(allFood: string): number {
  const foodItemsByElf: string[] = allFood.split("\n\n");
  const caloriesByElf: number[] = foodItemsByElf.map(sumCalories);
  const sortedCalories: number[] = radixSortCalories(caloriesByElf);
  const topThreeCaloriesByElf: number[] = sortedCalories.slice(-3);
  const totalTopThreeCalories: number = topThreeCaloriesByElf.reduce(
    (nextCalories, currentCalories) => nextCalories + currentCalories,
    0,
  );
  return totalTopThreeCalories;
}

export function radixSortCalories(caloriesByElf: number[]): number[] {
  let allCalories: number[] = [...caloriesByElf];
  const maxDigits: number = mostDigits(allCalories);
  for (let digitPlace = 0; digitPlace < maxDigits; digitPlace++) {
    const digitBuckets: number[][] = Array.from({ length: 10 }, () => []);
    for (const elfCalories of allCalories) {
      const digit = getDigit(elfCalories, digitPlace);
      digitBuckets[digit].push(elfCalories);
    }
    allCalories = [0].concat(...digitBuckets);
  }
  return allCalories;
}

function mostDigits(allCalories: number[]): number {
  let maxDigits = 0;
  for (const elfCalories of allCalories) {
    maxDigits = Math.max(maxDigits, digitCount(elfCalories));
  }
  return maxDigits;
}

function digitCount(elfCalories: number): number {
  if (elfCalories === 0) return 1;
  return Math.floor(Math.log10(elfCalories)) + 1;
}

function getDigit(elfCalories: number, digitPlaceFromBack: number): number {
  const allDigitsUpToDigit: number = Math.floor(
    elfCalories / Math.pow(10, digitPlaceFromBack),
  );
  const lastRemainingDigit: number = allDigitsUpToDigit % 10;
  return lastRemainingDigit;
}

const day1Part2Result: number = findTopThreeElvesWithMostCalories(day1Data);
console.log(
  "Day1, Part2: The three elves carrying the most calories and the solution to day 1, part 1, are carrying: ",
  day1Part2Result,
  " calories in total",
);
