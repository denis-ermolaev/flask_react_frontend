import { useMemo } from "react";

export function range(start, end) {
  let result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

export const usePagination = ({ totalPages, currentPage }) => {
  const paginationRange = useMemo(() => {
    function createPagView(totalPages, currentPage) {
      let result = [];
      let base = range(1, totalPages);
      const indexCurrentPage = base.indexOf(currentPage);
      const indexLast = base.length - 1;
      const indexFirst = 0;
      if (indexLast - indexCurrentPage >= 2) {
        let indexForDelete = range(indexCurrentPage + 2, indexLast - 1);
        base = base.map((value, index) => {
          if (!indexForDelete.includes(index)) {
            return value;
          } else {
            return "...";
          }
        });
      }
      if (indexCurrentPage - indexFirst >= 2) {
        let indexForDelete = range(indexFirst + 1, indexCurrentPage - 2);
        base = base.map((value, index) => {
          if (!indexForDelete.includes(index)) {
            return value;
          } else {
            return "...";
          }
        });
      }
      for (let i of base) {
        if (i !== "...") {
          result.push(i);
        } else if (result[result.length - 1] !== "...") {
          result.push(i);
        }
      }
      return result;
    }

    return createPagView(totalPages, currentPage);
  }, [totalPages, currentPage]);
  return paginationRange;
};
