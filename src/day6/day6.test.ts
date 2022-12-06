import { findFirstMarker } from "./day6";

test("test for findFirstMarker for part 1", () => {
  expect(findFirstMarker("bvwbjplbgvbhsrlpgdmjqwftvncz", 4)).toBe(5);
  expect(findFirstMarker("nppdvjthqldpwncqszvftbrmjlhg", 4)).toBe(6);
  expect(findFirstMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 4)).toBe(10);
  expect(findFirstMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 4)).toBe(11);
});

test("test for findFirstMarker for part 2", () => {
  expect(findFirstMarker("mjqjpqmgbljsphdztnvjfqwrcgsmlb", 14)).toBe(19);
  expect(findFirstMarker("bvwbjplbgvbhsrlpgdmjqwftvncz", 14)).toBe(23);
  expect(findFirstMarker("nppdvjthqldpwncqszvftbrmjlhg", 14)).toBe(23);
  expect(findFirstMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 14)).toBe(29);
  expect(findFirstMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 14)).toBe(26);
});
