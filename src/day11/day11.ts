import { monkeyData } from "./day11-data";

export function calculateMonkeyBusinessLevel(
  monkeysStr: string,
  worryReduction: number,
  rounds: number,
): number {
  const monkeys: Monkeys = transformToMonkeys(monkeysStr);
  const lcm: number = findLeastCommonMultiple(monkeys);
  for (let i = 0; i < rounds; i++) {
    oneRound(monkeys, worryReduction, lcm);
  }
  const monkeyBusiness: number = multiplyMostActiveMonkeyInspections(monkeys);
  return monkeyBusiness;
}

function reduceWorry(
  worryLevel: number,
  worryReduction: number,
  lcm: number,
): number {
  if (worryReduction === 3) {
    return Math.floor(worryLevel / worryReduction);
  }
  return worryLevel % lcm;
}
function findLeastCommonMultiple(monkeys: Monkeys): number {
  const divisors: number[] = [];
  for (const monkeyNum in monkeys) {
    const currentMonkey: Monkey = monkeys[monkeyNum];
    divisors.push(currentMonkey.divisor);
  }
  return divisors.reduce(lcm);
}

function gcd(a: number, b: number): number {
  return a ? gcd(b % a, a) : b;
}

function lcm(a: number, b: number) {
  return (a * b) / gcd(a, b);
}

function multiplyMostActiveMonkeyInspections(monkeys: Monkeys): number {
  const inspectionsArr: number[] = [];
  for (const monkeyNum in monkeys) {
    const currentMonkey: Monkey = monkeys[monkeyNum];
    inspectionsArr.push(currentMonkey.inspections);
  }
  const [maxInspections, secondMaxInspections]: number[] = inspectionsArr
    .sort((a, b) => a - b)
    .slice(-2);
  return maxInspections * secondMaxInspections;
}

function oneRound(monkeys: Monkeys, worryReduction: number, lcm: number): void {
  for (const monkeyNum in monkeys) {
    const currentMonkey: Monkey = monkeys[monkeyNum];
    while (currentMonkey.items.length > 0) {
      const worryLevel: number | undefined = currentMonkey.items.shift();
      if (worryLevel !== undefined) {
        const operationResult: number = currentMonkey.operation(worryLevel);
        const worryLevelForTest: number = reduceWorry(
          operationResult,
          worryReduction,
          lcm,
        );
        const nextMonkey: number = currentMonkey.test(worryLevelForTest);
        monkeys[nextMonkey].items.push(worryLevelForTest);
        monkeys[monkeyNum].inspections++;
      }
    }
    monkeys[monkeyNum].items = currentMonkey.items;
  }
  return;
}

function transformToMonkeys(monkeyStr: string): Monkeys {
  const monkeys: Monkeys = {};
  const monkeyArr: string[][] = monkeyStr
    .split("\n\n")
    .map((monkey) => monkey.split("\n"));
  for (const monkey of monkeyArr) {
    transformToOneMonkey(monkey, monkeys);
  }
  return monkeys;
}

function transformToOneMonkey(rawMonkey: string[], monkeys: Monkeys): void {
  const [
    monkeyNumStr,
    itemRow,
    operationRow,
    testRow,
    trueRow,
    falseRow,
  ]: string[] = rawMonkey;
  const monkeyNum: number = parseInt(
    monkeyNumStr.split("Monkey ")[1].split(":")[0],
  );
  const items: number[] = itemRow
    .split(": ")[1]
    .split(", ")
    .map((itemStr) => parseInt(itemStr));
  const operation: OperationOrTest = defineOperation(operationRow);
  const test: OperationOrTest = defineTest(testRow, trueRow, falseRow);
  const divisor: number = parseInt(testRow.split("by ")[1]);
  const currentMonkey: Monkey = {
    items,
    operation,
    test,
    divisor,
    inspections: 0,
  };
  monkeys[monkeyNum] = currentMonkey;
  return;
}

function defineOperation(operationRow: string): OperationOrTest {
  const rightHandSide: string[] = operationRow.split("= ")[1].split(" ");
  const [a, operator, b]: string[] = rightHandSide;
  function operation(worryLevel: number): number {
    const secondNum: number = b === "old" ? worryLevel : parseInt(b);
    if (operator === "+") {
      return worryLevel + secondNum;
    } else {
      return worryLevel * secondNum;
    }
  }
  return operation;
}

function defineTest(
  testRow: string,
  trueRow: string,
  falseRow: string,
): OperationOrTest {
  const testDivisor: number = parseInt(testRow.split("by ")[1]);
  const trueMonkey: number = parseInt(trueRow.split("monkey ")[1]);
  const falseMonkey: number = parseInt(falseRow.split("monkey ")[1]);
  function test(worryLevel: number): number {
    if (worryLevel % testDivisor === 0) {
      return trueMonkey;
    }
    return falseMonkey;
  }
  return test;
}

interface Monkey {
  items: number[];
  operation: OperationOrTest;
  divisor: number;
  test: OperationOrTest;
  inspections: number;
}

interface Monkeys {
  [monkey: number]: Monkey;
}

type OperationOrTest = (worryLevel: number) => number;

const day11Part1Result: number = calculateMonkeyBusinessLevel(
  monkeyData,
  3,
  20,
);
console.log("Day 11, Part 1: The monkey business level is: ", day11Part1Result);

const day11Part2Result: number = calculateMonkeyBusinessLevel(
  monkeyData,
  1,
  10000,
);
console.log("Day 11, Part 2: The monkey business level is: ", day11Part2Result);
