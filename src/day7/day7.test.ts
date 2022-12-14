import {
  findSmallestSufficientDirectory,
  findTotalDirectorySizes,
} from "./day7";

test("test for findTotalDirectorySizes", () => {
  const testCommands: string = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;
  expect(findTotalDirectorySizes(testCommands)).toBe(95437);
  const test2: string = `$ cd /
`;
});

test("test for findSmallestSufficientDirectory", () => {
  const test: string = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;
  expect(findSmallestSufficientDirectory(test)).toBe(24933642);
});
