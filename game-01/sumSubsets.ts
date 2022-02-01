function sumSubsets(
  numbers: Array<number>,
  target: number
): Array<number> | null {
  if (numbers.length === 1) return null;
  const [num, ...rest] = numbers;
  for (const n in rest) {
    if (num + rest[n] === target) {
      return [num, rest[n]];
    }
  }
  return sumSubsets([...rest], target);
}
// testing in console...
// we can run with `npx ts-node SumSubsets.ts`
console.log(sumSubsets([3, 5, 3, 8, 7, 2], 10));
