export class Utilities {
  public static numberIsInteger(number: number): boolean {
    return number % 1 === 0;
  }

  public static toBool(string: string) {
    if (string === 'true') {
      return true;
    } else {
      return false;
    }
  }
}
