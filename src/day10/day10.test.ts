import { findSignalSum } from "./day10";
import { testImage, testProgram } from "./day10-data";

test("test for findSignalSum", () => {
  expect(findSignalSum(testProgram).signalSum).toBe(13140);
  expect(findSignalSum(testProgram).image).toBe(testImage);
});
