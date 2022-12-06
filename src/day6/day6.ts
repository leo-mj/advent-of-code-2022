import { dataStreamBuffer } from "./day6-data";

/**
 * Day 6, part 1 of Advent of Code 2022
 * @param buffer string of characters
 * @returns the ordinal value of the character after which four subsequent distinct characters have occurred
 */
export function findFirstMarker(buffer: string): number {
  let marker: string = "";
  for (let i = 0; i < buffer.length; i++) {
    const char: string = buffer[i];
    const indexOfEarlierOccurrence: number = marker.indexOf(char);
    if (indexOfEarlierOccurrence >= 0) {
      marker = marker.slice(indexOfEarlierOccurrence + 1);
    }
    marker += char;
    if (marker.length === 4) {
      return i + 1;
    }
  }
  return Infinity;
}

const day6Part1Result: number = findFirstMarker(dataStreamBuffer);
console.log(
  "Day6, Part 1: The first marker is complete after character: ",
  day6Part1Result,
);
