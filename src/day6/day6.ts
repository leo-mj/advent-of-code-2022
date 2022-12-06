import { dataStreamBuffer } from "./day6-data";

/**
 * Day 6, parts 1 and 2 of Advent of Code 2022
 * @param buffer string of characters
 * @returns the ordinal value of the character after which four subsequent distinct characters have occurred
 */
export function findFirstMarker(buffer: string, markerLength: number): number {
  let marker: string = "";
  for (let i = 0; i < buffer.length; i++) {
    const char: string = buffer[i];
    const indexOfEarlierOccurrence: number = marker.indexOf(char);
    if (indexOfEarlierOccurrence >= 0) {
      marker = marker.slice(indexOfEarlierOccurrence + 1);
    }
    marker += char;
    if (marker.length === markerLength) {
      return i + 1;
    }
  }
  return Infinity;
}

const day6Part1Result: number = findFirstMarker(dataStreamBuffer, 4);
console.log(
  "Day6, Part 1: The first start-of-packet marker is complete after character: ",
  day6Part1Result,
);

const day6Part2Result: number = findFirstMarker(dataStreamBuffer, 14);
console.log(
  "Day6, Part 2: The first start-of-message marker is complete after character: ",
  day6Part2Result,
);
