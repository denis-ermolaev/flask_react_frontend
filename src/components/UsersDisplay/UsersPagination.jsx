import Pagination from "react-bootstrap/Pagination";
import { useContext } from "react";
import { userContext } from "../../context/context";
import { usePagination } from "../../hooks/usePagination";

export default function UsersPagination() {
  const { currentPage, totalPages, setCurrentPage } = useContext(userContext);

  const arrayPaginationView = usePagination({ totalPages, currentPage });

  if (!totalPages || totalPages < 2) {
    return null;
  } else {
    return (
      <Pagination>
        <Pagination.First
          className="d-none d-sm-block"
          onClick={() => {
            setCurrentPage(1);
          }}
          disabled={currentPage === 1} // 7. Добавляем disabled
        />
        <Pagination.Prev
          className="d-none d-sm-block"
          onClick={() => {
            setCurrentPage((prev) => {
              if (prev - 1 >= 1) {
                return prev - 1;
              }
              return 1;
            });
          }}
          disabled={currentPage === 1}
        />
        {arrayPaginationView.map((value, index) => {
          if (value == "...") {
            return <Pagination.Ellipsis key={`dot-${index}`} />;
          } else if (value === currentPage) {
            return (
              <Pagination.Item active key={value}>
                {value}
              </Pagination.Item>
            );
          } else {
            return (
              <Pagination.Item
                key={value}
                onClick={() => {
                  setCurrentPage(value);
                }}
              >
                {value}
              </Pagination.Item>
            );
          }
        })}
        <Pagination.Next
          className="d-none d-sm-block"
          onClick={() => {
            setCurrentPage((prev) => {
              if (prev + 1 <= totalPages) {
                return prev + 1;
              }
              return prev;
            });
          }}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          className="d-none d-sm-block"
          onClick={() => {
            setCurrentPage(totalPages);
          }}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    );
  }
}
