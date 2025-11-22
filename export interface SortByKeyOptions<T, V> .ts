export interface SortByKeyOptions<T, V> {
  desc?: boolean;
  locale?: string;
  caseInsensitive?: boolean;
  accessor?: (item: T) => V;
  comparator?: (a: V, b: V) => number;
}

export function sortByKey<T extends Record<string, any>, V = any>(
  arr: T[],
  key: string,
  options?: SortByKeyOptions<T, V>
): T[];