import { findFirstMarker } from "./day6";

test("test for findFirstMarker", () => {
  expect(findFirstMarker("bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(5);
  expect(findFirstMarker("nppdvjthqldpwncqszvftbrmjlhg")).toBe(6);
  expect(findFirstMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(10);
  expect(findFirstMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(11);
});
