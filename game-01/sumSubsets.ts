function sumSubsets(
  numbers: Array<number>,
  target: number
): Array<number> | null {
  for (const currentNumber in numbers) {
    for (const checking in numbers) {
      if (currentNumber === checking) continue;
      if (numbers[currentNumber] + numbers[checking] === target) {
        return [numbers[currentNumber], numbers[checking]];
      }
    }
  }
  return null;
}

// testing...
// we can run with `npx ts-node SumSubsets.ts`
console.log(sumSubsets([2, 5, 8, 14, 0], 10));
