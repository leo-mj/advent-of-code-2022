export function findTotalDirectorySizes(commands: string): number {
  const commandsArr: string[] = commands.split(`\n`);
  const sizes: Sizes = {};
  let currentDirectory: string = "";
  let outerDirectories: string[] = [];
  for (const line of commandsArr) {
    currentDirectory = interpretLine(
      line,
      sizes,
      currentDirectory,
      outerDirectories,
    );
  }
  const totalSizesUnder100k: number = findTotalSizesUnder100k(sizes);
  return totalSizesUnder100k;
}

interface Sizes {
  [directory: string]: number;
}

function interpretLine(
  line: string,
  sizes: Sizes,
  currentDirectory: string,
  outerDirectories: string[],
): string {
  const isCommand: boolean = line[0] === `$`;
  if (isCommand) {
    currentDirectory = executeCommand(line, currentDirectory, outerDirectories);
    return currentDirectory;
  }
  const isFile: boolean = line[0].toUpperCase() === line[0].toLowerCase();
  if (isFile) {
    addFileSizes(line, sizes, currentDirectory, outerDirectories);
  }
  return currentDirectory;
}

function executeCommand(
  line: string,
  currentDirectory: string,
  outerDirectories: string[],
): string {
  const [command, directory]: string[] = line.split(" ").slice(1);
  if (command === "ls") {
    return currentDirectory;
  }
  if (directory === "..") {
    const directoryToMoveTo: string | undefined = outerDirectories.pop();
    if (directoryToMoveTo) {
      return directoryToMoveTo;
    }
  }
  if (directory === "/") {
    outerDirectories = [];
    return "/";
  }
  outerDirectories.push(currentDirectory);
  return directory;
}

function addFileSizes(
  line: string,
  sizes: Sizes,
  currentDirectory: string,
  outerDirectories: string[],
): void {
  const sizeStr: string = line.split(" ")[0];
  const sizeNum: number = parseInt(sizeStr);
  if (sizes[currentDirectory]) {
    sizes[currentDirectory] += sizeNum;
  } else {
    sizes[currentDirectory] = sizeNum;
  }
  for (const directory of outerDirectories) {
    sizes[directory] += sizeNum;
  }
}

function findTotalSizesUnder100k(sizes: Sizes): number {
  let totalSizes: number = 0;
  for (const directory in sizes) {
    const currentSize: number = sizes[directory];
    if (currentSize <= 100000) {
      totalSizes += currentSize;
    }
  }
  return totalSizes;
}
