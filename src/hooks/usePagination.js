import { useMemo } from "react";

/**
 * Генерирует массив чисел в заданном диапазоне.
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 */
export function range(start, end) {
  let result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

/**
 * Создание диапазона пагинации.
 * Показывает первую, последнюю, текущую страницу и соседей,
 * разделяя их многоточием.
 * @param {number} totalPages - Общее количество страниц.
 * @param {number} currentPage - Текущая активная страница.
 * @returns {(string|number)[]} Массив, представляющий пагинацию,
 * например: [1, "...", 4, 5, 6, "...", 10].
 */
function createPagView(totalPages, currentPage) {
  // Алгоритм не очень, но зато не пришлось долго думать
  let result = [];
  let base = range(1, totalPages);
  const indexCurrentPage = base.indexOf(currentPage);
  const indexLast = base.length - 1;
  const indexFirst = 0;

  // Показывать ли многоточие справа от текущей
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
  // Показывать ли многоточие слева от текущей
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
  // Схлопывание многоточий
  for (let i of base) {
    if (i !== "...") {
      result.push(i);
    } else if (result[result.length - 1] !== "...") {
      result.push(i);
    }
  }
  return result;
}

/**
 * Кастомный хук для создания диапазона страниц для пагинации.
 * @param {{totalPages: number, currentPage: number}} props
 * @returns {(number | string)[]} Массив страниц, включающий числа и '...'
 */
export const usePagination = ({ totalPages, currentPage }) => {
  const paginationRange = useMemo(() => {
    return createPagView(totalPages, currentPage);
  }, [totalPages, currentPage]);
  return paginationRange;
};
