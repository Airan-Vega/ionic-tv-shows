export function divideInHalfArray<T>(arr: T[]) {
  let firstArr: T[] = [];
  let secondArr: T[] = [];
  const half = Math.floor(arr.length / 2);

  if (arr.length > 3) {
    firstArr = [...arr.slice(0, half + 1)];
    secondArr = [...arr.slice(half + 1)];
  } else {
    firstArr = [...arr];
    secondArr = [];
  }

  return { firstArr, secondArr };
}
