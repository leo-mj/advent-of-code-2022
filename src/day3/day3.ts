export function findPrioritiesOfMisplacedItems(backpacksAsStr: string): number {
  const backpacksAsArr: string[] = backpacksAsStr.split(`\n`);
  const prioritiesOfMisplacedItems: number[] = backpacksAsArr.map(
    findMisplacedItemAndPriority,
  );
  const sumOfPriorities: number = prioritiesOfMisplacedItems.reduce(
    (sumSoFar, nextPriority) => sumSoFar + nextPriority,
  );
  return sumOfPriorities;
}

export function findMisplacedItemAndPriority(backpack: string): number {
  const misplacedItem: string = findMisplacedItem(backpack);
  const priority: number = findPriority(misplacedItem);
  return 0;
}

export function findMisplacedItem(backpack: string): string {
  return "";
}

export function findPriority(item: string): number {
  const codepoint: number = item.charCodeAt(0);
  if (codepoint <= 90) {
    return codepoint - 38;
  }
  return codepoint - 96;
}
