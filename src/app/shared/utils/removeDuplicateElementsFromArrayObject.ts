export function removeDuplicateElementsFromArrayObject<T>(
  array: T[],
  key: keyof T
): T[] {
  return array.filter(
    (item, i, arr) => arr.findIndex((other) => other[key] === item[key]) === i
  );
}
