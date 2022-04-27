import { Utilities } from './utitilies';

export class Pagination {
  public static getTotalPagesForPagination(
    resultsCount: number | any,
    quantity: number,
  ) {
    let totalPages = resultsCount / quantity;
    if (!Utilities.numberIsInteger(totalPages))
      totalPages = Math.trunc(totalPages) + 1;
    if (!totalPages || !isFinite(totalPages)) totalPages = 1;
    return totalPages;
  }
}
