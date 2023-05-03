export class Utils {
  public static getUniqueArray<T>(array: T[]): T[] {
    return [...new Set(array)];
  }
}
