import { day1Data } from "./day1-data";

/**
 * Day 1 of Advent of Code 2022
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

const day1Result: number = findElfWithMostCalories(day1Data);
console.log("The elf carrying the most calories and the solution to day 1 is: ", day1Result);
